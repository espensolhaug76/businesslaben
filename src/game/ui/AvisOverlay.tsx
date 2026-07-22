import { motion } from 'framer-motion'
import type { AvisUtgave, RenderedNotis } from '../types'

// ─── KROK 7c — SENTRUMSPOSTEN, avis-visningen ────────────────────────────────
// Forside-bildet (vannmerke fjernet) er BAKGRUNN; ALL tekst legges på som HTML/CSS
// (avishode i avis-serif, ikke i bildet). Notisene flyter i papirets kolonneflate.
// Show-through fra papirets svake bakgrunnstekst dempes med ett halvtransparent,
// papirfarget lag bak tekstkolonnene — juster ÉN konstant (Espen dømmer lesbarheten).

const FORSIDE = '/assets/raw/sentrumsposten-forside.png'
const PAPIR_ASPEKT = 896 / 1200                 // låst til bildets format
/** Show-through-demping: papirfarget slør bak tekstkolonnene. 0 = av, 1 = ugjennomsiktig.
 *  Default LAV så papiret fortsatt skinner gjennom. Tunbar (Espen). */
const SHOW_THROUGH_DEMPING = 0.42

const KILDE_ETIKETT: Record<RenderedNotis['kilde'], string> = {
  butikk: 'DIN BUTIKK',
  trend: 'BYENS PULS',
  aktor: 'NÆRINGSLIV',
}

export default function AvisOverlay({ utgave, onClose }: { utgave: AvisUtgave; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 400,
        background: 'rgba(6,9,15,0.82)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.2rem',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Papiret — aspekt-låst, med bildet som bakgrunn */}
      <motion.div
        initial={{ scale: 0.94, y: 14 }} animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', height: 'min(94vh, 1100px)', aspectRatio: `${PAPIR_ASPEKT}`,
          maxWidth: '96vw', backgroundImage: `url(${FORSIDE})`, backgroundSize: 'cover',
          backgroundPosition: 'center', borderRadius: 6, boxShadow: '0 24px 70px rgba(0,0,0,0.6)',
          overflow: 'hidden',
        }}
      >
        {/* Lukk-knapp */}
        <button
          onClick={onClose}
          title="Lukk avisen"
          style={{
            position: 'absolute', top: '1.5%', right: '2.5%', zIndex: 3,
            width: 34, height: 34, borderRadius: 8, cursor: 'pointer',
            background: 'rgba(20,16,10,0.72)', border: '1px solid rgba(255,255,255,0.25)',
            color: '#f1e8d8', fontSize: 16, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >✕</button>

        {/* AVISHODE i hodebåndet (avis-serif i CSS, ikke bilde) */}
        <div style={{ position: 'absolute', left: '11%', right: '11%', top: '9.5%', height: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', color: '#241d12' }}>
          <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 900, letterSpacing: '0.06em', fontSize: 'clamp(20px, 3.6vh, 44px)', lineHeight: 1 }}>
            SENTRUMSPOSTEN
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontStyle: 'italic', fontSize: 'clamp(9px, 1.5vh, 15px)', marginTop: 4, color: '#4a3f2c' }}>
            Uke {utgave.ukeIMaaned} · Måned {utgave.maaned} · År {utgave.aar} — byens egen avis
          </div>
        </div>

        {/* NOTISENE i kolonneflaten. Ett dempingslag bak teksten (show-through). */}
        <div style={{ position: 'absolute', left: '10.5%', right: '10.5%', top: '23%', bottom: '5%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'absolute', inset: '-1.5% -2%', background: `rgba(244,238,224,${SHOW_THROUGH_DEMPING})`, borderRadius: 2 }} />
          <div style={{ position: 'relative', overflowY: 'auto', paddingRight: 6, columnGap: '5%', columnCount: 1 }}>
            {utgave.notiser.map((n, i) => (
              <Notis key={n.id} n={n} forst={i === 0} />
            ))}
            <div style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 11, color: '#6b5d45', marginTop: 6, paddingTop: 6, borderTop: '1px solid rgba(74,63,44,0.25)' }}>
              — Neste utgave kommer neste mandag —
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Notis({ n, forst }: { n: RenderedNotis; forst: boolean }) {
  return (
    <div style={{ breakInside: 'avoid', marginBottom: forst ? '0.9rem' : '0.8rem', paddingBottom: '0.7rem', borderBottom: '1px solid rgba(74,63,44,0.22)', color: '#241d12' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', color: '#8a6d3b', border: '1px solid rgba(138,109,59,0.5)', borderRadius: 3, padding: '1px 5px' }}>
          {KILDE_ETIKETT[n.kilde]}
        </span>
        {/* Fremover-merke: alltid TEKST, aldri kun farge/ikon. */}
        {n.fremover && (
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 9, fontWeight: 800, letterSpacing: '0.06em', color: '#7a1f1f' }}>
            » NESTE UKE
          </span>
        )}
      </div>
      <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 800, fontSize: forst ? 'clamp(15px, 2.3vh, 22px)' : 'clamp(13px, 1.9vh, 18px)', lineHeight: 1.2, marginBottom: 4 }}>
        {n.tittel}
      </div>
      <div style={{ fontFamily: "Georgia, serif", fontSize: 'clamp(11px, 1.55vh, 14px)', lineHeight: 1.5, color: '#33291a' }}>
        {n.tekst}
      </div>
    </div>
  )
}
