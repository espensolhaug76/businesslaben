# TEMAER OG KOMPETANSEMÅL — komplett temakart v4 (13.07.2026)

> Erstatter v2 i docs/TEMAER_OG_KOMPETANSEMAL.md etter Espen-validering.
> Kryssjekket mot hub-modulinventaret i docs/KODEKART.md §4 (55+ moduler,
> main @ 37b56d8). Regel: hvert tema navngir hub-modulene det KOBLER —
> ingen hub-moduler bygges, alle finnes.

## Temakontrakten (uendret fra Tema 1 Beredskap)

1. Gating via `temaer.ts` + RTDB `temaAktivering` + `useErTemaAktivt`/`useTemaNivaa`. Aldri hardkodet.
2. Nivå `vg1`/`vg2` — VG1 enkelt og guidet, VG2 elevens egne data og vurderinger.
3. Konsekvens er svaret. Aldri fasit underveis; grønn/rød sammenligning ETTERPÅ (brannalarm-modellen).
4. Minst én hendelses-trigger + én DYNAMISK mentor-trigger som leser elevens egne tall. Fagord-tokens i boblene.
5. 📚-lenker til temaets hub-moduler i fanen/seksjonen.
6. Eget state-navnerom, persistert. Egen dev-knapp (`?dev=1`).

Full Beredskap-stil detaljspesifikasjon skrives PER TEMA når det går inn i
byggekøen — dette dokumentet er kartet, ikke tegningene.

---

# FAG A · SSR FORRETNINGSDRIFT (VG1) / ØKONOMI OG ADMINISTRASJON (VG2)

## Tema 2: BUDSJETT OG AVVIK 📊 — neste i produksjon
- **Mål:** VG1 utarbeide budsjett og vurdere lønnsomhet · VG2 regnskap + budsjett + kommentere avvik.
- **Spill:** budsjettseksjon i Økonomi-fanen (få linjer, forrige måneds faktiske tall som utgangspunkt; lån som ÉN linje på VG1 — alltid). Månedsoppgjør får Budsjett- og Avvik-kolonne. VG2: kort fritekst-kommentar per stort avvik → vurderingsspor.
- **Mentor dynamisk:** leser STØRSTE avvik og spør om akkurat den linja.
- **Hub:** VG1 Budsjettering · VG2 Regnskapsanalyse.
- **Innsats:** LAV. State: `state.budsjett`.

## Tema 3: NØKKELTALL OG LØNNSOMHET 🔢
- **Mål:** VG2 regne ut og bruke sentrale nøkkeltall, vurdere lønnsomhet.
- **Spill:** dekningsbidrag, dekningsgrad, bruttofortjeneste i måneds-/dagsoppgjør — som ELEVOPPGAVE (regn selv, spillet viser konsekvensen av tallet, retter aldri underveis). VG2-eksklusivt tema.
- **Hub:** VG2 Nøkkeltall/lønnsomhet · Pris og kalkulasjon.
- **Innsats:** LAV. Bygges i SAMME CC-jobb som Tema 2 (v2s anbefaling står).

## Tema 4: VERDIKJEDEN OG INNKJØP 🚚
- **Mål:** VG1 gjøre rede for verdikjeden og bedriftens plass i den; vurdere leverandører.
- **Spill:** leverandørkatalog-mekanikken fra bransje 2 (Basiq-mønsteret: pris/kvalitet som leverandøregenskap) porteres til kafé — eleven VELGER leverandør per varegruppe (billig/lang leveringstid vs. dyr/rask/bedre kvalitet). Leveringstid kobles til eksisterende dagsstart-levering. Visualisering av kjeden (produsent → grossist → din butikk → kunde) med elevens egne varer.
- **Mentor dynamisk:** ved tomt trau pga. lang leveringstid («Du valgte leverandøren med 3 dagers levering — bollene tok slutt onsdag»).
- **Hub:** VG1 Verdikjeden · VG2 Bærekraft i verdikjeden (VG2-nivå).
- **Innsats:** MIDDELS — katalogmønsteret finnes i gren jobb/klesbutikk.

