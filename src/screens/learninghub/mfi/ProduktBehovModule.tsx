import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import TheoryDrawer from '../../../components/ui/TheoryDrawer'
import GlossaryTermBadge from '../../../components/ui/GlossaryTermBadge'
import GlossaryPopup from '../../../components/ui/GlossaryPopup'
import { useThemeEffect } from '../../../components/ui/ThemeToggle'
import type { InterleavedStep, TheoryPhaseData } from '../shared/InterleavedModule'
import type { QuizExercise } from '../shared/QuizModule'

// ── Data ───────────────────────────────────────────────────────────────────

const STEPS: InterleavedStep[] = [
  // ── FASE 1 — Maslows behovspyramide ─────────────────────────────────────
  {
    type: 'theory',
    phaseNumber: 1,
    phase: {
      icon: '🔺',
      title: 'Maslows behovspyramide',
      quote: 'En selger som ikke forstår behov, selger produkt — ikke løsninger',
      content:
        'Maslows behovspyramide deler menneskelige behov inn i fem nivåer, fra de mest grunnleggende til de mest avanserte. Det viktige pedagogiske poenget er at vi ikke søker å dekke høyere behov før de lavere er tilfredsstilt.',
      subpoints: [
        {
          label: 'NIVÅ 1 — FYSIOLOGISKE BEHOV',
          text: 'Mat, vann, varme, søvn. Produkter: Rema 1000-mat, Nespresso-kaffe, vinterjakke fra Bergans. Disse kjøpene er lite merkevaresensitive — funksjonen er viktigst.',
        },
        {
          label: 'NIVÅ 2 — TRYGGHETSBEHOV',
          text: 'Sikkerhet, stabilitet, forutsigbarhet. Produkter: Forsikring (Gjensidige), sykkelhjelm, brannalarm, banksparing (DNB). Markedsføringen bruker frykt som motivator: "Hva skjer med familien din hvis...?"',
        },
        {
          label: 'NIVÅ 3 — SOSIALE BEHOV',
          text: 'Tilhørighet, kjærlighet, vennskap. Produkter: Spotify (musikk du deler), Nike (løpeklubben), Snapchat, familiebil (Volkswagen Touareg). Markedsføringen viser fellesskap og samhørighet.',
        },
        {
          label: 'NIVÅ 4 — ANERKJENNELSESBEHOV',
          text: 'Status, prestisje, respekt. Produkter: Moncler-jakke (2.000 kr vs Bergans 800 kr — samme funksjon, ulik signalverdi), BMW, Rolex, businessklasse på fly. Markedsføringen selger følelsen av å lykkes.',
        },
        {
          label: 'NIVÅ 5 — SELVREALISERING',
          text: 'Vekst, mestring, potensial. Produkter: Harvard-kurs, treningsutstyr (ikke for å se bra ut, men for å mestre), reiser til ukjente steder, frivillig arbeid, Duolingo ("Lær et nytt språk"). Markedsføringen appellerer til hvem du KAN bli.',
        },
      ],
      practical:
        'ESPEN KLASSIKER: En sykkel fra Biltema (300 kr) dekker transportbehov (nivå 1). En Trek-sykkel (25.000 kr) dekker anerkjennelsesbehov (nivå 4) for sykkelmiljøet, og selvrealisering (nivå 5) for maratonryttere. Markedsføringen MÅ speile riktig nivå.',
    },
  },
  {
    type: 'exercises',
    label: 'Maslows behovspyramide',
    phaseNumber: 1,
    exercises: [
      {
        id: 'pb-1-1',
        icon: '🧥',
        title: 'Moncler-jakken',
        context: 'En Moncler-jakke koster 12 000 kr. En Bergans-jakke holder like godt mot kulden til 1 500 kr.',
        question: 'Hvilket Maslow-nivå dekker Moncler-kjøpet PRIMÆRT?',
        choices: [
          {
            id: 'a',
            label: 'Fysiologisk (varme og beskyttelse)',
            isCorrect: false,
            feedback: 'Fysiologisk er korrekt for jakke-FUNKSJONEN, men 12 000 kr ekstra handler ikke om varme — begge jakkene er like varme.',
          },
          {
            id: 'b',
            label: 'Trygghetsbehov',
            isCorrect: false,
            feedback: 'Trygghet handler om sikkerhet og stabilitet, ikke om merkevare-status.',
          },
          {
            id: 'c',
            label: 'Anerkjennelsesbehov (status)',
            isCorrect: true,
            feedback: 'Riktig! Premiumprisen betales for status og sosial signalverdi — ikke for bedre varmeisolasjon. Det er anerkjennelsesbehov, nivå 4.',
          },
          {
            id: 'd',
            label: 'Selvrealisering',
            isCorrect: false,
            feedback: 'Selvrealisering handler om personlig vekst og mestring, ikke om å signalisere status til andre.',
          },
        ],
        espenTip: 'Spør alltid: hva betaler kunden ekstra for — funksjon eller signal? Det avgjør Maslow-nivå.',
      },
      {
        id: 'pb-1-2',
        icon: '🏠',
        title: 'Hjemmeforsikring',
        context: 'En ung familie tegner innboforsikring og hjemmeforsikring.',
        question: 'Hvilket Maslow-nivå dekker forsikringskjøpet primært?',
        choices: [
          {
            id: 'a',
            label: 'Fysiologisk',
            isCorrect: false,
            feedback: 'Fysiologisk er mat, vann og søvn — grunnleggende overlevelse, ikke risikobeskyttelse.',
          },
          {
            id: 'b',
            label: 'Trygghetsbehov',
            isCorrect: true,
            feedback: 'Riktig! Forsikring gir trygghet, stabilitet og beskyttelse mot uforutsette tap — kjernen i trygghetsbehov, nivå 2.',
          },
          {
            id: 'c',
            label: 'Sosiale behov',
            isCorrect: false,
            feedback: 'Sosiale behov handler om tilhørighet og relasjoner — ikke om å sikre seg mot brann eller tyveri.',
          },
          {
            id: 'd',
            label: 'Anerkjennelse',
            isCorrect: false,
            feedback: 'Anerkjennelse handler om status og prestisje. Forsikring er ikke et statussymbol — det er en sikkerhetsnett.',
          },
        ],
        espenTip: 'Forsikringsbransjen bruker frykt som motivator: "Hva skjer med familien din hvis...?" — det er nivå 2 i praksis.',
      },
      {
        id: 'pb-1-3',
        icon: '👟',
        title: 'Nike: Just Do It',
        context: 'Nikes reklamekampanje viser idrettsutøvere som overvinner grenser og "blir den beste versjonen av seg selv".',
        question: 'Hvilket Maslow-nivå appellerer "Just Do It"-kampanjen primært til?',
        choices: [
          {
            id: 'a',
            label: 'Fysiologisk',
            isCorrect: false,
            feedback: 'Fysiologisk handler om grunnleggende overlevelse — Nike selger ikke sko som nødvendig for å overleve.',
          },
          {
            id: 'b',
            label: 'Sosiale behov',
            isCorrect: false,
            feedback: 'Nær, men "bli din beste versjon" handler om INDIVIDUELL prestasjonsreise, ikke primært om å tilhøre en gruppe.',
          },
          {
            id: 'c',
            label: 'Anerkjennelsesbehov',
            isCorrect: false,
            feedback: 'Anerkjennelse er mulig, men "just do it" handler om personlig mestring — ikke om å imponere andre.',
          },
          {
            id: 'd',
            label: 'Selvrealisering',
            isCorrect: true,
            feedback: 'Riktig! "Bli den beste versjonen av deg selv" og "overvinne grenser" er kjernen i selvrealisering, nivå 5.',
          },
        ],
        espenTip: 'Premium sports-brands selger selvrealisering. Merk at reklamen handler om DIN reise, ikke om å imponere andre.',
      },
      {
        id: 'pb-1-4',
        icon: '📊',
        title: 'Riktig sortering',
        context: 'Fire produkter: brød, røykvarsler, Rolex-ur, yoga-app.',
        question: 'Hvilken rekkefølge er RIKTIG fra laveste til høyeste Maslow-nivå?',
        choices: [
          {
            id: 'a',
            label: 'Brød → Rolex → Røykvarsler → Yoga-app',
            isCorrect: false,
            feedback: 'Feil plassering av Rolex. Rolex er anerkjennelse (nivå 4), høyere enn røykvarsler (nivå 2).',
          },
          {
            id: 'b',
            label: 'Brød → Røykvarsler → Rolex → Yoga-app',
            isCorrect: true,
            feedback: 'Riktig! Brød=1 (fysiologisk), Røykvarsler=2 (trygghet), Rolex=4 (anerkjennelse), Yoga-app=5 (selvrealisering).',
          },
          {
            id: 'c',
            label: 'Røykvarsler → Brød → Yoga-app → Rolex',
            isCorrect: false,
            feedback: 'Brød (fysiologisk, nivå 1) er LAVERE enn røykvarsler (trygghet, nivå 2). Og Rolex er lavere enn yoga-app.',
          },
          {
            id: 'd',
            label: 'Brød → Røykvarsler → Yoga-app → Rolex',
            isCorrect: false,
            feedback: 'Nær! Men Rolex (anerkjennelse, nivå 4) er faktisk lavere enn yoga-app som dekker selvrealisering (nivå 5).',
          },
        ],
        espenTip: 'Produkters Maslow-nivå avgjøres av HVA kunden egentlig kjøper — ikke hva produktet er.',
      },
      {
        id: 'pb-1-5',
        icon: '🧖',
        title: 'Luksus-spa-helg',
        context: 'Et spa-hotell markedsfører en "Wellness Weekend" til 8 000 kr. Reklamen viser "finn deg selv" og "lad opp med venner".',
        question: 'Hvilke Maslow-nivåer er MEST relevante for dette produktet?',
        choices: [
          {
            id: 'a',
            label: 'Fysiologisk og Trygghet',
            isCorrect: false,
            feedback: 'Et spa-opphold for 8 000 kr appellerer til langt høyere behov enn grunnleggende overlevelse og sikkerhet.',
          },
          {
            id: 'b',
            label: 'Sosiale behov og Selvrealisering',
            isCorrect: true,
            feedback: 'Riktig! "Lad opp med venner" = sosiale behov (nivå 3), "finn deg selv" = selvrealisering (nivå 5). Begge er relevante.',
          },
          {
            id: 'c',
            label: 'Kun Trygghet',
            isCorrect: false,
            feedback: 'Trygghet handler om sikkerhet mot farer og tap — ikke om avslapning og selvutvikling.',
          },
          {
            id: 'd',
            label: 'Kun Anerkjennelse',
            isCorrect: false,
            feedback: 'Anerkjennelse er delvis relevant for premiumprodukter, men "finn deg selv" peker eksplisitt mot selvrealisering.',
          },
        ],
        espenTip: 'De beste produkter treffer flere Maslow-nivåer samtidig. Det gjør dem vanskeligere å erstatte.',
      },
    ],
  },

  // ── FASE 2 — Reelle vs skapte behov ─────────────────────────────────────
  {
    type: 'theory',
    phaseNumber: 2,
    phase: {
      icon: '💡',
      title: 'Reelle vs skapte behov',
      quote: 'Apple skaper ikke bare produkter — de skaper behovet for produktet',
      content:
        'Reelt behov: Kunden opplever en konkret mangel eller et problem som eksisterer uavhengig av markedsføring. Eksempel: telefonen er ødelagt → behov for ny telefon. Skapt behov: Markedsføringen skaper en opplevd utilstrekkelighet som ikke eksisterte før. Eksempel: iPhone 14 vs iPhone 15 — telefonen fungerer perfekt, men markedsføringen skaper følelsen av å "henge etter".',
      subpoints: [
        {
          label: 'KRITISK PERSPEKTIV',
          text: 'FOR: Innovasjon drives av å skape nye ønsker. MOT: Overforbruk og miljøbelastning. Max-Neef-perspektiv: Behov er universelle, men satisfaktorer (måten vi dekker dem på) er kulturelt skapt.',
        },
        {
          label: 'Gillette (1920-tallet)',
          text: 'Lanserte barberingsbehovet hos kvinner — det eksisterte ikke før.',
        },
        {
          label: 'De Beers — "Diamonds are forever" (1947)',
          text: 'Skapte forlovelsesringen som standard. Et markedsføringstriks som ble en kulturell norm.',
        },
        {
          label: 'Deodorant',
          text: 'Ble normalt gjennom aggressive reklamekampanjer, ikke naturlig etterspørsel.',
        },
      ],
      practical:
        'Spør deg alltid: "Eksisterte dette behovet før produktet ble lansert?" Svaret avgjør markedsføringsstrategien.',
    },
  },
  {
    type: 'exercises',
    label: 'Reelle vs skapte behov',
    phaseNumber: 2,
    exercises: [
      {
        id: 'pb-2-1',
        icon: '📱',
        title: 'iPhone 15 vs 14',
        context: 'iPhone 15 lanseres med minimale endringer fra iPhone 14. Millioner "trenger" plutselig å oppgradere.',
        question: 'Hva slags behov er dette?',
        choices: [
          {
            id: 'a',
            label: 'Reelt behov',
            isCorrect: false,
            feedback: 'Et reelt behov eksisterer uavhengig av reklame. iPhone 14 fungerer fortsatt perfekt — det er ingen reell mangel.',
          },
          {
            id: 'b',
            label: 'Skapt behov',
            isCorrect: true,
            feedback: 'Riktig! Apple skaper en opplevd utilstrekkelighet ("du henger etter") gjennom markedsføring og PR. Behovet eksisterte ikke før lanseringen.',
          },
          {
            id: 'c',
            label: 'Latent behov',
            isCorrect: false,
            feedback: 'Et latent behov finnes allerede hos kunden, men er uoppdaget. Her ble behovet konstruert eksternt av Apple — det var ikke latent.',
          },
          {
            id: 'd',
            label: 'Funksjonelt behov',
            isCorrect: false,
            feedback: 'Et funksjonelt behov handler om praktisk nytte. iPhone 14 dekker allerede det funksjonelle — det er ingenting funksjonelt ødelagt.',
          },
        ],
        espenTip: 'FOMO (fear of missing out) er Apples viktigste markedsføringsverktøy — det skaper behov som ikke eksisterte.',
      },
      {
        id: 'pb-2-2',
        icon: '🪒',
        title: 'Gillette og kvinner',
        context: 'Gillette lanserte på 1920-tallet barberprodukter for kvinner med budskapet om at kroppshår var "ukvinnelig".',
        question: 'Hvilken teknikk brukte Gillette for å lykkes?',
        choices: [
          {
            id: 'a',
            label: 'De avdekket et latent behov som allerede eksisterte',
            isCorrect: false,
            feedback: 'Behovet for å barbere seg eksisterte ikke naturlig hos kvinner på den tiden — det ble konstruert av Gillette gjennom kampanjer.',
          },
          {
            id: 'b',
            label: 'De skapte en sosial norm gjennom reklame og konstruerte et nytt behov',
            isCorrect: true,
            feedback: 'Riktig! Gillette skapte en kulturell norm ("glatte ben er standard") gjennom systematisk reklamekampanje. Behovet fantes ikke før de skapte det.',
          },
          {
            id: 'c',
            label: 'De svarte på eksisterende etterspørsel fra markedet',
            isCorrect: false,
            feedback: 'Det fantes ingen eksisterende etterspørsel. Gillette OPPRETTET etterspørselen — det er skapt behov i sin reneste form.',
          },
          {
            id: 'd',
            label: 'De kopierte en europeisk skjønnhetstrend',
            isCorrect: false,
            feedback: 'Gillettes kampanje var selv den kulturelle innovasjonen — det var ingen europeisk trend å kopiere.',
          },
        ],
        espenTip: 'De Beers gjorde det samme med forlovelsesringer: "A diamond is forever" (1947) var ren behovskonstruksjon.',
      },
      {
        id: 'pb-2-3',
        icon: '💧',
        title: 'Ødelagt telefon',
        context: 'En kundes telefon er falt i vann og virker ikke. Hun kjøper ny telefon.',
        question: 'Hva slags behov er dette kjøpet?',
        choices: [
          {
            id: 'a',
            label: 'Skapt behov',
            isCorrect: false,
            feedback: 'Skapte behov eksisterer ikke uten markedsføring. Her er telefonen faktisk ødelagt — behovet er reelt og uavhengig av reklame.',
          },
          {
            id: 'b',
            label: 'Reelt behov',
            isCorrect: true,
            feedback: 'Riktig! Behovet eksisterer uavhengig av markedsføring — telefonen er ødelagt og hun trenger et kommunikasjonsmiddel. Dette er et reelt behov.',
          },
          {
            id: 'c',
            label: 'Latent behov',
            isCorrect: false,
            feedback: 'Latente behov er uoppdagede. Her er behovet åpenbart og akutt — det er ikke skjult på noen måte.',
          },
          {
            id: 'd',
            label: 'Impulsivt behov',
            isCorrect: false,
            feedback: 'Impulsivt kjøp er en kjøpsatferdsterm, ikke en behovskategori, og dette kjøpet er heller ikke impulsivt.',
          },
        ],
        espenTip: 'Test: "Eksisterte behovet før produktet ble lansert?" Ja → reelt behov. Nei → skapt behov.',
      },
      {
        id: 'pb-2-4',
        icon: '🎯',
        title: 'Mest effektiv teknikk',
        context: 'Markedsføring kan skape kunstige behov på flere måter.',
        question: 'Hvilken teknikk er MEST effektiv for å skape kunstige behov?',
        choices: [
          {
            id: 'a',
            label: 'Faktainformasjon om produktets egenskaper',
            isCorrect: false,
            feedback: 'Faktainformasjon avdekker heller reelle behov enn å skape nye. Det appellerer til fornuft, ikke følelse.',
          },
          {
            id: 'b',
            label: 'Prissammenligning med konkurrenter',
            isCorrect: false,
            feedback: 'Prissammenligning aktiverer eksisterende ønsker, men skaper sjelden nye grunnleggende behov.',
          },
          {
            id: 'c',
            label: 'Sosial norm og FOMO ("alle andre har det allerede")',
            isCorrect: true,
            feedback: 'Riktig! FOMO og sosiale normer er den kraftigste mekanismen for å skape kunstige behov. Ingen vil "henge etter" — og det er dette Apple, Gillette og DeBeers utnyttet.',
          },
          {
            id: 'd',
            label: 'Rabatter og tidsbegrensede tilbud',
            isCorrect: false,
            feedback: 'Rabatter aktiverer eksisterende ønsker og fremskynder kjøp, men skaper sjelden nye grunnleggende behov.',
          },
        ],
        espenTip: 'FOMO er en av de sterkeste psykologiske driverne i moderne markedsføring — og den er særlig effektiv på sosiale medier.',
      },
      {
        id: 'pb-2-5',
        icon: '🌍',
        title: 'Klimabevissthet',
        context: 'Bevisstheten om klimaendringer har ført til at mange kjøper elbil, solcellepaneler og miljøvennlig mat.',
        question: 'Er miljøbevissthet et reelt eller skapt behov?',
        choices: [
          {
            id: 'a',
            label: 'Rent skapt behov — konstruert av miljøbevegelsen og media',
            isCorrect: false,
            feedback: 'Klimaproblemet er reelt og vitenskapelig dokumentert. Det er ikke en markedsføringskonstruksjon — men kommunikasjonen rundt det er formidabel.',
          },
          {
            id: 'b',
            label: 'Rent reelt behov — alle har alltid brydd seg om miljøet',
            isCorrect: false,
            feedback: 'Feil — bevissthetsnivået og handlekraften har blitt dramatisk forsterket gjennom aktivisme, media og politikk. Det var ikke alltid slik.',
          },
          {
            id: 'c',
            label: 'Både reelt og forsterket — reelt problem, men bevisstheten er kommunikasjonsdrevet',
            isCorrect: true,
            feedback: 'Riktig! Klimaproblemet er reelt, men BEVISSTHETEN og HANDLEKRAFTEN er delvis skapt gjennom kommunikasjon, aktivisme og media. Et godt eksempel på at grensen ikke alltid er skarp.',
          },
          {
            id: 'd',
            label: 'Latent behov som alltid har eksistert',
            isCorrect: false,
            feedback: 'Latent er nær, men bevisstheten er i dag for stor og utbredt til å kalle den "latent" — den er fullt aktivert.',
          },
        ],
        espenTip: 'Mange av tidens viktigste markeder (bærekraft, mental helse, livslang læring) er i grenselandet mellom reelle og skapte behov.',
      },
    ],
  },

  // ── FASE 3 — Produktets tre nivåer ──────────────────────────────────────
  {
    type: 'theory',
    phaseNumber: 3,
    phase: {
      icon: '📦',
      title: 'Produktets tre nivåer',
      quote: 'Ingen kjøper en boremaskin — de kjøper et hull i veggen',
      subpoints: [
        {
          label: 'KJERNENYTTE — hva løser det egentlig?',
          text: 'Det grunnleggende problemet eller behovet produktet løser. Hotellrom = søvn og hvile (ikke "et rom med seng"). Tannkrem = frisk pust og sosial aksept (ikke "hvite tenner"). Nike-sko = prestasjon og selvfølelse (ikke "sko med luftpute").',
        },
        {
          label: 'FAKTISK PRODUKT — de fysiske egenskapene',
          text: 'Design, kvalitet, merkenavn, emballasje, funksjoner. Dette er hva du betaler ekstra for hos premium-merker. iPhones aluminium-design vs plasttelefon — samme kjernenytte, svært ulikt faktisk produkt.',
        },
        {
          label: 'UTVIDET PRODUKT — det som bygger lojalitet',
          text: 'Garanti, kundeservice, levering, returnering, app, community, merkevareidentitet. Apple Store-opplevelsen, Applecare, iCloud-integrasjonen — grunnen til at kunder betaler 30% mer for iPhone. IKEA Family-kortet, restauranten, barnepass — alt rundt selve produktet.',
        },
      ],
      practical:
        '"Ingen kjøper en drill — de kjøper et hull i veggen." Selg alltid kjernenytten, ikke produktet selv.',
      glossaryTerm: 'Produktnivåer',
    },
  },
  {
    type: 'exercises',
    label: 'Produktets tre nivåer',
    phaseNumber: 3,
    exercises: [
      {
        id: 'pb-3-1',
        icon: '🏨',
        title: 'Hotellrom — kjernenytte',
        context: 'Et businesshotell tilbyr rom med seng, bad, WiFi, lojalitetsprogram og gratis frokost.',
        question: 'Hva er KJERNENYTTEN for et hotellrom på et businesshotell?',
        choices: [
          {
            id: 'a',
            label: 'Et rom med seng, bad og WiFi',
            isCorrect: false,
            feedback: 'Dette er det FAKTISKE produktet — de fysiske egenskapene. Kjernenytten er mer grunnleggende enn de fysiske spesifikasjonene.',
          },
          {
            id: 'b',
            label: 'Søvn, hvile og base for jobbaktivitet',
            isCorrect: true,
            feedback: 'Riktig! Kjernenytten er det grunnleggende behovet produktet løser: et sted å hvile og jobbe fra — ikke rommets fysiske attributter.',
          },
          {
            id: 'c',
            label: 'Lojalitetsprogram og gratis frokost',
            isCorrect: false,
            feedback: 'Dette er det UTVIDEDE produktet — tilleggstjenester som bygger lojalitet og gjør hotellet stickier.',
          },
          {
            id: 'd',
            label: 'Merkenavnet til hotellet',
            isCorrect: false,
            feedback: 'Merkenavn er del av det faktiske produktet, ikke kjernenytten. Kjernenytten er den grunnleggende funksjonen.',
          },
        ],
        espenTip: 'Kjernenytten er alltid svaret på: "Hvilket problem løser dette egentlig?" — ikke hva det er fysisk.',
      },
      {
        id: 'pb-3-2',
        icon: '☁️',
        title: 'AppleCare og iCloud',
        context: 'Når du kjøper en iPhone kan du legge til AppleCare-forsikring, iCloud-lagring og Apple Store-support.',
        question: 'Hvilket produktnivå representerer AppleCare, iCloud og support-tjenestene?',
        choices: [
          {
            id: 'a',
            label: 'Kjernenytte',
            isCorrect: false,
            feedback: 'Kjernenytten er kommunikasjon og informasjonstilgang — det grunnleggende problemet telefonen løser. AppleCare er tillegg, ikke kjerne.',
          },
          {
            id: 'b',
            label: 'Faktisk produkt',
            isCorrect: false,
            feedback: 'Faktisk produkt er de fysiske og merkemessige egenskapene: design, kamera, prosessor. AppleCare er noe du velger å legge til — ikke selve produktet.',
          },
          {
            id: 'c',
            label: 'Utvidet produkt',
            isCorrect: true,
            feedback: 'Riktig! AppleCare, iCloud og support er utvidede produktfordeler som bygger lojalitet og gjør det vanskelig å bytte til Android.',
          },
          {
            id: 'd',
            label: 'Merkevarepersonlighet',
            isCorrect: false,
            feedback: 'Merkevarepersonlighet er en psykologisk dimensjon ved merkevaren, ikke ett av de tre produktnivåene i Kotlers modell.',
          },
        ],
        espenTip: 'Det utvidede produktet er "sticky" — jo mer du er investert i det (iCloud-bilder, AppleCare), jo vanskeligere er det å bytte.',
      },
      {
        id: 'pb-3-3',
        icon: '☕',
        title: 'Nespresso — alle tre nivåer',
        context: 'Nespresso selger kaffemaskiner og kapsler. De tilbyr også Nespresso Club, recycling-program og George Clooney som ambassadør.',
        question: 'Hva er riktig matching av de tre produktnivåene for Nespresso?',
        choices: [
          {
            id: 'a',
            label: 'Kjerne=kaffe/koffein, Faktisk=maskin+kapsler+design, Utvidet=Club+recycling+premiumopplevelse',
            isCorrect: true,
            feedback: 'Riktig! Kjernenytten er kaffeen/koffeinet. Det faktiske er selve maskinen og kapslenes design. Det utvidede er Club-memberskapet, recycling og hele premiumopplevelsen.',
          },
          {
            id: 'b',
            label: 'Kjerne=kaffemaskin, Faktisk=koffein, Utvidet=George Clooney-reklamen',
            isCorrect: false,
            feedback: 'Koffein/kaffe er kjernenytten — det grunnleggende behovet. Maskinen er det faktiske produktet. Reklame er ikke et produktnivå.',
          },
          {
            id: 'c',
            label: 'Kjerne=status, Faktisk=smak, Utvidet=pris',
            isCorrect: false,
            feedback: 'Status er en Maslow-dimensjon, ikke et produktnivå. Pris er ikke et produktnivå — det er en del av markedsmiksen.',
          },
          {
            id: 'd',
            label: 'Alle tre nivåene er like viktige — det er umulig å rangere',
            isCorrect: false,
            feedback: 'Selv om alle bidrar, er det UTVIDEDE produktet (Club, recycling, premiumopplevelse) det som primært differensierer Nespresso fra billigere kopier.',
          },
        ],
        espenTip: 'Nespressos styrke: kjernenytten (kaffe) er en commodity, men utvidet produkt gjør dem nesten umulige å erstatte for lojale kunder.',
      },
      {
        id: 'pb-3-4',
        icon: '🛋️',
        title: 'IKEA-restauranten',
        context: 'IKEA tilbyr restaurant med rimelig mat, barnepass og pakketjeneste inne i butikken.',
        question: 'Hvilken produktstrategi illustrerer restaurant og barnepass hos IKEA?',
        choices: [
          {
            id: 'a',
            label: 'Faktisk produkt-differensiering',
            isCorrect: false,
            feedback: 'Faktisk produkt er møblenes design og kvalitet — ikke restauranten og barnepassen som er tilleggstjenester.',
          },
          {
            id: 'b',
            label: 'Kjernenytte-utvidelse',
            isCorrect: false,
            feedback: 'Kjernenytten (rimelige møbler) endres ikke av restaurant og barnepass — det er tillegg rundt kjernen.',
          },
          {
            id: 'c',
            label: 'Utvidet produkt-strategi',
            isCorrect: true,
            feedback: 'Riktig! IKEA utvider produktopplevelsen langt utover møblene. Restaurant, barnepass og pakketjeneste gjør besøket enklere og morsommere — og øker tid i butikken og lojalitet.',
          },
          {
            id: 'd',
            label: 'Vertikal integrasjon',
            isCorrect: false,
            feedback: 'Vertikal integrasjon er en forsyningskjedestrategi (kontrollere leverandørledd) — ikke et produktnivå-begrep.',
          },
        ],
        espenTip: 'IKEA er en mester på utvidet produkt: Family-kortet, restauranten, barnerommet, levering — alt bygger lojalitet og øker tid i butikken.',
      },
      {
        id: 'pb-3-5',
        icon: '💎',
        title: 'Premium vs budsjett',
        context: 'En Biltema-sykkel koster 300 kr. En Trek-sykkel koster 25 000 kr. Begge transporterer deg fra A til B.',
        question: 'Hva PRIMÆRT skiller premiumprodukt fra budsjettprodukt i markedsposisjonering?',
        choices: [
          {
            id: 'a',
            label: 'Kjernenytten er bedre i premiumprodukt',
            isCorrect: false,
            feedback: 'Kjernenytten er ofte identisk. Biltema-sykkelen og Trek-sykkelen transporterer deg like godt — kjernenytten er den samme.',
          },
          {
            id: 'b',
            label: 'Det faktiske produktet (materialer, design) er litt bedre',
            isCorrect: false,
            feedback: 'Det faktiske produktet er noe bedre, men det forklarer sjelden 80x prisforskjell. Karbonfiber vs stål er ikke 25 000 kr bedre funksjonelt.',
          },
          {
            id: 'c',
            label: 'Utvidet produkt og merkevareidentitet',
            isCorrect: true,
            feedback: 'Riktig! Premiumprisen betales primært for det utvidede produktet (service, garanti, community) og merkevareidentiteten — hvem du er som kjøper Trek.',
          },
          {
            id: 'd',
            label: 'Distribusjonskanalen er mer eksklusiv',
            isCorrect: false,
            feedback: 'Distribusjon er en del av markedsmiksen (plass), ikke ett av de tre produktnivåene. Det forklarer heller ikke prisforskjellen alene.',
          },
        ],
        espenTip: 'Premiumprisen betales sjelden for funksjon — den betales for identitet, status og det utvidede produktet.',
      },
    ],
  },

  // ── FASE 4 — Max-Neefs behovsteori ───────────────────────────────────────
  {
    type: 'theory',
    phaseNumber: 4,
    phase: {
      icon: '🌐',
      title: 'Max-Neefs behovsteori',
      quote: 'Maslow spør HVA vi trenger — Max-Neef spør HVORDAN vi dekker det',
      content:
        'Max-Neef deler behov inn i 9 grunnleggende kategorier (ikke hierarkiske — alle er like viktige): Subsistens, Beskyttelse, Hengivenhet, Forståelse, Deltakelse, Fritid, Skaperkraft, Identitet, Frihet. NØKKELFORSKJELL fra Maslow: Max-Neef skiller mellom BEHOV (universelle og evige) og SATISFAKTORER (måten vi velger å dekke dem på — kulturelt og historisk betinget).',
      subpoints: [
        {
          label: 'Identitetsbehov dekket ulikt på tvers av tid og kultur:',
          text: 'Norge 2024: Tesla, merkeklær, Instagram-profil. Norge 1950: Bunad, kirkemedlemskap, yrkestittel. Japan 2024: Grupptilhørighet, bedriftens omdømme.',
        },
      ],
      practical:
        'Markedsføring selger satisfaktorer, ikke behov. Et Rolex-ur og en Swatch selger begge identitetsbehov — men til vidt forskjellige segmenter.',
    },
  },
  {
    type: 'exercises',
    label: 'Max-Neefs behovsteori',
    phaseNumber: 4,
    exercises: [
      {
        id: 'pb-4-1',
        icon: '⚖️',
        title: 'Maslow vs Max-Neef',
        context: 'Maslow og Max-Neef tilbyr ulike perspektiver på menneskelige behov.',
        question: 'Hva er den VIKTIGSTE forskjellen mellom Maslow og Max-Neef?',
        choices: [
          {
            id: 'a',
            label: 'Maslow har 5 nivåer, Max-Neef har 9 kategorier',
            isCorrect: false,
            feedback: 'Antallet er en overfladisk forskjell. Den dypere og viktigere forskjellen handler om hierarki og skillet mellom behov og satisfaktorer.',
          },
          {
            id: 'b',
            label: 'Maslow er hierarkisk, Max-Neef sier alle behov er like viktige',
            isCorrect: false,
            feedback: 'Dette er EN viktig forskjell, men ikke den viktigste ifølge Max-Neef selv. Skillet mellom behov og satisfaktorer er mer grunnleggende.',
          },
          {
            id: 'c',
            label: 'Max-Neef skiller mellom universelle behov og kulturelle satisfaktorer',
            isCorrect: true,
            feedback: 'Riktig! Max-Neefs nøkkelbidrag: BEHOV er universelle og evige, men SATISFAKTORER (måten vi dekker dem på) er kulturelt og historisk betinget. Maslow blander disse.',
          },
          {
            id: 'd',
            label: 'Max-Neef fokuserer på fattige land, Maslow på rike',
            isCorrect: false,
            feedback: 'Max-Neef forsket mye i Latin-Amerika, men teorien er universell. Det er ikke en geografisk, men en analytisk forskjell.',
          },
        ],
        espenTip: 'Max-Neefs innsikt: "Vi kan ikke skape nye behov — vi kan bare tilby nye satisfaktorer for eksisterende behov."',
      },
      {
        id: 'pb-4-2',
        icon: '📸',
        title: 'Instagram og Max-Neef',
        context: 'Instagram brukes til å dele bilder, få likes og bygge personlig merkevare.',
        question: 'Hvilket Max-Neef-behov dekker Instagram PRIMÆRT?',
        choices: [
          {
            id: 'a',
            label: 'Subsistens (overlevelse)',
            isCorrect: false,
            feedback: 'Subsistens er mat, hus og helse — grunnleggende overlevelse. Instagram er ikke nødvendig for fysisk overlevelse.',
          },
          {
            id: 'b',
            label: 'Fritid (underholdning og avslapning)',
            isCorrect: false,
            feedback: 'Fritid er delvis relevant, men den primære driveren for Instagram-bruk er ikke passiv underholdning.',
          },
          {
            id: 'c',
            label: 'Identitet (hvem jeg er og hvordan jeg fremstår)',
            isCorrect: true,
            feedback: 'Riktig! Instagram dekker primært identitetsbehovet — hvem jeg er, min personlige fortelling og selvpresentasjon overfor andre.',
          },
          {
            id: 'd',
            label: 'Deltakelse (bidra til fellesskapet)',
            isCorrect: false,
            feedback: 'Deltakelse er en del av Instagram-bruk, men det primære er selvpresentasjon og identitetsbygging, ikke samfunnsbidrag.',
          },
        ],
        espenTip: 'Instagram er en satisfaktor for identitetsbehovet. I 1950 var det bunaden og kirkemedlemskapet. Behovet er det samme — satisfaktoren er ny.',
      },
      {
        id: 'pb-4-3',
        icon: '🔄',
        title: 'Samme behov, ulik satisfaktor',
        context: 'Max-Neef sier at identitetsbehovet dekkes ulikt i ulike kulturer og historiske perioder.',
        question: 'Hvilket eksempel BEST illustrerer "samme behov, ulike satisfaktorer"?',
        choices: [
          {
            id: 'a',
            label: 'Alle kjøper mat, men ulike typer mat',
            isCorrect: false,
            feedback: 'Matvalg dekker subsistens, ikke primært identitet. Og dette handler om preferanser, ikke om kulturell identitetsbygging.',
          },
          {
            id: 'b',
            label: 'I Norge: Tesla. I Japan: grupptilhørighet og bedriftslojalitet. Begge dekker identitetsbehov',
            isCorrect: true,
            feedback: 'Riktig! Samme grunnleggende behov (identitet), vidt forskjellige satisfaktorer — individuell statussymbol i Norge vs kollektiv gruppeidentitet i Japan.',
          },
          {
            id: 'c',
            label: 'Rolex og Swatch løser begge tidsbehovet',
            isCorrect: false,
            feedback: '"Tidsbehov" er ikke et Max-Neef-behov. Og dette eksempelet handler om pris og status, ikke om kulturell variasjon i satisfaktorer.',
          },
          {
            id: 'd',
            label: 'Nordmenn sparer i DNB, amerikanere i 401k-fond',
            isCorrect: false,
            feedback: 'Dette illustrerer ulike finansielle produkter, men ikke kulturell variasjon i identitetsbygging.',
          },
        ],
        espenTip: 'Max-Neefs innsikt er kraftig for global markedsføring: du selger den SAMME satisfaktoren, men den må kommuniseres ulikt per kultur.',
      },
      {
        id: 'pb-4-4',
        icon: '🧬',
        title: 'Universelle behov',
        context: 'Max-Neef hevder at menneskelige behov er de samme over hele verden og gjennom historien.',
        question: 'HVORFOR sier Max-Neef at behov er universelle, men satisfaktorer er kulturelle?',
        choices: [
          {
            id: 'a',
            label: 'Fordi fattige land har andre behov enn rike land',
            isCorrect: false,
            feedback: 'Max-Neef sier eksplisitt det MOTSATTE: behov er de SAMME globalt. Bare satisfaktorene varierer med velstand og kultur.',
          },
          {
            id: 'b',
            label: 'Fordi mennesker er biologisk like, men kulturen former HVORDAN vi tilfredsstiller behov',
            isCorrect: true,
            feedback: 'Riktig! Alle mennesker har identitetsbehov, hengivenhetsbehov osv. pga. vår felles biologi — men kulturen avgjør hvilke produkter og ritualer vi bruker for å dekke dem.',
          },
          {
            id: 'c',
            label: 'Fordi markedsføring påvirker behovene vi har',
            isCorrect: false,
            feedback: 'Markedsføring påvirker satisfaktorer (valg av produkt), ikke de grunnleggende behovene selv. Behovene er biologisk forankret.',
          },
          {
            id: 'd',
            label: 'Fordi Max-Neef forsket på kulturer, ikke biologi',
            isCorrect: false,
            feedback: 'Forskningstilnærmingen forklarer ikke teoriens innhold. Max-Neef hevder teorien er forankret i menneskelig natur, ikke bare kulturstudie.',
          },
        ],
        espenTip: 'Markedsføring handler alltid om å tilby den riktige satisfaktoren for et universelt behov — ikke om å endre selve behovet.',
      },
      {
        id: 'pb-4-5',
        icon: '🚗',
        title: 'Tesla vs T-bane',
        context: 'Person A kjøper Tesla til 600 000 kr. Person B tar T-banen til jobb. Begge "transporterer seg".',
        question: 'Hvilke Max-Neef-behov dekker de PRIMÆRT, og er de like?',
        choices: [
          {
            id: 'a',
            label: 'Begge dekker kun subsistens — transport er transport',
            isCorrect: false,
            feedback: 'Tesla til 600 000 kr dekker åpenbart mye mer enn ren transport. Subsistens alene forklarer ikke 600 000 kr.',
          },
          {
            id: 'b',
            label: 'Tesla = identitet og frihet. T-bane = subsistens og deltakelse. Ulike behov, ulike satisfaktorer',
            isCorrect: true,
            feedback: 'Riktig! Tesla-kjøpet er i stor grad en identitets-satisfaktor (hvem jeg er, hva jeg verdsetter) — T-banen er en subsistens/mobilitetssatisfaktor. Samme transportbehov, vidt ulike behov som aktiveres.',
          },
          {
            id: 'c',
            label: 'Begge dekker frihetsbehov — begge gir bevegelsesfrihet',
            isCorrect: false,
            feedback: 'Frihet er et Max-Neef-behov, men det er ikke det primære for daglig pendling med T-bane eller kjøp av Tesla.',
          },
          {
            id: 'd',
            label: 'Tesla = fritid, T-bane = deltakelse',
            isCorrect: false,
            feedback: 'Disse koblingene er ikke logisk forankret i Max-Neef-teorien. Tesla kjøpes primært for identitet, ikke fritid.',
          },
        ],
        espenTip: 'Max-Neef viser at samme handling (transport) kan dekke helt ulike dype behov avhengig av satisfaktoren som velges.',
      },
    ],
  },

  // ── FASE 5 — Implikasjoner for produktstrategi ──────────────────────────
  {
    type: 'theory',
    phaseNumber: 5,
    phase: {
      icon: '🎯',
      title: 'Implikasjoner for produktstrategi',
      quote: 'Vet du ikke hvilket behov du dekker, vet du ikke hvem kunden din er',
      content:
        'De fire rammeverktøyene peker direkte mot fire strategiske beslutninger: behovsnivå → prissetting og posisjonering; reelt vs skapt behov → markedsføringsstrategi; produktnivåer → produktutvikling og differensiering; Max-Neef → segmentering og kulturell tilpasning.',
      subpoints: [
        {
          label: 'KAFFEKOPPEN — Nespresso analysert gjennom alle rammer:',
          text: 'Maslow: Fysiologisk (koffein) + Sosial (gjestfrihet) + Anerkjennelse (George Clooney-effekten). Skapt behov: Nespresso skapte "barista-kaffe hjemme" — det eksisterte ikke i 1986. Produktnivåer: Kjerne=koffein, Faktisk=design+smak, Utvidet=Nespresso Club+resirkulering+butikkopplevelse. Max-Neef: Identitet (hvem jeg er som kaffedrikker) og fritid (morgenritualet).',
        },
      ],
      practical:
        'Vet du ikke hvilket behov du dekker, vet du ikke hvem kunden din er — og da vet du heller ikke hvordan du skal selge.',
    },
  },
  {
    type: 'exercises',
    label: 'Implikasjoner for produktstrategi',
    phaseNumber: 5,
    exercises: [
      {
        id: 'pb-5-1',
        icon: '❓',
        title: 'Ukjent behov = stor risiko',
        context: 'En bedrift vet ikke hvilket behov de primært dekker med produktet sitt.',
        question: 'Hva er den STØRSTE strategiske risikoen?',
        choices: [
          {
            id: 'a',
            label: 'De kan ikke patentere produktet',
            isCorrect: false,
            feedback: 'Patentering handler om immaterielle rettigheter — ikke behovsforståelse. Man kan patentere uten å forstå behovet man dekker.',
          },
          {
            id: 'b',
            label: 'De prissetter feil og markedsfører til feil målgruppe',
            isCorrect: true,
            feedback: 'Riktig! Uten behovsforståelse setter du feil pris (Maslow-nivå avgjør betalingsvilje), kommuniserer feil verdiforslag og treffer feil segment.',
          },
          {
            id: 'c',
            label: 'Produksjonskostnadene øker',
            isCorrect: false,
            feedback: 'Produksjonskostnader er operasjonelle, ikke et direkte resultat av manglende behovsforståelse.',
          },
          {
            id: 'd',
            label: 'Ansatte blir demotiverte',
            isCorrect: false,
            feedback: 'Intern motivasjon er ikke direkte knyttet til kundenes behovsanalyse.',
          },
        ],
        espenTip: '"Vet du ikke hvilket behov du dekker, vet du ikke hvem kunden din er" — og da vet du heller ikke pris, kanal eller budskap.',
      },
      {
        id: 'pb-5-2',
        icon: '📈',
        title: 'Nespresso prisøkning',
        context: 'Nespresso øker kapselprisene med 20%. Ulike kundesegmenter reagerer ulikt.',
        question: 'Hvilke kunder er MEST sannsynlig å bli?',
        choices: [
          {
            id: 'a',
            label: 'Kunder som kjøper Nespresso fordi det er billig',
            isCorrect: false,
            feedback: 'Nespresso er allerede et premiumprodukt. Prissensitive kunder er ikke Nespressos kjernesegment og forlater allerede tidlig.',
          },
          {
            id: 'b',
            label: 'Club-members som liker hele merkevareopplevelsen',
            isCorrect: true,
            feedback: 'Riktig! Club-membere er investert i det utvidede produktet (Club, recycling, premium-følelse). Disse kundene betaler for identitet — ikke koffein. De er prisuelastiske.',
          },
          {
            id: 'c',
            label: 'Kunder som kjøper Nespresso kun for koffeinbehovet',
            isCorrect: false,
            feedback: 'Koffein-fokuserte kunder vil enkelt bytte til billigere alternativer ved prisøkning — koffein er en commodity.',
          },
          {
            id: 'd',
            label: 'Alle kunder — Nespresso er monopol',
            isCorrect: false,
            feedback: 'Nespresso er ikke monopol. Det finnes mange kopier (Starbucks, egne-merker) og alternativer. Priselastisitet varierer per segment.',
          },
        ],
        espenTip: 'Lojale kunder er lojale mot det UTVIDEDE produktet og merkevareidentiteten — ikke mot kjernenytten alene.',
      },
      {
        id: 'pb-5-3',
        icon: '💰',
        title: 'Maslow og prissetting',
        context: 'En bedrift skal prissette et nytt produkt og lurer på om Maslow-nivå er relevant.',
        question: 'Hvordan påvirker Maslow-nivå prissettingsstrategien?',
        choices: [
          {
            id: 'a',
            label: 'Høyere Maslow-nivå = lavere pris fordi færre kunder trenger det',
            isCorrect: false,
            feedback: 'Feil logikk. Kunder på høyere Maslow-nivåer har ofte HØYERE betalingsvilje — de betaler for identitet og selvrealisering, ikke bare funksjon.',
          },
          {
            id: 'b',
            label: 'Maslow-nivå er irrelevant — kun produksjonskostnad bestemmer pris',
            isCorrect: false,
            feedback: 'Ren kostbasert prissetting ignorerer verdibasert prissetting. Kunder betaler ikke for kostnad — de betaler for opplevd verdi.',
          },
          {
            id: 'c',
            label: 'Produkter som dekker anerkjennelse og selvrealisering kan prises premiumt — kunder betaler for identitet, ikke funksjon',
            isCorrect: true,
            feedback: 'Riktig! Anerkjennelses- og selvrealiseringsprodukter (Rolex, Tesla, coach-kurs) prises basert på identitetsverdien og opplevd verdi — ikke funksjonsverdien.',
          },
          {
            id: 'd',
            label: 'Trygghetsprodukter (nivå 2) er alltid dyrest fordi kunden er tvunget til å kjøpe',
            isCorrect: false,
            feedback: 'Trygghetsbehov er viktige, men ikke automatisk dyrere. Forsikring er en commodity-bransje med hard priskonkurranse.',
          },
        ],
        espenTip: 'Verdibasert prissetting: pris etter hva KUNDEN oppfatter som verdi (identitet, status), ikke hva det koster å produsere.',
      },
      {
        id: 'pb-5-4',
        icon: '🛡️',
        title: 'Konkurrent kopierer produktet',
        context: 'En konkurrent lanserer en nesten identisk kopi av ditt faktiske produkt til 30% lavere pris.',
        question: 'Hvilken strategi er BEST for å beholde kunder?',
        choices: [
          {
            id: 'a',
            label: 'Senk prisen for å matche konkurrenten',
            isCorrect: false,
            feedback: 'Priskrig ødelegger marginer og er sjelden en varig strategi — spesielt for merkevarer som selger identitet og premium-opplevelse.',
          },
          {
            id: 'b',
            label: 'Styrk det utvidede produktet: bedre service, lojalitetsprogram, eksklusiv kundeklubb',
            isCorrect: true,
            feedback: 'Riktig! Det faktiske produktet kan kopieres, men det utvidede produktet (community, service, opplevelse) er vanskelig å kopiere og bygger varig lojalitet.',
          },
          {
            id: 'c',
            label: 'Legg ned produktet og start på nytt med et annet produkt',
            isCorrect: false,
            feedback: 'Å gi opp ved første konkurranse er sjelden riktig strategi. Differensiering er svaret, ikke flukt.',
          },
          {
            id: 'd',
            label: 'Søk patent på designet for å stenge konkurrenten ute',
            isCorrect: false,
            feedback: 'Patent kan hjelpe midlertidig, men løser ikke det underliggende problemet: at produktet er lett å kopiere uten sterkt utvidet produkt.',
          },
        ],
        espenTip: 'Det faktiske produktet kopieres fort. Det utvidede produktet (Apple Store-opplevelsen, Club, community) tar år å kopiere.',
      },
      {
        id: 'pb-5-5',
        icon: '⚡',
        title: 'Ny energidrikk — PULSE',
        context: 'Du skal lansere energidrikken "PULSE" for studenter og unge profesjonelle i et mettet marked med Red Bull og Monster.',
        question: 'Hvilke behov-nivåer bør markedsføringen appellere til, og hvorfor?',
        choices: [
          {
            id: 'a',
            label: 'Fysiologisk (energi) + Trygghet (helsepåstander) — funksjonell markedsføring',
            isCorrect: false,
            feedback: 'Funksjonell markedsføring differensierer ikke i et mettet marked. Red Bull og Monster eier allerede den funksjonelle energi-posisjonen.',
          },
          {
            id: 'b',
            label: 'Sosiale behov + Anerkjennelse — bygg community og statusmerke rundt PULSE',
            isCorrect: true,
            feedback: 'Riktig! Energidrikk-markedet er mettet på funksjon. Vinnere selger IDENTITET og TILHØRIGHET til en livsstil. Red Bull = ekstremsport-identitet, Monster = gaming-identitet. PULSE trenger sin nisje-identitet.',
          },
          {
            id: 'c',
            label: 'Kun Selvrealisering — posisjoner PULSE som premiumprodukt for selvforbedring',
            isCorrect: false,
            feedback: 'Selvrealisering alene er smalt og dyrt å bygge for en ny aktør. Du trenger bredere appell og et klart community rundt deg.',
          },
          {
            id: 'd',
            label: 'Ingen markedsføring — la produktkvaliteten tale for seg selv',
            isCorrect: false,
            feedback: 'I et mettet marked med sterke merkevarer er produktet uten markedsføring usynlig. Kvalitet alene selger ikke i denne bransjen.',
          },
        ],
        espenTip: 'I mettet marked vinner du ikke på funksjon — du vinner på identitet. Hvem er PULSE-drikker? Bygg det svaret før produktet lanseres.',
      },
    ],
  },
]

