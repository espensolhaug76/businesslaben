import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '📦',
    title: 'Produktstrategi (avansert) — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'PLC, innovasjon og ettermarked — produktledelse på VG3-nivå med fokus på porteføljeteknikk. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-08-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i produktstrategi (avansert)?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til produktstrategi (avansert).',
      },
    ],
  },
];

export default function ProduktstrategiAvansertModule() {
  return (
    <DrawerModule
      moduleCode="ML2-08"
      moduleTitle="Produktstrategi (avansert)"
      moduleIcon="📦"
      storageKey="learning-ml2-produktstrategi-avansert"
      completeRoute="/learning/ml2/produktstrategi-avansert/complete"
      phases={phases}
      intro="PLC, innovasjon og ettermarked — produktledelse på VG3-nivå med fokus på porteføljeteknikk."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ml2/produktstrategi-avansert', description: 'Produktstrategi (avansert) — 10 slides' }}
    />
  );
}
