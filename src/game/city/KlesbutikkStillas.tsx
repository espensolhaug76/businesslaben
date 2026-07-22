import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import {
  KLESBUTIKK_VINDU, KLESBUTIKK_BUTIKKVEGG, KLESBUTIKK_KUNDE_BASE,
  KLESBUTIKK_KASSE_SCALE, KLESBUTIKK_KASSE_CENTER_X, KLESBUTIKK_KASSE_WAIST_Y,
  KLESBUTIKK_KASSE_OCCLUDE_Y_LEFT, KLESBUTIKK_KASSE_OCCLUDE_Y_RIGHT,
  KLESBUTIKK_KUNDE_STAPUNKTER,
} from '../../data/districts'
import { occlusionClipPath, customerAnchorStyle, type KassevyKonstanter } from '../geometry/kassevyBase'
import { KLESBUTIKK_KASSE_KUNDER } from '../data/klesbutikkKunder'
import { KLESBUTIKK_SCENARIOS, KLESBUTIKK_SCENARIO_KUNDE } from '../sales/klesbutikkScenarios'
import { KLESBUTIKK_KONTAKT_VINDU, KLESBUTIKK_KONTAKT_HINT } from '../data/balance'
import type { SalesScenario } from '../sales/types'
import SalesScenarioOverlay from '../ui/SalesScenarioOverlay'
import { GameProvider, useGame } from '../GameContext'
import { KLESBUTIKK, type Gulvplan, type Vareplass, type PlassType, type PlassDukketype, type HengVariant } from '../data/industryDefinition'
import { KLESBUTIKK_FIXTURES, fixtureDef, vareplasser, kapasitet, type VareplassType } from '../data/klesbutikkFixtures'
import { KLESBUTIKK_PLAGG, plaggById, spriteFor, baseFit, NULL_FIT, plaggStøtterHengVariant, type Plagg, type DukkeType } from '../data/klesbutikkPlagg'
import { KLESBUTIKK_DUKKER, dukkeById, FIXTURE_FOR_DUKKETYPE, type Dukketype } from '../data/klesbutikkDukker'
import type { KlesbutikkFixtureId, Fotpunkt, KlesbutikkPlaggItem, ElevFit } from '../types'
import { plassTransform as hyllelinjeTransform } from '../geometry/hyllelinje'
import { IS_DEV_COORDS } from './DevCoordHelper'
import ZoneTracer, { type Target, type DrawZone, type Rect } from './ZoneTracer'
import InnkjopKatalog from './InnkjopKatalog'
import { forteplaggIds } from '../data/klesbutikkKatalog'

// ── KlesbutikkStillas (BRANSJE 2) — STILLAS-scene for klesbutikk ──────────────
// Frittstående dev-scene (/dev/klesbutikk, IKKE koblet til onboarding/spillet).
// BAKT INTERIØR (kafé-modellen): scenebildet er en ferdig møblert, tom butikk;
// elevene styler FASTE, kalibrerte VAREPLASSER (heng/brett/dukke) — fri møblering
// er parkert (se FRI_MOBLERING). Interiør = 🛍 Scene. ?dev=1 gir tracere:
// 📐 Gulvplan · 📌 Vareplass (heng/brett/dukke) · 🧭 Soner. Gulvplanet og
// vareplassene bor i KLESBUTIKK (industryDefinition.ts); tracerne muterer +
// logger, og vareplass-utkastet speiles til localStorage (overlever reload).

// BAKT INTERIØR (kafé-modellen): scenebildet er en FERDIG MØBLERT, tom butikk.
// Elevene styler FASTE, kalibrerte vareplasser (som monter-trauene) — fri
// møblering er PARKERT (se FRI_MOBLERING). ✦-vannmerket er patchet vekk fra
// råbildet (…-mobler-raw.png → …-mobler.png).
const INTERIOR_IMG = '/assets/raw/klesbutikk-interior-mobler.png'
const FASADE_IMG = '/assets/raw/klesbutikk-fasade.png'
// KASSEVY (bak-disken-vy) — Espens valgte pilot. Disken går rett over hele
// bredden (jevn okklusjonslinje). ✦-vannmerket (bunn-h.) er IKKE patchet (se
// rapporten) — la Espen avgjøre.
const KASSEVY_IMG = '/assets/raw/klesbutikk-kassevy.png'

// PARKERT: fri møblering (møbel-palett, plantegning, fotavtrykk-kalibrator,
// speiling, møbel-plassering/-flytting i scenen). Koden beholdes DØD (ikke
// slettet) og gates på dette flagget, jf. retningsskiftet til bakt interiør.
const FRI_MOBLERING = false

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const writeRect = (t: Rect, r: Rect) => { t[0] = r[0]; t[1] = r[1]; t[2] = r[2]; t[3] = r[3] }
const SLOT_COLOR: Record<VareplassType, string> = { heng: '#50dcff', brett: '#ffb03c', antrekk: '#f472b6' }
// Farge per VAREPLASS-type (bakt interiør) — brukt av tracer + dev-markører.
const PLASS_COLOR: Record<PlassType, string> = { heng: '#50dcff', brett: '#ffb03c', dukke: '#f472b6' }
const PROFIL_COLOR = '#c084fc'   // lilla: profil-heng-plasser (egen merking i traceren)

/** Anker + valgfri rot/skew for et snappet element på en vareplass. Bunn-ankret
 *  (brett/dukke) pivoterer i bunn; heng pivoterer i senter. ÉN kodevei brukt av
 *  både scene-render og tracer-preview.
 *
 *  Geometrien bor nå i den PORTABLE modulen `geometry/hyllelinje.ts` (delt med
 *  eksperiment/autonom-sport, se docs/AUTONOM_PIPELINE.md §7). Denne funksjonen er
 *  en tynn bransje-ADAPTER: den oversetter klesbutikkens `Vareplass.type` til
 *  modulens EKSPLISITTE `bottomAnchored` (heng = topp-ankret, brett/dukke = bunn).
 *  Ren refaktor — modulens utdata er byte-identisk med den tidligere lokale
 *  koden (`type !== 'heng'` ↔ `bottomAnchored`), verifisert med pikseldiff. */
function plassTransform(vp: { type: PlassType; rot?: number; skewX?: number; skewY?: number }): { transform: string; transformOrigin: string } {
  return hyllelinjeTransform({ bottomAnchored: vp.type !== 'heng', rot: vp.rot, skewX: vp.skewX, skewY: vp.skewY })
}

// Antrekk-passform: skulder-ankret over dukka.
const ANTREKK_SHOULDER_Y = 0.13   // grunnlinje topp (skulderlinje) i dukke-boksen
const ANTREKK_BASE_W = 0.82       // grunnbredde (brøk av dukke-boksens bredde)
const ELEV_MAX = 0.22             // maks eleven kan dra offset (brøk av boksen)
const ELEV_SCALE_MAX = 0.2        // eleven kan skalere ±20 % fra grunnlinja
const DUKKE_TYPER: KlesbutikkFixtureId[] = ['dukke', 'dukke-mann', 'dukke-barn']

let _uid = 0
const uid = () => { try { return crypto.randomUUID() } catch { return `fx-${_uid++}` } }

// ── Gulvplan-matematikk (bilineær trapes-mapping) ────────────────────────────
// (u,v) er trapes-koordinater: u = venstre→høyre, v = dybde (0 foran, 1 bak).
type Pt = { x: number; y: number }
const cross = (a: Pt, b: Pt) => a.x * b.y - a.y * b.x

/** Forlengs: trapes-koordinat (u,v) → punkt i % av scenebildet. */
function quadPoint(g: Gulvplan, u: number, v: number): Pt {
  const { fremV: A, fremH: B, bakV: C, bakH: D } = g.hjørner
  return {
    x: (1 - u) * (1 - v) * A.x + u * (1 - v) * B.x + (1 - u) * v * C.x + u * v * D.x,
    y: (1 - u) * (1 - v) * A.y + u * (1 - v) * B.y + (1 - u) * v * C.y + u * v * D.y,
  }
}

/** Invers: punkt (%) → (u,v). Robust — velger reell rot nærmest [0,1]. */
function invBilinear(p: Pt, g: Gulvplan): { u: number; v: number } {
  const { fremV: A, fremH: B, bakV: C, bakH: D } = g.hjørner
  const e = { x: B.x - A.x, y: B.y - A.y }
  const f = { x: C.x - A.x, y: C.y - A.y }
  const gg = { x: A.x - B.x - C.x + D.x, y: A.y - B.y - C.y + D.y }
  const h = { x: p.x - A.x, y: p.y - A.y }
  const k2 = cross(gg, f), k1 = cross(e, f) + cross(h, gg), k0 = cross(h, e)
  let v: number
  if (Math.abs(k2) < 1e-6) {
    v = Math.abs(k1) < 1e-9 ? 0 : -k0 / k1
  } else {
    const disc = k1 * k1 - 4 * k2 * k0
    const w = disc > 0 ? Math.sqrt(disc) : 0
    const v1 = (-k1 - w) / (2 * k2), v2 = (-k1 + w) / (2 * k2)
    const pen = (x: number) => Math.abs(x - clamp(x, 0, 1))
    v = pen(v1) <= pen(v2) ? v1 : v2
  }
  const dx = e.x + gg.x * v, dy = e.y + gg.y * v
  const u = Math.abs(dx) > Math.abs(dy) ? (h.x - f.x * v) / dx : (h.y - f.y * v) / dy
  return { u, v }
}

/** Klem et fotpunkt til gulv-trapeset. Alle møbler (også hylla) står på gulvet
 *  og kan flyttes fritt frem/tilbake i dybden. */
function clampFoot(g: Gulvplan, p: Pt): Fotpunkt {
  const { u, v } = invBilinear(p, g)
  return quadPoint(g, clamp(u, 0, 1), clamp(v, 0, 1))
}

/** Gulv-trapesets horisontale bredde ved dybde v, som brøk av scenebildet. */
function trapWidthFrac(g: Gulvplan, v: number): number {
  return (quadPoint(g, 1, v).x - quadPoint(g, 0, v).x) / 100
}

/** SCENE-sprite-bredde (brøk av scenebildet) UTLEDT av møbelets fotavtrykk.b:
 *  `b` % av gulv-trapesets bredde ved møbelets dybde. ÉN KILDE med plan-ikonet
 *  (som bruker samme `b`/`d` mot planrektangelet), så de aldri kommer i utakt. */
function sceneWidthFrac(g: Gulvplan, fixtureId: KlesbutikkFixtureId, foot: Fotpunkt): number {
  const fa = fixtureDef(fixtureId)?.fotavtrykk
  if (!fa) return 0
  const v = clamp(invBilinear(foot, g).v, 0, 1)
  return (fa.b / 100) * trapWidthFrac(g, v)
}

// ── Plantegning (ovenfra) ↔ fotpunkt ─────────────────────────────────────────
// Planet er trapesets (u,v) BRETTET UT til et rektangel: x = u (bredde),
// y = dybde der TOPPEN av planet = bakkant (v=1) og BUNNEN = fremkant (v=0).
// Plan og perspektivscene er dermed to visninger av SAMME fotpunkt-layout.
function footToPlan(g: Gulvplan, foot: Fotpunkt): { px: number; py: number } {
  const { u, v } = invBilinear(foot, g)
  return { px: clamp(u, 0, 1) * 100, py: (1 - clamp(v, 0, 1)) * 100 }
}
function planToFoot(g: Gulvplan, u: number, v: number): Fotpunkt {
  return quadPoint(g, clamp(u, 0, 1), clamp(v, 0, 1))
}

/** Skjematisk toppikon per møbel — KUN form/farge. Størrelsen (bredde/dybde)
 *  kommer fra møbelets `fotavtrykk` (samme kilde som scene-bredden). */
const PLAN_ICON: Record<KlesbutikkFixtureId, { round: boolean; color: string }> = {
  'stativ': { round: true, color: '#c98a3c' },
  'stativ-liten': { round: true, color: '#c98a3c' },
  'hylle': { round: false, color: '#8a6a3a' },
  'bord': { round: false, color: '#8a6a3a' },
  'bord-podium': { round: false, color: '#a07a44' },
  'dukke': { round: true, color: '#d16aa8' },
  'dukke-mann': { round: true, color: '#d16aa8' },
  'dukke-barn': { round: true, color: '#d16aa8' },
}

// Interiør = scene (bakt bilde). gulvplan/vareplass/sone er dev-tracere.
// ('plan' er parkert med fri møblering, men beholdt i unionen for død kode.)
type DevMode = 'plan' | 'scene' | 'gulvplan' | 'sone' | 'vareplass' | 'salg'

interface Scene {
  id: 'fasade' | 'interior' | 'kassevy'
  label: string
  img: string
  aspect: number
  hint: string
  target: Target
  drawZone: DrawZone
}

const SCENES: Scene[] = [
  {
    id: 'fasade', label: '🏬 Fasade', img: FASADE_IMG, aspect: 1376 / 768,
    hint: 'Vindusutstillingens sone (KLESBUTIKK_VINDU) — mot gata.',
    target: { id: 'vindu', label: 'vindu', get: () => KLESBUTIKK_VINDU, set: r => writeRect(KLESBUTIKK_VINDU, r) },
    drawZone: { rect: KLESBUTIKK_VINDU, color: '#50dcff', label: 'vindu' },
  },
  {
    id: 'interior', label: '🛍 Interiør', img: INTERIOR_IMG, aspect: 1375 / 768,
    hint: 'Dra plagg fra paletten til de faste vareplassene. Høyreklikk = ta av.',
    target: { id: 'butikkvegg', label: 'butikkvegg', get: () => KLESBUTIKK_BUTIKKVEGG, set: r => writeRect(KLESBUTIKK_BUTIKKVEGG, r) },
    drawZone: { rect: KLESBUTIKK_BUTIKKVEGG, color: '#ffa03c', label: 'butikkvegg', surface: true },
  },
  {
    id: 'kassevy', label: '💰 Kasse', img: KASSEVY_IMG, aspect: 1296 / 832,
    hint: 'Bak-disken-vy. Kunden står i kunde-basen; disken okkluderer underkroppen.',
    target: { id: 'kunde-base', label: 'kunde-base', get: () => KLESBUTIKK_KUNDE_BASE, set: r => writeRect(KLESBUTIKK_KUNDE_BASE, r) },
    drawZone: { rect: KLESBUTIKK_KUNDE_BASE, color: '#50e08c', label: 'kunde-base', dashed: true },
  },
]

