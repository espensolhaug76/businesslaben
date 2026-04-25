import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '💰',
    title: 'Prisstrategi (avansert) — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Verdibasert prising, dynamiske modeller og prisdiskriminering — pris som strategisk styringsverktøy. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-09-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i prisstrategi (avansert)?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til prisstrategi (avansert).',
      },
    ],
  },
];

export default function PrisstrategiAvansertModule() {
  return (
    <DrawerModule
      moduleCode="ML2-09"
      moduleTitle="Prisstrategi (avansert)"
      moduleIcon="💰"
      storageKey="learning-ml2-prisstrategi-avansert"
      completeRoute="/learning/ml2/prisstrategi-avansert/complete"
      phases={phases}
      intro="Verdibasert prising, dynamiske modeller og prisdiskriminering — pris som strategisk styringsverktøy."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ml2/prisstrategi-avansert', description: 'Prisstrategier (avansert) — 10 slides' }}
    />
  );
}
