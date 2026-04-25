import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🏢',
    title: 'Organisering og ledelse (strategisk) — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Organisasjonsstruktur, kultur og endringsledelse — slik støtter organisasjonen strategien. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-13-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i organisering og ledelse (strategisk)?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til organisering og ledelse (strategisk).',
      },
    ],
  },
];

export default function OrganiseringOgLedelseStrategiskModule() {
  return (
    <DrawerModule
      moduleCode="ML2-13"
      moduleTitle="Organisering og ledelse (strategisk)"
      moduleIcon="🏢"
      storageKey="learning-ml2-organisering-og-ledelse-strategisk"
      completeRoute="/learning/ml2/organisering-og-ledelse-strategisk/complete"
      phases={phases}
      intro="Organisasjonsstruktur, kultur og endringsledelse — slik støtter organisasjonen strategien."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ml2/organisering-og-ledelse-strategisk', description: 'Organisering og ledelse (strategisk) — 10 slides' }}
    />
  );
}
