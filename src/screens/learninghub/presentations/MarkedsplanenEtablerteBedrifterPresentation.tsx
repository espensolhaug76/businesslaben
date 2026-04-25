      /**
       * ENT2 · EB2 — Kapittel 21: Markedsplanen for etablerte bedrifter
       * Kilde: master-manus i .manus/.
       */
      import PresentationShell, { Glass, SlideImg, SlideLabel, twoCol, bodyText } from './_lib/PresentationShell'
      import type { ContentSlide } from './_lib/PresentationShell'
      import type { QuizQuestion } from './QuizSlide'

      const SLIDES: ContentSlide[] = [
        ({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 21 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Hensikten med planen
        </h2>
        <p style={bodyText}>
          Koordinering, kommunikasjon av mål og styringsverktøy for ledelsen. For etablerte bedrifter er markedsplanen mindre om å starte og mer om å utvide og optimalisere eksisterende virksomhet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Hensikten med planen" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Innholdet i planen" />
      <div>
        <SlideLabel>Kapittel 21 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Innholdet i planen
        </h2>
        <p style={bodyText}>
          Standard struktur: situasjonsanalyse → mål → strategi → tiltak → budsjett → kontroll. Typisk dokument på 30–80 sider for en mellomstor bedrift, kortere for små.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 21 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Avansert SWOT (TOWS-matrisen)
        </h2>
        <p style={bodyText}>
          Koble faktorene for å finne vinnende strategier: Strengths/Opportunities (offensive strategier), Strengths/Threats (defensive), Weaknesses/Opportunities (forbedringsstrategier), Weaknesses/Threats (overlevelsesstrategier).
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Avansert SWOT (TOWS-matrisen)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="SMART-mål og KPIer" />
      <div>
        <SlideLabel>Kapittel 21 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          SMART-mål og KPIer
        </h2>
        <p style={bodyText}>
          Hvordan måle suksess i sanntid? KPI-dashboards med målbare indikatorer per strategisk område. Eksempel: 'Markedsandel i Trondheim' med ukentlig rapportering. Gir umiddelbar feedback på om strategien virker.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 21 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Markedsmiksen (strategisk)
        </h2>
        <p style={bodyText}>
          Samspillet mellom de 5 P-ene (produkt, pris, plass, promosjon, people) for å nå målene. For etablerte bedrifter er optimalisering — ikke nyutvikling — ofte den raskeste veien til økt lønnsomhet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Markedsmiksen (strategisk)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Ressursallokering" />
      <div>
        <SlideLabel>Kapittel 21 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Ressursallokering
        </h2>
        <p style={bodyText}>
          Prioriter penger og folk der de gir mest effekt. 80/20-regelen: 80 % av resultatene kommer ofte fra 20 % av tiltakene. Identifiser de 20 % og gi dem mer ressurser; reduser eller fjern de minst lønnsomme.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 21 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Årshjul for aktiviteter
        </h2>
        <p style={bodyText}>
          Planlegging av kampanjer og lanseringer gjennom året. Janus-handel, vinterferie, sommerkampanjer, julehandel — hver bransje har sine sykluser. Årshjulet sikrer ressursplanlegging og forhindrer dobbeltbookinger.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Årshjul for aktiviteter" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Oppfølging og revidering" />
      <div>
        <SlideLabel>Kapittel 21 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Oppfølging og revidering
        </h2>
        <p style={bodyText}>
          Markedsplanen er et levende dokument som må justeres ved uforutsette hendelser. Pandemi, valutasvingninger, ny konkurrent — alt krever justering. Månedlig review med kvartalsvis revisjon er vanlig praksis.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 21 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Tine sin årlige markedsplan
        </h2>
        <p style={bodyText}>
          Tine lager årlig markedsplan med konkrete mål per produktkategori (yoghurt, ost, drikke). Følges opp månedlig — og avvik utløser konkrete tiltak. Markedsplanen er styringsverktøy, ikke et akademisk dokument.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Tine sin årlige markedsplan" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 21 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvor mye verdi gir en god plan?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        En god plan øker sjansen for suksess med 50 %. For etablerte bedrifter er ikke planen oppstart-dokument, men styringsverktøy som koordinerer hele organisasjonen mot samme mål.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er TOWS-matrisen?',
  options: [
    'En type kompass',
    'Avansert SWOT som kobler interne og eksterne faktorer for å finne vinnende strategier',
    'Et IT-system',
    'En produksjonsmetode',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva sier 80/20-regelen om ressursallokering?',
  options: [
    '80 % skal gå til ledelse, 20 % til produksjon',
    '80 % av resultatene kommer ofte fra 20 % av tiltakene — gi de viktigste mer ressurser',
    '80 % av tiden brukes på 20 % av kundene',
    '80 % av kundene gir 20 % av omsetningen',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er forskjellen på markedsplan for ny vs. etablert bedrift?',
  options: [
    'Det er ingen forskjell',
    'Etablerte bedrifter fokuserer på optimalisering og utvidelse, ikke oppstart',
    'Etablerte bedrifter trenger ikke plan',
    'Nye bedrifter har lengre plan',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function MarkedsplanenEtablerteBedrifterPresentation() {
        return (
          <PresentationShell
            presentationName="Markedsplanen for etablerte bedrifter"
            subjectLabel="ENT2 · EB2"
            titleLine1="Strategisk"
    titleLine2="markedsplan"
            subtitle="Veikartet for neste periode — TOWS, KPI-er, ressursallokering og årshjul for vekstbedriften."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
