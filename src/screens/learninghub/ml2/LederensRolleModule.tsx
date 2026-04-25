import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '👤',
    title: 'Lederens rolle — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Lederstil, motivasjon og endringsledelse — hva som skiller en god leder fra en effektiv leder. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-04-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i lederens rolle?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til lederens rolle.',
      },
    ],
  },
];

export default function LederensRolleModule() {
  return (
    <DrawerModule
      moduleCode="ML2-04"
      moduleTitle="Lederens rolle"
      moduleIcon="👤"
      storageKey="learning-ml2-lederens-rolle"
      completeRoute="/learning/ml2/lederens-rolle/complete"
      phases={phases}
      intro="Lederstil, motivasjon og endringsledelse — hva som skiller en god leder fra en effektiv leder."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ml2/lederens-rolle', description: 'Lederens rolle — 10 slides' }}
    />
  );
}
