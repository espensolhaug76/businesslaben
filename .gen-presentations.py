#!/usr/bin/env python3
"""Generate presentation .tsx files using PresentationShell.

Each presentation: 10 slides + 3 quizzes + alternating layout.
Now generating ML2 batch (17 presentations).
"""
from pathlib import Path
from textwrap import dedent

ROOT = Path(__file__).parent / "src/screens/learninghub/presentations"

IMAGES = [
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
]


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")


def slide_jsx(idx: int, label: str, title: str, body: str, image_url: str) -> str:
    layout_left_img = idx % 2 == 1
    img = f"<SlideImg src=\"{image_url}\" alt=\"{esc(title)}\" />"
    text_block = (
        f"        <div>\n"
        f"          <SlideLabel>{label}</SlideLabel>\n"
        f"          <h2 style={{{{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}}}>\n"
        f"            {title}\n"
        f"          </h2>\n"
        f"          <p style={{bodyText}}>\n"
        f"            {body}\n"
        f"          </p>\n"
        f"        </div>"
    )
    if layout_left_img:
        inner = f"        {img}\n{text_block}"
    else:
        inner = f"{text_block}\n        {img}"
    return (
        f"  ({{ show: _show }}) => (\n"
        f"    <Glass>\n"
        f"      <div style={{twoCol}}>\n"
        f"{inner}\n"
        f"      </div>\n"
        f"    </Glass>\n"
        f"  ),"
    )


def summary_slide_jsx(label: str, title: str, body: str) -> str:
    return (
        f"  ({{ show: _show }}) => (\n"
        f"    <Glass>\n"
        f"      <div style={{{{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}}}>\n"
        f"        <SlideLabel>{label}</SlideLabel>\n"
        f"        <h2 style={{{{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}}}>\n"
        f"          {title}\n"
        f"        </h2>\n"
        f"        <p style={{{{ ...bodyText, fontSize: 20 }}}}>\n"
        f"          {body}\n"
        f"        </p>\n"
        f"      </div>\n"
        f"    </Glass>\n"
        f"  ),"
    )


def quiz_jsx(q: dict) -> str:
    options_str = ",\n      ".join(f"'{esc(o)}'" for o in q["options"])
    return (
        "  {\n"
        f"    question: '{esc(q['question'])}',\n"
        f"    options: [\n      {options_str},\n    ],\n"
        f"    correct: {q['correct']},\n"
        f"    timeSeconds: 45,\n"
        "  },"
    )


def render_presentation(p: dict) -> str:
    chapter_label = p["chapter_label"]
    slides = p["slides"]
    assert len(slides) == 10, f"{p['filename']}: expected 10 slides, got {len(slides)}"
    summary_idx = 9
    slide_renders = []
    for i, s in enumerate(slides):
        full_label = f"{chapter_label} · Slide {i+1}"
        if i == summary_idx:
            slide_renders.append(summary_slide_jsx(f"{chapter_label} · Oppsummering", s["title"], s["body"]))
        else:
            slide_renders.append(slide_jsx(i, full_label, s["title"], s["body"], IMAGES[i % len(IMAGES)]))
    slides_block = "\n".join(slide_renders)

    quiz_block = "\n".join(quiz_jsx(q) for q in p["quiz"])
    assert len(p["quiz"]) == 3, f"{p['filename']}: expected 3 quiz questions, got {len(p['quiz'])}"

    title_line2_attr = f"\n      titleLine2=\"{esc(p['title_line2'])}\"" if p.get("title_line2") else ""

    return dedent(f"""\
        /**
         * {p['subject_label']} — {p['chapter_label']}: {p['presentation_name']}
         * Kilde: master-manus i .manus/.
         */
        import PresentationShell, {{ Glass, SlideImg, SlideLabel, twoCol, bodyText }} from './_lib/PresentationShell'
        import type {{ ContentSlide }} from './_lib/PresentationShell'
        import type {{ QuizQuestion }} from './QuizSlide'

        const SLIDES: ContentSlide[] = [
        {slides_block}
        ]

        const QUIZ_SLIDES: QuizQuestion[] = [
        {quiz_block}
        ]

        export default function {p['filename']}() {{
          return (
            <PresentationShell
              presentationName="{esc(p['presentation_name'])}"
              subjectLabel="{esc(p['subject_label'])}"
              titleLine1="{esc(p['title_line1'])}"{title_line2_attr}
              subtitle="{esc(p['subtitle'])}"
              contentSlides={{SLIDES}}
              quizSlides={{QUIZ_SLIDES}}
            />
          )
        }}
        """)


def write_presentation(p: dict):
    target = ROOT / f"{p['filename']}.tsx"
    if target.exists():
        print(f"  ! exists, skipping: {target.name}")
        return
    target.write_text(render_presentation(p))
    print(f"  + {target.name}")


# ── ML2 BATCH (17 chapters from Visjon 2) ────────────────────────────────────

