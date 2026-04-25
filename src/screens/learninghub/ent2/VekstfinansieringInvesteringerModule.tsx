import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '💸',
    title: 'Vekstfinansiering og investeringer — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Venture capital, emisjon og strategiske investorer — finansiering som muliggjør vekst. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent2-16-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i vekstfinansiering og investeringer?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til vekstfinansiering og investeringer.',
      },
    ],
  },
];

export default function VekstfinansieringInvesteringerModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-16"
      moduleTitle="Vekstfinansiering og investeringer"
      moduleIcon="💸"
      storageKey="learning-ent2-vekstfinansiering-investeringer"
      completeRoute="/learning/ent2/vekstfinansiering-investeringer/complete"
      phases={phases}
      intro="Venture capital, emisjon og strategiske investorer — finansiering som muliggjør vekst."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
