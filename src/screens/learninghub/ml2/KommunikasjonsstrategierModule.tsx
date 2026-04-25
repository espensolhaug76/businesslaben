import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '📣',
    title: 'Kommunikasjonsstrategier — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'IMC, digital kundereise og innholdsmarkedsføring — å nå riktig kunde med riktig budskap. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-11-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i kommunikasjonsstrategier?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til kommunikasjonsstrategier.',
      },
    ],
  },
];

export default function KommunikasjonsstrategierModule() {
  return (
    <DrawerModule
      moduleCode="ML2-11"
      moduleTitle="Kommunikasjonsstrategier"
      moduleIcon="📣"
      storageKey="learning-ml2-kommunikasjonsstrategier"
      completeRoute="/learning/ml2/kommunikasjonsstrategier/complete"
      phases={phases}
      intro="IMC, digital kundereise og innholdsmarkedsføring — å nå riktig kunde med riktig budskap."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ml2/kommunikasjonsstrategier', description: 'Kommunikasjonsstrategier — 10 slides' }}
    />
  );
}
