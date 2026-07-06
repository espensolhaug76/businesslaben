import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { INTERIOR_CUSTOMER_SPAWN, INTERIOR_CUSTOMER_STAND, INTERIOR_MIRROR_TRAU, INTERIOR_MENU_BOARD, type InteriorMirrorTrau } from '../../data/districts'
import { randomScenario, scenariosForMix } from '../sales/scenarios'
import { BackButton } from './DistrictView'
import { IS_DEV_COORDS } from './DevCoordHelper'
import ZoneTracer, { type Rect, type Target, type DrawZone } from './ZoneTracer'
import { tileCount, trauCols } from './MonterScene'
import { useGame } from '../GameContext'
import { DAY_CONFIG } from '../data/dayConfig'

// Dagens kunde-pool (DEL 1/2, Dagssyklus) — filtrert ÉN gang per modul-last
// (scenarioMix er en hardkodet config i runde 1, ikke live-redigerbar ennå).
const DAY_SCENARIO_POOL = scenariosForMix(DAY_CONFIG.scenarioMix)

// ── InteriorView (BAK-DISKEN-SCENE) ──────────────────────────────────────────
// Bilde-basert visning (cover, 16:9). KUN kunde + salgssamtale: ved hvert besøk
// velges et TILFELDIG scenario fra poolen (morgenkunden/reklamasjonen); riktig
// kunde-sprite (kari.png / tom.png) vises STOR bak disken på den okkluderte
// diskposisjonen. Underkroppen okkluderes av et forgrunns-disk-lag (samme
// interiørbilde klippet til det nederste diskbåndet). Kunden toner inn ved
// oppstart, og klikk åpner DET tilhørende scenariet. INGEN kø/respawn.
//
// Vareeksponering (disk-monter) er FLYTTET til den frontale monter-scenen
// (MonterScene) — den rendres ikke lenger her.
//
// Begge sprites bruker SAMME fire kalibrerings-konstanter (samme høyde ~706–709
// px ⇒ samme diskposisjon). Trenger en kunde egen skala senere, legg til en
// per-scenario `spriteScale` — ikke nødvendig for Kari/Tom nå.
//
// LIVE-KALIBRERING (?dev=1): de fire plasserings-konstantene er slidere i et
// dev-panel. Espen drar kunden + diskkanten på plass visuelt; verdiene vises på
// skjermen og logges til konsollen ved hver endring for permanent lagring.

const INTERIOR_IMG = '/assets/raw/interior-kasse.png'
const ASPECT = 16 / 9

// ── Start-verdier — kalibrert visuelt av Espen (?dev=1-sliderne) 2026-07-06
// mot interior-kasse.png ─────────────────────────────────────────────────────
/** Diskens overkant i % av stage-høyden VED VENSTRE/HØYRE kant av stagen —
 *  to punkter (ikke ett) fordi disken i interior-kasse.png er fotografert i
 *  perspektiv (skrå, ikke vannrett) — én flat linje traff feil på den ene
 *  siden. Forgrunns-disk-laget viser KUN alt under den rette linja mellom
 *  disse to punktene (clip-path polygon, ikke inset). */
const DEFAULT_OCCLUDE_Y_LEFT = 78
const DEFAULT_OCCLUDE_Y_RIGHT = 70
/** Kundens senter-x i % av stage-bredden. */
const DEFAULT_CENTER_X = 40
/** Kundens livlinje i % av stage-høyden (der livet møter diskkanten). */
const DEFAULT_WAIST_Y = 78.5
/** Kundens høyde som andel av stage-høyden. Stor = nær disken; hun når ned til
 *  diskkanten og underkroppen skjules bak forgrunns-laget. */
const DEFAULT_SCALE = 1.3

/** Hvor på spriten livet sitter (andel fra toppen). Intern ankerverdi: spriten
 *  forankres på livlinja, så skala vokser RUNDT livet og underkroppen alltid
 *  havner under disken — uansett skala. */
const WAIST_FRAC = 0.46

/** Tavle-tekstens vinkling/skala (DEL 3-oppfølging: teksten sto flatt/rett
 *  opp mens selve tavla er fotografert i perspektiv på høyre vegg — ekte 3D
 *  (perspective + rotateY/rotateX), IKKE en flat skewX(), samme regel som
 *  speil-laget over. GROVE startverdier (ikke Espen-kalibrert ennå) —
 *  trace-/juster-bare med ?dev=1 (Tavle-kalibrering-panelet). */
const DEFAULT_MENU_TILT_Y = -18
const DEFAULT_MENU_TILT_X = 0
const DEFAULT_MENU_SCALE = 1
/** rotateY vipper den ene siden av teksten lenger unna kameraet enn den
 *  andre — perspektivet komprimerer DEN siden mer, så den visuelle
 *  «massen» av teksten (sentrert FØR vipping) havner synlig forskjøvet mot
 *  den nærmeste siden etter vipping. Denne px-forskyvningen (i SKJERM-
 *  planet, lagt til ETTER perspective/rotate i transform-kjeden) kompenserer
 *  uten å røre selve vinkelen. Espen-kalibrert (?dev=1-panelet) 2026-07-06. */
const DEFAULT_MENU_OFFSET_X = -11

// ── Tracer-mål/soner (merket «spawn/stand» + «speil-N» for glassmonter-speilet) ─
const ZONE_COLORS: Record<string, string> = { spawn: '#50dcff', stand: '#50e08c', speil: '#c084fc', meny: '#fbbf24' }

