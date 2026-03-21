import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const PRODUKTSTRATEGI_EXERCISES: QuizExercise[] = [
  {
    id: 'ps_1',
    icon: '🎧',
    title: 'AirPods og produktets livssyklus',
    context: 'AirPods ble lansert i 2016 og fikk raskt en eksplosiv salgsvekst. Fortjenesten til Apple steg kraftig, og konkurrenter som Samsung og Sony begynte å introdusere egne trådløse ørepropper.',
    question: 'AirPods (2016) selger raskt, fortjeneste stiger, konkurrenter begynner å kopiere. Hvilken PLC-fase er dette?',
    choices: [
      { id: 'a', label: 'Introduksjonsfasen — lavt salg og høye lanseringskostnader', isCorrect: false, feedback: 'Introduksjonsfasen kjennetegnes av lavt salg og negative eller null fortjeneste. Her er salget derimot eksploderende og fortjenesten stiger kraftig — det er ikke introduksjon.' },
      { id: 'b', label: 'Vekstfasen — sterk salgsvekst og begynnende konkurranse', isCorrect: true, feedback: 'Riktig! Vekstfasen kjennetegnes av rask salgsvekst, stigende fortjeneste og at konkurrenter begynner å kopiere suksessen. Det er nøyaktig det AirPods opplevde fra 2016 til 2019.' },
      { id: 'c', label: 'Modenhets­fasen — salgsvekst flater ut og priskrig begynner', isCorrect: false, feedback: 'Modenhets­fasen kjennetegnes av at salget flater ut og sterk priskonkurranse. Her er salget fremdeles i kraftig vekst — det kommer modenhet senere i livssyklusen.' },
      { id: 'd', label: 'Tilbakegangsfasen — salget faller og teknologien erstattes', isCorrect: false, feedback: 'Tilbakegangsfasen kjennetegnes av fallende salg og at produktet enten revitaliseres, melkes eller avvikles. Et produkt med kraftig salgsvekst er absolutt ikke i tilbakegang.' },
    ],
    espenTip: 'Huskeregel for PLC-fasene: Intro = "prøver å leve", Vekst = "blomstrer og kopieres", Modenhet = "slåss om andeler", Tilbakegang = "overlever eller dør".',
  },
  {
    id: 'ps_2',
    icon: '🗃️',
    title: 'Sortimentsbeslutninger',
    context: 'Coca-Cola selger Cola, Cola Diet, Cola Zero, Cola Cherry og Cola Vanilla (dybde). Pepsi selger cola, brus, juice, vann, snacks og sportsdrikker (bredde). Begge er store, men med ulike sortimentsstrategier.',
    question: 'Hva er forskjellen mellom bredde og dybde i et produktsortiment?',
    choices: [
      { id: 'a', label: 'Bredde = antall varianter per produktlinje. Dybde = antall produktlinjer', isCorrect: false, feedback: 'Dette er snudd om. Bredde og dybde er enkelt å blande: bredde refererer til antallet ulike produktlinjer (horisontalt), mens dybde refererer til antallet varianter innen én linje (vertikalt).' },
      { id: 'b', label: 'Bredde = antall ulike produktlinjer. Dybde = antall varianter innen én linje', isCorrect: true, feedback: 'Riktig! Bredde = antall produktlinjer (eks: iPhone, Mac, iPad, Watch = 4 brede linjer). Dybde = varianter innen én linje (eks: iPhone 15, 15 Plus, 15 Pro, 15 Pro Max = 4 dype varianter).' },
      { id: 'c', label: 'Bredde = premium-produkter øverst. Dybde = rimelige produkter nederst', isCorrect: false, feedback: 'Det er ikke en definisjon i sortimentsstrategien. Bredde og dybde handler om antallet produktlinjer og varianter — ikke prisnivå eller plassering i porteføljen.' },
      { id: 'd', label: 'Bredde = geografi. Dybde = antall kunder per marked', isCorrect: false, feedback: 'Geografi er ikke relevant for bredde/dybde-begrepene i sortimentsstrategi. Bredde handler om antall produktlinjer, dybde om varianter — begge er interne produktportefølje-beslutninger.' },
    ],
    espenTip: 'Rema 1000 er bevisst smal (ca. 350 varer mot Rimi/Extra sine 2000+) — de ofrer bredde for å holde priser nede og logistikk enkel. Det er en strategisk sortimentsbeslutning.',
  },
  {
    id: 'ps_3',
    icon: '🏷️',
    title: 'Merkearkitektur hos Orkla',
    context: 'Orkla eier Grandiosa (pizza), Stabburet (pålegg), Toro (krydder og sauser), Nidar (godteri) og Jordan (tannbørster). Hvert merke er kjent for seg selv, og de fleste forbrukere vet ikke at de er eid av Orkla.',
    question: 'Orkla selger Grandiosa, Stabburet, Toro som separate merker. Hva kalles denne merkevarearkitekturen?',
    choices: [
      { id: 'a', label: 'Monolittisk merkevarearkitektur — ett merke for alle produkter', isCorrect: false, feedback: 'Monolittisk arkitektur er det stikk motsatte: ett overordnet merke brukes for alle produkter (som Apple bruker "Apple" foran alt). Orkla bruker separate merker — det er pluralistisk.' },
      { id: 'b', label: 'Hybrid merkevarearkitektur — kombinasjon av ett og flere merker', isCorrect: false, feedback: 'Hybrid arkitektur kombinerer elementer fra monolittisk og pluralistisk (eks: Toyota + Lexus). Orkla bruker ikke Orkla-navnet på sine produktmerker i det hele tatt — det er rent pluralistisk.' },
      { id: 'c', label: 'Pluralistisk merkevarearkitektur — hvert produkt har sitt eget merke', isCorrect: true, feedback: 'Riktig! Pluralistisk arkitektur betyr at selskapet eier mange separate, uavhengige merker. Orkla er et godt eksempel: P&G er det globale eksemplet med alt fra Tide til Gillette.' },
      { id: 'd', label: 'Privat merke-arkitektur — butikkens egne merkevarer', isCorrect: false, feedback: 'Private label (privat merke) er butikkens egne merker, som First Price hos NorgesGruppen. Grandiosa, Stabburet og Toro er nasjonale merkevarer eid av Orkla — ikke butikkmerker.' },
    ],
    espenTip: 'Fordelen med pluralistisk arkitektur: ett merke kan floppes uten å skade de andre. Ulempen: dyrt å bygge merkevarebevissthet for hvert merke separat.',
  },
  {
    id: 'ps_4',
    icon: '📦',
    title: 'Den stille selgeren',
    context: 'I en supermarkedshylle med 15 lignende yoghurtprodukter har kunden i gjennomsnitt 5 sekunder til å velge. Det er ingen selger, ingen reklame i øyeblikket — bare produktet og emballasjen foran deg.',
    question: 'Hva er "den stille selgeren" i markedsføring?',
    choices: [
      { id: 'a', label: 'Selgere som bruker stille salgsteknikker og aktiv lytting', isCorrect: false, feedback: '"Den stille selgeren" er et metafor om emballasje — ikke om menneskelige selgere. Det refererer til at emballasjen "selger" produktet uten menneskelig hjelp i butikkhyllen.' },
      { id: 'b', label: 'Emballasjen — kommuniserer merkevare og differensiering i kjøpsøyeblikket', isCorrect: true, feedback: 'Riktig! Emballasjen kalles "den stille selgeren" fordi den er det siste markedsføringstiltaket før kjøp. Den kommuniserer merkevare, ingredienser og differensiering uten noen menneskelig selger.' },
      { id: 'c', label: 'Nettbutikken — salget skjer automatisk uten menneskelig interaksjon', isCorrect: false, feedback: 'Netthandel er et relevant eksempel på automatisert salg, men "den stille selgeren" er et etablert markedsføringsbegrep som spesifikt refererer til emballasjens rolle i fysisk detaljhandel.' },
      { id: 'd', label: 'Word-of-mouth — kunder anbefaler produkter til hverandre uten betalt reklame', isCorrect: false, feedback: 'Word-of-mouth er verdifull markedsføring, men det er ikke "den stille selgeren". Det begrepet refererer spesifikt til emballasjens kommunikative rolle i kjøpsøyeblikket.' },
    ],
    espenTip: 'Toblerone-trekantformen og Perrier-flasken er ikonisk emballasje — gjenkjennbar uten å se merkenavnet. Det er god emballasjedesign: produktet identifiserer seg selv.',
  },
  {
    id: 'ps_5',
    icon: '⭐',
    title: 'Brand equity — Apples merkeverdi',
    context: 'Apple produserer en iPhone for omtrent 400 dollar i produksjonskostnader. Den selges for 1 000–1 300 dollar. Fortjenestemargin er rundt 60%. Kundene stiller i kø natten før lansering, og mange eier 3–4 Apple-produkter.',
    question: 'Hva er "brand equity" (merkeverdi)?',
    choices: [
      { id: 'a', label: 'Den totale omsetningen til et merke i ett regnskapsår', isCorrect: false, feedback: 'Omsetning er et regnskapstall, ikke merkeverdi. Brand equity er en strategisk størrelse som inkluderer premium-pris, lojalitet og tillit — alt som overstiger produktets fysiske verdi.' },
      { id: 'b', label: 'Kostnaden for å produsere og markedsføre et produkt', isCorrect: false, feedback: 'Produksjons- og markedsføringskostnader er innsatsfaktorer, ikke merkeverdi. Brand equity er UTOVER kostnadene — det er den ekstra verdien kunden tilskriver merkenavnet.' },
      { id: 'c', label: 'Antall kunder som er kjent med merket (merkebevissthet)', isCorrect: false, feedback: 'Merkebevissthet (brand awareness) er én komponent av brand equity, men ikke hele definisjonen. Brand equity inkluderer også merkelojalitet, opplevd kvalitet og merkeassosiasjoner.' },
      { id: 'd', label: 'Merkevarens verdi utover det fysiske produktet — premium-pris, lojalitet og tillit', isCorrect: true, feedback: 'Riktig! Brand equity er den ekstra verdien merkenavnet tilfører utover produktets fysiske egenskaper. Apple kan ta 600 dollar mer enn produksjonskostnaden nettopp fordi Apple-merket har enormt sterk equity.' },
    ],
    espenTip: 'Apple er verdens mest verdifulle merkevare med en brand equity verdi på over 500 milliarder dollar. Det er ikke produktene som er verdt det — det er tilliten, lojaliteten og assosiasjonen folk har til Apple-merket.',
  },
]
