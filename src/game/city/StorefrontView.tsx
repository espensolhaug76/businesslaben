import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../GameContext'
import { getDistrict, getLokale, STOREFRONT_HOTSPOTS, STOREFRONT_DISPLAY_ZONES, spriteForProduct } from '../../data/districts'
import type { Product } from '../types'
import { BackButton } from './DistrictView'
import DevCoordHelper, { IS_DEV_COORDS } from './DevCoordHelper'

// ── StorefrontView (STOREFRONT-NIVÅ) — fasadescene med 4P-hotspots ───────────
// Fasadebildet (storefront_pilot.png, 1024×1280 per STOREFRONT_SPEC v1.2)
// sentreres mot en himmel-gradient. Tre hotspots med hover-glow + tooltip:
//   SKILT → Markedsføring   VINDU → Sortiment   DØR → Drift
// — alle åpner eksisterende DashboardOverlay-faner via onOpenPanel (GamePage
// eier overlayet og __OVERLAY_OPEN__-disiplinen). Elevens preg: bedriftsnavn
// på skiltpanelet + produktikoner i vinduet, fra spillstate. Ikke leid ⇒
// gråtonet fasade med TIL LEIE-plakat og deaktiverte hotspots.

const FACADE_IMG = '/assets/city/storefront_pilot.png'
const ASPECT = 1024 / 1280

export type PanelTab = 'markedsforing' | 'produkter' | 'oversikt'

const HOTSPOTS: { id: keyof typeof STOREFRONT_HOTSPOTS; label: string; tab: PanelTab }[] = [
  { id: 'skilt', label: 'Markedsføring', tab: 'markedsforing' },
  { id: 'vindu', label: 'Sortiment', tab: 'produkter' },
  { id: 'dor', label: 'Drift', tab: 'oversikt' },
]

