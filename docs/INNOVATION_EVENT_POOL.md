# 🚀 INNOVASJON-STRATEGI: EVENT POOL & FLAG SYSTEM

**Versjon:** 1.0
**Dato:** April 2026
**Strategi:** Innovasjon & Disrupsjon
**Antall events:** 32

---

## 📋 INNHOLDSFORTEGNELSE

1. [Flag System — variabler som spores](#flag-system)
2. [Spillerens utgangspunkt-valg](#oppstart)
3. [Event-pool per fase](#event-pool)
   - Fase 1: Idéfasen (mnd 0-1)
   - Fase 2: MVP (mnd 2-3)
   - Fase 3: Tidlig vekst (mnd 4-6)
   - Fase 4: Skalering (mnd 7-9)
   - Fase 5: Modenhet/Exit (mnd 10-12)
4. [Sluttilstander](#sluttilstander)

---

## <a name="flag-system"></a>🏷 FLAG SYSTEM

State-objekt som spores gjennom hele spillet:

```typescript
interface InnovationFlags {
  // Oppstart-valg
  bransje: 'tech' | 'baerekraftig' | 'mat' | 'tjeneste' | 'hardware'
  finansieringStart: 'familie' | 'bank' | 'sparepenger' | 'crowdfund' | 'ingen'
  personlighet: 'tekniker' | 'selger' | 'kreativ' | 'analytisk' | 'nettverk'

  // Beslutninger underveis
  tookFamilyLoan: boolean
  tookBankLoan: boolean
  hasInvestor: boolean
  investorOwnership: number          // 0-100%
  pivoted: boolean
  pivotCount: number
  hiredFirst: 'developer' | 'sales' | 'marketing' | null
  totalEmployees: number
  techDebt: number                   // 0-100, høyt = krasj-risiko
  hasPatent: boolean
  hasInternational: boolean
  hasMergerTalks: boolean

  // Metrikker
  validationScore: number            // fra kundeintervjuer
  monthlyUsers: number
  monthlyRevenue: number
  burnRate: number
  runwayMonths: number
  reputation: number                 // 0-100
  competitorPressure: number         // 0-100, øker med tiden

  // Triggere brukt (så samme event ikke kommer to ganger)
  triggeredEvents: string[]
}
```

---

## <a name="oppstart"></a>🎬 OPPSTART-VALG (Måned 0)

Eleven velger 3 ting før spillet starter. Disse låser ikke veien — de skaper utgangspunkt.

### 🏭 Bransje (5 valg)

| Bransje | Startkapital | Startfordel | Startulempe |
|---|---|---|---|
| **Tech-app** | 80 000 | Skalerbar fra dag 1 | Krever utvikler-kompetanse |
| **Bærekraftig produkt** | 120 000 | Lett å få medieomtale | Lang produksjonstid |
| **Mat & drikke** | 150 000 | Lokalmarked tilgjengelig | Lavere marginer |
| **Tjeneste** | 60 000 | Lavt kapitalbehov | Vanskelig å skalere |
| **Hardware** | 200 000 | Høy verdi per salg | Lange leveransekjeder |

### 💰 Finansiering (5 valg)

| Kilde | Penger | Bonus | Skjult kostnad |
|---|---|---|---|
| **Familie** | +50 000 | Ingen renter | Setter `tookFamilyLoan` → fremtidige kriser |
| **Bank** | +50 000 | Profesjonelt nettverk | 8% rente, kvartalsrapporter |
| **Sparepenger** | +30 000 | 100% kontroll | Mindre buffer |
| **Crowdfunding** | +75 000 | 200 første kunder gratis | Må levere på løfter, mediepress |
| **Ingen ekstra** | 0 | Maks fleksibilitet | Kort runway fra start |

### 🧠 Personlighet (5 valg)

| Type | Bonus | Ulempe |
|---|---|---|
| **Tekniker** | Kan bygge MVP selv (-20 000 kr) | -20% i salgssamtaler |
| **Selger** | +30% pitch-score | Tech-investeringer koster mer |
| **Kreativ** | Markedsføring +30% effekt | Analytiske valg er vanskeligere |
| **Analytisk** | Bedre data i dashboards | Saktere i pressede situasjoner |
| **Nettverk** | Kjenner 3 ekstra NPCs i Kongsvinger | Liten praktisk erfaring |

**Resultat:** 5 × 5 × 5 = **125 unike utgangspunkt**

---

## <a name="event-pool"></a>🎲 EVENT POOL

Hver måned trekkes 1-2 events fra poolen som matcher fase + flagg. Format:

```
ID: E001
Tittel: [Norsk tittel som vises i inbox]
Fase: [hvilke måneder den kan trigge]
Trigger: [betingelse i flag-systemet]
Sannsynlighet: [når betingelsene er møtt]
Valg: [2-4 valg eleven kan ta]
Konsekvenser: [hva som skjer per valg]
Kompetansemål: [hvilke mål dette dekker]
```

---

### 🌱 FASE 1: IDÉFASEN (måned 0-1)

#### E001 — Idéen din finnes allerede
- **Trigger:** Alltid mulig i mnd 1, 30% sjanse
- **Tekst:** *"Du googler idéen din og finner ut at en bedrift i Trondheim allerede gjør noe lignende. De har 50 kunder."*
- **Valg:**
  - 🅰️ Pivot — endre canvas → `pivoted=true`, +1 mnd forsinkelse, ny validering kreves
  - 🅱️ Differensier — finn nisje → `differentiation_strategy=true`, fortsett som planlagt
  - 🅲 Ignorer — kjør på → `ignored_competition=true`, fremtidig event triggeres senere
- **Kompetansemål:** ENT1 — konkurrentanalyse, idévalidering

#### E002 — Familie med tvil
- **Trigger:** `finansieringStart === 'familie'`, mnd 1
- **Tekst:** *"Onkel Geir på familiemiddag: 'Er du sikker på dette? Hva med å få deg en vanlig jobb?'"*
- **Valg:**
  - 🅰️ Forsvar idéen med tall → omdømme i familien +, stress -
  - 🅱️ Innrøm tvil → familien blir mer involvert, kan bli støttespillere
  - 🅲 Bli sint → `family_tension=high`, trigger E018 senere
- **Kompetansemål:** ENT1 — entreprenørens rolle, kommunikasjon

#### E003 — Mentor dukker opp
- **Trigger:** `personlighet === 'nettverk'` ELLER 20% sjanse, mnd 1
- **Tekst:** *"En tidligere gründer fra Kongsvinger tilbyr seg å være mentor 1 time/uke gratis."*
- **Valg:**
  - 🅰️ Aksepter → `hasMentor=true`, +5% på alle pitch-events
  - 🅱️ Avslå høflig → ingen effekt
  - 🅲 Tilby å betale → mentoren blir imponert, blir tilgjengelig oftere
- **Kompetansemål:** ENT1 — nettverk, ydmykhet

#### E004 — Crowdfunding-løfter
- **Trigger:** `finansieringStart === 'crowdfund'`, mnd 1
- **Tekst:** *"En backer skriver: 'Når får jeg produktet mitt? Dere lovte mars.'"*
- **Valg:**
  - 🅰️ Vær ærlig om forsinkelse → omdømme - litt, ingen krise
  - 🅱️ Lov å levere i tide → setter `overcommitted=true`, trigger E019
  - 🅲 Refunder backere → -25 000 kr, omdømme +
- **Kompetansemål:** Kultur — kundekommunikasjon, etikk

---

### 🛠 FASE 2: MVP (måned 2-3)

#### E005 — Konkurrent lanserer
- **Trigger:** Alltid mulig, 40% sjanse i mnd 2-3
- **Tekst:** *"Mittanbud lanserer akkurat samme funksjon som deg. De har 100x budsjettet ditt."*
- **Valg:**
  - 🅰️ Gå smalere — fokuser på Kongsvinger først → `local_focus=true`
  - 🅱️ Speed — lanser MVP en måned tidligere → tech-debt +30
  - 🅲 Gjør produktet bedre — bruk mer tid → +1 mnd forsinkelse, kvalitet ↑
- **Kompetansemål:** ENT2 — konkurransestrategi, posisjonering

#### E006 — TikTok-viral
- **Trigger:** 10% sjanse, mnd 2-3
- **Tekst:** *"En 16-åring laget en TikTok om idéen din. 200 000 visninger på 2 dager."*
- **Valg:**
  - 🅰️ Kapitaliser raskt — last opp landing page → +500 epost-leads
  - 🅱️ Vent og se — gjør ingenting → moment forsvinner
  - 🅲 Kontakt influenseren → potensielt samarbeid, koster 10 000 kr
- **Kompetansemål:** ML — viral markedsføring, agility

#### E007 — Utvikler blir syk
- **Trigger:** `hiredFirst === 'developer'`, 20% sjanse
- **Tekst:** *"Din eneste utvikler har sykmeldt seg i 4 uker. Lansering er om 2 uker."*
- **Valg:**
  - 🅰️ Hyr freelancer akutt → -40 000 kr
  - 🅱️ Utsett lansering → konkurrent får forsprang
  - 🅲 Lær selv → bare hvis `personlighet === 'tekniker'`, ellers feiler
- **Kompetansemål:** ML2 — risikohåndtering, personalledelse

#### E008 — Patent-trussel
- **Trigger:** `monthlyUsers > 100`, 15% sjanse
- **Tekst:** *"Brev fra advokat: 'Dere bryter patentet til vår klient. Stopp eller møt oss i retten.'"*
- **Valg:**
  - 🅰️ Hyr advokat — sjekk om kravet er gyldig (-25 000 kr)
  - 🅱️ Endre produktet for å unngå konflikt → -1 mnd, men trygt
  - 🅲 Ignorer → 50% sjanse for søksmål senere
- **Kompetansemål:** Forretningsdrift — juridisk, IP-rettigheter

#### E009 — Hacker-angrep
- **Trigger:** `techDebt > 50`, 30% sjanse
- **Tekst:** *"Plattformen er nede. Noen har stjålet brukernes e-postadresser."*
- **Valg:**
  - 🅰️ Vær åpen — informer alle brukere → omdømme dropper, men gjenoppbygges
  - 🅱️ Skjul det → 60% sjanse for å bli avslørt → katastrofe
  - 🅲 Innrøm offentlig + tilby kompensasjon → -30 000 kr, omdømme overlever
- **Kompetansemål:** Kultur — etikk, krisekommunikasjon | ENT2 — IT-sikkerhet

---

### 📈 FASE 3: TIDLIG VEKST (måned 4-6)

#### E010 — Første ekte krise (kunde-eskalering)
- **Trigger:** Alltid i mnd 4 hvis ingen andre alvorlige events
- **Tekst:** *"En sint kunde skriver om dere på Facebook. Innlegget har 2000 delinger."*
- **Valg:**
  - 🅰️ Svar offentlig med empati → omdømme overlever
  - 🅱️ Slett innlegget hvis mulig → 50% sjanse for å bli enda mer viralt
  - 🅲 Kontakt kunden privat → koster 5 000 kr i kompensasjon, sak forsvinner
- **Kompetansemål:** Kultur — klagebehandling, sosiale medier

#### E011 — Søsteren ringer
- **Trigger:** `tookFamilyLoan === true`, mnd 5-6
- **Tekst:** *"Søsteren din: 'Jeg trenger 30 000 av lånet tilbake. Bilen min røyk.'"*
- **Valg:**
  - 🅰️ Betal tilbake → runway -2 mnd
  - 🅱️ Forklar at du ikke kan → familiebånd skadet, `family_tension=high`
  - 🅲 Foreslå nedbetalingsplan → -5 000/mnd i 6 mnd
- **Kompetansemål:** ENT2 — kapitalstruktur, personlig økonomi

#### E012 — Banken vil se tall
- **Trigger:** `tookBankLoan === true`, mnd 6
- **Tekst:** *"Banken vil ha kvartalsrapport innen fredag. Hvis tallene er dårlige, kan de trekke lånet."*
- **Valg:**
  - 🅰️ Lever ærlige tall → 70% sjanse de godtar hvis revenue > burn × 0.5
  - 🅱️ Pynt på tallene → 30% sjanse for oppdagelse → katastrofe
  - 🅲 Be om møte først → forklar strategi → 90% sjanse de godtar
- **Kompetansemål:** Forretningsdrift — finansiell rapportering, etikk

#### E013 — Lokalavis vil intervjue
- **Trigger:** `reputation > 60`, 30% sjanse
- **Tekst:** *"Glåmdalen vil ha en sak om unge gründere i Kongsvinger. Vil du være med?"*
- **Valg:**
  - 🅰️ Si ja, vær ærlig om utfordringene → omdømme +, +30 nye brukere
  - 🅱️ Si ja, fremstill alt som suksess → +50 brukere, men risiko hvis sannheten kommer ut
  - 🅲 Si nei, fokuser på drift → ingen effekt
- **Kompetansemål:** ML — PR, mediehåndtering

#### E014 — Konkurrent prøver å hyre din ansatte
- **Trigger:** `totalEmployees > 0`, 20% sjanse
- **Tekst:** *"Din ansatte forteller deg at Mittanbud tilbyr 30% mer lønn. De vurderer å bytte."*
- **Valg:**
  - 🅰️ Match tilbudet → burn rate ↑
  - 🅱️ Tilby aksjer i stedet → mister 2% eierskap, men billigere
  - 🅲 La dem gå → mister kompetanse, må rekruttere på nytt
- **Kompetansemål:** ML2 — personalledelse, motivasjon, eierskap

#### E015 — Influencer tilbyr promo
- **Trigger:** 15% sjanse, mnd 4-6
- **Tekst:** *"En influencer med 80 000 følgere vil promotere produktet. Pris: 25 000 kr."*
- **Valg:**
  - 🅰️ Aksepter → 60% sjanse for +200 brukere, 40% for null effekt
  - 🅱️ Forhandle ned → 50% sjanse hun aksepterer 15 000
  - 🅲 Avslå → ingen effekt
- **Kompetansemål:** ML — influencer-markedsføring, ROI

---

### 🚀 FASE 4: SKALERING (måned 7-9)

#### E016 — Investor-tilbud (hovedevent)
- **Trigger:** Alltid mnd 7 hvis `monthlyUsers > 200` OG `monthlyRevenue > 5000`
- **Tekst:** *"Innlandet Investeringsfond har sett deg. De vil snakke."*
- **Følges av:** Pitch minigame (8 spørsmål)
- **Valg etter pitch:**
  - 🅰️ Aksepter 500k for 25% → `hasInvestor=true`, runway +12 mnd
  - 🅱️ Forhandle høyere verdsettelse → 50% sjanse de trekker tilbudet
  - 🅲 Avslå → behold 100%, men begrenset vekst
- **Kompetansemål:** ENT2 — finansiering, verdsettelse, forhandling

#### E017 — Tech debt-krise
- **Trigger:** `techDebt > 70`, automatisk
- **Tekst:** *"Plattformen krasjer hver dag. Brukere klager. Du må gjøre noe."*
- **Valg:**
  - 🅰️ 1 måned med rydding (0 vekst) → tech-debt → 0
  - 🅱️ Fortsett å bygge nye features → mister 30% av brukerne neste mnd
  - 🅲 Hyr to ekstra utviklere → -80 000 kr, fikset på 2 uker
- **Kompetansemål:** ENT2 — teknisk strategi, prioritering

#### E018 — Familie-konflikt eskalerer
- **Trigger:** `family_tension === 'high'`, mnd 7-8
- **Tekst:** *"Familien din slutter å snakke til deg. Du må velge: bedrift eller familie."*
- **Valg:**
  - 🅰️ Ta en uke fri, reparer relasjonen → -1 mnd vekst, men `family_tension=resolved`
  - 🅱️ Fortsett å jobbe → personal toll, `burnout_risk=high`
  - 🅲 Selg en del av selskapet til familien → de blir investorer, eierskap -10%
- **Kompetansemål:** ENT — gründerens helse, work-life balance

#### E019 — Crowdfunding-leveringskrise
- **Trigger:** `overcommitted === true`, mnd 7
- **Tekst:** *"Backerne dine vil ha pengene tilbake. En av dem truer med å gå til pressen."*
- **Valg:**
  - 🅰️ Refunder alle (-100 000 kr) → omdømme reddet
  - 🅱️ Lever en redusert versjon → halvparten blir fornøyd
  - 🅲 Be om mer tid med ærlig forklaring → 60% aksepterer
- **Kompetansemål:** Kultur — krisekommunikasjon | ENT — løftehåndtering

#### E020 — Konkurrent priskrig
- **Trigger:** `competitorPressure > 60`, 30% sjanse
- **Tekst:** *"Mittanbud kutter prisene med 50%. Brukerne dine vurderer å bytte."*
- **Valg:**
  - 🅰️ Match prisen → marginer kollapser
  - 🅱️ Hold prisen + bedre service → mister 20% kunder, behold marginer
  - 🅲 Lansér premium-tier → splitter kundebase, nytt segment
- **Kompetansemål:** SSR — prising | ENT2 — konkurransestrategi

#### E021 — Internasjonalt tilbud
- **Trigger:** `monthlyRevenue > 30000`, 20% sjanse, mnd 8-9
- **Tekst:** *"Et svensk firma vil distribuere produktet ditt i Sverige. De tar 30%."*
- **Valg:**
  - 🅰️ Aksepter → `hasInternational=true`, +40% revenue men kompleksitet ↑
  - 🅱️ Be om bedre vilkår → 50% de aksepterer 20%
  - 🅲 Avslå, gjør det selv senere → ingen umiddelbar effekt
- **Kompetansemål:** ENT2 — internasjonalisering, distribusjon

#### E022 — Burnout-varsel
- **Trigger:** `burnout_risk === 'high'` ELLER mnd 9 hvis spilleren har gjort > 30 valg
- **Tekst:** *"Du våkner med hodepine for tredje uke på rad. Du klarer ikke konsentrere deg."*
- **Valg:**
  - 🅰️ Ta en uke ferie → -1 mnd vekst, men `burnout_risk=low`
  - 🅱️ Ignorer → 40% sjanse for kollaps neste mnd
  - 🅲 Ansett en COO → -50 000 kr, deler ansvar
- **Kompetansemål:** ML2 — selvledelse, delegering

---

### 🎓 FASE 5: MODENHET / EXIT (måned 10-12)

#### E023 — Visma vil kjøpe deg
- **Trigger:** `monthlyUsers > 1000` OG `hasInvestor === true`, mnd 10-11
- **Tekst:** *"Visma sender en bud: 8 millioner kroner for 100% av selskapet."*
- **Valg:**
  - 🅰️ Aksepter → exit-sluttilstand, beregner hva eleven får etter investor
  - 🅱️ Forhandle høyere → 30% de trekker, 70% nytt tilbud 10 mill
  - 🅲 Avslå → fortsett som selvstendig, men trigger E028 senere
- **Kompetansemål:** ENT2 — exit-strategi, M&A, verdsettelse

#### E024 — Ansatte vil ha aksjer
- **Trigger:** `totalEmployees >= 3`, mnd 10
- **Tekst:** *"Tre av ansatte spør om opsjonsprogram. De har jobbet for under markedslønn."*
- **Valg:**
  - 🅰️ Tilby 5% delt mellom dem → moralen ↑, eierskap -5%
  - 🅱️ Tilby bonuser i stedet → -30 000 kr nå
  - 🅲 Avslå → en av dem slutter
- **Kompetansemål:** ML2 — eierskap, motivasjon, kompensasjon

#### E025 — Bærekraftsrapport-krav
- **Trigger:** `bransje === 'baerekraftig'`, mnd 11
- **Tekst:** *"En stor kunde krever bærekraftsrapport for å fortsette samarbeidet."*
- **Valg:**
  - 🅰️ Hyr konsulent → -40 000 kr, full rapport
  - 🅱️ Lag selv → tar 2 uker, men lærer mye
  - 🅲 Mist kunden → -20% revenue
- **Kompetansemål:** Bærekraft, rapportering, ESG

#### E026 — Konkurrent vil fusjonere
- **Trigger:** `competitorPressure > 70`, mnd 10-11
- **Tekst:** *"Mittanbud foreslår fusjon. 'Vi er sterkere sammen.'"*
- **Valg:**
  - 🅰️ Aksepter → fusjons-sluttilstand, du blir co-CEO
  - 🅱️ Forhandle som hovedaksjonær → 50/50 sjanse
  - 🅲 Avslå → krig fortsetter, høyere risiko
- **Kompetansemål:** ENT2 — M&A, strategiske partnerskap

#### E027 — Solgt til ansatte (cooperative)
- **Trigger:** `totalEmployees >= 4`, kun hvis spilleren har gjort etiske valg
- **Tekst:** *"De ansatte foreslår å kjøpe selskapet sammen. Du kan bli med eller gå."*
- **Valg:**
  - 🅰️ Selg til dem → cooperative-sluttilstand, mindre penger men varig arv
  - 🅱️ Behold kontroll → de blir frustrerte
  - 🅲 Forhandle deleierskap → blandet modell
- **Kompetansemål:** ENT2 — eierformer, samvirker, demokratisk eierskap

#### E028 — Selvstendig vekst-vei
- **Trigger:** Avslo investor i E016, mnd 10
- **Tekst:** *"Du har klart deg selv. Nå kan du fokusere på lønnsomhet."*
- **Valg:**
  - 🅰️ Maksimer profit → livsstilsbedrift-sluttilstand
  - 🅱️ Reinvester i vekst → langsommere men du eier alt
  - 🅲 Søk ny investor nå → vanskeligere vilkår
- **Kompetansemål:** ENT2 — bootstrapping, lønnsomhet vs vekst

---

### 🎲 RANDOM EVENTS (kan trigge når som helst)

#### E029 — Strømbrudd / kontorbrann
- **Trigger:** 3% sjanse hver måned
- **Tekst:** *"Kontoret ditt har strømbrudd i 3 dager. Du mister data."*

#### E030 — Pandemi/lockdown
- **Trigger:** 5% sjanse, kun én gang per spill
- **Tekst:** *"Myndighetene innfører nedstengning. Hva betyr det for bedriften din?"*

#### E031 — Heldig nyhet
- **Trigger:** 8% sjanse hver måned
- **Tekst:** *"En kjendis bruker produktet ditt offentlig. +100 brukere over natten."*

#### E032 — Skattekontroll
- **Trigger:** 5% sjanse etter mnd 6
- **Tekst:** *"Skatteetaten vil se regnskapene. Har du orden?"*

---

## <a name="sluttilstander"></a>🏁 SLUTTILSTANDER

Måned 12 evaluerer flagg + metrikker og velger en av disse:

| ID | Sluttilstand | Krav |
|---|---|---|
| **EXIT_BIG** | Solgt til konsern (8M+) | E023 akseptert med høyt tilbud |
| **EXIT_SMALL** | Solgt for moderate sum | E023 akseptert, lavt tilbud |
| **LIFESTYLE** | Lønnsom livsstilsbedrift | Avslo investor, profit > 0 |
| **INTERNATIONAL** | Internasjonal bedrift | E021 akseptert, vekst opprettholdt |
| **MERGER** | Fusjonert med konkurrent | E026 akseptert |
| **COOPERATIVE** | Solgt til ansatte | E027 akseptert |
| **SCALING** | Fortsatt vekst | Investor inne, ikke solgt |
| **PIVOT_SUCCESS** | Lyktes etter pivot | `pivotCount >= 1` og lønnsom |
| **BANKRUPTCY** | Konkurs | Penger < 0 i 3 mnd |
| **BURNOUT_QUIT** | Sluttet pga utbrenthet | `burnout_risk === 'high'` 3 mnd på rad |

Hver sluttilstand utløser:
- Personalisert sluttvideo/tekst fra Espen Mentor
- Liste over kompetansemål dekket
- Achievement-badges
- Refleksjonsspørsmål for klassediskusjon

---

## 📊 KOMPETANSEMÅL-DEKNING (oppsummert)

Hvis eleven spiller gjennom alle 12 måneder, vil event-poolen garantere dekning av:

✅ ENT1: Idéutvikling, validering, forretningsmodell, presentasjon
✅ ENT2: Vekstfaser, finansiering, internasjonalisering, exit, M&A
✅ Forretningsdrift: Burn rate, runway, juridisk, rapportering
✅ ML1: Målgruppeanalyse, posisjonering, viral markedsføring
✅ ML2: Personalledelse, motivasjon, krisehåndtering, forhandling
✅ Kultur: Klagebehandling, etikk, krisekommunikasjon, mediehåndtering
✅ SSR: Prising, konkurranseanalyse, distribusjon

**Ingen elev opplever alle 32 events.** En typisk gjennomspilling trigger 12-18 events. To elever som spiller med ulike utgangspunkt opplever sannsynligvis mindre enn 30% overlapp i events.

---

## 🔚 SLUTT PÅ DESIGN-DOKUMENT
