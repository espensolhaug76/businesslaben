import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { MONTER_TRAU, type MonterTrau } from '../../data/districts'
import { useGame } from '../GameContext'
import { INDUSTRY_CATALOG, catalogToProduct, type IndustryCatalogItem } from '../data/industries'
import { BackButton } from './DistrictView'
import { IS_DEV_COORDS } from './DevCoordHelper'
import ZoneTracer, { type Rect, type Target, type DrawZone } from './ZoneTracer'
import type { Product } from '../types'

// ── MonterScene (FRONTAL MONTER — kunde-siden) ───────────────────────────────
// Frontal vy av disk-monteren. Disken er en LAGER-flate: hvert TRAU fylles med
// ÉN vares utklipp, flislagt etter lagermengde (full/halv/tom) med litt jitter.
// Dra en trau-vare fra paletten til et trau = «før varen + still den ut».
// Vare→trau persisteres i state (counterLayout), modellert så ferskhet/svinn
// kan legges på senere. Tomt trau = ingenting. Bilde-basert (cover 16:9) —
// monter-frontal.png er placeholder til Espen legger inn det ekte bildet.

const MONTER_IMG = '/assets/raw/monter-frontal.png'
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
function trauCols(trauId: string): number {
  return trauId === 'trau-17' || trauId === 'trau-18' ? 4 : 1
}
/** Antall fliser i ETT trau, uavhengig av alle andre trau: andel av DETTE
 *  trauets egen kapasitet (bredde × maks rader i dybden) etter lagermengde
 *  (full / halv / lav / tom). Hvert trau er en egen, selvstendig flate —
 *  ingen overflyt til naboer. */
function tileCount(product: Product, trauId: string): number {
  if (product.stock <= 0) return 0
  const capacity = trauCols(trauId) * MAX_ROWS
  const r = product.stock / Math.max(1, product.maxDemandPerMonth)
  const frac = r >= 0.66 ? 1 : r >= 0.33 ? 0.625 : 0.25
  return Math.max(1, Math.round(capacity * frac))
}
/** Når man «fører» en vare: en full starter-batch så trauet fylles. */
function starterStockFor(item: IndustryCatalogItem): number {
  return item.maxDemandPerMonth
}