function setRect(target: Rect, r: Rect) {
  target[0] = r[0]; target[1] = r[1]; target[2] = r[2]; target[3] = r[3]
}
function interiorTargets(mirrorTrau: InteriorMirrorTrau[]): Target[] {
  return [
    { id: 'spawn', label: 'spawn', get: () => INTERIOR_CUSTOMER_SPAWN, set: r => setRect(INTERIOR_CUSTOMER_SPAWN, r) },
    { id: 'stand', label: 'stand', get: () => INTERIOR_CUSTOMER_STAND, set: r => setRect(INTERIOR_CUSTOMER_STAND, r) },
    { id: 'meny', label: 'meny', get: () => INTERIOR_MENU_BOARD, set: r => setRect(INTERIOR_MENU_BOARD, r) },
    ...mirrorTrau.map(m => ({ id: m.id, label: m.id, get: () => m.rect, set: (r: Rect) => setRect(m.rect, r) })),
  ]
}
function interiorDrawZones(mirrorTrau: InteriorMirrorTrau[]): DrawZone[] {
  return [
    { rect: INTERIOR_CUSTOMER_SPAWN, id: 'spawn', label: 'spawn', color: ZONE_COLORS.spawn, dashed: true },
    { rect: INTERIOR_CUSTOMER_STAND, id: 'stand', label: 'stand', color: ZONE_COLORS.stand, dashed: true },
    { rect: INTERIOR_MENU_BOARD, id: 'meny', label: 'meny', color: ZONE_COLORS.meny, dashed: true },
    ...mirrorTrau.map(m => ({ rect: m.rect, id: m.id, label: m.id, color: ZONE_COLORS.speil, dashed: true })),
  ]
}