export default function KlesbutikkStillas() {
  return <GameProvider><KlesbutikkStillasInner /></GameProvider>
}

function KlesbutikkStillasInner() {
  const navigate = useNavigate()
  const [sceneId, setSceneId] = useState<Scene['id']>('interior')
  const [imgFailed, setImgFailed] = useState(false)
  const [devMode, setDevMode] = useState<DevMode>('scene')
  // Toppnivå-visning: stillaset (scene/tracere) vs. innkjøpskatalogen (🏷 Innkjøp).
  const [topView, setTopView] = useState<'stillas' | 'innkjop'>('stillas')
  const [, setRev] = useState(0)
  const bump = () => setRev(r => r + 1)
  const scene = SCENES.find(s => s.id === sceneId)!
  // Bakt interiør: Interiør ER scenen. Uten dev alltid 'scene'; dev-tracere
  // (gulvplan/vareplass/sone) bak ?dev=1. ('plan' er parkert med fri møblering.)
  const mode: DevMode = IS_DEV_COORDS ? devMode : 'scene'
  const showSlots = IS_DEV_COORDS && mode === 'scene'

  // ── OPPSØKENDE SALG (DEL 1/3) ──────────────────────────────────────────────
  // Dialog-scenarioet ligger på TOPPNIVÅ (overlever scenebytte), så et
  // `avsluttesVedKasse`-scenario kan flytte sluttsteget til kassevyen mens
  // dialogen står åpen. `forcedKasseKunde` viser scenariets kunde i kassevyen.
  const [salgScenario, setSalgScenario] = useState<SalesScenario | null>(null)
  const [forcedKasseKunde, setForcedKasseKunde] = useState<string | null>(null)
  const [spilte, setSpilte] = useState<Set<string>>(() => new Set())
  const startScenario = (sc: SalesScenario) => { setSalgScenario(sc); setForcedKasseKunde(null); setSpilte(p => new Set(p).add(sc.id)) }
  const closeScenario = () => { setSalgScenario(null); setForcedKasseKunde(null); if (sceneId === 'kassevy') setSceneId('interior') }
  const onScenarioStep = (stepId: string) => {
    // Flytt til kassevyen når et avsluttesVedKasse-scenario når 'kasse'-steget.
    if (salgScenario?.avsluttesVedKasse && stepId === 'kasse') {
      setForcedKasseKunde(KLESBUTIKK_SCENARIO_KUNDE[salgScenario.id] ?? null)
      setSceneId('kassevy')
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, fontFamily: "'Outfit', sans-serif",
      background: 'linear-gradient(180deg, #10141a 0%, #1b2230 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      <div style={{
        position: 'fixed', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 90,
        display: 'flex', gap: 8, alignItems: 'center',
        background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '6px 10px',
      }}>
        {SCENES.map(s => (
          <button key={s.id} onClick={() => { setSceneId(s.id); setImgFailed(false); setTopView('stillas') }} style={tabStyle(topView === 'stillas' && s.id === sceneId)}>{s.label}</button>
        ))}
        <button onClick={() => setTopView('innkjop')} style={tabStyle(topView === 'innkjop')}>🏷 Innkjøp</button>
        {/* Bakt interiør: ingen Plan/Scene-veksling (Interiør = scenen). Dev-
            tracere bak ?dev=1; 🛍 Scene lar deg gå tilbake fra en tracer. */}
        {IS_DEV_COORDS && topView === 'stillas' && (
          <span style={{ display: 'flex', gap: 4, marginLeft: 4 }}>
            {(scene.id === 'interior' || scene.id === 'kassevy') && (
              <button onClick={() => setDevMode('scene')} style={tabStyle(mode === 'scene')}>🛍 Scene</button>
            )}
            {scene.id === 'interior' && (
              <>
                <button onClick={() => setDevMode('salg')} style={tabStyle(mode === 'salg')}>🛒 Salg</button>
                <button onClick={() => setDevMode('gulvplan')} style={tabStyle(mode === 'gulvplan')}>📐 Gulvplan</button>
                <button onClick={() => setDevMode('vareplass')} style={tabStyle(mode === 'vareplass')}>📌 Vareplass</button>
              </>
            )}
            <button onClick={() => setDevMode('sone')} style={tabStyle(mode === 'sone')}>🧭 Soner</button>
          </span>
        )}
        <span style={{ color: '#64748b', fontSize: 11, marginLeft: 4 }}>
          KLESBUTIKK-stillas{IS_DEV_COORDS ? '' : ' · ?dev=1 for markører/tracer'}
        </span>
      </div>

      <button onClick={() => navigate('/')} style={{
        position: 'fixed', top: 14, left: 16, zIndex: 90,
        background: 'rgba(10,14,26,0.85)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 10, padding: '5px 12px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
      }}>← Forsiden</button>

      {/* PARKERT: plantegning (fri møblering). PlanView holdes i live men rendres
          aldri (FRI_MOBLERING=false). */}
      {FRI_MOBLERING && mode === 'plan' && <PlanView />}
      {topView === 'innkjop' ? (
        <InnkjopKatalog />
      ) : (
        <div style={{
          position: 'relative', aspectRatio: `${scene.aspect}`,
          width: `min(96vw, calc(86vh * ${scene.aspect}))`, height: 'auto', boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
        }}>
          {!imgFailed ? (
            <img src={scene.img} alt={scene.label} draggable={false} onError={() => setImgFailed(true)}
              style={{ width: '100%', height: '100%', display: 'block', userSelect: 'none' }} />
          ) : (
            <div style={{
              position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #3a4656 0%, #2e3744 100%)',
              border: '1px dashed rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '0 2rem',
            }}>Scenebilde mangler<br />({scene.img})</div>
          )}

          {scene.id === 'interior' ? (
            <>
              {(mode === 'scene' || mode === 'sone') && (
                <FloorLayer interactive={mode === 'scene'} showSlots={showSlots} />
              )}
              {mode === 'salg' && <SalgLayer onContact={startScenario} spilte={spilte} dialogAapen={!!salgScenario} bump={bump} />}
              {mode === 'gulvplan' && <GulvplanTracer bump={bump} />}
              {mode === 'vareplass' && <VareplassTracer bump={bump} />}
            </>
          ) : scene.id === 'kassevy' ? (
            mode !== 'sone' && <KassevyLayer imgSrc={scene.img} forcedKundeId={forcedKasseKunde} />
          ) : (
            mode !== 'sone' && (
              <div style={{
                position: 'absolute', left: `${scene.drawZone.rect[0]}%`, top: `${scene.drawZone.rect[1]}%`,
                width: `${scene.drawZone.rect[2]}%`, height: `${scene.drawZone.rect[3]}%`,
                border: `1px dashed ${scene.drawZone.color}66`, pointerEvents: 'none',
              }} />
            )
          )}

          {mode === 'sone' && (
            <ZoneTracer key={scene.id} onApply={bump} targets={[scene.target]} drawZones={[scene.drawZone]} />
          )}
        </div>
      )}

      <div style={{
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 80,
        background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12,
        padding: '0.4rem 1rem', color: '#cbd5e1', fontSize: 12, whiteSpace: 'nowrap',
      }}>{topView === 'innkjop'
        ? '🏷 Innkjøp: bla per merke, filtrer på kjønn/kategori, sammenlign pris/margin — «Før vare» legger den i sortimentet (vises i styling-paletten).'
        : scene.id === 'interior' && mode === 'gulvplan'
          ? 'Gulvplan-tracer: dra de 4 hjørnene, juster front/bak-skala mot preview-dukkene, «Logg objekt».'
          : scene.id === 'interior' && mode === 'vareplass'
            ? 'Vareplass-tracer: velg type, klikk = ny plass, dra = flytt, ± = scale, «Logg array».'
            : scene.id === 'interior' && mode === 'salg'
              ? '🛒 Salg: velg et scenario → kunden dukker opp på et ståpunkt. Klikk kunden = ta kontakt. Ikke kontaktet i tide = tapt salg.'
              : scene.id === 'kassevy' && IS_DEV_COORDS && mode === 'scene'
                ? 'Kassevy: 🎚️-panelet justerer kunde + disk-okklusjon (5 konstanter), 🧭 Soner sporer kunde-basen. «Logg» → districts.ts.'
                : scene.hint}</div>

      {/* OPPSØKENDE SALG — dialog-overlayet (kafeens dialogkort-UI, gjenbruk).
          Toppnivå: overlever scenebytte, så avsluttesVedKasse kan flytte scenen
          til kassevyen mens dialogen står åpen. */}
      <SalesScenarioOverlay open={!!salgScenario} scenario={salgScenario ?? undefined} onClose={closeScenario} onStep={onScenarioStep} />
    </div>
  )
}

/** Plaggets primærtype (bestemmer hvilke vareplasser det passer på). */
function plaggType(p: Plagg): VareplassType {
  return p.spriteHengFront || p.spriteHengProfil ? 'heng' : p.spriteBrett ? 'brett' : 'antrekk'
}

