import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🚀',
    title: 'Forretningsutvikling og skalering — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Pivotering, nye markeder og hvordan skalere uten å miste kvalitet eller kultur. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent2-12-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i forretningsutvikling og skalering?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til forretningsutvikling og skalering.',
      },
    ],
  },
];

export default function ForretningsutviklingSkaleringModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-12"
      moduleTitle="Forretningsutvikling og skalering"
      moduleIcon="🚀"
      storageKey="learning-ent2-forretningsutvikling-skalering"
      completeRoute="/learning/ent2/forretningsutvikling-skalering/complete"
      phases={phases}
      intro="Pivotering, nye markeder og hvordan skalere uten å miste kvalitet eller kultur."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ent2/forretningsutvikling-skalering', description: 'Forretningsutvikling og skalering — 10 slides' }}
    />
  );
}
