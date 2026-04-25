import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🎯',
    title: 'Avslutning og oppsummering — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Sluttvurdering — bind sammen alle 20 kapitlene til et helhetlig syn på entreprenørskap. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent2-20-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i avslutning og oppsummering?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til avslutning og oppsummering.',
      },
    ],
  },
];

export default function AvslutningOppsummeringModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-20"
      moduleTitle="Avslutning og oppsummering"
      moduleIcon="🎯"
      storageKey="learning-ent2-avslutning-oppsummering"
      completeRoute="/learning/ent2/avslutning-oppsummering/complete"
      phases={phases}
      intro="Sluttvurdering — bind sammen alle 20 kapitlene til et helhetlig syn på entreprenørskap."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
