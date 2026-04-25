import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '👥',
    title: 'Personaladministrasjon og HRM (strategisk) — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Strategisk HRM — rekruttering, utvikling og fastholdelse av nøkkelkompetanse. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent2-15-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i personaladministrasjon og hrm (strategisk)?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til personaladministrasjon og hrm (strategisk).',
      },
    ],
  },
];

export default function PersonaladministrasjonHrmStrategiskModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-15"
      moduleTitle="Personaladministrasjon og HRM (strategisk)"
      moduleIcon="👥"
      storageKey="learning-ent2-personaladministrasjon-hrm-strategisk"
      completeRoute="/learning/ent2/personaladministrasjon-hrm-strategisk/complete"
      phases={phases}
      intro="Strategisk HRM — rekruttering, utvikling og fastholdelse av nøkkelkompetanse."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
