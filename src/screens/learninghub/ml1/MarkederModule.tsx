import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🏪',
    title: 'Markeder — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Markedstyper, mellomledd og struktur — fra B2C og B2B til offentlige og internasjonale markeder. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml1-09-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i markeder?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til markeder.',
      },
    ],
  },
];

export default function MarkederModule() {
  return (
    <DrawerModule
      moduleCode="ML1-09"
      moduleTitle="Markeder"
      moduleIcon="🏪"
      storageKey="learning-ml1-markeder"
      completeRoute="/learning/ml1/markeder/complete"
      phases={phases}
      intro="Markedstyper, mellomledd og struktur — fra B2C og B2B til offentlige og internasjonale markeder."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
