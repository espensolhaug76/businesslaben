import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '📊',
    title: 'Investeringsanalyse og lønnsomhet — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Beslutningsverktøy for investeringer — tidsverdien av penger, NPV, internrente, payback, risikojustert avkastning og følsomhetsanalyse. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent2-16-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i investeringsanalyse og lønnsomhet?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til investeringsanalyse og lønnsomhet.',
      },
    ],
  },
];

export default function InvesteringsanalyseModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-16"
      moduleTitle="Investeringsanalyse og lønnsomhet"
      moduleIcon="📊"
      storageKey="learning-ent2-investeringsanalyse"
      completeRoute="/learning/ent2/investeringsanalyse/complete"
      phases={phases}
      intro="Beslutningsverktøy for investeringer — tidsverdien av penger, NPV, internrente, payback, risikojustert avkastning og følsomhetsanalyse."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ent2/investeringsanalyse', description: 'Investeringsanalyse og lønnsomhet — 10 slides' }}
    />
  );
}
