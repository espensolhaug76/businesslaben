import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '⚖️',
    title: 'Markedsføringens lovverk og etikk — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Spillereglene i markedet — markedsføringsloven, angrerettloven, åpenhetsloven, beskyttelse av barn, grønnvasking og samfunnsansvar (CSR). Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml1-14-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i markedsføringens lovverk og etikk?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til markedsføringens lovverk og etikk.',
      },
    ],
  },
];

export default function MarkedsforingsLovverkEtikkModule() {
  return (
    <DrawerModule
      moduleCode="ML1-14"
      moduleTitle="Markedsføringens lovverk og etikk"
      moduleIcon="⚖️"
      storageKey="learning-ml1-markedsforings-lovverk-etikk"
      completeRoute="/learning/ml1/markedsforings-lovverk-etikk/complete"
      phases={phases}
      intro="Spillereglene i markedet — markedsføringsloven, angrerettloven, åpenhetsloven, beskyttelse av barn, grønnvasking og samfunnsansvar (CSR)."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