export default function StorefrontView({
  districtId,
  lokaleId,
  onOpenPanel,
}: {
  districtId: string
  lokaleId: string
  onOpenPanel: (tab: PanelTab) => void
}) {
  const navigate = useNavigate()
  const { state } = useGame()
  const [hover, setHover] = useState<string | null>(null)
  const [imgFailed, setImgFailed] = useState(false)
  const district = getDistrict(districtId)
  const lokale = getLokale(districtId, lokaleId)
  const mine = state.rentedLocationId === lokaleId

  // Vindus-miniatyrer: inntil 3 produkter fra elevens sortiment — de med
  // lager først, så resten.
  const windowProducts = [...state.products]
    .sort((a, b) => (b.stock > 0 ? 1 : 0) - (a.stock > 0 ? 1 : 0))
    .slice(0, 3)

  return (
    <div style={{
      position: 'absolute', inset: 0, fontFamily: "'Outfit', sans-serif",
      // Himmel-gradient bak fasaden (lett, per oppgaven)
      background: 'linear-gradient(180deg, #aac8e0 0%, #cfe0ec 55%, #b8b4a8 92%, #8a867c 100%)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Navigasjon */}
      <div style={{ position: 'fixed', top: 64, left: 20, zIndex: 80, display: 'flex', gap: 8 }}>
        <BackButton onClick={() => navigate(`/game/d/${districtId}`)} label={`← ${district?.navn ?? 'Bydel'}`} />
        <BackButton onClick={() => navigate('/game')} label="Bykartet" />
      </div>

      {/* Fasade-stage: bottom-center, 4:5 */}
      <div style={{
        position: 'relative',
        height: 'min(94vh, calc(100vw * 1.25))',
        aspectRatio: `${ASPECT}`,
        filter: mine ? undefined : 'grayscale(0.85) brightness(0.92)',
        transition: 'filter 0.3s',
      }}>
        {!imgFailed ? (
          <img
            src={FACADE_IMG}
            alt="Butikkfasade"
            draggable={false}
            onError={() => setImgFailed(true)}
            style={{ width: '100%', height: '100%', display: 'block', userSelect: 'none' }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 8,
            background: 'linear-gradient(180deg, #3a4656 0%, #46546a 55%, #2e3744 100%)',
            border: '1px dashed rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '0 2rem',
          }}>
            Fasadebilde mangler<br />(/assets/city/storefront_pilot.png)
          </div>
        )}

        {/* SKILT: elevens bedriftsnavn på det blanke panelet */}
        {mine && (
          <div style={{
            position: 'absolute',
            left: `${STOREFRONT_HOTSPOTS.skilt[0]}%`, top: `${STOREFRONT_HOTSPOTS.skilt[1]}%`,
            width: `${STOREFRONT_HOTSPOTS.skilt[2]}%`, height: `${STOREFRONT_HOTSPOTS.skilt[3]}%`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 800,
              fontSize: 'min(3.6vh, 3.2vw)', letterSpacing: '0.12em',
              color: '#2e2a24', textShadow: '0 1px 0 rgba(255,255,255,0.35)',
              whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '100%',
              textOverflow: 'ellipsis', textTransform: 'uppercase',
            }}>
              {state.companyName}
            </span>
          </div>
        )}

        {/* VINDU (VINDUSHUD): fotorealistisk interiør bak glasset.
            Ikke leid ⇒ interiøret mørkt (tom butikk i et levende bygg). */}
        <div style={{
          position: 'absolute',
          left: `${STOREFRONT_HOTSPOTS.vindu[0]}%`, top: `${STOREFRONT_HOTSPOTS.vindu[1]}%`,
          width: `${STOREFRONT_HOTSPOTS.vindu[2]}%`, height: `${STOREFRONT_HOTSPOTS.vindu[3]}%`,
          pointerEvents: 'none', overflow: 'hidden',
        }}>
          <img
            src="/assets/city/storefront_interior_bakery.png"
            alt=""
            draggable={false}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center bottom',
              filter: mine ? undefined : 'brightness(0.4)',
              transition: 'filter 0.3s',
            }}
          />
          {/* Svak diagonal glass-gradient — leser som GJENNOM vindu uten å
              overdøve gatespeilingen som ligger i selve bildet */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(115deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0) 38%, rgba(255,255,255,0.08) 62%, rgba(255,255,255,0) 100%)',
          }} />
          {!mine && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                background: '#e8ddc8', border: '3px solid #b0a080', borderRadius: 6,
                padding: '6% 10%', transform: 'rotate(-3deg)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                color: '#7a3020', fontWeight: 800, fontSize: 'min(3vh, 2.6vw)',
                letterSpacing: '0.1em', textAlign: 'center',
              }}>
                TIL LEIE
              </div>
            </div>
          )}
          {mine && Math.max(0, state.products.length - windowProducts.length) > 0 && (
            <span style={{
              position: 'absolute', right: '4%', bottom: '5%',
              background: 'rgba(10,14,26,0.75)', color: '#f1f5f9', borderRadius: 99,
              fontSize: 11, fontWeight: 800, padding: '1px 7px',
            }}>+{state.products.length - windowProducts.length}</span>
          )}
        </div>

        {/* Utstillingsflater: sprites står på de fotograferte flatene
            (disk / bakvegg / venstre hylle) — fasade-koordinater, ?dev=1 */}
        {mine && STOREFRONT_DISPLAY_ZONES.map((zone, zi) => {
          const product = windowProducts[zi]
          if (!product) return null
          const [zx, zy, zw, zh] = zone.rect
          return (
            <div key={zone.id} style={{
              position: 'absolute', left: `${zx}%`, top: `${zy}%`, width: `${zw}%`, height: `${zh}%`,
              pointerEvents: 'none',
            }}>
              <DisplayUnits product={product} size={zone.size} zoneW={zw} />
            </div>
          )
        })}

        {/* ?dev=1: synlige soner — hotspots (cyan) + utstillingsflater
            (oransje, med flatekanten markert) for kalibrering */}
        {IS_DEV_COORDS && (
          <>
            {Object.entries(STOREFRONT_HOTSPOTS).map(([id, [x, y, w, h]]) => (
              <div key={id} style={{
                position: 'absolute', left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`,
                border: '1px dashed rgba(80,220,255,0.9)', pointerEvents: 'none', zIndex: 49,
              }}>
                <span style={{ position: 'absolute', left: 2, top: 0, fontSize: 10, fontFamily: 'monospace', color: '#50dcff', background: 'rgba(0,0,0,0.6)', padding: '0 3px' }}>{id}</span>
              </div>
            ))}
            {STOREFRONT_DISPLAY_ZONES.map(z => (
              <div key={z.id} style={{
                position: 'absolute', left: `${z.rect[0]}%`, top: `${z.rect[1]}%`,
                width: `${z.rect[2]}%`, height: `${z.rect[3]}%`,
                border: '1px solid rgba(255,160,60,0.9)',
                borderBottom: '2px solid rgba(255,160,60,1)', // flatekanten
                pointerEvents: 'none', zIndex: 49,
              }}>
                <span style={{ position: 'absolute', left: 2, top: -14, fontSize: 10, fontFamily: 'monospace', color: '#ffa03c', background: 'rgba(0,0,0,0.6)', padding: '0 3px' }}>{z.id}</span>
              </div>
            ))}
          </>
        )}

        {/* Hotspots (kun eget lokale) */}
        {mine && HOTSPOTS.map(h => {
          const [x, y, w, hh] = STOREFRONT_HOTSPOTS[h.id]
          const active = hover === h.id
          return (
            <div
              key={h.id}
              onClick={() => onOpenPanel(h.tab)}
              onMouseEnter={() => setHover(h.id)}
              onMouseLeave={() => setHover(cur => (cur === h.id ? null : cur))}
              style={{
                position: 'absolute', left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${hh}%`,
                cursor: 'pointer', borderRadius: 10,
                background: active ? 'rgba(125,211,252,0.16)' : 'transparent',
                outline: active ? '2px solid rgba(125,211,252,0.85)' : '2px solid transparent',
                boxShadow: active ? '0 0 24px rgba(125,211,252,0.45)' : 'none',
                transition: 'background 0.15s, outline 0.15s, box-shadow 0.15s',
              }}
            >
              {active && (
                <span style={{
                  position: 'absolute', left: '50%', top: -10,
                  transform: 'translate(-50%, -100%)',
                  background: 'rgba(10,14,26,0.92)', border: '1px solid rgba(125,211,252,0.5)',
                  borderRadius: 8, padding: '0.3rem 0.8rem',
                  color: '#f1f5f9', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap',
                }}>
                  {h.label}
                </span>
              )}
            </div>
          )
        })}

        {/* ?dev=1: koordinatkryss for hotspot-kalibrering (prosent av fasaden) */}
        {IS_DEV_COORDS && <DevCoordHelper />}
      </div>

      {/* (vindusutstillingen er definert i WindowDisplay nederst i fila) */}
      {/* Tittellinje nederst */}
      <div style={{
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 12, padding: '0.4rem 1rem', color: '#f1f5f9', zIndex: 80,
        fontSize: 13, whiteSpace: 'nowrap',
      }}>
        {mine ? `🏪 ${state.companyName}` : lokale?.navn ?? 'Lokale'} · {district?.navn}
        {!mine && <span style={{ color: '#facc15', fontWeight: 700 }}> · Ikke leid</span>}
      </div>
    </div>
  )
}

