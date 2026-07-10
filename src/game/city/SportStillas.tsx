// ─── SportStillas — /dev/sport (eksperiment/autonom-sport) ────────────────────
//
// Frittstående dev-scene (IKKE koblet til onboarding/spillflyten) som viser den
// autonomt byggede SPORTSBUTIKKEN: det bakte, ferdig møblerte interiøret
// (sport-interior-mobler.png) med FASTE, kalibrerte vareplasser oppå — hver
// plass viser én NB-generert sport-vare (public/assets/raw/sport/).
//
//   /dev/sport         → ferdig stocket butikk (les-modus)
//   /dev/sport?dev=1    → VareplassTracer: klikk for å legge til, dra for å
//                         flytte, ± for skala/rotasjon, høyreklikk for å
//                         slette, «📋 Kopier» dumper vareplasser-arrayet klart
//                         til å lime inn i SPORT.vareplasser (industryDefinition.ts).
//
// Mønster hentet fra den validerte klesbutikk-stillas-malen (jobb/klesbutikk):
// bakt interiør + faste %-vareplasser + tracer-kalibrering, men trimmet til det
// sport-eksperimentet trenger (ingen drag-snap-palett, ingen GameContext).

import { useEffect, useRef, useState } from 'react'
import { IS_DEV_COORDS } from './DevCoordHelper'
import { SPORT, type Vareplass, type PlassType } from '../data/industryDefinition'
import { SPORT_VARER, sportVareById, repVareForType } from '../data/sportVarer'

const INTERIOR_IMG = '/assets/raw/sport-interior-mobler.png'
const SCENE_W = 1365
const SCENE_H = 768

const PLASS_TYPER: PlassType[] = ['sko', 'heng', 'brett', 'utstyr']
const TYPE_LABEL: Record<PlassType, string> = {
  sko: '👟 Sko', heng: '🧥 Heng', brett: '🧺 Brett', utstyr: '⚽ Utstyr',
}

// heng = topp-ankret (henger ned fra rail-punktet), resten = bunn-ankret
// (står på hylle/bord/gulv). Samme skille som klesbutikk-malens plassTransform.
function plassTransform(vp: { type: PlassType; rot?: number }) {
  const bunn = vp.type !== 'heng'
  const anchor = bunn ? 'translate(-50%, -100%)' : 'translate(-50%, -6%)'
  const rot = vp.rot ?? 0
  return {
    transform: `${anchor}${rot ? ` rotate(${rot}deg)` : ''}`,
    transformOrigin: bunn ? '50% 100%' : '50% 50%',
  }
}

// ── localStorage-utkast så kalibrering aldri tapes ved reload ────────────────
const LS_KEY = 'sport-vareplass-utkast'
function saveDraft() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(SPORT.vareplasser ?? [])) } catch { /* ignore */ }
}
;(function restoreDraft() {
  try {
    const raw = typeof localStorage !== 'undefined' && localStorage.getItem(LS_KEY)
    if (!raw) return
    const d = JSON.parse(raw)
    if (Array.isArray(d) && d.length && SPORT.vareplasser)
      SPORT.vareplasser.splice(0, SPORT.vareplasser.length, ...d)
  } catch { /* ignore */ }
})()

// Tekst-dump: vareplasser-array klart til innliming i industryDefinition.ts.
function vareplasserText(pts: Vareplass[]): string {
  const rows = pts.map(v => {
    const extra = v.rot ? `, rot: ${v.rot}` : ''
    return `    { id: '${v.id}', type: '${v.type}', x: ${v.x}, y: ${v.y}, scale: ${v.scale}${v.vare ? `, vare: '${v.vare}'` : ''}${extra} },`
  })
  return `vareplasser: [\n${rows.join('\n')}\n  ],`
}

