import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🧭',
    title: 'Hva er yrkesetikk?',
    quote: 'Etikk handler om å gjøre det rette når ingen ser på',
    practical:
      'Yrkesetikk er de normer og verdier som gjelder i et yrke. De fleste bransjer har egne etiske retningslinjer. 78% av forbrukere velger bort uetiske bedrifter.',
    glossaryTerm: 'Yrkesetikk',
    exercises: [
      {
        id: 'etikk-1-1',
        question: 'Hva er yrkesetikk?',
        choices: [
          { id: 'a', text: 'Lovene som regulerer arbeidslivet' },
          { id: 'b', text: 'De normer og verdier som gjelder i et bestemt yrke eller bransje' },
          { id: 'c', text: 'Personlig moral' },
          { id: 'd', text: 'Bedriftens reklamestrategi' },
        ],
        correctId: 'b',
        explanation: 'Yrkesetikk er bransjens og yrkets normer og verdier — de standardene for atferd som forventes av profesjonelle i en bestemt rolle.',
      },
      {
        id: 'etikk-1-2',
        question: 'Hva viser statistikken om forbrukere og uetiske bedrifter?',
        choices: [
          { id: 'a', text: '20% velger bort uetiske bedrifter' },
          { id: 'b', text: '78% velger bort uetiske bedrifter, selv om produktet er billigere' },
          { id: 'c', text: 'Forbrukere bryr seg ikke om etikk' },
          { id: 'd', text: '50% av forbrukere sjekker etikk aktivt' },
        ],
        correctId: 'b',
        explanation: '78% av forbrukere sier de velger bort bedrifter de opplever som uetiske — etikk er altså ikke bare moralsk riktig, det er god forretning.',
      },
      {
        id: 'etikk-1-3',
        question: 'Hvorfor har de fleste bransjer egne etiske retningslinjer i tillegg til lovene?',
        choices: [
          { id: 'a', text: 'For å erstatte lovene' },
          { id: 'b', text: 'Fordi etikk dekker situasjoner der loven er taus — grå soner der det er lov men ikke riktig' },
          { id: 'c', text: 'For å gjøre det vanskeligere å jobbe' },
          { id: 'd', text: 'Fordi myndighetene krever det' },
        ],
        correctId: 'b',
        explanation: 'Lover setter minimumskrav — etikk handler om det som er riktig selv om det ikke er lovpålagt. Retningslinjer fyller gapet mellom loven og «det rette».',
      },
      {
        id: 'etikk-1-4',
        question: 'Hva betyr setningen «etikk handler om å gjøre det rette når ingen ser på»?',
        choices: [
          { id: 'a', text: 'At man kun trenger å oppføre seg etisk i møter' },
          { id: 'b', text: 'At ekte etisk atferd er konsistent uavhengig av om man blir overvåket eller bedømt' },
          { id: 'c', text: 'At det er lov å snarveier når sjefen ikke ser' },
          { id: 'd', text: 'At man bør installere overvåkingskameraer' },
        ],
        correctId: 'b',
        explanation: 'Ekte integritet er å oppføre seg riktig uavhengig av publikum — det er dette som bygger tillit over tid, ikke bare det man viser frem.',
      },
      {
        id: 'etikk-1-5',
        question: 'En butikkmedarbeider ser en kollega ta en vare uten å betale. Hva er etisk riktig handling?',
        choices: [
          { id: 'a', text: 'Ignorere det for å unngå konflikt' },
          { id: 'b', text: 'Konfrontere kollega direkte eller varsle leder — å se bort fra tyveri er ikke lojalitet' },
          { id: 'c', text: 'Gjøre det samme selv' },
          { id: 'd', text: 'Fortelle andre ansatte' },
        ],
        correctId: 'b',
        explanation: 'Yrkesetikk forplikter til å handle — å se bort fra et lovbrudd er ikke lojalitet overfor kollega, det er svik overfor arbeidsgiver og profesjonen.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '⚠️',
    title: 'Varsling og lojalitet',
    quote: 'Du har rett og plikt til å varsle om kritikkverdige forhold',
    practical:
      'Arbeidsmiljøloven § 2A beskytter varslere. Lojalitetsplikt betyr ikke at du skal dekke over lovbrudd. Anonym varsling er mulig.',
    exercises: [
      {
        id: 'etikk-2-1',
        question: 'Hvilken lov beskytter arbeidstakere som varsler om kritikkverdige forhold?',
        choices: [
          { id: 'a', text: 'Straffeloven' },
          { id: 'b', text: 'Arbeidsmiljøloven § 2A' },
          { id: 'c', text: 'Markedsføringsloven' },
          { id: 'd', text: 'Forbrukerkjøpsloven' },
        ],
        correctId: 'b',
        explanation: 'Arbeidsmiljøloven § 2A gir varslere lovbeskyttelse — de kan ikke lovlig utsettes for gjengjeldelse fra arbeidsgiver for å ha varslet.',
      },
      {
        id: 'etikk-2-2',
        question: 'Hva er et «kritikkverdig forhold» som kan begrunne varsling?',
        choices: [
          { id: 'a', text: 'At man er misfornøyd med lønn' },
          { id: 'b', text: 'Lovbrudd, fare for liv/helse, grove brudd på etiske normer eller misbruk av myndighet' },
          { id: 'c', text: 'Uenighet om arbeidsoppgaver' },
          { id: 'd', text: 'Dårlig stemning på arbeidsplassen' },
        ],
        correctId: 'b',
        explanation: 'Varsling gjelder alvorlige forhold — lovbrudd, sikkerhetstrusler, korrupsjon og grov uetisk atferd. Personlig misnøye er normalt ikke grunnlag for formell varsling.',
      },
      {
        id: 'etikk-2-3',
        question: 'Betyr lojalitetsplikten overfor arbeidsgiver at man skal dekke over lovbrudd?',
        choices: [
          { id: 'a', text: 'Ja, man er lojal mot arbeidsgiver over alt' },
          { id: 'b', text: 'Nei, lojalitetsplikten har grenser — den dekker aldri krav om å dekke over lovbrudd' },
          { id: 'c', text: 'Det er opp til den ansatte' },
          { id: 'd', text: 'Kun for alvorlige lovbrudd' },
        ],
        correctId: 'b',
        explanation: 'Lojalitetsplikt er ikke absolutt — man kan ikke forpliktes til å delta i eller tie om lovbrudd. Å varsle er i slike tilfeller en rettighet og plikt.',
      },
      {
        id: 'etikk-2-4',
        question: 'Hva er anonym varsling og når er det aktuelt?',
        choices: [
          { id: 'a', text: 'Varsling uten å oppgi navn — aktuelt når den ansatte frykter gjengjeldelse' },
          { id: 'b', text: 'Varsling til politiet' },
          { id: 'c', text: 'Varsling via sosiale medier' },
          { id: 'd', text: 'Varsling om konkurrenter' },
        ],
        correctId: 'a',
        explanation: 'Anonym varsling gir mulighet til å rapportere kritikkverdige forhold uten å identifisere seg — viktig for å senke terskelen der gjengjeldelse er fryktet.',
      },
      {
        id: 'etikk-2-5',
        question: 'En ansatt oppdager at ledelsen falsifiserer regnskapet. Hva er riktig handling?',
        choices: [
          { id: 'a', text: 'Si ingenting for å beholde jobben' },
          { id: 'b', text: 'Varsle internt (revisor, styringskomité) eller eksternt (Finanstilsynet, politi)' },
          { id: 'c', text: 'Fortelle venner og familie' },
          { id: 'd', text: 'Slutte umiddelbart uten å varsle' },
        ],
        correctId: 'b',
        explanation: 'Regnskapsforfalskning er alvorlig lovbrudd — varsling gjennom korrekte kanaler er både lovlig beskyttet og etisk forpliktet.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🔄',
    title: 'Interessekonflikter',
    quote: 'Personlige interesser skal aldri styre yrkesutøvelsen',
    practical:
      'Eksempler: ta imot bestikkelser, hjelpe venner forbi køen, gi familierabatt utover retningslinjene, handle aksjer basert på innsideinformasjon.',
    exercises: [
      {
        id: 'etikk-3-1',
        question: 'Hva er en interessekonflikt i arbeidslivet?',
        choices: [
          { id: 'a', text: 'En uenighet med kolleger' },
          { id: 'b', text: 'Situasjoner der personlige interesser kan påvirke profesjonelle beslutninger og vurderinger' },
          { id: 'c', text: 'Konflikter om arbeidsoppgaver' },
          { id: 'd', text: 'Konkurranse mellom bedrifter' },
        ],
        correctId: 'b',
        explanation: 'En interessekonflikt oppstår når egne interesser (penger, vennskap, familiebånd) kan påvirke hvordan man utfører jobben — noe som truer integriteten.',
      },
      {
        id: 'etikk-3-2',
        question: 'En bankansatt råder en kunde til å investere i et selskap der den ansatte eier aksjer. Hva er dette?',
        choices: [
          { id: 'a', text: 'God investeringsrådgivning' },
          { id: 'b', text: 'En interessekonflikt — den ansatte har personlig gevinst av å gi dette rådet' },
          { id: 'c', text: 'Et lovlig samarbeid' },
          { id: 'd', text: 'Normal forretningspraksis' },
        ],
        correctId: 'b',
        explanation: 'Når personlig gevinst kan påvirke profesjonelle råd, foreligger en interessekonflikt — den ansatte bør informere kunden og fratre rådgivningen.',
      },
      {
        id: 'etikk-3-3',
        question: 'Hva er innsidehandel og hvorfor er det ulovlig?',
        choices: [
          { id: 'a', text: 'Å handle aksjer i butikker man jobber i — det er lovlig' },
          { id: 'b', text: 'Å handle aksjer basert på ikke-offentlig, kurssensitiv informasjon man har fått gjennom jobben — gir urettferdig markedsfordel' },
          { id: 'c', text: 'Å handle innenfor landets grenser' },
          { id: 'd', text: 'Å kjøpe varer på jobb til lavere pris' },
        ],
        correctId: 'b',
        explanation: 'Innsidehandel er å bruke ikke-offentlig privilegert informasjon til å tjene penger på aksjehandel — det er ulovlig fordi det gir en urettferdig fordel.',
      },
      {
        id: 'etikk-3-4',
        question: 'En ansatt i Rema 1000 slipper sin venn forbi køen ved kassen. Hva er dette?',
        choices: [
          { id: 'a', text: 'God kundeservice' },
          { id: 'b', text: 'En interessekonflikt — personlig relasjon brukes til å gi urettferdig fordel' },
          { id: 'c', text: 'En trivelig gest' },
          { id: 'd', text: 'Det er greit hvis ingen ser det' },
        ],
        correctId: 'b',
        explanation: 'Å favorisere venner eller familie på jobben er en interessekonflikt — personlig relasjon påvirker profesjonell atferd på en måte som er urettferdig overfor andre kunder.',
      },
      {
        id: 'etikk-3-5',
        question: 'Hva bør en ansatt gjøre hvis de oppdager at de er i en interessekonflikt?',
        choices: [
          { id: 'a', text: 'Skjule det og håpe ingen legger merke til det' },
          { id: 'b', text: 'Informere leder/relevant part om konflikten og eventuelt fratre beslutningen' },
          { id: 'c', text: 'Fortsette som normalt — det er ingen stor sak' },
          { id: 'd', text: 'Avslutte konflikten ved å si nei til venner og familie' },
        ],
        correctId: 'b',
        explanation: 'Transparens er nøkkelen — å avsløre og fratre interessekonflikter er det etisk riktige og viser integritet. De fleste organisasjoner har prosedyrer for dette.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '📲',
    title: 'Sosiale medier og yrkesstolthet',
    quote: 'Alt du poster som ansatt kan knyttes til arbeidsgiveren din',
    practical:
      'Mange har mistet jobben for negative poster om arbeidsgiver eller kunder. Lojalitetsplikten gjelder også digitalt.',
    exercises: [
      {
        id: 'etikk-4-1',
        question: 'Hva gjelder for sosiale medier og lojalitetsplikten overfor arbeidsgiver?',
        choices: [
          { id: 'a', text: 'Sosiale medier er privat og ikke arbeidsgivers sak' },
          { id: 'b', text: 'Lojalitetsplikten gjelder digitalt — negative poster om arbeidsgiver eller kunder kan få arbeidsrettslige konsekvenser' },
          { id: 'c', text: 'Man kan skrive hva man vil på private profiler' },
          { id: 'd', text: 'Sosiale medier er utenfor arbeidslivslovgivningen' },
        ],
        correctId: 'b',
        explanation: 'Lojalitetsplikten strekker seg til digitale kanaler — og alt man poster kan kobles til arbeidsgiveren, selv fra «private» profiler.',
      },
      {
        id: 'etikk-4-2',
        question: 'En ansatt poster et bilde av en kunde (uten samtykke) og kommenterer ironisk om dem. Hva er konsekvensene?',
        choices: [
          { id: 'a', text: 'Ingen konsekvenser hvis de bruker pseudonym' },
          { id: 'b', text: 'Brudd på personvern (GDPR), lojalitetsplikt og etiske normer — kan føre til oppsigelse og bøter' },
          { id: 'c', text: 'Det er greit hvis kunden ikke ser det' },
          { id: 'd', text: 'Kun et HR-problem' },
        ],
        correctId: 'b',
        explanation: 'Å poste bilder av kunder uten samtykke bryter GDPR — i tillegg er det et grovt brudd på yrkesetikk og lojalitetsplikten som kan medføre oppsigelse.',
      },
      {
        id: 'etikk-4-3',
        question: 'Hva betyr «yrkesstolthet» i praksis?',
        choices: [
          { id: 'a', text: 'At man alltid er fornøyd med jobben sin' },
          { id: 'b', text: 'At man identifiserer seg med yrkets normer, standard og omdømme — og aktivt bidrar til å opprettholde dem' },
          { id: 'c', text: 'At man ikke klager på jobben' },
          { id: 'd', text: 'At man promoterer arbeidsgiveren på sosiale medier' },
        ],
        correctId: 'b',
        explanation: 'Yrkesstolthet handler om å ta yrket og dets standarder på alvor — å representere faget på en måte som holder omdømmet oppe, også digitalt.',
      },
      {
        id: 'etikk-4-4',
        question: 'Kan en arbeidsgiver reagere på sosiale medieposter fra ansatte gjort på fritiden?',
        choices: [
          { id: 'a', text: 'Nei — fritid er privat' },
          { id: 'b', text: 'Ja, dersom postene skader arbeidsgivers omdømme, bryter taushetsplikten eller inneholder sensitive opplysninger' },
          { id: 'c', text: 'Kun ved brudd på straffeloven' },
          { id: 'd', text: 'Kun ved bruk av arbeidsgivers logo' },
        ],
        correctId: 'b',
        explanation: 'Lojalitetsplikten gjelder hele tiden — arbeidsgiver kan reagere hvis fritidsposter skader bedriftens omdømme eller bryter andre plikter.',
      },
      {
        id: 'etikk-4-5',
        question: 'En ansatt deler konfidensielle opplysninger om en kunde i en WhatsApp-gruppe med kollegaer. Hva er dette?',
        choices: [
          { id: 'a', text: 'Greit siden det kun er kollegaer' },
          { id: 'b', text: 'Brudd på taushetsplikten og GDPR — konfidensielle opplysninger er beskyttet uavhengig av kanal' },
          { id: 'c', text: 'Internt kommunikasjon er alltid tillatt' },
          { id: 'd', text: 'Det er kun forbudt på offentlige kanaler' },
        ],
        correctId: 'b',
        explanation: 'Taushetsplikt og personvern gjelder alle kanaler — også interne. Konfidensielle kundedata skal ikke deles uten tjenstlig behov, ikke engang med kollegaer.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🌱',
    title: 'Bærekraft og etikk',
    quote: 'Etiske valg og lønnsomhet kan gå hånd i hånd',
    practical:
      'Patagonia reparerer klær fremfor å selge nytt — og har rekordhøyt kundelojalitet. People, Planet, Profit: alle tre må ivaretas for langsiktig suksess.',
    glossaryTerm: 'Triple Bottom Line',
    exercises: [
      {
        id: 'etikk-5-1',
        question: 'Hva er kjernen i «Triple Bottom Line»-modellen?',
        choices: [
          { id: 'a', text: 'At bedrifter har tre avdelinger' },
          { id: 'b', text: 'At bedrifter bør måle suksess på tre dimensjoner: People (sosial), Planet (miljø) og Profit (økonomi)' },
          { id: 'c', text: 'At man alltid bør ha tre mål i markedsplanen' },
          { id: 'd', text: 'At profitt er viktigst av de tre' },
        ],
        correctId: 'b',
        explanation: 'Triple Bottom Line er ideen om at bærekraftig suksess krever balanse mellom alle tre: sosial ansvarlighet, miljøpåvirkning og finansiell lønnsomhet.',
      },
      {
        id: 'etikk-5-2',
        question: 'Patagonia oppfordrer kunder til å kjøpe MINDRE av produktene sine og reparerer klær. Hva er det etiske og forretningsmessige resonnementet?',
        choices: [
          { id: 'a', text: 'Det er ren filantropi uten forretningsmessig logikk' },
          { id: 'b', text: 'Autentiske etiske valg bygger sterkere lojalitet enn tradisjonell markedsføring — og kunder betaler mer for verdidrevne merkevarer' },
          { id: 'c', text: 'De selger ikke nok produkter til å tjene penger' },
          { id: 'd', text: 'Det er kun PR-stunt' },
        ],
        correctId: 'b',
        explanation: 'Patagonia demonstrerer at konsekvent etisk atferd bygger ekstremt sterk merkevare og kundelojalitet — etikk og lønnsomhet er ikke motsetninger.',
      },
      {
        id: 'etikk-5-3',
        question: 'Hva er sammenhengen mellom etisk forretningsdrift og langsiktig profitt?',
        choices: [
          { id: 'a', text: 'Etikk reduserer alltid profitt' },
          { id: 'b', text: 'Etisk atferd bygger tillit og lojalitet som over tid er lønnsomt — kortsiktige innsparinger på etikk koster mer på lang sikt' },
          { id: 'c', text: 'Det er ingen sammenheng' },
          { id: 'd', text: 'Etikk er kun relevant for store selskaper' },
        ],
        correctId: 'b',
        explanation: 'Uetisk atferd koster — omdømmetap, kundeavgang, rettsaker, bøter. Over tid er integritet et konkurransefortrinn som gir sterkere forretningsresultater.',
      },
      {
        id: 'etikk-5-4',
        question: 'Hva betyr People-dimensjonen i Triple Bottom Line for en norsk detaljhandelsbedrift?',
        choices: [
          { id: 'a', text: 'Å ansette flest mulig' },
          { id: 'b', text: 'Å sikre gode arbeidsforhold for ansatte, fair behandling av leverandører og positiv påvirkning på lokalsamfunn' },
          { id: 'c', text: 'Å ha mange kunder' },
          { id: 'd', text: 'Å donere til veldedighet' },
        ],
        correctId: 'b',
        explanation: 'People-dimensjonen handler om alle som påvirkes av bedriften — ansatte, leverandørers arbeidere, lokalsamfunn og kunder. Ikke bare å ha mange ansatte.',
      },
      {
        id: 'etikk-5-5',
        question: 'En bedrift velger billigste leverandør selv om de vet det innebærer dårlige arbeidsforhold for fabrikkarbeidere. Hvilken TBL-dimensjon brytes?',
        choices: [
          { id: 'a', text: 'Planet' },
          { id: 'b', text: 'People' },
          { id: 'c', text: 'Profit' },
          { id: 'd', text: 'Ingen — det er et legitimeert forretningsvalg' },
        ],
        correctId: 'b',
        explanation: 'Dårlige arbeidsforhold hos leverandører bryter People-dimensjonen — hele verdikjeden er relevant for en bedrifts sosiale ansvarlighet.',
      },
    ],
  },
]

export default function EtikkModule() {
  return (
    <DrawerModule
      moduleCode="KS4"
      moduleTitle="Etikk og yrkesstolthet"
      moduleIcon="🧭"
      storageKey="learning-kultur-etikk"
      completeRoute="/learning/kultur/etikk/complete"
      phases={PHASES}
      intro="Etikk handler om å gjøre det rette — også når det er vanskelig eller ingen ser det. I arbeidslivet er etisk atferd grunnlaget for tillit, og tillit er grunnlaget for all forretningsdrift."
      vissteduAt="78% av forbrukere sier de velger bort bedrifter som oppleves som uetiske — selv om produktet er billigere."
      espenSier="Hva ville du gjort om du så en kollega ta varer uten å betale? Det finnes ikke ett riktig svar — men det finnes konsekvenser av alle valg."
      presentationLink={{ route: '/learning/presentations/etikk-baerekraft', description: 'Etikk og bærekraft — en visuell gjennomgang av CSR og grønnvasking' }}
    />
  )
}