ML2 = [
    {
        "filename": "StrategiskPlanleggingPresentation",
        "presentation_name": "Strategisk planlegging",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Strategisk",
        "title_line2": "planlegging",
        "subtitle": "Kursen mot fremtiden — valgene som sikrer overlevelse og vekst på lang sikt.",
        "chapter_label": "Kapittel 1",
        "slides": [
            {"title": "Strategibegrepet", "body": "Strategi er valgene som sikrer overlevelse og vekst på lang sikt. Det handler om hva bedriften skal gjøre — og minst like viktig: hva den IKKE skal gjøre."},
            {"title": "Strategisk vs. taktisk", "body": "Strategi handler om lange linjer (3–10 år), taktikk om kortsiktige tiltak (uker og måneder). En kampanje er taktikk, valget av forretningsmodell er strategi."},
            {"title": "Planleggingsprosessen", "body": "Visjon → analyse → mål → strategi → implementering. Hvert steg bygger på det forrige. Hopper du over analysen, ender du med ambisjoner uten kontakt med virkeligheten."},
            {"title": "Visjon og verdier", "body": "Visjonen er ledestjernen — det inspirerende bildet av fremtiden. Verdiene er de moralske grensene for hvordan vi når dit. «Hvor vil vi» og «hvordan skal vi oppføre oss»."},
            {"title": "PESTEL-analyse", "body": "Kartlegging av seks ytre makroforhold: Politiske, Økonomiske, Sosiale, Teknologiske, Environmental (miljø) og Lovverk. PESTEL gir et systematisk bilde av terrenget bedriften opererer i."},
            {"title": "Arbeidsbetingelser", "body": "Indre arbeidsbetingelser er bedriftens egne styrker og svakheter. Ytre arbeidsbetingelser er muligheter og trusler i markedet. SWOT-analysen kobler disse sammen."},
            {"title": "SWOT-analyse", "body": "Oppsummering av situasjonen i en 2x2-matrise: Strengths, Weaknesses, Opportunities, Threats. Strategiske tiltak skal bygge på styrkene, dekke svakhetene, gripe mulighetene og forsvare seg mot truslene."},
            {"title": "Kritiske suksessfaktorer", "body": "De få tingene som MÅ gå bra for at strategien skal lykkes. For en kafé: beliggenhet, kvalitet på kaffe, dyktige baristaer, lojale kunder. Identifiser dem og beskytt dem."},
            {"title": "Case — Tomras pivot", "body": "Tomra startet med pantemaskiner i Norge. Ved å analysere globale trender (resirkulering, EU-direktiver) så de muligheten i sortiering og food-sortering. Strategisk planlegging gjorde Tomra fra norsk pant-leverandør til global teknologileder."},
            {"title": "Hvorfor planlegge strategisk?", "body": "Strategisk planlegging reduserer tilfeldigheter i markedsføringen. Uten plan styrer du etter dagens vær — med plan bygger du for et helt års klima."},
        ],
        "quiz": [
            {"question": "Hva står PESTEL for?", "options": ["Pris, Etterspørsel, Salg, Teknologi, Etikk, Lovverk", "Politisk, Økonomisk, Sosialt, Teknologisk, Environmental, Lovverk", "Produksjon, Eksport, Salg, Transport, Energi, Logistikk", "Press, Effekt, Strategi, Tiltak, Evaluering, Læring"], "correct": 1},
            {"question": "Hva betyr 'O' i SWOT?", "options": ["Operasjonell", "Omsetning", "Opportunities (muligheter)", "Organisering"], "correct": 2},
            {"question": "Hva er forskjellen på strategi og taktikk?", "options": ["Strategi gjelder for hele bedriften, taktikk kun for en avdeling", "Strategi er lange linjer (år), taktikk er kortsiktige tiltak (uker/måneder)", "Strategi er for små bedrifter, taktikk for store", "De er to navn på samme ting"], "correct": 1},
        ],
    },
    {
        "filename": "VisjonOgMalPresentation",
        "presentation_name": "Visjon, mål og overordnede strategier",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Visjon",
        "title_line2": "og mål",
        "subtitle": "Hvor skal vi? Forretningsidé, visjon, SMART-mål og overordnede strategier — bedriftens kompass.",
        "chapter_label": "Kapittel 2",
        "slides": [
            {"title": "Forretningsidé (virksomhetsidé)", "body": "Svarer på fire spørsmål: Hva skal vi gjøre? For hvem? Hvordan? Hvorfor oss? En klar forretningsidé skiller seg fra konkurrentene og er enkel å forklare."},
            {"title": "Visjon", "body": "Et inspirerende bilde av bedriftens drømmesituasjon i fremtiden. Bør være ambisiøs nok til å motivere, men ikke så vag at ingen forstår hva den betyr i praksis."},
            {"title": "Målhierarkiet", "body": "Strukturert nedbryting: visjon → hovedmål → delmål → handlingsmål. Hvert nivå skal gjøre det neste nivået konkret. Visjonen «verdens beste» blir til handlingsmål «levere innen 24 timer»."},
            {"title": "SMART-mål", "body": "Spesifikt, Målbart, Ambisiøst, Realistisk, Tidsbestemt. «Vi skal vokse» er ikke SMART. «Øke omsetningen i Norge med 15 % innen 31.12» er SMART."},
            {"title": "Vekststrategier", "body": "Valg av retning for å øke omsetningen: nye markeder, nye produkter, ny prising, oppkjøp. Ansoffs vekstmatrise visualiserer fire strategier (markedsinntrenging, produktutvikling, markedsutvikling, diversifikasjon)."},
            {"title": "Konkurransestrategier", "body": "Tre generiske strategier (Porter): kostnadslederskap (vær billigst), differensiering (vær unik) og fokusering (vær best i en nisje). Den som prøver alt blir best i ingenting."},
            {"title": "GAP-analyse", "body": "Forskjellen mellom der vi er nå og der vi vil være. Identifiserer hvor stort gapet er i omsetning, markedsandel, kompetanse — og hvilke tiltak som må til for å lukke det."},
            {"title": "Verdigrunnlag", "body": "De etiske reglene som styrer ansattes hverdag. «Vi gjør alltid det rette, også når ingen ser» er et verdigrunnlag — ikke en visjon. Verdier brukes til å luke ut ansatte og leverandører som ikke passer kulturen."},
            {"title": "Case — Equinor sin reise", "body": "Statoil endret navn til Equinor i 2018 for å signalisere bevegelsen fra ren olje- og gasselskap til energiselskap. Ny visjon, nye mål og nye konkurransestrategier — tilpasset en verden i overgang til fornybart."},
            {"title": "Hvorfor er klare mål viktig?", "body": "Uten tydelige mål er det umulig å vite om strategien virker. SMART-mål gir både retning, måling og motivasjon — alle nivåer i organisasjonen vet hva som forventes og når."},
        ],
        "quiz": [
            {"question": "Hva står M-en i SMART-mål for?", "options": ["Markedsorientert", "Målbart", "Motivasjon", "Multinasjonal"], "correct": 1},
            {"question": "Hvilke tre generiske konkurransestrategier ga Michael Porter oss?", "options": ["Vekst, stabilitet, oppsigelse", "Kostnadslederskap, differensiering, fokusering", "Produkt, pris, plass", "Lokal, nasjonal, internasjonal"], "correct": 1},
            {"question": "Hva er en GAP-analyse?", "options": ["Analyse av prisforskjeller mellom konkurrenter", "Forskjellen mellom hvor vi er nå og hvor vi vil være", "Analyse av kjønnsfordeling blant kunder", "En metode for å beregne overskudd"], "correct": 1},
        ],
    },
    {
        "filename": "MarkedsOgBransjeanalysePresentation",
        "presentation_name": "Markeds- og bransjeanalyse",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Markeds-",
        "title_line2": "og bransjeanalyse",
        "subtitle": "Konkurransekreftene — Porters fem krefter og verktøyene som forteller om bransjen kan tjene penger over tid.",
        "chapter_label": "Kapittel 3",
        "slides": [
            {"title": "Porters fem krefter", "body": "Modell for å analysere bransjens attraktivitet og lønnsomhetspotensial. Jo sterkere kreftene er, jo lavere er typisk fortjeneste. Modellen tvinger frem en strukturert vurdering av konkurranselandskapet."},
            {"title": "Kraft 1: Rivalisering", "body": "Hvor hardt kjemper de eksisterende bedriftene mot hverandre? Mange like aktører + lav vekst = priskrig og lave marginer. Få aktører + høy differensiering = bedre lønnsomhet."},
            {"title": "Kraft 2: Nyetablerere", "body": "Hvor høye er barrierene for å starte opp i bransjen? Lave inngangsbarrierer (web-startups) gir konstant trussel om nye konkurrenter. Høye barrierer (oljeleting, banker) beskytter etablerte aktører."},
            {"title": "Kraft 3: Substitutter", "body": "Finnes det helt andre produkter som løser samme behov? Hjemmelaget mat er substitutt til restaurant. Sykling er substitutt til buss. Substitutter setter et tak på hva du kan ta i pris."},
            {"title": "Kraft 4: Leverandørmakt", "body": "Kan leverandørene presse oss på pris eller kvalitet? Få store leverandører = stor leverandørmakt (chip-produksjon). Mange små leverandører = lav leverandørmakt (frukt og grønt)."},
            {"title": "Kraft 5: Kundemakt", "body": "Kan kundene presse oss på pris eller kreve mer service? Store kunder med mange alternativer (NorgesGruppen mot småprodusenter) = stor kundemakt. Små, fragmenterte kunder = lav kundemakt."},
            {"title": "Strategiske grupper", "body": "Bedrifter i samme bransje som følger like strategier. SAS, Norwegian og KLM er én gruppe. Lavprisselskaper som Wizz Air og Ryanair er en annen. De konkurrerer mest innenfor sin gruppe."},
            {"title": "Bransjeglidning", "body": "Når bransjer smelter sammen. Bank og forsikring (DNB selger forsikring), telekom og medier (Telenor + TV2-eierskap), tech og bil (Apple Car-prosjektet). Skaper både muligheter og trusler."},
            {"title": "Case — Norsk dagligvare", "body": "Tre kjeder kontrollerer 96 % av norsk dagligvarehandel: NorgesGruppen, Coop, REMA 1000. Lav rivalisering (få aktører), enorme inngangsbarrierer, høy kundemakt for kjedene mot leverandørene. Strukturen forklarer hvorfor norske matpriser er som de er."},
            {"title": "Hva forteller bransjeanalysen oss?", "body": "Bransjeanalysen forteller oss om vi kan tjene penger over tid i denne bransjen. Sterke krefter = vanskelig å være lønnsom. Svake krefter = lukrativ posisjon."},
        ],
        "quiz": [
            {"question": "Hvor mange krefter er det i Porters modell?", "options": ["Tre", "Fire", "Fem", "Syv"], "correct": 2},
            {"question": "Hva er et substitutt?", "options": ["En billigere kopi av samme produkt", "Et helt annet produkt som løser samme behov", "Et produkt fra konkurrenten", "Et produkt som er forbudt"], "correct": 1},
            {"question": "Hva er bransjeglidning?", "options": ["Når en bransje krymper i størrelse", "Når bransjer smelter sammen — bank+forsikring, telekom+medier", "Når bedrifter flytter til utlandet", "Når en bransje blir ulønnsom"], "correct": 1},
        ],
    },
    {
        "filename": "LederensRollePresentation",
        "presentation_name": "Lederens rolle og funksjon",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Lederens",
        "title_line2": "rolle",
        "subtitle": "Styring og inspirasjon — hva som skiller en god leder fra en effektiv leder.",
        "chapter_label": "Kapittel 4",
        "slides": [
            {"title": "Ledelse vs. administrasjon", "body": "Administrasjon opprettholder eksisterende systemer (planer, regler, rutiner). Ledelse skaper endring (visjon, motivasjon, retning). Begge er nødvendige — ingen organisasjon klarer seg uten."},
            {"title": "Mintzbergs lederroller", "body": "Henry Mintzberg identifiserte 10 lederroller delt i tre kategorier: interpersonale (galionsfigur, leder, kontaktperson), informasjon (overvåker, sender, talsperson) og beslutning (entreprenør, problemløser, ressursfordeler, forhandler)."},
            {"title": "Fayols funksjoner", "body": "Henri Fayol beskrev fem klassiske lederfunksjoner: planlegge, organisere, lede, samordne og kontrollere. Modellen er over 100 år gammel, men brukes fortsatt som ramme i ledelseslitteratur."},
            {"title": "Strategisk ledelse", "body": "Evnen til å se de lange linjene og ta upopulære valg. Strategiske ledere må noen ganger si nei til dagens lønnsomhet for å sikre morgendagens overlevelse."},
            {"title": "Lederstiler", "body": "Fra autoritær (sjefen bestemmer alene) via demokratisk (felles beslutninger) til delegerende (medarbeider bestemmer selv). Hver stil har sine bruksområder — krise krever annen stil enn kreativt teamarbeid."},
            {"title": "Situasjonsbestemt ledelse", "body": "Hersey og Blanchards modell: tilpass lederstilen etter medarbeiderens kompetanse og motivasjon. Ny og motivert = instruere. Erfaren og motivert = delegere."},
            {"title": "Intern kommunikasjon", "body": "Lederen er budbringer av visjon og strategi inn i organisasjonen. Hvis ledelsen ikke kan forklare strategien på 30 sekunder, vil ingen lenger ned i organisasjonen huske den."},
            {"title": "Beslutningsprosesser", "body": "Hvordan ta gode valg under usikkerhet? Rasjonelle modeller (vurder alternativer, velg det beste), intuitiv beslutning (magefølelse), eller kollektive prosesser (involvere flere perspektiver)."},
            {"title": "Case — Jonas Gahr Støre vs. Erna Solberg", "body": "Begge er statsministre, men med ulike lederstiler. Erna preges av rolig, koordinerende stil — flink til å dempe konflikter. Jonas mer analytisk og forhandlende. Begge stilene har gitt resultater i ulike situasjoner."},
            {"title": "Hva er god ledelse?", "body": "God ledelse er broen mellom en god plan og et godt resultat. Den beste strategien blir ingenting hvis lederen ikke evner å mobilisere folka til å gjennomføre den."},
        ],
        "quiz": [
            {"question": "Hva er forskjellen på ledelse og administrasjon?", "options": ["De er det samme", "Ledelse skaper endring, administrasjon opprettholder systemer", "Ledelse er for store bedrifter, administrasjon for små", "Ledelse er for staten, administrasjon for private"], "correct": 1},
            {"question": "Hvor mange lederroller identifiserte Mintzberg?", "options": ["Fem", "Syv", "Ti", "Tolv"], "correct": 2},
            {"question": "Hva er kjernen i situasjonsbestemt ledelse?", "options": ["Lederen bytter jobb ofte", "Lederen tilpasser stilen etter medarbeiderens kompetanse og motivasjon", "Lederen har én stil for hele karrieren", "Lederen velger team selv"], "correct": 1},
        ],
    },
    {
        "filename": "SamfunnsansvarBaerekraftOmdommePresentation",
        "presentation_name": "Samfunnsansvar, bærekraft og omdømme",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Samfunnsansvar",
        "subtitle": "Bedriftens rolle i samfunnet — Triple Bottom Line, FNs bærekraftsmål og omdømmebygging i en transparent verden.",
        "chapter_label": "Kapittel 5",
        "slides": [
            {"title": "Triple Bottom Line", "body": "Måle suksess på tre dimensjoner: Miljø (Planet), Sosial (People), Økonomi (Profit). Tradisjonelt regnskap måler bare Profit. Moderne bedrifter rapporterer på alle tre."},
            {"title": "Interessentanalyse", "body": "Hvem påvirker vi, og hvem påvirker oss? Eiere, ansatte, kunder, leverandører, lokalsamfunn, miljø, myndigheter. Strategien må balansere ulike interessenters krav."},
            {"title": "CSR (Corporate Social Responsibility)", "body": "Bedriftens frivillige bidrag til en bedre verden. Investering i lokalsamfunn, etiske leverandørkjeder, miljøtiltak utover lovkravene. CSR drives ofte av forventninger fra kunder og ansatte."},
            {"title": "FNs bærekraftsmål", "body": "17 mål vedtatt i 2015 som rammeverk for bærekraftig utvikling innen 2030. Bedrifter velger ut de målene de faktisk kan påvirke vesentlig — ikke alle 17 samtidig."},
            {"title": "Omdømmebygging", "body": "Omdømme er kapitalen vi ikke eier, men forvalter. Bygges over år gjennom konsistent oppførsel — kan ødelegges på minutter ved en skandale. Tillit er fundamentet."},
            {"title": "Grønnvasking", "body": "Faren ved å lyve om miljøprofil. Forbrukertilsynet i Norge har slått ned på flyselskap, bilprodusenter og klesmerker som har brukt vage eller udokumenterte miljøpåstander."},
            {"title": "Sirkulær økonomi", "body": "Designe produkter for gjenbruk og reparasjon, ikke for å bli kastet. Eksempler: Patagonia reparerer klær gratis, Apple resirkulerer iPhones, Vestre møbler designet for å vare i 50+ år."},
            {"title": "Etisk handel", "body": "Ansvar for hele verdikjeden, helt tilbake til råvarene. Åpenhetsloven krever dokumentasjon av menneskerettigheter hos leverandører. H&M og Zara har fått kritikk for tekstilarbeidere i Bangladesh."},
            {"title": "Case — Patagonia og Black Friday", "body": "Patagonia har annonsert «Don't buy this jacket» — bedt kundene la være å kjøpe. Et tilsynelatende paradoks: ved å vise respekt for miljø og overforbruk, har de bygget en svært lojal kundebase som kjøper mer fra dem."},
            {"title": "Hvorfor er bærekraft viktig?", "body": "Bærekraft er ikke lenger en kostnad, men en forutsetning for overlevelse. Investorer (ESG-fond), kunder (yngre generasjoner) og lovverk (EU Taxonomy) presser alle i samme retning."},
        ],
        "quiz": [
            {"question": "Hva står Triple Bottom Line for?", "options": ["Tre måleenheter for omsetning", "People, Planet, Profit — tre bunnlinjer", "Tre konkurransestrategier", "Tre lederstil"], "correct": 1},
            {"question": "Hvor mange bærekraftsmål har FN?", "options": ["10", "15", "17", "20"], "correct": 2},
            {"question": "Hva er grønnvasking?", "options": ["Å vaske med miljøvennlige midler", "Å lyve om miljøprofil eller bruke udokumenterte miljøpåstander", "Å sertifisere produkter som økologiske", "Å redusere energiforbruket"], "correct": 1},
        ],
    },
    {
        "filename": "EtikkIMarkedsforingenPresentation",
        "presentation_name": "Etikk i markedsføringen",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Etikk",
        "subtitle": "Rett og galt i markedet — etiske dilemmaer i produkter, priser, kommunikasjon og data.",
        "chapter_label": "Kapittel 6",
        "slides": [
            {"title": "Etiske dilemmaer", "body": "Situasjoner der det ikke finnes ett enkelt rett svar. Skal du selge sukkerholdig brus til barn? Akseptere en lukrativ leverandøravtale med tvilsomme arbeidsforhold? Etikk handler om å reflektere før du beslutter."},
            {"title": "Lovlighet vs. moral", "body": "Selv om noe er lovlig, kan det være uetisk. Spillselskaper opererer innenfor loven, men kan utnytte spillavhengighet. Etisk lederskap krever ofte at man går lenger enn loven krever."},
            {"title": "Produktetikk", "body": "Farlige produkter, overdreven emballasje, planlagt foreldelse. Produsenter som med vilje gjør telefoner vanskelig å reparere, eller bygger inn slitasje for å tvinge frem nyt kjøp, kritiseres stadig oftere."},
            {"title": "Prisetikk", "body": "Prissamarbeid (karteller) er forbudt. Like alvorlig: utnyttelse av kunders nød — sterkt prisstigning av nødvendighetsvarer i krise (smittevernutstyr, drivstoff under naturkatastrofer) gir omdømmetap."},
            {"title": "Kommunikasjonsetikk", "body": "Kroppspress, urealistiske idealer og skjult reklame. Influencere som ikke merker betalt innhold, photoshoppede kropper i klesreklame, og manipulerende nøkkeltall i finansreklame er alle etiske gråsoner."},
            {"title": "Digital etikk", "body": "Bruk av data, overvåking og algoritmer som manipulerer. Sosiale medier-plattformer kan bevisst optimere for engasjement på bekostning av brukernes velvære. AI-genererte deepfakes utfordrer hva som er sant."},
            {"title": "Etisk beslutningsmodell", "body": "Et navigasjonsverktøy: Er det lovlig? Er det rettferdig? Tåler det dagens lys i media? Vil jeg være stolt av valget om 10 år? Hvis ett av svarene er nei, bør valget revurderes."},
            {"title": "Whistleblowing", "body": "Kulturen for å si fra om uetiske forhold internt. Norge har lov om varsling som beskytter ansatte mot represalier. Gode bedrifter har etablerte kanaler for varsling — uten frykt for konsekvenser."},
            {"title": "Case — Cambridge Analytica", "body": "Brukerdata fra 87 millioner Facebook-profiler ble brukt uten samtykke til politisk profilering i USA-valget 2016. Saken ble vendepunkt for personvern globalt og førte til strengere regler i mange land — og GDPR i EU."},
            {"title": "Hvorfor lønner etikk seg?", "body": "Langsiktig lønnsomhet krever en høy etisk standard. Sosiale medier har gjort all uetisk atferd potensielt offentlig — én skandale kan ødelegge merkevarekapital bygget over tiår."},
        ],
        "quiz": [
            {"question": "Hva er forskjellen på lovlighet og moral?", "options": ["De er det samme", "Noe kan være lovlig, men likevel uetisk", "Lovlighet gjelder bedrifter, moral gjelder personer", "Moral kreves av loven"], "correct": 1},
            {"question": "Hva betyr 'planlagt foreldelse'?", "options": ["At produkter skal være tidløse", "At produsenten med vilje bygger inn slitasje for å tvinge frem nyt kjøp", "At eldre folk får rabatt", "At produkter blir resirkulert"], "correct": 1},
            {"question": "Hva er whistleblowing?", "options": ["Reklame i radio", "En type konkurranse mellom bedrifter", "Å si fra om uetiske forhold internt — beskyttet av loven i Norge", "En markedsføringsteknikk"], "correct": 2},
        ],
    },
    {
        "filename": "MerkevarestrategiPresentation",
        "presentation_name": "Merkevarestrategier",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Merkevare-",
        "title_line2": "strategi",
        "subtitle": "Bygge Brand Equity — verdien navnet tilfører det fysiske produktet.",
        "chapter_label": "Kapittel 7",
        "slides": [
            {"title": "Hva er merkeverdi?", "body": "Brand Equity er den ekstra verdien navnet tilfører produktet. Coca-Cola-formelen alene er ingenting verdt — Coca-Cola-merket er verdsatt til over 80 milliarder dollar."},
            {"title": "Aakers merkevaremodell", "body": "David Aaker definerte fire pilarer: kjennskap (kjenner kundene merket?), kvalitetsoppfatning (er det godt?), assosiasjoner (hva tenker man på?) og lojalitet (kommer kunden tilbake?)."},
            {"title": "Paraplymerke vs. individuelle merker", "body": "Paraplymerke (Apple, Samsung) bruker samme navn på alle produkter — billig markedsføring, men én skandale rammer alt. Individuelle merker (P&G med Pampers, Tide, Gillette) gir fleksibilitet men koster mer."},
            {"title": "Merkeutvidelse", "body": "Bruke et kjent navn i en ny kategori. Caterpillar gravemaskiner → Caterpillar arbeidssko. Suksessfullt fordi assosiasjonene «robust og slitesterk» overføres. Mindre vellykket: Colgate frosne måltider."},
            {"title": "Merkets personlighet", "body": "Gi merket menneskelige egenskaper kunden kan relatere til. Volvo = ansvarlig, trygg. Harley-Davidson = opprørsk, fri. Apple = kreativ, smart. Personlighet bygger emosjonell kobling."},
            {"title": "Private merker (EMV)", "body": "Egne merkevarer fra detaljistene. First Price (NorgesGruppen), Coop X-tra, REMA Mer. Truer produsentmerker, fordi prisen er lavere — men kvaliteten er ofte sammenlignbar."},
            {"title": "Brand Equity Management", "body": "Hvordan pleie og vedlikeholde merkeverdien over tid. Konsistent kommunikasjon, beskytte merkets posisjonering, oppfølging av kvalitet, krisehåndtering når noe går galt."},
            {"title": "Juridisk merkevern", "body": "Registrering av varemerke hos Patentstyret beskytter mot piratkopier. Internasjonal beskyttelse via WIPO. Uten registrering kan andre kopiere navn og logo lovlig."},
            {"title": "Case — Apple sin merkevarestrategi", "body": "Apple er verdens mest verdifulle merkevare. Verdi: rundt 500 milliarder dollar. Bygget gjennom 40 år konsekvent kommunikasjon: enkelhet, design, kreativitet. Apple-effekt: kunder betaler 30–50 % premie for samme tekniske spesifikasjon som konkurrenter."},
            {"title": "Hva er en sterk merkevare verdt?", "body": "En sterk merkevare er bedriftens viktigste immaterielle eiendel. Den gir prising-makt, kundelojalitet og motstandskraft mot kriser — verdier som regnskapet ofte ikke fanger opp."},
        ],
        "quiz": [
            {"question": "Hva er brand equity?", "options": ["Bedriftens egenkapital", "Den ekstra verdien navnet tilfører produktet utover det fysiske", "Antall ansatte i markedsavdelingen", "Reklamebudsjettet for året"], "correct": 1},
            {"question": "Hvilke fire pilarer består Aakers merkevaremodell av?", "options": ["Pris, produkt, plass, promosjon", "Kjennskap, kvalitetsoppfatning, assosiasjoner, lojalitet", "Bredde, dybde, høyde, volum", "Mål, strategi, tiltak, kontroll"], "correct": 1},
            {"question": "Hva er EMV?", "options": ["Et type ledelsesverktøy", "Egne merkevarer fra detaljisten — First Price, Coop X-tra", "European Marketing Vision", "Energi, Marked, Vekst"], "correct": 1},
        ],
    },
    {
        "filename": "ProduktstrategiAvansertPresentation",
        "presentation_name": "Produktstrategi (avansert)",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Produkt-",
        "title_line2": "strategi",
        "subtitle": "Strategisk produktledelse — PLC, sortiment, innovasjon og porteføljeteknikk på VG3-nivå.",
        "chapter_label": "Kapittel 8",
        "slides": [
            {"title": "Strategisk produktbeslutning", "body": "Hva skal vi tilby? Hvilke segmenter satser vi på? Strategiske produktvalg avgjør bedriftens identitet — og kan ikke endres uten store kostnader."},
            {"title": "PLC i strategisk perspektiv", "body": "Produktets livssyklus styrer hvilke tiltak som lønner seg: innovasjons-investering i introduksjonsfasen, distribusjonsvekt i vekstfasen, kostnadskutt i modningen, exit-strategi i tilbakegang."},
            {"title": "Porteføljematriser", "body": "BCG-matrisen klassifiserer produkter som stjerner (vekst+stor andel), spørsmålstegn (vekst+liten andel), melkekyr (stabilt+stor andel) og hunder (lavt på begge). Strategi: melk kuene, dyrk stjernene."},
            {"title": "Sortimentstrategi", "body": "Bredde (antall produktgrupper) vs. dybde (varianter innen gruppe). Fokus = smal og dyp, full-line = bred og dyp, butikk = bred og grunn. Strategien må følge kundens forventning."},
            {"title": "Merkevarearkitektur", "body": "Hvordan produktene grupperes under merkenavn. House of Brands (P&G — egne navn per produkt) vs. Branded House (Microsoft — alt heter Microsoft). Hybrid-løsninger er vanlige."},
            {"title": "Innovasjon", "body": "Inkrementell innovasjon (forbedre eksisterende) vs. radikal (helt nytt). Inkrementell er billig og lavrisiko, radikal er dyr men kan forandre bransjer (iPhone, Tesla, Netflix)."},
            {"title": "Open Innovation", "body": "Hente innovasjonskraft utenfra — kunder, akademia, oppstartsbedrifter. Procter & Gamble sitt «Connect+Develop»-program henter inn tusenvis av eksterne ideer i året, og lanserer flere av dem som suksessprodukter."},
            {"title": "Ettermarked og tjenestetilbud", "body": "Service, vedlikehold, oppgraderinger og forbruksmateriell. Rolls-Royce tjener mer på vedlikehold av flymotorer enn på selve motorene. Ettermarkedet er ofte mer lønnsomt enn førstesalget."},
            {"title": "Case — Apple iPhone-økosystemet", "body": "iPhone selger godt — men det virkelige tjenestelivet ligger i App Store, iCloud, Apple Music, AppleCare og Apple Pay. Hver iPhone-bruker genererer abonnementsinntekter i mange år. Det er strategisk porteføljebygging."},
            {"title": "Hvorfor er strategisk produktledelse viktig?", "body": "Strategisk produktledelse handler om å bygge en portefølje som gir både nåværende inntjening (melkekyr) og fremtidig vekst (stjerner) — samtidig. Det er kunsten å holde mange baller i lufta over tid."},
        ],
        "quiz": [
            {"question": "Hva er en 'melkeku' i BCG-matrisen?", "options": ["Et produkt med høy vekst og lav markedsandel", "Et produkt med lav vekst og høy markedsandel — gir stabil inntjening", "Et produkt som ikke selger", "Et produkt for landbruk"], "correct": 1},
            {"question": "Hva er forskjellen på inkrementell og radikal innovasjon?", "options": ["Inkrementell er billig, radikal er dyr men kan forandre bransjer", "Inkrementell er for små bedrifter, radikal for store", "Inkrementell er for produkt, radikal for tjeneste", "De er det samme"], "correct": 0},
            {"question": "Hva er Open Innovation?", "options": ["Innovasjon i åpne kontorlandskap", "Hente innovasjonskraft utenfra — kunder, akademia, startups", "Patentert teknologi som er gratis", "Konkurranse mellom designere"], "correct": 1},
        ],
    },
    {
        "filename": "PrisstrategiAvansertPresentation",
        "presentation_name": "Prisstrategier (avansert)",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Pris-",
        "title_line2": "strategi",
        "subtitle": "Pris som strategisk styringsverktøy — verdibasert prising, dynamiske modeller og prisdiskriminering.",
        "chapter_label": "Kapittel 9",
        "slides": [
            {"title": "Prisens rolle i strategien", "body": "Pris er mer enn en prislapp — det er et signal om verdi, posisjonering og målgruppe. Premium-pris signaliserer kvalitet (selv om kvaliteten er den samme), lavpris signaliserer tilgjengelighet."},
            {"title": "Kalkulasjonsmetoder", "body": "Selvkostmetoden (alle kostnader + påslag) og bidragsmetoden (variable kostnader + dekningsbidrag). Selvkost passer for langsiktige beslutninger, bidragsmetoden for kortsiktige (skal vi ta neste ordre?)."},
            {"title": "Priselastisitet og volum", "body": "Finn «the sweet spot» mellom pris og antall solgte. Senker du prisen 10 % og selger 30 % mer, øker omsetningen — men ikke alltid lønnsomheten. Marginal-analyse er nødvendig."},
            {"title": "Skumming vs. inntrenging", "body": "Skumming: høy startpris, høyt dekningsbidrag, fokus på premium-kunder. Inntrenging: lav startpris for å vinne markedsandel raskt og bygge nettverkseffekter. Apple skummer, Spotify trenger inn."},
            {"title": "Yield Management", "body": "Dynamisk prising basert på sanntidsdata om etterspørsel. Flyselskaper, hoteller og leiebiler bruker det — samme rom kan koste 800 kr én natt og 3000 kr neste. Maksimerer inntekt per enhet kapasitet."},
            {"title": "Avansert prisdifferensiering", "body": "Ulik pris til ulike grupper basert på betalingsvilje. Studentrabatter, seniorpriser, geografisk prising (samme tjeneste i Norge dyrere enn i Polen), tidspriser (matinéer billigere enn kveldskino)."},
            {"title": "Psykologisk prissetting", "body": "Terskeleffekter (199 vs 200), ankring (en dyr versjon i menyen får mellomprisen til å virke billig), bundling (3 for 99 kr), lokkeffekt (en åpenbart dårlig deal får alternativene til å virke gode)."},
            {"title": "Pris som konkurransefortrinn", "body": "Kostnadslederskap (Porter): bli den billigste i bransjen ved å ha lavest kostnadsstruktur. Krever skala og effektivitet. Eksempel: Ryanair, IKEA, Amazon. Få bransjer kan ha mer enn én reell kostnadsleder."},
            {"title": "Case — Norwegian sin prisstrategi", "body": "Norwegian bruker dynamisk prising på flybilletter. Samme rute kan koste 99 kr én dag og 4990 kr neste — basert på etterspørselsdata. Resultat: høyere belegg på fly enn tradisjonelle selskaper, men også uforutsigbarhet for kundene."},
            {"title": "Hvorfor er pris så strategisk?", "body": "Pris er det konkurransemiddelet som påvirker bunnlinjen raskest. 1 % høyere pris = ofte 5–10 % høyere overskudd. Ingen annen variabel har samme direkte effekt — derfor er prisstrategi alltid et toppledelses-tema."},
        ],
        "quiz": [
            {"question": "Hva er Yield Management?", "options": ["En metode for høsting i landbruket", "Dynamisk prising basert på sanntidsdata om etterspørsel", "En modell for ansatt-belønning", "Et kostnadssystem"], "correct": 1},
            {"question": "Hva kjennetegner skummestrategi?", "options": ["Lav startpris for å vinne markedsandel raskt", "Høy startpris, høyt dekningsbidrag, fokus på premium-kunder", "Samme pris i alle kanaler", "Pris som varierer per kunde"], "correct": 1},
            {"question": "Hvorfor er pris så viktig for bunnlinjen?", "options": ["Kunder bryr seg mest om pris", "1 % høyere pris gir ofte 5–10 % høyere overskudd — ingen annen variabel har samme effekt", "Det er enklest å endre", "Loven krever det"], "correct": 1},
        ],
    },
    {
        "filename": "DistribusjonsstrategiAvansertPresentation",
        "presentation_name": "Distribusjonsstrategier (avansert)",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Distribusjons-",
        "title_line2": "strategi",
        "subtitle": "Makt og tilgjengelighet — fra verdikjeden via omnikanal til plattformøkonomi.",
        "chapter_label": "Kapittel 10",
        "slides": [
            {"title": "Verdikjeden", "body": "Fra råvare til ferdig produkt i kundens hånd. Porters verdikjedeanalyse identifiserer hvor verdien skapes — og hvor det kan effektiviseres. Hver etappe er en mulighet for konkurransefortrinn."},
            {"title": "Kanalvalg og kontroll", "body": "Direkte salg gir høy kontroll (pris, opplevelse, data) men lav rekkevidde. Indirekte salg gir lav kontroll men stor rekkevidde. Strategisk valg basert på merkeposisjonering og produkttype."},
            {"title": "Maktbalansen i kanalen", "body": "Tidligere produsentdominans (Tine bestemte hvilke produkter butikken fikk). Nå kjededominans (NorgesGruppen forhandler ned priser, krever hyllepenger). Detaljistmakt har omformet hele norsk dagligvare."},
            {"title": "Distribusjonsgrad", "body": "Strategisk valg: intensiv (overalt — Coca-Cola, tyggegummi), selektiv (utvalgte forhandlere — Levis, Apple), eksklusiv (kun få utvalgte — Rolex, Tesla). Distribusjonsgraden må passe merkets posisjon."},
            {"title": "Supply Chain Management (SCM)", "body": "Integrert styring av hele forsyningskjeden — fra leverandør til sluttkunde. SAP, Oracle og Salesforce leverer SCM-systemer som kan spore en vare gjennom 50 ledd og fem land i sanntid."},
            {"title": "Omnikanal-strategi", "body": "Sømløs kundeopplevelse på tvers av alle plattformer. Kunden starter handlingen på mobil, fortsetter på PC, henter i butikk, returnerer via post. Krever integrert IT-system, lager og kundeservice."},
            {"title": "Fysisk logistikk", "body": "Effektivitet som konkurransefortrinn. Amazon sin én-dagers-levering, IKEA sin flatpakke, Zalando sin gratis returrett — alle er logistikk-revolusjoner som har endret hva kundene forventer."},
            {"title": "Internasjonal distribusjon", "body": "Agenter, importører, joint ventures, datterselskaper. Lange kjeder gir høyere kostnader og mindre kontroll. Nye markeder krever ofte lokale partnere som forstår kultur, lover og forhandlingsskikker."},
            {"title": "Case — Amazon sin logistikkrevolusjon", "body": "Amazon brukte over 100 milliarder dollar på logistikk for å etablere én-dags-levering. Dette skaper en uoverkommelig barriere for konkurrenter. Walmart, Target og andre må følge med — eller miste markedet."},
            {"title": "Hvorfor er distribusjon strategisk?", "body": "Distribusjon handler om å vinne kampen om hylleplassen og kundens tid. I et marked med hundretusener av produkter er tilgjengelighet selve forskjellen mellom å eksistere og å ikke eksistere for kunden."},
        ],
        "quiz": [
            {"question": "Hva er omnikanal?", "options": ["Salg kun via TV", "Sømløs kundeopplevelse på tvers av alle plattformer (mobil, PC, butikk)", "Salg av tyggegummi i alle butikker", "Internasjonal distribusjon"], "correct": 1},
            {"question": "Hvem har mest makt i den norske dagligvarekjeden i dag?", "options": ["Produsentene (TINE, Orkla)", "Forbrukerne via apper", "De store kjedene (NorgesGruppen, Coop, REMA)", "Det offentlige"], "correct": 2},
            {"question": "Hva betyr SCM?", "options": ["Sales Channel Management", "Supply Chain Management — integrert styring av forsyningskjeden", "Strategic Customer Marketing", "Single Channel Method"], "correct": 1},
        ],
    },
    {
        "filename": "KommunikasjonsstrategierPresentation",
        "presentation_name": "Kommunikasjonsstrategier",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Kommunikasjons-",
        "title_line2": "strategi",
        "subtitle": "Integrert markedskommunikasjon — én stemme utad, gjennom alle kanaler, gjennom hele kundereisen.",
        "chapter_label": "Kapittel 11",
        "slides": [
            {"title": "Integrert markedskommunikasjon (IMC)", "body": "«En stemme utad» — alle kanaler, fra TV-reklame til kundeservice, leverer samme budskap. Konsistens bygger merkevare; sprik forvirrer kunden."},
            {"title": "Kommunikasjonsmål", "body": "Fra kjennskap (vet de at vi finnes?) til kunnskap (forstår de hva vi gjør?) til holdning (liker de oss?) til handling (kjøper de?). Hvert mål krever ulik strategi og budskap."},
            {"title": "Påvirkningsmiksen", "body": "Strategisk vekting mellom reklame (massekjennskap), PR (troverdighet), salgsfremming (kortsiktig boost), personlig salg (B2B og dyre kjøp), direkte markedsføring (lojalitet). Få bedrifter bruker bare én."},
            {"title": "Den digitale kundereisen", "body": "Oppdage → vurdere → konvertere → beholde. Tradisjonell trakt er ikke lineær lenger — kundene hopper inn og ut, sammenligner, leser anmeldelser, sjekker sosiale medier. Markedsføringen må være tilstede i alle ledd."},
            {"title": "Innholdsstrategi", "body": "Content Marketing bygger autoritet og tillit gjennom verdifulle artikler, videoer, podcaster. DnB sin Magma-blogg, Hubspot sine guider og Patagonia sine miljøreportasjer tjener langsiktig merkebygging — ikke direkte salg."},
            {"title": "Sosiale medier og dialog", "body": "Fra enveiskommunikasjon til aktivt samspill. Kunden kan kommentere, kritisere, dele og kjøpe direkte i samme kanal. Krever respons-tid, evne til å håndtere ros og ris i sanntid."},
            {"title": "Budsjettering", "body": "Mål- og oppgavemetoden er det strategiske valget: definer kommunikasjonsmål, beregn aktivitetsbehov, allokér budsjett. Mer disiplinert enn «la oss ta 5 % av omsetningen» — men også vanskeligere å forsvare internt."},
            {"title": "Effektmåling (KPI)", "body": "Hvordan vet vi at det virker? ROI (return on investment), klikkrate (CTR), konverteringsgrad, brand recall, NPS (Net Promoter Score). Digitalt = presist, tradisjonelt = estimert."},
            {"title": "Case — Telenor sin sport-sponsing", "body": "Telenor har sponset norsk fotball, ski og håndball i over 30 år. Synlighet, lokal forankring og emosjonell kobling til Norge bygger en posisjon penger alene ikke kan kjøpe — det er strategisk merkebygging i praksis."},
            {"title": "Hva er strategisk kommunikasjon?", "body": "Kommunikasjon er mer enn støy — det er bygging av langsiktige verdier. En konsistent stemme over år bygger merkekapital; sprikende budskap eroderer den."},
        ],
        "quiz": [
            {"question": "Hva betyr IMC?", "options": ["International Marketing Council", "Integrated Marketing Communications — én stemme utad", "Internet Marketing Channel", "Internal Management Committee"], "correct": 1},
            {"question": "Hvilken budsjetteringsmetode er mest strategisk?", "options": ["Prosent av omsetning", "Mål- og oppgavemetoden — definer mål, beregn behov, allokér budsjett", "Følg konkurrentene", "Bruk samme budsjett som i fjor"], "correct": 1},
            {"question": "Hva er kjernen i 'Den digitale kundereisen'?", "options": ["At alle kunder er på TikTok", "Oppdage → vurdere → konvertere → beholde, ikke-lineær prosess", "At kunden kjøper alt på nett", "At reklamen er gratis"], "correct": 1},
        ],
    },
    {
        "filename": "MarkedsmiksOgEffektmalingPresentation",
        "presentation_name": "Markedsmiks og effektmåling",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Markedsmiks",
        "title_line2": "og effektmåling",
        "subtitle": "Synergi og resultater — KPI, ROI, ROAS og analytics som gjør markedsføringen målbar.",
        "chapter_label": "Kapittel 12",
        "slides": [
            {"title": "Synergieffekter", "body": "1 + 1 kan bli 3. Når produkt, pris, plass og kommunikasjon virker sammen, blir totaleffekten større enn summen av delene. Apple er paradigmet: produktet, prisen, butikkene og kommunikasjonen forsterker hverandre."},
            {"title": "Markedsplanen som styringsverktøy", "body": "Det dokumentet som holder alt sammen. Skal binde sammen mål, strategi, taktikk, budsjett og oppfølging. En markedsplan på 200 sider som ingen leser er verdiløs — én side som alle handler etter er gull."},
            {"title": "Hvorfor måle?", "body": "Læring (hva virker?), kontroll (er vi på sporet?), bevis (legitimerer markedsføringsbudsjettet for ledelsen). Uten måling er markedsføring magi — med måling er det forretningsdisiplin."},
            {"title": "Kommunikasjonseffekt", "body": "Ble vi husket? (recall, recognition). Endret vi holdninger? (preferanse, sympati). Brand tracking-undersøkelser måler dette over tid. Tar måneder å se utslag — men resultatene er strategiske."},
            {"title": "Salgseffekt", "body": "Hvor mye økte omsetningen direkte? ROAS (Return on Ad Spend) er nøkkeltallet for digitale kampanjer. ROAS 3.0 betyr at hver krone i annonser ga 3 kroner i salg."},
            {"title": "ROI i markedsføring", "body": "Avkastning på investert markedskapital. Total inntekt fra kampanjen minus alle kostnader (inkludert internt arbeid), delt på kostnadene. Hvis ROI er 30 %, er hver krone investert verdt 1,30."},
            {"title": "Digital sporing (Analytics)", "body": "Følg kunden fra første klikk til ferdig kjøp. Google Analytics, Hubspot, Mixpanel. Multi-touch attribution — hvilken annonse, hvilken e-post, hvilket sosial medieinnlegg førte til salget? Sjelden bare én."},
            {"title": "Feilkilder ved måling", "body": "Sesong (julehandel ≠ januarsalg), konkurrenter (deres kampanjer påvirker dine resultater), eksterne sjokk (pandemi, krig, valuta). Tolking krever fagforståelse, ikke bare tallene."},
            {"title": "Case — H&M og effektmåling", "body": "H&M kombinerer salgsdata med Google Analytics for å se hvilke produkter som responderer på hvilke kampanjer i hvilke land. Resultat: dynamiske kampanjer som tilpasses i sanntid — produkter som selger godt får mer reklame."},
            {"title": "Hvorfor er kontrollfasen viktig?", "body": "Kontrollfasen er starten på neste planleggingsperiode. Læring fra forrige runde bygger inn i neste års strategi — det er hvordan markedsføring vokser fra håndverk til vitenskap."},
        ],
        "quiz": [
            {"question": "Hva betyr ROAS?", "options": ["Rate of Annual Sales", "Return on Ad Spend — avkastning per annonsekrone", "Rate of Average Service", "Risk of Average Sales"], "correct": 1},
            {"question": "Hva er en synergieffekt i markedsmiksen?", "options": ["Når kostnadene øker", "Når 1 + 1 blir 3 — produktet, prisen, plassen og kommunikasjonen forsterker hverandre", "Når flere bedrifter slår seg sammen", "Når reklamen blir billigere"], "correct": 1},
            {"question": "Hvorfor måler man markedsføringseffekt?", "options": ["Loven krever det", "For læring, kontroll og bevis for ledelsen", "Det er en akademisk øvelse", "For å konkurrere med andre bedrifter"], "correct": 1},
        ],
    },
    {
        "filename": "OrganiseringOgLedelseStrategiskPresentation",
        "presentation_name": "Organisering og ledelse (strategisk nivå)",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Strategisk",
        "title_line2": "ledelse",
        "subtitle": "Kultur og struktur — hvordan organisasjonen rigges for å gjennomføre strategien.",
        "chapter_label": "Kapittel 13",
        "slides": [
            {"title": "Organisasjonsstruktur", "body": "Funksjonell, produktbasert, markedsbasert eller matriseorganisering — hva passer strategien? Strukturen må følge strategien, ikke omvendt. Endrer du strategi, må strukturen vurderes på nytt."},
            {"title": "Bedriftskultur", "body": "De usynlige reglene som styrer atferden. «Slik gjør vi det her» — uten at noen sier det høyt. Sterk kultur er konkurransefortrinn (Apple, Patagonia), men kan også bli en bremsekloss for endring."},
            {"title": "Endringsledelse", "body": "Hvordan få med de ansatte på en ny markedsstrategi. Kotters åtte-stegs modell: skap nødfølelse, bygg en ledende koalisjon, kommuniser visjon, fjern hindringer, feire seire underveis, forankre kulturen."},
            {"title": "Lederstiler på strategisk nivå", "body": "Inspirerende ledelse (Jobs, Musk) skaper engasjement og innovasjon. Kontrollbasert ledelse (mange traditionelle CEOer) gir presis utførelse. Begge har sin plass — feil stil i feil situasjon kan være katastrofal."},
            {"title": "Internmarkedsføring", "body": "Selg strategien til de ansatte før den selges til kunden. Hvis ikke ansatte tror på merkevaren, klarer de heller ikke formidle den. SAS, Hurtigruten og IKEA bruker betydelige ressurser på ansatt-engasjement."},
            {"title": "Kompetansestrategi", "body": "Sikre at bedriften har hodene som trengs for fremtiden. Krever ofte aktivt arbeid: kompetansekartlegging, læring og utvikling, rekruttering på lang sikt. Tek-bedrifter bruker mer på rekruttering enn på reklame."},
            {"title": "Agil organisering", "body": "Evnen til å snu seg raskt i et digitalt marked. Spotifys squad/tribe-modell, Amazon's «two pizza teams» — små, autonome enheter som kan beslutte og utføre raskt. Motsatt av tradisjonell hierarkisk struktur."},
            {"title": "Samarbeid og team", "body": "Bryte ned «siloer» mellom avdelinger. Cross-funksjonelle team, felles målbevis, samlokalisering — alt for å sikre at marked, IT, salg og produkt jobber mot samme mål, ikke konkurrerer internt."},
            {"title": "Case — Hurtigrutens kulturreise", "body": "Hurtigruten gikk fra lokal ferge-leverandør til globalt premium-cruiseselskap. Krevde fundamental endring av kultur (fra «vi er ferje» til «vi er opplevelse»), ny rekruttering og betydelig internopplæring. Strategi mislyktes flere ganger før kulturen kom på plass."},
            {"title": "Hvorfor må strategi og organisasjon henge sammen?", "body": "Strategien dør uten en organisasjon som er rigget for å gjennomføre den. «Culture eats strategy for breakfast» — men strategi uten kultur eter seg selv."},
        ],
        "quiz": [
            {"question": "Hva er internmarkedsføring?", "options": ["Reklame plassert internt i bedriften", "Selge strategien til de ansatte før den selges til kunden", "Markedsføring kun for ansatte-rabatter", "Internasjonal markedsføring"], "correct": 1},
            {"question": "Hva kjennetegner agil organisering?", "options": ["Hierarkisk struktur med mange lag", "Små, autonome team som kan beslutte og utføre raskt", "Sentralisert beslutning fra toppen", "Lange planleggingssykluser"], "correct": 1},
            {"question": "Hva sier Peter Druckers berømte sitat om kultur?", "options": ["Kultur er overvurdert", "Culture eats strategy for breakfast — kultur slår strategi", "Kultur er kun for store bedrifter", "Kultur har ingen sammenheng med resultater"], "correct": 1},
        ],
    },
    {
        "filename": "PersonaladministrasjonHRMPresentation",
        "presentation_name": "Personaladministrasjon og HRM",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Personal-",
        "title_line2": "administrasjon",
        "subtitle": "Human Resource Management — planlegge, anskaffe og utvikle bedriftens viktigste ressurs.",
        "chapter_label": "Kapittel 14",
        "slides": [
            {"title": "Hva er HRM?", "body": "Human Resource Management er strategisk arbeid med mennesker: planlegge fremtidig kompetansebehov, anskaffe rett folk, utvikle dem over tid. Mer enn lønnsutbetaling — det er bygging av organisasjonens fremtid."},
            {"title": "Rekrutteringsprosessen", "body": "Fire steg: jobbanalyse (hva skal personen gjøre?), utlysning (hvem vil vi nå?), seleksjon (intervjuer, tester, referanser), ansettelse (kontrakt, onboarding). Feil ansettelse er dyrt — opp til 6 ganger årslønn."},
            {"title": "Motivasjonsteori", "body": "Herzbergs to-faktor-teori: hygienefaktorer (lønn, arbeidsmiljø, sjefen) må være på plass — men gir ikke motivasjon. Motivasjonsfaktorer (mestring, anerkjennelse, ansvar, vekst) skaper faktisk engasjement."},
            {"title": "Kompetanseutvikling", "body": "Kurs, etterutdanning, mentoring, jobbrotasjon. Læring i hverdagen — ikke bare formelle kurs. 70-20-10-modellen: 70 % læring fra arbeidet, 20 % fra andre, 10 % fra formelle kurs."},
            {"title": "Arbeidsmiljøloven", "body": "De juridiske rammene for et trygt arbeidsliv i Norge. Regulerer arbeidstid, ferie, oppsigelse, varsling, diskriminering. Bryter du den, kan Arbeidstilsynet stenge driften — i tillegg til erstatningsansvar."},
            {"title": "Belønningssystemer", "body": "Mer enn lønn: bonus, opsjoner, frynsegoder, anerkjennelse. Ekstreme bonusordninger kan gi vridde insentiver (banksektoren før 2008). Best er ofte balansert grunnlønn pluss beskjeden, predikerbar bonus."},
            {"title": "Medarbeidersamtalen", "body": "Strukturert dialog om trivsel, prestasjon og mål. Skjer minst en gang i året, helst oftere. Brukt riktig: utvikling og engasjement. Brukt feil: tidssløsing og frustrasjon."},
            {"title": "Personalavvikling", "body": "Oppsigelse og avskjed på en ryddig og lovlig måte. Krav til saklig grunn, drøftingsmøte, rett til advokat. Slurv her gir både rettssaker og dårlig omdømme."},
            {"title": "Case — Statoils nedbemanning 2014–2016", "body": "Da oljeprisen falt, måtte Statoil nedbemanne 8 000 stillinger. Selskapet brukte en ryddig prosess: åpenhet, sluttpakker, omplasseringskurs. Resultat: lave rettssaker, bevart omdømme — og ansatte som senere kom tilbake da markedet snudde."},
            {"title": "Hvorfor er HRM strategisk?", "body": "Menneskene er bedriftens eneste ressurs som kan tenke selv. Maskiner gjør hva de programmeres til; mennesker innoverer, tilpasser og bygger relasjoner. HRM-strategien avgjør hvem som er med på reisen videre."},
        ],
        "quiz": [
            {"question": "Hva er Herzbergs to-faktor-teori?", "options": ["To måter å beregne lønn på", "Hygienefaktorer (må være på plass) vs. motivasjonsfaktorer (skaper engasjement)", "To måter å rekruttere på", "To typer ansettelseskontrakter"], "correct": 1},
            {"question": "Hva er 70-20-10-modellen?", "options": ["En lønnsfordeling mellom ledelse, mellomledere og ansatte", "70 % læring fra arbeidet, 20 % fra andre, 10 % fra formelle kurs", "Tre nivåer av rekruttering", "Tre nivåer av bonus"], "correct": 1},
            {"question": "Hva sier loven om personalavvikling?", "options": ["Bedrifter kan si opp uten begrunnelse", "Krav til saklig grunn, drøftingsmøte og rett til advokat", "Oppsigelse må alltid godkjennes av Arbeidstilsynet", "Det er fritt frem"], "correct": 1},
        ],
    },
    {
        "filename": "InternasjonalMarkedsforingPresentation",
        "presentation_name": "Markedsføring på internasjonale markeder",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Internasjonal",
        "title_line2": "markedsføring",
        "subtitle": "Verden som lekeplass — kulturforståelse, etableringsstrategier og global merkebygging.",
        "chapter_label": "Kapittel 15",
        "slides": [
            {"title": "Hvorfor gå utenlands?", "body": "Vekst (norsk marked er begrenset til 5,5 millioner), stordriftsfordeler (samme produkt selges flere ganger), risikospredning (ikke avhengig av norsk konjunktur), tilgang til ressurser eller kompetanse."},
            {"title": "Etableringsstrategier", "body": "Fra lavt til høyt engasjement: eksport (selg fra Norge), lisensiering (la andre produsere), franchising (la andre drifte), joint venture (sammen med lokal partner), heleid datterselskap (full kontroll, men full risiko)."},
            {"title": "Kulturelle barrierer", "body": "Forståelse av normer, verdier, språk og religion. Norske direkte kommunikasjon kan oppleves uhøflig i Asia. Pepsi mistet milliarder i Kina på en feilmeldt tagline. Kultur er ofte den største barrieren — ikke språk."},
            {"title": "Standardisering vs. adaptasjon", "body": "Lik markedsmiks overalt (lavere kostnad, sterkere global merkevare) eller lokal tilpasning (bedre kulturell relevans, høyere kostnad). De fleste store merkevarer kombinerer: McDonalds har både Big Mac globalt og McSpicy Paneer i India."},
            {"title": "Landanalysen (PESTEL)", "body": "Kartlegging av risiko før inntreden. Politisk stabilitet, økonomisk styrke, sosiale normer, teknologi-modenhet, miljølovgivning, lovverk. Et 50-siders PESTEL-dokument er standard før store internasjonale satsninger."},
            {"title": "Internasjonal prising", "body": "Dumping (selge under selvkost for å vinne marked — ofte ulovlig), valutasvingninger (kronesvekkelse gir norske eksportører fordel), transfer pricing (interne priser mellom bedriftens enheter — strengt regulert)."},
            {"title": "Global kommunikasjon", "body": "Språkbarrierer og kulturelle koder i reklame. Engelske slagord oversettes ikke alltid godt. Bilder av kvinner uten hijab vil ikke fungere i Saudi-Arabia. Lokale byråer er uvurderlige."},
            {"title": "Logistikk over landegrenser", "body": "Toll, frakt, lokale distributører, sertifiseringer (CE-merking, FDA-godkjenning). Pakker som krysser grense kan stoppes i flere uker. Logistikk-kostnader kan utgjøre 15–30 % av sluttprisen i fjerne markeder."},
            {"title": "Case — Norwegian sin USA-satsing", "body": "Norwegian satset hardt på lavprisflyvninger til USA. Manglende lokalkunnskap, hard konkurranse, valutarisiko og pandemi førte til konkurs i 2020. Lærdom: lokal innsikt og finansielt bærekraftig modell må være på plass før internasjonal vekst."},
            {"title": "Hvorfor krever internasjonal suksess ydmykhet?", "body": "Internasjonal suksess krever ydmykhet overfor lokale forskjeller. Det som virker hjemme er ikke automatisk overførbart — kulturen, kjøpsadferden og konkurransen er alltid annerledes."},
        ],
        "quiz": [
            {"question": "Hva er en lavrisiko-strategi for internasjonal etablering?", "options": ["Heleid datterselskap", "Eksport — selg fra hjemmemarkedet", "Joint venture", "Direkte investering"], "correct": 1},
            {"question": "Hva er transfer pricing?", "options": ["Frakt over landegrenser", "Interne priser mellom bedriftens enheter — strengt regulert av skattemyndigheter", "Valutaomregning", "Eksport-rabatter"], "correct": 1},
            {"question": "Hva er den største barrieren i internasjonalisering ifølge erfaring?", "options": ["Språk", "Kultur og lokale skikker — ikke språk", "Toll", "Tidsforskjell"], "correct": 1},
        ],
    },
    {
        "filename": "OkonomistyringKalkulasjonBudsjetteringPresentation",
        "presentation_name": "Økonomistyring, kalkulasjon og budsjettering",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Økonomi-",
        "title_line2": "styring",
        "subtitle": "Tallenes tale — kalkulasjon, dekningsbidrag og budsjett som beslutningsgrunnlag for markedsføreren.",
        "chapter_label": "Kapittel 16",
        "slides": [
            {"title": "Økonomi og markedsføring", "body": "Markedsføreren må forstå regnskapet for å få budsjetter. Argumentet «kampanjen var kreativ» faller flatt i toppledelsen. Argumentet «ROI 4,2 og bidragsmargin 32 %» åpner kassen."},
            {"title": "Kalkulasjonsmetoder", "body": "Bidragsmetoden: variable kostnader + dekningsbidrag. Brukes for kortsiktige beslutninger (skal vi ta neste ordre?). Selvkostmetoden: alle kostnader + påslag. Brukes for langsiktige beslutninger (er produktet lønnsomt?)."},
            {"title": "Dekningsbidrag", "body": "Salgspris minus variable kostnader. Hvor mye sitter vi igjen med per solgte enhet til å dekke faste kostnader og fortjeneste? Avgjør hvilke produkter som er verdt å selge."},
            {"title": "Nullpunktsanalyse", "body": "Hvor mye må vi selge for å gå i null? Faste kostnader delt på dekningsbidrag per enhet. Eksempel: faste kostnader 1 mill, dekningsbidrag 100 kr/enhet → må selge 10 000 enheter for å gå i null."},
            {"title": "Budsjettering", "body": "Planlegging av fremtidige inntekter og kostnader. Resultatbudsjett (lønnsomhet), likviditetsbudsjett (kontanter), investeringsbudsjett (anleggsmidler). Alle tre må stemme — kan være lønnsom, men gå konkurs av likviditetsmangel."},
            {"title": "Likviditetsstyring", "body": "Sikre at bedriften alltid har penger til å betale regninger. Kunder som betaler sent + leverandører som krever rask betaling = likviditetskrise selv om regnskapet ser bra ut. Cash is king — også for vekstbedrifter."},
            {"title": "Investeringsanalyse", "body": "Er det lønnsomt å starte dette prosjektet? Nåverdimetoden (NPV), internrente, payback-periode. Tidsverdien av penger er sentralt: 100 kr i dag er verdt mer enn 100 kr om fem år."},
            {"title": "Nøkkeltall", "body": "Rentabilitet (avkastning på investert kapital), likviditet (evne til å betale løpende), soliditet (egenkapital som andel av totalkapital). Nøkkeltall gir rask vurdering av økonomisk helse."},
            {"title": "Case — Norwegians regnskap 2019 vs. 2020", "body": "Norwegian rapporterte rekordtall i 2019 — sterk vekst, ekspansjon. Likviditet var imidlertid sterkt presset. Pandemien i 2020 senket etterspørselen, og Norwegian måtte til skifteretten — selv om regnskapet året før så bra ut. Likviditet er konge."},
            {"title": "Hvorfor må markedsføreren forstå tall?", "body": "Uten økonomisk kontroll dør selv den beste markedsstrategi. Markedsføring som ikke kan begrunnes med tall, mister først budsjett — så stemme i ledelsen — så plass."},
        ],
        "quiz": [
            {"question": "Hva er dekningsbidrag?", "options": ["Total inntekt fra salget", "Salgspris minus variable kostnader", "Forskjell på pris og selvkost", "Bedriftens overskudd etter skatt"], "correct": 1},
            {"question": "Hva er nullpunkt?", "options": ["Når bedriften går konkurs", "Punktet der inntekter og totale kostnader er like — verken tap eller fortjeneste", "Når lageret er tomt", "Når reklamebudsjettet er brukt opp"], "correct": 1},
            {"question": "Hvorfor er likviditetsstyring kritisk?", "options": ["Det er lovpålagt", "En bedrift kan være lønnsom på papiret, men gå konkurs av mangel på kontanter", "Det er enklere enn regnskap", "Det måler reklameeffekt"], "correct": 1},
        ],
    },
    {
        "filename": "MarkedsplanenPresentation",
        "presentation_name": "Markedsplanen",
        "subject_label": "ML2 · Visjon 2",
        "title_line1": "Markeds-",
        "title_line2": "planen",
        "subtitle": "Veikartet til suksess — det styringsdokumentet som binder sammen analyse, mål, strategi, tiltak og budsjett.",
        "chapter_label": "Kapittel 17",
        "slides": [
            {"title": "Hva er en markedsplan?", "body": "Et styringsdokument som samler analyse, mål og tiltak for ett år. Brukt riktig: kompass og målbevis for hele organisasjonen. Brukt feil: et dokument i en skuff ingen leser."},
            {"title": "Situasjonsanalysen (SWOT)", "body": "Hvor er vi nå? Indre arbeidsbetingelser (styrker/svakheter), ytre arbeidsbetingelser (muligheter/trusler). Grunnlaget for alle videre valg — uten ærlig analyse blir resten skinnplanlegging."},
            {"title": "Målsetting", "body": "Hvor skal vi? SMART-mål (Spesifikt, Målbart, Ambisiøst, Realistisk, Tidsbestemt). «Øke markedsandelen i Trondheim fra 12 % til 18 % innen 31.12» er SMART. «Vokse litt» er det ikke."},
            {"title": "Strategivalg (STP)", "body": "Hvem skal vi satse på, og hvordan skille oss ut? Valg av segmenter, målgruppestrategi (udifferensiert/differensiert/konsentrert), posisjonering. Strategien er broen mellom mål og tiltak."},
            {"title": "Handlingsplan (markedsmiksen)", "body": "Hva skal vi gjøre konkret? Detaljert beskrivelse av tiltak innen produkt, pris, plass, kommunikasjon (og folk i tjenestebedrifter). Hvert tiltak må knyttes til ansvarlig person og frist."},
            {"title": "Budsjett", "body": "Hva vil det koste, og hva forventer vi å tjene? Kostnader per tiltak. Forventet inntekts-effekt. ROI-beregning. Ledelsen vil se tall — ikke bare ord."},
            {"title": "Oppfølging og kontroll", "body": "Hvordan skal vi måle om vi lykkes? KPI-er definert per mål. Rapporteringsfrekvens (månedlig/kvartalsvis). Hvem rapporterer hva til hvem. Avviksanalyse: hvorfor ble det annerledes enn planlagt?"},
            {"title": "Implementering", "body": "Hvordan få planen ut i livet og engasjere organisasjonen? Internkommunikasjon, opplæring, ansvarsfordeling. Mange planer dør fordi de aldri kommer ut av møterommet og inn i hverdagen."},
            {"title": "Case — Tine sin årlige markedsplan", "body": "Tine lager årlig markedsplan med konkrete mål per produktkategori (yoghurt, ost, drikke). Hver plan inkluderer historisk analyse, markedsmål, kampanjeplaner, lanseringer og budsjett. Følges opp månedlig — og avvik utløser konkrete tiltak."},
            {"title": "Hvorfor er markedsplanen så viktig?", "body": "Markedsplanen er det viktigste verktøyet for en markedsleder. Den binder strategi til handling, gir alle samme retning, og gjør markedsføring til forretningsdisiplin — ikke kreativ aktivitet."},
        ],
        "quiz": [
            {"question": "Hva er hovedhensikten med en markedsplan?", "options": ["Å imponere ledelsen", "Et styringsdokument som samler analyse, mål og tiltak for én periode", "Å erstatte regnskapet", "Å øke reklamebudsjettet"], "correct": 1},
            {"question": "Hva er SMART-mål?", "options": ["Smarte ideer fra ledelsen", "Spesifikt, Målbart, Ambisiøst, Realistisk, Tidsbestemt", "Strategi, Marked, Aktivitet, Resultat, Tiltak", "Salg, Markedsføring, Administrasjon, Regnskap, Tilbakemelding"], "correct": 1},
            {"question": "Hvorfor mislykkes mange markedsplaner?", "options": ["De er for korte", "De er for ambisiøse", "De kommer aldri ut av møterommet og inn i hverdagen", "De har for høye budsjetter"], "correct": 2},
        ],
    },
]


def main():
    print("Writing ML2 batch (17 presentations):")
    for p in ML2:
        write_presentation(p)


if __name__ == "__main__":
    main()
