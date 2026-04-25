import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🏛️',
    title: 'Etablering og selskapsformer — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'AS, ENK eller ANS? Slik velger du riktig selskapsform og kommer deg gjennom Brønnøysund. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent1-05-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i etablering og selskapsformer?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til etablering og selskapsformer.',
      },
    ],
  },
];

export default function EtableringSelskapsformerModule() {
  return (
    <DrawerModule
      moduleCode="ENT1-05"
      moduleTitle="Etablering og selskapsformer"
      moduleIcon="🏛️"
      storageKey="learning-ent1-etablering-selskapsformer"
      completeRoute="/learning/ent1/etablering-selskapsformer/complete"
      phases={phases}
      intro="AS, ENK eller ANS? Slik velger du riktig selskapsform og kommer deg gjennom Brønnøysund."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ent1/etablering-selskapsformer', description: 'Etablering og selskapsformer — 10 slides' }}
    />
  );
}
