import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🏢',
    title: 'Organisering av markedsføringen — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'Struktur for gjennomføring — funksjonell, produktbasert, markedsbasert og prosjektorganisering, samt bedriftskultur og endringsledelse. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml1-15-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i organisering av markedsføringen?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til organisering av markedsføringen.',
      },
    ],
  },
];

export default function OrganiseringMarkedsforingModule() {
  return (
    <DrawerModule
      moduleCode="ML1-15"
      moduleTitle="Organisering av markedsføringen"
      moduleIcon="🏢"
      storageKey="learning-ml1-organisering-markedsforing"
      completeRoute="/learning/ml1/organisering-markedsforing/complete"
      phases={phases}
      intro="Struktur for gjennomføring — funksjonell, produktbasert, markedsbasert og prosjektorganisering, samt bedriftskultur og endringsledelse."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
    />
  );
}
