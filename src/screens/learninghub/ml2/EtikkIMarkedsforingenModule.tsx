import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '⚖️',
    title: 'Etikk i markedsføringen — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Etiske dilemmaer i reklame, salg og dataetikk — grensen mellom påvirkning og manipulasjon. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-06-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i etikk i markedsføringen?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til etikk i markedsføringen.',
      },
    ],
  },
];

export default function EtikkIMarkedsforingenModule() {
  return (
    <DrawerModule
      moduleCode="ML2-06"
      moduleTitle="Etikk i markedsføringen"
      moduleIcon="⚖️"
      storageKey="learning-ml2-etikk-i-markedsforingen"
      completeRoute="/learning/ml2/etikk-i-markedsforingen/complete"
      phases={phases}
      intro="Etiske dilemmaer i reklame, salg og dataetikk — grensen mellom påvirkning og manipulasjon."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
