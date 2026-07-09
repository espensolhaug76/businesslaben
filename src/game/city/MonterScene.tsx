import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import type { MonterTrau } from '../../data/districts'
import { useGame } from '../GameContext'
import { getActiveIndustryDefinition } from '../data/industryDefinition'
import { DAY_CONFIG } from '../data/dayConfig'
import { BackButton } from './DistrictView'
import { IS_DEV_COORDS } from './DevCoordHelper'
import ZoneTracer, { type Rect, type Target, type DrawZone } from './ZoneTracer'
import type { Product, TrauDensity, TrauItem } from '../types'

// ── MonterScene (FRONTAL MONTER — kunde-siden) ───────────────────────────────
// Frontal vy av disk-monteren. Disken er en LAGER-flate: hvert TRAU fylles med
// ÉN vares utklipp, flislagt etter lagermengde (full/halv/tom) med litt jitter.
// Paletten viser KUN FØRTE varer (state.products) — varer eleven har bestilt i
// Produkter-fanen (docs/INNKJOP_LEVERING.md), IKKE hele katalogen. Å dra en
// palett-vare til et trau STILLER den bare ut (SET_COUNTER_LAYOUT) — føring
// skjer ikke lenger gratis her (den skjer ved bestilling). Tomt sortiment ⇒
// vennlig hint om å bestille. Vare→trau persisteres i state (counterLayout).
// Tomt trau = ingenting. Bilde-basert (cover 16:9) — monter-frontal.png er
// placeholder til Espen legger inn det ekte bildet.
//
// BRANSJE-DEFINISJON: trau-geometrien (MONTER_TRAU) og scenebildet leses fra
// den AKTIVE bransjens IndustryDefinition (industryDefinition.ts), ikke
// import direkte fra districts.ts — se getActiveIndustryDefinition().

const ASPECT = 16 / 9
const TRAU_COLOR = '#ffb454'

// ── Tracer-mål: ett per trau, N stykker (MONTER_TRAU + evt. dev-trau lagt
// til i denne økten via «+ Nytt trau») ───────────────────────────────────────
function setRect(target: Rect, r: Rect) {
  target[0] = r[0]; target[1] = r[1]; target[2] = r[2]; target[3] = r[3]
}
function trauTargets(trau: MonterTrau[]): Target[] {
  return trau.map(t => ({ id: t.id, label: t.id, get: () => t.rect, set: r => setRect(t.rect, r) }))
}
function trauDrawZones(trau: MonterTrau[]): DrawZone[] {
  return trau.map(t => ({ rect: t.rect, id: t.id, label: t.id, color: TRAU_COLOR, dashed: true }))
}

// ── Hjelpere (rene, utenfor render) ──────────────────────────────────────────
/** Deterministisk [0,1) fra streng — stabil «tilfeldig» jitter uten Math.random. */
function hash01(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
  return ((h >>> 0) % 1000) / 1000
}
function productHue(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % 360
}
// Fliser holder NATURLIG størrelse — de skal ikke krympes for å få plass ved
// siden av hverandre. Bredde-plass: kun 1 vare i bredden på de vanlige trau'ene
// (de er for smale for mer); trau-17/18 er brede nok til 4 ved siden av
// hverandre. Trenger en vare mer plass enn bredden tillater, stables resten
// BAKOVER/FRAMOVER i dybden (maks 3 rader) i stedet for å krympe flisene.
const MAX_ROWS = 3
// Eksportert (ikke bare internt i denne fila): InteriorView sitt speil-lag
// (bakfra-vy på /inne) trenger SAMME antall-logikk som disken selv, så
// speilet viser riktig ANTALL fliser — ikke bare riktig vare — og dermed
// faktisk speiler oppsettet i disken i stedet for alltid å vise ett stykk.
// BRANSJE-DEFINISJON: selve REGELEN (hvilke trau er brede nok til 4) er
// flyttet til CAFE.flater.lager.trauCols i industryDefinition.ts — denne
// er nå en tynn videreformidling til den AKTIVE bransjens regel, ikke en
// hardkodet kafé-antagelse her.
// eslint-disable-next-line react-refresh/only-export-components
export function trauCols(trauId: string): number {
  return getActiveIndustryDefinition().flater.lager.trauCols(trauId)
}
// Presentasjonsvalg (DEL 3, spillermekanikk) — tetthet justerer kapasiteten
// (+40 %/−40 %); mellomrommet mellom fliser FØLGER av dette automatisk siden
// flere/færre fliser deler samme trau-flate (rad-avstanden er 100 %/antall
// rader, se TrauContents), ingen egen spacing-parameter trengs.
const DENSITY_MULT: Record<TrauDensity, number> = { tett: 1.4, standard: 1, luftig: 0.6 }
const DENSITY_LABEL: Record<TrauDensity, string> = { tett: 'Tett', standard: 'Standard', luftig: 'Luftig' }
const DENSITY_OPTIONS: TrauDensity[] = ['tett', 'standard', 'luftig']
/** Antall fliser i ETT trau, uavhengig av alle andre trau: andel av DETTE
 *  trauets egen kapasitet (bredde × maks rader i dybden × spillerens
 *  tetthetsvalg) etter lagermengde (full / halv / lav / tom). Hvert trau er
 *  en egen, selvstendig flate — ingen overflyt til naboer. */
