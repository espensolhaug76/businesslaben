import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '⚖️',
    title: 'Lovgivning i servicenæringen',
    quote: 'Å kjenne loven er ikke bare juristenes jobb — det er enhver næringsdriver sitt ansvar.',
    content:
      'Servicenæringen er regulert av en rekke lover som beskytter ansatte, kunder og samfunnet. De viktigste lovene du møter som ansatt eller leder i servicenæringen er: Arbeidsmiljøloven (AML) — regulerer arbeidsforhold, arbeidstid og HMS. Ferieloven — gir alle ansatte rett til minst 25 virkedager ferie og feriepenger. Forbrukerkjøpsloven — beskytter private kunder som kjøper varer. Kjøpsloven — regulerer handel mellom næringsdrivende. Markedsføringsloven — forbyr villedende reklame og urimelig handelspraksis. Personopplysningsloven (GDPR) — regulerer håndtering av kundedata. Å bryte disse lovene kan føre til bøter, krav og i verste fall stengning av virksomheten.',
    subpoints: [
      { label: 'ARBEIDSMILJØLOVEN (AML)', text: 'Norges viktigste lov for arbeidsforhold. Regulerer arbeidstid (maks 9 timer/dag, 40 t/uke), HMS, varsling, oppsigelse og ansattes rettigheter.' },
      { label: 'FERIELOVEN', text: '25 virkedager ferie (4+1 uker), feriepenger beregnes som 10,2% av feriegrunnlaget (12% for arbeidstakere over 60 år).' },
      { label: 'FORBRUKERKJØPSLOVEN', text: 'Gir private forbrukere rett til reklamasjon i inntil 5 år på varer med feil, og minst 2 år garanti fra produsent.' },
    ],
    practical:
      'Se for deg at du er butikksjef. En ansatt krever feriepenger utbetalt. En kunde klager på et defekt produkt fra for 3 år siden. Hvilke lover gjelder i hvert tilfelle?',
    exercises: [
      {
        id: 'rl-1-1',
        question: 'Hvilken lov regulerer arbeidstid, HMS og ansattes rettigheter i Norge?',
        choices: [
          { id: 'a', text: 'Markedsføringsloven' },
          { id: 'b', text: 'Ferieloven' },
          { id: 'c', text: 'Arbeidsmiljøloven (AML)' },
          { id: 'd', text: 'Forbrukerkjøpsloven' },
        ],
        correctId: 'c',
        explanation: 'Arbeidsmiljøloven (AML) er den sentrale loven for norsk arbeidsliv — den regulerer arbeidstid, HMS, oppsigelse, varsling og alle grunnleggende arbeidsforhold.',
      },
      {
        id: 'rl-1-2',
        question: 'En kunde kjøpte en jakke for 2 år siden. Glidelåsen brakk. Har kunden rett til reklamasjon?',
        choices: [
          { id: 'a', text: 'Nei — garantien er på maks 1 år' },
          { id: 'b', text: 'Nei — reklamasjonsretten er bare 6 måneder' },
          { id: 'c', text: 'Ja — forbrukerkjøpsloven gir reklamasjonsrett i inntil 5 år på feil som eksisterte ved kjøpet' },
          { id: 'd', text: 'Ja — men bare hvis kunden har kvittering' },
        ],
        correctId: 'c',
        explanation: 'Forbrukerkjøpsloven § 27 gir forbrukeren rett til å reklamere på feil i inntil 5 år. En glidelås som brakk etter 2 år er sannsynligvis en opprinnelig mangel — kunden kan kreve reparasjon, omlevering eller pengene tilbake.',
      },
      {
        id: 'rl-1-3',
        question: 'Hva er minstesatsen for feriepenger etter ferieloven?',
        choices: [
          { id: 'a', text: '5% av årslønn' },
          { id: 'b', text: '10,2% av feriegrunnlaget (fjorårets lønn)' },
          { id: 'c', text: '15% av årslønn' },
          { id: 'd', text: '20% av fjorårets inntekt' },
        ],
        correctId: 'b',
        explanation: 'Ferieloven fastsetter feriepenger til minimum 10,2% av feriegrunnlaget for de fleste arbeidstakere (12% for arbeidstakere over 60 år som har 5 uker ferie).',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🛒',
    title: 'Forbrukervern og reklamasjonsrett',
    quote: 'Kunden som kjøper noe av deg, stoler på deg. Loven sørger for at den tilliten er beskyttet.',
    content:
      'Forbrukervern er et sentralt tema i servicenæringen fordi vi jobber direkte med privatpersoner. Forbrukerkjøpsloven skiller mellom garanti (frivillig løfte fra produsent/selger om ytelse utover lovens krav) og reklamasjonsrett (den lovfestede rettigheten alle forbrukere har). Viktig: Reklamasjonsretten er ALLTID i behold selv om garantien er utløpt. Ved en mangel har kunden krav på: (1) Reparasjon eller omlevering, (2) Prisavslag, (3) Heving av kjøpet (pengene tilbake) hvis feilen er vesentlig. Angrerettloven gir i tillegg rett til å angre kjøp gjort nettbasert eller utenfor fast salgssted innen 14 dager uten å oppgi grunn — dette gjelder ikke for varer kjøpt i fysisk butikk.',
    subpoints: [
      { label: 'REKLAMASJON vs GARANTI', text: 'Garanti er en frivillig ytelse fra selger/produsent. Reklamasjonsretten er en lovfestet rettighet som alltid gjelder — uavhengig av garantitiden.' },
      { label: 'ANGRERETTLOVEN', text: '14 dagers angrerett ved netthandel og telefonsalg. Kunden trenger ikke oppgi grunn. Gjelder IKKE for varer kjøpt i fysisk butikk.' },
      { label: 'MANGELENS UTBEDRING', text: 'Rekkefølge ved mangel: 1) Reparasjon/omlevering (selgers valg), 2) Prisavslag, 3) Heving av kjøp (ved vesentlig mangel).' },
    ],
    practical:
      'En kunde returnerer et par sko etter 6 måneder fordi sålen har løsnet. Kunden krever pengene tilbake. Walk gjennom hva du som selger kan tilby, og hva loven sier om forbrukerkjøp.',
    exercises: [
      {
        id: 'rl-2-1',
        question: 'Hva er forskjellen mellom reklamasjonsrett og garanti?',
        choices: [
          { id: 'a', text: 'Det er ingen forskjell — de betyr det samme' },
          { id: 'b', text: 'Reklamasjonsretten er lovfestet og alltid i behold; garanti er et frivillig tillegg fra produsent/selger' },
          { id: 'c', text: 'Garanti er lovfestet; reklamasjonsrett er frivillig' },
          { id: 'd', text: 'Reklamasjonsretten gjelder bare netthandel' },
        ],
        correctId: 'b',
        explanation: 'Reklamasjonsretten er en lovfestet rettighet som alltid gjelder, uavhengig av garantitiden. Garanti er noe produsenten/selgeren tilbyr frivillig utover lovens krav.',
      },
      {
        id: 'rl-2-2',
        question: 'En kunde bestilte en sofa på nett og ønsker å returnere den uten grunn etter 10 dager. Har kunden rett til dette?',
        choices: [
          { id: 'a', text: 'Nei — angrerettloven gjelder bare for mat og klær' },
          { id: 'b', text: 'Nei — kunden må ha en god grunn til å returnere' },
          { id: 'c', text: 'Ja — angrerettloven gir 14 dagers angrefrist ved netthandel uten krav om begrunnelse' },
          { id: 'd', text: 'Ja — men bare hvis sofaen er ubrukt og i original emballasje' },
        ],
        correctId: 'c',
        explanation: 'Angrerettloven gir forbrukere 14 dagers angrefrist ved kjøp utenfor fast salgssted (netthandel, telefonsalg) uten å oppgi grunn. 10 dager er innenfor fristen.',
      },
      {
        id: 'rl-2-3',
        question: 'Hvilken løsning skal selgeren tilby FØRST når en kunde reklamerer på en vare med mangel?',
        choices: [
          { id: 'a', text: 'Pengene tilbake umiddelbart (heving)' },
          { id: 'b', text: 'Et prisavslag tilsvarende mangelen' },
          { id: 'c', text: 'Reparasjon eller omlevering — selger velger' },
          { id: 'd', text: 'Et gavekort som kompensasjon' },
        ],
        correctId: 'c',
        explanation: 'Selgeren har rett til å forsøke å utbedre mangelen (reparere) eller levere en ny vare (omlevering) som første steg. Kun hvis dette mislykkes eller er urimelig kan kunden kreve prisavslag eller heving.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '📋',
    title: 'Registrering, tillatelser og næringslovgivning',
    quote: 'En bedrift som ikke er registrert er som et hus uten adresse — ingen vet at du finnes.',
    content:
      'For å drive lovlig næring i Norge må bedriften registreres i Enhetsregisteret (via Brønnøysundregistrene). De fleste som starter enkeltpersonforetak (ENK) kan gjøre dette gratis på Altinn. Aksjeselskap (AS) krever innskutt aksjekapital på minst 30 000 kr og registrering med gebyr. Noen næringer krever i tillegg spesifikke tillatelser: Serveringssteder trenger serveringsbevilling og eventuelt skjenkebevilling fra kommunen. Reisebyråer må registreres hos Reisegarantifondet. Turoperatører trenger godkjenning fra Luftfartstilsynet eller Statens vegvesen avhengig av transportform. Manglende registrering eller tillatelser kan gi bøter, og i verste fall tvangsstengning av virksomheten.',
    subpoints: [
      { label: 'ENHETSREGISTERET', text: 'Alle norske bedrifter må registreres i Enhetsregisteret for å få et organisasjonsnummer. Dette er grunnlaget for all formell næringsvirksomhet.' },
      { label: 'SERVERINGSBEVILLING', text: 'Nødvendig for å drive restaurant, kafé eller annet serveringssted. Utstedt av kommunen. Skjenkebevilling (alkohol) er et tillegg som krever egne krav til styrer.' },
      { label: 'MVA-REGISTRERING', text: 'Bedrifter med omsetning over 50 000 kr per år plikter å registrere seg i MVA-registeret og legge til 25% MVA på sine varer og tjenester.' },
    ],
    practical:
      'Gå inn på Brønnøysund.no og finn ut hva som kreves for å starte et enkeltpersonforetak vs. et aksjeselskap. Hva er de praktiske forskjellene i oppstartskapital og ansvar?',
    exercises: [
      {
        id: 'rl-3-1',
        question: 'Hvilken instans må en ny norsk bedrift registrere seg hos for å få organisasjonsnummer?',
        choices: [
          { id: 'a', text: 'Skatteetaten' },
          { id: 'b', text: 'Enhetsregisteret (Brønnøysundregistrene)' },
          { id: 'c', text: 'NAV' },
          { id: 'd', text: 'Kommunen' },
        ],
        correctId: 'b',
        explanation: 'Alle norske bedrifter må registreres i Enhetsregisteret hos Brønnøysundregistrene for å få et organisasjonsnummer. Uten dette kan bedriften ikke drive lovlig næring.',
      },
      {
        id: 'rl-3-2',
        question: 'Hva trenger en ny restaurant utover vanlig bedriftsregistrering?',
        choices: [
          { id: 'a', text: 'Ingenting ekstra — bedriftsregistrering er nok' },
          { id: 'b', text: 'Serveringsbevilling fra kommunen, og eventuelt skjenkebevilling for å selge alkohol' },
          { id: 'c', text: 'Godkjenning fra Mattilsynet er tilstrekkelig' },
          { id: 'd', text: 'Lisens fra Nærings- og fiskeridepartementet' },
        ],
        correctId: 'b',
        explanation: 'Serveringssteder trenger serveringsbevilling utstedt av kommunen. For å selge alkohol kreves i tillegg en separat skjenkebevilling med krav til ansvarlig styrer med bestått skjenkeprøve.',
      },
      {
        id: 'rl-3-3',
        question: 'Når plikter en bedrift å registrere seg i MVA-registeret?',
        choices: [
          { id: 'a', text: 'Med en gang de starter sin virksomhet' },
          { id: 'b', text: 'Aldri — MVA-registrering er frivillig' },
          { id: 'c', text: 'Når omsetningen overstiger 50 000 kr i løpet av tolv måneder' },
          { id: 'd', text: 'Når de har mer enn 5 ansatte' },
        ],
        correctId: 'c',
        explanation: 'Merverdiavgiftsloven krever MVA-registrering når omsetningen overstiger 50 000 kr per år. Registrerte bedrifter legger 25% MVA til varene/tjenestene og overfører dette til staten.',
      },
    ],
  },
]

export default function ReglerLovverkModule() {
  return (
    <DrawerModule
      moduleCode="FD8"
      moduleTitle="Regler og lovverk for servicenæringen"
      moduleIcon="⚖️"
      storageKey="learning-regler-lovverk"
      completeRoute="/learning/forretningsdrift/regler-lovverk/complete"
      phases={phases}
      intro="Lovene er rammeverket vi alle jobber innenfor. Kjenner du dem, er du beskyttet. Kjenner du dem ikke, er du sårbar — for krav, bøter og tap av tillatelser."
      vissteduAt="Norske forbrukere har blant verdens sterkeste forbrukervern. Reklamasjonsretten på 5 år er dobbelt så lang som i EU."
      espenSier="Lovverk høres kjedelig ut — men de er faktisk der for å beskytte deg. Forstår du reglene, kan du bruke dem aktivt fremfor å bli overkjørt av dem."
      presentationLink={{ route: '/learning/presentations/regler-lovverk', description: 'Regler og lovverk — en visuell gjennomgang av norsk næringslivslovgivning' }}
    />
  )
}