## Tema 5: REKRUTTERING 🧑‍💼
- **Mål:** VG2 rekrutteringsprosesser; arbeidslivets spilleregler (arbeidsavtale).
- **Spill:** når eleven trenger flere folk (kø-signalet finnes): utlysning light (eleven skriver 2–3 krav ut fra SITT rollekort) → 3 kandidatkort med ulik profil/lønnskrav → valg → konsekvens i kapasitet/kvalitet over tid. Arbeidsavtale som kort sekvens ved ansettelse (refleksjon, aldri quiz-fasit).
- **Mentor dynamisk:** leser elevens org-kart og vaktliste («Du ansatte for helgene, men køen din er på hverdager»).
- **Hub:** VG2 Rekrutteringsprosesser · Arbeidslivets spilleregler · Lønn/personalkostnader.
- **Innsats:** MIDDELS — org-designer, rollekort, vaktliste og kø finnes.

---

# FAG B · SSR HMS (VG2) + FORRETNINGSDRIFT VG1

## Tema 1: BEREDSKAP OG RISIKO 🦺 — I PRODUKSJON ✓
Uendret. Hub: VG1 Beredskap (Contingency) + Risikovurdering · VG2 Beredskap + Brannvern + Risikoanalyse.

## Tema 6: HMS-DRIFT OG ROLLER 🩺
- **Mål:** VG1 gjennomføre/dokumentere arbeid iht. HMS · VG2 HMS-roller i virksomheten.
- **Spill:** vernerunde (kvartalsvis sjekkliste mot elevens EGEN butikk; funn → tiltak m/kostnad eller utsett → risiko); **verneombud som rollekort** i org-designeren (datainnlegg — RolleDef finnes, KODEKART §6); sykefravær-hendelse som bruker elevens vaktliste; førstehjelp-hendelse (uhell i butikken — følge rutinen fra beredskapsplanen).
- **Hub:** VG2 HMS-arbeid og roller · Førstehjelp · VG1 HMS.
- **Innsats:** LAV–MIDDELS. Bygger på Tema 1s state.

## Tema 7: DIGITAL SIKKERHET OG PERSONVERN 🔐
- **Mål:** VG2 personvern og sikkerhetsrutiner; digitale system og kundeoppfølging.
- **Spill:** kundeklubb-beslutning (samle kundedata → bedre kampanjetreff, men ANSVAR følger med) → to hendelser: «kunde ber om innsyn/sletting» (følge rutine) og **phishing-epost i innboksen** (ser ekte ut — eleven som klikker får konsekvens-fortelling etterpå, aldri fasit før). VG2: enkel personvernrutine eleven fyller for egen butikk (beredskapsplan-mønsteret).
- **Hub:** VG2 Digital sikkerhet/personvern · Digitale system/kundeoppfølging.
- **Innsats:** MIDDELS — innboksen (EVENT_POOL/RESOLVE_GAME_EVENT) er kroken.

---

# FAG C · SSR MARKEDSFØRING OG INNOVASJON (VG1) / KOMMUNIKASJON OG MARKEDSFØRING (VG2) + ML

## Tema 8: KAMPANJE OG MARKEDSPLAN 📣
- **Mål:** VG1 enkel markedsplan (mål + virkemidler) og kampanje med begrunnelse · VG2 kampanje tilpasset målgruppens forbrukeratferd og medievaner · ML markedsplanen som styringsdokument.
- **Spill:** kampanjeplanlegger (SMART-mål eleven tallfester selv, målgruppe, kanal×budsjett, periode) → trafikkeffekt av kanal×segment-match (tabellen skjult — det er poenget) → **effektrapport etterpå**: elevens mål vs. faktisk, kostnad vs. merinntekt, VG2 ROI-regnestykke eleven fyller selv. Salgskampanje-variant håndhever førpris-regelen (kobles til prising m/lovkrav; brudd → tilsynsbrev i innboksen). VG1 markedsplan = kampanjeplanen + ett situasjonsavsnitt; VG2 kan sammenligne to kampanjer (A/B).
- **Hub:** VG1 Markedsplan · Kommunikasjonskanaler · Markedsføringsloven · VG2 Markedsføringskampanjer.
- **Innsats:** MIDDELS. Gjenoppliver parkert kampanje/rabatt-jobb, måljustert.

