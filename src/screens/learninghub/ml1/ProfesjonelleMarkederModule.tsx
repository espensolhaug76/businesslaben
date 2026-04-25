import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🏛️',
    title: 'Profesjonelle markeder — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'B2B-markeder i dybden — innkjøpsenhet (DMU), anbudsprosesser og langsiktig relasjonsbygging. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml1-10-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i profesjonelle markeder?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til profesjonelle markeder.',
      },
    ],
  },
];

export default function ProfesjonelleMarkederModule() {
  return (
    <DrawerModule
      moduleCode="ML1-10"
      moduleTitle="Profesjonelle markeder"
      moduleIcon="🏛️"
      storageKey="learning-ml1-profesjonelle-markeder"
      completeRoute="/learning/ml1/profesjonelle-markeder/complete"
      phases={phases}
      intro="B2B-markeder i dybden — innkjøpsenhet (DMU), anbudsprosesser og langsiktig relasjonsbygging."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
