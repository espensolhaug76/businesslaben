import { useState } from 'react'
import { useGame } from '../GameContext'
import Fagord from '../ui/Fagord'
import { gjestescenarioById, type GjestValg, type Kvalitet } from './hotellGjest'
import { byTilbudById, dekkerBehov, tagTreff, provisjonKr, type ByTilbud } from '../data/bykatalog'

// ─── HotellGjestOverlay — motor for hotellets gjestescenarier (Spor C DEL 5) ──
// Kompakt forgrenings-dialog (Likeverd-kvalitet). Faste valg + recommend-steg mot
// BYKATALOGEN + booking/provisjon (DEL 4b). Aldri fasit — feedback forklarer,
// resultatet viser tall + refleksjon. Provisjon registreres ved «Fullfør».
//
// Booking-regel (DEL 4b b/c): full behovstreff ('god') → gjesten booker gjerne,
// fornøyd. Delvis treff → gjesten booker likevel (plausibelt) og provisjon
// kommer inn, MEN feedbacken dagen etter er lunken (spenningen: høy provisjon,
// dårligere for gjesten). Bom ('dårlig') → gjesten takker NEI til booking (ingen
// provisjon) + trukket tilfredshet.

const SPRITE = (id: string) => `/assets/raw/customers/${id}.png`

function kvalitetAvTreff(t: ByTilbud, behov: string[]): Kvalitet {
  if (dekkerBehov(t, behov as never)) return 'god'
  return tagTreff(t, behov as never) > 0 ? 'delvis' : 'dårlig'
}

const KVAL_UI: Record<Kvalitet, { ikon: string; farge: string }> = {
  god: { ikon: '✓', farge: '#22c55e' }, delvis: { ikon: '⚠', farge: '#facc15' }, dårlig: { ikon: '✗', farge: '#ef4444' },
}

interface Booking { booket: boolean; provisjon: number; tilbudNavn: string; kvalitet: Kvalitet }