## Tema 9: EGEN MARKEDSUNDERSØKELSE 📋
- **Mål:** VG2 utvikle og gjennomføre egen markedsundersøkelse (i dag KJØPES den bare — dette temaet gjør eleven til den som lager den).
- **Spill:** eleven bygger en mini-undersøkelse (velger 3–4 spørsmål fra bank + ett eget) → «sendes ut» → svar genereres deterministisk fra spillets segmentdata (samme seed-mønster som bakgrunnssalget) → eleven TOLKER svarene og velger tiltak → tiltakets effekt er konsekvensen. Dårlig spørsmålsvalg gir ubrukelige svar — også det er læring.
- **Mentor dynamisk:** kommenterer sprik mellom funn og elevens valgte tiltak.
- **Hub:** VG2 Markedsundersøkelse.
- **Innsats:** MIDDELS.

## Tema 10: MERKEVARE OG POSISJONERING 🏷️
- **Mål:** VG2 merkevare og posisjonering · ML posisjonering/konkurransestrategi.
- **Spill:** eleven definerer butikkens profil (pris-/kvalitetsposisjon + tre løftebegreper) → KONSISTENS måles stille: priser, leverandørkvalitet (Tema 4), vindu/styling og kampanjer som matcher profilen forsterker hverandre; sprik gir svakere effekt. VG2: posisjoneringskart der eleven plasserer seg selv og konkurrenten (Tema 11) — spillet viser etterpå hvor KUNDENE plasserer butikken (beregnet av faktiske valg). Gapet er læringen.
- **Hub:** VG2 Merkevare · Posisjonering · Markedsføringstrekanten.
- **Innsats:** MIDDELS–HØY (konsistensmodellen). Bygges etter 4, 8 og 11 som den henter data fra.

## Tema 11: MARKED OG KONKURRENTER 🔍
- **Mål:** VG2/ML analysere konkurransesituasjonen; SWOT; Porter-light (ML-nivå).
- **Spill:** NB-generert konkurrent-fasade som hotspot på bydelsbildet (fiktivt navn, aldri ekte merker) → spaner-visning med konkurrentens priser på sammenlignbare varer. Konkurrenten justerer priser deterministisk (seedet). Prising langt over uten kvalitetsgrunn → svak trafikklekkasje. VG2: SWOT-light med egne tall synlig. ML-nivå: Porter-light refleksjon (nyetablering-hendelse: «ny kafé åpner i bydelen»).
- **Hub:** VG2 Posisjonering · Trender/forretningsmodeller · ML-modulene (bransjeanalyse).
- **Asset:** 1–2 NB-bilder, pilot maks 2 før batch.
- **Innsats:** MIDDELS.

## Tema 12: PRODUKTUTVIKLING OG INNOVASJON 💡
- **Mål:** VG2 innovasjon/produktutvikling · ENT utvikle forretningsidé og vurdere gjennomførbarhet.
- **Spill:** eleven utvikler ETT eget produkt (signaturprodukt): velger basis + egenskaper (pris/kost-konsekvens), setter pris med kalkyle, lanserer i sortimentet → salgstall over 2 uker er dommen. Kobles til Tema 9 (undersøke FØR lansering gir bedre treff — men eleven må oppdage det). VG2/ENT: gjennomførbarhetsvurdering før lansering (3 spørsmål).
- **Hub:** VG2 Innovasjon/produktutvikling · VG1 Bærekraft/forretningsidé.
- **Innsats:** MIDDELS — sortiment, kalkyle og salgsmotor finnes.