// ── Vindusutstilling (VINDUSHUD) — sprites på fotograferte flater ────────────
// Lager-barometer-logikken er UENDRET fra forrige runde: antall enheter
// speiler stock/maxDemandPerMonth, tomt lager gir grå enhet + Utsolgt-lapp.
// Kun presentasjonen er byttet: PNG-sprites (PRODUCT_SPRITES) bunnjustert
// mot interiørets flater; produkter uten sprite faller tilbake til emoji.

/** Enheter i utstillingen: lager relativt til maxDemandPerMonth. */
function unitsFor(p: Product): number {
  if (p.stock <= 0) return 0
  const r = p.stock / Math.max(1, p.maxDemandPerMonth)
  if (r >= 0.75) return 4
  if (r >= 0.4) return 3
  if (r >= 0.15) return 2
  return 1
}

// Enhetsbredde i % av FASADEN: 4,0 % × dybde × spriteskala. Med vindu på
// 33 % av fasaden gir det maks ≈ 4,8 % fasade ≈ 14,5 % av vindusbredden.
const UNIT_FACADE_W = 4.0

function DisplayUnits({ product, size, zoneW }: { product: Product; size: number; zoneW: number }) {
  const sprite = spriteForProduct(product.name)
  const units = unitsFor(product)
  const soldOut = product.stock <= 0
  // Bredde i % av SONEN (sonene er fasade-%): enheter bunnjustert mot
  // flatekanten = sonens bunn.
  const unitW = (UNIT_FACADE_W * size * (sprite?.scale ?? 1)) / zoneW * 100

  const unit = (k: number, gray: boolean) => sprite ? (
    <img
      key={k}
      src={sprite.file}
      alt=""
      title={product.name}
      draggable={false}
      style={{
        width: `${unitW.toFixed(1)}%`, height: 'auto', maxWidth: 'none',
        filter: `${gray ? 'grayscale(1) ' : ''}drop-shadow(0 2px 2px rgba(0,0,0,0.35))`,
        opacity: gray ? 0.4 : 1,
        marginLeft: k > 0 ? `-${(unitW * 0.18).toFixed(1)}%` : 0, // lett overlapp
        userSelect: 'none',
      }}
    />
  ) : (
    <span key={k} title={product.name} style={{
      fontSize: `min(${Math.round(30 * size)}px, ${(3 * size).toFixed(1)}vh)`, lineHeight: 1,
      filter: `${gray ? 'grayscale(1) ' : ''}drop-shadow(0 2px 2px rgba(0,0,0,0.3))`,
      opacity: gray ? 0.4 : 1,
      marginLeft: k > 0 ? '-0.3em' : 0,
    }}>{product.icon}</span>
  )

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      {soldOut ? unit(0, true) : Array.from({ length: units }, (_, k) => unit(k, false))}
      {soldOut && (
        // Utsolgt-lappen er festet til FLATEN (sonens hjørne), ikke fritt
        // til spriten.
        <span style={{
          position: 'absolute', right: 0, top: '-55%', transform: 'rotate(5deg)',
          background: '#f4ecd8', border: '1px solid #b0a080', borderRadius: 3,
          color: '#7a3020', fontSize: 9, fontWeight: 800, padding: '0 4px',
          whiteSpace: 'nowrap', boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
        }}>Utsolgt</span>
      )}
    </div>
  )
}
