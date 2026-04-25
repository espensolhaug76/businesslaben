import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '⚖️',
    title: 'Lovverk, avtaler og HMS — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Aksjeloven, avtaler med kunder og leverandører, og HMS-krav fra første ansatt. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent1-09-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i lovverk, avtaler og hms?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til lovverk, avtaler og hms.',
      },
    ],
  },
];

export default function LovverkAvtalerHmsModule() {
  return (
    <DrawerModule
      moduleCode="ENT1-09"
      moduleTitle="Lovverk, avtaler og HMS"
      moduleIcon="⚖️"
      storageKey="learning-ent1-lovverk-avtaler-hms"
      completeRoute="/learning/ent1/lovverk-avtaler-hms/complete"
      phases={phases}
      intro="Aksjeloven, avtaler med kunder og leverandører, og HMS-krav fra første ansatt."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ent1/lovverk-avtaler-hms', description: 'Lovverk, avtaler og HMS — 10 slides' }}
    />
  );
}