## Tema 13: TEKNOLOGI OG NY FORBRUKERATFERD 🤖
- **Mål:** VG1 utforske hvordan teknologi og endret forbrukeratferd påvirker salgs- og servicerollen, presentere tiltak.
- **Spill:** starter BILLIG som hendelser i dagssyklusen («konkurrenten åpnet nettbutikk», «kundene spør etter mobilbetaling/KI-chat») der eleven velger tiltak → konsekvens i trafikk/segment. Trinn 2 (senere): nettbutikk som INVESTERING (kobles til Tema 15 Vekst) med enkel bestillingsstrøm inn i dagsoppgjøret.
- **Hub:** VG1 Teknologi og KI · VG2 Digitale system/kundeoppfølging · Trender/forretningsmodeller.
- **Innsats:** LAV (hendelses-trinnet) → HØY (nettbutikk-trinnet, bevisst delt).

---

# FAG D · SSR KULTUR OG SAMHANDLING + REISELIV

## Tema 14: ARRANGEMENT 🎪 — mest tverrfaglig
- **Mål:** VG1 planlegge og gjennomføre arrangement, vertskapsrollen · VG2 planlegge/gjennomføre/EVALUERE med lønnsomhet, bærekraft OG sikkerhet.
- **Spill:** tre faser. PLANLEGG: type (kundekveld/lansering/sesongåpning), dato, arrangementsbudsjett (Tema 2-mønsteret), bemanning fra eget org-kart, ekstra innkjøp, risikovurdering HVIS Tema 1 aktivt (tverrfaglig kobling i praksis). GJENNOMFØR: spesialdag med forhøyet trafikk + 3–4 egne vertskaps-scenarier. EVALUER: plan vs. faktisk, grønn/rød ETTERPÅ; VG2 skriftlig evaluering → lærerdashbord.
- **Hub:** VG1 Vertskapsrollen · VG2 Markedsføringskampanjer (arrangement som virkemiddel).
- **Innsats:** HØY — bygges ETTER Tema 2 og 8 som den gjenbruker.

## Tema 15: REISELIV OG VERTSKAP 🧳
- **Mål:** reiselivsmålene i fagnavnet (i dag null spilldekning): vertskap for tilreisende, reiselivsprodukt, kulturforståelse i kundemøter; VG2 internasjonale markeder light.
- **Spill:** **turistsesong** aktiveres (2–3 spilluker): nye kundetyper (turister — egne NB-sprites, fiktive nasjonaliteter/ingen stereotypier i assets) med egne scenarier: språkbarriere, kulturforståelse (nabomål til Likeverd-scenariet), anbefale lokale opplevelser (vertskapsrollen UT over egen disk), tax-free/kvitteringsspørsmål. Samarbeidshendelse: «hotellet i bydelen vil legge kaféen din i sin gjestepakke — betingelser?» (reiselivsprodukt + B2B-smakebit). Sesongen påvirker sortimentsbehov (kobling til Tema 4).
- **Hub:** VG2 Reiselivsprodukt · Internasjonale markeder · VG1 Kulturforståelse · Vertskapsrollen.
- **Asset:** 3–4 turist-sprites (pilot 2 først). Scenariomotoren tar resten.
- **Innsats:** MIDDELS — scenariomotoren og sprite-pipelinen er velprøvd.

---

# FAG E · ENT + TVERRFAGLIG

