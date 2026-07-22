import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGame } from '../GameContext'
import type { AvisUtgave, RenderedNotis } from '../types'
import { BALANCE } from '../data/balance'

// ─── KROK 7c — SENTRUMSPOSTEN, det bla-bare avisoverlayet ────────────────────
// Åpnes fra 📰-ikonet i HUD-en. Leser state.avisArkiv (NYESTE FØRST):
//   Side 1  = FORSIDE (portrett) — gjeldende utgave, HTML-notiser over papiret.
//   Side 2+ = OPPSLAG (landskap) — ett arkiv-oppslag per ELDRE utgave bakover,
//             så eleven kan sjekke «hva varslet avisen forrige uke?».
// Papiret er BAKGRUNN; ALL tekst legges på som HTML/CSS (avishode i avis-serif,
// ikke i bildet). Show-through fra papirets svake bakgrunnstekst dempes med ett
// halvtransparent, papirfarget lag bak tekstflatene — juster ÉN konstant.

const FORSIDE = '/assets/raw/sentrumsposten-forside.png'
const OPPSLAG = '/assets/raw/sentrumsposten-oppslag.png'
const FORSIDE_ASPEKT = 896 / 1200                 // portrett, låst til bildets format
const OPPSLAG_ASPEKT = 1264 / 848                 // landskap, låst til bildets format
/** Show-through-demping: papirfarget slør bak tekstflatene. 0 = av, 1 = ugjennomsiktig.
 *  Default LAV så papiret fortsatt skinner gjennom. Tunbar (Espen). */
const SHOW_THROUGH_DEMPING = 0.42

const KILDE_ETIKETT: Record<RenderedNotis['kilde'], string> = {
  butikk: 'DIN BUTIKK',
  trend: 'BYENS PULS',
  aktor: 'NÆRINGSLIV',
}

function utgavelinje(u: AvisUtgave) {
  return `Uke ${u.ukeIMaaned} · Måned ${u.maaned} · År ${u.aar}`
}

