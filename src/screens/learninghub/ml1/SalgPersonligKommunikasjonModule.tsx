import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🤝',
    title: 'Salg og personlig kommunikasjon — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Personlig salg som relasjonsbygger — salgsprosessen, behovsanalyse, innvendingsbehandling, ikke-verbal kommunikasjon, mersalg og oppsalg. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml1-11-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i salg og personlig kommunikasjon?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til salg og personlig kommunikasjon.',
      },
    ],
  },
];

export default function SalgPersonligKommunikasjonModule() {
  return (
    <DrawerModule
      moduleCode="ML1-11"
      moduleTitle="Salg og personlig kommunikasjon"
      moduleIcon="🤝"
      storageKey="learning-ml1-salg-personlig-kommunikasjon"
      completeRoute="/learning/ml1/salg-personlig-kommunikasjon/complete"
      phases={phases}
      intro="Personlig salg som relasjonsbygger — salgsprosessen, behovsanalyse, innvendingsbehandling, ikke-verbal kommunikasjon, mersalg og oppsalg."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
