import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '📺',
    title: 'Reklame og medieplanlegging — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Strategisk synlighet — fra medieplanleggingens faser via dekning og frekvens til digital annonsering, influencer marketing og reklameetikk. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml1-12-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i reklame og medieplanlegging?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til reklame og medieplanlegging.',
      },
    ],
  },
];

export default function ReklameMedieplanleggingModule() {
  return (
    <DrawerModule
      moduleCode="ML1-12"
      moduleTitle="Reklame og medieplanlegging"
      moduleIcon="📺"
      storageKey="learning-ml1-reklame-medieplanlegging"
      completeRoute="/learning/ml1/reklame-medieplanlegging/complete"
      phases={phases}
      intro="Strategisk synlighet — fra medieplanleggingens faser via dekning og frekvens til digital annonsering, influencer marketing og reklameetikk."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
