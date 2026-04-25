import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🚚',
    title: 'Distribusjonsstrategi (avansert) — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Omnikanal, plattformøkonomi og direct-to-consumer — distribusjon som konkurransefortrinn. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-10-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i distribusjonsstrategi (avansert)?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til distribusjonsstrategi (avansert).',
      },
    ],
  },
];

export default function DistribusjonsstrategiAvansertModule() {
  return (
    <DrawerModule
      moduleCode="ML2-10"
      moduleTitle="Distribusjonsstrategi (avansert)"
      moduleIcon="🚚"
      storageKey="learning-ml2-distribusjonsstrategi-avansert"
      completeRoute="/learning/ml2/distribusjonsstrategi-avansert/complete"
      phases={phases}
      intro="Omnikanal, plattformøkonomi og direct-to-consumer — distribusjon som konkurransefortrinn."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
