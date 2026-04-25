import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🌟',
    title: 'Visjon og mål — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Visjon, forretningsidé og SMARTE mål — slik styres en bedrift mot ønsket fremtid. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-02-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i visjon og mål?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til visjon og mål.',
      },
    ],
  },
];

export default function VisjonOgMalModule() {
  return (
    <DrawerModule
      moduleCode="ML2-02"
      moduleTitle="Visjon og mål"
      moduleIcon="🌟"
      storageKey="learning-ml2-visjon-og-mal"
      completeRoute="/learning/ml2/visjon-og-mal/complete"
      phases={phases}
      intro="Visjon, forretningsidé og SMARTE mål — slik styres en bedrift mot ønsket fremtid."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ml2/visjon-og-mal', description: 'Visjon og mål — 10 slides' }}
    />
  );
}
