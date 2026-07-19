import { useState } from 'react'
import { useGame, useTemaNivaa } from '../GameContext'
import Fagord from './Fagord'
import { OPPLEVELSER, opplevelseById, EGEN_KAFE_ID, type Besoksprofil } from '../data/reiseliv'

// ── Pakkebygger (TEMA 15 DEL 7 → gjenbrukt som scene-overlay) ────────────────
// «Sett sammen en pakke» (reiselivsprodukt): velg 3 opplevelser mot en
// BESØKSPROFIL, se treffet (aldri fasit) som resultatkort. Uendret logikk fra
// det gamle panelet — nå en frittstående overlay som åpnes fra turistkontor-
// scenen (walk-in-gjest) ELLER fra en e-postforespørsel (DEL d), som begge gir
// en `profil`. `foresporselTittel` vises som kontekst når det er en forespørsel.
export default function Pakkebygger({ profil, onLukk, foresporselTittel }: {
  profil: Besoksprofil
  onLukk: () => void
  foresporselTittel?: string
}) {
  const { state, dispatch } = useGame()
  const nivaa = useTemaNivaa('reiseliv')
  const pakke = state.reiselivPakke
  const [valgte, setValgte] = useState<string[]>([])
  const [pris, setPris] = useState(349)
  const toggleKort = (id: string) =>
    setValgte(v => v.includes(id) ? v.filter(x => x !== id) : (v.length < 3 ? [...v, id] : v))
  const sendPakke = () => {
    if (valgte.length !== 3) return
    dispatch({ type: 'SET_REISELIV_PAKKE', profilId: profil.id, kortIds: valgte, pris: nivaa === 'vg2' ? pris : 0 })
  }
  const nyPakke = () => { dispatch({ type: 'SET_REISELIV_PAKKE', profilId: '', kortIds: [], pris: 0 }); setValgte([]) }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 320, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ background: 'rgba(15,23,42,0.98)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '1.4rem', maxWidth: 480, width: '100%', maxHeight: '88vh', overflowY: 'auto', color: '#f1f5f9', padding: '1.25rem 1.5rem 1.6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 900 }}>🎒 Sett sammen en pakke</div>
          <button onClick={onLukk} aria-label="Lukk" style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: 20, cursor: 'pointer' }}>×</button>
        </div>
        <p style={{ fontSize: 12.5, lineHeight: 1.55, color: '#94a3b8', margin: '0 0 0.85rem' }}>
          Et <Fagord id="REIS_001">reiselivsprodukt</Fagord> er en pakke av
          opplevelser satt sammen for en bestemt gjest. Godt <Fagord id="KULT_003">vertskap</Fagord> vil
          si å lese hva <em>disse</em> gjestene faktisk trenger.
        </p>

        {pakke ? (
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
              <div style={{ fontSize: 11, fontWeight: 800, color: '#7dd3fc', letterSpacing: '0.05em', marginBottom: 4 }}>{foresporselTittel ? 'FORESPØRSEL' : 'DAGENS GJESTER'}</div>
              <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 3 }}>{foresporselTittel ?? profil.navn}</div>
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
    </div>
  )
}