export default function MonterScene({ districtId, lokaleId }: {
  districtId: string
  lokaleId: string
}) {
  const navigate = useNavigate()
  const { state, dispatch } = useGame()
  const stageRef = useRef<HTMLDivElement>(null)

  const [imgFailed, setImgFailed] = useState(false)
  const [drag, setDrag] = useState<{ catalogId: string } | null>(null)
  const [ghost, setGhost] = useState<{ x: number; y: number } | null>(null)
  const [overTrau, setOverTrau] = useState<string | null>(null)
  const [failedSprites, setFailedSprites] = useState<Set<string>>(new Set())
  const [devTrau, setDevTrau] = useState<MonterTrau[]>([])
  const [calTrauId, setCalTrauId] = useState('trau-1')
  const [, setRev] = useState(0)

  const catalog = INDUSTRY_CATALOG[state.industry] ?? []
  const trauVarer = catalog.filter(i => i.trauVare)
  const layout = state.counterLayout
  // Full trau-liste denne økten: de faste + evt. dev-trau lagt til via traceren
  // (?dev=1). N vilkårlige soner — ikke fast 4.
  const allTrau = devTrau.length ? [...MONTER_TRAU, ...devTrau] : MONTER_TRAU

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

  /** ?dev=1: kalibrer sporet vare-stacken plasseres langs / flis-størrelsen,
   *  for et VILKÅRLIG trau (mutasjon av det kjørende MONTER_TRAU-objektet,
   *  samme mønster som ZoneTracer — logges for permanent innliming i
   *  districts.ts). */
  function setTrauSkew(t: MonterTrau, pct: number) {
    t.skew = pct
    console.log(`[MonterScene] ${t.id}.skew = ${pct} — lim inn i MONTER_TRAU i districts.ts`)
    setRev(r => r + 1)
  }
  function setTrauScale(t: MonterTrau, mult: number) {
    t.scale = mult
    console.log(`[MonterScene] ${t.id}.scale = ${mult} — lim inn i MONTER_TRAU i districts.ts`)
    setRev(r => r + 1)
  }

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

  /** «Før + still ut»: legg varen i sortimentet (om ny) og i DETTE trauet —
   *  ett trau for seg, ingen påvirkning av andre trau. */
  function placeInTrau(catalogId: string, trauId: string) {
    const item = catalog.find(c => c.id === catalogId)
    if (!item) return
    const product = catalogToProduct(item, 'standard')
    dispatch({ type: 'CARRY_PRODUCT', product, starterStock: starterStockFor(item) })
    const next = [...layout.filter(t => t.trauId !== trauId), { trauId, productId: product.id }]
    dispatch({ type: 'SET_COUNTER_LAYOUT', items: next })
  }

  /** Tømmer kun DETTE trauet — varen kan fortsatt stå i andre trau. */
  function clearTrau(trauId: string) {
    dispatch({ type: 'SET_COUNTER_LAYOUT', items: layout.filter(t => t.trauId !== trauId) })
  }

  // Dra en trau-vare fra paletten til et trau.
  function startDrag(catalogId: string, e: React.PointerEvent) {
    e.preventDefault()
    setDrag({ catalogId })
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
      if (target) placeInTrau(catalogId, target)
    }
    // Capture-fase (robust mot stopPropagation andre steder).
    window.addEventListener('pointermove', onMove, true)
    window.addEventListener('pointerup', onUp, true)
  }

  const dragItem = drag ? catalog.find(c => c.id === drag.catalogId) ?? null : null

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
            src={MONTER_IMG} alt="Disk-monter" draggable={false}
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
            diskré dropp-mål. */}
        {allTrau.map(t => {
          const placed = layout.find(ti => ti.trauId === t.id)
          const product = placed ? state.products.find(p => p.id === placed.productId) ?? null : null
          const n = product ? tileCount(product, t.id) : 0
          const hot = overTrau === t.id
          return (
            <div
              key={t.id}
              onContextMenu={e => { e.preventDefault(); if (placed) clearTrau(t.id) }}
              title={product ? `${product.name} — høyreklikk for å tømme trauet` : 'Tomt trau — dra en vare hit'}
              style={{
                position: 'absolute',
                left: `${t.rect[0]}%`, top: `${t.rect[1]}%`, width: `${t.rect[2]}%`, height: `${t.rect[3]}%`,
                zIndex: 5,
                borderRadius: 8,
                // Klipp KUN bakkanten — siden nærmest den som står bak disken
                // (POV) — til trauets egen nedre kant, likt for alle trau.
                // Topp/sider klippes ikke — der ligger varen bare litt lenger
                // ut mot glasset, ingen synlig feil.
                clipPath: 'inset(-100% -100% 0 -100%)',
                border: hot
                  ? '2px solid rgba(255,180,84,0.95)'
                  : product ? '1px solid transparent' : '1px dashed rgba(255,255,255,0.22)',
                background: hot ? 'rgba(255,180,84,0.12)' : 'transparent',
                transition: 'border-color 0.12s, background 0.12s',
              }}
            >
              {product && n > 0
                ? <TrauContents product={product} trauId={t.id} n={n} skew={t.skew ?? 0} scale={t.scale ?? 1} failedSprites={failedSprites} onFail={markFailed} />
                : null}
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

      {/* ?dev=1: trau-kalibrering — VELG et trau, juster spor-skjevheten
          (bakerste rad ↔ fremste rad forskjøvet sidelengs, flisene roterer
          ikke selv) og flis-størrelsen. Gjelder alle 18 trau, ikke bare
          hjørnene. Verdiene logges for permanent innliming i districts.ts
          (samme mønster som sone-tracer). */}
      {IS_DEV_COORDS && (() => {
        const t = allTrau.find(x => x.id === calTrauId)
        return (
          <div style={{
            position: 'fixed', top: 112, left: 20, zIndex: 90, width: 200,
            background: 'rgba(10,14,26,0.94)', border: '1px solid #ffd24a55',
            borderRadius: 12, padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
          }}>
            <div style={{ color: '#ffd24a', fontSize: 12, fontWeight: 800, marginBottom: 6 }}>📐 Trau-kalibrering</div>
            <select
              value={calTrauId}
              onChange={e => setCalTrauId(e.target.value)}
              style={{
                width: '100%', marginBottom: 8, background: '#0a0e1a',
                color: '#f1f5f9', border: '1px solid #ffd24a44', borderRadius: 6,
                padding: '3px 6px', fontSize: 11, fontFamily: "'Outfit', sans-serif",
              }}
            >
              {allTrau.map(x => (
                <option key={x.id} value={x.id} style={{ background: '#0a0e1a', color: '#f1f5f9' }}>{x.id}</option>
              ))}
            </select>
            {t && (
              <>
                <SkewSlider trauId={t.id} skew={t.skew ?? 0} onChange={v => setTrauSkew(t, v)} />
                <ScaleSlider trauId={t.id} scale={t.scale ?? 1} onChange={v => setTrauScale(t, v)} />
              </>
            )}
            <div style={{ fontSize: 10, color: '#64748b', marginTop: 2, lineHeight: 1.4 }}>
              Verdiene logges i konsollen ved hver endring — meld dem tilbake for permanent lagring.
            </div>
          </div>
        )
      })()}

      {/* PALETT — trau-varer fra katalogen (drabare) */}
      <div style={{
        position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 85,
        background: 'rgba(10,14,26,0.92)', borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '0.6rem 1rem', backdropFilter: 'blur(8px)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em', marginBottom: 6 }}>
          🧺 TRAU-VARER — dra opp i et trau for å føre og stille ut
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {trauVarer.map(item => {
            const placed = layout.some(ti => ti.productId === `${item.id}_standard`)
            const hue = productHue(item.id)
            const useSprite = item.sprite && !failedSprites.has(item.sprite)
            return (
              <div
                key={item.id}
                onPointerDown={e => startDrag(item.id, e)}
                title={`${item.name} — dra opp i et trau`}
                style={{
                  flex: '0 0 auto', width: 76, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  background: placed ? 'rgba(0,212,170,0.08)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${placed ? 'rgba(0,212,170,0.35)' : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: 10, padding: '0.4rem', cursor: 'grab',
                  userSelect: 'none', touchAction: 'none',
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
                {placed && <span style={{ fontSize: 11, color: '#00d4aa' }}>✓</span>}
              </div>
            )
          })}
          {trauVarer.length === 0 && (
            <span style={{ fontSize: 12, color: '#475569' }}>Ingen trau-varer i katalogen for denne bransjen.</span>
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
// leses som et lite lager, ikke en flat rekke. `skew` skjevstiller SPORET
// radene plasseres langs (bakerste rad ↔ fremste rad forskjøvet sidelengs,
// som et parallellogram) for hjørnetrau fotografert skjevt (buet glass) —
// flisenes EGEN rotasjon (jitter under) er uendret av dette. `scale`
// justerer flis-størrelsen (1 = standard).
function TrauContents({ product, trauId, n, skew, scale: sizeScale, failedSprites, onFail }: {
  product: Product
  trauId: string
  n: number
  skew: number
  scale: number
  failedSprites: Set<string>
  onFail: (src: string) => void
}) {
  const cols = trauCols(trauId)
  const rows = Math.ceil(n / cols)
  const tileW = (cols === 1 ? 82 : (100 / cols) * 1.05) * sizeScale
  const hue = productHue(product.id)
  const useSprite = product.sprite && !failedSprites.has(product.sprite)

  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const col = i % cols, row = Math.floor(i / cols)
        // Dybde: bakerste rad (row 0, øverst i sonen) minst, fremste (nærmest
        // glasset) størst — rendres/stables i samme rekkefølge (zIndex: row).
        const depth = rows > 1 ? row / (rows - 1) : 1
        const cx = ((col + 0.5) / cols) * 100 + skew * (depth - 0.5)
        const cy = ((row + 0.5) / rows) * 100
        const jx = (hash01(`${trauId}-${i}-x`) - 0.5) * 8
        const jy = (hash01(`${trauId}-${i}-y`) - 0.5) * 6
        const rot = (hash01(`${trauId}-${i}-r`) - 0.5) * 12
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

// ── Kalibrerings-slider (?dev=1-panel) — delt av skew og størrelse ───────────
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
function SkewSlider({ trauId, skew, onChange }: { trauId: string; skew: number; onChange: (v: number) => void }) {
  return <CalRow label={`${trauId} · skew`} value={skew} min={-60} max={60} step={1} fmt={v => `${v.toFixed(0)}%`} onChange={onChange} />
}
function ScaleSlider({ trauId, scale, onChange }: { trauId: string; scale: number; onChange: (v: number) => void }) {
  return <CalRow label={`${trauId} · størrelse`} value={scale} min={0.5} max={1.5} step={0.02} fmt={v => `${Math.round(v * 100)}%`} onChange={onChange} />
}
