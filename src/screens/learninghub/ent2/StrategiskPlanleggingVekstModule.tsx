import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '📈',
    title: 'Strategisk planlegging for vekst — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Fra etablert drift til skalerbar bedrift — strategisk planlegging i vekstfase. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent2-11-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i strategisk planlegging for vekst?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til strategisk planlegging for vekst.',
      },
    ],
  },
];

export default function StrategiskPlanleggingVekstModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-11"
      moduleTitle="Strategisk planlegging for vekst"
      moduleIcon="📈"
      storageKey="learning-ent2-strategisk-planlegging-vekst"
      completeRoute="/learning/ent2/strategisk-planlegging-vekst/complete"
      phases={phases}
      intro="Fra etablert drift til skalerbar bedrift — strategisk planlegging i vekstfase."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ent2/strategisk-planlegging-vekst', description: 'Strategisk planlegging og vekst — 10 slides' }}
    />
  );
}
