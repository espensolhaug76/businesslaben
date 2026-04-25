import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🧑‍💼',
    title: 'Innovatøren og entreprenøren — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Hvem er entreprenøren, hvilke egenskaper kjennetegner innovatøren, og hva driver folk til å starte for seg selv. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent1-01-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i innovatøren og entreprenøren?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til innovatøren og entreprenøren.',
      },
    ],
  },
];

export default function InnovatorenOgEntreprenorenModule() {
  return (
    <DrawerModule
      moduleCode="ENT1-01"
      moduleTitle="Innovatøren og entreprenøren"
      moduleIcon="🧑‍💼"
      storageKey="learning-ent1-innovatoren-og-entreprenoren"
      completeRoute="/learning/ent1/innovatoren-og-entreprenoren/complete"
      phases={phases}
      intro="Hvem er entreprenøren, hvilke egenskaper kjennetegner innovatøren, og hva driver folk til å starte for seg selv."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
