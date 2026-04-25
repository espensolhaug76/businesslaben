import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🌱',
    title: 'CSR og etikk — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Corporate social responsibility, etiske dilemmaer og bærekraftsrapportering for vekstbedrifter. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent2-17-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i csr og etikk?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til csr og etikk.',
      },
    ],
  },
];

export default function CsrEtikkModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-18"
      moduleTitle="CSR og etikk"
      moduleIcon="🌱"
      storageKey="learning-ent2-csr-etikk"
      completeRoute="/learning/ent2/csr-etikk/complete"
      phases={phases}
      intro="Corporate social responsibility, etiske dilemmaer og bærekraftsrapportering for vekstbedrifter."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ent2/csr-etikk', description: 'CSR og etikk — 10 slides' }}
    />
  );
}
