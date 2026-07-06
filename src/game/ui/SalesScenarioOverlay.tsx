import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../GameContext'
import { getScenario } from '../sales/scenarios'
import { productMatchesNeed, findProductByTags, interpolateTokens, buildSalesResult, shuffle } from '../sales/engine'
import type { SalesScenario, SalesStep, SalesChoice, SaleLine, ScoredPick, ChoiceQuality } from '../sales/types'
import type { Product } from '../types'

// ─── SALGSSITUASJON-MOTOR — dialog-overlay ───────────────────────────────────
// Dialogbasert salgs/service-rollespill. Ett steg om gangen: kunde-replikk +
// valgknapper → feedback (✓/⚠/✗) → neste steg → resultatkort. Mild scoring:
// aldri «game over», alltid konstruktivt. Skriver INGENTING til state før
// eleven trykker «Fullfør» (DEL 3). __OVERLAY_OPEN__ styres av GamePage.

const QUALITY_UI: Record<ChoiceQuality, { icon: string; color: string; bg: string }> = {
  good: { icon: '✓', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  warn: { icon: '⚠', color: '#facc15', bg: 'rgba(250,204,21,0.12)' },
  bad:  { icon: '✗', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
}

interface Pending {
  quality: ChoiceQuality
  text: string
  extra?: string
  next?: string
}

export default function SalesScenarioOverlay({ open, onClose, scenarioId }: {
  open: boolean
  onClose: () => void
  scenarioId: string
}) {
  const scenario = getScenario(scenarioId)
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 190,
            background: 'rgba(0,0,0,0.78)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Outfit', sans-serif", padding: '1.5rem',
          }}
          onPointerDown={e => { e.stopPropagation(); if (e.target === e.currentTarget) onClose() }}
          onPointerUp={e => e.stopPropagation()}
        >
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 24 }}
            style={{
              background: 'rgba(10,14,26,0.97)',
              backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '1.75rem', width: '100%', maxWidth: 560,
              maxHeight: 'calc(100vh - 3rem)',
              display: 'flex', flexDirection: 'column',
              color: '#f1f5f9', overflow: 'hidden',
            }}
          >
            {scenario
              ? <SalesRun key={scenario.id} scenario={scenario} onClose={onClose} />
              : <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                  Fant ikke salgsscenarioet «{scenarioId}».
                  <div style={{ marginTop: '1rem' }}>
                    <PrimaryButton onClick={onClose} label="Lukk" />
                  </div>
                </div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Selve gjennomspillingen (fersk state ved hver åpning via key) ─────────────

function SalesRun({ scenario, onClose }: { scenario: SalesScenario; onClose: () => void }) {
  const { state, dispatch } = useGame()

  const [stepId, setStepId] = useState(scenario.steps[0]!.id)
  const [picks, setPicks] = useState<ScoredPick[]>([])
  const [sales, setSales] = useState<SaleLine[]>([])
  const [costs, setCosts] = useState(0)            // DEL 3: kroner ut (omlevering/refusjon)
  const [pending, setPending] = useState<Pending | null>(null)
  const [phase, setPhase] = useState<'dialog' | 'result'>('dialog')

  const step = scenario.steps.find(s => s.id === stepId) ?? scenario.steps[0]!
  const stepIndex = scenario.steps.findIndex(s => s.id === step.id)

  const personaMatch =
    state.targetAudience.psychographics.includes(scenario.personaTag)

  function record(pick: ScoredPick, sale: SaleLine | null, p: Pending) {
    setPicks(prev => [...prev, pick])
    if (sale) setSales(prev => [...prev, sale])
    setPending(p)
  }

  // Vanlig valg (kan bære et valgfritt mersalg via sell-direktivet, eller en
  // kostnad via cost — DEL 3: omlevering/refusjon).
  function chooseFixed(choice: SalesChoice) {
    let sale: SaleLine | null = null
    let extra: string | undefined
    if (choice.sell) {
      const hit = state.products.find(p => productMatchesNeed(p, choice.sell!.needTags))
      if (!hit) extra = '(du fører ingen passende vare — ingen tilleggssalg)'
      else if (hit.stock <= 0) extra = `(${hit.name} er utsolgt — ingen tilleggssalg)`
      else {
        sale = { productId: hit.id, name: hit.name, price: hit.retailPrice, qty: 1, addon: choice.sell.addon }
        extra = `Mersalg: ${hit.name} (${hit.retailPrice.toLocaleString('nb-NO')} kr)`
      }
    }
    if (choice.cost && choice.cost > 0) {
      setCosts(c => c + choice.cost!)
      extra = `Kostnad: −${choice.cost.toLocaleString('nb-NO')} kr (ut av kassa)`
    }
    record({ quality: choice.quality }, sale, { quality: choice.quality, text: choice.feedback, extra, next: choice.next })
  }

  // Anbefal-steget: eleven velger en FAKTISK vare fra sortimentet.
  function chooseProduct(product: Product, hit: boolean) {
    const qty = product.stock > 0 ? 1 : 0
    const sale: SaleLine = { productId: product.id, name: product.name, price: product.retailPrice, qty }
    const text = hit
      ? 'Riktig! Det dekker akkurat behovet kunden hintet om.'
      : 'Et salg, men det traff ikke helt det kunden egentlig var ute etter.'
    const extra = qty === 0
      ? '(varen er dessverre utsolgt — registrert uten salg)'
      : `Solgt: ${product.name} (${product.retailPrice.toLocaleString('nb-NO')} kr)`
    record({ quality: hit ? 'good' : 'warn', behovstreff: hit }, sale, { quality: hit ? 'good' : 'warn', text, extra })
  }

  // «Vi fører dessverre ikke det» — ærlig, men galt hvis du FAKTISK har varen.
  function chooseHonest(hasMatch: boolean) {
    const quality: ChoiceQuality = hasMatch ? 'bad' : 'good'
    const text = hasMatch
      ? 'Du fører faktisk en passende vare — her gikk du glipp av både et salg og en fornøyd kunde.'
      : 'Ærlig og ryddig — bedre å være åpen enn å selge feil vare. Vurder å ta inn en passende vare i sortimentet.'
    record({ quality }, null, { quality, text })
  }

  // kind:'stock-commit' (Storbestillingen, DEL 2) — kvaliteten avhenger av om
  // varens FAKTISKE lager dekker det kunden ber om (commitQty). 'full' = lov
  // alt, 'partial' = ærlig delleveranse, 'no' = takk nei.
  function chooseStockCommit(product: Product | null, mode: 'full' | 'partial' | 'no', commitQty: number) {
    if (!product) {
      record({ quality: 'warn' }, null, {
        quality: 'warn',
        text: 'Du fører ingen passende vare i sortimentet — du må gi beskjed om at bestillingen ikke kan innfris slik den står.',
      })
      return
    }
    const enough = product.stock >= commitQty
    let quality: ChoiceQuality
    let text: string
    let sale: SaleLine | null = null
    let extra: string
    if (mode === 'full') {
      quality = enough ? 'good' : 'bad'
      text = enough
        ? 'Lageret dekker det faktisk — du lover trygt hele bestillingen.'
        : 'Du lover flere enn du faktisk har på lager. Sprekker løftet i morgen, mister du tilliten hos en bedriftskunde.'
      sale = { productId: product.id, name: product.name, price: product.retailPrice, qty: commitQty }
      extra = `Lovet: ${commitQty} stk ${product.name} (lager: ${product.stock} stk)`
    } else if (mode === 'partial') {
      quality = enough ? 'warn' : 'good'
      text = enough
        ? 'Ærlig og trygt, men unødvendig forsiktig — lageret dekket faktisk hele bestillingen.'
        : 'Ærlig og løsningsorientert: du tilbyr det du faktisk har, og resten når det er klart — bedre enn et løfte du ikke kan holde.'
      const qty = Math.min(product.stock, commitQty)
      sale = qty > 0 ? { productId: product.id, name: product.name, price: product.retailPrice, qty } : null
      extra = `Tilbød: ${qty} stk nå (lager: ${product.stock} stk) + resten senere`
    } else {
      quality = enough ? 'bad' : 'warn'
      text = enough
        ? 'Du sier nei til noe lageret faktisk kunne dekket — en unødvendig tapt bestilling.'
        : 'Trygt, men du mister en mulig delvis leveranse — et ærlig tilbud om det du faktisk har hadde vært enda bedre.'
      extra = `Lager: ${product.stock} stk`
    }
    record({ quality }, sale, { quality, text, extra })
  }

  // kind:'margin-discount' (Storbestillingen, DEL 2) — kvaliteten avhenger av
  // varens FAKTISKE margin (retailPrice vs. costPrice), ikke en fast regel.
  function chooseMarginDiscount(product: Product | null, mode: 'discount' | 'no-discount') {
    if (!product) {
      record({ quality: 'warn' }, null, {
        quality: 'warn',
        text: 'Du fører ingen passende vare å vurdere volumrabatt på.',
      })
      return
    }
    const margin = product.retailPrice > 0 ? (product.retailPrice - product.costPrice) / product.retailPrice : 0
    const marginPct = Math.round(margin * 100)
    const healthyMargin = margin >= 0.5
    let quality: ChoiceQuality
    let text: string
    if (mode === 'discount') {
      quality = healthyMargin ? 'good' : 'bad'
      text = healthyMargin
        ? `God margin (${marginPct} %) — en beskjeden volumrabatt er trygt, og kan sikre gjentatte storbestillinger fremover.`
        : `Margin er kun ${marginPct} % — en rabatt her spiser rett inn i overskuddet. Vurder heller å holde på ordinær pris.`
    } else {
      quality = healthyMargin ? 'warn' : 'good'
      text = healthyMargin
        ? `Trygt valg, men med ${marginPct} % margin kunne en liten rabatt vært en smart investering i en fast bedriftskunde.`
        : `Fornuftig — med ${marginPct} % margin ville en rabatt kostet mer enn den smakte.`
    }
    record({ quality }, null, { quality, text, extra: `Margin: ${marginPct} %` })
  }

  function next() {
    const nextId = pending?.next ?? scenario.steps[stepIndex + 1]?.id
    setPending(null)
    if (!nextId) setPhase('result')
    else setStepId(nextId)
  }

  function restart() {
    setStepId(scenario.steps[0]!.id)
    setPicks([]); setSales([]); setCosts(0); setPending(null); setPhase('dialog')
  }

  function finish() {
    const result = buildSalesResult(picks, sales, personaMatch, { costs, outcomeKind: scenario.outcomeKind })
    // DEL 3: skriv til spillstate (salg → økonomi/lager, kostnad, rykte, XP).
    dispatch({
      type: 'RESOLVE_SALES_SCENARIO',
      sales: result.sales,
      cost: result.cost,
      reputationDelta: result.reputationDelta,
      xpEarned: result.xpEarned,
    })
    onClose()
  }

  return (
    <>
      {/* Header — kunde */}
      <div style={{ padding: '1.4rem 1.75rem 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', letterSpacing: '0.1em', marginBottom: 4 }}>
            🛎️ SALGSSITUASJON
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 900, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            {scenario.customerName}
            <span style={{
              fontSize: 11, fontWeight: 700, color: personaMatch ? '#22c55e' : '#94a3b8',
              background: personaMatch ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${personaMatch ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: 99, padding: '2px 9px',
            }}>
              {scenario.personaTag}{personaMatch && ' ✓'}
            </span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: '0.35rem 0 0', lineHeight: 1.5, maxWidth: 420 }}>
            {scenario.description}
          </p>
        </div>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 99, width: 34, height: 34, color: '#94a3b8',
          cursor: 'pointer', fontSize: 17, fontFamily: 'inherit', flexShrink: 0,
        }}>✕</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.75rem 1.75rem' }}>
        {phase === 'dialog'
          ? <DialogView
              scenario={scenario} step={step} stepIndex={stepIndex} pending={pending}
              products={state.products}
              onChooseFixed={chooseFixed} onChooseProduct={chooseProduct}
              onChooseHonest={chooseHonest}
              onChooseStockCommit={chooseStockCommit} onChooseMarginDiscount={chooseMarginDiscount}
              onNext={next}
            />
          : <ResultView
              result={buildSalesResult(picks, sales, personaMatch, { costs, outcomeKind: scenario.outcomeKind })}
              hiddenNeed={scenario.hiddenNeed}
              onFinish={finish} onRestart={restart}
            />}
      </div>
    </>
  )
}

