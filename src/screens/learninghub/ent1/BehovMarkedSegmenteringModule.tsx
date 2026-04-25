import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🎯',
    title: 'Behov, marked og segmentering — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Identifiser et reelt kundebehov, beskriv målgruppen og test ideen mot faktisk marked. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent1-03-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i behov, marked og segmentering?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til behov, marked og segmentering.',
      },
    ],
  },
];

export default function BehovMarkedSegmenteringModule() {
  return (
    <DrawerModule
      moduleCode="ENT1-03"
      moduleTitle="Behov, marked og segmentering"
      moduleIcon="🎯"
      storageKey="learning-ent1-behov-marked-segmentering"
      completeRoute="/learning/ent1/behov-marked-segmentering/complete"
      phases={phases}
      intro="Identifiser et reelt kundebehov, beskriv målgruppen og test ideen mot faktisk marked."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ent1/behov-marked-segmentering', description: 'Behov, marked og segmentering — 10 slides' }}
    />
  );
}