// eslint-disable-next-line react-refresh/only-export-components
export function tileCount(product: Product, trauId: string, density: TrauDensity): number {
  if (product.stock <= 0) return 0
  const capacity = Math.max(1, Math.round(trauCols(trauId) * MAX_ROWS * DENSITY_MULT[density]))
  // «Full» trau måles mot et rimelig DAGSLAGER, ikke en hel måneds
  // etterspørsel. REGRESJONSFIKS (2026-07-07): før innkjøp/levering-runden ga
  // «dra vare til trau» en full startbatch (= maxDemandPerMonth, ~220 stk), så
  // r=1 og trauet var fullt. Nå har varer realistisk dagslager (20–30 stk) fra
  // åpningsleveranse/bestilling; r mot MÅNEDS-etterspørselen ble da ~0,1 → kun
  // 1 flis (og skew fikk ingen ekstra rad å vinkle → så ut som ren sidelengs-
  // forskyvning). Referansen er derfor dagsetterspørsel (maxDemandPerMonth /
  // handledager): et fullt dagslager fyller trauet akkurat som før
  // refaktoreringen, og trauet tømmes gradvis utover dagen. Selve
  // plasseringen/skew/scale i TrauContents er UENDRET.
  const dailyFull = Math.max(1, product.maxDemandPerMonth / DAY_CONFIG.daysPerMonth)
  const r = product.stock / dailyFull
  const frac = r >= 0.66 ? 1 : r >= 0.33 ? 0.625 : 0.25
  return Math.max(1, Math.round(capacity * frac))
}
export default function MonterScene({ districtId, lokaleId }: {
  districtId: string
  lokaleId: string
}) {
  const navigate = useNavigate()
  const { state, dispatch } = useGame()
  const stageRef = useRef<HTMLDivElement>(null)

  // LÆRINGSLAGET: kontekstuell mentor-trigger — disk-/monterflaten åpnet for styling.
  useEffect(() => { window.dispatchEvent(new CustomEvent('mentor:signal', { detail: { id: 'forste_disk_stell' } })) }, [])

  const [imgFailed, setImgFailed] = useState(false)
  const [drag, setDrag] = useState<{ productId: string } | null>(null)
  const [ghost, setGhost] = useState<{ x: number; y: number } | null>(null)
  const [overTrau, setOverTrau] = useState<string | null>(null)
  const [failedSprites, setFailedSprites] = useState<Set<string>>(new Set())
  const [devTrau, setDevTrau] = useState<MonterTrau[]>([])
  const [openPanelTrauId, setOpenPanelTrauId] = useState<string | null>(null)
  const [hoverHintTrauId, setHoverHintTrauId] = useState<string | null>(null)
  const [autoHintTrauId, setAutoHintTrauId] = useState<string | null>(null)
  const [, setRev] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  // Hvilke trau har allerede fått sitt automatiske «klikk for å tilpasse»-hint
  // denne økten — vises kun FØRSTE gang et gitt trau fylles, ikke støyende ved
  // hver re-fylling.
  const autoHintShownRef = useRef<Set<string>>(new Set())

  const activeDef = getActiveIndustryDefinition()
  const monterImg = activeDef.flater.lager.sceneImage
  const monterTrau = activeDef.flater.lager.trau
  // Paletten = FØRTE trau-varer (bestilt i Produkter-fanen), IKKE hele
  // katalogen (docs/INNKJOP_LEVERING.md). Varer uten lager vises fortsatt
  // (de er ført, kan stilles ut) — trauet renders bare tomt til de restokkes.
  const trauVarer = state.products.filter(p => p.trauVare)
  const layout = state.counterLayout
  // Full trau-liste denne økten: de faste (fra den aktive bransjens
  // lager-flate) + evt. dev-trau lagt til via traceren (?dev=1). N vilkårlige
  // soner — ikke fast 4.
  const allTrau = devTrau.length ? [...monterTrau, ...devTrau] : monterTrau

  function markFailed(src: string) {
    setFailedSprites(prev => prev.has(src) ? prev : new Set(prev).add(src))
  }

  /** ?dev=1: legg til et nytt, tomt trau (trau-N) å plassere med sone-traceren. */
  function addDevTrau() {
    const id = `trau-${allTrau.length + 1}`
    setDevTrau(prev => [...prev, { id, rect: [10, 10, 15, 15] }])
    console.log(
      `[MonterScene] La til ${id} — dra et rektangel i traceren og trykk `
      + `«Bruk siste på: ${id}», lim deretter inn i MONTER_TRAU i districts.ts`,
    )
  }

  // Lukk justeringspanelet ved klikk utenfor det (capture-fase, robust mot
  // stopPropagation andre steder — samme mønster som drag-lytterne under).
  useEffect(() => {
    if (!openPanelTrauId) return
    function onPointerDown(e: PointerEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpenPanelTrauId(null)
    }
    window.addEventListener('pointerdown', onPointerDown, true)
    return () => window.removeEventListener('pointerdown', onPointerDown, true)
  }, [openPanelTrauId])

  /** Hvilket trau ligger punktet (klient-koord) over? null hvis ingen. */
  function trauForPoint(clientX: number, clientY: number): string | null {
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return null
    const fx = ((clientX - rect.left) / rect.width) * 100
    const fy = ((clientY - rect.top) / rect.height) * 100
    for (const t of allTrau) {
      const [x, y, w, h] = t.rect
      if (fx >= x && fx <= x + w && fy >= y && fy <= y + h) return t.id
    }
    return null
  }

  /** «Still ut»: legg en ALLEREDE FØRT vare i DETTE trauet — ett trau for seg,
   *  ingen påvirkning av andre trau. Føring skjer ikke her lenger (den skjer
   *  ved bestilling i Produkter-fanen); paletten inneholder kun førte varer,
   *  så oppslaget mot state.products treffer alltid. */
  function placeInTrau(productId: string, trauId: string) {
    const product = state.products.find(p => p.id === productId)
    if (!product) return
    const next = [...layout.filter(t => t.trauId !== trauId), { trauId, productId: product.id }]
    dispatch({ type: 'SET_COUNTER_LAYOUT', items: next })

    // Første gang DETTE trauet fylles denne økten: vis «klikk for å
    // tilpasse»-hintet kort, automatisk (uoppfordret oppdagelse av panelet).
    if (!autoHintShownRef.current.has(trauId)) {
      autoHintShownRef.current.add(trauId)
      setAutoHintTrauId(trauId)
      window.setTimeout(() => setAutoHintTrauId(id => id === trauId ? null : id), 2200)
    }
  }

  /** Tømmer kun DETTE trauet — varen kan fortsatt stå i andre trau. */
  function clearTrau(trauId: string) {
    dispatch({ type: 'SET_COUNTER_LAYOUT', items: layout.filter(t => t.trauId !== trauId) })
  }

  /** Spillerens justeringspanel (DEL 1): oppdaterer tetthet/størrelse/skew
   *  for ÉN trau-plassering — live mens man drar sliderne. */
  function updateTrauAdjust(trauId: string, patch: Partial<Pick<TrauItem, 'density' | 'sizeAdjust' | 'skewAdjust'>>) {
    dispatch({
      type: 'SET_COUNTER_LAYOUT',
      items: layout.map(t => t.trauId === trauId ? { ...t, ...patch } : t),
    })
  }

  // Dra en trau-vare fra paletten til et trau.
  function startDrag(productId: string, e: React.PointerEvent) {
    e.preventDefault()
    setDrag({ productId })
    setGhost({ x: e.clientX, y: e.clientY })

    const onMove = (ev: PointerEvent) => {
      setGhost({ x: ev.clientX, y: ev.clientY })
      setOverTrau(trauForPoint(ev.clientX, ev.clientY))
    }
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove, true)
      window.removeEventListener('pointerup', onUp, true)
      const target = trauForPoint(ev.clientX, ev.clientY)
      setDrag(null); setGhost(null); setOverTrau(null)
      if (target) placeInTrau(productId, target)
    }
    // Capture-fase (robust mot stopPropagation andre steder).
    window.addEventListener('pointermove', onMove, true)
    window.addEventListener('pointerup', onUp, true)
  }

  const dragItem = drag ? state.products.find(p => p.id === drag.productId) ?? null : null

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden', background: '#10141c',
      fontFamily: "'Outfit', sans-serif",
    }}>
      {/* Tilbake bak disken */}
      <div style={{ position: 'fixed', top: 64, left: 20, zIndex: 80 }}>
        <BackButton onClick={() => navigate(`/game/d/${districtId}/l/${lokaleId}/inne`)} label="← Bak disken" />
      </div>

      {/* Cover-stage: monter-frontal i full bredde. */}
      <div
        ref={stageRef}
        style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          width: `max(100vw, calc(100vh * ${ASPECT}))`,
          height: `max(100vh, calc(100vw / ${ASPECT}))`,
        }}
      >
        {!imgFailed ? (
          <img
            src={monterImg} alt="Disk-monter" draggable={false}
            onError={() => setImgFailed(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', userSelect: 'none' }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, #2a2018 0%, #15110c 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#a98e6a', fontSize: 14, textAlign: 'center', padding: '0 2rem',
          }}>
            Monter-bilde mangler (placeholder)<br />(/assets/raw/monter-frontal.png)
          </div>
        )}

        {/* TRAU-LAG (z=5) — varene flislagt etter lager; tomme trau er
            diskré dropp-mål. Klikk på et FYLT trau åpner spillerens
            justeringspanel (DEL 1, under). */}
        {allTrau.map(t => {
          const placed = layout.find(ti => ti.trauId === t.id)
          const product = placed ? state.products.find(p => p.id === placed.productId) ?? null : null
          const density = placed?.density ?? 'standard'
          const sizeAdjust = placed?.sizeAdjust ?? 1
          const skewAdjust = placed?.skewAdjust ?? 0
          const n = product ? tileCount(product, t.id, density) : 0
          const hot = overTrau === t.id
          // Hint («Klikk for å tilpasse plassering») — kun fylte trau, kun ved
          // hover ELLER det korte auto-visningsvinduet første gang trauet ble
          // fylt, ALDRI mens justeringspanelet er åpent for dette trauet.
          const showHint = !!placed && openPanelTrauId !== t.id
            && (hoverHintTrauId === t.id || autoHintTrauId === t.id)
          return (
            <div
              key={t.id}
              onClick={() => { if (placed) setOpenPanelTrauId(t.id) }}
              onContextMenu={e => { e.preventDefault(); if (placed) clearTrau(t.id) }}
              onMouseEnter={() => { if (placed) setHoverHintTrauId(t.id) }}
              onMouseLeave={() => setHoverHintTrauId(id => id === t.id ? null : id)}
              title={product
                ? `${product.name} — klikk for å justere, høyreklikk for å tømme trauet`
                : 'Tomt trau — dra en vare hit'}
              style={{
                position: 'absolute',
                left: `${t.rect[0]}%`, top: `${t.rect[1]}%`, width: `${t.rect[2]}%`, height: `${t.rect[3]}%`,
                zIndex: 5,
                borderRadius: 8,
                cursor: placed ? 'pointer' : 'default',
                // Klipp KUN bakkanten — siden nærmest den som står bak disken
                // (POV) — til trauets egen nedre kant, likt for alle trau.
                // Topp/sider klippes ikke — der ligger varen bare litt lenger
                // ut mot glasset, ingen synlig feil.
                clipPath: 'inset(-100% -100% 0 -100%)',
                border: hot || openPanelTrauId === t.id
                  ? '2px solid rgba(255,180,84,0.95)'
                  : product ? '1px solid transparent' : '1px dashed rgba(255,255,255,0.22)',
                background: hot ? 'rgba(255,180,84,0.12)' : 'transparent',
                transition: 'border-color 0.12s, background 0.12s',
              }}
            >
              {product && n > 0
                ? <TrauContents product={product} trauId={t.id} n={n} scale={t.scale ?? 1} sizeAdjust={sizeAdjust} skewAdjust={skewAdjust} failedSprites={failedSprites} onFail={markFailed} />
                : null}

              {/* Prislapp — leser ELEVENS pris (product.retailPrice), samme
                  felt salgsmotoren leser. Plassert i toppkanten av trauet
                  (IKKE bunnen — den er klippet bort av clipPath over).
                  Mangler pris (0/usatt) ⇒ lovkrav-varsel i stedet for pris,
                  med forklaring ved hover. Ingen straff i v1 — kun
                  synliggjøring; product.retailPrice er allerede den ENE
                  tilstanden en senere tilsyns-/konsekvensmekanikk kan lese. */}
              {product && (
                product.retailPrice > 0 ? (
                  <div
                    title={`${product.name} — ${product.retailPrice.toLocaleString('nb-NO')} kr`}
                    style={{
                      position: 'absolute', left: 4, top: 4, zIndex: 8,
                      background: 'rgba(10,14,26,0.82)', border: '1px solid rgba(255,255,255,0.14)',
                      borderRadius: 5, padding: '1px 6px', color: '#e5e7eb',
                      fontSize: 9, fontWeight: 700, whiteSpace: 'nowrap', pointerEvents: 'none',
                    }}
                  >
                    {product.name} · {product.retailPrice.toLocaleString('nb-NO')} kr
                  </div>
                ) : (
                  <div
                    title="Mangler prismerking — prismerking er lovpålagt (prisopplysningsforskriften). Sett en utsalgspris på varen i Produkter-fanen."
                    style={{
                      position: 'absolute', left: 4, top: 4, zIndex: 8,
                      background: 'rgba(120,53,15,0.88)', border: '1px solid rgba(251,191,36,0.6)',
                      borderRadius: 5, padding: '1px 6px', color: '#fde68a',
                      fontSize: 9, fontWeight: 700, whiteSpace: 'nowrap', pointerEvents: 'auto',
                      cursor: 'help',
                    }}
                  >
                    ⚠ Mangler prismerking
                  </div>
                )
              )}

              {/* DEL 1 — diskret hint, dempet stil, sperrer ikke klikk. */}
              {showHint && (
                <div style={{
                  position: 'absolute', left: '50%', top: 0, transform: 'translate(-50%, -130%)',
                  background: 'rgba(10,14,26,0.82)', border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: 6, padding: '2px 7px', color: '#cbd5e1',
                  fontSize: 10, fontWeight: 600, whiteSpace: 'nowrap', pointerEvents: 'none',
                  opacity: 0.9, zIndex: 7,
                }}>
                  Klikk for å tilpasse plassering
                </div>
              )}
            </div>
          )
        })}

        {/* ?dev=1: sone-tracer med TRAU-mål (logger per trau til konsoll). */}
        {IS_DEV_COORDS && (
          <ZoneTracer onApply={() => setRev(r => r + 1)} targets={trauTargets(allTrau)} drawZones={trauDrawZones(allTrau)} />
        )}
      </div>

      {/* ?dev=1: legg til flere trau enn de faste (navngis trau-N fortløpende) —
          plasseres med sone-traceren over, lim resultatet inn i MONTER_TRAU. */}
      {IS_DEV_COORDS && (
        <div style={{ position: 'fixed', top: 64, right: 226, zIndex: 300 }}>
          <button
            onClick={addDevTrau}
            style={{
              background: 'rgba(255,210,74,0.12)', color: '#ffd24a', border: '1px solid #ffd24a66',
              borderRadius: 7, padding: '4px 9px', fontSize: 11, fontWeight: 700,
              cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
            }}
          >+ Nytt trau</button>
        </div>
      )}

      {/* SPILLERENS JUSTERINGSPANEL (DEL 1) — klikk på et fylt trau for å
          åpne. Kontinuerlige slidere for størrelse og vinkel/skew (samme
          følelse/range som det tidligere dev-kun kalibreringspanelet — nå
          spillerens verktøy per trau-PLASSERING, ikke en fast dev-konstant),
          pluss tetthet (Tett/Standard/Luftig). Live-oppdatering i trauet
          mens man drar. Lukkes ved klikk utenfor (useEffect over) eller ✕. */}
      {openPanelTrauId && (() => {
        const t = allTrau.find(x => x.id === openPanelTrauId)
        const placed = layout.find(l => l.trauId === openPanelTrauId)
        const product = placed ? state.products.find(p => p.id === placed.productId) : null
        if (!t || !placed || !product) return null
        const density = placed.density ?? 'standard'
        const sizeAdjust = placed.sizeAdjust ?? 1
        const skewAdjust = placed.skewAdjust ?? 0
        return (
          <div
            ref={panelRef}
            style={{
              position: 'fixed', top: 100, left: '50%', transform: 'translateX(-50%)', zIndex: 200, width: 240,
              background: 'rgba(10,14,26,0.96)', border: '1px solid #ffd24a66', borderRadius: 12,
              padding: '10px 14px 12px', fontFamily: "'Outfit', sans-serif", boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ color: '#ffd24a', fontSize: 12, fontWeight: 800 }}>🎛️ {t.id} · {product.name}</div>
              <button
                onClick={() => setOpenPanelTrauId(null)}
                title="Lukk"
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: 15, lineHeight: 1, cursor: 'pointer', padding: 2 }}
              >✕</button>
            </div>
            <CalRow
              label="Størrelse" value={sizeAdjust} min={0.5} max={1.5} step={0.02}
              fmt={v => `${Math.round(v * 100)}%`}
              onChange={v => updateTrauAdjust(t.id, { sizeAdjust: v })}
            />
            <CalRow
              label="Vinkel / skew" value={skewAdjust} min={-60} max={60} step={1}
              fmt={v => `${v.toFixed(0)}%`}
              onChange={v => updateTrauAdjust(t.id, { skewAdjust: v })}
            />
            <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 4 }}>Tetthet</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {DENSITY_OPTIONS.map(d => (
                <button
                  key={d}
                  onClick={() => updateTrauAdjust(t.id, { density: d })}
                  style={{
                    flex: 1, padding: '4px 0', borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: 'pointer',
                    fontFamily: "'Outfit', sans-serif",
                    background: density === d ? 'rgba(255,210,74,0.18)' : 'rgba(255,255,255,0.05)',
                    color: density === d ? '#ffd24a' : '#94a3b8',
                    border: `1px solid ${density === d ? 'rgba(255,210,74,0.55)' : 'rgba(255,255,255,0.12)'}`,
                  }}
                >{DENSITY_LABEL[d]}</button>
              ))}
            </div>
          </div>
        )
      })()}

      {/* PALETT — FØRTE trau-varer (bestilt i Produkter-fanen), drabare */}
      <div style={{
        position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 85,
        background: 'rgba(10,14,26,0.92)', borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '0.6rem 1rem', backdropFilter: 'blur(8px)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em', marginBottom: 6 }}>
          🧺 TRAU-VARER — dra opp i et trau for å stille ut
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {trauVarer.map(item => {
            const placed = layout.some(ti => ti.productId === item.id)
            const hue = productHue(item.id)
            const useSprite = item.sprite && !failedSprites.has(item.sprite)
            const utsolgt = item.stock <= 0
            return (
              <div
                key={item.id}
                onPointerDown={e => startDrag(item.id, e)}
                title={`${item.name} — ${item.stock} stk på lager · dra opp i et trau`}
                style={{
                  flex: '0 0 auto', width: 76, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  background: placed ? 'rgba(0,212,170,0.08)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${placed ? 'rgba(0,212,170,0.35)' : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: 10, padding: '0.4rem', cursor: 'grab',
                  userSelect: 'none', touchAction: 'none', opacity: utsolgt ? 0.6 : 1,
                }}
              >
                <div style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {useSprite
                    ? <img src={item.sprite} alt="" draggable={false} onError={() => markFailed(item.sprite!)} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    : <div style={{
                        width: 38, height: 38, borderRadius: 8,
                        background: `linear-gradient(160deg, hsl(${hue} 64% 52%), hsl(${hue} 56% 36%))`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                      }}>{item.icon}</div>}
                </div>
                <span style={{ fontSize: 10, color: '#cbd5e1', textAlign: 'center', lineHeight: 1.1 }}>{item.name}</span>
                <span style={{ fontSize: 9, color: utsolgt ? '#f87171' : '#00d4aa' }}>
                  {utsolgt ? 'Utsolgt' : `${item.stock} stk`}{placed ? ' ✓' : ''}
                </span>
              </div>
            )
          })}
          {trauVarer.length === 0 && (
            <span style={{ fontSize: 12, color: '#94a3b8' }}>
              Ingen varer ført ennå — bestill varer i dashbordet → Produkter, så dukker de opp her.
            </span>
          )}
        </div>
      </div>

      {/* Flytende spøkelse under drag (portales til body — fixed mot viewport). */}
      {drag && ghost && dragItem && (() => {
        const hue = productHue(dragItem.id)
        const useSprite = dragItem.sprite && !failedSprites.has(dragItem.sprite)
        return createPortal(
          <div style={{
            position: 'fixed', left: ghost.x, top: ghost.y, width: 54, height: 54,
            transform: 'translate(-50%, -50%)', zIndex: 9999, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.92,
          }}>
            {useSprite
              ? <img src={dragItem.sprite} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              : <div style={{
                  width: 48, height: 48, borderRadius: 8,
                  background: `linear-gradient(160deg, hsl(${hue} 64% 52%), hsl(${hue} 56% 36%))`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>{dragItem.icon}</div>}
          </div>,
          document.body,
        )
      })()}

      {/* Stillas-etikett nederst (over paletten) */}
      <div style={{
        position: 'fixed', bottom: 92, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 12, padding: '0.35rem 0.9rem', color: '#f1f5f9', zIndex: 80,
        fontSize: 12, whiteSpace: 'nowrap',
      }}>
        🧁 Disk-monter{IS_DEV_COORDS ? ' · trau-tracer aktiv' : ''}
      </div>
    </div>
  )
}

