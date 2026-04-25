import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '💸',
    title: 'Likviditetsstyring og finansrisiko — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Bedriftens kontantflyt under vekst — arbeidskapital, VC/PE/IPO, lånefinansiering, leasing, kapitalstruktur og valuta-/renterisiko. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent2-17-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i likviditetsstyring og finansrisiko?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til likviditetsstyring og finansrisiko.',
      },
    ],
  },
];

export default function LikviditetsstyringFinansrisikoModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-17"
      moduleTitle="Likviditetsstyring og finansrisiko"
      moduleIcon="💸"
      storageKey="learning-ent2-likviditetsstyring-finansrisiko"
      completeRoute="/learning/ent2/likviditetsstyring-finansrisiko/complete"
      phases={phases}
      intro="Bedriftens kontantflyt under vekst — arbeidskapital, VC/PE/IPO, lånefinansiering, leasing, kapitalstruktur og valuta-/renterisiko."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
