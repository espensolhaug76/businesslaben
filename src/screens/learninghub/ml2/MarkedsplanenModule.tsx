import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '📋',
    title: 'Markedsplanen — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Den helhetlige markedsplanen — slik bindes analyse, mål, strategi, tiltak og budsjett sammen. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-17-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i markedsplanen?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til markedsplanen.',
      },
    ],
  },
];

export default function MarkedsplanenModule() {
  return (
    <DrawerModule
      moduleCode="ML2-17"
      moduleTitle="Markedsplanen"
      moduleIcon="📋"
      storageKey="learning-ml2-markedsplanen"
      completeRoute="/learning/ml2/markedsplanen/complete"
      phases={phases}
      intro="Den helhetlige markedsplanen — slik bindes analyse, mål, strategi, tiltak og budsjett sammen."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ml2/markedsplanen', description: 'Markedsplanen — 10 slides' }}
    />
  );
}
