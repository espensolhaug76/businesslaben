#!/usr/bin/env python3
"""Generate presentation .tsx files using PresentationShell.
Now generating ENT1 batch (10 presentations from EB1).
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


def jsx_safe(s: str) -> str:
    """Escape characters that JSX would mis-parse. Generator never emits real JSX
    tags in body strings, so blind &lt;/&gt; replacement is safe here."""
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def slide_jsx(idx: int, label: str, title: str, body: str, image_url: str) -> str:
    layout_left_img = idx % 2 == 1
    img = f"<SlideImg src=\"{image_url}\" alt=\"{esc(title)}\" />"
    text_block = (
        f"        <div>\n"
        f"          <SlideLabel>{jsx_safe(label)}</SlideLabel>\n"
        f"          <h2 style={{{{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}}}>\n"
        f"            {jsx_safe(title)}\n"
        f"          </h2>\n"
        f"          <p style={{bodyText}}>\n"
        f"            {jsx_safe(body)}\n"
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
        f"        <SlideLabel>{jsx_safe(label)}</SlideLabel>\n"
        f"        <h2 style={{{{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}}}>\n"
        f"          {jsx_safe(title)}\n"
        f"        </h2>\n"
        f"        <p style={{{{ ...bodyText, fontSize: 20 }}}}>\n"
        f"          {jsx_safe(body)}\n"
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


# ── ENT1 BATCH (10 chapters from EB1) ────────────────────────────────────────

ENT1 = [
    {
        "filename": "InnovatorenOgEntreprenorenPresentation",
        "presentation_name": "Innovatøren og entreprenøren",
        "subject_label": "ENT1 · EB1",
        "title_line1": "Innovatøren",
        "title_line2": "og entreprenøren",
        "subtitle": "Fra idé til virkelighet — hvem starter for seg selv, hvorfor, og hva skiller en gründer fra en ansatt.",
        "chapter_label": "Kapittel 1",
        "slides": [
            {"title": "Hva er entreprenørskap?", "body": "Å identifisere muligheter og mobilisere ressurser for å skape verdi — økonomisk, sosialt eller kulturelt. Entreprenørskap handler ikke bare om å starte bedrifter, men om en arbeidsmåte og holdning til problemløsning."},
            {"title": "Innovasjonstyper", "body": "Joseph Schumpeter identifiserte fire typer: produktinnovasjon (ny vare), prosessinnovasjon (ny måte å lage på), markedsinnovasjon (ny måte å selge på) og organisasjonsinnovasjon (ny struktur). Apple kombinerer ofte alle fire."},
            {"title": "Egenskaper hos en gründer", "body": "Forskning peker på fire kjerneegenskaper: utholdenhet (slå seg gjennom motgang), risikovilje (tåle usikkerhet), kreativitet (se nye løsninger) og sosiale ferdigheter (selge ideen til andre). Ingen er født med alt — det meste kan trenes."},
            {"title": "Intraprenørskap", "body": "Innovasjon innad i eksisterende bedrifter. Ansatte som tenker som gründere, men har ressursene og sikkerheten i en stor organisasjon. 3M sin Post-it kom fra et intraprenørskapsprosjekt — ansatte fikk 15 % av tiden til egne prosjekter."},
            {"title": "Verdiskaping", "body": "Tre former: økonomisk verdi (overskudd, lønninger, skatt), sosial verdi (samfunnsnytte, jobber, folkehelse) og kulturell verdi (opplevelser, mangfold, identitet). Bedrifter skaper alle tre — ofte samtidig."},
            {"title": "Entreprenørskap i Norge", "body": "Norge har gode rammevilkår: stabilt politisk system, godt utdannet befolkning, sterke støtteordninger via Innovasjon Norge. Likevel er småbedrifters andel av sysselsettingen lavere enn i USA og Sverige."},
            {"title": "Bærekraftig entreprenørskap", "body": "Å løse sosiale eller miljømessige utfordringer gjennom en forretningsmodell. Tomra (resirkulering), Allmenn Praksis (tilgjengelig helse), Kahoot (digital læring) — bedrifter bygget rundt et samfunnsproblem."},
            {"title": "Feiling som læring", "body": "«Fail fast, learn faster.» Silicon Valley feirer feilsuksess fordi de fleste vellykkede gründere har minst én konkurs i bagasjen. Hver feil gir dyrebar læring som neste forsøk drar nytte av."},
            {"title": "Case — Erna Solberg som intraprenør", "body": "Da Erna Solberg ble Høyre-leder, drev hun en form for intraprenørskap: hentet nye velgergrupper, modernisert kommunikasjon, fornyet politikken. Hun var ikke gründer, men endret partiet innenfra — det er essensen i intraprenørskap."},
            {"title": "Hva er kjernen i entreprenørskap?", "body": "Entreprenørskap er en arbeidsmåte og en holdning til problemløsning. Det handler mer om å se muligheter og handle enn om å starte bedrift — du kan være entreprenør i et stort selskap, en kommune eller en frivillig organisasjon."},
        ],
        "quiz": [
            {"question": "Hvilke fire innovasjonstyper definerte Joseph Schumpeter?", "options": ["Liten, mellomstor, stor og global", "Produkt, prosess, marked og organisasjon", "Vekst, modning, tilbakegang og død", "Lokal, regional, nasjonal og internasjonal"], "correct": 1},
            {"question": "Hva er intraprenørskap?", "options": ["Internasjonal entreprenørskap", "Innovasjon innad i eksisterende bedrifter", "Internett-bedrifter", "Investering i andre gründere"], "correct": 1},
            {"question": "Hva er kjernen i 'fail fast, learn faster'?", "options": ["Å mislykkes raskest mulig", "Å lære av feil og bruke den læringen i neste forsøk", "Å ikke ta sjanser", "Å bare prøve én gang"], "correct": 1},
        ],
    },
    {
        "filename": "KreativitetIdeutviklingPresentation",
        "presentation_name": "Kreativitet og idéutvikling",
        "subject_label": "ENT1 · EB1",
        "title_line1": "Kreativitet",
        "title_line2": "og idéutvikling",
        "subtitle": "Kunsten å tenke nytt — teknikker som hjelper deg fra hvit ark til konkret forretningsidé.",
        "chapter_label": "Kapittel 2",
        "slides": [
            {"title": "Hva er kreativitet?", "body": "Evnen til å skape noe som er både nytt og nyttig i en gitt kontekst. Bare nytt = ubrukelig kunst. Bare nyttig = standardvare. Kreativitet er kombinasjonen — og den kan trenes opp."},
            {"title": "Kreative prosesser", "body": "Forberedelse (samle materiale), inkubasjon (la underbevisstheten jobbe), illuminasjon (aha-opplevelsen), verifikasjon (test og videreutvikle). Mange tror kreativitet bare er punkt 3, men de andre er like viktige."},
            {"title": "Idémyldring (brainstorming)", "body": "Tre regler: ingen kritikk under idéfasen, kvantitet foran kvalitet, og bygg videre på andres ideer. Klassisk i grupper, men også effektiv individuelt — sett en timer på 15 minutter og skriv ned alt."},
            {"title": "SCAMPER-metoden", "body": "Sjekkliste for å transformere eksisterende ideer: Substitute (bytte ut), Combine (kombinere), Adapt (tilpasse), Modify (modifisere), Put to another use (annet bruk), Eliminate (fjerne), Reverse (snu). En time med SCAMPER gir ofte 50+ varianter."},
            {"title": "Design Thinking", "body": "Brukersentrert metode i fem faser: empati (forstå brukeren), definere (klart problem), idéutvikling, prototype, testing. Brukt av Apple, IDEO og Stanford d.school. Tester alltid med ekte brukere før investering."},
            {"title": "Fra idé til mulighet", "body": "Vurder om ideen løser et faktisk problem for en betalingsvillig målgruppe. Tre spørsmål: Er problemet reelt? Er målgruppen stor nok? Er de villige til å betale? Hvis ett svaret er nei, går du tilbake til tegnebrettet."},
            {"title": "Kreativitetens fiender", "body": "Frykt for å «drite seg ut» (selvkritikk), rutine-tenkning («slik gjør vi det her») og for tidlig evaluering («det vil aldri funke»). Sterke kulturer i bedrifter kan kvele kreativitet i fødselen."},
            {"title": "Prototype", "body": "En enkel modell av produktet for å teste funksjon og få tilbakemelding tidlig. Trenger ikke være perfekt — papirskisser, Lego-modeller eller PowerPoint-mockup gir mer læring per krone enn ferdige prototyper."},
            {"title": "Case — Airbnb sin kreative reise", "body": "Brian Chesky og Joe Gebbia kunne ikke betale husleia i 2007. De blåste opp luftmadrasser og leide ut til konferansegjester. Det enkle prototypen ble til Airbnb — verdt 100+ milliarder dollar i dag. Stor idé født av lite problem."},
            {"title": "Kan kreativitet trenes?", "body": "Alle kan trene opp sin kreativitet gjennom teknikker og riktig miljø. Det er ingen «kreativ gen» — det er øvelse, eksponering for mange ideer, og en kultur som tør å feile."},
        ],
        "quiz": [
            {"question": "Hva er en god regel for idémyldring?", "options": ["Vurder hver idé nøye før neste", "Ingen kritikk under idéfasen — kvantitet foran kvalitet", "Bare ledere får komme med ideer", "Alle ideer må være realistiske"], "correct": 1},
            {"question": "Hva står S i SCAMPER for?", "options": ["Sale", "Strategy", "Substitute (bytte ut)", "Solve"], "correct": 2},
            {"question": "Hvorfor er prototyper viktige?", "options": ["For å imponere investorer", "For å teste funksjon og få tilbakemelding tidlig — billig læring", "For å ferdigstille produktet", "For å patentere ideen"], "correct": 1},
        ],
    },
    {
        "filename": "BehovMarkedSegmenteringPresentation",
        "presentation_name": "Behov, marked og segmentering",
        "subject_label": "ENT1 · EB1",
        "title_line1": "Behov",
        "title_line2": "og marked",
        "subtitle": "Finn din plass i markedet — kjenn kunden bedre enn du kjenner deg selv.",
        "chapter_label": "Kapittel 3",
        "slides": [
            {"title": "Kundebehov", "body": "Maslows behovspyramide brukes for å forstå hva som driver kunden til kjøp. De fleste produkter dekker mer enn ett nivå — en sportsbil dekker både transport (fysiologi) og status (anerkjennelse)."},
            {"title": "Markedet", "body": "Summen av potensielle kunder som har et behov OG evne til å betale. En gründer må kunne kvantifisere markedet: antall potensielle kunder × gjennomsnittlig forbruk = total adresserbar marked (TAM)."},
            {"title": "Segmentering", "body": "Oppdeling av markedet i mindre grupper med fellestrekk. Fire vanlige kriterier: demografi (alder, kjønn, inntekt), geografi (sted), psykografi (livsstil, verdier) og atferd (lojalitet, bruksmønster)."},
            {"title": "Målgruppevalg", "body": "Velg de mest attraktive segmentene for bedriftens ressurser. En gründer kan ikke betjene alle — fokus på ett segment gir bedre resultater enn å spre seg tynt utover hele markedet."},
            {"title": "Posisjonering", "body": "Hvordan du ønsker at kunden skal oppfatte bedriften sammenlignet med konkurrentene. «Den raskeste», «den billigste», «den mest miljøvennlige» — én tydelig posisjon er bedre enn å være alt for alle."},
            {"title": "Markedsundersøkelser", "body": "Enkle metoder for oppstartsbedrifter: 10–20 dybdeintervjuer med potensielle kunder, observasjon av eksisterende løsninger, og enkle digitale spørreskjemaer. Trenger ikke være store undersøkelser — innsikten teller."},
            {"title": "Konkurrentanalyse", "body": "Hvem er de andre, og hva er deres styrker og svakheter? Lag en enkel matrise: konkurrenter på radene, dimensjoner (pris, kvalitet, service, brand) på kolonnene. Hvor er det åpning for deg?"},
            {"title": "Verdiløfte (Value Proposition)", "body": "Den unike fordelen kunden får ved å velge akkurat deg. Skal kunne forklares på 30 sekunder, og må være forskjellig nok fra konkurrentene til at kunden faktisk velger annerledes."},
            {"title": "Case — Kahoot sin målgruppe", "body": "Kahoot kunne valgt mange målgrupper: bedrifter, konferanser, familier. De valgte lærere — én klar målgruppe, ett tydelig behov (engasjerende undervisning). Fokus ga eksplosiv vekst — først blant lærere, så ekspansjon til andre segmenter."},
            {"title": "Hvorfor må du kjenne kunden?", "body": "Kjenn din kunde bedre enn du kjenner deg selv. Gründere som baserer seg på antakelser i stedet for kundekontakt, ender ofte med produkter ingen vil ha — uansett hvor smart løsningen er teknisk."},
        ],
        "quiz": [
            {"question": "Hva er kjernen i et marked?", "options": ["Alle som har internett", "Summen av potensielle kunder som har et behov OG evne til å betale", "Alle som kjenner produktet", "Alle i Norge"], "correct": 1},
            {"question": "Hva er en god strategi for en oppstartsbedrift?", "options": ["Selge til alle samtidig", "Velge ett tydelig segment og fokusere", "Vente til markedet er stort nok", "Ha minst tre forskjellige produkter"], "correct": 1},
            {"question": "Hva er et verdiløfte (Value Proposition)?", "options": ["En garanti for kvaliteten", "Den unike fordelen kunden får ved å velge nettopp deg", "Et reklamebudsjett", "En pris-rabatt"], "correct": 1},
        ],
    },
    {
        "filename": "ForretningsmodellBmcPresentation",
        "presentation_name": "Forretningsmodellen (BMC)",
        "subject_label": "ENT1 · EB1",
        "title_line1": "Forretnings-",
        "title_line2": "modell-lerretet",
        "subtitle": "Visualisering av din bedrift — Business Model Canvas på én side.",
        "chapter_label": "Kapittel 4",
        "slides": [
            {"title": "Hva er en forretningsmodell?", "body": "En beskrivelse av hvordan bedriften skaper, leverer og kaprer verdi. Forretningsmodellen forklarer logikken bak hvordan bedriften tjener penger — uavhengig av selve produktet."},
            {"title": "Kundesegmenter og verdiløfte", "body": "Kjernen i Business Model Canvas: Hvem hjelper vi (kundesegmenter), og med hva (verdiløfte)? Disse to byggestenene må passe perfekt sammen — ellers kollapser hele modellen."},
            {"title": "Kanaler og kunderelasjoner", "body": "Kanaler: hvordan vi når kunden (nettbutikk, butikk, partnere). Kunderelasjoner: hvordan vi beholder kontakten (selvbetjening, personlig hjelp, abonnement). Sammen styrer de kundeopplevelsen."},
            {"title": "Inntektsstrømmer", "body": "Hvordan skal vi faktisk få betalt? Salg av produkt, abonnement, leie/leasing, lisensiering, reklame, megling. De fleste vellykkede bedrifter har flere inntektsstrømmer for å spre risiko."},
            {"title": "Nøkkelressurser og nøkkelaktiviteter", "body": "Ressurser: hva vi MÅ ha (mennesker, fysiske midler, immaterielle rettigheter, kapital). Aktiviteter: hva vi MÅ gjøre hver dag (produksjon, salg, service). Definerer hva som ikke kan settes ut."},
            {"title": "Nøkkelpartnere", "body": "Hvem må vi samarbeide med for å lykkes? Leverandører, allianser, joint ventures. Strategiske partnerskap kan være forskjellen på å klare alt selv (dyrt og sakte) eller skalere raskt."},
            {"title": "Kostnadsstruktur", "body": "Hva er de største utgiftene våre? Faste kostnader (lokale, lønninger) vs. variable kostnader (råvarer, frakt). Forstå strukturen — det avgjør hvor sårbar du er ved svingninger i salget."},
            {"title": "Lean Startup og pivot", "body": "Bruk BMC til å teste hypoteser. Hver byggesten er en antakelse — test den med ekte kunder. Hvis antakelsen feiler, må du «pivotere» (endre retning). Snapchat startet som geo-tagged bilder før de pivoterte til selvslettende meldinger."},
            {"title": "Case — Spotify sin BMC", "body": "Kundesegment: musikkfans. Verdiløfte: ubegrenset musikk billig. Kanaler: app, web. Inntekter: abonnement + reklame. Ressurser: musikkrettigheter. Partnere: plateselskaper. BMC visualiserer hele modellen på én side — gjør det enkelt å se sammenhengene."},
            {"title": "Hvorfor er BMC nyttig?", "body": "BMC er et levende dokument som utvikler seg med bedriften. På én side ser du hvordan alle delene henger sammen — og endrer du én del, ser du raskt om resten fortsatt fungerer."},
        ],
        "quiz": [
            {"question": "Hva står BMC for?", "options": ["Business Marketing Channel", "Business Model Canvas", "Best Marketing Communication", "Brand Management Cycle"], "correct": 1},
            {"question": "Hva er kjernen i en god forretningsmodell?", "options": ["Lavest mulig pris", "Verdiløfte som matcher et reelt kundesegment", "Mest mulig reklame", "Største produktportefølje"], "correct": 1},
            {"question": "Hva er en pivot?", "options": ["En type investor", "En endring av retning når antakelsene viser seg å være feil", "Et juridisk dokument", "En type forretningsmodell"], "correct": 1},
        ],
    },
    {
        "filename": "EtableringSelskapsformerPresentation",
        "presentation_name": "Etablering og selskapsformer",
        "subject_label": "ENT1 · EB1",
        "title_line1": "Etablering",
        "subtitle": "Fra idé til juridisk enhet — selskapsformer, registrering og første praktiske steg.",
        "chapter_label": "Kapittel 5",
        "slides": [
            {"title": "Valg av selskapsform", "body": "Enkeltpersonforetak (ENK) vs. Aksjeselskap (AS) er hovedvalget. ENK er enkelt og billig, men gir personlig ansvar. AS gir begrenset ansvar, men krever 30 000 kr i aksjekapital og mer formalitet."},
            {"title": "Aksjeselskap (AS)", "body": "Krav: minst 30 000 kr i aksjekapital, registrert styre, revisor (over visse grenser). Begrenset ansvar — eierne risikerer kun aksjekapitalen, ikke privat formue. Du kan jobbe som ansatt i ditt eget AS."},
            {"title": "Enkeltpersonforetak (ENK)", "body": "Lav etableringsterskel: kun registrering i Brønnøysund (gratis i Foretaksregisteret). Men: fullt personlig ansvar for gjeld og forpliktelser. Bedriften = du. Banken kan ta huset hvis det går galt."},
            {"title": "Registreringsprosessen", "body": "Samordnet registermelding via Altinn — én utfylling registrerer deg i alle relevante registre (Foretaksregisteret, Enhetsregisteret, MVA hvis omsetning > 50 000). Får organisasjonsnummer på dagen ofte."},
            {"title": "Navn og merkevare", "body": "Foretaksnavnet må være unikt i Norge (sjekk på Brønnøysund). Vil du beskytte logo og merke, må du registrere varemerke hos Patentstyret. Internasjonalt kan beskyttelsen utvides via WIPO."},
            {"title": "Skatter og avgifter", "body": "Mva-registeret kreves når omsetningen passerer 50 000 kr/år (årlig). Skattetrekk: 15 % forskuddsskatt for ENK, AS-eiere får utbytte med 35,2 % skatt. Arbeidsgiveravgift om du har ansatte."},
            {"title": "Forsikringer", "body": "Yrkesskadeforsikring er lovpålagt for alle ansatte. Ansvarsforsikring beskytter bedriften mot erstatningskrav fra kunder. Pensjonsordning (OTP) er pålagt fra 1 ansatt med over 20 % stilling."},
            {"title": "Avtaler mellom gründere", "body": "Aksjonæravtale er gull verdt før konflikten oppstår. Regulerer hvem som bestemmer hva, hvordan utbytter fordeles, hva som skjer hvis en gründer slutter eller dør. Mange gründere venter til det er for sent."},
            {"title": "Case — To gründere uten aksjonæravtale", "body": "To venner startet sammen, eide 50/50, ingen avtale. Etter to år ville den ene satse alt, den andre ville selge. Resultat: rettssak i tre år, bedriften gikk konkurs underveis. En aksjonæravtale på 10 000 kr ville unngått alt sammen."},
            {"title": "Hvilken form skal du velge?", "body": "Velg form som gir nødvendig trygghet og rom for vekst. Ikke overinvester i AS hvis du tester en sideforretning — ENK er ofte rett start. Vurder å bytte til AS når omsetningen vokser."},
        ],
        "quiz": [
            {"question": "Hva er hovedforskjellen på ENK og AS?", "options": ["AS er for store bedrifter, ENK for små", "ENK gir personlig ansvar, AS gir begrenset ansvar (kun aksjekapitalen)", "AS er bare for industri", "ENK krever flere ansatte"], "correct": 1},
            {"question": "Hvor mye aksjekapital må et AS ha minimum?", "options": ["10 000 kr", "30 000 kr", "100 000 kr", "1 million kr"], "correct": 1},
            {"question": "Når må man være registrert i mva-registeret?", "options": ["Fra første salg", "Når omsetningen passerer 50 000 kr per år", "Bare ved B2B-salg", "Aldri for små bedrifter"], "correct": 1},
        ],
    },
    {
        "filename": "FinansieringTilskuddPresentation",
        "presentation_name": "Finansiering og tilskudd",
        "subject_label": "ENT1 · EB1",
        "title_line1": "Finansiering",
        "subtitle": "Kapital til oppstarten — fra egne sparepenger til engleinvestorer.",
        "chapter_label": "Kapittel 6",
        "slides": [
            {"title": "Kapitalbehov", "body": "Hvor mye penger trenger vi før vi begynner å tjene penger? Beregn likviditetsbehovet måned for måned: lønn, husleie, utstyr, markedsføring, mva. Mange undervurderer behovet og må hente nye penger i en svak posisjon."},
            {"title": "Egenkapital", "body": "Penger gründerne selv spytter inn eller henter fra venner og familie («love money»). Risiko deles ofte med personlige relasjoner — sørg for klare avtaler selv med mor og far. Egenkapital signaliserer commitment til andre investorer."},
            {"title": "Lån og kreditt", "body": "Banklån (krever sikkerhet og personlig garanti for små bedrifter), kassekreditt (fleksibilitet på løpende konto), leverandørkreditt (utsatt betaling). Banker er konservative — de vil sjelden finansiere ren oppstartsrisiko."},
            {"title": "Offentlige tilskudd", "body": "Innovasjon Norge tilbyr markedsavklaringstilskudd (opp til 100 000 kr), kommersialiseringstilskudd og lån. Forskningsrådet finansierer FoU. Søknadsprosessen er omfattende — men gratis penger er verdt arbeidet."},
            {"title": "Crowdfunding (folkefinansiering)", "body": "Hente små beløp fra mange mennesker via plattformer som Kickstarter, Indiegogo eller norske Folkeinvest. Gir både penger og første kundebase samtidig — perfekt validering av produktidé."},
            {"title": "Business Angels (engleinvestorer)", "body": "Private investorer som bidrar med både kapital (typisk 500 000 — 5 millioner) og kompetanse. De forventer ofte 10–30 % eierandel og aktiv styreplass. Bra for bedrifter som trenger mer enn penger."},
            {"title": "Bootstrapping", "body": "Drive for egne midler uten ekstern kapital. Fokus på lav kostnad og rask inntjening. Mange suksesser startet bootstrapped (Mailchimp, GitHub, Basecamp) — gir full kontroll, men begrenser veksttakten."},
            {"title": "Pitching for kapital", "body": "Hvordan presentere ideen for å overbevise investorer. Standard pitch er 3–10 minutter: problem, løsning, marked, forretningsmodell, team, traksjon, behov. Øv mange ganger — du får bare ett møte per investor."},
            {"title": "Case — No Isolation sin reise", "body": "No Isolation lager teknologi mot ensomhet (AV1-roboten for kronisk syke barn). Startet med crowdfunding (validering + penger), så Innovasjon Norge (utvikling), deretter venture capital (skalering). Klassisk kapitaltrappestige fra idé til vekst."},
            {"title": "Hva gir riktig finansiering?", "body": "Riktig finansiering gir bedriften nødvendig «runway» til å ta av — tid til å bevise modellen før pengene tar slutt. For lite penger gir desperate beslutninger; for mye gir slappe vaner."},
        ],
        "quiz": [
            {"question": "Hva er 'love money'?", "options": ["Penger fra romantiske partnere", "Investeringer fra venner og familie", "Sponsorpenger fra bedrifter", "Penger fra crowdfunding"], "correct": 1},
            {"question": "Hva er typisk for engleinvestorer?", "options": ["De gir kun lån", "Bidrar med kapital og kompetanse, forventer 10–30 % eierandel", "Krever full eierkontroll", "Kun for store bedrifter"], "correct": 1},
            {"question": "Hva er bootstrapping?", "options": ["En crowdfunding-plattform", "Drive for egne midler uten ekstern kapital", "En bestemt forretningsmodell", "Et statlig støtteprogram"], "correct": 1},
        ],
    },
    {
        "filename": "OkonomiskPlanleggingBudsjettPresentation",
        "presentation_name": "Økonomisk planlegging og budsjett",
        "subject_label": "ENT1 · EB1",
        "title_line1": "Økonomisk",
        "title_line2": "planlegging",
        "subtitle": "Kontroll på kronene — budsjett, dekningsbidrag og likviditet for nye gründere.",
        "chapter_label": "Kapittel 7",
        "slides": [
            {"title": "Hvorfor budsjettere?", "body": "Forutsi fremtiden, styre driften, dokumentere behov for kapital. Et godt budsjett gir deg svar før spørsmålene oppstår — banken, investorer, deg selv. Det er strategi i tallform."},
            {"title": "Resultatbudsjett", "body": "Planlagt inntekt minus planlagte kostnader over en periode (typisk ett år). Viser om bedriften vil gå med overskudd. Kunst: ikke være for optimistisk — pessimistiske scenarioer gir mer realistisk planlegging."},
            {"title": "Likviditetsbudsjett", "body": "Oversikt over innbetalinger og utbetalinger måned for måned. Har vi penger i kassa til å betale regninger? Mange lønnsomme bedrifter går konkurs av likviditetskrise — du kan ikke betale lønn med fakturaer."},
            {"title": "Faste og variable kostnader", "body": "Faste: uavhengige av salg (husleie, fastlønn). Variable: følger salget (råvarer, provisjon). Forstå skillet — det er nøkkelen til alle videre lønnsomhetsberegninger."},
            {"title": "Nullpunktanalyse", "body": "Hvor mye må vi selge for å gå i null? Faste kostnader / dekningsbidrag per enhet. Eksempel: 200 000 kr i faste kostnader / 100 kr dekningsbidrag = 2 000 enheter. Hvis du tror du selger 1 500, er det røde lys."},
            {"title": "Dekningsbidrag", "body": "Salgspris minus variable kostnader. Hva sitter vi igjen med per solgte enhet til å dekke faste kostnader og fortjeneste? Selger du for 200 og det koster 80 i råvarer, er DB 120 — det er pengene du har å jobbe med."},
            {"title": "Prissetting i oppstarten", "body": "Selvkostmetoden: alle kostnader + påslag for fortjeneste (rasjonelt, men kan undervurdere markedsverdi). Markedsbasert prissetting: hva er kunden villig til å betale (riktigere, men krever testing)."},
            {"title": "Økonomisk kontroll", "body": "Sammenlign budsjett mot faktiske tall hver måned. Avvik gir signal: revider budsjettet, eller endre driften. Mange gründere lager budsjett én gang og ignorerer det — det er sløsing av tid."},
            {"title": "Case — Kahoots tidlige budsjett", "body": "Kahoot startet med begrenset kapital. Stram likviditetsstyring (cash burn) ble fulgt månedlig — én forsinket investering kunne tatt livet av selskapet i tidlig fase. God økonomistyring var like viktig som produktet."},
            {"title": "Hvorfor er økonomistyring kritisk?", "body": "God økonomistyring er forskjellen på suksess og konkurs. Bedriften kan ha en fantastisk idé, godt team og lojale kunder — men hvis pengene tar slutt, er alt over."},
        ],
        "quiz": [
            {"question": "Hva er et likviditetsbudsjett?", "options": ["Plan for forventet overskudd", "Oversikt over innbetalinger og utbetalinger måned for måned", "Plan for hvor mye vi vil tjene", "Antall ansatte budsjett"], "correct": 1},
            {"question": "Hva er nullpunkt?", "options": ["Punktet der du går konkurs", "Punktet der inntekter dekker totale kostnader — verken tap eller fortjeneste", "Når lageret er tomt", "Når kapitalen er brukt opp"], "correct": 1},
            {"question": "Hvorfor går mange lønnsomme bedrifter konkurs?", "options": ["De har for store overskudd", "Likviditetskrise — fakturaer kan ikke betale lønn", "Loven krever det", "De vokser for sakte"], "correct": 1},
        ],
    },
    {
        "filename": "MarkedsforingSalgNystartedePresentation",
        "presentation_name": "Markedsføring og salg for nystartede",
        "subject_label": "ENT1 · EB1",
        "title_line1": "Markedsføring",
        "title_line2": "for nystartede",
        "subtitle": "Nå ut til de første kundene når merkevaren er ukjent og budsjettet lite.",
        "chapter_label": "Kapittel 8",
        "slides": [
            {"title": "Guerilla Marketing", "body": "Kreativ markedsføring med lavt budsjett — skape oppmerksomhet uten dyre annonser. Stunts, gateteater, viral video, uvanlige plasseringer. Kahoot ble kjent ved å gi det gratis til lærere — som så solgte det videre til skolene sine."},
            {"title": "Sosiale medier for gründere", "body": "Bygge fellesskap og dialog med kundene gjennom TikTok, Instagram, LinkedIn. Velg én eller to plattformer der målgruppen er, ikke prøv å være overalt. Konsistens er viktigere enn frekvens."},
            {"title": "Innholdsmarkedsføring", "body": "Del kunnskap som er nyttig for kunden for å bygge tillit. Gründer-blogger, video-tutorials, gratis e-bøker. «Hjelp, ikke selg» — over tid blir du den foretrukne eksperten."},
            {"title": "Personlig salg", "body": "Den viktigste kanalen for nystartede. «Banking on doors» — direkte kontakt med potensielle kunder. Hver salgssamtale gir læring om hva som virker og hva som ikke virker. Outsource ikke salget — som gründer må DU selge selv først."},
            {"title": "Referansemarkedsføring", "body": "Bruk fornøyde kunder for å skaffe nye (Word of Mouth). Anbefalingen fra en venn er kraftigere enn alle annonser sammen. Be aktivt om henvisninger — de fleste fornøyde kunder anbefaler ikke uten å bli spurt."},
            {"title": "Nettverksbygging", "body": "Bruk eksisterende kontakter og delta på gründer-treff (StartupLab, MESH, Innovasjon Norge events). Mange forretningsmuligheter starter ved en samtale ved kaffemaskinen — ikke en LinkedIn-melding."},
            {"title": "Digital synlighet (SEO)", "body": "Sørg for at folk finner deg når de søker etter problemet du løser. Google Søkekonsoll, Google Analytics — gratis verktøy som forteller hva folk faktisk søker etter. Skriv innhold som svarer på de spørsmålene."},
            {"title": "Salgstrakt", "body": "Oppmerksomhet → interesse → vurdering → kjøp. Mål antall personer i hver fase. Hvis 1000 ser annonsen din, 100 klikker, 10 ber om demo, 1 kjøper — er konvertering 0,1 %. Tall som dette gjør markedsføringen styrbar."},
            {"title": "Case — Klarna sin gründerfase", "body": "Klarna brukte ikke betalt reklame i starten. De gikk direkte til nettbutikker og solgte fakturabetaling én og én. Når de fikk noen suksesser, brukte de dem som referanser for neste salg. Tre år med ren gründer-salg før de skalerte."},
            {"title": "Hvem er de første markedsførerne?", "body": "I starten er eierne de viktigste markedsførerne og selgerne. Ingen kjenner produktet bedre, ingen har sterkere insentiv. Outsourcing kommer senere — først må gründerne lære markedet selv."},
        ],
        "quiz": [
            {"question": "Hva er guerilla marketing?", "options": ["Aggressiv pressereklame", "Kreativ markedsføring med lavt budsjett — stunts, viral, uvanlige plasseringer", "Krigsmetafor i reklame", "Markedsføring kun via militære kanaler"], "correct": 1},
            {"question": "Hvorfor må gründeren selv selge i begynnelsen?", "options": ["Det er billigere", "Lærer mest om markedet og hva som virker — kan ikke outsources i tidlig fase", "Loven krever det", "Investorer krever det"], "correct": 1},
            {"question": "Hva er en salgstrakt?", "options": ["En fysisk butikkmodell", "Modell som måler konvertering: oppmerksomhet → interesse → vurdering → kjøp", "Et CRM-system", "En type rabatt"], "correct": 1},
        ],
    },
    {
        "filename": "LovverkAvtalerHmsPresentation",
        "presentation_name": "Lovverk, avtaler og HMS",
        "subject_label": "ENT1 · EB1",
        "title_line1": "Lovverk",
        "title_line2": "og HMS",
        "subtitle": "Sikkerhet og juridisk trygghet — rammene som beskytter bedriften og gjør vekst mulig.",
        "chapter_label": "Kapittel 9",
        "slides": [
            {"title": "Relevante lover", "body": "Avtaleloven (når er en avtale bindende?), kjøpsloven (B2B-handel), forbrukerkjøpsloven (B2C-handel) og markedsføringsloven (reklamens grenser). En gründer trenger ikke være jurist, men må kjenne grunnleggende regler."},
            {"title": "Kontrakter", "body": "Skriftlige avtaler med kunder, leverandører og ansatte. «Avtaler er bindende» selv om de er muntlige — men bevisbyrden er enorm. En enkel skriftlig kontrakt sparer deg for konflikter senere."},
            {"title": "Helse, miljø og sikkerhet (HMS)", "body": "Internkontrollforskriften krever at alle bedrifter har systematisk HMS-arbeid. Selv en énmannsbedrift må ha skrevne prosedyrer for risikovurdering, opplæring og oppfølging. Arbeidstilsynet kan kontrollere uanmeldt."},
            {"title": "Risikovurdering", "body": "Identifiser farer og iverksett tiltak for å forebygge ulykker eller sykdom. Fysiske farer (brann, fall), psykososiale (stress, mobbing), kjemiske (allergi). Skriv det ned — udokumentert HMS er som ingen HMS."},
            {"title": "Personvern (GDPR)", "body": "Regler for håndtering av kunde- og ansattopplysninger. Krev samtykke før innsamling, dokumenter formål, slett data når formålet er oppfylt. Brudd kan gi 4 % av global omsetning i bot — også for små bedrifter."},
            {"title": "Immaterielle rettigheter (IPR)", "body": "Beskyttelse av oppfinnelser (patent), design (designregistrering) og navn/logo (varemerke). Patent koster 50 000–500 000 kr og varer 20 år. Varemerke er billigere og varer evig så lenge det fornyes."},
            {"title": "Arbeidsgiveransvar", "body": "Plikter når du ansetter første medarbeider: skriftlig kontrakt, lønnsavregning, skattetrekk, arbeidsgiveravgift, OTP-pensjon, yrkesskadeforsikring, oppsigelsesvern. Bruk gjerne lønnssystem som Tripletex eller Conta."},
            {"title": "Etikk i entreprenørskap", "body": "Å gjøre det rette, selv når ingen ser på. Korrupsjon, misvisende reklame, urettferdig konkurranse — alt dette kan være lønnsomt på kort sikt, men ødelegger merkevaren og kan gi straffeforfølgelse på lang sikt."},
            {"title": "Case — Boligbygg-skandalen", "body": "Boligbygg Oslo måtte tilbakebetale millioner etter å ha brutt anskaffelsesreglene. Konsekvenser: rettssaker, ledelsens avgang, omdømmetap. Selv en offentlig aktør går ned hvis lovverket ikke følges. Privat sektor er ikke mindre sårbar."},
            {"title": "Hvorfor er orden viktig?", "body": "Orden i sysakene gir troverdighet og trygghet for vekst. Investorer, banker og store kunder forventer dokumentert HMS, GDPR-compliance og rene avtaler. Uten det stoppes mange dører — uansett hvor god ideen er."},
        ],
        "quiz": [
            {"question": "Hvilken lov regulerer alminnelig HMS i norske bedrifter?", "options": ["Markedsføringsloven", "Internkontrollforskriften", "Forbrukerkjøpsloven", "Aksjeloven"], "correct": 1},
            {"question": "Hva er den maksimale boten for GDPR-brudd?", "options": ["10 000 kr", "100 000 kr", "4 % av global omsetning eller 20 millioner euro", "Det er ingen bot for små bedrifter"], "correct": 2},
            {"question": "Hvorfor må man ha skriftlige kontrakter selv om muntlige er bindende?", "options": ["Loven krever det", "Bevisbyrden er enorm med kun muntlige avtaler — skriftlig sparer konflikter", "Det er kun krav i B2B", "Det er bare en god vane"], "correct": 1},
        ],
    },
    {
        "filename": "SamarbeidTeambyggingPresentation",
        "presentation_name": "Samarbeid og teambygging",
        "subject_label": "ENT1 · EB1",
        "title_line1": "Teamarbeid",
        "subtitle": "Sammen er vi sterkere — utfyllende kompetanse og god dynamikk er ofte viktigere enn ideen.",
        "chapter_label": "Kapittel 10",
        "slides": [
            {"title": "Hvorfor team?", "body": "Utfyllende kompetanse. Klassisk modell: «Hacker» (teknisk), «Hustler» (forretning) og «Hipster» (design). De fleste vellykkede oppstartsbedrifter har minst to gründere — én alene har sjelden alle ferdighetene som trengs."},
            {"title": "Team-modning (Tuckman)", "body": "Bruce Tuckmans fire faser: forming (oppstart, høflig), storming (konflikter, posisjoneringer), norming (regler etableres), performing (full effektivitet). Mange team gir opp i storming-fasen — det er normalt og må gjennomleves."},
            {"title": "Roller i teamet (Belbin)", "body": "Meredith Belbin identifiserte 9 team-roller: idéskaperen, iverksetteren, koordinatoren, analytikeren m.fl. Alle roller er nødvendige; team som mangler én rolle kompenserer dårlig. Belbin-test kan brukes for å analysere ditt team."},
            {"title": "Kommunikasjon i teamet", "body": "Åpenhet, aktiv lytting og konstruktiv tilbakemelding. Slack, Teams, Notion gjør den daglige kommunikasjonen lett — men ingen verktøy erstatter ærlige samtaler. Etablér rutiner for både formell og uformell kontakt."},
            {"title": "Konflikthåndtering", "body": "Hvordan løse uenigheter før de ødelegger bedriften. Lytt aktivt, fokuser på problemet (ikke personen), søk felles interesser, kompromiss eller mekling. Aksjonæravtalen (kap 5) er førstelinjeforsvar mot eskalering."},
            {"title": "Motivasjon", "body": "Indre motivasjon (mestring, mening) varer lenger enn ytre (lønn, bonus). Daniel Pinks bok «Drive» viser at autonomi, mestring og formål driver høy ytelse mer enn pengebelønning. Lønn er nødvendig men ikke tilstrekkelig."},
            {"title": "Virtuelle team", "body": "Samarbeid via digitale verktøy (Slack, Teams, Trello, Notion). Pandemien viste at det funker — men krever klarere prosesser, regelmessige videosamtaler, og bevisst innsats for å bygge team-følelsen som kommer naturlig på kontoret."},
            {"title": "Lederrollen i oppstarten", "body": "Gründerens rolle endrer seg. I starten er du «doer» (gjør alt selv). Etter hvert «enabler» (lar andre gjøre). Mange gründere klarer ikke overgangen — og blir flaskehalsen som hindrer veksten."},
            {"title": "Case — Snapchat-stiftelsen", "body": "Snapchat ble stiftet av Evan Spiegel, Bobby Murphy og Reggie Brown. Brown ble skviset ut i tidlig fase — over 150 millioner dollar i rettssak senere. Konflikt om eierskap er en hovedårsak til at gründerteam kollapser. Skriv aksjonæravtale TIDLIG."},
            {"title": "Hva slår alt annet i en oppstartsbedrift?", "body": "En middels idé med et fantastisk team vinner over en fantastisk idé med et middels team. Investorer satser ofte mer på team enn på produkt — fordi en sterkt team kan endre produkt, men et svakt team kan ikke endre seg selv."},
        ],
        "quiz": [
            {"question": "Hva er Tuckmans fire faser for team-utvikling?", "options": ["Idé, prototype, lansering, vekst", "Forming, storming, norming, performing", "Plan, gjennomføring, evaluering, justering", "Start, midt, slutt, oppsummering"], "correct": 1},
            {"question": "Hva sier 'Drive'-teorien om motivasjon?", "options": ["Lønn er det viktigste", "Autonomi, mestring og formål driver høyere ytelse enn pengebelønning", "Trusler funker best", "Bonus avgjør alt"], "correct": 1},
            {"question": "Hvorfor satser investorer ofte mer på team enn på produkt?", "options": ["Team er billigere å vurdere", "Et sterkt team kan endre produkt, men et svakt team kan ikke endre seg selv", "Team er mer stabile", "Det er en uskreven regel"], "correct": 1},
        ],
    },
]


def main():
    print("Writing ENT1 batch (10 presentations):")
    for p in ENT1:
        write_presentation(p)


if __name__ == "__main__":
    main()
