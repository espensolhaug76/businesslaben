import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '⚖️',
    title: 'Jus og tvisteløsning — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Avtalerett, immaterielle rettigheter og tvisteløsning når konflikter oppstår. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent2-19-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i jus og tvisteløsning?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til jus og tvisteløsning.',
      },
    ],
  },
];

export default function JusTvistelosningModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-20"
      moduleTitle="Jus og tvisteløsning"
      moduleIcon="⚖️"
      storageKey="learning-ent2-jus-tvistelosning"
      completeRoute="/learning/ent2/jus-tvistelosning/complete"
      phases={phases}
      intro="Avtalerett, immaterielle rettigheter og tvisteløsning når konflikter oppstår."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ent2/jus-tvistelosning', description: 'Jus og tvisteløsning — 10 slides' }}
    />
  );
}
