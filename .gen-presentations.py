#!/usr/bin/env python3
"""Generate presentation .tsx files using PresentationShell.

Each presentation has 10 content slides + 3 quiz slides + a TERMS dictionary.
Slides alternate left-image / right-image layout for visual variety.
"""
from pathlib import Path
from textwrap import dedent

ROOT = Path(__file__).parent / "src/screens/learninghub/presentations"

# Generic Unsplash images (commercial-license, business/abstract themes) — cycled
IMAGES = [
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",  # finance/charts
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",  # office team
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",  # collaboration
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",  # whiteboard
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",  # warehouse
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",  # data
    "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80",  # handshake
    "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80",  # open road
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",  # analytics
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",  # office buildings
]


def esc(s: str) -> str:
    """Escape single quotes for inclusion inside single-quoted JS strings."""
    return s.replace("\\", "\\\\").replace("'", "\\'")


def slide_jsx(idx: int, label: str, title: str, body: str, image_url: str) -> str:
    """One content-slide arrow function. Layout alternates."""
    layout_left_img = idx % 2 == 1  # slide 2, 4, 6, 8, 10 → image on left
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
    summary_idx = 9  # last slide is summary
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


# ── ML1 BATCH (kap 3 to 15 — 13 presentations; kap 1 + 2 done manually) ─────────

