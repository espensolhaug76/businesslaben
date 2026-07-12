import { useState, useEffect, useMemo } from 'react'
import { useGame } from '../GameContext'
import { BRANNALARM_KORT, BRANNALARM_SEKUNDER, BRANNALARM_FASIT, brannalarmKort } from '../data/beredskap'

// ─── TEMA 1 / DEL 5 — Brannalarm som REKKEFØLGE-ØVELSE ───────────────────────
// 7 handlingskort i tilfeldig rekkefølge; eleven legger 5 i riktig rekkefølge i
// en nummerert plan (1–5). Klikk = legg i neste ledige slot / ta ut igjen (drag
// støttes også). Diskret nedtelling; går tiden ut leveres det som ligger.
// Ingen fasit-avsløring underveis — utfallet fortelles som konsekvens etterpå.
//
// To moduser: SKARP (innboksen, ekte konsekvens → RESOLVE_BRANNALARM) og
// ØVELSE (HMS-fanen, ingen konsekvens → RESOLVE_BRANNOVELSE). `ovelse`-flagget
// styrer hvilken action som fyres; `onLevert` lar HMS-fanen bytte til utfall.

export default function BrannalarmOvelse({ messageId, ovelse, onLevert }: {
  messageId?: string; ovelse?: boolean; onLevert?: (rekkefolge: string[]) => void
}) {
  const { dispatch } = useGame()
  const startPool = useMemo(() => [...BRANNALARM_KORT].map(k => k.id).sort(() => Math.random() - 0.5), [])
  const [pool, setPool] = useState<string[]>(startPool)
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null, null, null])
  const [sek, setSek] = useState(BRANNALARM_SEKUNDER)
  const [levert, setLevert] = useState(false)

  const fylt = slots.filter(Boolean).length

  function assign(id: string) {
    const idx = slots.findIndex(s => s === null)
    if (idx < 0 || levert) return
    setSlots(s => s.map((v, i) => (i === idx ? id : v)))
    setPool(p => p.filter(x => x !== id))
  }
  function unassign(idx: number) {
    if (levert) return
    const id = slots[idx]; if (!id) return
    setSlots(s => s.map((v, i) => (i === idx ? null : v)))
    setPool(p => [...p, id])
  }
  function lever(auto = false) {
    setLevert(true)
    const rekkefolge = slots.map(s => s ?? '')
    if (ovelse) dispatch({ type: 'RESOLVE_BRANNOVELSE', rekkefolge })
    else dispatch({ type: 'RESOLVE_BRANNALARM', rekkefolge, messageId: messageId ?? '' })
    onLevert?.(rekkefolge)
    void auto
  }

  // Diskret nedtelling; tiden ut ⇒ lever automatisk med det som ligger.
  useEffect(() => {
    if (levert) return
    if (sek <= 0) { lever(true); return }
    const t = setTimeout(() => setSek(s => s - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sek, levert])

  const lav = sek <= 15
  const kortStil = (dra: boolean): React.CSSProperties => ({
    background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: 8,
    padding: '0.45rem 0.6rem', color: '#f1f5f9', fontSize: 12.5, cursor: dra ? 'grab' : 'pointer',
    textAlign: 'left', fontFamily: 'inherit', width: '100%',
  })

  return (
    <div>
      {/* ØVELSE-merke — tydelig at dette IKKE påvirker penger/rykte. */}
      {ovelse && (
        <div style={{ display: 'inline-block', background: 'rgba(56,189,248,0.14)', border: '1px solid rgba(56,189,248,0.5)', borderRadius: 99, padding: '2px 10px', fontSize: 10.5, fontWeight: 800, color: '#7dd3fc', letterSpacing: '0.06em', marginBottom: 8 }}>
          🎯 ØVELSE · ingen konsekvens
        </div>
      )}
      {/* Nedtelling */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: 1 }}>Legg planen — riktig rekkefølge</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: lav ? '#ef4444' : '#94a3b8' }}>⏱ {sek}s</div>
      </div>

      {/* Nummererte slots (1–5) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 10 }}>
        {slots.map((id, i) => (
          <div key={i}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { const d = e.dataTransfer.getData('text/plain'); if (d && pool.includes(d)) assign(d) }}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 22, height: 22, flexShrink: 0, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
            {id ? (
              <button onClick={() => unassign(i)} title="Klikk for å ta ut" style={{ ...kortStil(false), background: 'rgba(0,212,170,0.12)', border: '1px solid rgba(0,212,170,0.4)' }}>
                {brannalarmKort(id)?.tekst}
              </button>
            ) : (
              <div style={{ flex: 1, border: '1px dashed rgba(255,255,255,0.18)', borderRadius: 8, padding: '0.45rem 0.6rem', color: '#475569', fontSize: 12 }}>
                Klikk et kort under (eller dra det hit) …
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Kort-pool */}
      {pool.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 10 }}>
          {pool.map(id => (
            <button key={id}
              draggable onDragStart={e => e.dataTransfer.setData('text/plain', id)}
              onClick={() => assign(id)} style={kortStil(true)}>
              {brannalarmKort(id)?.tekst}
            </button>
          ))}
        </div>
      )}

      <button onClick={() => lever()} disabled={fylt < 5}
        title={fylt < 5 ? 'Legg 5 handlinger i planen først' : undefined}
        style={{ background: fylt >= 5 ? 'linear-gradient(135deg,#00d4aa,#0d9488)' : 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 99, padding: '0.55rem 1.4rem', color: fylt >= 5 ? '#fff' : '#475569', fontWeight: 800, fontSize: 13.5, cursor: fylt >= 5 ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>
        Lever ({fylt}/5)
      </button>
    </div>
  )
}

/** Grønn/rød sammenligning: elevens rekkefølge ved siden av planens fasit
 *  («se selv hvor det skar seg»). Delt av innboksen (skarp) og HMS-fanen
 *  (øvelse) så de aldri divergerer. Vises FØRST etter levering — aldri underveis. */
export function BrannalarmSammenligning({ rekkefolge }: { rekkefolge: string[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 11.5 }}>
      <div>
        <div style={{ fontWeight: 800, color: '#94a3b8', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Din rekkefølge</div>
        {rekkefolge.map((id, i) => (
          <div key={i} style={{ color: id && BRANNALARM_FASIT[i] === id ? '#22c55e' : '#fca5a5', padding: '2px 0', lineHeight: 1.35 }}>{i + 1}. {brannalarmKort(id)?.tekst ?? '— (tomt)'}</div>
        ))}
      </div>
      <div>
        <div style={{ fontWeight: 800, color: '#94a3b8', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Planens rekkefølge</div>
        {BRANNALARM_FASIT.map((id, i) => (
          <div key={i} style={{ color: '#cbd5e1', padding: '2px 0', lineHeight: 1.35 }}>{i + 1}. {brannalarmKort(id)?.tekst}</div>
        ))}
      </div>
    </div>
  )
}
