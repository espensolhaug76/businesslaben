import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🔍',
    title: 'Markedsanalyse og posisjonering — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Avansert markedsanalyse og strategisk posisjonering for vekstbedrifter. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent2-13-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i markedsanalyse og posisjonering?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til markedsanalyse og posisjonering.',
      },
    ],
  },
];

export default function MarkedsanalysePosisjoneringModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-13"
      moduleTitle="Markedsanalyse og posisjonering"
      moduleIcon="🔍"
      storageKey="learning-ent2-markedsanalyse-posisjonering"
      completeRoute="/learning/ent2/markedsanalyse-posisjonering/complete"
      phases={phases}
      intro="Avansert markedsanalyse og strategisk posisjonering for vekstbedrifter."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