## Tema 16: VEKST OG ETABLERING 🏗️
- **Mål:** ENT vekststrategier, investering, finansiering av vekst; VG2 finansieringsformer (utvidelse av det som finnes).
- **Spill:** 2–3 konkrete investeringer (bedre maskin = kapasitet; ekstra trau; vindu) med enkel tilbakebetalingstid-mal eleven regner selv; finansiering egenkapital vs. utvidet lån (plankvalitet → rente, som i dag); VG2/ENT: BMC-fanen MÅ revideres før stort vekstlån («banken vil se planen for veksten»).
- **Hub:** VG2 Forretningsplan · ENT-modulene.
- **Innsats:** MIDDELS.

## Tema 17: BÆREKRAFT ♻️
- **Mål:** bærekraftsmål i ALLE tre fag (kjerneelement).
- **Spill:** veves inn der valg tas — INGEN score-måler (en 1–10-score games, avveininger forstås): bærekraftsprofil som leverandøregenskap (Tema 4-katalogen), svinn vist også som ressurs («kastet 14 boller = 350 kr OG et halvt brett råvarer»), segmenteffekt kun hvis eleven valgte miljøbevisst målgruppe, VG2 dilemma-hendelse (billigste leverandør får negativ omtale — bytte eller bli, konsekvens begge veier).
- **Hub:** VG1 Bærekraft/forretningsidé · VG2 Bærekraft i verdikjeden.
- **Innsats:** LAV–MIDDELS. Bygges sist — da finnes alle valgpunktene den skal inn i.

---

# SCENARIO-UTVIDELSER (ikke egne temaer — rett i scenariomotoren)
- Kultur/bakgrunn i kundemøter (delvis dekket av Tema 15).
- Etiske dilemmaer i servicenæringen (1–2 hendelser m/refleksjon).
- Regelverk servicebedrifter (flere lovkrav-scenarier: garanti vs. reklamasjon).
- Nød-/konfliktscenario koblet til Tema 1.

# RENE HUB-AVHENGIGHETER (ingen spillmekanikk — kobles kun)
Relasjonsbygging/nettverk · Partene i arbeidslivet (utover arbeidsavtalen i
Tema 5) · Administrative rutiner · Profesjonell kommunikasjon (dekkes løpende
av scenariene). ML VG3-stoff (strategisk planlegging, HRM full, inter-
nasjonalisering full) forblir hub + presentasjoner.

---

# BYGGEREKKEFØLGE (bestemt)

| Bølge | Temaer | Begrunnelse |
|---|---|---|
| ✅ | 1 Beredskap | I produksjon |
| 1 | 2 Budsjett + 3 Nøkkeltall (én CC-jobb) | Størst gap, minst kode; avviks-mønsteret gjenbrukes videre |
| 2 | 8 Kampanje/markedsplan | Nest størst gap; effektrapporten arver avviks-mønsteret |
| 3 | 14 Arrangement | Syntesetemaet — krever 2 og 8 som klosser |
| 4 | 15 Reiseliv | Tetter fagnavn-hullet; billig (scenariomotor + sprites) |
| 5 | 4 Verdikjeden + 17 Bærekraft-del 1 (leverandøregenskap) | Katalogmønsteret hentes fra bransje 2 uansett |
| 6 | 11 Konkurrenter → 10 Merkevare | 10 trenger 11s posisjoneringsdata |
| 7 | 13 Teknologi (hendelses-trinnet) + 7 Personvern | Begge rir på innboksen — kan deles som B-jobb |
| 8 | 5 Rekruttering + 6 HMS-drift | VG2-stoff, ikke tidskritisk for skolestart |
| 9 | 12 Produktutvikling + 9 Markedsundersøkelse | Henger sammen (undersøk før lansering) |
| 10 | 16 Vekst + 13 nettbutikk-trinnet + 17 resten | Etter klasseromsvalidering av kjernen |

Bølge 1–4 er det som bør stå før skolestart 1.8 (SSR02-01) — resten er
høstens produksjonslinje, én bølge per CC-jobb.

# VEDLIKEHOLD
Som v2 §7: nye temaer registreres i temaer.ts og her; sync med KODEKART;
Udir-tekst ved vurderingsarbeid.
