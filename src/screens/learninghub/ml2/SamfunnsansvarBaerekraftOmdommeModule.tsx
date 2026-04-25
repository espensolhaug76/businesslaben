import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🌱',
    title: 'Samfunnsansvar, bærekraft og omdømme — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'CSR, ESG og Triple Bottom Line — bærekraft som strategisk fortrinn og omdømmebygger. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-05-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i samfunnsansvar, bærekraft og omdømme?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til samfunnsansvar, bærekraft og omdømme.',
      },
    ],
  },
];

export default function SamfunnsansvarBaerekraftOmdommeModule() {
  return (
    <DrawerModule
      moduleCode="ML2-05"
      moduleTitle="Samfunnsansvar, bærekraft og omdømme"
      moduleIcon="🌱"
      storageKey="learning-ml2-samfunnsansvar-baerekraft-omdomme"
      completeRoute="/learning/ml2/samfunnsansvar-baerekraft-omdomme/complete"
      phases={phases}
      intro="CSR, ESG og Triple Bottom Line — bærekraft som strategisk fortrinn og omdømmebygger."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