// ── Dialogvisning ─────────────────────────────────────────────────────────────

function DialogView({ scenario, step, stepIndex, pending, products, onChooseFixed, onChooseProduct, onChooseHonest, onChooseStockCommit, onChooseMarginDiscount, onNext }: {
  scenario: SalesScenario
  step: SalesStep
  stepIndex: number
  pending: Pending | null
  products: Product[]
  onChooseFixed: (c: SalesChoice) => void
  onChooseProduct: (p: Product, hit: boolean) => void
  onChooseHonest: (hasMatch: boolean) => void
  onChooseStockCommit: (p: Product | null, mode: 'full' | 'partial' | 'no', commitQty: number) => void
  onChooseMarginDiscount: (p: Product | null, mode: 'discount' | 'no-discount') => void
  onNext: () => void
}) {
  const need = step.recommendNeed ?? []
  const hasMatch = step.kind === 'recommend' && products.some(p => productMatchesNeed(p, need))
  const matchedProduct = (step.kind === 'stock-commit' || step.kind === 'margin-discount')
    ? findProductByTags(products, need) ?? null
    : null

  // Stokk rekkefølgen på de faste valgene per steg (stabil til steget bytter),
  // så det «gode» valget ikke alltid ligger først. Kvalitet + feedback følger
  // valget, ikke posisjonen — scoring er uberørt. Recommend/stock-commit/
  // margin-discount stokkes IKKE (bygges allerede dynamisk).
  const fixedChoices = useMemo(() => shuffle(step.choices ?? []), [step.choices])

  // Token-interpolering ({price:id}/{stock:id}) — samme kilde
  // (state.products) som alt annet leser, så replikkene aldri lyver om
  // elevens faktiske priser/lager.
  const customerLine = interpolateTokens(step.customerLine, products)
  const note = step.note ? interpolateTokens(step.note, products) : undefined
  const pendingText = pending ? interpolateTokens(pending.text, products) : ''

  return (
    <div>
      {/* Stegteller */}
      <div style={{ fontSize: 11, color: '#475569', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
        STEG {stepIndex + 1} AV {scenario.steps.length}
      </div>

      {/* Kunde-replikk */}
      <div style={{
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0 14px 14px 14px', padding: '0.9rem 1.1rem', marginBottom: '0.4rem',
        position: 'relative',
      }}>
        <div style={{ fontSize: 15, color: '#f1f5f9', lineHeight: 1.5 }}>{customerLine}</div>
      </div>
      {note && <div style={{ fontSize: 12, color: '#64748b', fontStyle: 'italic', marginBottom: '1rem' }}>{note}</div>}
      {!note && <div style={{ marginBottom: '1rem' }} />}

      {/* Valg, eller feedback + neste */}
      {!pending ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {step.kind === 'recommend' ? (
            <>
              {products.length === 0 && (
                <div style={{ fontSize: 12, color: '#facc15', marginBottom: 4 }}>
                  Du har ingen varer i sortimentet ennå.
                </div>
              )}
              {products.map(p => {
                const hit = productMatchesNeed(p, need)
                return (
                  <ChoiceButton
                    key={p.id}
                    label={`${p.icon} Anbefal «${p.name}»${p.stock <= 0 ? ' (utsolgt)' : ''}`}
                    onClick={() => onChooseProduct(p, hit)}
                  />
                )
              })}
              <ChoiceButton
                label="«Det fører vi dessverre ikke akkurat nå.»"
                onClick={() => onChooseHonest(hasMatch)}
              />
            </>
          ) : step.kind === 'stock-commit' ? (
            <>
              {matchedProduct ? (
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>
                  📦 Lager akkurat nå: <strong style={{ color: '#f1f5f9' }}>{matchedProduct.stock} stk {matchedProduct.name}</strong>
                </div>
              ) : (
                <div style={{ fontSize: 12, color: '#facc15', marginBottom: 4 }}>
                  Du fører ingen vare som matcher denne bestillingen ennå.
                </div>
              )}
              <ChoiceButton
                label={`Lov alle ${step.commitQty ?? 0} stk`}
                onClick={() => onChooseStockCommit(matchedProduct, 'full', step.commitQty ?? 0)}
              />
              <ChoiceButton
                label={matchedProduct
                  ? `Vær ærlig: tilby ${Math.min(matchedProduct.stock, step.commitQty ?? 0)} stk nå + resten senere`
                  : 'Vær ærlig: tilby det jeg faktisk har + resten senere'}
                onClick={() => onChooseStockCommit(matchedProduct, 'partial', step.commitQty ?? 0)}
              />
              <ChoiceButton
                label="Si nei, vi rekker ikke en så stor bestilling"
                onClick={() => onChooseStockCommit(matchedProduct, 'no', step.commitQty ?? 0)}
              />
            </>
          ) : step.kind === 'margin-discount' ? (
            <>
              {matchedProduct ? (
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>
                  💹 Margin på {matchedProduct.name}: <strong style={{ color: '#f1f5f9' }}>
                    {matchedProduct.retailPrice > 0 ? Math.round(((matchedProduct.retailPrice - matchedProduct.costPrice) / matchedProduct.retailPrice) * 100) : 0} %
                  </strong>
                </div>
              ) : (
                <div style={{ fontSize: 12, color: '#facc15', marginBottom: 4 }}>
                  Du fører ingen vare å vurdere volumrabatt på ennå.
                </div>
              )}
              <ChoiceButton label="Gi en beskjeden volumrabatt" onClick={() => onChooseMarginDiscount(matchedProduct, 'discount')} />
              <ChoiceButton label="Hold på ordinær pris" onClick={() => onChooseMarginDiscount(matchedProduct, 'no-discount')} />
            </>
          ) : (
            fixedChoices.map(c => (
              <ChoiceButton key={c.id} label={interpolateTokens(c.text, products)} onClick={() => onChooseFixed(c)} />
            ))
          )}
        </div>
      ) : (
        <div>
          <div style={{
            background: QUALITY_UI[pending.quality].bg,
            border: `1px solid ${QUALITY_UI[pending.quality].color}55`,
            borderRadius: 12, padding: '0.9rem 1.1rem',
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <span style={{ color: QUALITY_UI[pending.quality].color, fontSize: 18, fontWeight: 900, lineHeight: 1.3 }}>
              {QUALITY_UI[pending.quality].icon}
            </span>
            <div>
              <div style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.5 }}>{pendingText}</div>
              {pending.extra && (
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>{pending.extra}</div>
              )}
            </div>
          </div>
          <div style={{ marginTop: '1rem', textAlign: 'right' }}>
            <PrimaryButton onClick={onNext} label="Neste →" />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Resultatvisning ───────────────────────────────────────────────────────────

function ResultView({ result, hiddenNeed, onFinish, onRestart }: {
  result: ReturnType<typeof buildSalesResult>
  hiddenNeed: string
  onFinish: () => void
  onRestart: () => void
}) {
  const satColor = result.satisfaction >= 70 ? '#22c55e' : result.satisfaction >= 45 ? '#facc15' : '#ef4444'
  const soldLines = result.sales.filter(s => s.qty > 0)
  const repPrimary = result.primaryMetric === 'reputation'
  const repColor = result.reputationDelta >= 0 ? '#38bdf8' : '#ef4444'

  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 1rem' }}>🧾 Oppsummering</h3>

      {/* Tilfredshet */}
      <div style={{ marginBottom: '1.1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
          <span style={{ color: '#94a3b8' }}>Kundetilfredshet</span>
          <span style={{ fontWeight: 800, color: satColor }}>{result.satisfaction}/100</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 99, height: 9, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${result.satisfaction}%`, background: satColor, borderRadius: 99, transition: 'width 0.5s' }} />
        </div>
      </div>

      {/* Nøkkeltall — hovedmetrikken først. Service/klage: RYKTE + kostnad.
          Salg: omsetning + rykte. */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.1rem' }}>
        {repPrimary ? (
          <>
            <StatCard label="Rykte (hovedmål)" value={`${result.reputationDelta >= 0 ? '+' : ''}${result.reputationDelta}`} color={repColor} primary />
            <StatCard label="Kostnad" value={result.cost > 0 ? `−${result.cost.toLocaleString('nb-NO')} kr` : '—'} color={result.cost > 0 ? '#f97316' : '#64748b'} />
            <StatCard label="XP" value={`+${result.xpEarned}`} color="#a855f7" />
          </>
        ) : (
          <>
            <StatCard label="Salg" value={result.revenue > 0 ? `${result.revenue.toLocaleString('nb-NO')} kr` : '—'} color="#22c55e" primary />
            <StatCard label="Rykte" value={`${result.reputationDelta >= 0 ? '+' : ''}${result.reputationDelta}`} color={repColor} />
            <StatCard label="XP" value={`+${result.xpEarned}`} color="#a855f7" />
          </>
        )}
      </div>

      {/* Salgslinjer */}
      {soldLines.length > 0 && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '0.75rem 1rem', marginBottom: '1.1rem' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: '0.05em', marginBottom: 6 }}>SOLGT</div>
          {soldLines.map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '2px 0' }}>
              <span style={{ color: '#cbd5e1' }}>{s.name}{s.addon ? ' (mersalg)' : ''}</span>
              <span style={{ color: '#22c55e' }}>{(s.price * s.qty).toLocaleString('nb-NO')} kr</span>
            </div>
          ))}
        </div>
      )}

      {/* Bonus-merker */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.1rem' }}>
        {result.behovstreff && <Badge color="#22c55e" text="🎯 Traff behovet" />}
        {result.personaMatch && <Badge color="#a855f7" text="👤 Målgruppe-match (+bonus)" />}
      </div>

      {/* Skjult behov + tilbakemelding */}
      <div style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 12, padding: '0.9rem 1.1rem', marginBottom: '0.75rem' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.05em', marginBottom: 4 }}>KUNDENS BEHOV</div>
        <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.5 }}>{hiddenNeed}</div>
      </div>
      <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        💬 {result.summary}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button onClick={onRestart} style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 99, padding: '0.6rem 1.4rem', color: '#cbd5e1',
          fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
        }}>↻ Prøv igjen</button>
        <PrimaryButton onClick={onFinish} label="Fullfør ✓" />
      </div>
    </div>
  )
}

// ── Små UI-byggeklosser ───────────────────────────────────────────────────────

function ChoiceButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      textAlign: 'left', background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12,
      padding: '0.8rem 1rem', color: '#f1f5f9', fontSize: 14,
      cursor: 'pointer', fontFamily: 'inherit', lineHeight: 1.4,
      transition: 'background 0.12s, border-color 0.12s',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(125,211,252,0.1)'; e.currentTarget.style.borderColor = 'rgba(125,211,252,0.5)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
    >
      {label}
    </button>
  )
}

function PrimaryButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none',
      borderRadius: 99, padding: '0.6rem 1.6rem', color: '#fff',
      fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
    }}>{label}</button>
  )
}

function StatCard({ label, value, color, primary }: { label: string; value: string; color: string; primary?: boolean }) {
  return (
    <div style={{
      background: primary ? `${color}12` : 'rgba(255,255,255,0.03)',
      border: `1px solid ${primary ? `${color}55` : 'rgba(255,255,255,0.08)'}`,
      borderRadius: 10, padding: '0.7rem', textAlign: 'center',
    }}>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: primary ? 19 : 17, fontWeight: 800, color }}>{value}</div>
    </div>
  )
}

function Badge({ color, text }: { color: string; text: string }) {
  return (
    <span style={{ fontSize: 12, fontWeight: 700, color, background: `${color}1a`, border: `1px solid ${color}55`, borderRadius: 99, padding: '3px 10px' }}>
      {text}
    </span>
  )
}