ML1 = [
    # ─── Kapittel 3: Psykologi og kjøpsatferd ───
    {
        "filename": "ForbrukeratferdMl1Presentation",
        "presentation_name": "Psykologi og kjøpsatferd",
        "subject_label": "ML1 · Visjon 1",
        "title_line1": "Psykologi",
        "title_line2": "og kjøpsatferd",
        "subtitle": "Hva skjer i hodet på kunden? Motivasjon, persepsjon, læring og holdninger styrer kjøpsbeslutninger mer enn vi tror.",
        "chapter_label": "Kapittel 3",
        "slides": [
            {"title": "Motivasjon (Maslow)", "body": "Vi prioriterer behov i en pyramide: fra fysiologi og trygghet på bunnen til status og selvrealisering på toppen. Vi går vanligvis ikke videre til neste nivå før det forrige er dekket — men sosiale medier roter med rekkefølgen."},
            {"title": "Persepsjon", "body": "Hjernen velger, organiserer og tolker sanseinntrykk. Selektiv oppmerksomhet betyr at vi bare ser det vi forventer eller bryr oss om. Reklamen må derfor bryte mønsteret før den når frem."},
            {"title": "Læring", "body": "Læring er endring i atferd som følge av erfaring. Klassisk betinging (Pavlov) og operant læring (belønning og straff) brukes daglig i markedsføring — fra lojalitetspoeng til skuffelse over et dårlig kjøp."},
            {"title": "Holdninger", "body": "En holdning er en lært tendens til å reagere positivt eller negativt. Den har tre deler: kognitiv (hva jeg vet), affektiv (hva jeg føler) og konativ (hva jeg gjør). Holdninger er trege å endre — derfor er ferske kunder gull verdt."},
            {"title": "Personlighet og selvbilde", "body": "Vi kjøper merker som reflekterer hvem vi er, eller hvem vi ønsker å være. En Tesla sier noe annet om eieren enn en Volvo, selv om begge frakter folk fra A til B."},
            {"title": "Referansegrupper", "body": "Andre mennesker påvirker våre valg. Primærgrupper er familie og nære venner; sekundærgrupper er kolleger og influencere. Aspirasjonsgrupper er de vi ser opp til og prøver å ligne."},
            {"title": "Kjøpsprosessen", "body": "Fem trinn: problemerkjennelse, informasjonssøking, vurdering av alternativer, kjøpsbeslutning og bedømming etter kjøp. Markedsføringen må treffe kunden i alle fasene — ikke bare ved selve kjøpet."},
            {"title": "Kjøpsroller", "body": "Et kjøp involverer ofte flere roller: initiativtaker (foreslår), påvirker (anbefaler), beslutningstaker (velger), kjøper (betaler) og bruker (forbruker). I familien kan barn være initiativtaker og forelderen kjøper."},
            {"title": "Case — TikTok-trendene", "body": "Hvorfor kjøper tenåringer plutselig samme drikke, sko eller skinpleie? Referansegrupper (influencere) + selektiv oppmerksomhet (algoritmen viser samme ting igjen og igjen) + emosjonell appell. Holdninger formes raskt når alle rundt deg har samme produkt."},
            {"title": "Hva kan man oppnå med psykologisk innsikt?", "body": "Forståelse av psykologi er nøkkelen til treffsikker markedsføring. Du kan lage budskap som faktisk når frem, gi kunden den informasjonen som teller, og bygge merkevare som kunden identifiserer seg med over tid."},
        ],
        "quiz": [
            {"question": "Hva betyr selektiv oppmerksomhet i markedsføring?", "options": ["Hjernen velger ut hva den legger merke til, basert på interesser og forventninger", "Markedsføringen velger ut hvilke kunder den vil nå", "Reklamen velger ut bestemte produkter å fremheve", "Hjernen ignorerer all reklame automatisk"], "correct": 0},
            {"question": "Hvilke tre komponenter består en holdning av?", "options": ["Pris, kvalitet og tilgjengelighet", "Kognitiv, affektiv og konativ", "Reklame, produkt og salgsbud", "Kunde, selger og produkt"], "correct": 1},
            {"question": "Hva er en primær referansegruppe?", "options": ["Influencere på Instagram", "Familie og nære venner", "Markedsavdelingen i bedriften", "Konkurrentenes kunder"], "correct": 1},
        ],
    },

    # ─── Kapittel 4: Profesjonelle markeder ───
    {
        "filename": "ProfesjonelleMarkederPresentation",
        "presentation_name": "Profesjonelle markeder",
        "subject_label": "ML1 · Visjon 1",
        "title_line1": "Profesjonelle",
        "title_line2": "markeder",
        "subtitle": "B2B, det offentlige og organisasjoner — markeder med profesjonelle innkjøpere, store volumer og lange relasjoner.",
        "chapter_label": "Kapittel 4",
        "slides": [
            {"title": "Kjennetegn ved B2B", "body": "Profesjonelle innkjøpere, store volumer per ordre, avledet etterspørsel og tette relasjoner over tid. En norsk stålprodusent har kanskje 30 kunder — men hver kunde betyr millioner i året."},
            {"title": "Avledet etterspørsel", "body": "B2B-etterspørselen er avledet av B2C-etterspørselen. Etterspørselen etter stål henger av etterspørselen etter biler. Faller bilsalget, faller ståletterspørselen — selv om stålprisen er uendret."},
            {"title": "Kjøpssentralen (DMU)", "body": "Beslutninger tas i team kalt Decision Making Unit: brukere, påvirkere, beslutningstakere og portvakter. Selgeren må forstå hvem som spiller hvilken rolle, ellers selger man til feil person."},
            {"title": "Kjøpsprosessen på B2B", "body": "Mer formell enn B2C: spesifikasjon → anbud → forhandling → kontrakt → evaluering. En komplett salgsprosess kan ta 6–18 måneder for store kontrakter."},
            {"title": "Valgkriterier", "body": "Pris alene avgjør sjelden. Driftsikkerhet, service, leveringspresisjon, garanti og total kostnad over levetiden teller mer. En billig leverandør som leverer for sent kan koste kunden mer enn besparelsen."},
            {"title": "Anbud i det offentlige", "body": "Stat og kommune må følge Lov om offentlige anskaffelser. Likebehandling, transparens og etterprøvbarhet er bærebjelker. Store summer på spill — én enkelt anbudsrunde kan gå over hundre millioner."},
            {"title": "Sponsing på organisasjonsmarkedet", "body": "Bedrifter sponser ideelle organisasjoner for å bygge omdømme og nå målgrupper. Det er en byttehandel: organisasjonen får penger, bedriften får eksponering og verdiassosiasjon."},
            {"title": "Relasjonsbygging", "body": "Massekommunikasjon virker dårlig i B2B. Personlig salg, messer, bransjepublikasjoner og CRM-systemer er viktigere. En god salgsperson er ofte verdt mer enn et reklamebudsjett på millioner."},
            {"title": "Case — Doffin-anbud", "body": "Når kommunen skal kjøpe nye datamaskiner til skolen, lyses anbudet ut på Doffin. Leverandører må levere skriftlig tilbud med pris, garanti og leveringsbetingelser. Den som vinner er ikke alltid billigst — men har best totalpakke."},
            {"title": "Hva kreves for å lykkes på profesjonelle markeder?", "body": "Spesialkompetanse, fokus på kundens lønnsomhet og evne til å tenke langsiktig. B2B-salg er aldri en enkelt-transaksjon — det er begynnelsen på et samarbeid som skal vare i mange år."},
        ],
        "quiz": [
            {"question": "Hva er avledet etterspørsel?", "options": ["Etterspørsel som ble forbudt av lovverket", "Etterspørsel som henger av etterspørselen etter et annet produkt", "Etterspørsel som er styrt av reklame", "Etterspørsel etter brukte varer"], "correct": 1},
            {"question": "Hva er DMU?", "options": ["Direct Marketing Unit", "Decision Making Unit — kjøpssentralen i bedriften", "Digital Marketing Universe", "Department of Market Understanding"], "correct": 1},
            {"question": "Hvilken lov regulerer offentlige anbud i Norge?", "options": ["Markedsføringsloven", "Lov om offentlige anskaffelser", "Forbrukerkjøpsloven", "Avtaleloven"], "correct": 1},
        ],
    },

    # ─── Kapittel 5: MIS ───
    {
        "filename": "SituasjonsanalyseMl1Presentation",
        "presentation_name": "Markedsinformasjon og MIS",
        "subject_label": "ML1 · Visjon 1",
        "title_line1": "Markedsinformasjon",
        "title_line2": "og MIS",
        "subtitle": "Grunnlaget for gode beslutninger — kvalitative og kvantitative metoder for å forstå markedet.",
        "chapter_label": "Kapittel 5",
        "slides": [
            {"title": "Hva er MIS?", "body": "Markedsinformasjonssystemet er en strukturert metode for innsamling, sortering og analyse av data. MIS gir ledelsen et faktabasert grunnlag for beslutninger, i stedet for magefølelse alene."},
            {"title": "De fire delene", "body": "Et MIS består av interne rapporter (egne salgstall), markedsovervåking (bransjenytt), markedsundersøkelser (egne studier) og støttesystemer (statistikk, AI). Sammen gir de et komplett bilde."},
            {"title": "Sekundærdata", "body": "Informasjon som finnes fra før — SSB, Brønnøysundregistrene, Google, årsrapporter. Billig, raskt og bredt, men ikke alltid spesifikt nok for ditt prosjekt. Start alltid her."},
            {"title": "Primærdata", "body": "Nye data du samler inn selv for et spesifikt formål: spørreskjemaer, intervjuer, observasjoner. Dyrt og tidkrevende, men presist tilpasset spørsmålet du må ha svar på."},
            {"title": "Kvalitativ metode", "body": "Dybdeforståelse — svarer på «hvorfor?». Dybdeintervju og fokusgrupper avdekker motiver, følelser og barrierer som tall ikke fanger opp. Ofte få respondenter, mye tekst."},
            {"title": "Kvantitativ metode", "body": "Bredde og tall — svarer på «hvor mange?». Spørreskjemaer til et representativt utvalg gir prosenter og statistikk. Mange respondenter, lite tekst per person."},
            {"title": "Undersøkelsesprosessen", "body": "Fem steg: definer problemstilling → velg design → samle data → analyser → rapporter. Den vanligste feilen er å hoppe rett til datainnsamling før problemstillingen er klar."},
            {"title": "Validitet og reliabilitet", "body": "Validitet: måler vi det vi tror vi måler? Reliabilitet: er resultatene konsistente og til å stole på? Et dårlig spørsmål kan gi presise svar på feil ting."},
            {"title": "Case — TINE og forbrukerpaneler", "body": "TINE bruker faste forbrukerpaneler som tester nye varianter (yoghurt, ostetyper) før lansering. Kombinasjon av kvalitative dybdeintervju og kvantitative smaksprøver gir både «hvorfor» og «hvor mange»."},
            {"title": "Hvorfor er markedsinformasjon viktig?", "body": "Riktig informasjon reduserer risiko og øker sjansen for strategisk suksess. Bedrifter som beslutter med data taper sjeldnere store summer enn de som baserer seg på magefølelse."},
        ],
        "quiz": [
            {"question": "Hva er sekundærdata?", "options": ["Data man har samlet inn selv", "Informasjon som finnes fra før — SSB, rapporter, statistikk", "Data fra konkurrenter", "Data fra sosiale medier kun"], "correct": 1},
            {"question": "Hva svarer kvalitativ metode best på?", "options": ["Hvor mange?", "Hvor mye?", "Hvorfor?", "Når?"], "correct": 2},
            {"question": "Hva betyr validitet i en undersøkelse?", "options": ["Resultatene er konsistente over tid", "Vi måler det vi faktisk tror vi måler", "Undersøkelsen er godkjent av Datatilsynet", "Vi har mange respondenter"], "correct": 1},
        ],
    },

    # ─── Kapittel 6: STP ───
    {
        "filename": "StpPresentation",
        "presentation_name": "Markedssegmentering og målgruppevalg (STP)",
        "subject_label": "ML1 · Visjon 1",
        "title_line1": "STP-prosessen",
        "subtitle": "Segmentering, målgruppevalg og posisjonering — verktøyet som gjør generelle markeder til lønnsomme kundegrupper.",
        "chapter_label": "Kapittel 6",
        "slides": [
            {"title": "Segmentering", "body": "Å dele opp markedet i mindre grupper med like behov og egenskaper. I stedet for å snakke til alle på en gang, snakker du til en spesifikk gruppe som faktisk vil høre hva du har å si."},
            {"title": "Kriterier B2C", "body": "Demografi (alder, kjønn, inntekt), geografi (sted, klima), psykografi (livsstil, verdier) og atferd (lojalitet, bruksmønster). De fleste bedrifter kombinerer flere kriterier."},
            {"title": "Kriterier B2B", "body": "Type virksomhet (bransjekode), størrelse (omsetning, ansatte), geografi (region) og innkjøpsvaner (volum, hyppighet). Færre kriterier, men hver kunde betyr mer."},
            {"title": "Krav til et segment", "body": "Et brukbart segment må være målbart (du kan telle det), tilgjengelig (du kan nå det), stort nok (det lønner seg) og håndterbart (du kan betjene det). Mangler ett av kravene, er det ikke et segment."},
            {"title": "Målgruppevalg", "body": "Tre strategier: udifferensiert (ett produkt til alle), differensiert (ulike produkter til ulike segmenter) eller konsentrert (alt fokus på ett nisjesegment). Valget styrer hele forretningsmodellen."},
            {"title": "Posisjonering", "body": "Skape en unik plass i kundens hode sammenlignet med konkurrentene. Volvo = sikkerhet, Ferrari = fart, IKEA = rimelig design. Posisjonen må være enkel å forklare med ett ord."},
            {"title": "Posisjonskart", "body": "Et 2-aksers diagram som visualiserer merker basert på to viktige dimensjoner — typisk pris (lav-høy) og kvalitet (lav-høy). Hjelper deg se hvor det er ledig posisjon i markedet."},
            {"title": "USP og ESP", "body": "USP (Unique Selling Point) er den faktiske fordelen: «det varer dobbelt så lenge». ESP (Emotional Selling Point) er den følelsesmessige: «det får deg til å føle deg trygg». Sterke merker har begge."},
            {"title": "Case — Stormberg og Tesla", "body": "Stormberg har valgt et tydelig segment: voksne nordmenn som vil ha rimelige turklær med god kvalitet og sosial profil. Tesla valgte premium-segmentet med fokus på teknologi og bærekraft. Begge sa nei til store deler av markedet — og lykkes derfor i sitt valgte segment."},
            {"title": "Hvorfor velge bort kunder?", "body": "Ved å velge bort noen kunder, blir vi mer attraktive for de vi faktisk vil ha. Et selskap som prøver å selge til alle ender ofte med å selge effektivt til ingen — fordi budskapet blir for generelt."},
        ],
        "quiz": [
            {"question": "Hva betyr STP-prosessen?", "options": ["Strategi, Taktikk, Plan", "Salg, Tilbud, Pris", "Segmentering, Målgruppevalg (Targeting), Posisjonering", "Sluttbruker, Tilbyder, Produsent"], "correct": 2},
            {"question": "Hva er kjennetegn ved et brukbart segment?", "options": ["Det består kun av ungdom", "Det er målbart, tilgjengelig, stort nok og håndterbart", "Det krever ingen reklame", "Det dekker hele befolkningen"], "correct": 1},
            {"question": "Hva er forskjellen på USP og ESP?", "options": ["USP er for B2B, ESP for B2C", "USP er den faktiske fordelen, ESP er den følelsesmessige", "USP er for produkt, ESP for tjeneste", "Det er to navn på samme ting"], "correct": 1},
        ],
    },

    # ─── Kapittel 7: Konkurransemiddelet Produkt ───
    {
        "filename": "ProduktstrategiPresentation",
        "presentation_name": "Konkurransemiddelet Produkt",
        "subject_label": "ML1 · Visjon 1",
        "title_line1": "Produktet",
        "subtitle": "Konseptutvikling og merkevare — fundamentet i markedsmiksen. Uten verdi her hjelper ingen reklame.",
        "chapter_label": "Kapittel 7",
        "slides": [
            {"title": "Tre produktnivåer", "body": "Kjerneproduktet er behovet kunden løser (du kjøper ikke en bor — du kjøper et hull i veggen). Det konkrete produktet er selve varen. Det utvidede produktet er service, garanti og opplevelse rundt."},
            {"title": "Produktets livssyklus (PLC)", "body": "Alle produkter går gjennom fire faser: introduksjon (lavt salg, høye kostnader), vekst (rask økning), modning (stabilt og lønnsomt), tilbakegang (fall). Ulike strategier passer i hver fase."},
            {"title": "Sortiment", "body": "Bredde er antall produktgrupper (Nestlé har sjokolade, kaffe og dyrefôr). Dybde er varianter innen samme gruppe (Nescafé har Gold, Original, Espresso). Bredde og dybde må balanseres mot kapasitet."},
            {"title": "Merkevarebygging", "body": "Brand equity er den ekstra verdien navnet tilfører produktet. To identiske skjorter — den ene med Lacoste-logoen koster 1500 kr, den andre fra No Brand 200 kr. Forskjellen er ren merkevare."},
            {"title": "Emballasje", "body": "Emballasje har tre roller: beskytte (gjøre transport mulig), informere (innhold, opphav, bruk) og selge (den «tause selgeren» i butikkhylla). Emballasjedesign er strategi, ikke pynt."},
            {"title": "Innovasjon", "body": "Helt nye løsninger. Kan være produktinnovasjon (ny vare), prosessinnovasjon (ny måte å lage på) eller markedsinnovasjon (ny måte å selge på). Apple har ofte gjort alle tre samtidig."},
            {"title": "Service og ettermarked", "body": "Hva skjer etter at kunden har betalt? Gode opplevelser etter kjøpet sikrer lojalitet og gjenkjøp. Tesla bruker bilens app som ettermarked — software-oppdateringer holder bilen «ny» i flere år."},
            {"title": "Kvalitetsstyring", "body": "Sikre at produktet lever opp til kundens forventninger hver gang. ISO-sertifisering, kvalitetskontroller og kundetilbakemelding. Én dårlig opplevelse kan ødelegge mange års merkebygging."},
            {"title": "Case — iPhone-livssyklus", "body": "Hver iPhone-modell går gjennom hele PLC-en på ett år. Lansering med stor markedsføring, vekst gjennom høst-julehandelen, modning ved nyttår og tilbakegang når neste modell annonseres. Apple planlegger livssyklusen som en del av strategien."},
            {"title": "Hvorfor er produktet fundamentet?", "body": "Uten et produkt som faktisk gir verdi til kunden, hjelper ingen mengde reklame. Strategi handler om å bygge produkter folk vil ha — så er resten av markedsmiksen distribusjon, kommunikasjon og pris."},
        ],
        "quiz": [
            {"question": "Hva er kjerneproduktet?", "options": ["Selve den fysiske varen", "Behovet kunden faktisk vil ha dekket", "Garantien som følger med", "Emballasjen"], "correct": 1},
            {"question": "Hva er de fire fasene i produktets livssyklus?", "options": ["Idé, prototyp, salg, levering", "Introduksjon, vekst, modning, tilbakegang", "Planlegging, produksjon, salg, evaluering", "Forskning, utvikling, lansering, oppfølging"], "correct": 1},
            {"question": "Hva er brand equity?", "options": ["Bedriftens egenkapital", "Antall kunder bedriften har", "Den verdien navnet tilfører produktet utover det fysiske", "Produktets pris i butikken"], "correct": 2},
        ],
    },

    # ─── Kapittel 8: Konkurransemiddelet Pris ───
    {
        "filename": "PrisstrategiMl1Presentation",
        "presentation_name": "Konkurransemiddelet Pris",
        "subject_label": "ML1 · Visjon 1",
        "title_line1": "Pris",
        "subtitle": "Strategisk prissetting og lønnsomhet — det eneste P-et som gir inntekt. Resten er kostnader.",
        "chapter_label": "Kapittel 8",
        "slides": [
            {"title": "Pris som verdimåler", "body": "Pris er det eneste elementet i markedsmiksen som gir inntekt — alt annet (produkt, distribusjon, kommunikasjon) er kostnader. Riktig prising er derfor den kraftigste enkeltfaktoren for lønnsomhet."},
            {"title": "Prissettingsmetoder", "body": "Tre hovedretninger: kostnadsbasert (selvkost + påslag), markedsbasert (hva er kunden villig til å betale?) og konkurransebasert (hva tar de andre?). De fleste bedrifter kombinerer alle tre."},
            {"title": "Selvkostkalkyle", "body": "Inntakskost + indirekte kostnader + fortjeneste = salgspris. Passer best i situasjoner med stabile kostnader og lite konkurranse — som offentlige anbud eller monopol."},
            {"title": "Priselastisitet", "body": "Hvor mye salget endrer seg når prisen går opp eller ned. Elastisk vare: 10 % prisøkning gir 20 % salgsfall (klær). Uelastisk vare: 10 % prisøkning gir 2 % salgsfall (insulin)."},
            {"title": "Skumming vs. penetrering", "body": "Skummestrategi: høy startpris for status og rask fortjeneste (Apple iPhone). Penetreringsstrategi: lav startpris for å vinne markedsandel raskt (Spotify Premium)."},
            {"title": "Prisdifferensiering", "body": "Ulik pris til ulike grupper: geografisk (dyrere i Norge enn Sverige), tidsbasert (sommerferie vs lavsesong), etter bruk (familie vs single), eller målgruppe (student-rabatt)."},
            {"title": "Psykologisk prissetting", "body": "Terskeleffekten: 199,- føles mye billigere enn 200,-. Prispakking: 3 for 100,- selger bedre enn 33,33,- per stykk. Ankerpris: en dyr versjon i menyen får mellomprisen til å virke billig."},
            {"title": "Priskrig", "body": "Når konkurrenter senker prisen, og du må følge med, ødelegges marginene for hele bransjen. Få tjener på priskrig — det taper både butikker og produsenter. Differensiering er bedre forsvar."},
            {"title": "Case — Black Friday-prisene", "body": "Mange butikker hever prisene i oktober for å «sette dem ned» igjen i november. Forbrukertilsynet slår ned på dette. Reell prisreduksjon må sammenlignes med laveste pris siste 30 dager."},
            {"title": "Hvordan finne riktig pris?", "body": "Prisen må reflektere verdien kunden føler de får, samtidig som den dekker kostnader og gir profitt. Test, mål, juster — det finnes sjelden én riktig pris, men en rekke prøvinger som lærer deg hva markedet aksepterer."},
        ],
        "quiz": [
            {"question": "Hvorfor sier man at pris er det viktigste P-et i markedsmiksen?", "options": ["Det er det letteste å endre", "Det er det eneste som gir inntekt — resten er kostnader", "Kunden bryr seg mest om pris", "Det er det første kunden ser"], "correct": 1},
            {"question": "Hva kjennetegner en uelastisk vare?", "options": ["Salget faller dramatisk når prisen øker", "Salget endrer seg lite når prisen øker", "Varen kan strekkes mye", "Kunden bryr seg mye om pris"], "correct": 1},
            {"question": "Hva er skummestrategi?", "options": ["Å bruke skum i emballasjen for å redusere kostnader", "Lav startpris for å vinne markedsandel", "Høy startpris for status og rask fortjeneste tidlig", "Å rabattere produktene"], "correct": 2},
        ],
    },

    # ─── Kapittel 9: Konkurransemiddelet Distribusjon ───
    {
        "filename": "DistribusjonsstrategiPresentation",
        "presentation_name": "Konkurransemiddelet Distribusjon",
        "subject_label": "ML1 · Visjon 1",
        "title_line1": "Distribusjon",
        "subtitle": "Tilgjengelighet og logistikk — produktet må være på rett sted, til rett tid, i rett mengde.",
        "chapter_label": "Kapittel 9",
        "slides": [
            {"title": "Hva er distribusjon?", "body": "Distribusjon handler om å gjøre varen tilgjengelig på rett sted, til rett tid, i rett mengde. Hvis kunden ikke kan få tak i den når hun vil ha den, betyr alt det andre lite."},
            {"title": "Kanalvalg", "body": "Direkte distribusjon: produsent selger rett til sluttkunde (Tesla, Apple Store). Indirekte distribusjon: salget går via mellomledd (Coca-Cola → REMA 1000 → kunde). Trade-off mellom kontroll og rekkevidde."},
            {"title": "Mellomleddenes rolle", "body": "Grossister og detaljister forenkler logistikk og samler sortiment. Uten dem måtte hver kunde forhandle direkte med hver produsent — totalt kaos. Mellomleddet forsvinner sjelden, men endrer form."},
            {"title": "Distribusjonsgrad", "body": "Intensiv: overalt (tyggegummi, Coca-Cola). Selektiv: utvalgte butikker (Levi's, Apple). Eksklusiv: kun få utvalgte (Rolex, Hermès). Distribusjonsgraden må passe merkevarens posisjonering."},
            {"title": "Fysisk distribusjon", "body": "Lagerstyring, ordbehandling og transportvalg. Effektivitet her kan være konkurransefortrinn (Amazons ettdagslevering, IKEA-flatpakke). Logistikk er ofte usynlig — men avgjørende."},
            {"title": "Beliggenhet", "body": "Fysiske butikker står og faller på beliggenhet. Makrobeliggenhet er hvilken by/bydel. Mikrobeliggenhet er hvilken side av gata, hvilken etasje i kjøpesenteret. Begge teller."},
            {"title": "Digital distribusjon", "body": "Nettbutikker og omnikanal-løsninger som «click & collect» har vokst eksplosivt. Kunden forventer å kunne starte handlingen på mobil, fortsette på PC og hente i butikk — sømløst."},
            {"title": "Makt i kanalen", "body": "Hvem styrer? Tidligere produsenten (Tine bestemte hvilke meieri-produkter butikken fikk). Nå kjedene (NorgesGruppen, Coop, REMA). Kjedene har egne merkevarer (First Price) og truer produsentenes posisjon."},
            {"title": "Case — Tesla uten forhandlere", "body": "Tesla solgte direkte fra dag én — ingen bilforhandlere, kun nettbutikk og noen showrooms. Dette gir full kontroll over pris, opplevelse og kundedata. Tradisjonelle bilprodusenter har slitt med å kopiere modellen."},
            {"title": "Hva oppnår god distribusjon?", "body": "Distribusjonen bygger bro mellom produksjon og forbruk. Den avgjør om kunden faktisk får produktet i hånda — og dermed om all annen markedsføringsinnsats er bortkastet eller verdifull."},
        ],
        "quiz": [
            {"question": "Hva er forskjellen på direkte og indirekte distribusjon?", "options": ["Direkte er raskere, indirekte er tregere", "Direkte selger rett til sluttkunde, indirekte går via mellomledd", "Direkte er kun for nettbutikker", "Direkte er kun for B2B"], "correct": 1},
            {"question": "Hva betyr eksklusiv distribusjon?", "options": ["Produktet er for dyrt for vanlige folk", "Salget skjer kun via få utvalgte forhandlere", "Produktet selges kun på nett", "Bedriften har monopol"], "correct": 1},
            {"question": "Hvem har vanligvis mest makt i den norske dagligvarekjeden i dag?", "options": ["Produsentene (TINE, Orkla)", "Forbrukerne", "De store kjedene (NorgesGruppen, Coop, REMA)", "Det offentlige"], "correct": 2},
        ],
    },

    # ─── Kapittel 10: Markedskommunikasjon ───
    {
        "filename": "MarkedskommunikasjonPresentation",
        "presentation_name": "Konkurransemiddelet Markedskommunikasjon",
        "subject_label": "ML1 · Visjon 1",
        "title_line1": "Markedskommunikasjon",
        "subtitle": "Påvirkning og budskap — hvordan bedriften snakker til markedet og bygger merkevare over tid.",
        "chapter_label": "Kapittel 10",
        "slides": [
            {"title": "Kommunikasjonsprosessen", "body": "Sender → koder budskapet → sendes via en kanal → mottaker avkoder. Støy er fienden — alt som forstyrrer signalet (annen reklame, distrahert kunde, dårlig lyd)."},
            {"title": "Påvirkningsmiksen", "body": "Fem hovedverktøy: reklame, salgsfremming (rabatter, konkurranser), PR (omtale i media), personlig salg og direkte markedsføring (e-post, SMS). Riktig miks varierer med produkt og målgruppe."},
            {"title": "AIDA-modellen", "body": "Klassisk modell for hvordan reklame virker: Attention (få oppmerksomhet), Interest (skap interesse), Desire (vekk ønske), Action (få handling). Alle steg må fungere — bryter ett, brister hele kjeden."},
            {"title": "Push- og pull-strategi", "body": "Push: dytt varen ut via forhandler (rabatter til butikkene). Pull: skap kundeetterspørsel slik at butikkene må føre varen (TV-reklame). Coca-Cola bruker pull, generiske vaskemidler bruker push."},
            {"title": "Kanalvalg i media", "body": "Tradisjonelle medier (TV, radio, avis) gir bred rekkevidde, men er dyrt. Digitale flater (Google, Meta, TikTok) gir presisjon og målbarhet. De fleste store bedrifter bruker begge."},
            {"title": "Kreativ strategi", "body": "Hva skal vi si (innhold) og hvordan (form)? Humor, frykt, sex, pris, kvalitet — ulike grep for ulike målgrupper. En reklame uten klar idé er sjelden minneverdig, uansett hvor stort budsjettet er."},
            {"title": "Budsjettering", "body": "Tre vanlige metoder: prosent av omsetning (enkelt, men reaktivt), konkurransemetoden (følg de andre), eller mål- og oppgavemetoden (regn ut hva som faktisk trengs for å nå målet). Den siste er strategisk, men krever disiplin."},
            {"title": "Effektmåling", "body": "Ble vi lagt merke til? (oppmerksomhet, recall). Endret vi holdninger? (preferanse, kjennskap). Solgte vi mer? (ROI). For digitale kanaler er målingene presise; for TV mer estimerte."},
            {"title": "Case — Telenor og julekampanjen", "body": "Telenor har bygget en konsekvent julestil over mange år: emosjonelle historier om familie og tilhørighet, pakket inn i Telenor-blå. Det er ikke salget av enkeltabonnementer som måles — det er merkebyggingen som blir investert i."},
            {"title": "Hvorfor må kommunikasjon være integrert?", "body": "Kommunikasjon må være integrert og konsistent for å bygge merkevare. Hvis Facebook-reklamen sier én ting og butikken en annen, forvirres kunden — og merkevaren blir svakere, ikke sterkere."},
        ],
        "quiz": [
            {"question": "Hva står AIDA for?", "options": ["Action, Interest, Desire, Attention", "Attention, Interest, Desire, Action", "Average Internet Daily Audience", "Annonsering, Innholdsmarkedsføring, Direktesalg, Analyse"], "correct": 1},
            {"question": "Hva er forskjellen på push og pull i markedsføring?", "options": ["Push er på nett, pull er fysisk", "Push dytter varen via forhandler, pull skaper kundeetterspørsel", "Push er for B2B, pull for B2C", "Det er to navn på samme strategi"], "correct": 1},
            {"question": "Hvilken budsjetteringsmetode er mest strategisk men krever mest disiplin?", "options": ["Prosent av omsetning", "Følg konkurrentene", "Mål- og oppgavemetoden — regn ut hva som faktisk kreves for å nå målet", "Bruk det samme som i fjor"], "correct": 2},
        ],
    },

    # ─── Kapittel 11: Salg og personlig kommunikasjon ───
    {
        "filename": "SalgPersonligKommunikasjonPresentation",
        "presentation_name": "Salg og personlig kommunikasjon",
        "subject_label": "ML1 · Visjon 1",
        "title_line1": "Personlig",
        "title_line2": "salg",
        "subtitle": "Relasjonsbygging ansikt til ansikt — den dyreste, men ofte mest effektive formen for markedskommunikasjon.",
        "chapter_label": "Kapittel 11",
        "slides": [
            {"title": "Salgsprosessen", "body": "Steg-for-steg: planlegging → kontakt → behovsanalyse → presentasjon → innvendingsbehandling → avslutning → etterarbeid. Hvert steg krever forskjellige ferdigheter og verktøy."},
            {"title": "Behovsanalyse", "body": "Kunsten å lytte. 70/30-regelen: kunden snakker 70 %, du snakker 30 %. Du kan ikke selge en god løsning uten å forstå problemet — og du forstår problemet bare ved å spørre og høre etter."},
            {"title": "Innvendingsbehandling", "body": "Et «nei» eller en innvending er en mulighet, ikke en blokkering. «Det er for dyrt» betyr ofte «jeg har ikke forstått verdien». Lytt, bekreft, gjenta, løs."},
            {"title": "Ikke-verbal kommunikasjon", "body": "Kroppsspråk, blikkontakt, tonefall og pauser teller ofte mer enn ordene du sier. Et selvsikkert blikk og avslappet kropp signaliserer trygghet — som smitter på kunden."},
            {"title": "Mersalg og oppsalg", "body": "Mersalg: tilby noe ekstra (en kake til kaffen). Oppsalg: tilby en bedre versjon (espresso i stedet for vanlig kaffe). Begge øker ordreverdien — men må gi reell verdi for kunden, ikke bare for selger."},
            {"title": "Selgerens egenskaper", "body": "Empati (forstår kunden), ego-drive (vil vinne salget), produktkunnskap (kan svare på spørsmål) og integritet (lover kun det som holdes). Manglende én av disse, faller hele bygget."},
            {"title": "Etterarbeid", "body": "Salget slutter ikke ved kassen. Oppfølging, takkemelding, feedback-spørsmål og påminnelse om service eller gjenkjøp. Gjenkjøp koster 5-7 ganger mindre enn nykunde-salg."},
            {"title": "Relasjonsmarkedsføring", "body": "Langsiktig vinning av kundens tillit gjennom gjentatte gode opplevelser. Spesielt viktig i B2B og høyverdige B2C (eiendom, biler, finansrådgivning). En lojal kunde er en gående reklame."},
            {"title": "Case — Bilforhandleren som lytter", "body": "En god bilselger spør ikke «hvilken bil vil du ha?». Hun spør om familiestørrelse, daglig kjørerute, hytte i fjellet eller på sjøen, viktigheten av miljø, ladeforhold hjemme. Svarene styrer modellforslaget — kunden føler seg forstått, ikke selget til."},
            {"title": "Hva er moderne salg?", "body": "Moderne salg handler om å hjelpe kunden å løse et problem. Den gamle bildet av påtrengende «pågående selger» er erstattet med rådgiver — den som tar seg tid til å forstå før hun anbefaler."},
        ],
        "quiz": [
            {"question": "Hva er 70/30-regelen i salg?", "options": ["70 % rabatt, 30 % fortjeneste", "70 % fast lønn, 30 % bonus", "Kunden snakker 70 %, selger snakker 30 %", "70 % av kundene kjøper, 30 % avslår"], "correct": 2},
            {"question": "Hva er forskjellen på mersalg og oppsalg?", "options": ["De er det samme", "Mersalg er noe ekstra (kake til kaffen), oppsalg er en bedre versjon (espresso i stedet for kaffe)", "Mersalg er mer verdifullt", "Oppsalg er kun for B2B"], "correct": 1},
            {"question": "Hva er den viktigste egenskapen i moderne salg?", "options": ["Pågåenhet og press", "Evnen til å lytte og forstå kundens behov", "Lavest pris", "Mest reklame"], "correct": 1},
        ],
    },

    # ─── Kapittel 12: Reklame og medieplanlegging ───
    {
        "filename": "ReklameMedieplanleggingPresentation",
        "presentation_name": "Reklame og medieplanlegging",
        "subject_label": "ML1 · Visjon 1",
        "title_line1": "Reklame",
        "subtitle": "Strategisk synlighet — hvordan kjøpe, plassere og måle reklamen i et fragmentert mediebilde.",
        "chapter_label": "Kapittel 12",
        "slides": [
            {"title": "Betalt oppmerksomhet", "body": "Reklame er ikke gratis. Du kjøper plass i andres kanaler — TV-spott, Google-annonse, Instagram-feed. Pris og rekkevidde må alltid balanseres mot målet."},
            {"title": "Medieplanleggingens faser", "body": "Mål → målgruppe → medievalg → budsjett → kontroll. Strukturen er den samme om du har 50 000 kroner eller 50 millioner — bare detaljnivået skiller."},
            {"title": "Dekning og frekvens", "body": "Dekning: hvor mange unike personer som ser annonsen. Frekvens: hvor mange ganger hver person ser den. For å skape kjennskap kreves vanligvis 3-7 visninger per person."},
            {"title": "Kreativ utforming", "body": "Tekst, bilde, lyd og video som fanger oppmerksomheten i støyen. De første 3 sekundene avgjør om publikum scroller forbi. En sterk visuell idé er ofte verdt mer enn en stor produksjonsbudsjett."},
            {"title": "Digital annonsering", "body": "Programmatiske kjøp: algoritmer kjøper annonseplass i sanntid basert på målgrupp-data. Google Ads og Meta Ads dominerer. Presisjonen er enorm, men personvern (GDPR) setter grenser."},
            {"title": "Influencer marketing", "body": "Bruk av troverdige tredjeparter for å nå nisjemålgrupper. En micro-influencer med 10 000 engasjerte følgere kan gi bedre resultat enn én med en million passive."},
            {"title": "Kostnadseffektivitet", "body": "CPM (Cost per Mille — pris per 1000 visninger) for kjennskap. CPC (Cost per Click) for trafikk. CPA (Cost per Acquisition) for faktiske kunder. Mål alltid det som faktisk teller for forretningsmålet."},
            {"title": "Reklame-etikk", "body": "Forbrukertilsynet håndhever forbud mot villedende reklame, skjult markedsføring og manipulering av barn. Influencere må merke betalt innhold med #reklame. Brudd kan gi store bøter."},
            {"title": "Case — Spotify Wrapped", "body": "Spotifys årlige «Wrapped»-kampanje er reklame som ikke ser ut som reklame. Brukerne deler frivillig egne lytterstatistikker på sosiale medier. Resultat: massiv organisk eksponering uten å betale for medieplass."},
            {"title": "Hva kjennetegner god reklame?", "body": "God reklame kombinerer en sterk kreativ idé med presis medieplassering. Idéen alene er ikke nok om den når feil målgruppe — og presis plassering hjelper lite uten et budskap som biter."},
        ],
        "quiz": [
            {"question": "Hva er forskjellen på dekning og frekvens?", "options": ["Dekning er TV, frekvens er digitalt", "Dekning er antall unike personer, frekvens er antall ganger hver person ser annonsen", "Dekning er pris, frekvens er kvalitet", "De er to navn på samme ting"], "correct": 1},
            {"question": "Hva betyr CPM?", "options": ["Cost per Marketing", "Cost per Mille — pris per 1000 visninger", "Customer Performance Measurement", "Click Per Minute"], "correct": 1},
            {"question": "Hva må influencere etter norsk lov gjøre med betalt innhold?", "options": ["Ikke vise det offentlig", "Merke det med #reklame eller #annonse", "Bare gjøre det privat", "Bruke kun produkter de selv eier"], "correct": 1},
        ],
    },

    # ─── Kapittel 13: Direkte markedsføring og Internett ───
    {
        "filename": "DirekteMarkedsforingInternettPresentation",
        "presentation_name": "Direkte markedsføring og internett",
        "subject_label": "ML1 · Visjon 1",
        "title_line1": "Digital",
        "title_line2": "markedsføring",
        "subtitle": "En-til-en-kommunikasjon — internett har flyttet makten fra bedriften til kunden.",
        "chapter_label": "Kapittel 13",
        "slides": [
            {"title": "Direkte markedsføring (DM)", "body": "Kommunikasjon sendt rett til en identifisert person — e-post, SMS, push-varsel. Krever samtykke etter GDPR for personlige data, men er presist og målbart når det er gjort riktig."},
            {"title": "SEO — Søkemotoroptimalisering", "body": "Gjøre seg fortjent til å ligge øverst på Google (organisk treff). Krever god innhold, teknisk fungerende nettside og lenker fra andre nettsteder. Resultatene tar måneder, men holder lenge."},
            {"title": "SEM — Søkemotormarkedsføring", "body": "Betale for synlighet på spesifikke søkeord. Du betaler bare når noen klikker (CPC). Resultatet er øyeblikkelig — men forsvinner samme dag du slutter å betale."},
            {"title": "Innholdsmarkedsføring", "body": "Skape verdi gjennom artikler, videoer, podkaster og veiledere. «Hjelp, ikke selg» — bygg autoritet og tillit over tid. DnB sin Magma-blogg og Equinor sin Energi-podkast er eksempler."},
            {"title": "Sosiale medier", "body": "Dialog og samhandling, ikke monolog. Kunden kan svare, kritisere, dele og kjøpe direkte i samme kanal. Krever tilstedeværelse og evne til å håndtere både ros og ris i sanntid."},
            {"title": "Konvertering (CRO)", "body": "Conversion Rate Optimization — gjøre besøkende om til betalende kunder. A/B-testing av knapper, farger, tekst, layout. Små endringer kan gi store utslag — en bedre «Kjøp»-knapp kan øke salget med 20 %."},
            {"title": "Big data og algoritmer", "body": "Bruk av store datamengder for å forutse hva kunden vil ha. Spotifys forslag, Netflix sine anbefalinger, TikToks feed — alle er drevet av algoritmer som lærer fra adferd."},
            {"title": "GDPR og personvern", "body": "EU og Norge har strenge regler for innsamling og bruk av personopplysninger. Krav om samtykke, retten til innsyn og sletting, plikt til å melde datainnbrudd innen 72 timer. Brudd kan gi 4 % av global omsetning i bot."},
            {"title": "Case — Algoritmen som ble for god", "body": "Da det amerikanske Target sendte babyklær-tilbud til en jente, ringte den sinte faren og spurte hva som foregikk. Det viste seg at hun var gravid — algoritmen hadde regnet det ut basert på endrede kjøpsmønstre, før faren visste det. Personvern ble plutselig veldig konkret."},
            {"title": "Hva har internett gjort med markedsføring?", "body": "Internett har flyttet makten fra bedriften til kunden. Kunden kan sammenligne priser, lese anmeldelser, dele opplevelser og bytte leverandør med ett klikk. Bedrifter må fortjene oppmerksomhet — ikke kjøpe seg til den."},
        ],
        "quiz": [
            {"question": "Hva er forskjellen på SEO og SEM?", "options": ["SEO er gratis, SEM er betalt søkesynlighet", "SEO er for B2B, SEM for B2C", "De er to navn på samme ting", "SEO er kun for nettbutikker"], "correct": 0},
            {"question": "Hva betyr CRO?", "options": ["Customer Retention Office", "Conversion Rate Optimization — gjøre besøkende til kunder", "Content Rating Organization", "Click Response Operation"], "correct": 1},
            {"question": "Hvor raskt må et datainnbrudd meldes til Datatilsynet etter GDPR?", "options": ["Samme dag", "Innen 72 timer", "Innen en uke", "Innen 30 dager"], "correct": 1},
        ],
    },

    # ─── Kapittel 14: Markedsføringens lovverk og etikk ───
    {
        "filename": "MarkedsforingsLovverkEtikkPresentation",
        "presentation_name": "Markedsføringens lovverk og etikk",
        "subject_label": "ML1 · Visjon 1",
        "title_line1": "Lov",
        "title_line2": "og etikk",
        "subtitle": "Spillereglene i markedet — fra markedsføringsloven til grønnvasking og samfunnsansvar.",
        "chapter_label": "Kapittel 14",
        "slides": [
            {"title": "Markedsføringsloven", "body": "Den sentrale loven for hva som er lov i reklame og salg. Forbyr urimelig handelspraksis, villedende reklame og aggressive metoder. Forbrukertilsynet håndhever loven."},
            {"title": "God markedsføringsskikk", "body": "Reklamen skal ikke stride mot allmenne etiske og moralske verdier. Reklame som spiller på frykt, kroppspress eller utnyttelse av sårbare grupper kan være lovlig — men er sjelden god."},
            {"title": "Angrerettloven", "body": "Kunden har rett til å returnere varen innen 14 dager når kjøpet skjedde utenom fast utsalgssted (nett, telefonsalg, dørsalg). Bedriften må informere tydelig om angreretten — ellers utvides fristen til 12 måneder."},
            {"title": "E-handelsloven", "body": "Krav om informasjon på nettside: foretaksnavn, adresse, kontaktinfo, MVA-nummer. Klare bestillingsregler. Bekreftelse skal sendes umiddelbart etter kjøp. Brudd kan gi bøter og pålegg."},
            {"title": "Åpenhetsloven", "body": "Krever at norske virksomheter dokumenterer kontroll med menneskerettigheter og anstendige arbeidsforhold i hele leverandørkjeden. Forbrukere kan be om innsyn — bedriften må svare innen 3 uker."},
            {"title": "Beskyttelse av barn", "body": "Spesielt strenge regler mot reklame rettet mot barn og unge under 18. Forbud mot å bruke barn til å påvirke foreldrenes kjøp. Reklame for usunn mat, alkohol og spill mot mindreårige er sterkt regulert."},
            {"title": "Grønnvasking", "body": "Det er ulovlig å lyve om miljøgevinster eller bruke vage, ikke-dokumenterte miljøpåstander. Forbrukertilsynet har slått ned på flyselskaper, bilprodusenter og klesmerker som bruker «klimanøytral» uten dokumentasjon."},
            {"title": "Samfunnsansvar (CSR)", "body": "Å gå lenger enn loven krever for å bidra positivt til samfunnet. Investering i lokalsamfunn, forbedring av leverandørkjede, frivillige miljøtiltak. Drives ofte av kunde- og medarbeiderforventninger, ikke krav."},
            {"title": "Case — SAS og «klimanøytral flyvning»", "body": "Forbrukertilsynet slo ned på SAS for påstander om «klimanøytrale» flyvninger som var basert på CO2-kompensasjon, ikke faktiske utslippskutt. Saken viser at grønne påstander må være konkrete, dokumenterte og målbare — ellers er det grønnvasking."},
            {"title": "Hvorfor lønner det seg å være etisk?", "body": "Etisk drift bygger omdømme; uetisk drift ødelegger det for alltid. Sosiale medier har gjort hver bedrift transparent — det som gjøres i mørket, kommer raskt frem i lyset."},
        ],
        "quiz": [
            {"question": "Hvor lang er angrefristen ved kjøp på nett i Norge?", "options": ["7 dager", "14 dager", "30 dager", "12 måneder"], "correct": 1},
            {"question": "Hva regulerer Åpenhetsloven?", "options": ["Personvern på nett", "Kontroll av menneskerettigheter i leverandørkjeden", "Reklame mot barn", "Pris og avgifter"], "correct": 1},
            {"question": "Hva er grønnvasking?", "options": ["Å vaske produkter med miljøvennlige midler", "Å lyve eller bruke vage, ikke-dokumenterte miljøpåstander", "Å sertifisere et produkt som økologisk", "Å redusere energiforbruket i butikken"], "correct": 1},
        ],
    },

    # ─── Kapittel 15: Organisering av markedsføringen ───
    {
        "filename": "OrganiseringMarkedsforingPresentation",
        "presentation_name": "Organisering av markedsføringen",
        "subject_label": "ML1 · Visjon 1",
        "title_line1": "Organisering",
        "subtitle": "Struktur for gjennomføring — hvordan bedriften organiserer markedsfunksjonen for å sette strategi ut i praksis.",
        "chapter_label": "Kapittel 15",
        "slides": [
            {"title": "Hvorfor organisere?", "body": "Fordeling av oppgaver, ansvar og myndighet. Uten klar struktur ender alle med å gjøre litt av alt — eller ingenting. God organisering er broen mellom strategi og resultat."},
            {"title": "Funksjonell organisering", "body": "Delt etter fag: Marked, Økonomi, HR, IT. Enkelt og spesialisert — men «siloer» kan oppstå når avdelinger ikke snakker sammen. Passer for små og mellomstore bedrifter."},
            {"title": "Produktbasert organisering", "body": "Egne avdelinger for hver produktgruppe. Orkla har egne ledere for sjokolade, frosne måltider og dagligvare. Hver gruppe kan optimere for sitt marked, men kan dublere ressurser."},
            {"title": "Markedsbasert organisering", "body": "Egne team for B2C, B2B og det offentlige. Hver gruppe har spesialisert innsikt i sin kundetype. Brukes mye av store IT- og finansbedrifter (DnB har egne team for privat, bedrift og offentlig)."},
            {"title": "Linje- og stabsorganisasjon", "body": "Linjen er de operative som leverer (selgere, butikkmedarbeidere). Staben er eksperter som støtter (jurister, analytikere, designere). Klart skille mellom hvem som beslutter og hvem som rådgir."},
            {"title": "Prosjektorganisering", "body": "Midlertidig gruppe satt sammen for å løse en spesifikk oppgave — f.eks. lansering av nytt produkt eller en stor kampanje. Folk lånes fra ulike avdelinger og går tilbake når prosjektet er ferdig."},
            {"title": "Bedriftskultur", "body": "De felles verdiene som preger hvordan ansatte jobber. «Vi gjør slik fordi det er sånn vi alltid har gjort det.» Sterk kultur kan være konkurransefortrinn — eller en bremsekloss for endring."},
            {"title": "Endringsledelse", "body": "Evnen til å tilpasse organisasjonen til nye markedskrav. Krever god kommunikasjon, tydelig visjon og tålmodighet. De fleste endringsprogrammer mislykkes fordi de undervurderer den menneskelige siden."},
            {"title": "Case — Tine sin omorganisering", "body": "Tine omorganiserte fra produksjonsorientering til markedsorientering på 2010-tallet. Egne team ble bygget rundt forbruker (yoghurt, ost), foodservice (restauranter) og industri. Resultat: raskere innovasjon og bedre tilpasning til hvert markedssegment."},
            {"title": "Hva er den riktige organiseringen?", "body": "Riktig organisering er broen mellom strategi og resultat. Det finnes ikke én løsning som passer alle — strukturen må følge strategien, og endres når strategien endres."},
        ],
        "quiz": [
            {"question": "Hva er funksjonell organisering?", "options": ["Hver kunde har egen ansvarlig", "Bedriften deles etter fag — Marked, Økonomi, HR, IT", "Kun ledelsen tar beslutninger", "Alle gjør alt"], "correct": 1},
            {"question": "Hva er forskjellen på linje og stab?", "options": ["Linje er for produksjon, stab er for salg", "Linjen er operative som leverer, staben er eksperter som støtter", "Linje er fast ansatt, stab er konsulenter", "Det er to navn på samme ting"], "correct": 1},
            {"question": "Hvorfor mislykkes mange endringsprogrammer?", "options": ["De koster for mye penger", "De undervurderer den menneskelige siden", "De har for små mål", "De er for raskt utført"], "correct": 1},
        ],
    },
]


def main():
    print("Writing ML1 batch (13 presentations):")
    for p in ML1:
        write_presentation(p)


if __name__ == "__main__":
    main()
