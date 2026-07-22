import { useState, useRef, useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useGame } from '../GameContext'
import { byId, byTerm, categoryLabel, type GlossaryTerm } from '../data/glossary'
import { manedligeFasteKostnader } from '../data/economy'

// ─── LÆRINGSLAGET — <Fagord> ──────────────────────────────────────────────────
// <Fagord id="ECO_001">dekningsbidrag</Fagord> gir en diskret stiplet understrek;
// klikk åpner et forklaringskort (popover) med term, definisjon, DYNAMISK
// eksempel (elevens egne tall der mulig), «⚠️ Vanlig feil» og klikkbare relaterte
// begreper. Underviser der eleven allerede er — endrer ikke spill-logikk.

function kr(n: number): string { return `${Math.round(n).toLocaleString('nb-NO')} kr` }

/** Et eksempel regnet ut fra elevens FAKTISKE state der begrepet støtter det —
 *  ellers null (kortet faller tilbake til det statiske eksempelet). */
function dynamiskEksempel(id: string, state: ReturnType<typeof useGame>['state']): string | null {
  const hp = state.products.find(p => p.id === state.mainProductId) ?? state.products.find(p => p.retailPrice > 0)
  const db = hp ? hp.retailPrice - hp.costPrice : 0
  switch (id) {
    case 'ECO_001': // Dekningsbidrag (DB)
      return hp ? `Ditt hovedprodukt «${hp.name}»: ${kr(hp.retailPrice)} − ${kr(hp.costPrice)} = ${kr(db)} i dekningsbidrag per enhet.` : null
    case 'ECO_027': // Dekningsbidrag (duplikat)
      return hp ? `«${hp.name}»: ${kr(hp.retailPrice)} − ${kr(hp.costPrice)} = ${kr(db)} per enhet.` : null
    case 'ECO_002': // Dekningsgrad (DG)
      return hp && hp.retailPrice > 0 ? `«${hp.name}»: (${kr(db)} / ${kr(hp.retailPrice)}) × 100 = ${Math.round((db / hp.retailPrice) * 100)} % dekningsgrad.` : null
    case 'ECO_011': // Avanse (påslag)
      return hp ? `«${hp.name}»: ${kr(hp.retailPrice)} − ${kr(hp.costPrice)} = ${kr(db)} i avanse per enhet.` : null
    case 'ECO_006': // Variable kostnader
      return hp ? `For «${hp.name}» er innkjøpsprisen ${kr(hp.costPrice)} — en variabel kostnad som påløper per solgte enhet.` : null
    case 'ECO_007': { // Faste kostnader
      const { sum } = manedligeFasteKostnader(state)
      return `Dine faste kostnader nå: ${kr(sum)} per måned (husleie ${kr(state.monthlyRent)}, lønn ${kr(state.monthlyPayroll)}, forsikring 2 000 kr, markedsføring ${kr(Object.values(state.marketingBudget).reduce((s, v) => s + v, 0))}). De påløper uansett hvor mye du selger.`
    }
    case 'ECO_021': { // Rente
      const l = state.loans[0]
      return l ? `Ditt lån: ${kr(l.remainingBalance)} × ${(l.interestRate * 100).toFixed(0)} % p.a. ≈ ${kr(l.remainingBalance * l.interestRate / 12)} i renter denne måneden.` : null
    }
    case 'ECO_020': // Gjeld
      return state.totalDebt > 0 ? `Din gjeld nå: ${kr(state.totalDebt)} igjen å betale ned på lånet ditt.` : null
    case 'ECO_010': // Resultat
      return `Månedsresultat = alle inntekter − alle kostnader (varekost, faste kostnader, svinn, renter/avdrag). Positivt = overskudd, negativt = underskudd.`
    default:
      return null
  }
}