// ── Ett møbel rendret på gulvet/veggen (bunn-ankret, dybde-skalert) ───────────
// Vareplassene er barn av møbel-boksen, så SNAPPEDE PLAGG følger møbelets
// posisjon/skala automatisk. Slot-ankrene (data-plass) er alltid i DOM-en så
// plagg-snappingen kan finne dem via getBoundingClientRect — uavhengig av
// sprite-bildeforhold.
function FurnitureSprite({ fixtureId, itemId, foot, widthFrac, showSlots, opacity, onPointerDown, onRemove,
  itemBySlot, dragType, dragFixtureFilter, targetPlassId, onRemovePlagg, selectedPlassId, onPlaggDown, onPlaggScale, onPlaggReset,
  overrideSprite, onUndress, vendt }: {
  fixtureId: KlesbutikkFixtureId
  foot: Fotpunkt
  widthFrac: number
  showSlots: boolean
  opacity?: number
  vendt?: boolean
  onPointerDown?: (e: React.PointerEvent) => void
  onRemove?: () => void
  itemId?: string
  itemBySlot?: Record<number, KlesbutikkPlaggItem>
  dragType?: VareplassType | null
  dragFixtureFilter?: KlesbutikkFixtureId | null
  targetPlassId?: string | null
  onRemovePlagg?: (slotIndex: number) => void
  selectedPlassId?: string | null
  onPlaggDown?: (slotIndex: number, e: React.PointerEvent) => void
  onPlaggScale?: (slotIndex: number, delta: number) => void
  onPlaggReset?: (slotIndex: number) => void
  /** Påkledd dukke-sprite som ERSTATTER den nakne dukka (dukke-bytte). */
  overrideSprite?: string
  onUndress?: () => void
}) {
  const def = fixtureDef(fixtureId)
  if (!def) return null
  const vps = itemId ? vareplasser(def) : []
  // Høyreklikk: kledd dukke ⇒ ta av (naken tilbake); ellers ⇒ fjern møbel.
  const ctxMenu = (overrideSprite && onUndress)
    ? (e: React.MouseEvent) => { e.preventDefault(); onUndress() }
    : onRemove ? (e: React.MouseEvent) => { e.preventDefault(); onRemove() } : undefined
  return (
    <div
      data-furniture-box={itemId}
      onPointerDown={onPointerDown}
      onContextMenu={ctxMenu}
      title={overrideSprite ? `${def.navn} (påkledd) — dra for å flytte, høyreklikk = ta av`
        : onRemove ? `${def.navn} — dra for å flytte, høyreklikk for å fjerne` : def.navn}
      style={{
        position: 'absolute', left: `${foot.x}%`, top: `${foot.y}%`,
        width: `${widthFrac * 100}%`,
        // SPEILING: scaleX(-1) etter translate ⇒ hele boksen (møbel + plagg +
        // dukker, som er barn) speiles horisontalt om sitt eget senter, på plass.
        transform: `translate(-50%, -100%)${vendt ? ' scaleX(-1)' : ''}`,
        zIndex: Math.round(foot.y * 10),
        pointerEvents: onPointerDown ? 'auto' : 'none',
        cursor: onPointerDown ? 'grab' : 'default', touchAction: 'none', opacity: opacity ?? 1,
      }}
    >
      <img src={overrideSprite ?? def.sprite} alt={def.navn} draggable={false}
        style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.45))', pointerEvents: 'none' }} />

      {vps.map((s, i) => {
        const plassId = `${itemId}:${i}`
        const item = itemBySlot?.[i]
        const plagg = item ? plaggById(item.plaggId) : undefined
        const free = !plagg && !overrideSprite
        const compat = !!dragType && dragType === s.type && free && (!dragFixtureFilter || dragFixtureFilter === fixtureId)
        const isTarget = targetPlassId === plassId
        const selected = selectedPlassId === plassId
        const plaggSprite = plagg ? spriteFor(plagg, s.type, s.variant) : undefined
        // Plassering/størrelse per type. Antrekk = SKULDER-ANKRET over dukka med
        // kalibrert grunnlinje (baseFit) + elevens finjustering (elevFit). Heng =
        // topp-ankret (henger ned), brett = bunn-ankret (ligger på flaten).
        const isAntrekk = s.type === 'antrekk'
        const bf = isAntrekk && plagg ? baseFit(plagg, fixtureId as DukkeType) : NULL_FIT
        const fx = bf.offsetX + (item?.elevFit?.dx ?? 0)
        const fy = bf.offsetY + (item?.elevFit?.dy ?? 0)
        const fs = bf.scale * (1 + (item?.elevFit?.dScale ?? 0))
        const pStyle: React.CSSProperties = isAntrekk
          ? { left: `${(0.5 + fx) * 100}%`, top: `${(ANTREKK_SHOULDER_Y + fy) * 100}%`, width: `${ANTREKK_BASE_W * fs * 100}%`, transform: 'translate(-50%, 0)' }
          : { left: `${s.x * 100}%`, top: `${s.y * 100}%`, width: '20%', transform: s.type === 'heng' ? 'translate(-50%, -6%)' : 'translate(-50%, -100%)' }
        const canAdjust = isAntrekk && !!onPlaggDown   // elevens påkledning (kun antrekk)
        return (
          <div key={i}>
            {/* Slot-anker (alltid i DOM for snap-deteksjon) */}
            <div data-plass={plassId} data-type={s.type} data-fixture={fixtureId} data-free={free ? '1' : '0'}
              style={{ position: 'absolute', left: `${s.x * 100}%`, top: `${s.y * 100}%`, width: 1, height: 1, pointerEvents: 'none' }} />
            {/* Snappet plagg */}
            {plaggSprite && (
              <img
                src={plaggSprite} alt={plagg!.navn} draggable={false}
                onPointerDown={canAdjust ? (e => onPlaggDown!(i, e)) : undefined}
                onWheel={canAdjust ? (e => onPlaggScale?.(i, e.deltaY < 0 ? 0.04 : -0.04)) : undefined}
                onContextMenu={onRemovePlagg ? (e => { e.preventDefault(); e.stopPropagation(); onRemovePlagg(i) }) : undefined}
                title={canAdjust ? `${plagg!.navn} — dra for å plassere, scroll/± for størrelse, høyreklikk = fjern`
                  : onRemovePlagg ? `${plagg!.navn} — høyreklikk for å fjerne` : plagg!.navn}
                style={{
                  position: 'absolute', ...pStyle, height: 'auto',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
                  outline: selected ? '2px dashed rgba(244,114,182,0.85)' : undefined,
                  pointerEvents: onRemovePlagg ? 'auto' : 'none',
                  cursor: canAdjust ? 'move' : 'context-menu', touchAction: 'none',
                }} />
            )}
            {/* Elev-verktøylinje for valgt antrekk: størrelse ± / tilbakestill */}
            {selected && canAdjust && (
              <div onPointerDown={e => e.stopPropagation()} style={{
                position: 'absolute', left: `${(0.5 + fx) * 100}%`, top: `${(ANTREKK_SHOULDER_Y + fy) * 100}%`,
                transform: 'translate(-50%, -130%)', display: 'flex', gap: 3, alignItems: 'center',
                background: 'rgba(10,14,26,0.92)', border: '1px solid #f472b688', borderRadius: 7, padding: '2px 4px', whiteSpace: 'nowrap',
              }}>
                <button style={miniBtn} title="Mindre" onClick={() => onPlaggScale?.(i, -0.05)}>−</button>
                <span style={{ color: '#f9a8d4', fontSize: 10, fontFamily: 'monospace', minWidth: 30, textAlign: 'center' }}>{Math.round((1 + (item?.elevFit?.dScale ?? 0)) * 100)}%</span>
                <button style={miniBtn} title="Større" onClick={() => onPlaggScale?.(i, 0.05)}>+</button>
                <button style={miniBtn} title="Tilbakestill" onClick={() => onPlaggReset?.(i)}>⟲</button>
              </div>
            )}
            {/* Highlight ledige kompatible plasser under plagg-drag */}
            {compat && (
              <div style={{
                position: 'absolute', left: `${s.x * 100}%`, top: `${s.y * 100}%`,
                width: isTarget ? 18 : 12, height: isTarget ? 18 : 12, transform: 'translate(-50%, -50%)',
                borderRadius: '50%', border: `2px solid ${isTarget ? '#22e6a4' : '#7dd3fc'}`,
                background: isTarget ? 'rgba(34,230,164,0.35)' : 'rgba(125,211,252,0.15)',
                boxShadow: isTarget ? '0 0 10px rgba(34,230,164,0.7)' : 'none', pointerEvents: 'none',
              }} />
            )}
            {/* Dev-markør (kalibrering) */}
            {showSlots && (
              <div title={s.type} style={{
                position: 'absolute', left: `${s.x * 100}%`, top: `${s.y * 100}%`,
                width: 9, height: 9, transform: 'translate(-50%, -50%)', borderRadius: '50%',
                background: SLOT_COLOR[s.type], border: '1px solid rgba(0,0,0,0.55)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.5)', pointerEvents: 'none',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── PLANTEGNING (ovenfra) — primær møbelplassering ───────────────────────────
// 2D-plan der møbler dras inn/flyttes som skjematiske toppikoner. Deler SAMME
// state (klesbutikkFixtureLayout) med perspektivscenen: fotpunkt utledes av
// plan-posisjonen (planToFoot) og omvendt (footToPlan), så endring ett sted
// synes begge steder. Ingen nye assets — alt tegnet med div-er.
function PlanView() {
  const { state, dispatch } = useGame()
  const g = KLESBUTIKK.gulvplan!
  const planRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState(state.klesbutikkFixtureLayout)
  const itemsRef = useRef(items)
  const [drag, setDrag] = useState<{ kind: 'new'; fixtureId: KlesbutikkFixtureId } | { kind: 'move'; id: string } | null>(null)
  const [ghost, setGhost] = useState<{ x: number; y: number } | null>(null)
  // Dev: fotavtrykk-kalibrator (velg møbeltype, ± på b/d, «Logg»). Muterer
  // fixtureDef(...).fotavtrykk direkte — endrer BÅDE plan-ikon og scene-bredde.
  const [calFix, setCalFix] = useState<KlesbutikkFixtureId>('stativ')
  const [, setCalRev] = useState(0)
  const calFa = () => fixtureDef(calFix)!.fotavtrykk
  const calNudge = (db: number, dd: number) => {
    const fa = calFa()
    fa.b = +clamp(fa.b + db, 1, 60).toFixed(1); fa.d = +clamp(fa.d + dd, 1, 60).toFixed(1)
    setCalRev(r => r + 1)
  }
  const calLog = () => console.log(`[Fotavtrykk] '${calFix}': { b: ${calFa().b}, d: ${calFa().d} },  ← lim inn i KLESBUTIKK_FIXTURES (klesbutikkFixtures.ts)`)

  const commit = (next: typeof items) => { itemsRef.current = next; setItems(next); dispatch({ type: 'SET_KLESBUTIKK_FIXTURES', items: next }) }
  const planUV = (cx: number, cy: number) => {
    const r = planRef.current?.getBoundingClientRect(); if (!r) return null
    return { u: (cx - r.left) / r.width, v: 1 - (cy - r.top) / r.height, inside: cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom }
  }

  function startNew(fixtureId: KlesbutikkFixtureId, e: React.PointerEvent) {
    e.preventDefault()
    setDrag({ kind: 'new', fixtureId }); setGhost({ x: e.clientX, y: e.clientY })
    const onMove = (ev: PointerEvent) => setGhost({ x: ev.clientX, y: ev.clientY })
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true)
      setDrag(null); setGhost(null)
      const pp = planUV(ev.clientX, ev.clientY); if (!pp || !pp.inside) return
      commit([...itemsRef.current, { id: uid(), fixtureId, fotpunkt: planToFoot(g, pp.u, pp.v) }])
    }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }
  function startMove(id: string, e: React.PointerEvent) {
    e.preventDefault(); e.stopPropagation()
    const x0 = e.clientX, y0 = e.clientY; let moved = false
    setDrag({ kind: 'move', id })
    const onMove = (ev: PointerEvent) => {
      if (!moved && Math.abs(ev.clientX - x0) < 4 && Math.abs(ev.clientY - y0) < 4) return
      moved = true
      const pp = planUV(ev.clientX, ev.clientY); if (!pp) return
      const next = itemsRef.current.map(i => i.id === id ? { ...i, fotpunkt: planToFoot(g, pp.u, pp.v) } : i)
      itemsRef.current = next; setItems(next)
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true)
      setDrag(null)
      if (moved) dispatch({ type: 'SET_KLESBUTIKK_FIXTURES', items: itemsRef.current })
      else commit(itemsRef.current.map(i => i.id === id ? { ...i, vendt: !i.vendt } : i)) // klikk uten dra = speil ↔
    }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }
  const remove = (id: string) => commit(itemsRef.current.filter(i => i.id !== id))

  return (
    <div style={{ position: 'relative', aspectRatio: '1.35', width: 'min(94vw, calc(82vh * 1.35))', height: 'auto' }}>
      {/* Plan-gulv (skjematisk) */}
      <div ref={planRef} style={{
        position: 'absolute', inset: 0, borderRadius: 8, overflow: 'hidden', touchAction: 'none',
        background: 'repeating-linear-gradient(90deg, #3a2c1e, #3a2c1e 5.5%, #423523 5.5%, #423523 11%)',
        border: '2px solid #5a4632', boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      }}>
        {/* Bakvegg (topp) — utstillingsveggen */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '7%', background: '#4a5568', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e2e8f0', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', pointerEvents: 'none' }}>◄ BAKVEGG · utstilling ►</div>
        {/* Vindu + dør på venstre vegg */}
        <div style={{ position: 'absolute', left: 0, top: '22%', width: '2.5%', height: '38%', background: 'rgba(125,211,252,0.55)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: '3.5%', top: '38%', color: '#7dd3fc', fontSize: 10, pointerEvents: 'none' }}>vindu</div>
        <div style={{ position: 'absolute', left: 0, top: '68%', width: '2.5%', height: '13%', background: 'rgba(201,138,60,0.7)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: '3.5%', top: '71%', color: '#c98a3c', fontSize: 10, pointerEvents: 'none' }}>dør</div>
        {/* Front (bunn) */}
        <div style={{ position: 'absolute', bottom: 3, left: 0, right: 0, textAlign: 'center', color: '#94a3b8', fontSize: 10, pointerEvents: 'none' }}>front (mot kunde / kamera)</div>

        {/* Møbel-toppikoner — størrelsen = møbelets fotavtrykk (samme kilde som
            scene-bredden), så plan og scene er proporsjonale. */}
        {items.map(it => {
          const ic = PLAN_ICON[it.fixtureId]; const def = fixtureDef(it.fixtureId); if (!ic || !def) return null
          const { px, py } = footToPlan(g, it.fotpunkt)
          const moving = drag?.kind === 'move' && drag.id === it.id
          return (
            <div key={it.id}
              onPointerDown={e => startMove(it.id, e)}
              onContextMenu={e => { e.preventDefault(); remove(it.id) }}
              title={`${def.navn} — dra = flytt · klikk = speil (↔) · høyreklikk = fjern`}
              style={{
                position: 'absolute', left: `${px}%`, top: `${py}%`, width: `${def.fotavtrykk.b}%`, height: `${def.fotavtrykk.d}%`,
                transform: `translate(-50%, -50%)${it.vendt ? ' scaleX(-1)' : ''}`, background: ic.color,
                border: it.vendt ? '1px solid #38bdf8' : '1px solid rgba(0,0,0,0.55)',
                borderRadius: ic.round ? '50% / 45%' : 3, cursor: moving ? 'grabbing' : 'grab', touchAction: 'none',
                boxShadow: moving ? '0 0 8px rgba(255,255,255,0.6)' : it.vendt ? '0 0 6px rgba(56,189,248,0.7)' : '0 1px 3px rgba(0,0,0,0.4)',
              }}>
              {/* Navnelapp — scaleX(-1) på nytt så teksten leses riktig når møbelet er vendt */}
              <span style={{ position: 'absolute', left: '50%', top: '108%', transform: `translateX(-50%)${it.vendt ? ' scaleX(-1)' : ''}`, fontSize: 9, fontWeight: 700, color: '#e8ddc8', whiteSpace: 'nowrap', textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>{def.navn}{it.vendt ? ' ↔' : ''}</span>
            </div>
          )
        })}
      </div>

      {/* Møbel-palett (portal) */}
      {createPortal(
        <div style={{
          position: 'fixed', top: 56, right: 16, zIndex: 95, width: 158, maxHeight: '76vh', overflowY: 'auto',
          background: 'rgba(10,14,26,0.94)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12, padding: '10px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#f1f5f9', fontSize: 12, fontWeight: 800, marginBottom: 8 }}>🪑 Møbler</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {KLESBUTIKK_FIXTURES.map(def => (
              <div key={def.id} onPointerDown={e => startNew(def.id, e)} title={`${def.navn} — dra inn på planen`}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9, padding: '5px 7px', cursor: 'grab', userSelect: 'none', touchAction: 'none' }}>
                <div style={{ width: 30, height: 30, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={def.sprite} alt="" draggable={false} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.15 }}>{def.navn}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 8, lineHeight: 1.4 }}>
            Dra inn på planen · klikk et møbel = speil (↔). Bytt til 🛍 Scene for å style med plagg/dukker.
          </div>
        </div>, document.body)}

      {/* Fotavtrykk-kalibrator (?dev=1) — venstre side, kolliderer ikke med paletten */}
      {IS_DEV_COORDS && createPortal(
        <div style={{
          position: 'fixed', top: 56, left: 16, zIndex: 95, width: 190,
          background: 'rgba(10,14,26,0.95)', border: '1px solid #d16aa855', borderRadius: 12, padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#d16aa8', fontSize: 12, fontWeight: 800, marginBottom: 6 }}>📐 Fotavtrykk</div>
          <div style={{ color: '#94a3b8', fontSize: 10, lineHeight: 1.4, marginBottom: 8 }}>
            Velg møbel, juster bredde (b) / dybde (d). Endrer plan-ikon OG scene-bredde samtidig.
          </div>
          <select value={calFix} onChange={e => setCalFix(e.target.value as KlesbutikkFixtureId)} style={{
            width: '100%', marginBottom: 8, background: 'rgba(255,255,255,0.06)', color: '#f1f5f9',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 7, padding: '4px 6px', fontSize: 11, fontFamily: "'Outfit', sans-serif",
          }}>
            {KLESBUTIKK_FIXTURES.map(f => <option key={f.id} value={f.id}>{f.navn}</option>)}
          </select>
          {([['b', 'bredde'], ['d', 'dybde']] as const).map(([k, lbl]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ color: '#94a3b8', fontSize: 11, flex: 1 }}>{lbl} ({k})</span>
              <button style={miniBtn} onClick={() => calNudge(k === 'b' ? -0.5 : 0, k === 'd' ? -0.5 : 0)}>−</button>
              <span style={{ color: '#f1f5f9', fontSize: 11, fontFamily: 'monospace', minWidth: 34, textAlign: 'center' }}>{calFa()[k].toFixed(1)}</span>
              <button style={miniBtn} onClick={() => calNudge(k === 'b' ? 0.5 : 0, k === 'd' ? 0.5 : 0)}>+</button>
            </div>
          ))}
          <button style={{ ...miniBtn, width: '100%', height: 26, fontSize: 11, fontWeight: 800, marginTop: 4 }} onClick={calLog}>Logg → konsoll</button>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>
            Plasser samme møbel og se plan/scene proporsjonalt. Lim tallet inn i klesbutikkFixtures.ts.
          </div>
        </div>, document.body)}

      {/* Palett-drag-spøkelse */}
      {drag?.kind === 'new' && ghost && (() => {
        const def = fixtureDef(drag.fixtureId); if (!def) return null
        return createPortal(
          <img src={def.sprite} alt="" draggable={false} style={{ position: 'fixed', left: ghost.x, top: ghost.y, width: 46, transform: 'translate(-50%, -50%)', zIndex: 9999, pointerEvents: 'none', opacity: 0.8 }} />,
          document.body)
      })()}
    </div>
  )
}

// ── Gulvbasert plassering ────────────────────────────────────────────────────
function FloorLayer({ interactive, showSlots }: { interactive: boolean; showSlots: boolean }) {
  const { state, dispatch } = useGame()
  const g = KLESBUTIKK.gulvplan!
  const overlayRef = useRef<HTMLDivElement>(null)
  // DEL 3: styling-paletten viser KUN FØRTE plagg (fra Innkjøp). ?dev=1 gir en
  // «vis alle»-bryter så kalibrering ikke avhenger av føring.
  const fortePlagg = forteplaggIds(state.klesbutikkSortiment)
  const [visAllePlagg, setVisAllePlagg] = useState(false)
  const [items, setItems] = useState(state.klesbutikkFixtureLayout)
  const itemsRef = useRef(items)
  const [newType, setNewType] = useState<KlesbutikkFixtureId | null>(null)
  const [ghostFoot, setGhostFoot] = useState<Fotpunkt | null>(null)

  // Plagg-snapping (presentasjonslag)
  const [plaggItems, setPlaggItems] = useState(state.klesbutikkPlaggLayout)
  const plaggRef = useRef(plaggItems)
  // `id` = plaggId (heng/brett) ELLER påkledd-dukke-id (antrekk-bytte).
  // `fixtureFilter` (kun dukke-bytte) begrenser antrekk-plasser til matchende dukketype.
  // `hengVarianter` (kun heng) = variantene plagget støtter → front/profil-plass-filter.
  const [dragPlagg, setDragPlagg] = useState<{ id: string; type: VareplassType; sprite: string; fixtureFilter?: KlesbutikkFixtureId; hengVarianter?: HengVariant[] } | null>(null)
  const [plaggGhost, setPlaggGhost] = useState<{ x: number; y: number } | null>(null)
  const [targetPlassId, setTargetPlassId] = useState<string | null>(null)
  const commitPlagg = (next: typeof plaggItems) => { plaggRef.current = next; setPlaggItems(next); dispatch({ type: 'SET_KLESBUTIKK_PLAGG', items: next }) }

  // FASTE VAREPLASSER (bakt interiør): plassId = vareplass-id (uten ':', så de
  // skilles fra de PARKERTE møbel-slotene «itemId:slot»).
  const vareplasser = KLESBUTIKK.vareplasser ?? []
  const plassIds = new Set(vareplasser.map(v => v.id))
  const plaggByPlass: Record<string, KlesbutikkPlaggItem> = {}
  // itemId → { slotIndex → plaggItem }  (PARKERT møbel-styling; vareplass-plagg utenfor)
  const itemByFurniture: Record<string, Record<number, KlesbutikkPlaggItem>> = {}
  for (const pi of plaggItems) {
    if (plassIds.has(pi.plassId)) { plaggByPlass[pi.plassId] = pi; continue }
    const [fid, si] = pi.plassId.split(':')
    ;(itemByFurniture[fid] ??= {})[Number(si)] = pi
  }
  const [selAntrekk, setSelAntrekk] = useState<string | null>(null)   // valgt antrekk-plassId
  const setPlaggLocal = (next: typeof plaggItems) => { plaggRef.current = next; setPlaggItems(next) }
  const persistPlagg = () => dispatch({ type: 'SET_KLESBUTIKK_PLAGG', items: plaggRef.current })
  const patchElev = (plassId: string, ef: ElevFit) =>
    plaggRef.current.map(pi => pi.plassId === plassId ? { ...pi, elevFit: ef } : pi)

  const commit = (next: typeof items) => { itemsRef.current = next; setItems(next); dispatch({ type: 'SET_KLESBUTIKK_FIXTURES', items: next }) }
  const persist = () => dispatch({ type: 'SET_KLESBUTIKK_FIXTURES', items: itemsRef.current })

  const inBounds = (cx: number, cy: number, r: DOMRect) => cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom
  const pctAt = (cx: number, cy: number, r: DOMRect): Pt => ({ x: ((cx - r.left) / r.width) * 100, y: ((cy - r.top) / r.height) * 100 })

  function startNew(fixtureId: KlesbutikkFixtureId, e: React.PointerEvent) {
    e.preventDefault()
    setNewType(fixtureId); setGhostFoot(null)
    const onMove = (ev: PointerEvent) => {
      const r = overlayRef.current?.getBoundingClientRect(); if (!r) return
      setGhostFoot(clampFoot(g, pctAt(ev.clientX, ev.clientY, r)))
    }
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true)
      const r = overlayRef.current?.getBoundingClientRect()
      setNewType(null); setGhostFoot(null)
      if (!r || !inBounds(ev.clientX, ev.clientY, r)) return    // sluppet utenfor scenen ⇒ avbryt
      const foot = clampFoot(g, pctAt(ev.clientX, ev.clientY, r))
      commit([...itemsRef.current, { id: uid(), fixtureId, fotpunkt: foot }])
    }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }

  function startMove(id: string, e: React.PointerEvent) {
    e.preventDefault(); e.stopPropagation()
    const item = itemsRef.current.find(i => i.id === id); if (!item) return
    const onMove = (ev: PointerEvent) => {
      const r = overlayRef.current?.getBoundingClientRect(); if (!r) return
      const foot = clampFoot(g, pctAt(ev.clientX, ev.clientY, r))
      const next = itemsRef.current.map(i => i.id === id ? { ...i, fotpunkt: foot } : i)
      itemsRef.current = next; setItems(next)
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true)
      persist()
    }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }

  const remove = (id: string) => commit(itemsRef.current.filter(i => i.id !== id))

  // Nærmeste LEDIGE, kompatible vareplass til (cx,cy) — leser slot-ankrene
  // (data-plass) fra DOM-en, så vi slipper sprite-bildeforhold-matematikk.
  function nearestSlot(type: VareplassType, cx: number, cy: number, fixtureFilter?: KlesbutikkFixtureId, hengVarianter?: HengVariant[]): string | null {
    const r = overlayRef.current?.getBoundingClientRect(); if (!r) return null
    let best: string | null = null, bestD = Infinity
    document.querySelectorAll<HTMLElement>('[data-plass]').forEach(el => {
      if (el.dataset.type !== type || el.dataset.free !== '1') return
      if (fixtureFilter && el.dataset.fixture !== fixtureFilter) return
      // Heng: front/profil-plass tar kun plagg som støtter plassens variant.
      if (type === 'heng') {
        const v = (el.dataset.variant ?? 'front') as HengVariant
        if (!hengVarianter || !hengVarianter.includes(v)) return
      }
      const b = el.getBoundingClientRect(); const sx = b.left + b.width / 2, sy = b.top + b.height / 2
      const d = Math.hypot(cx - sx, cy - sy)
      if (d < bestD) { bestD = d; best = el.dataset.plass ?? null }
    })
    return best && bestD <= 0.07 * r.width ? best : null
  }

  // Felles drag → snap (plagg ELLER påkledd dukke). `id` lagres i plaggId-feltet.
  function beginSnapDrag(id: string, type: VareplassType, sprite: string, e: React.PointerEvent, fixtureFilter?: KlesbutikkFixtureId, hengVarianter?: HengVariant[]) {
    e.preventDefault()
    setDragPlagg({ id, type, sprite, fixtureFilter, hengVarianter }); setPlaggGhost({ x: e.clientX, y: e.clientY }); setTargetPlassId(null)
    const onMove = (ev: PointerEvent) => {
      setPlaggGhost({ x: ev.clientX, y: ev.clientY })
      setTargetPlassId(nearestSlot(type, ev.clientX, ev.clientY, fixtureFilter, hengVarianter))
    }
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true)
      const target = nearestSlot(type, ev.clientX, ev.clientY, fixtureFilter, hengVarianter)
      setDragPlagg(null); setPlaggGhost(null); setTargetPlassId(null)
      if (target) commitPlagg([...plaggRef.current.filter(pi => pi.plassId !== target), { plassId: target, plaggId: id }])
    }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }
  // `forceVariant` (fra palettens front/profil-undergruppe) låser drag-varianten
  // for dual-variant-plagg; utelatt = utled fra plaggets sprite-kapasitet.
  function startPlaggDrag(plaggId: string, e: React.PointerEvent, forceVariant?: HengVariant) {
    const p = plaggById(plaggId); if (!p) return
    const isHeng = plaggType(p) === 'heng'
    const hengVarianter = isHeng
      ? (forceVariant ? [forceVariant] : (['front', 'profil'] as HengVariant[]).filter(v => plaggStøtterHengVariant(p, v)))
      : undefined
    const sprite = isHeng
      ? (spriteFor(p, 'heng', forceVariant ?? (hengVarianter?.[0] ?? 'front')) ?? '')
      : (p.spriteBrett ?? p.spriteAntrekk ?? '')
    beginSnapDrag(plaggId, plaggType(p), sprite, e, undefined, hengVarianter)
  }
  function startDukkeDrag(dukkeId: string, e: React.PointerEvent) {
    const dk = dukkeById(dukkeId); if (!dk) return
    beginSnapDrag(dukkeId, 'antrekk', dk.sprite, e, FIXTURE_FOR_DUKKETYPE[dk.dukketype])
  }

  const removePlaggAt = (itemId: string, slot: number) => {
    const pid = `${itemId}:${slot}`
    if (selAntrekk === pid) setSelAntrekk(null)
    commitPlagg(plaggRef.current.filter(pi => pi.plassId !== pid))
  }
  const removePlassPlagg = (vid: string) => commitPlagg(plaggRef.current.filter(pi => pi.plassId !== vid))

  // ── Elevens påkledning: dra antrekket på dukka (klemte grenser), scale ±20 %,
  // tilbakestill. OPPÅ den kalibrerte grunnlinja (antrekkFit). Kun antrekk. ──
  function startAntrekkDrag(plassId: string, e: React.PointerEvent) {
    e.preventDefault(); e.stopPropagation()
    setSelAntrekk(plassId)
    const boxEl = (e.currentTarget as HTMLElement).closest('[data-furniture-box]') as HTMLElement | null
    if (!boxEl) return
    const cur = plaggRef.current.find(pi => pi.plassId === plassId)?.elevFit ?? { dx: 0, dy: 0, dScale: 0 }
    const sx = e.clientX, sy = e.clientY
    const onMove = (ev: PointerEvent) => {
      const r = boxEl.getBoundingClientRect()
      const ndx = clamp(cur.dx + (ev.clientX - sx) / r.width, -ELEV_MAX, ELEV_MAX)
      const ndy = clamp(cur.dy + (ev.clientY - sy) / r.height, -ELEV_MAX, ELEV_MAX)
      setPlaggLocal(patchElev(plassId, { dx: ndx, dy: ndy, dScale: cur.dScale }))
    }
    const onUp = () => { window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true); persistPlagg() }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }
  const scaleElev = (plassId: string, delta: number) => {
    const cur = plaggRef.current.find(pi => pi.plassId === plassId)?.elevFit ?? { dx: 0, dy: 0, dScale: 0 }
    setSelAntrekk(plassId)
    commitPlagg(patchElev(plassId, { ...cur, dScale: clamp(cur.dScale + delta, -ELEV_SCALE_MAX, ELEV_SCALE_MAX) }))
  }
  const resetElev = (plassId: string) =>
    commitPlagg(plaggRef.current.map(pi => pi.plassId === plassId ? { plassId: pi.plassId, plaggId: pi.plaggId } : pi))

  // ── Dev-kalibrator: sett GRUNNLINJA (antrekkFit) for valgt antrekk × dukketype,
  // mutér-og-logg (?dev=1). Skiller fra elevens elevFit (som ligger oppå). ──
  const [calPerDukke, setCalPerDukke] = useState(false)
  const [, setCalRev] = useState(0)
  const selInfo = (() => {
    if (!selAntrekk) return null
    const [fid] = selAntrekk.split(':')
    const fx = items.find(i => i.id === fid)
    const pi = plaggItems.find(p => p.plassId === selAntrekk)
    if (!fx || !pi || !DUKKE_TYPER.includes(fx.fixtureId)) return null
    const plagg = plaggById(pi.plaggId); if (!plagg) return null
    return { plagg, dukke: fx.fixtureId as DukkeType }
  })()
  const calBaseline = () => selInfo ? baseFit(selInfo.plagg, selInfo.dukke) : NULL_FIT
  function calSet(f: { offsetX: number; offsetY: number; scale: number }) {
    if (!selInfo) return
    const { plagg, dukke } = selInfo
    if (!plagg.antrekkFit) plagg.antrekkFit = { default: { ...NULL_FIT } }
    if (calPerDukke) (plagg.antrekkFit.perDukke ??= {})[dukke] = f
    else plagg.antrekkFit.default = f
    setCalRev(r => r + 1)
  }
  const calNudge = (dx: number, dy: number, ds: number) => {
    const c = calBaseline()
    calSet({ offsetX: +(c.offsetX + dx).toFixed(3), offsetY: +(c.offsetY + dy).toFixed(3), scale: +clamp(c.scale + ds, 0.3, 2.5).toFixed(2) })
  }
  const calLog = () => selInfo && console.log(`[AntrekkFit] '${selInfo.plagg.id}': ${JSON.stringify(selInfo.plagg.antrekkFit)},  ← lim inn i ANTREKK_FIT (klesbutikkPlagg.ts)`)

  const sorted = [...items].sort((a, b) => a.fotpunkt.y - b.fotpunkt.y)

  return (
    <div ref={overlayRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* (Fjernet: gulv-trapes-overlayet — en møbel-plasseringshjelp fra fri
          møblering. Bakt interiør styler faste vareplasser, så det er borte.) */}

      {/* PARKERT (fri møblering): plasserte møbler i scenen. Møblene er nå BAKT
          inn i scenebildet — elevene styler faste vareplasser i stedet. */}
      {FRI_MOBLERING && sorted.map(it => {
        const def = fixtureDef(it.fixtureId); if (!def) return null
        const w = sceneWidthFrac(g, it.fixtureId, it.fotpunkt)
        // DUKKE-BYTTE: er dukka kledd på (antrekk-slot 0 opptatt av en påkledd
        // dukke)? → erstatt naken dukke-sprite med den påkledde.
        const isDukke = DUKKE_TYPER.includes(it.fixtureId)
        const dressed = isDukke ? itemByFurniture[it.id]?.[0] : undefined
        const overrideSprite = dressed ? dukkeById(dressed.plaggId)?.sprite : undefined
        return (
          <FurnitureSprite key={it.id} fixtureId={it.fixtureId} itemId={it.id} foot={it.fotpunkt} widthFrac={w}
            showSlots={showSlots} vendt={it.vendt}
            onPointerDown={interactive ? (e => startMove(it.id, e)) : undefined}
            onRemove={interactive ? () => remove(it.id) : undefined}
            itemBySlot={itemByFurniture[it.id]}
            dragType={dragPlagg?.type ?? null}
            dragFixtureFilter={dragPlagg?.fixtureFilter ?? null}
            targetPlassId={targetPlassId}
            onRemovePlagg={interactive ? (slot => removePlaggAt(it.id, slot)) : undefined}
            selectedPlassId={selAntrekk}
            onPlaggDown={interactive ? ((slot, e) => startAntrekkDrag(`${it.id}:${slot}`, e)) : undefined}
            onPlaggScale={interactive ? ((slot, d) => scaleElev(`${it.id}:${slot}`, d)) : undefined}
            onPlaggReset={interactive ? (slot => resetElev(`${it.id}:${slot}`)) : undefined}
            overrideSprite={overrideSprite}
            onUndress={interactive ? () => removePlaggAt(it.id, 0) : undefined} />
        )
      })}

      {/* FASTE VAREPLASSER (bakt interiør): for hver plass et data-plass-anker
          (alltid i DOM for snap-deteksjon) + det snappede elementet. Snap-typen
          gjenbruker eksisterende maskineri: heng/brett direkte, 'dukke' → 'antrekk'
          med dukketype-filter. Heng = topp-ankret, brett/dukke = bunn-ankret.
          Usynlig når tom (elementet dekker plassen). Høyreklikk = ta av/fjern. */}
      {vareplasser.map(vp => {
        const item = plaggByPlass[vp.id]
        const free = !item
        const snapType: VareplassType = vp.type === 'dukke' ? 'antrekk' : vp.type
        const dataFixture = vp.type === 'dukke' ? FIXTURE_FOR_DUKKETYPE[vp.dukketype ?? 'dame'] : 'plass'
        const plassVar: HengVariant = vp.variant ?? 'front'   // kun relevant for heng
        // Hva rendres når plassen er opptatt, og hvordan ankres det?
        let sprite: string | undefined, navn = ''
        if (item) {
          if (vp.type === 'dukke') { const dk = dukkeById(item.plaggId); sprite = dk?.sprite; navn = dk?.navn ?? '' }
          else { const p = plaggById(item.plaggId); if (p) { sprite = spriteFor(p, snapType, vp.type === 'heng' ? plassVar : undefined); navn = p.navn } }
        }
        const dragActive = !!dragPlagg
        const compat = dragActive && dragPlagg!.type === snapType && free
          && (vp.type !== 'dukke' || dragPlagg!.fixtureFilter === dataFixture)
          && (vp.type !== 'heng' || !!dragPlagg!.hengVarianter?.includes(plassVar))
        // SNAP-FEEDBACK: under drag dimmes alt som IKKE er en kompatibel ledig plass.
        const dimmed = dragActive && !compat
        const isTarget = targetPlassId === vp.id
        const erProfil = vp.type === 'heng' && plassVar === 'profil'
        const markCol = erProfil ? PROFIL_COLOR : PLASS_COLOR[vp.type]
        const xf = plassTransform(vp)
        return (
          <div key={vp.id}>
            {/* Snap-anker (data-variant kun heng: front/profil-plass-filter) */}
            <div data-plass={vp.id} data-type={snapType} data-fixture={dataFixture} data-free={free ? '1' : '0'}
              data-variant={vp.type === 'heng' ? plassVar : undefined}
              style={{ position: 'absolute', left: `${vp.x}%`, top: `${vp.y}%`, width: 1, height: 1, pointerEvents: 'none' }} />
            {/* Snappet element (m/valgfri rot/skew) */}
            {sprite && (
              <img src={sprite} alt={navn} draggable={false}
                onContextMenu={interactive ? (e => { e.preventDefault(); e.stopPropagation(); removePlassPlagg(vp.id) }) : undefined}
                title={interactive ? `${navn} — høyreklikk for å ${vp.type === 'dukke' ? 'ta av' : 'fjerne'}` : navn}
                style={{
                  position: 'absolute', left: `${vp.x}%`, top: `${vp.y}%`, width: `${vp.scale * 100}%`, height: 'auto',
                  transform: xf.transform, transformOrigin: xf.transformOrigin,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
                  opacity: dimmed ? 0.35 : 1, transition: 'opacity 0.12s',
                  pointerEvents: interactive ? 'auto' : 'none', cursor: interactive ? 'context-menu' : 'default', touchAction: 'none',
                  zIndex: Math.round(vp.y * 10),
                }} />
            )}
            {/* SNAP-FEEDBACK: kompatibel ledig plass = GRØNN ring (nærmeste = fylt + glød) */}
            {compat && (
              <div style={{
                position: 'absolute', left: `${vp.x}%`, top: `${vp.y}%`,
                width: isTarget ? 20 : 13, height: isTarget ? 20 : 13, transform: 'translate(-50%, -50%)',
                borderRadius: '50%', border: `2px solid #22e6a4`,
                background: isTarget ? 'rgba(34,230,164,0.45)' : 'rgba(34,230,164,0.15)',
                boxShadow: isTarget ? '0 0 12px rgba(34,230,164,0.8)' : '0 0 5px rgba(34,230,164,0.4)', pointerEvents: 'none',
              }} />
            )}
            {/* Dev-markør (farge per type; profil-heng = lilla firkant) */}
            {showSlots && free && (
              <div title={`${vp.type}${erProfil ? '·profil' : ''} ${vp.id}`} style={{
                position: 'absolute', left: `${vp.x}%`, top: `${vp.y}%`,
                width: 9, height: 9, transform: 'translate(-50%, -50%)', borderRadius: erProfil ? 2 : '50%',
                border: `1.5px solid ${markCol}`, background: `${markCol}55`, pointerEvents: 'none',
              }} />
            )}
          </div>
        )
      })}

      {/* PARKERT (fri møblering): preview under møbel-palett-drag */}
      {FRI_MOBLERING && newType && ghostFoot && (() => {
        const def = fixtureDef(newType); if (!def) return null
        return <FurnitureSprite fixtureId={newType} foot={ghostFoot}
          widthFrac={sceneWidthFrac(g, newType, ghostFoot)} showSlots={false} opacity={0.6} />
      })()}

      {/* PARKERT (fri møblering): møbel-paletten. Møbler er bakt inn i scenen. */}
      {FRI_MOBLERING && interactive && createPortal(
        <div style={{
          position: 'fixed', top: 56, right: 16, zIndex: 95, width: 158, maxHeight: '76vh', overflowY: 'auto',
          background: 'rgba(10,14,26,0.94)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12, padding: '10px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#f1f5f9', fontSize: 12, fontWeight: 800, marginBottom: 8 }}>🪑 Møbler</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {KLESBUTIKK_FIXTURES.map(def => (
              <div key={def.id} onPointerDown={e => startNew(def.id, e)}
                title={`${def.navn} — dra ut på gulvet (${kapasitet(def)} vareplasser)`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9, padding: '5px 7px', cursor: 'grab', userSelect: 'none', touchAction: 'none',
                }}>
                <div style={{ width: 30, height: 30, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={def.sprite} alt="" draggable={false} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.15 }}>{def.navn}</div>
                  <div style={{ fontSize: 9, color: '#64748b' }}>{kapasitet(def)} plasser</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 8, lineHeight: 1.4 }}>
            Dra ut på gulvet (skalerer med dybden) · dra plassert møbel for å flytte · høyreklikk = fjern
          </div>
        </div>, document.body)}

      {/* Klespalett (portal, venstre) — dra plagg til kompatible vareplasser */}
      {interactive && createPortal(
        <div style={{
          position: 'fixed', top: 56, left: 16, zIndex: 95, width: 168, maxHeight: '78vh', overflowY: 'auto',
          background: 'rgba(10,14,26,0.94)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12, padding: '10px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#f1f5f9', fontSize: 12, fontWeight: 800, marginBottom: 4 }}>👕 Plagg &amp; dukker</div>
          <div style={{ fontSize: 9, color: '#64748b', marginBottom: 8, lineHeight: 1.4 }}>
            Dra: heng→stativ, brett→hylle/bord, påkledd dukke→matchende naken dukke.
          </div>
          {/* STANDARD = KUN FØRTE (både dev og produksjon). Dev-bryteren er et
              KALIBRERINGS-override (vis også uførte plagg) — tydelig DEV-merket,
              ALLTID AV ved oppstart (useState(false), og FloorLayer remountes ved
              fane-/modusbytte så den nullstilles). Når PÅ vises et banner så
              paletten aldri forveksles med en brutt føring-kobling. */}
          {IS_DEV_COORDS && (
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#ffd24a', marginBottom: visAllePlagg ? 4 : 8, cursor: 'pointer', border: '1px solid #ffd24a55', borderRadius: 6, padding: '4px 6px' }}>
              <input type="checkbox" checked={visAllePlagg} onChange={e => setVisAllePlagg(e.target.checked)} />
              <span><b>DEV:</b> vis uførte (kalibrering)</span>
            </label>
          )}
          {IS_DEV_COORDS && visAllePlagg && (
            <div style={{ fontSize: 9, color: '#ffd24a', background: 'rgba(255,210,74,0.1)', border: '1px solid #ffd24a44', borderRadius: 6, padding: '5px 6px', marginBottom: 8, lineHeight: 1.35 }}>
              ⚠ Viser ALLE plagg (også uførte) — kun for kalibrering. Skru av for å
              se det faktiske sortimentet fra 🏷 Innkjøp.
            </div>
          )}
          {/* Tom føring → tom palett med hint (med mindre dev-override er på). */}
          {!visAllePlagg && fortePlagg.size === 0 && (
            <div style={{ fontSize: 11, color: '#fca5a5', background: 'rgba(239,68,68,0.1)', border: '1px solid #ef444455', borderRadius: 8, padding: '8px', marginBottom: 8, lineHeight: 1.4 }}>
              Ingen varer ført. Gå til <b>🏷 Innkjøp</b> og velg sortiment — plaggene dukker opp her.
            </div>
          )}
          {/* Heng (front) · Heng — PROFIL · Brett. Viser KUN FØRTE plagg som standard;
              DEV-override «vis uførte» un-gater (kalibrering). forceVariant låser drag-varianten. */}
          {([
            { key: 'front', tittel: 'Hengende', col: SLOT_COLOR.heng, variant: 'front' as HengVariant | undefined, sprite: (p: Plagg) => p.spriteHengFront },
            { key: 'profil', tittel: 'Hengende — profil', col: PROFIL_COLOR, variant: 'profil' as HengVariant | undefined, sprite: (p: Plagg) => p.spriteHengProfil },
            { key: 'brett', tittel: 'Brettet', col: SLOT_COLOR.brett, variant: undefined, sprite: (p: Plagg) => p.spriteBrett },
          ]).map(grp => {
            const list = KLESBUTIKK_PLAGG.filter(p => !!grp.sprite(p) && (visAllePlagg || fortePlagg.has(p.id)))
            if (!list.length) return null
            return (
              <div key={grp.key} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: grp.col, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {grp.tittel} <span style={{ opacity: 0.6, fontWeight: 400 }}>({list.length})</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
                  {list.map(p => (
                    <div key={p.id} onPointerDown={e => startPlaggDrag(p.id, e, grp.variant)} title={p.navn}
                      style={{ aspectRatio: '1', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, cursor: 'grab', touchAction: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                      <img src={grp.sprite(p)} alt="" draggable={false} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
          {/* Påkledde dukker (erstatter ghost-antrekk) — gruppert på dukketype */}
          {(['dame', 'herre', 'barn'] as Dukketype[]).map(dt => {
            const list = KLESBUTIKK_DUKKER.filter(d => d.dukketype === dt)
            return (
              <div key={dt} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#f472b6', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  🧍 Påkledd {dt}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
                  {list.map(d => (
                    <div key={d.id} onPointerDown={e => startDukkeDrag(d.id, e)} title={`${d.navn} (${d.dukketype})`}
                      style={{ aspectRatio: '0.5', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, cursor: 'grab', touchAction: 'none', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 2 }}>
                      <img src={d.sprite} alt="" draggable={false} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>, document.body)}

      {/* Drag-spøkelse (plagg eller påkledd dukke) */}
      {dragPlagg && plaggGhost && createPortal(
        <img src={dragPlagg.sprite} alt="" draggable={false} style={{
          position: 'fixed', left: plaggGhost.x, top: plaggGhost.y,
          width: dragPlagg.type === 'antrekk' ? 46 : 54, transform: 'translate(-50%, -50%)',
          zIndex: 9999, pointerEvents: 'none', opacity: targetPlassId ? 0.95 : 0.6, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))',
        }} />, document.body)}

      {/* ?dev=1: ANTREKK-FIT-KALIBRATOR (grunnlinje) for valgt antrekk på dukke */}
      {IS_DEV_COORDS && selInfo && createPortal(
        <div onPointerDown={e => e.stopPropagation()} style={{
          position: 'fixed', top: 56, left: 200, zIndex: 96, width: 194,
          background: 'rgba(10,14,26,0.95)', border: '1px solid #f472b655', borderRadius: 12, padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#f472b6', fontSize: 12, fontWeight: 800, marginBottom: 4 }}>🎚️ Antrekk-fit (grunnlinje)</div>
          <div style={{ color: '#cbd5e1', fontSize: 10, fontFamily: 'monospace', marginBottom: 6 }}>
            {selInfo.plagg.id} @ {selInfo.dukke}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#94a3b8', fontSize: 10, marginBottom: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={calPerDukke} onChange={e => setCalPerDukke(e.target.checked)} />
            per DENNE dukketypen (ellers default)
          </label>
          {(() => { const c = calBaseline(); return (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, width: 96, margin: '0 auto 6px' }}>
                <span /><button style={miniBtn} title="opp" onClick={() => calNudge(0, -0.01, 0)}>↑</button><span />
                <button style={miniBtn} title="venstre" onClick={() => calNudge(-0.01, 0, 0)}>←</button>
                <span style={{ fontSize: 8, color: '#64748b', textAlign: 'center', alignSelf: 'center', fontFamily: 'monospace' }}>{c.offsetX.toFixed(2)}<br />{c.offsetY.toFixed(2)}</span>
                <button style={miniBtn} title="høyre" onClick={() => calNudge(0.01, 0, 0)}>→</button>
                <span /><button style={miniBtn} title="ned" onClick={() => calNudge(0, 0.01, 0)}>↓</button><span />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginBottom: 8 }}>
                <span style={{ color: '#94a3b8', fontSize: 11 }}>scale</span>
                <button style={miniBtn} onClick={() => calNudge(0, 0, -0.05)}>−</button>
                <span style={{ color: '#f1f5f9', fontSize: 11, fontFamily: 'monospace', minWidth: 30, textAlign: 'center' }}>{c.scale.toFixed(2)}</span>
                <button style={miniBtn} onClick={() => calNudge(0, 0, 0.05)}>+</button>
              </div>
            </>
          )})()}
          <button style={{ ...miniBtn, width: '100%', height: 26, fontSize: 11, fontWeight: 800 }} onClick={calLog}>Logg fit → konsoll</button>
          <div style={{ fontSize: 9, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>
            Lim inn i ANTREKK_FIT (klesbutikkPlagg.ts). Nullstill elevens elevFit (⟲) før du kalibrerer grunnlinja.
          </div>
        </div>, document.body)}
    </div>
  )
}

// ── Gulvplan-tracer (?dev=1) — dra hjørner, kalibrer front/bak-skala ─────────
function GulvplanTracer({ bump }: { bump: () => void }) {
  const g = KLESBUTIKK.gulvplan!
  const overlayRef = useRef<HTMLDivElement>(null)
  const CORNERS: { key: keyof Gulvplan['hjørner']; label: string }[] = [
    { key: 'fremV', label: 'fremV' }, { key: 'fremH', label: 'fremH' },
    { key: 'bakV', label: 'bakV' }, { key: 'bakH', label: 'bakH' },
  ]

  function startCorner(key: keyof Gulvplan['hjørner'], e: React.PointerEvent) {
    e.preventDefault(); e.stopPropagation()
    const onMove = (ev: PointerEvent) => {
      const r = overlayRef.current?.getBoundingClientRect(); if (!r) return
      g.hjørner[key] = {
        x: +clamp(((ev.clientX - r.left) / r.width) * 100, 0, 100).toFixed(1),
        y: +clamp(((ev.clientY - r.top) / r.height) * 100, 0, 100).toFixed(1),
      }
      bump()
    }
    const onUp = () => { window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true) }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }
  const editScale = (which: 'scaleFront' | 'scaleBack', d: number) => { g[which] = +clamp(g[which] + d, 0.05, 1).toFixed(2); bump() }
  const log = () => {
    const P = (p: Pt) => `{ x: ${p.x}, y: ${p.y} }`
    const h = g.hjørner
    console.log(`[GulvplanTracer] lim inn i KLESBUTIKK (industryDefinition.ts):\n  gulvplan: {\n    hjørner: {\n      fremV: ${P(h.fremV)}, fremH: ${P(h.fremH)},\n      bakV: ${P(h.bakV)}, bakH: ${P(h.bakH)},\n    },\n    scaleFront: ${g.scaleFront}, scaleBack: ${g.scaleBack},\n  },`)
  }

  const { fremV: A, fremH: B, bakV: C, bakH: D } = g.hjørner
  const front = quadPoint(g, 0.5, 0), back = quadPoint(g, 0.5, 1)

  return (
    <>
      <div ref={overlayRef} style={{ position: 'absolute', inset: 0, zIndex: 45, touchAction: 'none' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${D.x},${D.y} ${C.x},${C.y}`}
            fill="rgba(255,210,74,0.08)" stroke="#ffd24a" strokeWidth={0.4} />
        </svg>

        {/* Front/bak-skala-preview (dukke) — bredde via fotavtrykk × trapesbredde */}
        <FurnitureSprite fixtureId="dukke" foot={front} widthFrac={sceneWidthFrac(g, 'dukke', front)} showSlots={false} opacity={0.85} />
        <FurnitureSprite fixtureId="dukke" foot={back} widthFrac={sceneWidthFrac(g, 'dukke', back)} showSlots={false} opacity={0.85} />

        {/* Hjørne-håndtak */}
        {CORNERS.map(({ key, label }) => {
          const p = g.hjørner[key]
          return (
            <div key={key} onPointerDown={e => startCorner(key, e)} title={label} style={{
              position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)',
              width: 16, height: 16, borderRadius: '50%', cursor: 'grab',
              border: '2px solid #ffd24a', background: 'rgba(255,210,74,0.35)',
            }}>
              <span style={{ position: 'absolute', left: 18, top: -2, fontSize: 9, fontFamily: 'monospace', color: '#ffd24a', background: 'rgba(0,0,0,0.6)', padding: '0 3px', whiteSpace: 'nowrap' }}>{label}</span>
            </div>
          )
        })}
      </div>

      {createPortal(
        <div onPointerDown={e => e.stopPropagation()} style={{
          position: 'fixed', top: 56, right: 16, zIndex: 95, width: 200,
          background: 'rgba(10,14,26,0.95)', border: '1px solid #ffd24a55', borderRadius: 12, padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#ffd24a', fontSize: 12, fontWeight: 800, marginBottom: 6 }}>📐 Gulvplan-tracer</div>
          <div style={{ color: '#94a3b8', fontSize: 10, lineHeight: 1.4, marginBottom: 8 }}>
            Dra de 4 hjørnene så trapeset dekker gulvet. Preview-dukkene står helt foran/bak.
          </div>
          {(['scaleFront', 'scaleBack'] as const).map(which => (
            <div key={which} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ color: '#94a3b8', fontSize: 11, flex: 1 }}>{which === 'scaleFront' ? 'skala foran' : 'skala bak'}</span>
              <button style={miniBtn} onClick={() => editScale(which, -0.02)}>−</button>
              <span style={{ color: '#f1f5f9', fontSize: 11, fontFamily: 'monospace', minWidth: 34, textAlign: 'center' }}>{g[which].toFixed(2)}</span>
              <button style={miniBtn} onClick={() => editScale(which, 0.02)}>+</button>
            </div>
          ))}
          <button style={{ ...miniBtn, width: '100%', height: 26, fontSize: 11, fontWeight: 800, marginTop: 4 }} onClick={log}>Logg objekt → konsoll</button>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>
            Lim det loggede objektet inn i KLESBUTIKK.gulvplan (industryDefinition.ts).
          </div>
        </div>, document.body)}
    </>
  )
}

// ── Vareplass-tracer (?dev=1) — kalibrer de faste vareplassene, mutér-og-logg ─
// Velg TYPE (heng/brett/dukke) → klikk på scenen = ny plass · dra = flytt · velg
// + ± = skalér · høyreklikk = fjern · «Logg array» → konsoll. Muterer
// KLESBUTIKK.vareplasser direkte, som gulvplan-/sone-tracerne. Et preview-element
// per plass (rett type + anker) viser størrelsen mot det bakte innholdet.
const DEFAULT_SCALE: Record<PlassType, number> = { heng: 0.05, brett: 0.06, dukke: 0.12 }

// ── Utkast-persistens (robusthet) ────────────────────────────────────────────
// Tracerens arbeidsliste ER KLESBUTIKK.vareplasser (muteres direkte). For at
// Espen ALDRI skal miste kalibrering ved reload speiles lista til localStorage
// ved hver endring og gjenopprettes ved modul-last (før scene/tracer rendrer).
const VAREPLASS_LS_KEY = 'klesbutikk-vareplass-utkast'
// Kompilerte kildeverdier (kopi tatt FØR gjenoppretting) — «Tøm utkast» går hit.
const VAREPLASS_DEFAULTS: Vareplass[] = (KLESBUTIKK.vareplasser ?? []).map(v => ({ ...v }))
function saveVareplassDraft() {
  try { localStorage.setItem(VAREPLASS_LS_KEY, JSON.stringify(KLESBUTIKK.vareplasser ?? [])) } catch { /* privat modus e.l. */ }
}
;(function restoreVareplassDraft() {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(VAREPLASS_LS_KEY) : null
    if (!raw) return
    const d = JSON.parse(raw)
    if (Array.isArray(d) && d.length && KLESBUTIKK.vareplasser) KLESBUTIKK.vareplasser.splice(0, KLESBUTIKK.vareplasser.length, ...d)
  } catch { /* korrupt utkast — behold kildeverdiene */ }
})()

// Én kodevei for array-teksten (både Logg og Kopier bruker denne). Valgfrie
// felt (dukketype/variant/rot/skew) tas kun med når de er satt / ≠ 0.
function vareplasserArrayText(pts: Vareplass[]): string {
  const rows = pts.map(v => {
    const extra = [
      v.dukketype ? `dukketype: '${v.dukketype}'` : '',
      v.variant === 'profil' ? `variant: 'profil'` : '',
      v.rot ? `rot: ${v.rot}` : '',
      v.skewX ? `skewX: ${v.skewX}` : '',
      v.skewY ? `skewY: ${v.skewY}` : '',
    ].filter(Boolean).join(', ')
    return `    { id: '${v.id}', type: '${v.type}', x: ${v.x}, y: ${v.y}, scale: ${v.scale}${extra ? ', ' + extra : ''} },`
  })
  return `vareplasser: [\n${rows.join('\n')}\n  ],`
}

function VareplassTracer({ bump }: { bump: () => void }) {
  const pts = (KLESBUTIKK.vareplasser ??= [])
  const overlayRef = useRef<HTMLDivElement>(null)
  const [sel, setSel] = useState<string | null>(pts[0]?.id ?? null)
  const [newType, setNewType] = useState<PlassType>('heng')
  const [newDukke, setNewDukke] = useState<PlassDukketype>('dame')
  const [newHengVar, setNewHengVar] = useState<HengVariant>('front')
  const [visPreviews, setVisPreviews] = useState(true)
  const [copied, setCopied] = useState(false)
  // Representativ EKTE sprite per type+VARIANT (profil-plass = profil-sprite,
  // brett = stabel, dukke = matchende dukketype) — rendret i plassens skala/anker.
  const previewFor = (vp: Vareplass): string | undefined => {
    if (vp.type === 'dukke') return KLESBUTIKK_DUKKER.find(d => d.dukketype === (vp.dukketype ?? 'dame'))?.sprite
    if (vp.type === 'brett') return KLESBUTIKK_PLAGG.find(p => p.spriteBrett)?.spriteBrett
    if ((vp.variant ?? 'front') === 'profil') return KLESBUTIKK_PLAGG.find(p => p.spriteHengProfil)?.spriteHengProfil
    return plaggById('trenchcoat')?.spriteHengFront ?? KLESBUTIKK_PLAGG.find(p => p.spriteHengFront)?.spriteHengFront
  }
  // Enhver endring: re-render + speil til localStorage.
  const changed = () => { bump(); saveVareplassDraft() }

  const pctAt = (ev: PointerEvent | React.PointerEvent) => {
    const r = overlayRef.current?.getBoundingClientRect(); if (!r) return null
    return { x: +clamp(((ev.clientX - r.left) / r.width) * 100, 0, 100).toFixed(1), y: +clamp(((ev.clientY - r.top) / r.height) * 100, 0, 100).toFixed(1) }
  }
  function addPoint(e: React.PointerEvent) {
    const p = pctAt(e); if (!p) return
    const vp: Vareplass = {
      id: `${newType}${newType === 'heng' && newHengVar === 'profil' ? '-p' : ''}-${uid().slice(0, 4)}`,
      type: newType, x: p.x, y: p.y, scale: DEFAULT_SCALE[newType],
      ...(newType === 'dukke' ? { dukketype: newDukke } : {}),
      ...(newType === 'heng' && newHengVar === 'profil' ? { variant: 'profil' as HengVariant } : {}),
    }
    pts.push(vp); setSel(vp.id); changed()
  }
  function startMove(id: string, e: React.PointerEvent) {
    e.preventDefault(); e.stopPropagation(); setSel(id)
    const onMove = (ev: PointerEvent) => { const p = pctAt(ev); const vp = pts.find(v => v.id === id); if (p && vp) { vp.x = p.x; vp.y = p.y; bump() } }
    const onUp = () => { window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true); saveVareplassDraft() }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }
  const scaleSel = (d: number) => { const vp = pts.find(v => v.id === sel); if (vp) { vp.scale = +clamp(vp.scale + d, 0.01, 0.5).toFixed(3); changed() } }
  // Rotasjon/skew (grader) på valgt plass — 0 lagres «tomt» (utelates i logg).
  const nudgeXform = (field: 'rot' | 'skewX' | 'skewY', d: number) => {
    const vp = pts.find(v => v.id === sel); if (!vp) return
    vp[field] = +clamp((vp[field] ?? 0) + d, -45, 45).toFixed(1); changed()
  }
  const removePoint = (id: string) => { const i = pts.findIndex(v => v.id === id); if (i >= 0) { pts.splice(i, 1); if (sel === id) setSel(pts[0]?.id ?? null); changed() } }
  const clearDraft = () => {
    try { localStorage.removeItem(VAREPLASS_LS_KEY) } catch { /* ignore */ }
    pts.splice(0, pts.length, ...VAREPLASS_DEFAULTS.map(v => ({ ...v })))
    setSel(pts[0]?.id ?? null); bump()
  }
  const log = () => console.log(`[VareplassTracer] lim inn i KLESBUTIKK (industryDefinition.ts):\n  ${vareplasserArrayText(pts)}`)
  const copy = async () => {
    const text = vareplasserArrayText(pts)
    try { await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 1400) }
    catch { log() /* fallback: klippebord blokkert → konsoll */ }
  }

  const selVp = pts.find(v => v.id === sel)
  return (
    <>
      <div ref={overlayRef} onPointerDown={addPoint} style={{ position: 'absolute', inset: 0, zIndex: 45, touchAction: 'none', cursor: 'crosshair' }}>
        {pts.map(vp => {
          const prev = previewFor(vp)
          const erProfil = vp.type === 'heng' && (vp.variant ?? 'front') === 'profil'
          const col = erProfil ? PROFIL_COLOR : PLASS_COLOR[vp.type]
          const valgt = sel === vp.id
          const xf = plassTransform(vp)   // anker + rot/skew, som scene-renderet
          // VALGT punkt: preview alltid på 100 % (så rot/skew ses tydelig live).
          // Uvalgte: 40 % og kun når «vis previews» er på.
          const visPrev = prev && (valgt || visPreviews)
          return (
            <div key={vp.id}>
              {visPrev && (
                <img src={prev} alt="" draggable={false} style={{
                  position: 'absolute', left: `${vp.x}%`, top: `${vp.y}%`, width: `${vp.scale * 100}%`, height: 'auto',
                  transform: xf.transform, transformOrigin: xf.transformOrigin,
                  opacity: valgt ? 1 : 0.4, zIndex: valgt ? 2 : 1, pointerEvents: 'none',
                }} />
              )}
              <div onPointerDown={e => startMove(vp.id, e)} onContextMenu={e => { e.preventDefault(); removePoint(vp.id) }}
                title={`${vp.id} — dra = flytt, høyreklikk = fjern`} style={{
                  position: 'absolute', left: `${vp.x}%`, top: `${vp.y}%`, transform: 'translate(-50%, -50%)',
                  width: 15, height: 15, borderRadius: erProfil ? 3 : '50%', cursor: 'grab',
                  border: `2px solid ${valgt ? '#ffffff' : col}`, background: `${col}88`,
                }}>
                {/* Etikett KUN på valgt punkt (mindre rot ved mange plasser) */}
                {valgt && (
                  <span style={{ position: 'absolute', left: 17, top: -2, fontSize: 9, fontFamily: 'monospace', color: col, background: 'rgba(0,0,0,0.65)', padding: '0 3px', whiteSpace: 'nowrap' }}>{vp.id}{erProfil ? ' ·profil' : ''} · {vp.scale.toFixed(3)}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {createPortal(
        <div onPointerDown={e => e.stopPropagation()} style={{
          position: 'fixed', top: 56, right: 16, zIndex: 95, width: 214,
          background: 'rgba(10,14,26,0.95)', border: '1px solid #7dd3fc55', borderRadius: 12, padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#7dd3fc', fontSize: 12, fontWeight: 800, marginBottom: 6 }}>📌 Vareplass-tracer</div>
          <div style={{ color: '#94a3b8', fontSize: 10, lineHeight: 1.4, marginBottom: 8 }}>
            Velg type → klikk på scenen = ny plass · dra = flytt · høyreklikk = fjern.
          </div>
          {/* Type-velger (farge per type) */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
            {(['heng', 'brett', 'dukke'] as PlassType[]).map(t => (
              <button key={t} onClick={() => setNewType(t)} style={{
                flex: 1, height: 26, fontSize: 11, fontWeight: 800, cursor: 'pointer', borderRadius: 6,
                fontFamily: "'Outfit', sans-serif", textTransform: 'capitalize',
                color: newType === t ? '#0a0e1a' : PLASS_COLOR[t],
                background: newType === t ? PLASS_COLOR[t] : `${PLASS_COLOR[t]}22`,
                border: `1px solid ${PLASS_COLOR[t]}`,
              }}>{t}</button>
            ))}
          </div>
          {/* Dukketype-velger (kun for dukke) */}
          {newType === 'dukke' && (
            <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
              {(['dame', 'herre', 'barn'] as PlassDukketype[]).map(dt => (
                <button key={dt} onClick={() => setNewDukke(dt)} style={{
                  flex: 1, height: 22, fontSize: 10, fontWeight: 700, cursor: 'pointer', borderRadius: 6, fontFamily: "'Outfit', sans-serif",
                  color: newDukke === dt ? '#0a0e1a' : '#f9a8d4', background: newDukke === dt ? '#f472b6' : 'rgba(244,114,182,0.15)', border: '1px solid #f472b688',
                }}>{dt}</button>
              ))}
            </div>
          )}
          {/* Front/profil-velger (kun for heng) — profil = lilla merking */}
          {newType === 'heng' && (
            <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
              {(['front', 'profil'] as HengVariant[]).map(v => {
                const c = v === 'profil' ? PROFIL_COLOR : PLASS_COLOR.heng
                return (
                  <button key={v} onClick={() => setNewHengVar(v)} style={{
                    flex: 1, height: 22, fontSize: 10, fontWeight: 700, cursor: 'pointer', borderRadius: 6, fontFamily: "'Outfit', sans-serif", textTransform: 'capitalize',
                    color: newHengVar === v ? '#0a0e1a' : c, background: newHengVar === v ? c : `${c}22`, border: `1px solid ${c}88`,
                  }}>{v}</button>
                )
              })}
            </div>
          )}
          {/* Skala for valgt plass */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{ color: '#94a3b8', fontSize: 11, flex: 1 }}>skala {sel ?? '—'}{selVp ? ` (${selVp.type})` : ''}</span>
            <button style={miniBtn} onClick={() => scaleSel(-0.005)} disabled={!sel}>−</button>
            <span style={{ color: '#f1f5f9', fontSize: 11, fontFamily: 'monospace', minWidth: 40, textAlign: 'center' }}>{(selVp?.scale ?? 0).toFixed(3)}</span>
            <button style={miniBtn} onClick={() => scaleSel(0.005)} disabled={!sel}>+</button>
          </div>
          {/* Rotasjon + skew for valgt plass (0.5°-steg) */}
          {([['rot', 'rot°'], ['skewX', 'skewX°'], ['skewY', 'skewY°']] as const).map(([f, lbl]) => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ color: '#94a3b8', fontSize: 11, flex: 1 }}>{lbl}</span>
              <button style={miniBtn} onClick={() => nudgeXform(f, -0.5)} disabled={!sel}>−</button>
              <span style={{ color: '#f1f5f9', fontSize: 11, fontFamily: 'monospace', minWidth: 40, textAlign: 'center' }}>{(selVp?.[f] ?? 0).toFixed(1)}</span>
              <button style={miniBtn} onClick={() => nudgeXform(f, 0.5)} disabled={!sel}>+</button>
            </div>
          ))}
          {/* Vis-previews-toggle + antall */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#94a3b8', fontSize: 10, marginBottom: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={visPreviews} onChange={e => setVisPreviews(e.target.checked)} />
            vis previews (40 %) · {pts.length} plass(er)
          </label>
          {/* Logg + Kopier (samme array-tekst) */}
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{ ...miniBtn, flex: 1, height: 26, fontSize: 11, fontWeight: 800 }} onClick={log}>Logg</button>
            <button style={{ ...miniBtn, flex: 1, height: 26, fontSize: 11, fontWeight: 800, background: copied ? 'rgba(34,230,164,0.25)' : undefined, color: copied ? '#22e6a4' : undefined }} onClick={copy}>{copied ? '✓ Kopiert' : '📋 Kopier'}</button>
          </div>
          <button style={{ ...miniBtn, width: '100%', height: 24, fontSize: 10, fontWeight: 700, marginTop: 6, color: '#fca5a5', border: '1px solid #ef444455', background: 'rgba(239,68,68,0.1)' }} onClick={clearDraft}>Tøm utkast (tilbake til låst)</button>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>
            Utkastet lagres automatisk (localStorage) og overlever reload. «Logg»/«Kopier» → lim inn i KLESBUTIKK.vareplasser.
          </div>
        </div>, document.body)}
    </>
  )
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    background: active ? 'rgba(125,211,252,0.18)' : 'transparent',
    color: active ? '#e0f2fe' : '#94a3b8',
    border: active ? '1px solid rgba(125,211,252,0.7)' : '1px solid transparent',
    borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
  }
}

const miniBtn: React.CSSProperties = {
  background: 'rgba(125,211,252,0.12)', color: '#7dd3fc', border: '1px solid #7dd3fc55', borderRadius: 6,
  width: 24, height: 24, fontSize: 13, fontWeight: 800, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, padding: 0,
}

// ── KASSEVY-lag (bak-disken-vy) — kunde forankret på livlinja + disk-okklusjon ─
// Bruker den DELTE basen (geometry/kassevyBase.ts) med klesbutikkens EGNE 5
// konstanter (districts.ts). Kunden rendres z10; et forgrunns-disk-lag (samme
// scenebilde klippet til båndet under disk-kanten) z20 okkluderer underkroppen.
// ?dev=1: 🎚️-panel (kunde-velger + 5 slidere) + KUNDE_BASE-omriss. Mutér-og-logg
// som resten av tracerne; «Logg»/«Kopier» → lim inn i districts.ts. Kunde-basens
// sone kalibreres i 🧭 Soner (delt sone-tracer, target = KLESBUTIKK_KUNDE_BASE).
function KassevyLayer({ imgSrc, forcedKundeId }: { imgSrc: string; forcedKundeId?: string | null }) {
  const [scale, setScale] = useState(KLESBUTIKK_KASSE_SCALE)
  const [centerX, setCenterX] = useState(KLESBUTIKK_KASSE_CENTER_X)
  const [waistY, setWaistY] = useState(KLESBUTIKK_KASSE_WAIST_Y)
  const [occLeft, setOccLeft] = useState(KLESBUTIKK_KASSE_OCCLUDE_Y_LEFT)
  const [occRight, setOccRight] = useState(KLESBUTIKK_KASSE_OCCLUDE_Y_RIGHT)
  const [kundeIdx, setKundeIdx] = useState(0)
  const [copied, setCopied] = useState(false)
  // forcedKundeId (oppgjør ved kassen fra 🛒 Salg) overstyrer velgeren.
  const forcedIdx = forcedKundeId ? KLESBUTIKK_KASSE_KUNDER.findIndex(k => k.id === forcedKundeId) : -1
  const kunde = KLESBUTIKK_KASSE_KUNDER[forcedIdx >= 0 ? forcedIdx : kundeIdx]
  const k: KassevyKonstanter = { SCALE: scale, CENTER_X: centerX, WAIST_Y: waistY, OCCLUDE_Y_LEFT: occLeft, OCCLUDE_Y_RIGHT: occRight }

  const blockText = () =>
    `export const KLESBUTIKK_KASSE_SCALE = ${scale}\n`
    + `export const KLESBUTIKK_KASSE_CENTER_X = ${centerX}\n`
    + `export const KLESBUTIKK_KASSE_WAIST_Y = ${waistY}\n`
    + `export const KLESBUTIKK_KASSE_OCCLUDE_Y_LEFT = ${occLeft}\n`
    + `export const KLESBUTIKK_KASSE_OCCLUDE_Y_RIGHT = ${occRight}`
  const logBlock = () => console.log(`[KassevyLayer] lim inn i districts.ts:\n${blockText()}`)
  const upd = (setter: (n: number) => void, v: number) => { setter(v) }
  const copy = async () => {
    try { await navigator.clipboard.writeText(blockText()); setCopied(true); window.setTimeout(() => setCopied(false), 1400) }
    catch { logBlock() }
  }

  return (
    <>
      {/* SCENE-KLIPP: kunden er større enn scene-boksen (forankret på livlinja) og
          strekker seg UNDER boksen. Uten klipp spilte beina ut NEDENFOR disken
          (Espens funn). Kafeens kassevy (InteriorView) unngår det ved at scenen
          fyller viewporten (beina havner utenfor skjermen); her er scenen en
          avgrenset boks, så vi klipper eksplisitt med overflow:hidden — samme
          okklusjons-idé (forgrunns-disk-lag + klipp av alt under), tilpasset en
          boks i stedet for viewporten. */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 5 }}>
        {/* KUNDEN (z10) — forankret på livlinja; per-kunde spriteCal fra registeret. */}
        <img src={kunde.sprite} alt={kunde.navn} draggable={false}
          style={{ ...customerAnchorStyle(k, kunde.spriteCal), zIndex: 10, filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.45))', pointerEvents: 'none', userSelect: 'none' }} />
        {/* FORGRUNNS-DISK-LAG (z20) — samme scenebilde klippet til båndet UNDER den
            (evt. skrå) disk-kanten. Okkluderer kundens underkropp. */}
        <img src={imgSrc} alt="" aria-hidden draggable={false}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', clipPath: occlusionClipPath(occLeft, occRight), zIndex: 20, pointerEvents: 'none', userSelect: 'none' }} />
      </div>
      {/* ?dev=1: KUNDE_BASE-sone-omriss (referanse — kalibreres i 🧭 Soner).
          Skjules under 🛒 Salg-oppgjør (forcedKundeId) — da er scenen «i bruk»,
          ikke i kalibrering. */}
      {IS_DEV_COORDS && !forcedKundeId && (
        <div style={{ position: 'absolute', left: `${KLESBUTIKK_KUNDE_BASE[0]}%`, top: `${KLESBUTIKK_KUNDE_BASE[1]}%`, width: `${KLESBUTIKK_KUNDE_BASE[2]}%`, height: `${KLESBUTIKK_KUNDE_BASE[3]}%`, border: '1px dashed #50e08c88', zIndex: 22, pointerEvents: 'none' }} />
      )}
      {/* CAL-PANEL (?dev=1) — kunde-velger + 5 konstanter. Skjult under oppgjør. */}
      {IS_DEV_COORDS && !forcedKundeId && createPortal(
        <div onPointerDown={e => e.stopPropagation()} style={{
          position: 'fixed', top: 64, right: 16, zIndex: 300, width: 234,
          background: 'rgba(10,14,26,0.94)', border: '1px solid #7dd3fc55', borderRadius: 12,
          padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#7dd3fc', fontSize: 12, fontWeight: 800, marginBottom: 6 }}>🎚️ Kassevy-kalibrering</div>
          <select value={kundeIdx} onChange={e => setKundeIdx(Number(e.target.value))} style={{
            width: '100%', marginBottom: 8, background: '#0a0e1a', color: '#f1f5f9',
            border: '1px solid #7dd3fc44', borderRadius: 6, padding: '3px 6px', fontSize: 11, fontFamily: "'Outfit', sans-serif",
          }}>
            {KLESBUTIKK_KASSE_KUNDER.map((kk, i) => (
              <option key={kk.id} value={i} style={{ background: '#0a0e1a' }}>{kk.navn}</option>
            ))}
          </select>
          <KasseSlider label="KASSE_SCALE"     value={scale}   min={0.5} max={2.2} step={0.02} onChange={v => upd(setScale, v)}   fmt={v => v.toFixed(2)} />
          <KasseSlider label="KASSE_CENTER_X"  value={centerX} min={0}   max={100} step={0.5}  onChange={v => upd(setCenterX, v)} fmt={v => v.toFixed(1)} />
          <KasseSlider label="KASSE_WAIST_Y"   value={waistY}  min={0}   max={100} step={0.5}  onChange={v => upd(setWaistY, v)}  fmt={v => v.toFixed(1)} />
          <KasseSlider label="OCCLUDE_Y_LEFT"  value={occLeft} min={0}   max={100} step={0.5}  onChange={v => upd(setOccLeft, v)} fmt={v => v.toFixed(1)} />
          <KasseSlider label="OCCLUDE_Y_RIGHT" value={occRight} min={0}  max={100} step={0.5}  onChange={v => upd(setOccRight, v)} fmt={v => v.toFixed(1)} />
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <button onClick={logBlock} style={miniActionBtn}>Logg</button>
            <button onClick={copy} style={miniActionBtn}>{copied ? '✓ Kopiert' : '📋 Kopier'}</button>
          </div>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>
            FØRSTEPASNING. Dra kunden + disk-kanten på plass, «Kopier» → lim inn i
            <b> districts.ts</b> (KLESBUTIKK_KASSE_*). Kunde-basen: 🧭 Soner.
          </div>
        </div>, document.body)}
    </>
  )
}

function KasseSlider({ label, value, min, max, step, onChange, fmt }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; fmt: (v: number) => string
}) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'monospace', marginBottom: 2 }}>
        <span style={{ color: '#94a3b8' }}>{label}</span>
        <span style={{ color: '#7dd3fc', fontWeight: 700 }}>{fmt(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: '#7dd3fc', cursor: 'pointer' }} />
    </div>
  )
}

const miniActionBtn: React.CSSProperties = {
  flex: 1, background: 'rgba(125,211,252,0.12)', color: '#7dd3fc', border: '1px solid #7dd3fc55',
  borderRadius: 7, padding: '4px 8px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
}

// ── OPPSØKENDE SALG-LAG (Interiør, 🛒 Salg-modus) ────────────────────────────
// Velg et scenario → kunden spawner på et gulv-ståpunkt (bunn-ankret, scale fra
// ståpunktet). Etter KLESBUTIKK_KONTAKT_HINT dukker et diskret 💬 opp. Klikk
// kunden = ta kontakt (onContact åpner dialogen på toppnivå). Ikke kontaktet
// innen KLESBUTIKK_KONTAKT_VINDU: kunden går + logges som tapt salg. Ståpunktene
// er FØRSTEPASNING (tracer for Espen). Dette er en dev-showcase — scenariene er
// inaktive (utenfor scenariePool).
function SalgLayer({ onContact, spilte, dialogAapen, bump }: {
  onContact: (sc: SalesScenario) => void
  spilte: Set<string>
  dialogAapen: boolean
  bump: () => void
}) {
  // Spawnet kunde: hvilket scenario + hvilket ståpunkt.
  const [spawn, setSpawn] = useState<{ sc: SalesScenario; stIdx: number } | null>(null)
  const [hint, setHint] = useState(false)
  const [contacted, setContacted] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [visTracer, setVisTracer] = useState(false)
  const prevDialog = useRef(dialogAapen)

  // Spawn-timere: 💬-hint + tapt-salg-vindu. Ryddes ved avspawn/kontakt.
  useEffect(() => {
    if (!spawn || contacted) return
    setHint(false)
    const tHint = window.setTimeout(() => setHint(true), KLESBUTIKK_KONTAKT_HINT)
    const tGone = window.setTimeout(() => {
      const navn = spawn.sc.customerName
      console.log(`[SalgLayer] TAPT SALG (ikke kontaktet): ${spawn.sc.id} — ${navn}`)
      setToast(`Tapt salg: «${navn}» gikk uten å bli kontaktet.`)
      setSpawn(null); setHint(false)
      window.setTimeout(() => setToast(null), 3500)
    }, KLESBUTIKK_KONTAKT_VINDU)
    return () => { window.clearTimeout(tHint); window.clearTimeout(tGone) }
  }, [spawn, contacted])

  // Dialogen lukket (true→false) ⇒ kunden er ekspedert, fjern henne fra gulvet.
  useEffect(() => {
    if (prevDialog.current && !dialogAapen) { setSpawn(null); setContacted(false); setHint(false) }
    prevDialog.current = dialogAapen
  }, [dialogAapen])

  const spawnScenario = (sc: SalesScenario) => {
    const stIdx = KLESBUTIKK_SCENARIOS.indexOf(sc) % KLESBUTIKK_KUNDE_STAPUNKTER.length
    setContacted(false); setHint(false); setToast(null); setSpawn({ sc, stIdx })
  }
  const takeContact = () => {
    if (!spawn || contacted) return
    setContacted(true); setHint(false); onContact(spawn.sc)
  }

  const st = spawn ? KLESBUTIKK_KUNDE_STAPUNKTER[spawn.stIdx] : null

  return (
    <>
      {/* Ståpunkt-markører (dev-referanse) */}
      {IS_DEV_COORDS && KLESBUTIKK_KUNDE_STAPUNKTER.map(p => (
        <div key={p.id} title={p.navn} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)',
          width: 12, height: 12, borderRadius: '50%', border: '2px solid #7dd3fc', background: '#7dd3fc55',
          zIndex: 8, pointerEvents: 'none',
        }} />
      ))}

      {/* Spawnet kunde (bunn-ankret på ståpunktet) */}
      {spawn && st && (
        <div onClick={takeContact} title={contacted ? 'I samtale …' : 'Klikk = ta kontakt'} style={{
          position: 'absolute', left: `${st.x}%`, top: `${st.y}%`, height: `${st.scale * 100}%`, width: 'auto',
          transform: 'translate(-50%, -100%)', zIndex: 10, cursor: contacted ? 'default' : 'pointer',
          filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.45))',
        }}>
          <img src={spawn.sc.sprite} alt={spawn.sc.customerName} draggable={false}
            style={{ height: '100%', width: 'auto', display: 'block', userSelect: 'none' }} />
          {/* Diskret 💬-hint */}
          {hint && !contacted && (
            <div style={{
              position: 'absolute', left: '50%', top: 0, transform: 'translate(-50%, -120%)',
              background: 'rgba(10,14,26,0.92)', border: '1px solid rgba(125,211,252,0.6)', borderRadius: 10,
              padding: '2px 8px', fontSize: 16, animation: 'none', pointerEvents: 'none',
            }}>💬</div>
          )}
        </div>
      )}

      {/* Tapt-salg-toast */}
      {toast && createPortal(
        <div style={{
          position: 'fixed', bottom: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 120,
          background: 'rgba(220,38,38,0.16)', border: '1px solid rgba(220,38,38,0.6)', borderRadius: 12,
          padding: '0.5rem 1rem', color: '#fca5a5', fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
        }}>⛔ {toast}</div>, document.body)}

      {/* Scenariovelger (dev) — start hvilket som helst, ✓ på spilte */}
      {IS_DEV_COORDS && createPortal(
        <div onPointerDown={e => e.stopPropagation()} style={{
          position: 'fixed', top: 64, right: 16, zIndex: 96, width: 218,
          background: 'rgba(10,14,26,0.94)', border: '1px solid #7dd3fc55', borderRadius: 12,
          padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#7dd3fc', fontSize: 12, fontWeight: 800, marginBottom: 6 }}>🛒 Scenario-velger</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {KLESBUTIKK_SCENARIOS.map(sc => {
              const aktiv = spawn?.sc.id === sc.id
              return (
                <button key={sc.id} onClick={() => spawnScenario(sc)} style={{
                  display: 'flex', alignItems: 'center', gap: 6, textAlign: 'left',
                  background: aktiv ? 'rgba(125,211,252,0.18)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${aktiv ? '#7dd3fc' : 'rgba(255,255,255,0.12)'}`, borderRadius: 8,
                  padding: '5px 8px', fontSize: 11, fontWeight: 700, color: '#e2e8f0', cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
                }}>
                  <span style={{ width: 14 }}>{spilte.has(sc.id) ? '✓' : ''}</span>
                  <span style={{ flex: 1 }}>{sc.customerName}</span>
                  {sc.avsluttesVedKasse && <span title="avsluttes ved kassen" style={{ opacity: 0.7 }}>💰</span>}
                </button>
              )
            })}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#94a3b8', marginTop: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={visTracer} onChange={e => setVisTracer(e.target.checked)} />
            ståpunkt-tracer
          </label>
          <div style={{ fontSize: 9, color: '#64748b', marginTop: 4, lineHeight: 1.4 }}>
            Klikk kunden i scenen for å ta kontakt. Vindu: {(KLESBUTIKK_KONTAKT_VINDU / 1000).toFixed(0)} s.
          </div>
        </div>, document.body)}

      {/* Ståpunkt-tracer (dev) */}
      {IS_DEV_COORDS && visTracer && <StapunktTracer bump={bump} />}
    </>
  )
}

// Ståpunkt-tracer: dra de 3 punktene, ± scale, «Logg array» → districts.ts.
// Muterer en arbeidskopi (samme mutér-og-logg-mønster som de andre tracerne).
function StapunktTracer({ bump }: { bump: () => void }) {
  const pts = useRef(KLESBUTIKK_KUNDE_STAPUNKTER.map(p => ({ ...p }))).current
  const [sel, setSel] = useState<string>(pts[0]?.id ?? '')
  const overlayRef = useRef<HTMLDivElement>(null)
  const [, force] = useState(0); const rerender = () => { force(n => n + 1); bump() }

  const move = (id: string, e: React.PointerEvent) => {
    e.preventDefault(); e.stopPropagation(); setSel(id)
    const onMove = (ev: PointerEvent) => {
      const r = overlayRef.current?.getBoundingClientRect(); if (!r) return
      const p = pts.find(v => v.id === id); if (!p) return
      p.x = +clamp(((ev.clientX - r.left) / r.width) * 100, 0, 100).toFixed(1)
      p.y = +clamp(((ev.clientY - r.top) / r.height) * 100, 0, 100).toFixed(1)
      rerender()
    }
    const onUp = () => { window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true) }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }
  const nudge = (d: number) => { const p = pts.find(v => v.id === sel); if (!p) return; p.scale = +clamp(p.scale + d, 0.2, 2).toFixed(3); rerender() }
  const logArr = () => {
    const txt = pts.map(p => `  { id: '${p.id}', navn: '${p.navn}', x: ${p.x}, y: ${p.y}, scale: ${p.scale} },`).join('\n')
    console.log(`[StapunktTracer] lim inn i KLESBUTIKK_KUNDE_STAPUNKTER (districts.ts):\n[\n${txt}\n]`)
  }

  return (
    <>
      <div ref={overlayRef} style={{ position: 'absolute', inset: 0, zIndex: 46 }}>
        {pts.map(p => {
          const valgt = sel === p.id
          return (
            <div key={p.id}>
              {/* preview-kunde-silhuett i ståpunktets skala */}
              <div style={{
                position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, height: `${p.scale * 100}%`, width: `${p.scale * 26}%`,
                transform: 'translate(-50%, -100%)', border: `1px dashed ${valgt ? '#ffffff' : '#7dd3fc'}`,
                background: 'rgba(125,211,252,0.08)', borderRadius: 6, pointerEvents: 'none',
              }} />
              <div onPointerDown={e => move(p.id, e)} title={`${p.navn} — dra`} style={{
                position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)',
                width: 16, height: 16, borderRadius: '50%', border: `2px solid ${valgt ? '#fff' : '#7dd3fc'}`,
                background: '#7dd3fcaa', cursor: 'grab',
              }} />
              {valgt && <span style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(12px, -50%)', fontSize: 9, fontFamily: 'monospace', color: '#7dd3fc', background: 'rgba(0,0,0,0.65)', padding: '0 3px', whiteSpace: 'nowrap' }}>{p.id} · {p.scale.toFixed(2)}</span>}
            </div>
          )
        })}
      </div>
      {createPortal(
        <div onPointerDown={e => e.stopPropagation()} style={{ position: 'fixed', top: 300, right: 16, zIndex: 97, width: 200, background: 'rgba(10,14,26,0.94)', border: '1px solid #7dd3fc55', borderRadius: 12, padding: '10px 12px', fontFamily: "'Outfit', sans-serif" }}>
          <div style={{ color: '#7dd3fc', fontSize: 12, fontWeight: 800, marginBottom: 6 }}>📍 Ståpunkt-tracer</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
            {pts.map(p => <button key={p.id} onClick={() => setSel(p.id)} style={{ ...miniActionBtn, flex: 'none', background: sel === p.id ? 'rgba(125,211,252,0.25)' : 'rgba(125,211,252,0.1)' }}>{p.id}</button>)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span style={{ color: '#94a3b8', fontSize: 11 }}>scale</span>
            <button style={miniActionBtn} onClick={() => nudge(-0.02)}>−</button>
            <span style={{ color: '#f1f5f9', fontSize: 11, fontFamily: 'monospace', minWidth: 34, textAlign: 'center' }}>{(pts.find(v => v.id === sel)?.scale ?? 0).toFixed(2)}</span>
            <button style={miniActionBtn} onClick={() => nudge(0.02)}>+</button>
          </div>
          <button style={{ ...miniActionBtn, width: '100%' }} onClick={logArr}>Logg array</button>
          <div style={{ fontSize: 9, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>Dra punktene, ± scale mot silhuetten, «Logg» → districts.ts.</div>
        </div>, document.body)}
    </>
  )
}
