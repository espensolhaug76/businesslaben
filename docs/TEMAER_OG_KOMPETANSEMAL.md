# TEMAER OG KOMPETANSEMÅL — gap-analyse og tema-arkitektur

> Businesslaben/AdVenture · skrevet 08.07.2026 · grunnlag: SSR01-01 (VG1) og
> SSR02-01 (VG2, gyldig 1.8.2026, programfagene Økonomi og administrasjon,
> Kommunikasjon og markedsføring, HMS)

## 1. Prinsipp: kompetansemål bygges som AKTIVERBARE TEMAER

Ny spillfunksjonalitet mot kompetansemål bygges IKKE som alltid-på-funksjoner,
men som **temaer** læreren aktiverer per klasse fra «Spillet»-fanen i
lærerdashbordet. Begrunnelse:

- Læreren styrer progresjonen: temaet skrus på når klassen jobber med målet.
- Spillet overlesses ikke for elever tidlig i løpet.
- Hvert tema mapper 1:1 til kompetansemål → rent vurderingsspor.
- Samme tema kan ha to nivåer (VG1 enkel / VG2 avansert) — læreren velger.

### Arkitektur-fundament (bygges FØR første tema)

Dette er den parkerte «lærer-knotter via Firebase»-jobben (dagssyklus runde 2):

- Firebase RTDB-node per klasse: `klasser/{klassekode}/temaAktivering/{temaId}`
  med `{ aktiv: boolean, nivaa: 'vg1' | 'vg2' }`.
- Spillet abonnerer på noden ved øktstart (klassekode finnes allerede i
  live-økt-flyten); lokale flagg beholdes som fallback uten klassekode.
- «Spillet»-fanen i TeacherDashboard skriver til noden (i dag lokalt flagg).
- Hvert tema registreres i én tunbar definisjonsfil (temaId, navn, nivåer,
  kompetansemål-referanser) — samme mønster som IndustryDefinition.

## 2. Allerede dekket (ingen jobb — dokumentert for oversikt)

| Kompetansemål (parafrasert) | Trinn | Dekning i spillet |
|---|---|---|
| Utarbeide og presentere organisasjonskart | VG1 | Org-designeren (elevbygd, tomt utgangspunkt) |
| Selge et produkt / gjøre rede for salgsprosessen | VG1 | Scenariomotoren (14 scenarier) |
| Vurdere/kalkulere/tilpasse pris mot kostnad og marked | VG1+VG2 | Prising, markedsundersøkelse, prislapper m/lovkrav |
| Håndtere klager, forebygge konflikt | VG1 | Ventetiden, reklamasjons-scenarier |
| Regelverk for salg og markedsføring | VG1 | Angrerett-/reklamasjonsscenarier, prisopplysning |
| Forbrukeratferd og segmentering | VG1 | Målgrupper, persona-tags, personaMatch |
| Indre/ytre salgsmiljø, mersalg/gjensalg | VG2 | Butikkstyling, vareeksponering, fasade, mersalgsscenarier |
| Svinn — typer og forebygging | VG1+VG2 | Svinn ved stenging, sesongsvinn (design bransje 2) |
| Lønn og lønnskostnader | VG2 | Bemanning, vaktliste, lønn i månedsoppgjør |
| Føre enkelt regnskap | VG1 | Månedsoppgjør, kontantstrøm, lån |

## 3. TEMAER (spillbare gap, prioritert)

### Tema 1: BEREDSKAP OG RISIKO  🥇 pilot-tema
- **Mål VG1:** følge en beredskapsplan og gjøre rede for funksjon/formål;
  gjennomføre enkel risikovurdering med forebyggende tiltak; servicemedarbeiderens
  rolle i konflikt- og nødssituasjoner.
- **Mål VG2 (HMS):** utforske, forklare og bruke beredskapsplan; full
  risikoanalyse med tiltak; brannteori og brannøvelse.
- **Spillinnhold:** butikken får en enkel beredskapsplan (dokument i spillet);
  eleven fyller risikoskjema for egen butikk; dagssyklusen kan trigge 1–2
  hendelser (brannalarm, aggressiv kunde, uhell) der eleven må følge planen.
  Refleksjonsspørsmål — aldri fasit (org-refleksjon-mønsteret).
- **Nivå:** VG1 = følge plan + enkel vurdering · VG2 = utarbeide/vurdere plan,
  brannøvelse planlegges/evalueres.
- **Hvorfor pilot:** tetter største hull på begge trinn, trenger ingen nye
  assets, og tester hele kjeden dashbord → Firebase → spillhendelse.

### Tema 2: BUDSJETT OG AVVIK
- **Mål VG1:** utarbeide budsjett og vurdere lønnsomheten.
- **Mål VG2:** regnskap + budsjett + kommentere budsjettavvik.
- **Spillinnhold:** eleven setter budsjett (salg, varekjøp, lønn, faste) før
  måneden; månedsoppgjøret får budsjett-kolonne og avvik; eleven kommenterer
  avvik (kort fritekst → vurderingsspor).
- **Nivå:** VG1 = enkel budsjett/faktisk · VG2 = avviksanalyse med kommentar.
- **Innsats:** liten — sitter rett på eksisterende månedsoppgjør/economy.ts.

