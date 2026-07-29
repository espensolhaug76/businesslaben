import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame, useAktiveTemaer } from '../GameContext'
import { useDevPanel } from '../dev/devPanel'
import { getDistrict, KUNDESKALA, KUNDESTIER, LOKALER, NO_GO, STASJON_REISELIV_HOTSPOTS, lokaleRent, type District, type Lokale } from '../../data/districts'
import CustomerFlow from './CustomerFlow'
import DevCoordHelper, { IS_DEV_COORDS } from './DevCoordHelper'
import ZoneTracer, { type Target, type DrawZone } from './ZoneTracer'
import { useReducedMotion } from './anim'
import './cityAnim.css'

// ── DistrictView — bydelsnivået ───────────────────────────────────────────────
// Bydelsbildet fyller skjermen på en aspekt-låst stage (cover, uten pan/zoom —
// nivået er statisk). Lokale-hotspots er usynlige klikkflater over
// butikkfrontene; ledige lokaler får en diskret «TIL LEIE»-badge som
// HTML-overlay (aldri tekst i selve bildet), eget lokale får logo-badge.
// Bydeler uten bilde får «kommer snart»-skjerm med bydelsdataene, slik at
// navigasjonsarkitekturen er komplett for alle 8.

const ASPECT = 1408 / 768

export interface LokaleClick {
  district: District
  lokale: Lokale
  rent: number
}

