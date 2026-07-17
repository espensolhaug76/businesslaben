import { useGame, turistsesongInfo } from '../GameContext'

// ─── TEMA 15 — TURISTKONTORET (DEL 5a) ───────────────────────────────────────
// Enkel panel-visning: sesongstatus/prognose + «Opplev byen»-gjestepakken der
// eleven kan melde kaféen inn (gratis, men forplikter: pakkegjester forventer
// anbefalinger → løfter frekvensen av «anbefale lokale opplevelser»-scenariet).
// Åpnes fra turistkontor-hotspoten på sentrum-bydelsbildet (plassering tracet
// av Espen etter pilotvalg).
export default function TuristkontorPanel({ onLukk }: { onLukk: () => void }) {
  const { state, dispatch } = useGame()
  const sesong = turistsesongInfo(state)
  const igjen = sesong?.aktiv ? Math.max(0, sesong.varighet - sesong.dag + 1) : 0

  const statusTekst = !sesong
    ? 'Ingen turistsesong ennå. Når læreren åpner Reiseliv-temaet, starter sesongen.'
    : sesong.aktiv
      ? `Turistsesong pågår — dag ${sesong.dag} av ${sesong.varighet}. Omtrent ${Math.round(sesong.turistandel * 100)} % av kundene er tilreisende. ${igjen} handledager igjen av sesongen.`
      : 'Turistsesongen er over for denne gang.'

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ background: 'rgba(15,23,42,0.98)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '1.5rem', overflow: 'hidden', maxWidth: 480, width: '100%', maxHeight: '88vh', overflowY: 'auto', color: '#f1f5f9' }}>
        {/* HERO: turistkontor-interiøret (Espen-generert) som visuell ramme — ren
            CSS-bakgrunn, ingen sone-kalibrering. Tittel + lukk oppå med gradient
            for lesbarhet. (Horisont: full scene-oppgradering med tracede UI-soner
            er egen fremtidig jobb.) */}
        <div style={{
          position: 'relative', height: 150,
          backgroundImage: "linear-gradient(180deg, rgba(15,23,42,0.15) 40%, rgba(15,23,42,0.95) 100%), url('/assets/raw/turistkontor-interior.png')",
          backgroundSize: 'cover', backgroundPosition: 'center 38%',
        }}>
          <button onClick={onLukk} aria-label="Lukk" style={{ position: 'absolute', top: 10, right: 12, background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: 99, width: 30, height: 30, color: '#fff', fontSize: 18, cursor: 'pointer' }}>×</button>
          <div style={{ position: 'absolute', left: 18, bottom: 12, fontSize: 21, fontWeight: 900, textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>🧳 Turistkontoret</div>
        </div>
        <div style={{ padding: '1.25rem 1.5rem 1.6rem' }}>

        {/* Sesongstatus / prognose */}
        <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: '0.9rem', padding: '0.85rem 1rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#7dd3fc', letterSpacing: '0.06em', marginBottom: 4 }}>SESONGSTATUS</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.5, color: '#cbd5e1' }}>{statusTekst}</div>
        </div>

        {/* «Opplev byen»-gjestepakken */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.9rem', padding: '0.85rem 1rem' }}>
          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>«Opplev byen»-gjestepakken</div>
          <p style={{ fontSize: 12.5, lineHeight: 1.55, color: '#94a3b8', margin: '0 0 0.7rem' }}>
            Meld kaféen inn i turistkontorets gjestepakke — gratis. Til gjengjeld
            forventer pakkegjestene at du er et godt vertskap: gir tips om lokale
            opplevelser når de spør. Da kommer flere slike gjester innom.
          </p>
          {state.opplevByenPameldt ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#22c55e' }}>✓ Kaféen er med i gjestepakken</span>
              <button onClick={() => dispatch({ type: 'SET_OPPLEV_BYEN', pameldt: false })}
                style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 99, padding: '0.35rem 0.9rem', color: '#94a3b8', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                Meld ut
              </button>
            </div>
          ) : (
            <button onClick={() => dispatch({ type: 'SET_OPPLEV_BYEN', pameldt: true })}
              style={{ background: 'linear-gradient(135deg,#38bdf8,#0ea5e9)', border: 'none', borderRadius: 99, padding: '0.55rem 1.3rem', color: '#0b1120', fontWeight: 800, fontSize: 13.5, cursor: 'pointer', fontFamily: 'inherit' }}>
              Meld kaféen inn
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}