// ── Helpers ────────────────────────────────────────────────────────────────

interface Phase {
  phaseNumber: number
  theory: TheoryPhaseData
  exercises: QuizExercise[]
}

interface PhaseExState {
  exerciseIndex: number
  selected: string | null
  showResult: boolean
  done: boolean
  results: Record<string, boolean>
}

function buildPhases(steps: InterleavedStep[]): Phase[] {
  const phases: Phase[] = []
  for (let i = 0; i < steps.length; i++) {
    const s = steps[i]
    if (s.type === 'theory') {
      const next = steps[i + 1]
      if (next?.type === 'exercises') {
        phases.push({ phaseNumber: s.phaseNumber, theory: s.phase, exercises: next.exercises })
        i++
      }
    }
  }
  return phases
}

// ── DrawerContent ──────────────────────────────────────────────────────────

function DrawerContent({
  phase,
  exState,
  onSelect,
  onNext,
  onClose,
}: {
  phase: Phase
  exState: PhaseExState
  onSelect: (id: string) => void
  onNext: () => void
  onClose: () => void
}) {
  const { theory, exercises } = phase
  const exercise = exercises[exState.exerciseIndex]
  const isCorrect = exercise.choices.find(c => c.id === exState.selected)?.isCorrect ?? false
  const isLastExercise = exState.exerciseIndex === exercises.length - 1

  return (
    <div className="p-5 pb-16 space-y-5">
      {/* Drawer header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl shrink-0">{theory.icon}</span>
          <h2 className="font-bold theory-text text-base leading-snug truncate">{theory.title}</h2>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center theory-muted hover:theory-text hover:bg-slate-700/60 transition-colors shrink-0 text-lg"
          aria-label="Lukk"
        >
          ×
        </button>
      </div>

      {/* Theory content */}
      <div className="space-y-3">
        <p className="theory-subtext text-sm leading-relaxed italic border-l-2 border-teal-500/40 pl-3">
          "{theory.quote}"
        </p>
        {theory.content && (
          <p className="theory-subtext text-sm leading-relaxed">{theory.content}</p>
        )}
        {theory.subpoints && theory.subpoints.length > 0 && (
          <div className="space-y-2">
            {theory.subpoints.map((sp, j) => (
              <div key={j} className="pl-3 border-l-2 border-teal-500/30">
                <p className="text-xs font-semibold theory-text">{sp.label}</p>
                <p className="theory-subtext text-xs leading-relaxed mt-0.5">{sp.text}</p>
              </div>
            ))}
          </div>
        )}
        <p className="theory-muted text-xs leading-relaxed">
          <span className="font-medium">Praktisk: </span>{theory.practical}
        </p>
        {theory.glossaryTerm && (
          <div className="pt-0.5">
            <GlossaryTermBadge term={theory.glossaryTerm} />
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 pt-1">
        <div className="flex-1 h-px bg-slate-700/60" />
        <span className="text-xs font-semibold text-teal-400 uppercase tracking-wide">
          {exState.done
            ? '✅ Øvelser fullført'
            : `Øvelse ${exState.exerciseIndex + 1} av ${exercises.length}`}
        </span>
        <div className="flex-1 h-px bg-slate-700/60" />
      </div>

      {/* Done state */}
      {exState.done ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-center"
        >
          <p className="text-emerald-400 font-semibold text-sm">Bra jobbet! 🎉</p>
          <p className="theory-muted text-xs mt-1">Du har fullført alle øvelsene for dette temaet.</p>
          <button
            onClick={onClose}
            className="mt-3 px-4 py-2 rounded-lg text-sm font-semibold bg-teal-500/15 border border-teal-500/40 text-teal-400 hover:bg-teal-500/25 transition-colors"
          >
            Tilbake til oversikten
          </button>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${phase.phaseNumber}-${exState.exerciseIndex}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-3"
          >
            {/* Exercise card */}
            <div
              className="rounded-xl border border-slate-700/40 p-4 space-y-2"
              style={{ background: 'var(--answer-default-bg, rgba(30,41,59,0.8))' }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{exercise.icon}</span>
                <div>
                  <h3 className="font-bold theory-text text-sm">{exercise.title}</h3>
                  {exercise.context && (
                    <p className="theory-subtext text-xs mt-1 leading-relaxed">{exercise.context}</p>
                  )}
                </div>
              </div>
              <p className="theory-text font-medium text-sm">{exercise.question}</p>
            </div>

            {/* Choices */}
            <div className="space-y-2">
              {exercise.choices.map((choice, i) => {
                const isSelected = exState.selected === choice.id
                return (
                  <motion.button
                    key={choice.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => onSelect(choice.id)}
                    disabled={exState.showResult}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-colors text-sm leading-relaxed ${
                      exState.showResult
                        ? choice.isCorrect
                          ? 'bg-emerald-500/15 border-emerald-500/50'
                          : isSelected
                            ? 'bg-red-500/15 border-red-500/50'
                            : 'bg-slate-800/40 border-slate-700/30 theory-muted'
                        : 'bg-slate-800 border-slate-600/50 text-white hover:border-teal-500/50 hover:bg-slate-700 active:scale-[0.99]'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {exState.showResult && (
                        <span className="mt-0.5 flex-shrink-0 text-xs">
                          {choice.isCorrect ? '✅' : isSelected ? '❌' : '○'}
                        </span>
                      )}
                      <span className={exState.showResult ? 'theory-text' : ''}>{choice.label}</span>
                    </div>
                    {exState.showResult && (isSelected || choice.isCorrect) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 pt-2 border-t border-slate-400/30 text-xs theory-subtext"
                      >
                        {choice.feedback}
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Result */}
            <AnimatePresence>
              {exState.showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border px-3 py-2 text-xs ${
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  }`}
                >
                  <span className="font-medium">
                    {isCorrect ? '✅ Riktig!' : '💡 Ikke helt — se forklaringen over'}
                  </span>
                  {exercise.espenTip && (
                    <span className="ml-2 text-teal-400 font-normal">{exercise.espenTip}</span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {exState.showResult && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={onNext}
                  className="px-5 py-2.5 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors text-sm"
                >
                  {isLastExercise ? 'Fullfør tema ✓' : 'Neste øvelse →'}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

const PHASES = buildPhases(STEPS)
const TOTAL_PHASES = PHASES.length

const INTRO =
  'Produkter eksisterer for å dekke behov. Å forstå hvilke behov et produkt dekker — og på hvilket nivå — er nøkkelen til å selge riktig produkt til riktig person. Fra Maslows behovspyramide til produktets tre nivåer: dette er fundamentet for all markedsføring.'

const VISSTE_DU_AT =
  'Over 80% av nye produkter feiler i markedet — de fleste fordi de ikke løste et reelt kundebehov. Coca-Cola lanserte «New Coke» i 1985 og måtte trekke den tilbake etter 79 dager fordi de misforsto hva kundene egentlig kjøpte: ikke smak, men nostalgi og identitet.'

const ESPEN_SIER =
  'Neste gang du handler, spør deg selv: dekker dette et reelt behov eller er det et skapt behov? Og på hvilket Maslow-nivå? Du vil aldri handle på samme måte igjen.'

export default function ProduktBehovModule() {
  useThemeEffect()
  const navigate = useNavigate()

  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [exStates, setExStates] = useState<PhaseExState[]>(
    PHASES.map(() => ({
      exerciseIndex: 0,
      selected: null,
      showResult: false,
      done: false,
      results: {},
    }))
  )

  const doneCount = exStates.filter(s => s.done).length
  const allDone = doneCount === TOTAL_PHASES
  const progressPct = (doneCount / TOTAL_PHASES) * 100

  const closeDrawer = useCallback(() => setActiveIdx(null), [])

  function updateEx(idx: number, patch: Partial<PhaseExState>) {
    setExStates(prev => prev.map((s, i) => i === idx ? { ...s, ...patch } : s))
  }

  function handleSelect(phaseIdx: number, choiceId: string) {
    const ps = exStates[phaseIdx]
    if (ps.showResult) return
    const exercise = PHASES[phaseIdx].exercises[ps.exerciseIndex]
    const choice = exercise.choices.find(c => c.id === choiceId)!
    updateEx(phaseIdx, {
      selected: choiceId,
      showResult: true,
      results: { ...ps.results, [exercise.id]: choice.isCorrect },
    })
  }

  function handleNext(phaseIdx: number) {
    const ps = exStates[phaseIdx]
    const phase = PHASES[phaseIdx]
    const nextIdx = ps.exerciseIndex + 1
    if (nextIdx < phase.exercises.length) {
      updateEx(phaseIdx, { exerciseIndex: nextIdx, selected: null, showResult: false })
    } else {
      updateEx(phaseIdx, { done: true })
    }
  }

  function handleComplete() {
    const totalExercises = PHASES.flatMap(p => p.exercises).length
    const correctCount = exStates.reduce(
      (sum, ps) => sum + Object.values(ps.results).filter(Boolean).length,
      0
    )
    localStorage.setItem('learning-mfi-produkt-behov', JSON.stringify({
      completed: true,
      score: correctCount,
      total: totalExercises,
      date: new Date().toISOString(),
    }))
    navigate('/learning/mfi/produkt-behov/complete', {
      state: { passed: true, score: correctCount, total: totalExercises },
    })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-28">

      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700/50 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3 gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                onClick={() => navigate(-1)}
                className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center theory-muted hover:theory-text hover:bg-slate-700/60 transition-colors text-lg"
                aria-label="Tilbake"
              >
                ←
              </button>
              <span className="text-xl sm:text-2xl shrink-0">🛍️</span>
              <div className="min-w-0">
                <h1 className="font-bold theory-text text-sm sm:text-lg truncate">
                  MFI-PB: Produkt og behov
                </h1>
                <p className="theory-muted text-xs">
                  {allDone ? 'Alle temaer fullført! 🎉' : `${doneCount} av ${TOTAL_PHASES} temaer fullført`}
                </p>
              </div>
            </div>
            <div className="text-teal-400 font-bold text-xs sm:text-sm shrink-0 whitespace-nowrap">
              {doneCount}/{TOTAL_PHASES}
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              className="bg-teal-500 h-2 rounded-full"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Presentation link card */}
        <div className="bg-slate-800 border border-violet-500/30 rounded-2xl p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">🎬</span>
            <div className="flex-1 min-w-0">
              <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">Produkt — kjerneproduktet, Maslow, livssyklus og sortiment</p>
              <button
                onClick={() => navigate('/learning/presentations/produkt')}
                className="mt-2.5 px-4 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors"
              >
                Åpne presentasjon →
              </button>
              <p className="text-gray-500 text-[10px] mt-1.5">
                Åpnes i fullskjerm. Trykk Esc for å gå tilbake.
              </p>
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="theory-bg rounded-2xl border border-slate-700/50 p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">🛍️</span>
            <p className="theory-subtext text-sm leading-relaxed">{INTRO}</p>
          </div>
        </div>

        {/* Phase list */}
        <div className="space-y-2">
          {PHASES.map((phase, idx) => {
            const isDone = exStates[idx].done
            const isActive = activeIdx === idx
            return (
              <motion.button
                key={phase.phaseNumber}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setActiveIdx(idx)}
                className={`w-full text-left rounded-xl border-2 transition-colors px-4 py-3 ${
                  isActive
                    ? 'border-teal-500/60 bg-teal-500/10'
                    : isDone
                      ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50'
                      : 'border-slate-700/50 theory-bg hover:border-teal-500/40 hover:bg-teal-500/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                    isDone
                      ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                      : 'bg-teal-500/20 border border-teal-500/30 text-teal-400'
                  }`}>
                    {isDone ? '✓' : phase.phaseNumber}
                  </span>
                  <span className="text-lg shrink-0">{phase.theory.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className={`font-semibold text-sm truncate ${isDone ? 'text-emerald-400' : 'theory-text'}`}>
                      {phase.theory.title}
                    </p>
                    <p className="theory-muted text-xs truncate mt-0.5 leading-snug">
                      {phase.theory.quote}
                    </p>
                  </div>
                  <span className={`text-sm shrink-0 transition-transform ${isActive ? 'rotate-90 text-teal-400' : 'theory-muted'}`}>
                    ›
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Complete section */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 pt-2"
            >
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex gap-3">
                <span className="text-xl shrink-0">💡</span>
                <div>
                  <p className="text-amber-300 font-semibold text-xs mb-1">Visste du at...?</p>
                  <p className="text-amber-100/80 text-xs leading-relaxed">{VISSTE_DU_AT}</p>
                </div>
              </div>
              <div className="theory-bg rounded-xl border border-teal-500/30 p-4 flex gap-3">
                <span className="text-2xl shrink-0">🧑‍💼</span>
                <div>
                  <p className="text-teal-400 font-semibold text-xs mb-1">Espen sier:</p>
                  <p className="theory-subtext text-xs leading-relaxed italic">"{ESPEN_SIER}"</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleComplete}
                  className="px-6 py-3 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors text-sm"
                >
                  Se resultater →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Drawer */}
      <TheoryDrawer isOpen={activeIdx !== null} onClose={closeDrawer}>
        {activeIdx !== null && (
          <DrawerContent
            phase={PHASES[activeIdx]}
            exState={exStates[activeIdx]}
            onSelect={(id) => handleSelect(activeIdx, id)}
            onNext={() => handleNext(activeIdx)}
            onClose={closeDrawer}
          />
        )}
      </TheoryDrawer>

      <GlossaryPopup />
    </div>
  )
}