export default function InteriorView({ districtId, lokaleId }: {
  districtId: string
  lokaleId: string
}) {
  const navigate = useNavigate()
  const { state, dispatch } = useGame()
  // Tilfeldig kunde fra DAGENS pool (scenarioMix-filtrert) — valgt ved mount,
  // og på nytt for hvert nye kundemøte innenfor dagens kvote (se
  // spawn-effekten under). randomScenario ligger i en ren modul, så
  // Math.random ikke flagges i render.
  const [scenario, setScenario] = useState(() => randomScenario(DAY_SCENARIO_POOL))
  const [imgFailed, setImgFailed] = useState(false)
  const [shown, setShown] = useState(false)        // fade-in/ut (opacity)
  const [gone, setGone] = useState(false)          // fjernet etter runden
  const [hover, setHover] = useState(false)
  const [, setRev] = useState(0)                    // re-render når traceren skriver
  const initiatedRef = useRef(false)                // åpnet VI overlayet (klikk på kunden)?
  // ?dev=1: flere speil-soner enn de faste (trace-bare, samme mønster som
  // trau-tracer'en i MonterScene).
  const [devMirrorTrau, setDevMirrorTrau] = useState<InteriorMirrorTrau[]>([])
  const mirrorTrau = devMirrorTrau.length ? [...INTERIOR_MIRROR_TRAU, ...devMirrorTrau] : INTERIOR_MIRROR_TRAU

  function addDevMirrorTrau() {
    const id = `speil-${mirrorTrau.length + 1}`
    // mirrorsTrauId er en PLASSHOLDER (trau-1) — meld tilbake hvilket ekte
    // trau sonen faktisk viser, sammen med rektanglet, så det kan limes inn.
    setDevMirrorTrau(prev => [...prev, { id, rect: [10, 60, 10, 8], mirrorsTrauId: 'trau-1' }])
    console.log(
      `[InteriorView] La til ${id} — dra et rektangel i traceren og trykk `
      + `«Bruk siste på: ${id}». Meld tilbake rektangelet OG hvilket ekte trau `
      + `sonen viser, så begge limes inn i INTERIOR_MIRROR_TRAU i districts.ts`,
    )
  }

  // ?dev=1: velg ETT speil om gangen og kalibrer flis-størrelse/vinkel for
  // DEN sonen — hver sone sitter et annet sted i fotoet (annen skala,
  // perspektiv), så én universal verdi for alle så rart ut. Samme
  // mutér-kjørende-objekt-og-logg-mønster som resten av dev-verktøyene.
  const [calMirrorId, setCalMirrorId] = useState('speil-1')
  function setMirrorScale(m: InteriorMirrorTrau, v: number) {
    m.mirrorScale = v
    console.log(`[InteriorView] ${m.id}.mirrorScale = ${v} — lim inn i INTERIOR_MIRROR_TRAU i districts.ts`)
    setRev(r => r + 1)
  }
  function setMirrorTiltX(m: InteriorMirrorTrau, v: number) {
    m.mirrorTiltX = v
    console.log(`[InteriorView] ${m.id}.mirrorTiltX = ${v} — lim inn i INTERIOR_MIRROR_TRAU i districts.ts`)
    setRev(r => r + 1)
  }
  function setMirrorTiltY(m: InteriorMirrorTrau, v: number) {
    m.mirrorTiltY = v
    console.log(`[InteriorView] ${m.id}.mirrorTiltY = ${v} — lim inn i INTERIOR_MIRROR_TRAU i districts.ts`)
    setRev(r => r + 1)
  }

  // Live-kalibrerbare plasserings-konstanter (slidere ved ?dev=1).
  const [occludeYLeft, setOccludeYLeft] = useState(DEFAULT_OCCLUDE_Y_LEFT)
  const [occludeYRight, setOccludeYRight] = useState(DEFAULT_OCCLUDE_Y_RIGHT)
  const [centerX, setCenterX] = useState(DEFAULT_CENTER_X)
  const [waistY, setWaistY] = useState(DEFAULT_WAIST_Y)
  const [scale, setScale] = useState(DEFAULT_SCALE)

  // Tavle-tekstens vinkling/skala (?dev=1 — «📋 Tavle-kalibrering»-panelet).
  const [menuTiltY, setMenuTiltY] = useState(DEFAULT_MENU_TILT_Y)
  const [menuTiltX, setMenuTiltX] = useState(DEFAULT_MENU_TILT_X)
  const [menuScale, setMenuScale] = useState(DEFAULT_MENU_SCALE)
  const [menuOffsetX, setMenuOffsetX] = useState(DEFAULT_MENU_OFFSET_X)

  // Er de tre dev-panelene åpne/felt sammen (accordion) — dekket scenen bak
  // (glassmonteret, tavla) i utfoldet tilstand, så Espen ba om å kunne
  // lukke dem. Default åpen (samme oppførsel som før denne endringen).
  const [kundeOpen, setKundeOpen] = useState(true)
  const [speilOpen, setSpeilOpen] = useState(true)
  const [tavleOpen, setTavleOpen] = useState(true)

  // Fade kunden inn rett etter mount (ingen bevegelse). Kunden rendres uansett
  // kun når butikken er ÅPEN (se render-gaten under), så dette er harmløst
  // ved mount i stengt butikk.
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 50)
    return () => clearTimeout(t)
  }, [])

  // STENGT ⇒ ingen kunde (gates spawn — kunde-poolen skrus helt av).
  // DAGSSYKLUS (DEL 2): så lenge butikken er ÅPEN og forrige kunde er `gone`,
  // spawnes automatisk en NY kunde fra dagens pool — helt til
  // meetingsToday når DAY_CONFIG.meetingsPerDay, da stopper spawningen
  // (tydelig hint vises i stedet, se render under) og eleven må selv stenge
  // for å gå til dagsoppgjøret. Var kunden IKKE gone (fortsatt der/i
  // samtale) gjør dette ingenting — hun blir stående til scenen under
  // (sales:closed) sier fra.
  useEffect(() => {
    if (!state.shopOpen || !gone) return
    if (state.meetingsToday >= DAY_CONFIG.meetingsPerDay) return
    setScenario(randomScenario(DAY_SCENARIO_POOL))
    setGone(false)
    setShown(false)
    const t = setTimeout(() => setShown(true), 50)
    return () => clearTimeout(t)
  }, [state.shopOpen, gone, state.meetingsToday])

  // Logg start-verdiene ved ?dev=1.
  useEffect(() => {
    if (!IS_DEV_COORDS) return
    console.log(
      '%c[InteriorView] kunde-konstanter (start — juster med sliderne):',
      'color:#7dd3fc;font-weight:bold',
      { CUSTOMER_SCALE: DEFAULT_SCALE, CUSTOMER_CENTER_X: DEFAULT_CENTER_X, CUSTOMER_WAIST_Y: DEFAULT_WAIST_Y, COUNTER_OCCLUDE_Y_LEFT: DEFAULT_OCCLUDE_Y_LEFT, COUNTER_OCCLUDE_Y_RIGHT: DEFAULT_OCCLUDE_Y_RIGHT },
    )
  }, [])

  // Når salgsoverlayet lukkes (fullført/lukket) og DET var vi som åpnet det:
  // kunden toner ut og forsvinner. GamePage sender 'sales:closed'.
  useEffect(() => {
    const onClosed = () => {
      if (!initiatedRef.current) return
      initiatedRef.current = false
      setShown(false)                                 // fade ut
      window.setTimeout(() => setGone(true), 450)      // fjern etter fade
    }
    window.addEventListener('sales:closed', onClosed)
    return () => window.removeEventListener('sales:closed', onClosed)
  }, [])

  function talkToCustomer() {
    initiatedRef.current = true
    // Åpner DET scenariet kunden i scenen tilhører (samme inngang som
    // dev-knappene; GamePage lytter og håndterer __OVERLAY_OPEN__).
    window.dispatchEvent(new CustomEvent('dev:openSalesScenario', { detail: { scenarioId: scenario.id } }))
  }

  // Oppdater én konstant + logg alle (snapshot med den nye verdien).
  function update(key: 'CUSTOMER_SCALE' | 'CUSTOMER_CENTER_X' | 'CUSTOMER_WAIST_Y' | 'COUNTER_OCCLUDE_Y_LEFT' | 'COUNTER_OCCLUDE_Y_RIGHT', v: number, setter: (n: number) => void) {
    setter(v)
    console.log('[InteriorView] kunde-konstanter:', {
      CUSTOMER_SCALE: scale, CUSTOMER_CENTER_X: centerX, CUSTOMER_WAIST_Y: waistY,
      COUNTER_OCCLUDE_Y_LEFT: occludeYLeft, COUNTER_OCCLUDE_Y_RIGHT: occludeYRight,
      [key]: v,
    })
  }

  // Tavle-tekstens vinkling/skala — samme mutér/logg-mønster.
  function updateMenu(key: 'MENU_TILT_Y' | 'MENU_TILT_X' | 'MENU_SCALE' | 'MENU_OFFSET_X', v: number, setter: (n: number) => void) {
    setter(v)
    console.log('[InteriorView] tavle-konstanter:', {
      MENU_TILT_Y: menuTiltY, MENU_TILT_X: menuTiltX, MENU_SCALE: menuScale, MENU_OFFSET_X: menuOffsetX,
      [key]: v,
    })
  }

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden', background: '#10141c',
      fontFamily: "'Outfit', sans-serif",
    }}>
      {/* Tilbake ut til fasaden */}
      <div style={{ position: 'fixed', top: 64, left: 20, zIndex: 80 }}>
        <BackButton onClick={() => navigate(`/game/d/${districtId}/l/${lokaleId}`)} label="← Ut til fasaden" />
      </div>

      {/* ÅPEN/STENGT-bryter + «Stell disken», samlet nederst til venstre — de
          hører sammen (stengt butikk → stell disken i fred). IKKE øverst til
          høyre: ZoneTracer sin egen kontrollpanel (?dev=1) er portalert rett
          til document.body på NESTEN samme flekk (top:64, right:16, zIndex:
          300) og slukte klikkene fullstendig (bekreftet — «intercepts
          pointer events»). IKKE nederst til høyre heller: der kolliderte den
          historisk med Dashbord/«Gå til butikken»-pillene i GamePage (samme
          hjørne, lavere z-index). Nederst til venstre er eneste hjørne uten
          konkurrerende faste elementer, i eller utenfor ?dev=1.
          Stenges butikken, forsvinner en ev. kunde som ikke er i aktiv
          samtale (render-gaten under) — men avbryter IKKE en pågående
          salgssamtale (SalesScenarioOverlay ligger i GamePage, uavhengig av
          denne bryteren). */}
      <div style={{
        position: 'fixed', bottom: 30, left: 24, zIndex: 80,
        display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start',
      }}>
        {/* DAGSSYKLUS (DEL 2): «stengt»/«åpen» dispatcher nå OPEN_DAY/CLOSE_DAY
            (dagteller + svinn + oppgjør) i stedet for den gamle enkle
            SET_SHOP_OPEN-bryteren. Skjules i «oppgjør» — DayResultOverlay
            eier fremdriften videre («Start ny dag») til dagen er stengt igjen. */}
        {state.dayPhase !== 'oppgjør' && (
          <>
            {state.dayPhase === 'åpen' && state.meetingsToday >= DAY_CONFIG.meetingsPerDay && (
              <div style={{
                background: 'rgba(250,204,21,0.14)', border: '1px solid rgba(250,204,21,0.5)',
                borderRadius: 12, padding: '0.5rem 0.9rem', color: '#facc15',
                fontSize: 12, fontWeight: 700, fontFamily: "'Outfit', sans-serif", maxWidth: 220,
              }}>
                📋 Dagen er over — steng butikken for dagsoppgjør.
              </div>
            )}
            <button
              onClick={() => dispatch({ type: state.dayPhase === 'åpen' ? 'CLOSE_DAY' : 'OPEN_DAY' })}
              title={state.dayPhase === 'åpen' ? 'Steng butikken — dagen er over, dagsoppgjør vises' : 'Åpne butikken — kunder kan komme innom'}
              style={{
                background: state.dayPhase === 'åpen'
                  ? 'linear-gradient(135deg, #dc2626, #991b1b)'
                  : 'linear-gradient(135deg, #16a34a, #15803d)',
                border: 'none', borderRadius: 99, padding: '0.55rem 1.2rem', color: '#fff', fontWeight: 700,
                fontSize: 13, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
                boxShadow: state.dayPhase === 'åpen' ? '0 0 16px rgba(220,38,38,0.35)' : '0 0 16px rgba(22,163,74,0.35)',
              }}
            >
              {state.dayPhase === 'åpen' ? '🔒 Steng butikken' : '🔓 Åpne butikken'}
            </button>
          </>
        )}
        <button
          onClick={() => navigate(`/game/d/${districtId}/l/${lokaleId}/disk`)}
          title="Stell disken — juster vareeksponeringen i disk-monteren"
          style={{
            background: 'linear-gradient(135deg, #b45309, #92400e)', border: 'none',
            borderRadius: 99, padding: '0.7rem 1.4rem', color: '#fff', fontWeight: 700,
            fontSize: 14, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
            boxShadow: '0 0 20px rgba(180,83,9,0.4)',
          }}
        >
          🧁 Stell disken
        </button>
      </div>

      {/* Cover-stage: 16:9-bildet dekker skjermen. Kunde + forgrunns-disk +
          tracer overlegges bildet, så prosent-koordinatene treffer direkte. */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        width: `max(100vw, calc(100vh * ${ASPECT}))`,
        height: `max(100vh, calc(100vw / ${ASPECT}))`,
      }}>
        {/* BAKGRUNN (z=0) */}
        {!imgFailed ? (
          <img
            src={INTERIOR_IMG}
            alt="Interiør"
            draggable={false}
            onError={() => setImgFailed(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', userSelect: 'none' }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, #1c2530 0%, #11161e 100%)',
            border: '1px dashed rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '0 2rem',
          }}>
            Interiørbilde mangler<br />(/assets/raw/interior-kasse.png)
          </div>
        )}

        {/* SPEIL-MONTER (z=25) — glassmonteret synlig i bakgrunnen (bakfra-vy):
            varene fra counterLayout (den FRONTALE MonterScene-monteren)
            speiles inn her som ambient bakgrunnsliv. Tilnærmet plassering —
            ikke en redigeringsflate. Hver sone viser EKSPLISITT det ekte
            trauet Espen har oppgitt (mirrorsTrauId) — tomt trau (eller ikke i
            lager) ⇒ rendres ikke (ingen krasj).
            ANTALL fliser = SAMME tileCount/trauCols som disken selv (importert
            fra MonterScene). Hver flis er en egen boks (grid inni sonen) med
            object-fit:contain × varens `displayScale` × spillerens
            `sizeAdjust` × sonens EGEN `mirrorScale` (dev-kalibrert per sone,
            se panelet under — hver sone sitter et annet sted i fotoet med
            annen skala, én universal verdi for alle så rart ut). VINKEL er
            EKTE 3D (perspective + rotateX/rotateY), IKKE en flat rotate() —
            en flat rotasjon bare spinner bildet side-til-side i skjermplanet
            og kan ikke få varen til å se ut som den ligger PÅ en hylle.
            `mirrorTiltX` = vippet forover/bakover, `mirrorTiltY` = vridd
            sidelengs (begge default 0, dev-kalibrert per sone).
            Ytre sone-boks klipper KUN bakkanten (samme regel som
            MonterScene) — IKKE toppen. Et tidligere forsøk klippet toppen
            også (for å hindre synlig overflyt over glassmonteret), men det
            kappet av toppen av selve VAREN (flate brød-topper) — like ille,
            og Espen ville heller ha en vare som evt. vokser naturlig
            oppover enn en synlig avkuttet en (2026-07-06). Overflyt over
            sonen holdes nede av de allerede reduserte mirrorScale-verdiene
            (se INTERIOR_MIRROR_TRAU i districts.ts) i stedet for klipping.
            Sider klippes fortsatt ikke.
            z=25 (over FORGRUNNS-DISK-LAGET, z=20) — MÅ ligge over: det laget
            re-tegner HELE bunnen av fotoet (alt under occludeY-linja, for å
            okkludere kundens underkropp foran disken) og dekket dermed
            fullstendig over speil-soner som ligger under den linja (venstre
            glassmonter er ikke i nærheten av disken/kunden, så ingen
            visuell konflikt ved å ligge over). */}
        {mirrorTrau.map(m => {
          const entry = state.counterLayout.find(t => t.trauId === m.mirrorsTrauId)
          const product = entry ? state.products.find(p => p.id === entry.productId) : null
          if (!product || product.stock <= 0) return null
          const density = entry?.density ?? 'standard'
          const n = tileCount(product, m.mirrorsTrauId, density)
          const cols = Math.min(n, trauCols(m.mirrorsTrauId))
          const rows = Math.ceil(n / cols)
          const itemScale = (product.displayScale ?? 1) * (entry?.sizeAdjust ?? 1) * (m.mirrorScale ?? 1)
          const tiltX = m.mirrorTiltX ?? 0
          const tiltY = m.mirrorTiltY ?? 0
          return (
            <div
              key={m.id}
              style={{
                position: 'absolute',
                left: `${m.rect[0]}%`, top: `${m.rect[1]}%`,
                width: `${m.rect[2]}%`, height: `${m.rect[3]}%`,
                // Klipp KUN bakkanten — se kommentaren over (IKKE toppen,
                // det kappet av selve varen).
                clipPath: 'inset(-100% -100% 0 -100%)',
                transform: `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                zIndex: 25, pointerEvents: 'none',
              }}
            >
              {Array.from({ length: n }, (_, i) => {
                const col = i % cols, row = Math.floor(i / cols)
                const cx = ((col + 0.5) / cols) * 100
                const cy = ((row + 0.5) / rows) * 100
                return (
                  <div key={i} style={{
                    position: 'absolute', left: `${cx}%`, top: `${cy}%`,
                    width: `${100 / cols}%`, height: `${100 / rows}%`,
                    transform: 'translate(-50%, -50%)',
                  }}>
                    {product.sprite
                      ? <img
                          src={product.sprite} alt="" draggable={false}
                          onError={e => { e.currentTarget.style.display = 'none' }}
                          style={{
                            position: 'absolute', inset: 0, width: '100%', height: '100%',
                            objectFit: 'contain', opacity: 0.92,
                            transform: `scale(${itemScale})`, transformOrigin: 'center',
                          }}
                        />
                      : <div style={{
                          position: 'absolute', inset: 0, display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          fontSize: '1.6rem', opacity: 0.85,
                        }}>{product.icon}</div>}
                  </div>
                )
              })}
            </div>
          )
        })}

        {/* DRIKKEMENY PÅ TAVLA (DEL 3, z=15) — den blanke tavla på høyre vegg
            blir en funksjonell meny: drikke-sortimentet eleven har FØRT
            (varer med trauVare=false — kaffe/smoothie/te i cafe-katalogen,
            ikke fysiske trau-varer) listes med elevens egen pris (samme
            product.retailPrice-felt som Produkter-/Priser-fanen og
            prislappene på trauene leser — én kilde). Ingen førte drikkevarer
            ⇒ tom tavle (rendrer ingenting, ingen krasj). Maks 6 linjer —
            flere enn det ⇒ 5 varer + «…og mer»-linje. Sonen er et GROVT
            estimat (se INTERIOR_MENU_BOARD i districts.ts) — trace-bar med
            ?dev=1 til Espen kalibrerer mot tavlas faktiske posisjon.
            EKTE 3D-vinkling (perspective + rotateY/rotateX), IKKE en flat
            skewX() — samme regel som speil-laget: en flat skjevstilling
            spinner bare teksten i skjermplanet og ser ikke ut som kritt
            skrevet PÅ tavlas fotograferte flate. `menuTiltY/X/scale` er
            GROVE startverdier, juster med ?dev=1-panelet «📋
            Tavle-kalibrering». */}
        {(() => {
          const drinks = state.products.filter(p => p.trauVare === false)
          if (drinks.length === 0) return null
          const shown = drinks.length > 6 ? drinks.slice(0, 5) : drinks
          const overflow = drinks.length > 6
          return (
            <div
              style={{
                position: 'absolute',
                left: `${INTERIOR_MENU_BOARD[0]}%`, top: `${INTERIOR_MENU_BOARD[1]}%`,
                width: `${INTERIOR_MENU_BOARD[2]}%`, height: `${INTERIOR_MENU_BOARD[3]}%`,
                zIndex: 15, pointerEvents: 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '0.35em', padding: '6%',
                fontFamily: "'Segoe Print', 'Bradley Hand', cursive",
                color: '#f1f5f9', textShadow: '0 0 3px rgba(255,255,255,0.35), 0 1px 1px rgba(0,0,0,0.5)',
                // translateX FØRST i lista = SIST anvendt (skjerm-planet,
                // etter projeksjon) — rekompenserer den visuelle
                // sideforskyvningen vippingen gir, uten å røre vinkelen selv.
                transform: `translateX(${menuOffsetX}px) perspective(600px) rotateY(${menuTiltY}deg) rotateX(${menuTiltX}deg) scale(${menuScale})`,
                transformOrigin: 'center',
              }}
            >
              <div style={{
                fontSize: 'clamp(11px, 1.6vw, 18px)', fontWeight: 700, whiteSpace: 'nowrap',
                marginBottom: '0.15em', letterSpacing: '0.03em', textDecoration: 'underline',
                textUnderlineOffset: '0.2em',
              }}>
                Drikkemeny
              </div>
              {shown.map(p => (
                <div key={p.id} style={{
                  fontSize: 'clamp(9px, 1.3vw, 15px)', whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'baseline', gap: '0.6em',
                }}>
                  <span>{p.name}</span>
                  <span style={{ opacity: 0.85 }}>{p.retailPrice > 0 ? `${p.retailPrice.toLocaleString('nb-NO')} kr` : '—'}</span>
                </div>
              ))}
              {overflow && (
                <div style={{ fontSize: 'clamp(9px, 1.2vw, 14px)', opacity: 0.75, whiteSpace: 'nowrap' }}>…og mer</div>
              )}
            </div>
          )
        })()}

        {/* KUNDEN (z=10) — stor, forankret på livlinja, mellom bakgrunn og disk.
            Underkroppen strekker seg under occludeY-linja og skjules av
            forgrunns-laget. Rendres KUN når butikken er ÅPEN OG dagens
            møtekvote ikke er nådd ennå — `gone` er lokal komponent-state og
            nullstilles ved remount (f.eks. en tur innom /disk og tilbake),
            så meetingsToday-sjekken her er nødvendig for å ikke spawne en
            ekstra kunde etter at dagen egentlig er ferdig. */}
        {!gone && state.shopOpen && state.meetingsToday < DAY_CONFIG.meetingsPerDay && (
          <div
            onClick={talkToCustomer}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            title="Snakk med kunden"
            style={{
              position: 'absolute',
              left: `${centerX}%`, top: `${waistY}%`,
              height: `${scale * 100}%`, width: 'auto',
              // Forankring på livet: flytt opp WAIST_FRAC av egen høyde, sentrer x.
              transform: `translate(-50%, -${WAIST_FRAC * 100}%)`,
              opacity: shown ? 1 : 0,
              transition: 'opacity 0.4s ease',
              cursor: 'pointer', zIndex: 10,
            }}
          >
            <img
              src={scenario.sprite}
              alt={scenario.customerName}
              draggable={false}
              style={{
                height: '100%', width: 'auto', display: 'block', userSelect: 'none',
                filter: hover
                  ? 'drop-shadow(0 0 10px rgba(125,211,252,0.9)) drop-shadow(0 6px 10px rgba(0,0,0,0.45))'
                  : 'drop-shadow(0 6px 10px rgba(0,0,0,0.45))',
                transition: 'filter 0.15s',
              }}
            />
            {/* Hover-hint */}
            {hover && (
              <div style={{
                position: 'absolute', left: '50%', top: 0, transform: 'translate(-50%, -120%)',
                background: 'rgba(10,14,26,0.92)', border: '1px solid rgba(125,211,252,0.5)',
                borderRadius: 8, padding: '0.3rem 0.7rem', color: '#f1f5f9',
                fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', pointerEvents: 'none',
              }}>
                💬 Snakk med kunden
              </div>
            )}
          </div>
        )}

        {/* FORGRUNNS-DISK-LAG (z=20) — samme interiørbilde, identisk plassert,
            men klippet til KUN båndet under den SKRÅ linja mellom
            occludeYLeft (x=0%) og occludeYRight (x=100%) — disken er
            fotografert i perspektiv (ikke vannrett), så en flat inset()
            traff feil på den ene siden; polygon() følger den faktiske
            skråkanten. Sømløst med bakgrunnen, okkluderer kundens underkropp. */}
        {!imgFailed && (
          <img
            src={INTERIOR_IMG}
            alt=""
            aria-hidden
            draggable={false}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block',
              clipPath: `polygon(0% ${occludeYLeft}%, 100% ${occludeYRight}%, 100% 100%, 0% 100%)`,
              zIndex: 20, pointerEvents: 'none', userSelect: 'none',
            }}
          />
        )}

        {/* ?dev=1: sone-tracer (samme verktøy som fasaden), merket
            spawn/stand/speil-N. */}
        {IS_DEV_COORDS && !imgFailed && (
          <ZoneTracer
            onApply={() => setRev(r => r + 1)}
            targets={interiorTargets(mirrorTrau)}
            drawZones={interiorDrawZones(mirrorTrau)}
          />
        )}
      </div>

      {/* ?dev=1: legg til flere speil-soner enn de faste (navngis speil-N
          fortløpende) — plasseres med sone-traceren over, lim resultatet inn
          i INTERIOR_MIRROR_TRAU. */}
      {IS_DEV_COORDS && (
        <div style={{ position: 'fixed', top: 64, right: 226, zIndex: 300 }}>
          <button
            onClick={addDevMirrorTrau}
            style={{
              background: 'rgba(192,132,252,0.12)', color: '#c084fc', border: '1px solid #c084fc66',
              borderRadius: 7, padding: '4px 9px', fontSize: 11, fontWeight: 700,
              cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
            }}
          >+ Nytt speil-trau</button>
        </div>
      )}

      {/* LIVE-KALIBRERINGSPANEL (kun ?dev=1) — søsken av stagen så fixed-posisjon
          måles mot viewporten, ikke mot den transformerte stagen. Plassert
          øverst til HØYRE (under sone-tracer, som slutter på y≈302 målt live —
          ikke øverst til venstre lenger, det lå rett oppå glassmonteret med
          varene panelet skal kalibrere mot). */}
      {IS_DEV_COORDS && (
        <div style={{ position: 'fixed', top: 320, right: 16, zIndex: 90, width: 224 }}>
          <CalPanel title="🎚️ Kunde-kalibrering" color="#7dd3fc" open={kundeOpen} onToggle={() => setKundeOpen(o => !o)}>
            <CalSlider label="CUSTOMER_SCALE"     value={scale}    min={0.5} max={2.5} step={0.05}
              onChange={v => update('CUSTOMER_SCALE', v, setScale)}      fmt={v => v.toFixed(2)} />
            <CalSlider label="CUSTOMER_CENTER_X"  value={centerX}  min={0}   max={100} step={0.5}
              onChange={v => update('CUSTOMER_CENTER_X', v, setCenterX)} fmt={v => v.toFixed(1)} />
            <CalSlider label="CUSTOMER_WAIST_Y"   value={waistY}   min={0}   max={100} step={0.5}
              onChange={v => update('CUSTOMER_WAIST_Y', v, setWaistY)}   fmt={v => v.toFixed(1)} />
            <CalSlider label="COUNTER_OCCLUDE_Y_LEFT"  value={occludeYLeft} min={0} max={100} step={0.5}
              onChange={v => update('COUNTER_OCCLUDE_Y_LEFT', v, setOccludeYLeft)}   fmt={v => v.toFixed(1)} />
            <CalSlider label="COUNTER_OCCLUDE_Y_RIGHT" value={occludeYRight} min={0} max={100} step={0.5}
              onChange={v => update('COUNTER_OCCLUDE_Y_RIGHT', v, setOccludeYRight)} fmt={v => v.toFixed(1)} />
            <div style={{ fontSize: 10, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>
              Verdiene logges i konsollen ved hver endring — meld dem tilbake for permanent lagring.
            </div>
          </CalPanel>
        </div>
      )}

      {/* SPEIL-KALIBRERING (kun ?dev=1) — VELG én speil-sone, juster
          størrelse/vinkel for DEN sonen. Hver sone sitter et annet sted i
          fotoet (annen skala/perspektiv) — samme mutér-og-logg-mønster som
          resten av dev-verktøyene. Plassert VED SIDEN AV kunde-panelet
          (samme top, right forskjøvet) i stedet for stablet under — unngår
          at panelenes (varierende) høyde kolliderer med hverandre, og holder
          begge unna glassmonteret med varene til venstre. */}
      {IS_DEV_COORDS && (() => {
        const m = mirrorTrau.find(x => x.id === calMirrorId)
        return (
          <div style={{ position: 'fixed', top: 320, right: 256, zIndex: 90, width: 224 }}>
            <CalPanel title="🪞 Speil-kalibrering" color="#c084fc" open={speilOpen} onToggle={() => setSpeilOpen(o => !o)}>
              <select
                value={calMirrorId}
                onChange={e => setCalMirrorId(e.target.value)}
                style={{
                  width: '100%', marginBottom: 8, background: '#0a0e1a',
                  color: '#f1f5f9', border: '1px solid #c084fc44', borderRadius: 6,
                  padding: '3px 6px', fontSize: 11, fontFamily: "'Outfit', sans-serif",
                }}
              >
                {mirrorTrau.map(x => (
                  <option key={x.id} value={x.id} style={{ background: '#0a0e1a', color: '#f1f5f9' }}>{x.id} ({x.mirrorsTrauId})</option>
                ))}
              </select>
              {m && (
                <>
                  <CalSlider label="mirrorScale" value={m.mirrorScale ?? 1} min={0.2} max={6} step={0.05}
                    onChange={v => setMirrorScale(m, v)} fmt={v => `${Math.round(v * 100)}%`} />
                  <CalSlider label="mirrorTiltX (forover)" value={m.mirrorTiltX ?? 0} min={-80} max={80} step={1}
                    onChange={v => setMirrorTiltX(m, v)} fmt={v => `${v.toFixed(0)}°`} />
                  <CalSlider label="mirrorTiltY (sidelengs)" value={m.mirrorTiltY ?? 0} min={-80} max={80} step={1}
                    onChange={v => setMirrorTiltY(m, v)} fmt={v => `${v.toFixed(0)}°`} />
                </>
              )}
              <div style={{ fontSize: 10, color: '#64748b', marginTop: 2, lineHeight: 1.4 }}>
                Verdiene logges i konsollen ved hver endring — meld dem tilbake for permanent lagring.
              </div>
            </CalPanel>
          </div>
        )
      })()}

      {/* TAVLE-KALIBRERING (kun ?dev=1) — vinkling/skala for drikkemeny-
          teksten på tavla. Plassert ved siden av speil-panelet (samme top,
          right forskjøvet enda et hakk), samme mutér-og-logg-mønster. */}
      {IS_DEV_COORDS && (
        <div style={{ position: 'fixed', top: 320, right: 496, zIndex: 90, width: 224 }}>
          <CalPanel title="📋 Tavle-kalibrering" color="#fbbf24" open={tavleOpen} onToggle={() => setTavleOpen(o => !o)}>
            <CalSlider label="menuTiltY (sidelengs)" value={menuTiltY} min={-60} max={60} step={1}
              onChange={v => updateMenu('MENU_TILT_Y', v, setMenuTiltY)} fmt={v => `${v.toFixed(0)}°`} />
            <CalSlider label="menuTiltX (forover)" value={menuTiltX} min={-60} max={60} step={1}
              onChange={v => updateMenu('MENU_TILT_X', v, setMenuTiltX)} fmt={v => `${v.toFixed(0)}°`} />
            <CalSlider label="menuScale" value={menuScale} min={0.5} max={2} step={0.02}
              onChange={v => updateMenu('MENU_SCALE', v, setMenuScale)} fmt={v => `${Math.round(v * 100)}%`} />
            <CalSlider label="menuOffsetX (rekompenser sentrering)" value={menuOffsetX} min={-40} max={40} step={1}
              onChange={v => updateMenu('MENU_OFFSET_X', v, setMenuOffsetX)} fmt={v => `${v.toFixed(0)}px`} />
            <div style={{ fontSize: 10, color: '#64748b', marginTop: 2, lineHeight: 1.4 }}>
              Verdiene logges i konsollen ved hver endring — meld dem tilbake for permanent lagring.
            </div>
          </CalPanel>
        </div>
      )}

      {/* Stillas-etikett nederst */}
      <div style={{
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 12, padding: '0.4rem 1rem', color: '#f1f5f9', zIndex: 80,
        fontSize: 13, whiteSpace: 'nowrap',
      }}>
        🪑 Interiør · {state.shopOpen ? '🔓 Åpent' : '🔒 Stengt'}
        {IS_DEV_COORDS ? ' · kalibrering aktiv (panel øverst høyre)' : ''}
      </div>
    </div>
  )
}

// ── Sammenleggbart kalibreringspanel (accordion) ─────────────────────────────
// De faste dev-panelene dekket scenen bak (glassmonteret, tavla) — klikk
// tittelen for å felle sammen til KUN header-linja, så innholdet bak blir
// synlig igjen uten å måtte skru av ?dev=1 helt.
function CalPanel({ title, color, open, onToggle, children }: {
  title: string
  color: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div style={{
      background: 'rgba(10,14,26,0.94)', border: `1px solid ${color}55`,
      borderRadius: 12, padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
    }}>
      <div
        onClick={onToggle}
        title={open ? 'Klikk for å felle sammen' : 'Klikk for å åpne'}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer', marginBottom: open ? 6 : 0, userSelect: 'none',
        }}
      >
        <span style={{ color, fontSize: 12, fontWeight: 800 }}>{title}</span>
        <span style={{ color, fontSize: 11 }}>{open ? '▾' : '▸'}</span>
      </div>
      {open && children}
    </div>
  )
}

// ── Slider-rad i kalibreringspanelet ─────────────────────────────────────────
function CalSlider({ label, value, min, max, step, onChange, fmt }: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  fmt: (v: number) => string
}) {
  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'monospace', marginBottom: 2 }}>
        <span style={{ color: '#94a3b8' }}>{label}</span>
        <span style={{ color: '#7dd3fc', fontWeight: 700 }}>{fmt(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: '#7dd3fc', cursor: 'pointer' }}
      />
    </div>
  )
}