function FagordKort({ term, anchor, onNavigate, onClose }: {
  term: GlossaryTerm
  anchor: DOMRect
  onNavigate: (id: string) => void
  onClose: () => void
}) {
  const { state } = useGame()
  const dyn = dynamiskEksempel(term.id, state)

  // Plasser under ordet, klemt til viewporten.
  const W = 340
  const left = Math.max(12, Math.min(anchor.left, window.innerWidth - W - 12))
  const topBelow = anchor.bottom + 8
  const openUp = topBelow + 260 > window.innerHeight && anchor.top > 280
  const style: React.CSSProperties = {
    position: 'fixed', left, width: W, zIndex: 1000,
    ...(openUp ? { bottom: window.innerHeight - anchor.top + 8 } : { top: topBelow }),
  }

  return createPortal(
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 999 }} />
      <div style={{
        ...style, fontFamily: "'Outfit', sans-serif",
        background: 'rgba(12,17,29,0.99)', border: '1px solid rgba(125,211,252,0.35)',
        borderRadius: 14, padding: '0.9rem 1rem', color: '#e2e8f0',
        boxShadow: '0 12px 40px rgba(0,0,0,0.55)', maxHeight: 'min(70vh, 460px)', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#7dd3fc' }}>{term.term}</div>
            <div style={{ fontSize: 10, color: '#64748b', marginTop: 1 }}>{categoryLabel(term.category)} · {term.level}</div>
          </div>
          <button onClick={onClose} title="Lukk" style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: 16, cursor: 'pointer', lineHeight: 1, padding: 2 }}>✕</button>
        </div>

        <div style={{ fontSize: 12.5, lineHeight: 1.5, color: '#cbd5e1', marginTop: 8 }}>{term.definition}</div>

        {term.formula && (
          <div style={{ fontSize: 12, fontFamily: 'monospace', color: '#f1f5f9', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '6px 9px', marginTop: 8 }}>
            {term.formula}
          </div>
        )}

        {(dyn || term.example) && (
          <div style={{ marginTop: 8, background: dyn ? 'rgba(0,212,170,0.07)' : 'rgba(255,255,255,0.03)', border: `1px solid ${dyn ? 'rgba(0,212,170,0.25)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 8, padding: '7px 9px' }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.05em', color: dyn ? '#00d4aa' : '#64748b', marginBottom: 3 }}>
              {dyn ? '🧮 DITT EKSEMPEL' : 'EKSEMPEL'}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.5, color: '#cbd5e1' }}>{dyn ?? term.example}</div>
          </div>
        )}

        {term.commonMistake && (
          <div style={{ fontSize: 12, lineHeight: 1.5, color: '#fbbf24', background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.25)', borderRadius: 8, padding: '7px 9px', marginTop: 8 }}>
            ⚠️ <span style={{ fontWeight: 700 }}>Vanlig feil:</span> {term.commonMistake}
          </div>
        )}

        {term.related.length > 0 && (
          <div style={{ marginTop: 9, display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: '#64748b' }}>Se også:</span>
            {term.related.map(r => {
              const rt = byTerm(r)
              return rt ? (
                <button key={r} onClick={() => onNavigate(rt.id)} style={{
                  background: 'rgba(125,211,252,0.1)', border: '1px solid rgba(125,211,252,0.3)', borderRadius: 99,
                  padding: '2px 9px', fontSize: 11, color: '#7dd3fc', cursor: 'pointer', fontFamily: 'inherit',
                }}>{rt.term}</button>
              ) : (
                <span key={r} style={{ fontSize: 11, color: '#475569', padding: '2px 4px' }}>{r}</span>
              )
            })}
          </div>
        )}
      </div>
    </>,
    document.body,
  )
}

export default function Fagord({ id, children }: { id: string; children: ReactNode }) {
  const [shownId, setShownId] = useState<string | null>(null)
  const ref = useRef<HTMLSpanElement>(null)
  const term = shownId ? byId(shownId) : null

  // DEL 1e — meld til mentoren når et Fagord-kort åpnes/lukkes → Espen tar
  // lese-posen (samme visuelle «forklarer»-kobling som når ordboka er åpen).
  // Cleanup melder LUKKET så posen aldri henger igjen om kortet unmountes åpent.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('mentor:fagord', { detail: { open: shownId != null } }))
    return () => { if (shownId != null) window.dispatchEvent(new CustomEvent('mentor:fagord', { detail: { open: false } })) }
  }, [shownId])

  function open(e: React.MouseEvent) {
    e.stopPropagation()
    if (byId(id)) setShownId(id)
  }

  const anchor = ref.current?.getBoundingClientRect()

  return (
    <>
      <span
        ref={ref}
        onClick={open}
        role="button"
        title="Hva betyr dette? Klikk for forklaring"
        style={{
          borderBottom: '1px dashed rgba(125,211,252,0.7)', cursor: 'help',
          textUnderlineOffset: 2,
        }}
      >
        {children}
      </span>
      {term && anchor && (
        <FagordKort term={term} anchor={anchor} onNavigate={setShownId} onClose={() => setShownId(null)} />
      )}
    </>
  )
}