// ── Flislagt trau-innhold ─────────────────────────────────────────────────────
// Fliser holder naturlig størrelse (krympes IKKE for å få flere ved siden av
// hverandre) — bredden er fast per trau (trauCols: 1, eller 4 for trau-17/18).
// Flere fliser enn det som får plass i bredden stables bakover→fremover i
// dybden (rad for rad, maks MAX_ROWS), med litt skalering/z-rekkefølge så det
// leses som et lite lager, ikke en flat rekke. Flis-bredde = trauets EGEN
// statiske dev-skala (`scale`) × varens `displayScale` (fysisk størrelse per
// vare) × spillerens `sizeAdjust` (DEL 1-panelet, per plassering). Flis-rotasjon
// = varens `displayRotation` (avlange varer som ligger naturlig på skrå) +
// liten tilfeldig jitter. `skewAdjust` (spillerens panel) skjevstiller SPORET
// radene plasseres langs (bakerste ↔ fremste rad forskjøvet sidelengs) — samme
// mekanikk som det tidligere dev-kun trau-skewet, uten å rotere flisene selv.
function TrauContents({ product, trauId, n, scale: sizeScale, sizeAdjust, skewAdjust, failedSprites, onFail }: {
  product: Product
  trauId: string
  n: number
  scale: number
  sizeAdjust: number
  skewAdjust: number
  failedSprites: Set<string>
  onFail: (src: string) => void
}) {
  const cols = trauCols(trauId)
  const rows = Math.ceil(n / cols)
  const tileW = (cols === 1 ? 82 : (100 / cols) * 1.05) * sizeScale * (product.displayScale ?? 1) * sizeAdjust
  const baseRotation = product.displayRotation ?? 0
  const hue = productHue(product.id)
  const useSprite = product.sprite && !failedSprites.has(product.sprite)

  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const col = i % cols, row = Math.floor(i / cols)
        // Dybde: bakerste rad (row 0, øverst i sonen) minst, fremste (nærmest
        // glasset) størst — rendres/stables i samme rekkefølge (zIndex: row).
        const depth = rows > 1 ? row / (rows - 1) : 1
        const cx = ((col + 0.5) / cols) * 100 + skewAdjust * (depth - 0.5)
        const cy = ((row + 0.5) / rows) * 100
        const jx = (hash01(`${trauId}-${i}-x`) - 0.5) * 8
        const jy = (hash01(`${trauId}-${i}-y`) - 0.5) * 6
        const jitterRot = (hash01(`${trauId}-${i}-r`) - 0.5) * 12
        const rot = baseRotation + jitterRot
        const scale = 0.85 + 0.15 * depth
        return (
          <div key={i} style={{
            position: 'absolute', left: `${cx}%`, top: `${cy}%`, width: `${tileW}%`,
            transform: `translate(calc(-50% + ${jx}%), calc(-50% + ${jy}%)) rotate(${rot}deg) scale(${scale})`,
            zIndex: row,
          }}>
            {useSprite
              ? <img src={product.sprite} alt="" draggable={false} onError={() => onFail(product.sprite!)}
                  style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.4))' }} />
              : <div style={{
                  width: '100%', aspectRatio: '1', borderRadius: '20%',
                  background: `linear-gradient(160deg, hsl(${hue} 64% 52%), hsl(${hue} 56% 36%))`,
                  border: '1px solid rgba(0,0,0,0.3)', boxShadow: '0 2px 3px rgba(0,0,0,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '70cqw',
                  containerType: 'inline-size',
                }}>
                  <span style={{ fontSize: '60cqw' }}>{product.icon}</span>
                </div>}
          </div>
        )
      })}
    </>
  )
}

// ── Kalibrerings-slider (spillerens justeringspanel) ─────────────────────────
function CalRow({ label, value, min, max, step, fmt, onChange }: {
  label: string
  value: number
  min: number
  max: number
  step: number
  fmt: (v: number) => string
  onChange: (v: number) => void
}) {
  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'monospace', marginBottom: 2 }}>
        <span style={{ color: '#94a3b8' }}>{label}</span>
        <span style={{ color: '#ffd24a', fontWeight: 700 }}>{fmt(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: '#ffd24a', cursor: 'pointer' }}
      />
    </div>
  )
}