export default function DistrictView({
  districtId,
  onVacantClick,
}: {
  districtId: string
  onVacantClick: (info: LokaleClick) => void
}) {
  const navigate = useNavigate()
  const { state } = useGame()
  // Sone-/rute-tracer vises kun når dev-panelet slår kalibrering PÅ.
  const visKal = useDevPanel().kalibrering && IS_DEV_COORDS
  const aktiveTemaer = useAktiveTemaer()
  const district = getDistrict(districtId)
  const reduced = useReducedMotion()
  // Zoom-overgang inn mot eget lokale før navigasjon til StorefrontView.
  const [zoomOrigin, setZoomOrigin] = useState<[number, number] | null>(null)
  // Turistkontoret + byhotellet er nå ROM-scener (naviger inn), ikke paneler.
  const [, setRev] = useState(0)   // re-render når sone-traceren skriver (?dev=1)
  // Mentor: scene-orientering ved første besøk i en bydel (fyres én gang).
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('mentor:signal', { detail: { id: 'forste_bydel', scene: 'bydel' } }))
  }, [])

  if (!district) {
    return (
      <Centered>
        <h2 style={{ margin: 0 }}>Ukjent bydel</h2>
        <BackButton onClick={() => navigate('/game')} label="← Tilbake til bykartet" />
      </Centered>
    )
  }

  if (!district.image) {
    return (
      <Centered>
        <div style={{ fontSize: 44, marginBottom: 8 }}>🏗️</div>
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>{district.navn}</h2>
        <p style={{ color: '#94a3b8', maxWidth: 440, lineHeight: 1.6 }}>{district.beskrivelse}</p>
        <div style={{ display: 'flex', gap: '0.75rem', margin: '0.5rem 0 1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Chip label={`Leienivå ${district.leieniva.toLocaleString('nb-NO')} kr/mnd`} />
          <Chip label={`Trafikk: ${district.trafikk}`} />
        </div>
        <p style={{ color: '#64748b', fontSize: 13, maxWidth: 440 }}>{district.maalgruppe}</p>
        <p style={{ color: '#facc15', fontWeight: 700, fontSize: 14 }}>Bydelsbilde kommer snart</p>
        <BackButton onClick={() => navigate('/game')} label="← Tilbake til bykartet" />
      </Centered>
    )
  }

  const lokaler = LOKALER[district.id] ?? []

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#16221a' }}>
      <div style={{
        position: 'absolute', inset: 0,
        transform: zoomOrigin ? 'scale(2.3)' : 'scale(1)',
        transformOrigin: zoomOrigin ? `${zoomOrigin[0]}% ${zoomOrigin[1]}%` : '50% 50%',
        transition: zoomOrigin ? 'transform 0.45s ease-in' : 'none',
      }}>
      <CoverStage image={district.image}>
        {/* LEVENDE BY DEL 3: kundestrøm langs gågata, koblet til spillstate */}
        <CustomerFlow district={district} />
        {/* ?dev=1: på stasjonsbydelen brukes RECT-traceren (ZoneTracer, dra en
            boks) for turistkontor/byhotell — rute-traceren (DevCoordHelper) gir
            bare polyline-punkter og kan ikke definere et [x,y,b,h]-rekt. Dra
            boks over bygget → «Bruk siste på: turistkontor / byhotell» skriver
            den inn live og logger verdien for innliming i districts.ts. Andre
            bydeler beholder rute-traceren (stier/no-go/kalibrering). */}
        {visKal && district.id === 'stasjonsomradet' && (
          <ZoneTracer
            onApply={() => setRev(r => r + 1)}
            targets={[
              { id: 'turistkontor', label: 'turistkontor', get: () => STASJON_REISELIV_HOTSPOTS.turistkontor, set: (r: [number, number, number, number]) => { STASJON_REISELIV_HOTSPOTS.turistkontor = r } },
              { id: 'byhotell', label: 'byhotell', get: () => STASJON_REISELIV_HOTSPOTS.byhotell, set: (r: [number, number, number, number]) => { STASJON_REISELIV_HOTSPOTS.byhotell = r } },
            ] satisfies Target[]}
            drawZones={[
              { rect: STASJON_REISELIV_HOTSPOTS.turistkontor, color: '#ffd24a', label: 'turistkontor', dashed: true },
              { rect: STASJON_REISELIV_HOTSPOTS.byhotell, color: '#50dcff', label: 'byhotell', dashed: true },
            ] satisfies DrawZone[]}
          />
        )}
        {visKal && district.id !== 'stasjonsomradet' && (
          <DevCoordHelper
            paths={KUNDESTIER[district.id]}
            zones={NO_GO[district.id]}
            skala={KUNDESKALA[district.id]}
          />
        )}
        {/* Spor C: Byhotellets lobby nås nå via den TRACEDE byhotell-hotspoten
            under (klikk → /hotell-lobby) — dev-stedfortrederknappen er fjernet. */}
        {lokaler.map(l => {
          const [x, y, w, h] = l.rect
          const mine = state.rentedLocationId === l.id
          // Etablering ikke åpnet i bydelen → skjul ledige lokaler helt (skilt +
          // leie-klikk). Eget lokale vises alltid (om man alt har et her).
          if (!mine && district.visLedigeLokaler === false) return null
          // ÆRLIG LOKALE-STATUS (DEL 3): kun fullt utstyrte lokaler (l.ledig) er
          // klikkbare og «Ledig». Resten vises som «Ikke ledig» (grå, ikke klikk).
          const leibar = !!l.ledig
          const klikkbar = mine || leibar
          return (
            <div key={l.id}>
              {/* Usynlig klikkflate over butikkfronten — kun aktiv for klikkbare lokaler */}
              <div
                onClick={() => {
                  if (mine) {
                    // Zoom-overgang mot lokalets senter, så navigasjon.
                    setZoomOrigin([x + w / 2, y + h / 2])
                    window.setTimeout(() => navigate(`/game/d/${district.id}/l/${l.id}`), 450)
                  } else if (leibar) {
                    onVacantClick({ district, lokale: l, rent: lokaleRent(district, l) })
                  }
                  // ellers: «Ikke ledig» — ingen handling.
                }}
                title={mine ? l.navn : leibar ? `${l.navn} — Ledig` : `${l.navn} — Ikke ledig ennå`}
                style={{
                  position: 'absolute', left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`,
                  cursor: klikkbar ? 'pointer' : 'not-allowed', borderRadius: 6,
                  zIndex: 3,
                  outline: '1px solid rgba(255,255,255,0)', transition: 'outline 0.15s, background 0.15s',
                }}
                onMouseEnter={e => { if (klikkbar) { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.10)'; (e.currentTarget as HTMLDivElement).style.outline = '1px solid rgba(255,255,255,0.5)' } }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.outline = '1px solid rgba(255,255,255,0)' }}
              />
              {/* Badge: eget lokale / TIL LEIE (ledig) / Ikke ledig */}
              <div style={{
                position: 'absolute', left: `${x + w / 2}%`, top: `${y + h}%`,
                transform: 'translate(-50%, -50%)', pointerEvents: 'none',
                fontFamily: "'Outfit', sans-serif",
              }}>
                {mine ? (
                  <span style={{
                    background: 'rgba(13,148,136,0.92)', color: '#fff', borderRadius: 99,
                    padding: '0.2rem 0.6rem', fontSize: 11, fontWeight: 800,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)', whiteSpace: 'nowrap',
                  }}>🏪 {state.companyName}</span>
                ) : leibar ? (
                  <span className={reduced ? undefined : 'badge-sway'} style={{
                    display: 'inline-block',
                    background: 'rgba(212,160,86,0.92)', color: '#3a2a10', borderRadius: 4,
                    padding: '0.12rem 0.45rem', fontSize: 10, fontWeight: 800, letterSpacing: 0.5,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.35)', whiteSpace: 'nowrap',
                  }}>TIL LEIE</span>
                ) : (
                  <span style={{
                    display: 'inline-block',
                    background: 'rgba(30,41,59,0.85)', color: '#94a3b8', borderRadius: 4,
                    padding: '0.12rem 0.45rem', fontSize: 10, fontWeight: 700, letterSpacing: 0.3,
                    border: '1px solid rgba(148,163,184,0.3)', whiteSpace: 'nowrap',
                  }}>Ikke ledig</span>
                )}
              </div>
            </div>
          )
        })}

        {/* TEMA 15 REISELIV — turistkontor + byhotell (stasjonsbydel). Vises når
            reiseliv er aktivt ELLER i ?dev=1 (så labelene/hotspotene kan
            valideres/traces uten at læreren har slått på temaet). */}
        {district.id === 'stasjonsomradet' && (aktiveTemaer['reiseliv']?.aktiv || IS_DEV_COORDS) && (
          <>
            {(['turistkontor', 'byhotell'] as const).map(key => {
              const [x, y, w, h] = STASJON_REISELIV_HOTSPOTS[key]
              const erKontor = key === 'turistkontor'
              return (
                <div key={key}>
                  <div
                    onClick={() => navigate(`/game/d/${district.id}/${erKontor ? 'turistkontor' : 'hotell-lobby'}`)}
                    title={erKontor ? 'Turistkontoret' : 'Byhotellet'}
                    style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`, cursor: 'pointer', borderRadius: 6, zIndex: 3, outline: '1px solid rgba(56,189,248,0)', transition: 'outline 0.15s, background 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(56,189,248,0.12)'; (e.currentTarget as HTMLDivElement).style.outline = '1px solid rgba(56,189,248,0.6)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.outline = '1px solid rgba(56,189,248,0)' }}
                  />
                  {/* Label over recten (samme mønster som TIL LEIE-skiltene) */}
                  <div style={{ position: 'absolute', left: `${x + w / 2}%`, top: `${y}%`, transform: 'translate(-50%, -120%)', pointerEvents: 'none', fontFamily: "'Outfit', sans-serif" }}>
                    <span className={reduced ? undefined : 'badge-sway'} style={{ display: 'inline-block', background: 'rgba(14,165,233,0.92)', color: '#fff', borderRadius: 4, padding: '0.12rem 0.5rem', fontSize: 10, fontWeight: 800, letterSpacing: 0.5, boxShadow: '0 2px 6px rgba(0,0,0,0.35)', whiteSpace: 'nowrap' }}>
                      {erKontor ? '🧳 Turistkontoret' : (state.hotellavtale === 'akseptert' ? '🏨 Byhotellet ✓' : '🏨 Byhotellet')}
                    </span>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </CoverStage>
      </div>

      {/* Bydels-header + tilbake */}
      <div style={{
        position: 'fixed', top: 64, left: 20, zIndex: 80,
        fontFamily: "'Outfit', sans-serif", display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start',
      }}>
        <BackButton onClick={() => navigate('/game')} label="← Bykartet" />
        <div style={{
          background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 12, padding: '0.5rem 0.9rem', color: '#f1f5f9',
        }}>
          <div style={{ fontWeight: 800 }}>{district.navn}</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Leienivå {district.leieniva.toLocaleString('nb-NO')} kr/mnd · {district.trafikk} trafikk</div>
        </div>
      </div>

    </div>
  )
}

// TEMA 15: byhotell-status-panelet er FJERNET — byhotell-hotspoten navigerer nå
// INN i Spor C-lobbyen (/hotell-lobby). Hotellavtalen (gjestepakke) besvares
// fortsatt via innbokshendelsen. Hotell-scenariene (Kulturmøtet/Tax-free) ligger
// i data (velgByhotellScenario) men uten egen inngang her — lobbyen er B2B-arenaen.

// ── Felles småkomponenter ─────────────────────────────────────────────────────

/** Stage med bildets aspekt som dekker viewporten (cover) — overlay-barna får
 *  prosentkoordinater som treffer bildet eksakt. */
export function CoverStage({ image, children }: { image: string; children?: React.ReactNode }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: `max(100vw, calc(100vh * ${ASPECT}))`,
        height: `max(100vh, calc(100vw / ${ASPECT}))`,
      }}>
        <img src={image} alt="" draggable={false} style={{ width: '100%', height: '100%', display: 'block', userSelect: 'none' }} />
        {children}
      </div>
    </div>
  )
}

export function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} style={{
      background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: 99, padding: '0.5rem 1.1rem', color: '#f1f5f9',
      fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
    }}>{label}</button>
  )
}

function Chip({ label }: { label: string }) {
  return (
    <span style={{
      background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)',
      borderRadius: 99, padding: '0.3rem 0.8rem', fontSize: 12, fontWeight: 700, color: '#7dd3fc',
    }}>{label}</span>
  )
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      color: '#f1f5f9', fontFamily: "'Outfit', sans-serif",
      background: 'radial-gradient(circle at 50% 30%, #1c2a38, #0a0e1a)', gap: 6, padding: '0 1.5rem',
    }}>{children}</div>
  )
}
