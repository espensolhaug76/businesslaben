import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '👥',
    title: 'Personaladministrasjon og HRM — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Rekruttering, kompetanseutvikling og lønn — strategisk human resource management i praksis. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-14-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i personaladministrasjon og hrm?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til personaladministrasjon og hrm.',
      },
    ],
  },
];

export default function PersonaladministrasjonHRMModule() {
  return (
    <DrawerModule
      moduleCode="ML2-14"
      moduleTitle="Personaladministrasjon og HRM"
      moduleIcon="👥"
      storageKey="learning-ml2-personaladministrasjon-hrm"
      completeRoute="/learning/ml2/personaladministrasjon-hrm/complete"
      phases={phases}
      intro="Rekruttering, kompetanseutvikling og lønn — strategisk human resource management i praksis."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
