import { useNavigate } from 'react-router-dom'
import { useGame, turistsesongInfo } from '../GameContext'
import { BackButton } from './DistrictView'

// ── TuristkontorScene (TEMA 15 — ROM, ikke panel) ────────────────────────────
// Turistkontoret er nå et ROM man går INN i (som kaféens /inne), ikke et
// overlay-panel. Fullskjerm turistkontor-interiør; eleven står bak disken
// (perspektivet i bildet). Besøkende kommer inn som sprite og stiller seg ved
// disken (DEL b); panel-innholdet (sesongstatus, pakkebygger, gjestepakke)
// legges inn som UI-lag i rommet (DEL c). Rute:
//   /game/d/:districtId/turistkontor
// Nås fra turistkontor-hotspoten på stasjonsbydelen.

const INTERIOR_IMG = '/assets/raw/turistkontor-interior.png'
const ASPECT = 1296 / 832   // bildets faktiske sideforhold

export default function TuristkontorScene({ districtId }: { districtId: string }) {
  const navigate = useNavigate()
  const { state } = useGame()
  const sesong = turistsesongInfo(state)
  const igjen = sesong?.aktiv ? Math.max(0, sesong.varighet - sesong.dag + 1) : 0

  const sesongTekst = !sesong
    ? 'Ingen turistsesong ennå.'
    : sesong.aktiv
      ? `Turistsesong — dag ${sesong.dag} av ${sesong.varighet} · ${igjen} handledager igjen`
      : 'Turistsesongen er over for denne gang.'

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#10141c', fontFamily: "'Outfit', sans-serif" }}>
      {/* Cover-stage: interiørbildet dekker skjermen. Sprite + UI-lag overlegges
          bildet, så prosent-koordinater treffer direkte. */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        width: `max(100vw, calc(100vh * ${ASPECT}))`,
        height: `max(100vh, calc(100vw / ${ASPECT}))`,
      }}>
        <img
          src={INTERIOR_IMG}
          alt="Turistkontoret"
          draggable={false}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', userSelect: 'none' }}
        />
      </div>

      {/* Tilbake til stasjonsbydelen */}
      <div style={{ position: 'absolute', top: 64, left: 20, zIndex: 80 }}>
        <BackButton onClick={() => navigate(`/game/d/${districtId}`)} label="← Stasjonen" />
      </div>

      {/* Sesongstatus — diskret øverst midtstilt */}
      <div style={{ position: 'absolute', top: 66, left: '50%', transform: 'translateX(-50%)', zIndex: 80 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(10,14,26,0.82)', border: '1px solid rgba(56,189,248,0.35)',
          borderRadius: 99, padding: '0.4rem 1rem', color: '#e2e8f0', fontSize: 13, fontWeight: 700,
        }}>
          <span style={{ fontSize: 15 }}>🧳</span>
          <span>{sesongTekst}</span>
        </div>
      </div>
    </div>
  )
}