export default function AvisOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state } = useGame()
  // NYESTE FØRST: index 0 = gjeldende utgave, resten = arkiv bakover (maks arkivUtgaver).
  const arkiv = state.avisArkiv.slice(0, BALANCE.avis.arkivUtgaver)
  // Sidene: forside for gjeldende utgave + ett oppslag per eldre utgave.
  const antallSider = Math.max(1, arkiv.length)
  const [side, setSide] = useState(0)

  // Nullstill til forsiden hver gang overlayet åpnes.
  useEffect(() => { if (open) setSide(0) }, [open])

  // Piltaster ‹/› blar mellom sidene mens overlayet er åpent.
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setSide(s => Math.min(antallSider - 1, s + 1))
      else if (e.key === 'ArrowLeft') setSide(s => Math.max(0, s - 1))
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, antallSider, onClose])

  if (!open) return <AnimatePresence />

  const gjeldende = arkiv[0]
  const erForside = side === 0
  // Side 0 = gjeldende (forside). Side k>0 = arkiv[k] (eldre utgave, oppslag).
  const visesUtgave = arkiv[side]

  return (
    <AnimatePresence>
      <motion.div
        key="avis"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 400,
          background: 'rgba(6,9,15,0.82)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '1.2rem',
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {!gjeldende ? (
          <TomAvis onClick={e => e.stopPropagation()} onClose={onClose} />
        ) : (
          <>
            <motion.div
              key={side}
              initial={{ scale: 0.96, opacity: 0.4, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                height: erForside ? 'min(84vh, 1040px)' : 'min(74vh, 780px)',
                aspectRatio: `${erForside ? FORSIDE_ASPEKT : OPPSLAG_ASPEKT}`,
                maxWidth: '96vw', backgroundImage: `url(${erForside ? FORSIDE : OPPSLAG})`,
                backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 6,
                boxShadow: '0 24px 70px rgba(0,0,0,0.6)', overflow: 'hidden',
              }}
            >
              {/* Lukk-knapp */}
              <button
                onClick={onClose}
                title="Lukk avisen"
                aria-label="Lukk Sentrumsposten"
                style={{
                  position: 'absolute', top: '1.5%', right: '2%', zIndex: 3,
                  width: 34, height: 34, borderRadius: 8, cursor: 'pointer',
                  background: 'rgba(20,16,10,0.72)', border: '1px solid rgba(255,255,255,0.25)',
                  color: '#f1e8d8', fontSize: 16, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >✕</button>

              {erForside
                ? <Forside utgave={visesUtgave} />
                : <Oppslag utgave={visesUtgave} />}
            </motion.div>

            {/* Bla-kontroll: ‹/› + sideindikator som TEKST (aldri kun ikon). */}
            <Blakontroll
              side={side} antall={antallSider}
              onForrige={() => setSide(s => Math.max(0, s - 1))}
              onNeste={() => setSide(s => Math.min(antallSider - 1, s + 1))}
              onClick={e => e.stopPropagation()}
            />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

/** Forsiden (portrett) — gjeldende utgave. Avishode + notiser i én kolonneflate. */
function Forside({ utgave }: { utgave: AvisUtgave }) {
  return (
    <>
      <div style={{ position: 'absolute', left: '11%', right: '11%', top: '9.5%', height: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', color: '#241d12' }}>
        <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 900, letterSpacing: '0.06em', fontSize: 'clamp(20px, 3.6vh, 44px)', lineHeight: 1 }}>
          SENTRUMSPOSTEN
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(9px, 1.5vh, 15px)', marginTop: 4, color: '#4a3f2c' }}>
          {utgavelinje(utgave)} — byens egen avis
        </div>
      </div>

      <div style={{ position: 'absolute', left: '10.5%', right: '10.5%', top: '23%', bottom: '5%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'absolute', inset: '-1.5% -2%', background: `rgba(244,238,224,${SHOW_THROUGH_DEMPING})`, borderRadius: 2 }} />
        <div style={{ position: 'relative', overflowY: 'auto', paddingRight: 6, columnGap: '5%', columnCount: 1 }}>
          {utgave.notiser.map((n, i) => (
            <Notis key={n.id} n={n} forst={i === 0} />
          ))}
          <div style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 11, color: '#6b5d45', marginTop: 6, paddingTop: 6, borderTop: '1px solid rgba(74,63,44,0.25)' }}>
            — Neste hovedutgave kommer neste mandag —
          </div>
        </div>
      </div>
    </>
  )
}

/** Arkiv-oppslag (landskap) — en eldre utgave, notiser i to kolonner. */
function Oppslag({ utgave }: { utgave: AvisUtgave }) {
  return (
    <>
      {/* ARKIV-merke øverst — alltid TEKST. */}
      <div style={{ position: 'absolute', left: '6%', right: '6%', top: '5%', height: '11%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', color: '#241d12' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(9px, 1.4vh, 13px)', fontWeight: 800, letterSpacing: '0.12em', color: '#8a6d3b' }}>
          ARKIV · TIDLIGERE UTGAVE
        </div>
        <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 900, letterSpacing: '0.05em', fontSize: 'clamp(15px, 2.6vh, 30px)', lineHeight: 1.1 }}>
          SENTRUMSPOSTEN
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(8px, 1.3vh, 13px)', color: '#4a3f2c' }}>
          {utgavelinje(utgave)}
        </div>
      </div>

      <div style={{ position: 'absolute', left: '6%', right: '6%', top: '19%', bottom: '5%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'absolute', inset: '-1.5% -2%', background: `rgba(244,238,224,${SHOW_THROUGH_DEMPING})`, borderRadius: 2 }} />
        <div style={{ position: 'relative', overflowY: 'auto', paddingRight: 6, columnGap: '6%', columnCount: 2 }}>
          {utgave.notiser.map((n, i) => (
            <Notis key={n.id} n={n} forst={i === 0} />
          ))}
        </div>
      </div>
    </>
  )
}

/** Bla-kontroll under papiret: ‹ / › + «Side N av M» som tekst. */
function Blakontroll({ side, antall, onForrige, onNeste, onClick }: {
  side: number; antall: number; onForrige: () => void; onNeste: () => void
  onClick: (e: React.MouseEvent) => void
}) {
  const knapp = (aktiv: boolean): React.CSSProperties => ({
    width: 40, height: 40, borderRadius: 99, cursor: aktiv ? 'pointer' : 'default',
    background: aktiv ? 'rgba(200,182,136,0.9)' : 'rgba(120,110,88,0.35)',
    border: '1px solid rgba(255,255,255,0.25)', color: aktiv ? '#241d12' : '#8a8270',
    fontSize: 20, fontWeight: 900, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
  })
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <button onClick={onForrige} disabled={side === 0} title="Forrige side" aria-label="Forrige side" style={knapp(side > 0)}>‹</button>
      <span style={{ color: '#e9e0cd', fontSize: 14, fontWeight: 700, minWidth: 92, textAlign: 'center' }}>
        Side {side + 1} av {antall}
      </span>
      <button onClick={onNeste} disabled={side >= antall - 1} title="Neste side" aria-label="Neste side" style={knapp(side < antall - 1)}>›</button>
    </div>
  )
}

/** Før første utgave er publisert: vennlig tom-tilstand. */
function TomAvis({ onClick, onClose }: { onClick: (e: React.MouseEvent) => void; onClose: () => void }) {
  return (
    <div onClick={onClick} style={{
      position: 'relative', background: '#f4eee0', borderRadius: 8, padding: '2.4rem 2.8rem',
      maxWidth: 420, textAlign: 'center', color: '#241d12', boxShadow: '0 24px 70px rgba(0,0,0,0.6)',
    }}>
      <button onClick={onClose} title="Lukk" aria-label="Lukk Sentrumsposten" style={{
        position: 'absolute', top: 10, right: 12, width: 30, height: 30, borderRadius: 8, cursor: 'pointer',
        background: 'rgba(20,16,10,0.14)', border: '1px solid rgba(36,29,18,0.25)', color: '#241d12', fontSize: 15,
      }}>✕</button>
      <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 900, letterSpacing: '0.06em', fontSize: 28 }}>
        SENTRUMSPOSTEN
      </div>
      <p style={{ fontFamily: 'Georgia, serif', fontSize: 15, lineHeight: 1.6, marginTop: 14, color: '#4a3f2c' }}>
        Byens egen avis er ikke ute ennå. Første hovedutgave kommer mandag — da
        skriver den om byens trender og om butikken din.
      </p>
    </div>
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
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(11px, 1.55vh, 14px)', lineHeight: 1.5, color: '#33291a' }}>
        {n.tekst}
      </div>
    </div>
  )
}
