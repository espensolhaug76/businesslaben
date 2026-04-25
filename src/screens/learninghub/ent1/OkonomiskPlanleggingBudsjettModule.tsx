import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '📊',
    title: 'Økonomisk planlegging og budsjett — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Likviditetsbudsjett, resultatbudsjett og break-even — slik holder du styr på pengene fra dag én. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent1-07-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i økonomisk planlegging og budsjett?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til økonomisk planlegging og budsjett.',
      },
    ],
  },
];

export default function OkonomiskPlanleggingBudsjettModule() {
  return (
    <DrawerModule
      moduleCode="ENT1-07"
      moduleTitle="Økonomisk planlegging og budsjett"
      moduleIcon="📊"
      storageKey="learning-ent1-okonomisk-planlegging-budsjett"
      completeRoute="/learning/ent1/okonomisk-planlegging-budsjett/complete"
      phases={phases}
      intro="Likviditetsbudsjett, resultatbudsjett og break-even — slik holder du styr på pengene fra dag én."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
