import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '💡',
    title: 'Kreativitet og idéutvikling — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Idémyldring, design thinking og hvordan en god forretningsidé kjennes igjen tidlig. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent1-02-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i kreativitet og idéutvikling?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til kreativitet og idéutvikling.',
      },
    ],
  },
];

export default function KreativitetIdeutviklingModule() {
  return (
    <DrawerModule
      moduleCode="ENT1-02"
      moduleTitle="Kreativitet og idéutvikling"
      moduleIcon="💡"
      storageKey="learning-ent1-kreativitet-ideutvikling"
      completeRoute="/learning/ent1/kreativitet-ideutvikling/complete"
      phases={phases}
      intro="Idémyldring, design thinking og hvordan en god forretningsidé kjennes igjen tidlig."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ent1/kreativitet-ideutvikling', description: 'Kreativitet og idéutvikling — 10 slides' }}
    />
  );
}
