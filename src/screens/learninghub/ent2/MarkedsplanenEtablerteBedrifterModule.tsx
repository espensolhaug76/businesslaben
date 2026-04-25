import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '📋',
    title: 'Markedsplanen for etablerte bedrifter — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Den strategiske markedsplanen — hensikt, innhold, TOWS-matrise, SMART-mål med KPIer, ressursallokering, årshjul og oppfølging. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent2-21-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i markedsplanen for etablerte bedrifter?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til markedsplanen for etablerte bedrifter.',
      },
    ],
  },
];

export default function MarkedsplanenEtablerteBedrifterModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-21"
      moduleTitle="Markedsplanen for etablerte bedrifter"
      moduleIcon="📋"
      storageKey="learning-ent2-markedsplanen-etablerte-bedrifter"
      completeRoute="/learning/ent2/markedsplanen-etablerte-bedrifter/complete"
      phases={phases}
      intro="Den strategiske markedsplanen — hensikt, innhold, TOWS-matrise, SMART-mål med KPIer, ressursallokering, årshjul og oppfølging."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