export default function SportStillas() {
  const pts: Vareplass[] = (SPORT.vareplasser ??= [])
  const sceneRef = useRef<HTMLDivElement>(null)
  const [, force] = useState(0)
  const bump = () => force(n => n + 1)

  // tracer-tilstand
  const [selType, setSelType] = useState<PlassType>('sko')
  const [selId, setSelId] = useState<string | null>(null)
  const dragRef = useRef<{ id: string } | null>(null)

  useEffect(() => {
    if (!IS_DEV_COORDS) return
    const onMove = (e: MouseEvent) => {
      const d = dragRef.current
      const el = sceneRef.current
      if (!d || !el) return
      const r = el.getBoundingClientRect()
      const vp = pts.find(p => p.id === d.id)
      if (!vp) return
      vp.x = Math.round(((e.clientX - r.left) / r.width) * 1000) / 10
      vp.y = Math.round(((e.clientY - r.top) / r.height) * 1000) / 10
      saveDraft(); bump()
    }
    const onUp = () => { dragRef.current = null }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [pts])

  function addAt(e: React.MouseEvent) {
    if (!IS_DEV_COORDS) return
    const el = sceneRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = Math.round(((e.clientX - r.left) / r.width) * 1000) / 10
    const y = Math.round(((e.clientY - r.top) / r.height) * 1000) / 10
    const n = pts.filter(p => p.type === selType).length + 1
    const rep = repVareForType(selType)
    pts.push({ id: `${selType}-${n}`, type: selType, x, y, scale: 0.05, vare: rep?.id })
    setSelId(`${selType}-${n}`); saveDraft(); bump()
  }

  function adjust(id: string, dScale: number, dRot: number) {
    const vp = pts.find(p => p.id === id)
    if (!vp) return
    if (dScale) vp.scale = Math.max(0.01, Math.round((vp.scale + dScale) * 1000) / 1000)
    if (dRot) vp.rot = Math.round(((vp.rot ?? 0) + dRot) * 10) / 10
    saveDraft(); bump()
  }

  function remove(id: string) {
    const i = pts.findIndex(p => p.id === id)
    if (i >= 0) pts.splice(i, 1)
    if (selId === id) setSelId(null)
    saveDraft(); bump()
  }

  const sel = selId ? pts.find(p => p.id === selId) : undefined

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#1a1a1e', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div
        ref={sceneRef}
        onClick={addAt}
        style={{
          position: 'relative',
          width: `min(100vw, calc(100vh * ${SCENE_W} / ${SCENE_H}))`,
          aspectRatio: `${SCENE_W} / ${SCENE_H}`,
          backgroundImage: `url(${INTERIOR_IMG})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          boxShadow: '0 10px 60px rgba(0,0,0,.5)',
          cursor: IS_DEV_COORDS ? 'crosshair' : 'default',
        }}
      >
        {pts.map(vp => {
          const vare = sportVareById(vp.vare) ?? (IS_DEV_COORDS ? repVareForType(vp.type) : undefined)
          if (!vare) return null
          const xf = plassTransform(vp)
          const isSel = IS_DEV_COORDS && selId === vp.id
          // width i % av SCENE-containeren (ikke px) så spriten skalerer med
          // det responsive scenebildet — samme %-modell som klesbutikk-malen.
          return (
            <img key={vp.id} src={vare.sprite} alt={vare.navn} draggable={false}
              onMouseDown={IS_DEV_COORDS ? (e) => { e.stopPropagation(); dragRef.current = { id: vp.id }; setSelId(vp.id) } : undefined}
              onClick={IS_DEV_COORDS ? (e) => e.stopPropagation() : undefined}
              onContextMenu={IS_DEV_COORDS ? (e) => { e.preventDefault(); remove(vp.id) } : undefined}
              style={{
                position: 'absolute', left: `${vp.x}%`, top: `${vp.y}%`,
                width: `${vp.scale * 100}%`, height: 'auto',
                transform: xf.transform, transformOrigin: xf.transformOrigin,
                zIndex: Math.round(vp.y * 10),
                filter: isSel ? 'drop-shadow(0 0 4px #22d3ee)' : 'none',
                cursor: IS_DEV_COORDS ? 'grab' : 'default',
              }} />
          )
        })}
      </div>

      {/* Les-modus badge */}
      {!IS_DEV_COORDS && (
        <div style={{ position: 'fixed', left: 12, bottom: 12, color: '#cbd5e1',
                      font: '12px system-ui', opacity: .7 }}>
          🏟️ Sportsbutikk — {pts.length} vareplasser · ?dev=1 for kalibrering
        </div>
      )}

      {/* Tracer-panel */}
      {IS_DEV_COORDS && (
        <div style={{ position: 'fixed', top: 10, right: 10, width: 250, background: '#0f172a',
                      color: '#e2e8f0', font: '12px system-ui', borderRadius: 10, padding: 12,
                      boxShadow: '0 8px 30px rgba(0,0,0,.5)' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📌 VareplassTracer ({pts.length})</div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
            {PLASS_TYPER.map(t => (
              <button key={t} onClick={() => setSelType(t)}
                style={{ padding: '4px 6px', borderRadius: 6, cursor: 'pointer', border: 'none',
                         background: selType === t ? '#22d3ee' : '#1e293b',
                         color: selType === t ? '#0f172a' : '#94a3b8' }}>
                {TYPE_LABEL[t]}
              </button>
            ))}
          </div>
          <div style={{ opacity: .7, marginBottom: 8 }}>
            Klikk scenen = ny <b>{TYPE_LABEL[selType]}</b>-plass. Dra sprite = flytt.
            Høyreklikk = slett.
          </div>
          {sel && (
            <div style={{ background: '#1e293b', borderRadius: 6, padding: 8, marginBottom: 8 }}>
              <div style={{ marginBottom: 4 }}><b>{sel.id}</b> · {sel.vare ?? '—'}</div>
              <div>x {sel.x} · y {sel.y} · s {sel.scale}{sel.rot ? ` · ${sel.rot}°` : ''}</div>
              <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                <button onClick={() => adjust(sel.id, -0.005, 0)}>–</button>
                <span style={{ flex: 1, textAlign: 'center' }}>skala</span>
                <button onClick={() => adjust(sel.id, +0.005, 0)}>+</button>
              </div>
              <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                <button onClick={() => adjust(sel.id, 0, -1)}>↺</button>
                <span style={{ flex: 1, textAlign: 'center' }}>rot</span>
                <button onClick={() => adjust(sel.id, 0, +1)}>↻</button>
              </div>
              <select value={sel.vare ?? ''} onChange={e => { sel.vare = e.target.value || undefined; saveDraft(); bump() }}
                style={{ width: '100%', marginTop: 6 }}>
                <option value="">(velg vare)</option>
                {SPORT_VARER.filter(v => v.type === sel.type).map(v => (
                  <option key={v.id} value={v.id}>{v.navn}</option>
                ))}
              </select>
            </div>
          )}
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ flex: 1 }} onClick={() => {
              const txt = vareplasserText(pts)
              console.log('[SportStillas] lim inn i SPORT (industryDefinition.ts):\n  ' + txt)
              navigator.clipboard?.writeText('  ' + txt)
            }}>📋 Kopier</button>
            <button onClick={() => { localStorage.removeItem(LS_KEY); location.reload() }}>Tøm</button>
          </div>
        </div>
      )}
    </div>
  )
}
