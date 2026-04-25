import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🎯',
    title: 'Strategisk planlegging — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Fra visjon til handling — strategiprosessen som binder sammen marked, organisasjon og økonomi. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-01-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i strategisk planlegging?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til strategisk planlegging.',
      },
    ],
  },
];

export default function StrategiskPlanleggingModule() {
  return (
    <DrawerModule
      moduleCode="ML2-01"
      moduleTitle="Strategisk planlegging"
      moduleIcon="🎯"
      storageKey="learning-ml2-strategisk-planlegging"
      completeRoute="/learning/ml2/strategisk-planlegging/complete"
      phases={phases}
      intro="Fra visjon til handling — strategiprosessen som binder sammen marked, organisasjon og økonomi."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ml2/strategisk-planlegging', description: 'Strategisk planlegging — 10 slides' }}
    />
  );
}
