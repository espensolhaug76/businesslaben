import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🔍',
    title: 'Markeds- og bransjeanalyse — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'PESTEL, SWOT og Porters fem krefter — verktøyene for å forstå marked og konkurranse på dypt nivå. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-03-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i markeds- og bransjeanalyse?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til markeds- og bransjeanalyse.',
      },
    ],
  },
];

export default function MarkedsOgBransjeanalyseModule() {
  return (
    <DrawerModule
      moduleCode="ML2-03"
      moduleTitle="Markeds- og bransjeanalyse"
      moduleIcon="🔍"
      storageKey="learning-ml2-markeds-og-bransjeanalyse"
      completeRoute="/learning/ml2/markeds-og-bransjeanalyse/complete"
      phases={phases}
      intro="PESTEL, SWOT og Porters fem krefter — verktøyene for å forstå marked og konkurranse på dypt nivå."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
