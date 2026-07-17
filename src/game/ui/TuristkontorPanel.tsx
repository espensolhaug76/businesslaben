import { useState } from 'react'
import { useGame, turistsesongInfo, aktivBesoksprofil, useTemaNivaa } from '../GameContext'
import Fagord from './Fagord'
import { OPPLEVELSER, opplevelseById, EGEN_KAFE_ID, velgAmbientTurister } from '../data/reiseliv'
import { dagSeed } from '../data/backgroundSales'

// Faste posisjoner for ambient turist-gjester OPPÅ turistkontor-heroen (satt
// visuelt mot turistkontor-interior.png — INGEN tracer-kalibrering; Espen
// finjusterer i validering hvis de står dumt). Prosent av hero-boksen, forankret
// i bunn. To slots → 1–2 gjester (seedet rotasjon per dag).
const HERO_GJEST_SLOTS: { left: number; bottom: number; h: number }[] = [
  { left: 58, bottom: 0, h: 84 },
  { left: 80, bottom: 0, h: 74 },
]

// ─── TEMA 15 — TURISTKONTORET (DEL 5a + DEL 7 pakkebygger) ────────────────────
// Sesongstatus/prognose + «Opplev byen»-gjestepakken + pakkebyggeren
// (reiselivsprodukt): velg 3 opplevelser mot dagens besøksprofil, se treffet
// (aldri fasit) som et resultatkort med tall + tilbakemeldinger.
export default function TuristkontorPanel({ onLukk }: { onLukk: () => void }) {
  const { state, dispatch } = useGame()
  const sesong = turistsesongInfo(state)
  const igjen = sesong?.aktiv ? Math.max(0, sesong.varighet - sesong.dag + 1) : 0

  // Ambient turist-gjester i heroen: i sesong 1–2 seedede sprites (rolig
  // rotasjon per dag, ingen interaksjon). Turistene hører hjemme på
  // reiselivsstedene (bølge 3 v2) — kafé-ambient er av som standard.
  const heroSeed = dagSeed(state.dayNumber, state.currentMonth, state.currentYear)
  const heroGjester = sesong?.aktiv
    ? velgAmbientTurister(heroSeed, 1 + (heroSeed % 2)).slice(0, HERO_GJEST_SLOTS.length)
    : []

  // DEL 7 — pakkebyggeren. Dagens besøksprofil roterer deterministisk fra
  // sesongstarten; VG2 setter også pakkepris. Treffet regnes i reduceren.
  const nivaa = useTemaNivaa('reiseliv')
  const profil = aktivBesoksprofil(state)
  const pakke = state.reiselivPakke
  const [valgte, setValgte] = useState<string[]>([])
  const [pris, setPris] = useState(349)
  const toggleKort = (id: string) =>
    setValgte(v => v.includes(id) ? v.filter(x => x !== id) : (v.length < 3 ? [...v, id] : v))
  const sendPakke = () => {
    if (valgte.length !== 3 || !profil) return
    dispatch({ type: 'SET_REISELIV_PAKKE', profilId: profil.id, kortIds: valgte, pris: nivaa === 'vg2' ? pris : 0 })
  }
  const nyPakke = () => { dispatch({ type: 'SET_REISELIV_PAKKE', profilId: '', kortIds: [], pris: 0 }); setValgte([]) }

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
          position: 'relative', height: 150, overflow: 'hidden',
          backgroundImage: "linear-gradient(180deg, rgba(15,23,42,0.15) 40%, rgba(15,23,42,0.95) 100%), url('/assets/raw/turistkontor-interior.png')",
          backgroundSize: 'cover', backgroundPosition: 'center 38%',
        }}>
          {/* Ambient turist-gjester oppå heroen (bølge 3 v2) — seedet 1–2 pr. dag,
              faste posisjoner, ren visning. Tegnes FØR tittel/lukk så de blir
              liggende oppå. */}
          {heroGjester.map((t, i) => {
            const slot = HERO_GJEST_SLOTS[i]
            if (!slot) return null
            return (
              <img
                key={t.id}
                src={t.fil}
                alt=""
                aria-hidden
                draggable={false}
                onError={e => { e.currentTarget.style.display = 'none' }}
                style={{
                  position: 'absolute', left: `${slot.left}%`, bottom: `${slot.bottom}%`,
                  height: `${slot.h}%`, width: 'auto', transform: 'translateX(-50%)',
                  objectFit: 'contain', objectPosition: 'bottom center',
                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.55))',
                  pointerEvents: 'none', userSelect: 'none',
                }}
              />
            )
          })}
          <button onClick={onLukk} aria-label="Lukk" style={{ position: 'absolute', top: 10, right: 12, zIndex: 2, background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: 99, width: 30, height: 30, color: '#fff', fontSize: 18, cursor: 'pointer' }}>×</button>
          <div style={{ position: 'absolute', left: 18, bottom: 12, zIndex: 2, fontSize: 21, fontWeight: 900, textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>🧳 Turistkontoret</div>
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

        {/* ─── DEL 7 — PAKKEBYGGEREN (reiselivsprodukt) ─────────────────────── */}
        {sesong?.aktiv && profil && (
          <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.9rem', padding: '0.95rem 1rem' }}>
            <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 6 }}>🎒 Sett sammen en pakke</div>
            <p style={{ fontSize: 12.5, lineHeight: 1.55, color: '#94a3b8', margin: '0 0 0.85rem' }}>
              {/* FLAGG: fagordet «reiselivsprodukt» finnes ennå IKKE i glossary.json.
                  Jeg dikter ikke opp definisjonen — venter på Espens tekst, og
                  bytter <em> → <Fagord id="…"> når termen er lagt inn. */}
              Et <em>reiselivsprodukt</em> er en pakke av
              opplevelser satt sammen for en bestemt gjest. Godt <Fagord id="KULT_003">vertskap</Fagord> vil
              si å lese hva <em>disse</em> gjestene faktisk trenger.
            </p>

            {pakke ? (
              // Resultatkort — konsekvens etterpå (brannalarm-modellen: ingen score,
              // bare hva som skjedde + hva gjestene sa).
              <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '0.8rem', padding: '0.9rem 1rem' }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#4ade80', lineHeight: 1.1 }}>{pakke.turister}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#bbf7d0', marginBottom: 8 }}>turister kjøpte pakken din</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {pakke.kortIds.map(id => (
                    <span key={id} style={{ fontSize: 11.5, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, padding: '0.2rem 0.6rem' }}>
                      {opplevelseById(id)?.navn ?? id}
                    </span>
                  ))}
                </div>
                {pakke.tilbakemeldinger.map((t, i) => (
                  <div key={i} style={{ fontSize: 12.5, lineHeight: 1.5, color: '#cbd5e1', fontStyle: 'italic', marginBottom: 3 }}>{t}</div>
                ))}
                {pakke.egenKafe && (
                  <div style={{ fontSize: 12, color: '#7dd3fc', marginTop: 8 }}>☕ Kaféen din er med i pakken — flere pakkegjester stikker innom i sesongen.</div>
                )}
                <button onClick={nyPakke}
                  style={{ marginTop: 12, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 99, padding: '0.4rem 1rem', color: '#94a3b8', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Bygg en ny pakke
                </button>
              </div>
            ) : (
              <>
                {/* Besøksprofil — behovet i fritekst (aldri fasitliste) */}
                <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: '0.8rem', padding: '0.75rem 0.9rem', marginBottom: '0.85rem' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#7dd3fc', letterSpacing: '0.05em', marginBottom: 4 }}>DAGENS GJESTER</div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 3 }}>{profil.navn}</div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.55, color: '#cbd5e1' }}>{profil.tekst}</div>
                </div>

                {/* Opplevelsesbank — trykk for å legge til / fjerne (maks 3) */}
                <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>
                  Velg 3 opplevelser til pakken ({valgte.length}/3)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: '0.85rem' }}>
                  {OPPLEVELSER.map(o => {
                    const valgt = valgte.includes(o.id)
                    const kanLegge = valgt || valgte.length < 3
                    const egen = o.id === EGEN_KAFE_ID
                    return (
                      <button key={o.id} onClick={() => toggleKort(o.id)} disabled={!kanLegge}
                        style={{
                          textAlign: 'left', cursor: kanLegge ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
                          background: valgt ? 'rgba(56,189,248,0.16)' : egen ? 'rgba(250,204,21,0.08)' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${valgt ? 'rgba(56,189,248,0.6)' : egen ? 'rgba(250,204,21,0.35)' : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: '0.7rem', padding: '0.55rem 0.65rem', opacity: kanLegge ? 1 : 0.4,
                        }}>
                        <div style={{ fontSize: 12.5, fontWeight: 800, color: '#f1f5f9', marginBottom: 2 }}>
                          {valgt ? '✓ ' : ''}{egen ? '☕ ' : ''}{o.navn}
                        </div>
                        <div style={{ fontSize: 11, lineHeight: 1.4, color: '#94a3b8' }}>{o.beskrivelse}</div>
                        <div style={{ fontSize: 10.5, color: '#64748b', marginTop: 3 }}>{o.varighet} t · {'kr'.repeat(o.prisklasse)}</div>
                      </button>
                    )
                  })}
                </div>

                {/* VG2: sett pakkepris */}
                {nivaa === 'vg2' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.85rem' }}>
                    <label style={{ fontSize: 12.5, fontWeight: 700, color: '#cbd5e1' }}>Pakkepris</label>
                    <input type="number" value={pris} min={0} step={10}
                      onChange={e => setPris(Math.max(0, Number(e.target.value) || 0))}
                      style={{ width: 90, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '0.4rem 0.6rem', color: '#f1f5f9', fontSize: 13, fontFamily: 'inherit' }} />
                    <span style={{ fontSize: 12, color: '#64748b' }}>kr per gjest</span>
                  </div>
                )}

                <button onClick={sendPakke} disabled={valgte.length !== 3}
                  style={{
                    width: '100%', background: valgte.length === 3 ? 'linear-gradient(135deg,#38bdf8,#0ea5e9)' : 'rgba(255,255,255,0.06)',
                    border: 'none', borderRadius: 99, padding: '0.6rem 1.3rem', color: valgte.length === 3 ? '#0b1120' : '#64748b',
                    fontWeight: 800, fontSize: 13.5, cursor: valgte.length === 3 ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
                  }}>
                  Tilby pakken til gjestene
                </button>
              </>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
