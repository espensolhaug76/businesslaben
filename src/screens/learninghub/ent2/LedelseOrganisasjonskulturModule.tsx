import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🏢',
    title: 'Ledelse og organisasjonskultur — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Lederrollen i en voksende bedrift — bygging av kultur som tåler skala. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ent2-14-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i ledelse og organisasjonskultur?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til ledelse og organisasjonskultur.',
      },
    ],
  },
];

export default function LedelseOrganisasjonskulturModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-14"
      moduleTitle="Ledelse og organisasjonskultur"
      moduleIcon="🏢"
      storageKey="learning-ent2-ledelse-organisasjonskultur"
      completeRoute="/learning/ent2/ledelse-organisasjonskultur/complete"
      phases={phases}
      intro="Lederrollen i en voksende bedrift — bygging av kultur som tåler skala."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ent2/ledelse-organisasjonskultur', description: 'Ledelse og organisasjonskultur — 10 slides' }}
    />
  );
}
