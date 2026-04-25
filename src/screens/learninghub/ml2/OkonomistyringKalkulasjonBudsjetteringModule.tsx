import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '📈',
    title: 'Økonomistyring, kalkulasjon og budsjettering — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Bidragskalkyle, selvkost og budsjettoppfølging — økonomistyring som beslutningsgrunnlag. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-16-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i økonomistyring, kalkulasjon og budsjettering?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til økonomistyring, kalkulasjon og budsjettering.',
      },
    ],
  },
];

export default function OkonomistyringKalkulasjonBudsjetteringModule() {
  return (
    <DrawerModule
      moduleCode="ML2-16"
      moduleTitle="Økonomistyring, kalkulasjon og budsjettering"
      moduleIcon="📈"
      storageKey="learning-ml2-okonomistyring-kalkulasjon-budsjettering"
      completeRoute="/learning/ml2/okonomistyring-kalkulasjon-budsjettering/complete"
      phases={phases}
      intro="Bidragskalkyle, selvkost og budsjettoppfølging — økonomistyring som beslutningsgrunnlag."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ml2/okonomistyring-kalkulasjon-budsjettering', description: 'Økonomistyring, kalkulasjon og budsjettering — 10 slides' }}
    />
  );
}
