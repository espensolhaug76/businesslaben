import Fagord from '../ui/Fagord'
import { BYKATALOG, provisjonKr, type ByTilbud } from '../data/bykatalog'

// ─── HotellAvtalerOverlay — «Hotellets avtaler» (Spor C, forenkling) ──────────
// ERSTATTER den strøkne «Gjestepakke-forhandlingen». Espens beslutning: hotellet
// har FERDIGFORHANDLEDE avtaler — eleven FORHANDLER ikke, den BRUKER dem (speiler
// skolepraksis: pakker settes sammen av allerede forhandlede avtaler). Selve
// B2B-forhandlingen er en mulig VG2-utvidelse (BRANSJE4-planen), bevisst utelatt.
//
// Dette er en LESEVISNING: en enkel liste over byens tilbydere med AVTALT
// provisjonssats per partner. Poenget er at satsene er ÅPNE for eleven — det gjør
// anbefalings-dilemmaet i «Innsjekket» synlig: den høyeste satsen er sjelden det
// beste for gjesten (Gårdsbesøket 8 % passer familien; Klatreparken 18 % frister
// hotellet). Gratis-tilbudene gir 0 — ofte best for gjesten, verdiløst for
// hotellet. Ren data fra BYKATALOG (ingen state, ingen forhandling).

export default function HotellAvtalerOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  const aktiviteter = BYKATALOG.filter(t => t.kategori === 'aktivitet')
  // Avtaler med provisjon (bookbare) — sortert høyest sats først, så «fristelsen»
  // står øverst og kontrasten mot behovstreff blir tydelig.
  const avtaler = aktiviteter.filter(t => t.bookbar && t.provisjonsProsent > 0)
    .sort((a, b) => b.provisjonsProsent - a.provisjonsProsent)
  // Gratis for gjesten — ingen avtale, ingenting til hotellet (ofte best likevel).
  const gratis = aktiviteter.filter(t => !t.bookbar || t.provisjonsProsent <= 0)

  return (
    <div onPointerDown={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, zIndex: 190, background: 'rgba(0,0,0,0.78)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ background: 'rgba(10,14,26,0.97)', backdropFilter: 'blur(30px)', border: '1px solid rgba(56,189,248,0.22)', borderRadius: '1.75rem', width: '100%', maxWidth: 600, maxHeight: 'calc(100vh - 3rem)', display: 'flex', flexDirection: 'column', color: '#f1f5f9', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '1.3rem 1.75rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#38bdf8', letterSpacing: '0.1em', marginBottom: 3 }}>🤝 BYHOTELLET</div>
            <h2 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>Hotellets avtaler</h2>
          </div>
          <button onClick={onClose} aria-label="Lukk" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, width: 34, height: 34, color: '#94a3b8', cursor: 'pointer', fontSize: 17, flexShrink: 0 }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.1rem 1.75rem 1.75rem' }}>
          {/* Intro — bruk, ikke forhandle */}
          <div style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 12, padding: '0.85rem 1rem', marginBottom: '1.1rem', fontSize: 13.5, color: '#cbd5e1', lineHeight: 1.55 }}>
            Hotellet har <strong style={{ color: '#f1f5f9' }}>ferdigforhandlede avtaler</strong> med byens
            tilbydere. Du forhandler dem ikke — du <strong style={{ color: '#f1f5f9' }}>bruker</strong> dem
            når du anbefaler og booker for en gjest. «Avtalt sats» er den{' '}
            <Fagord id="LED_004">provisjonen</Fagord> hotellet får av det gjesten betaler.
          </div>

          {/* Avtaler med provisjon */}
          <SeksjonTittel>Avtaler med provisjon</SeksjonTittel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.3rem' }}>
            {avtaler.map(t => <AvtaleRad key={t.id} t={t} />)}
          </div>

          {/* Gratis for gjesten */}
          <SeksjonTittel>Gratis for gjesten — ingen avtale</SeksjonTittel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.1rem' }}>
            {gratis.map(t => <GratisRad key={t.id} t={t} />)}
          </div>

          {/* Poenget — vertskap vs provisjon */}
          <div style={{ background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.3)', borderRadius: 12, padding: '0.85rem 1rem', fontSize: 13, color: '#e2e8f0', lineHeight: 1.55 }}>
            <span style={{ fontWeight: 700, color: '#facc15' }}>Merk: </span>
            den høyeste satsen er sjelden det beste for gjesten. Godt{' '}
            <Fagord id="KULT_003">vertskap</Fagord> betyr å anbefale det som passer behovet —
            også når det gir hotellet lite eller ingenting. Det er avveiingen du møter i «Møt en gjest».
          </div>
        </div>
      </div>
    </div>
  )
}

function SeksjonTittel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{children}</div>
}

const SESONG_ETIKETT: Record<string, string> = { helår: 'Hele året', vinter: 'Vinter', sommer: 'Sommer' }

function AvtaleRad({ t }: { t: ByTilbud }) {
  const kr = provisjonKr(t)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '0.7rem 0.95rem' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: '#f1f5f9' }}>{t.navn}</div>
        <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 1 }}>{SESONG_ETIKETT[t.sesong]} · {t.pris} kr</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#22c55e' }}>{t.provisjonsProsent} %</div>
        <div style={{ fontSize: 11, color: '#64748b' }}>≈ {kr} kr/booking</div>
      </div>
    </div>
  )
}

function GratisRad({ t }: { t: ByTilbud }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.12)', borderRadius: 12, padding: '0.7rem 0.95rem' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: '#cbd5e1' }}>{t.navn}</div>
        <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 1 }}>{SESONG_ETIKETT[t.sesong]} · gratis</div>
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', flexShrink: 0 }}>0 %</div>
    </div>
  )
}
