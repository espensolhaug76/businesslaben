import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🗺️',
    title: 'Forretningsmodell og BMC — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Business Model Canvas — verktøyet som kondenserer en forretningsidé til ni byggeklosser. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent1-04-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i forretningsmodell og bmc?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til forretningsmodell og bmc.',
      },
    ],
  },
];

export default function ForretningsmodellBmcModule() {
  return (
    <DrawerModule
      moduleCode="ENT1-04"
      moduleTitle="Forretningsmodell og BMC"
      moduleIcon="🗺️"
      storageKey="learning-ent1-forretningsmodell-bmc"
      completeRoute="/learning/ent1/forretningsmodell-bmc/complete"
      phases={phases}
      intro="Business Model Canvas — verktøyet som kondenserer en forretningsidé til ni byggeklosser."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ent1/forretningsmodell-bmc', description: 'Forretningsmodellen (BMC) — 10 slides' }}
    />
  );
}