export default function HotellGjestOverlay({ scenarioId, open, onClose }: { scenarioId: string | null; open: boolean; onClose: () => void }) {
  const { dispatch } = useGame()
  const scenario = scenarioId ? gjestescenarioById(scenarioId) : undefined
  const [stepId, setStepId] = useState<string>('')
  const [pending, setPending] = useState<GjestValg | null>(null)
  const [picks, setPicks] = useState<Kvalitet[]>([])
  const [fase, setFase] = useState<'dialog' | 'result'>('dialog')
  const [spriteFeil, setSpriteFeil] = useState(false)
  // Anbefal-delfaser:
  const [valgtTilbud, setValgtTilbud] = useState<ByTilbud | null>(null)
  const [anbefalFase, setAnbefalFase] = useState<'velg' | 'anbefalt' | 'booket'>('velg')
  const [booking, setBooking] = useState<Booking | null>(null)

  if (!open || !scenario) return null
  const startId = scenario.steps[0]?.id ?? ''
  const curId = stepId || startId
  const step = scenario.steps.find(s => s.id === curId) ?? scenario.steps[0]!
  const stepIndex = scenario.steps.findIndex(s => s.id === step.id)

  function reset() {
    setStepId(''); setPending(null); setPicks([]); setFase('dialog')
    setValgtTilbud(null); setAnbefalFase('velg'); setBooking(null); setSpriteFeil(false)
  }
  function lukk() { reset(); onClose() }

  function gaaTil(next?: string) {
    setPending(null); setValgtTilbud(null); setAnbefalFase('velg')
    // 'result' (og undefined) er sentinel for resultat-fasen — ikke et steg-id.
    if (!next || next === 'result') { setFase('result'); return }
    setStepId(next)
  }

  // ── Faste valg ──────────────────────────────────────────────────────────────
  function velgFast(v: GjestValg) { setPicks(p => [...p, v.kvalitet]); setPending(v) }

  // ── Anbefal: velg tilbud fra bykatalogen ────────────────────────────────────
  function velgTilbud(t: ByTilbud) {
    const kval = kvalitetAvTreff(t, step.behov ?? [])
    setPicks(p => [...p, kval])
    setValgtTilbud(t); setAnbefalFase('anbefalt')
  }
  function svarBooking(jaBook: boolean) {
    const t = valgtTilbud!; const kval = kvalitetAvTreff(t, step.behov ?? [])
    if (!jaBook) { setBooking({ booket: false, provisjon: 0, tilbudNavn: t.navn, kvalitet: kval }); setAnbefalFase('booket'); return }
    if (kval === 'dårlig') { setBooking({ booket: false, provisjon: 0, tilbudNavn: t.navn, kvalitet: kval }); setAnbefalFase('booket'); return }
    setBooking({ booket: true, provisjon: provisjonKr(t), tilbudNavn: t.navn, kvalitet: kval }); setAnbefalFase('booket')
  }

  // ── Resultat ────────────────────────────────────────────────────────────────
  const gode = picks.filter(k => k === 'god').length
  const daarlige = picks.filter(k => k === 'dårlig').length
  const delvise = picks.filter(k => k === 'delvis').length
  const bookLunken = booking?.booket && booking.kvalitet === 'delvis'
  const bookBom = booking && !booking.booket && booking.kvalitet === 'dårlig'
  let tilfredshet = 55 + gode * 18 - delvise * 3 - daarlige * 22 + (bookLunken ? -8 : 0) + (bookBom ? -10 : 0)
  tilfredshet = Math.max(0, Math.min(100, tilfredshet))
  const tilfFarge = tilfredshet >= 70 ? '#22c55e' : tilfredshet >= 45 ? '#facc15' : '#ef4444'
  const provisjon = booking?.provisjon ?? 0

  function fullfor() {
    if (provisjon > 0 && booking) dispatch({ type: 'REGISTRER_PROVISJON', kr: provisjon, tilbudNavn: booking.tilbudNavn })
    lukk()
  }

  return (
    <div onPointerDown={e => { if (e.target === e.currentTarget) lukk() }}
      style={{ position: 'fixed', inset: 0, zIndex: 190, background: 'rgba(0,0,0,0.78)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ background: 'rgba(10,14,26,0.97)', backdropFilter: 'blur(30px)', border: '1px solid rgba(56,189,248,0.22)', borderRadius: '1.75rem', width: '100%', maxWidth: 580, maxHeight: 'calc(100vh - 3rem)', display: 'flex', flexDirection: 'column', color: '#f1f5f9', overflow: 'hidden' }}>
        {/* Header — gjest */}
        <div style={{ padding: '1.3rem 1.75rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {!spriteFeil ? (
              <img src={SPRITE(scenario.spriteId)} alt="" onError={() => setSpriteFeil(true)} draggable={false}
                style={{ height: 52, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))' }} />
            ) : (
              <div style={{ width: 40, height: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <svg viewBox="0 0 100 160" style={{ height: '100%' }} aria-hidden><circle cx="50" cy="30" r="20" fill="#334155" /><path d="M14 160 C14 104 28 80 50 80 C72 80 86 104 86 160 Z" fill="#334155" /></svg>
              </div>
            )}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#38bdf8', letterSpacing: '0.1em', marginBottom: 3 }}>🛎️ RESEPSJONEN · {scenario.tittel.toUpperCase()}</div>
              <h2 style={{ fontSize: 19, fontWeight: 900, margin: 0 }}>{scenario.gjestNavn}</h2>
            </div>
          </div>
          <button onClick={lukk} aria-label="Lukk" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, width: 34, height: 34, color: '#94a3b8', cursor: 'pointer', fontSize: 17, flexShrink: 0 }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.1rem 1.75rem 1.75rem' }}>
          {fase === 'dialog' ? renderDialog() : renderResult()}
        </div>
      </div>
    </div>
  )

  // ── Render: dialog ────────────────────────────────────────────────────────
  function renderDialog() {
    return (
      <>
        <div style={{ fontSize: 11, color: '#475569', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.55rem' }}>
          STEG {stepIndex + 1} AV {scenario!.steps.length}
        </div>
        <Replikk tekst={step.replikk} note={step.note} />

        {step.kind === 'anbefal' ? renderAnbefal() : renderFasteValg()}
      </>
    )
  }

  function renderFasteValg() {
    if (pending) return <FeedbackBlokk kvalitet={pending.kvalitet} tekst={pending.feedback} knapp={pending.next ? 'Videre →' : 'Se resultatet →'} onKlikk={() => gaaTil(pending!.next)} />
    return (
      <ValgListe>
        {(step.valg ?? []).map(v => <ValgKnapp key={v.id} tekst={v.tekst} onKlikk={() => velgFast(v)} />)}
      </ValgListe>
    )
  }

  function renderAnbefal() {
    const tilbud = (step.tilbudIds ?? []).map(byTilbudById).filter(Boolean) as ByTilbud[]
    if (anbefalFase === 'velg') {
      return (
        <ValgListe>
          {tilbud.map(t => (
            <ValgKnapp key={t.id} onKlikk={() => velgTilbud(t)}
              tekst={`${t.navn} — ${t.beskrivelse}`} />
          ))}
        </ValgListe>
      )
    }
    const t = valgtTilbud!
    const kval = kvalitetAvTreff(t, step.behov ?? [])
    const recFeedback = kval === 'god'
      ? `«${t.navn}» treffer akkurat behovet — det er både ${(step.behov ?? []).join(' og ')}. Godt lest.`
      : kval === 'delvis'
        ? `«${t.navn}» er ikke feil, men det treffer ikke HELE behovet — gjesten ba om ${(step.behov ?? []).join(' + ')}, og dette dekker bare noe av det.`
        : `«${t.navn}» passer dårlig til det gjesten ba om (${(step.behov ?? []).join(' + ')}).`
    if (anbefalFase === 'anbefalt') {
      return (
        <>
          <FeedbackBlokk kvalitet={kval} tekst={recFeedback} skjulKnapp />
          {t.bookbar ? (
            <div style={{ marginTop: '0.9rem' }}>
              <div style={{ fontSize: 13.5, color: '#cbd5e1', marginBottom: '0.6rem' }}>Skal jeg <strong>booke</strong> «{t.navn}» for gjesten? (formidling gir hotellet <Fagord id="LED_004">provisjon</Fagord>)</div>
              <ValgListe>
                <ValgKnapp tekst={`Ja — book «${t.navn}» for dem`} onKlikk={() => svarBooking(true)} />
                <ValgKnapp tekst="Nei — gi det bare som et tips" onKlikk={() => svarBooking(false)} />
              </ValgListe>
            </div>
          ) : (
            <div style={{ marginTop: '0.9rem', textAlign: 'right' }}>
              <PrimaerKnapp label={step.anbefalNext ? 'Videre →' : 'Se resultatet →'} onKlikk={() => gaaTil(step.anbefalNext)} />
            </div>
          )}
        </>
      )
    }
    // anbefalFase === 'booket'
    const b = booking!
    const bookTekst = b.booket
      ? (b.kvalitet === 'god'
          ? `Booket! Gjesten takker ja med en gang — dette var midt i blinken. Hotellet får ${b.provisjon} kr i provisjon, og gjesten fikk det de trengte.`
          : `Booket. Gjesten sier ja — det høres greit ut for dem. Hotellet får ${b.provisjon} kr i provisjon … men om det VAR det de trengte, viser seg i morgen.`)
      : (b.kvalitet === 'dårlig'
          ? `Gjesten takker nei: «Nei, det passer nok ikke helt for oss.» Ingen booking, ingen provisjon — og forslaget satte en liten støkk i tilliten.`
          : `Fint — du ga det som et tips uten å booke. Ingen provisjon, men heller ingen forpliktelse lagt på gjesten.`)
    return <FeedbackBlokk kvalitet={b.booket ? (b.kvalitet === 'god' ? 'god' : 'delvis') : (b.kvalitet === 'dårlig' ? 'dårlig' : 'delvis')} tekst={bookTekst} knapp={step.anbefalNext ? 'Videre →' : 'Se resultatet →'} onKlikk={() => gaaTil(step.anbefalNext)} />
  }

  // ── Render: resultat ──────────────────────────────────────────────────────
  function renderResult() {
    const s = scenario!
    return (
      <div>
        <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 1rem' }}>🧾 Oppsummering</h3>
        {/* Tilfredshet */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
            <span style={{ color: '#94a3b8' }}>Gjestetilfredshet</span>
            <span style={{ fontWeight: 800, color: tilfFarge }}>{tilfredshet}/100</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 99, height: 9, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${tilfredshet}%`, background: tilfFarge, borderRadius: 99 }} />
          </div>
        </div>

        {/* Provisjon formidling (hotell-driftens oppsummering) */}
        {provisjon > 0 && (
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: '0.7rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: 13.5 }}>
            <span style={{ color: '#cbd5e1' }}>Provisjon formidling («{booking!.tilbudNavn}»)</span>
            <span style={{ color: '#22c55e', fontWeight: 800 }}>+{provisjon} kr</span>
          </div>
        )}

        {/* Kundens skjulte behov */}
        <div style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 12, padding: '0.85rem 1rem', marginBottom: '0.85rem' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.05em', marginBottom: 4 }}>GJESTENS BEHOV</div>
          <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.5 }}>{s.skjultBehov}</div>
        </div>

        {/* Refleksjon — spenningen (høy provisjon, dårligere for gjesten) */}
        {bookLunken && (
          <div style={{ background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.3)', borderRadius: 12, padding: '0.85rem 1rem', marginBottom: '0.85rem' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#facc15', letterSpacing: '0.05em', marginBottom: 4 }}>🧑‍🏫 ESPEN SPØR</div>
            <div style={{ fontSize: 13, color: '#e2e8f0', lineHeight: 1.55 }}>
              Du tjente {provisjon} kr i <Fagord id="LED_004">provisjon</Fagord> på «{booking!.tilbudNavn}». Men det traff ikke helt det gjesten trengte — og en gjest som ikke fikk det som passet, kommer sjelden tilbake. Hva kostet egentlig den anbefalingen?
            </div>
          </div>
        )}

        {/* Læringspoeng — fagord der det er naturlig */}
        <div style={{ fontSize: 13.5, color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.3rem' }}>
          💬 {s.laeringspoeng} {renderFagordRad(s.id)}
        </div>

        <div style={{ textAlign: 'right' }}>
          <PrimaerKnapp label="Fullfør ✓" onKlikk={fullfor} />
        </div>
      </div>
    )
  }
}

// Fagord-rad per scenario (kun termer som finnes/naturlig hører hjemme). vertskap
// = KULT_003 (ligger på reiseliv-grenen; degraderer pent til ren tekst på main).
function renderFagordRad(id: string) {
  const felles = <Fagord id="KULT_003">vertskap</Fagord>
  if (id === 'mersalget') return <span style={{ fontSize: 12, color: '#64748b' }}> · {felles} · <Fagord id="ECO_034">mersalg</Fagord></span>
  if (id === 'klagen') return <span style={{ fontSize: 12, color: '#64748b' }}> · {felles} · <Fagord id="SRV_001">service recovery</Fagord></span>
  if (id === 'umulige') return <span style={{ fontSize: 12, color: '#64748b' }}> · {felles} · <Fagord id="KULT_001">kulturforståelse</Fagord></span>
  return <span style={{ fontSize: 12, color: '#64748b' }}> · {felles}</span>
}

// ── Små byggeklosser ──────────────────────────────────────────────────────────
function Replikk({ tekst, note }: { tekst: string; note?: string }) {
  return (
    <>
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0 14px 14px 14px', padding: '0.9rem 1.1rem', marginBottom: note ? '0.4rem' : '1rem' }}>
        <div style={{ fontSize: 15, color: '#f1f5f9', lineHeight: 1.5 }}>{tekst}</div>
      </div>
      {note && <div style={{ fontSize: 12, color: '#64748b', fontStyle: 'italic', marginBottom: '1rem' }}>{note}</div>}
    </>
  )
}
function ValgListe({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>{children}</div>
}
function ValgKnapp({ tekst, onKlikk }: { tekst: string; onKlikk: () => void }) {
  return (
    <button onClick={onKlikk}
      style={{ textAlign: 'left', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '0.75rem 1rem', color: '#f1f5f9', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', lineHeight: 1.4 }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(56,189,248,0.1)'; e.currentTarget.style.borderColor = 'rgba(56,189,248,0.45)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}>
      {tekst}
    </button>
  )
}
function FeedbackBlokk({ kvalitet, tekst, knapp, onKlikk, skjulKnapp }: { kvalitet: Kvalitet; tekst: string; knapp?: string; onKlikk?: () => void; skjulKnapp?: boolean }) {
  const ui = KVAL_UI[kvalitet]
  return (
    <div>
      <div style={{ background: `${ui.farge}1a`, border: `1px solid ${ui.farge}55`, borderRadius: 12, padding: '0.85rem 1.05rem', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span style={{ color: ui.farge, fontSize: 18, fontWeight: 900, lineHeight: 1.3 }}>{ui.ikon}</span>
        <div style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.5 }}>{tekst}</div>
      </div>
      {!skjulKnapp && knapp && (
        <div style={{ marginTop: '1rem', textAlign: 'right' }}><PrimaerKnapp label={knapp} onKlikk={onKlikk!} /></div>
      )}
    </div>
  )
}
function PrimaerKnapp({ label, onKlikk }: { label: string; onKlikk: () => void }) {
  return <button onClick={onKlikk} style={{ background: 'linear-gradient(135deg,#38bdf8,#0ea5e9)', border: 'none', borderRadius: 99, padding: '0.6rem 1.6rem', color: '#0b1120', fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>{label}</button>
}
