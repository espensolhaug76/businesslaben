import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP = '🎯 Jo smalere målgruppe du definerer, jo mer treffsikker blir markedsføringen — men jo færre kan du nå!'

export const MALGRUPPE_EXERCISES: QuizExercise[] = [
  {
    id: 'mg-01',
    icon: '🗺️',
    title: 'Segmenteringskriterier',
    context:
      'Spotify vil segmentere markedet for å skreddersy annonser og produkttilbud. De har tilgang til data om alder, bosted, musikksmak, lyttefrekvens og inntektsnivå.',
    question: 'Hvilket segmenteringskriterium bruker Spotify når de skiller mellom brukere som lytter til K-pop og brukere som lytter til klassisk musikk?',
    choices: [
      {
        id: 'a',
        label: 'Demografisk segmentering — ulik alder og kjønn lytter til ulik musikk.',
        isCorrect: false,
        feedback:
          'Feil. Demografisk segmentering baserer seg på målbare egenskaper som alder, kjønn og inntekt. Musikkpreferanser kan korrelere med alder, men det er ikke demografien som er selve segmenteringsvariabelen her.',
      },
      {
        id: 'b',
        label: 'Psykografisk segmentering — musikksmak reflekterer livsstil, verdier og personlighet.',
        isCorrect: true,
        feedback:
          'Riktig! Psykografisk segmentering deler markedet basert på livsstil, interesser, verdier og personlighetstrekk. Musikkpreferanse er en sterk psykografisk indikator. Spotify bruker dette til å plassere brukere i "music taste clusters" som guider annonsering og spillelistealgoritmer.',
      },
      {
        id: 'c',
        label: 'Geografisk segmentering — K-pop er populært i Asia, klassisk i Europa.',
        isCorrect: false,
        feedback:
          'Feil. Geografisk segmentering handler om bosted og region. Selv om noen musikksjangere har geografiske trender, er det ikke geografi som er segmenteringsvariabelen i dette eksempelet.',
      },
      {
        id: 'd',
        label: 'Adferdsbasert segmentering — forskjellige brukere har ulik lyttefrekvens.',
        isCorrect: false,
        feedback:
          'Feil. Adferdsbasert segmentering handler om kjøpsatferd, bruksfrekvens og lojalitet — ikke om hva man velger å lytte til. Lyttefrekvens er adferdsbasert, men musikksjangeren er psykografisk.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'mg-02',
    icon: '👑',
    title: 'Primær vs sekundær målgruppe',
    context:
      'Spotify Premium koster 129 kr per måned. Spotify ønsker å konvertere gratis-brukere til betalende abonnenter. De har identifisert to grupper: (1) studenter 18–25 år med lav inntekt som lytter daglig, og (2) voksne 30–45 år med høyere inntekt som lytter av og til.',
    question: 'Hvem bør Spotify definere som primær målgruppe for Spotify Premium-konvertering?',
    choices: [
      {
        id: 'a',
        label: 'Voksne 30–45 år, fordi de har høyere inntekt og råd til å betale.',
        isCorrect: false,
        feedback:
          'Feil. Betalingsevne er én faktor, men ikke den eneste. Voksne som lytter "av og til" har lav engasjement og vil ikke oppleve annonsene som like forstyrrende. De har svakere motivasjon til å oppgradere enn dagliglyttere.',
      },
      {
        id: 'b',
        label: 'Studenter 18–25 år, fordi de lytter daglig og opplever annonser som svært forstyrrende — sterkest motivasjon til å oppgradere.',
        isCorrect: true,
        feedback:
          'Riktig! Primær målgruppe er den gruppen som har sterkest behov og høyest sannsynlighet for konvertering. Dagliglyttere med hyppig eksponering for annonser har størst incentiv til å betale for annonsefri lytting. Spotify tilbyr faktisk studentrabatt (69 kr/mnd) nettopp av denne grunn.',
      },
      {
        id: 'c',
        label: 'Begge grupper er like viktige og bør prioriteres likt.',
        isCorrect: false,
        feedback:
          'Feil. I markedsføring er ressursene begrenset. Å prioritere likt betyr å optimere for ingen. Primær målgruppe er den gruppen som gir best avkastning på markedsføringsinvesteringen — og det er dagliglytterne.',
      },
      {
        id: 'd',
        label: 'Verken — Spotify bør fokusere på bedriftskunder med Spotify for Business.',
        isCorrect: false,
        feedback:
          'Feil. Spotify for Business er et eget segment. Spørsmålet handler om Premium-konvertering av eksisterende gratis-brukere, og her er den primære målgruppen de mest engasjerte lytterne.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'mg-03',
    icon: '🧑‍💼',
    title: 'Persona-bygging',
    context:
      'Nike skal lansere en ny løpeskokolleksjon for kvinner. De har samlet inn data og identifisert en typisk kjøper: Marte, 32 år, bor i Oslo, trener 4 ganger i uken, følger treningsinfluencere på Instagram, er opptatt av bærekraft og bruker 3 000–5 000 kr på treningsutstyr per år.',
    question: 'Hva er hensikten med å lage en persona som "Marte" i stedet for å bruke generell statistikk?',
    choices: [
      {
        id: 'a',
        label: 'En persona gir mer nøyaktig statistikk enn demografiske data.',
        isCorrect: false,
        feedback:
          'Feil. En persona er ikke ment å gi statistisk nøyaktighet — den er en konstruert representasjon, ikke en ekte person. Statistikk er faktisk mer nøyaktig enn en persona. Poenget er noe annet.',
      },
      {
        id: 'b',
        label: 'En persona gjør det lettere for markedsføringsteamet å ta beslutninger ved å gi målgruppen et menneskelig ansikt og en konkret kontekst.',
        isCorrect: true,
        feedback:
          'Riktig! En persona humaniserer målgruppen og gjør det lettere å tenke seg hva "Marte" ville reagert på et annonsebudskap, en emballasjedesign eller et prispunkt. Det er lettere å skrive en tekst til "Marte" enn til "kvinner 25–40 år i urban setting".',
      },
      {
        id: 'c',
        label: 'En persona hjelper Nike å utelukke alle andre kunder utenfor persona-beskrivelsen.',
        isCorrect: false,
        feedback:
          'Feil. En persona er et hjelpemiddel, ikke en utelukkelse. Nike vil gjerne selge til alle kvinner som vil ha løpesko. Persona-verktøyet optimerer kommunikasjonen — det ekskluderer ikke kunder.',
      },
      {
        id: 'd',
        label: 'En persona erstatter behovet for markedsundersøkelser og A/B-testing.',
        isCorrect: false,
        feedback:
          'Feil. En persona er basert på markedsundersøkelser og erstatter dem ikke. A/B-testing er fortsatt nødvendig for å validere antakelsene i persona-beskrivelsen. Persona er et planleggingsverktøy, ikke en sannhet.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'mg-04',
    icon: '👟',
    title: 'Segmentering i praksis',
    context:
      'Nike har to sub-merker: Nike Women (fokus på trening, velvære og inkludering i alle størrelser) og Nike Running (fokus på ytelse, hastighet og maratonløpere). Begge selger til kvinner, men med svært ulike budskap.',
    question: 'Hvilken segmenteringsstrategi bruker Nike her?',
    choices: [
      {
        id: 'a',
        label: 'Udifferensiert strategi — Nike behandler alle kvinner som én homogen gruppe.',
        isCorrect: false,
        feedback:
          'Feil. En udifferensiert strategi bruker ett budskap til alle. Nike gjør det stikk motsatte: de har distinkte sub-merker med ulike budskap, estetikk og verdiforslag til ulike kvinnesegmenter.',
      },
      {
        id: 'b',
        label: 'Konsentrert strategi — Nike fokuserer kun på én smal nisje av kvinner.',
        isCorrect: false,
        feedback:
          'Feil. En konsentrert strategi betyr å velge én målgruppe og satse alt på den. Nike bruker to distinkte merkeposisjoner (Women og Running) som retter seg mot to ulike segmenter — det er ikke konsentrert.',
      },
      {
        id: 'c',
        label: 'Differensiert strategi — Nike retter seg mot flere segmenter med tilpassede budskap og produktlinjer.',
        isCorrect: true,
        feedback:
          'Riktig! En differensiert segmenteringsstrategi betyr å velge flere segmenter og tilpasse tilbudet til hvert. Nike Women treffer de treningsbevisste og inkluderingsorienterte, mens Nike Running treffer prestasjonsorienterte løpere. Begge er kvinner, men med ulike behov og motivasjoner.',
      },
      {
        id: 'd',
        label: 'Nisje-strategi — Nike spesialiserer seg kun på løping og ekskluderer all annen trening.',
        isCorrect: false,
        feedback:
          'Feil. Nike er en av verdens bredeste sportsmerkevarer og satser på mange segmenter — ikke bare løping. Nike Running er én produktlinje, men Nike som merkevare er langt bredere.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'mg-05',
    icon: '🍷',
    title: 'Nisje vs masse-marked',
    context:
      'Vinmonopolet i Norge har monopol på salg av vin og sprit. Likevel kjøper noen kunder alltid billigste vin til 89 kr, mens andre alltid velger håndlaget naturvin til 350–500 kr. Vinmonopolet skal optimere sortimentet sitt.',
    question: 'Hvilken segmenteringsstrategi bør Vinmonopolet bruke for sine to tydeligste kundesegmenter?',
    choices: [
      {
        id: 'a',
        label: 'Vinmonopolet bør satse kun på billigvin-segmentet fordi det er størst i volum.',
        isCorrect: false,
        feedback:
          'Feil. Volumstørrelse er ikke det eneste kriteriet. Naturvin-segmentet er mindre i volum men genererer høyere marginer per flaske. En ensidig fokus på lavpris-segmentet lar høymarginsegmentet underserveres.',
      },
      {
        id: 'b',
        label: 'Vinmonopolet bør bruke én uniform kommunikasjon til alle kunder for å unngå å fremmedgjøre noen.',
        isCorrect: false,
        feedback:
          'Feil. En uniform kommunikasjon til svært ulike segmenter vil treffe ingen av dem godt. Billigvin-kunden motiveres av pris og enkelhet; naturvin-kunden motiveres av historie, terroir og produksjonsmetode — disse kräver svært ulike budskap.',
      },
      {
        id: 'c',
        label: 'Differensiert strategi: tilpasse sortiment, hylleplass og kommunikasjon til begge segmenter ut fra deres ulike behov og motivasjoner.',
        isCorrect: true,
        feedback:
          'Riktig! Vinmonopolet betjener et bredt marked. En differensiert strategi lar dem optimere for begge ytterpunktene: bredt, tilgjengelig sortiment for volum-segmentet og kuraterte, håndlagde viner med kunnskap og historier for premiumsegmentet. Butikkoppsettet og digital kommunikasjon kan tilpasses begge.',
      },
      {
        id: 'd',
        label: 'Vinmonopolet trenger ikke segmentere fordi de har monopol og kundene kommer uansett.',
        isCorrect: false,
        feedback:
          'Feil. Selv med monopol på salg gjelder behovet for segmentering. Kunder som ikke finner det de søker vil kjøpe mindre, handle sjeldnere eller importere privat. Monopol fjerner ikke konkurransen om kundens lommebok — det er alltid andre alkohol- eller drikkevalg tilgjengelig.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
