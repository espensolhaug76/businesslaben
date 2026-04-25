import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🌐',
    title: 'Internasjonalisering og eksport — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Veien ut av Norge — markedsvalg, eksportstrategier og tilpasning til nye kulturer. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent2-18-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i internasjonalisering og eksport?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til internasjonalisering og eksport.',
      },
    ],
  },
];

export default function InternasjonaliseringEksportModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-19"
      moduleTitle="Internasjonalisering og eksport"
      moduleIcon="🌐"
      storageKey="learning-ent2-internasjonalisering-eksport"
      completeRoute="/learning/ent2/internasjonalisering-eksport/complete"
      phases={phases}
      intro="Veien ut av Norge — markedsvalg, eksportstrategier og tilpasning til nye kulturer."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
