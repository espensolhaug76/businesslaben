import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '⭐',
    title: 'Merkevarestrategi — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Brand equity, merkevarearkitektur og posisjonering — hvordan sterke merker bygges over tid. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-07-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i merkevarestrategi?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til merkevarestrategi.',
      },
    ],
  },
];

export default function MerkevarestrategiModule() {
  return (
    <DrawerModule
      moduleCode="ML2-07"
      moduleTitle="Merkevarestrategi"
      moduleIcon="⭐"
      storageKey="learning-ml2-merkevarestrategi"
      completeRoute="/learning/ml2/merkevarestrategi/complete"
      phases={phases}
      intro="Brand equity, merkevarearkitektur og posisjonering — hvordan sterke merker bygges over tid."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ml2/merkevarestrategi', description: 'Merkevarestrategi — 10 slides' }}
    />
  );
}
