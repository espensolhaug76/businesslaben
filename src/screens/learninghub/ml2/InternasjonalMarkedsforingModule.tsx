import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🌐',
    title: 'Internasjonal markedsføring — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Eksport, kulturforståelse og global merkevarebygging — markedsføring over landegrenser. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml2-15-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i internasjonal markedsføring?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til internasjonal markedsføring.',
      },
    ],
  },
];

export default function InternasjonalMarkedsforingModule() {
  return (
    <DrawerModule
      moduleCode="ML2-15"
      moduleTitle="Internasjonal markedsføring"
      moduleIcon="🌐"
      storageKey="learning-ml2-internasjonal-markedsforing"
      completeRoute="/learning/ml2/internasjonal-markedsforing/complete"
      phases={phases}
      intro="Eksport, kulturforståelse og global merkevarebygging — markedsføring over landegrenser."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