### Tema 3: NØKKELTALL
- **Mål VG2:** regne ut og bruke sentrale nøkkeltall, vurdere lønnsomhet.
- **Spillinnhold:** dekningsbidrag, dekningsgrad, bruttofortjeneste i
  dagsoppgjør/dashbord — som elevoppgave (regn ut selv, spillet retter),
  ikke bare visning.
- **Innsats:** liten. Kan evt. slås sammen med Tema 2 i én CC-jobb.

### Tema 4: ARRANGEMENT  🥈 mest måldekning per krone
- **Mål VG1:** planlegge og gjennomføre et arrangement, vertskapsrollen.
- **Mål VG2:** planlegge, gjennomføre og evaluere arrangement med tanke på
  lønnsomhet, bærekraft OG sikkerhet (tverrfaglig: økonomi + markedsføring + HMS).
- **Spillinnhold:** «salgsdag»/«butikkåpning»: eleven planlegger (budsjett,
  markedsføring, bemanning, risikovurdering hvis Tema 1 aktivt), gjennomfører
  som spesialdag i dagssyklusen (økt trafikk), evaluerer etterpå.
- **Innsats:** middels — gjenbruker dagssyklus, bemanning, markedsføring.

### Tema 5: KAMPANJE OG MARKEDSPLAN
- **Mål VG1:** lage enkel markedsplan (mål + virkemidler); lage
  markedsføringskampanje og begrunne virkemidler.
- **Mål VG2:** planlegge/gjennomføre kampanje med hensyn til målgruppens
  forbrukeratferd og medievaner; utvikle og gjennomføre egen markedsundersøkelse.
- **Spillinnhold:** kampanjeplanlegger (mål, målgruppe, kanal, budsjett,
  periode) → effekt i bakgrunnssalget; egen markedsundersøkelse som
  hub-oppgave der resultatet mates inn i spillet (i dag kjøpes den bare).
- **Merk:** «kampanjer/rabatter» ligger parkert fra før — dette temaet er
  gjenopplivingen, nå måljustert.

### Tema 6: HMS-DRIFT
- **Mål VG1:** gjennomføre og dokumentere arbeid iht. HMS-regelverk.
- **Mål VG2 (HMS):** HMS-roller i virksomheten; personvern/sikkerhetsrutiner.
- **Spillinnhold:** HMS-driftsoppgaver (parkert fra før — vekkes her):
  sjekklister i dagssyklusen, HMS-/verneombudsrolle som rollekort i
  org-designeren.
- **Innsats:** liten–middels; org-delen er nesten gratis (RolleDef finnes).

### Tema 7: TEKNOLOGI OG NY FORBRUKERATFERD
- **Mål VG1:** utforske hvordan teknologi/endret forbrukeratferd påvirker
  salgs- og servicerollen, presentere tiltak.
- **Spillinnhold:** hendelse/beslutning i dagssyklusen (f.eks. «konkurrenten
  åpnet nettbutikk — hva gjør du?») + evt. nettbutikk-beslutning som
  investering. Kan starte som ren hendelse (billig).

### Scenario-utvidelser (ikke egne temaer — går inn i scenariomotoren)
- Kultur/bakgrunn i kundemøter (VG1 kultur og samhandling) — 1–2 scenarier,
  nabomål til Likeverd.
- Etiske dilemmaer i servicenæringen — 1–2 hendelser/scenarier med refleksjon.
- Nød-/konfliktsituasjon-scenario kobles til Tema 1.

## 4. HUB-MODULER (teori — ikke spill)

| Innhold | Trinn | Form |
|---|---|---|
| Forretningsplan (utvikle, presentere, vurdere) | VG2 (idé: VG1 forretningsidé + bærekraft) | Hub-modul ved spillstart; eleven skriver planen for butikken sin |
| Relasjonsbygging og nettverk | VG1 | Minileksjon |
| Partene i arbeidslivet | VG1 | Minileksjon |
| Administrative funksjoner og rutiner | VG1 | Minileksjon, evt. senere kobling til driftsoppgaver |
| Rekrutteringsprosess | VG2 | Hub-modul først; senere spillutvidelse av ansettelsen (søknadsbunke → intervju → valg) |
| Reiselivsmål (destinasjoner, reiselivsprodukt, samisk kultur) | VG2 | Hub-moduler; utenfor butikksimulatorens scope inntil evt. reiselivs-bransje |

## 5. PRIORITERT REKKEFØLGE

1. **Fundament:** temaAktivering via Firebase (lærer-knotter) — MÅ først.
2. **Tema 1 Beredskap og risiko** — pilot, tester hele kjeden.
3. **Tema 2+3 Budsjett/avvik + nøkkeltall** — minst innsats, størst
   økonomidekning. NB: koordineres med samlet balansejobb (etter spilltest).
4. **Tema 4 Arrangement** — mest tverrfaglig dekning.
5. **Tema 5 Kampanje**, **Tema 6 HMS-drift**, **Tema 7 Teknologi** — etter behov.

## 6. Vedlikehold

- Nye temaer registreres i tema-definisjonsfilen og i dette dokumentet.
- Ved læreplanendringer: sjekk udir.no/lk20/ssr01-01 og /ssr02-01.
- Kompetansemål er parafrasert her — bruk Udir-teksten ved vurderingsarbeid.
