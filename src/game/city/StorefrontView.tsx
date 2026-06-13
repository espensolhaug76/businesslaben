import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../GameContext'
import { getDistrict, getLokale, STOREFRONT_HOTSPOTS, STOREFRONT_DISPLAY_ZONES, spriteForProduct } from '../../data/districts'
import type { Product } from '../types'
import { BackButton } from './DistrictView'
import { IS_DEV_COORDS } from './DevCoordHelper'
import ZoneTracer from './ZoneTracer'

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
  // Re-render når ZoneTracer skriver nye sone-verdier i runtime (?dev=1).
  const [, setZoneRev] = useState(0)
  const district = getDistrict(districtId)
  const lokale = getLokale(districtId, lokaleId)
  const mine = state.rentedLocationId === lokaleId

  // VINDUSLOGIKK: kun utstillingsegnede produkter (windowDisplay ≠ false)
  // vises i vinduet. Hovedproduktet (mainProductId) får disk-flaten, størst
  // og fremst — via plakat-stedfortreder hvis det ikke er utstillingsegnet
  // (f.eks. kaffe i pappkopp). Maks 3 typer som før; resten + ikke-egnede
  // teller i «+N i butikken».
  const mainProduct = state.products.find(p => p.id === state.mainProductId) ?? null
  const displayable = state.products.filter(p => p.windowDisplay !== false)
  const support = displayable
    .filter(p => p.id !== mainProduct?.id)
    .sort((a, b) => (b.stock > 0 ? 1 : 0) - (a.stock > 0 ? 1 : 0))
  const diskProduct = mainProduct ?? support[0] ?? null
  const shelfProducts = support.filter(p => p.id !== diskProduct?.id).slice(0, 2)
  const shownCount = (diskProduct ? 1 : 0) + shelfProducts.length
  const extraCount = Math.max(0, state.products.length - shownCount)

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
              fontSize: 'min(2.9vh, 2.5vw)', letterSpacing: '0.12em',
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
          {mine && extraCount > 0 && (
            <span style={{
              position: 'absolute', right: '4%', bottom: '5%',
              background: 'rgba(10,14,26,0.75)', color: '#f1f5f9', borderRadius: 99,
              fontSize: 11, fontWeight: 800, padding: '1px 7px',
            }}>+{extraCount} i butikken</span>
          )}
        </div>

        {/* Utstillingsflater: disk (sone 0) = hovedprodukt/beste produkt,
            hyllene (sone 1–2) = støtteprodukter. Tom utstilling (ingen
            egnede produkter, intet hovedprodukt) rendrer ingenting. */}
        {mine && STOREFRONT_DISPLAY_ZONES.map((zone, zi) => {
          const product = zi === 0 ? diskProduct : shelfProducts[zi - 1]
          if (!product) return null
          const [zx, zy, zw, zh] = zone.rect
          const isMain = product.id === mainProduct?.id
          const placard = isMain && product.windowDisplay === false
          return (
            <div key={zone.id} style={{
              position: 'absolute', left: `${zx}%`, top: `${zy}%`, width: `${zw}%`, height: `${zh}%`,
              pointerEvents: 'none',
            }}>
              {placard
                ? <MainProductPlacard product={product} />
                : <DisplayUnits product={product} size={zone.size * (isMain ? 1.3 : 1)} zoneW={zw} />}
            </div>
          )
        })}

        {/* ?dev=1: SONE-TRACING — dra rektangler, «Bruk» skriver sonene
            live (ZoneTracer tegner også alle eksisterende soner) */}
        {IS_DEV_COORDS && <ZoneTracer onApply={() => setZoneRev(r => r + 1)} />}

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

        {/* (koordinatkrysset er erstattet av ZoneTracer over) */}
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

// Enhetsbredde i % av FASADEN: 3,4 % × dybde × spriteskala. Med det
// trace-te vinduet på 28,9 % av fasaden gir det maks ≈ 4,1 % fasade
// ≈ 14 % av vindusbredden (under 15 %-taket).
const UNIT_FACADE_W = 3.4

/** Stedfortreder på disken når hovedproduktet ikke er utstillingsegnet
 *  (VINDUSLOGIKK pkt. 6): enkel stående plakat med produktets emoji. */
function MainProductPlacard({ product }: { product: Product }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      <div style={{
        background: '#f7f1e2', border: '2px solid #b0a080',
        borderBottom: '4px solid #8a7a5c', // antydet plakatfot
        borderRadius: 5, transform: 'rotate(-2deg)',
        padding: '3px 9px 4px', textAlign: 'center',
        boxShadow: '0 3px 6px rgba(0,0,0,0.35)',
        fontFamily: "'Outfit', sans-serif", lineHeight: 1.15,
      }}>
        <div style={{ fontSize: 'min(22px, 2.2vh)' }}>{product.icon}</div>
        <div style={{ fontSize: 'min(9px, 1vh)', fontWeight: 800, color: '#7a5a30', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          {product.name}
        </div>
      </div>
    </div>
  )
}

function DisplayUnits({ product, size, zoneW }: { product: Product; size: number; zoneW: number }) {
  const sprite = spriteForProduct(product.name)
  const units = unitsFor(product)
  const soldOut = product.stock <= 0
  // Bredde i % av SONEN (sonene er fasade-%): enheter bunnjustert mot
  // flatekanten = sonens bunn. Gruppe-tilpasning: på smale flater klemmes
  // enhetsbredden så HELE gruppen (med 18 % overlapp) får plass i sonen.
  const idealW = (UNIT_FACADE_W * size * (sprite?.scale ?? 1)) / zoneW * 100
  const groupFactor = units - (units - 1) * 0.18 // effektive bredder i gruppa
  const unitW = Math.min(idealW, 100 / Math.max(1, groupFactor))

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
