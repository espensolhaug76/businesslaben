import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '📣',
    title: 'Markedsføring og salg for nystartede — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Lavbudsjett-markedsføring, første salg og kundeanskaffelse når merkevaren er ukjent. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent1-08-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i markedsføring og salg for nystartede?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til markedsføring og salg for nystartede.',
      },
    ],
  },
];

export default function MarkedsforingSalgNystartedeModule() {
  return (
    <DrawerModule
      moduleCode="ENT1-08"
      moduleTitle="Markedsføring og salg for nystartede"
      moduleIcon="📣"
      storageKey="learning-ent1-markedsforing-salg-nystartede"
      completeRoute="/learning/ent1/markedsforing-salg-nystartede/complete"
      phases={phases}
      intro="Lavbudsjett-markedsføring, første salg og kundeanskaffelse når merkevaren er ukjent."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
