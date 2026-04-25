import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '📊',
    title: 'Markedsmiks og effektmåling — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'KPI, ROI og ROAS — hvordan måle om markedsføringen faktisk virker, og styre etter data. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-12-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i markedsmiks og effektmåling?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til markedsmiks og effektmåling.',
      },
    ],
  },
];

export default function MarkedsmiksOgEffektmalingModule() {
  return (
    <DrawerModule
      moduleCode="ML2-12"
      moduleTitle="Markedsmiks og effektmåling"
      moduleIcon="📊"
      storageKey="learning-ml2-markedsmiks-og-effektmaling"
      completeRoute="/learning/ml2/markedsmiks-og-effektmaling/complete"
      phases={phases}
      intro="KPI, ROI og ROAS — hvordan måle om markedsføringen faktisk virker, og styre etter data."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
