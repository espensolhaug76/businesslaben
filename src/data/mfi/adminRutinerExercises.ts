import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP =
  '⚠️ God returhåndtering er ikke bare kostnad — det er en mulighet til å beholde kunden!'

export const ADMIN_RUTINER_EXERCISES: QuizExercise[] = [
  {
    id: 'admin-01',
    icon: '📦',
    title: 'Mottak av retur',
    context:
      'En kunde møter opp i Sko & Co med et par løpesko kjøpt for to uker siden. Kunden virker litt frustrert og sier at skoen ikke passet likevel. Du er ansatt på kundeservice.',
    question: 'Hva er det aller første du bør gjøre i en returmottak-situasjon?',
    choices: [
      {
        id: 'a',
        label: 'Undersøk skoene nøye for tegn på bruk før du sier noe til kunden.',
        isCorrect: false,
        feedback:
          'Feil. Å begynne med å inspisere varen uten å hilse eller bekrefte kjøpet signaliserer mistillit. Kunden vil føle seg behandlet som en mistenkt, ikke som en verdsatt gjest. Det skader relasjonen fra første sekund.',
      },
      {
        id: 'b',
        label: 'Bekreft kjøpet (be om kvittering eller ordrenummer), spør om årsak til retur og vis forståelse for situasjonen.',
        isCorrect: true,
        feedback:
          'Riktig! God returhåndtering starter med å bekrefte kjøpet (nødvendig for å behandle returen), kartlegge årsak (viktig for statistikk og for å finne riktig løsning) og vise empati. Rekkefølgen og tonen setter hele premisset for kundeopplevelsen.',
      },
      {
        id: 'c',
        label: 'Si med en gang at de bare kan bytte — ikke refundere.',
        isCorrect: false,
        feedback:
          'Feil. Du har ikke ennå kartlagt hva kunden ønsker, hva årsaken er, eller hva de har rett til. Å presentere en løsning før du forstår problemet er å hoppe over hele behovskartleggingen.',
      },
      {
        id: 'd',
        label: 'Ring vaktlederen — retur er ikke ditt ansvar.',
        isCorrect: false,
        feedback:
          'Feil. Å sende kunden videre unødvendig er en dårlig kundeopplevelse. Grunnleggende returmottak bør alle ansatte på kundeservice håndtere. Vaktleder involveres kun ved tvistesituasjoner eller unntakstilfeller.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'admin-02',
    icon: '💻',
    title: 'Systemregistrering av retur',
    context:
      'Kunden leverer inn skoparet og du skal nå registrere returen i butikkens administrasjonssystem. Systemet har mange feltmuligheter.',
    question: 'Hvilke opplysninger er det viktigst å registrere for å sikre god administrasjon?',
    choices: [
      {
        id: 'a',
        label: 'Bare kundens navn og telefonnummer.',
        isCorrect: false,
        feedback:
          'Feil. Kontaktinformasjon alene er utilstrekkelig. Uten ordre-ID vet du ikke hva som ble kjøpt, uten artikkel-ID kan du ikke oppdatere lageret, og uten returårsak kan du ikke analysere mønstre og forbedre sortimentet.',
      },
      {
        id: 'b',
        label: 'Bare ordrenummer og beløp for refusjon.',
        isCorrect: false,
        feedback:
          'Feil. Refusjonsbeløpet er viktig for regnskapet, men mangler returårsak og artikkelinformasjon. Uten årsaksregistrering mister bedriften verdifull data om produktkvalitet, størrelsesguide-nøyaktighet og kundeopplevelse.',
      },
      {
        id: 'c',
        label: 'Ingenting — returer håndteres manuelt med papirskjema.',
        isCorrect: false,
        feedback:
          'Feil. Papirbaserte systemer gir ingen mulighet for automatisk lageroppdatering, statistikkanalyse eller sporbarhet på tvers av butikker. Digitale systemer gir bedre kontroll og innsikt.',
      },
      {
        id: 'd',
        label: 'Ordre-ID, artikkel-ID, returårsak, dato og kundeinfo — dette muliggjør lageroppdatering, returstatistikk og trendanalyse.',
        isCorrect: true,
        feedback:
          'Riktig! Komplett registrering gir bedriften data til å: oppdatere lager korrekt, analysere hvilke produkter som returneres og hvorfor, forbedre størrelsesguider og produktbeskrivelser, og sette KPI-er for returraten. God dataregistrering er fundamentet for god forretningsdrift.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'admin-03',
    icon: '⚖️',
    title: 'Reklamasjonsrett',
    context:
      'Kunden viser deg at sålen på den to uker gamle løpeskoen har løsnet på siden. Det er tydelig en produksjonsfeil — ikke normalt slitasje. Kunden ønsker gratis reparasjon.',
    question: 'Har kunden rett til gratis utbedring, og hva sier loven?',
    choices: [
      {
        id: 'a',
        label: 'Nei — garantien på sko er vanligvis bare 30 dager, og to uker er grenseland.',
        isCorrect: false,
        feedback:
          'Feil. Reklamasjonsretten etter forbrukerkjøpsloven er uavhengig av eventuelle kortere "garantier" butikken oppgir. Loven gir minimum 2 års reklamasjonsrett, og en "30-dagers garanti" kan ikke erstatte denne lovfestede retten.',
      },
      {
        id: 'b',
        label: 'Ja — reklamasjonsretten er 2 år (forbrukerkjøpsloven §27). Feil som oppstår innen 6 måneder anses som opprinnelig mangel, og bevisbyrden ligger hos selger.',
        isCorrect: true,
        feedback:
          'Riktig! Forbrukerkjøpsloven gir 2 års reklamasjonsfrist (5 år for varer ment å vare lenger). Viktigst: feil som oppstår innen de første 6 månedene antas å ha eksistert ved kjøpstidspunktet — det er butikkens ansvar å motbevise dette, ikke kundens. Her er feilen åpenbar og to uker gammel.',
      },
      {
        id: 'c',
        label: 'Ja, men bare hvis kunden kan bevise at det er en produksjonsfeil.',
        isCorrect: false,
        feedback:
          'Feil. Bevisbyrden er snudd de første 6 månedene etter kjøp. Kunden trenger ikke bevise noe — det er selgers ansvar å bevise at feilen skyldes feil bruk av kunden. Etter 6 måneder skifter bevisbyrden over til kunden.',
      },
      {
        id: 'd',
        label: 'Nei — reklamasjonsrett gjelder bare for elektronikk, ikke sko.',
        isCorrect: false,
        feedback:
          'Feil. Forbrukerkjøpsloven gjelder for alle forbrukerkjøp av løsøre — sko, klær, elektronikk, møbler og mye mer. Det finnes ikke noe slikt unntak for sko eller tekstiler.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'admin-04',
    icon: '🔄',
    title: 'Kundens valgmuligheter ved reklamasjon',
    context:
      'Kunden med den defekte løpeskoen ønsker pengene tilbake (heving av kjøpet). Butikklederen sier: "Vi tilbyr kun bytte — ikke refusjon." Kunden er misfornøyd.',
    question: 'Hva sier forbrukerkjøpsloven om kundens rettigheter i denne situasjonen?',
    choices: [
      {
        id: 'a',
        label: 'Butikken har rett — bytting er standardløsningen ved reklamasjon.',
        isCorrect: false,
        feedback:
          'Feil. Det finnes ingen regel om at bytting er "standardløsningen". Forbrukerkjøpsloven gir kunden et hierarki av rettigheter, og butikken kan ikke ensidig bestemme hvilken løsning som skal brukes.',
      },
      {
        id: 'b',
        label: 'Kunden kan kreve refusjon med en gang — reklamasjon betyr alltid pengene tilbake.',
        isCorrect: false,
        feedback:
          'Feil. Kunden har ikke ubetinget rett til refusjon som første skritt. Loven gir selgeren rett til å forsøke reparasjon eller omlevering (nytt produkt) FØR kunden kan kreve prisavslag eller heving. Men selger kan ikke tvinge inn et alternativ som ikke passer kunden.',
      },
      {
        id: 'c',
        label: 'Kunden kan velge mellom reparasjon, omlevering (nytt produkt) eller prisavslag/heving. Butikken kan ikke tvinge kunden til å ta bytting hvis kunden har rimelig grunn til å velge annerledes.',
        isCorrect: true,
        feedback:
          'Riktig! Forbrukerkjøpsloven §29–36 gir kunden rett til å velge mellom reparasjon og omlevering i første omgang. Hvis ingen av disse løsningene er mulige, passende eller skjer innen rimelig tid, kan kunden kreve prisavslag eller heving av kjøpet (refusjon). Butikken kan ikke ensidig stenge for alle alternativene.',
      },
      {
        id: 'd',
        label: 'Kunden har ingen ytterligere rettigheter — butikken bestemmer selv.',
        isCorrect: false,
        feedback:
          'Feil. Forbrukerkjøpsloven er ufravikelig til ugunst for forbrukeren — det betyr at butikker ikke kan gi dårligere rettigheter enn det loven fastsetter, uansett hva butikkens egne regler sier.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'admin-05',
    icon: '📈',
    title: 'Dataanalyse og kvalitetsforbedring',
    context:
      'Ledelsen hos Sko & Co gjennomgår månedlig rapport. De ser at returraten på sko er 18% — nesten én av fem kjøp returneres. Bransjesnitt er 9%.',
    question: 'Hva bør ledelsen gjøre med denne informasjonen?',
    choices: [
      {
        id: 'a',
        label: 'Innføre strengere returpolitikk for å redusere antall returer.',
        isCorrect: false,
        feedback:
          'Feil. Å stramme inn returpolitikken løser ikke den underliggende årsaken til at så mange returnerer — det skjuler symptomet og risikerer å skade kundeforholdet. Kunder som ikke kan returnere enkelt, handler ikke der igjen.',
      },
      {
        id: 'b',
        label: 'Ignorere det — returer er en normal del av netthandel.',
        isCorrect: false,
        feedback:
          'Feil. 18% er nesten dobbelt av bransjegjennomsnittet på 9%. Det er et signal om et reelt problem som koster bedriften penger (frakt, håndtering, lagerplass) og muligens indikerer misnøye med produktene.',
      },
      {
        id: 'c',
        label: 'Slutte å selge de mest returnerte produktene.',
        isCorrect: false,
        feedback:
          'Feil. Å kutte produkter uten å forstå returårsaken er å handle i blinde. Kanskje problemet er størrelsesguiden, produktbilder, eller beskrivelser — ikke produktene i seg selv. Analyse må komme FØR tiltak.',
      },
      {
        id: 'd',
        label: 'Analysere returårsakene (størrelsesguide, produktkvalitet, forventningsgap), iverksette målrettede tiltak og sette KPI om å redusere returraten til under 10% innen 6 måneder.',
        isCorrect: true,
        feedback:
          'Riktig! Datadrevet beslutning: først forstå årsaken (analyse), så handle (tiltak), så måle effekten (KPI). Vanlige årsaker til høy retur er feil størrelsesguide, misvisende produktbilder eller dårlig produktbeskrivelse — alle kan fikses. God returhåndtering er ikke bare kostnadskontroll, det er produktutvikling.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
