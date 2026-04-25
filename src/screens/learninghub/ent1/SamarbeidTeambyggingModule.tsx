import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🤝',
    title: 'Samarbeid og teambygging — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Cofoundere, ansvarsfordeling og teamdynamikk — slik unngår dere konflikter som dreper bedriften. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent1-10-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i samarbeid og teambygging?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til samarbeid og teambygging.',
      },
    ],
  },
];

export default function SamarbeidTeambyggingModule() {
  return (
    <DrawerModule
      moduleCode="ENT1-10"
      moduleTitle="Samarbeid og teambygging"
      moduleIcon="🤝"
      storageKey="learning-ent1-samarbeid-teambygging"
      completeRoute="/learning/ent1/samarbeid-teambygging/complete"
      phases={phases}
      intro="Cofoundere, ansvarsfordeling og teamdynamikk — slik unngår dere konflikter som dreper bedriften."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
