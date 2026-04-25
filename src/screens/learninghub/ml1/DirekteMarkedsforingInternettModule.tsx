import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🌐',
    title: 'Direkte markedsføring og internett — under utvikling',
    quote: 'Manus klart, modul under bygging',
    content: 'En-til-en-kommunikasjon i digital tidsalder — SEO, SEM, innholdsmarkedsføring, sosiale medier, konvertering (CRO), big data og GDPR. Innholdet bygges ut med teori, eksempler og oppgaver i kommende iterasjon.',
    practical: 'Komplett innhold med 5 faser à 5 oppgaver kommer snart. Inntil da: bruk presentasjonen som oversikt over temaet.',
    exercises: [
      {
        id: 'ml1-13-placeholder',
        question: 'Modulen er under utvikling. Hva forventer du å lære i direkte markedsføring og internett?',
        choices: [
          { id: 'a', text: 'Sentrale begreper og rammeverk' },
          { id: 'b', text: 'Praktiske eksempler og case fra norsk næringsliv' },
          { id: 'c', text: 'Oppgaver som tester forståelsen' },
          { id: 'd', text: 'Alle alternativene over' },
        ],
        correctId: 'd',
        explanation: 'Når modulen er ferdig, dekker den alle delene — teori, case og øvingsoppgaver knyttet til direkte markedsføring og internett.',
      },
    ],
  },
];

export default function DirekteMarkedsforingInternettModule() {
  return (
    <DrawerModule
      moduleCode="ML1-13"
      moduleTitle="Direkte markedsføring og internett"
      moduleIcon="🌐"
      storageKey="learning-ml1-direkte-markedsforing-internett"
      completeRoute="/learning/ml1/direkte-markedsforing-internett/complete"
      phases={phases}
      intro="En-til-en-kommunikasjon i digital tidsalder — SEO, SEM, innholdsmarkedsføring, sosiale medier, konvertering (CRO), big data og GDPR."
      vissteduAt="Modulen er under utvikling. Manus er klart for alle 5 fasene; de legges inn fortløpende."
      espenSier="Stay tuned — innholdet kommer. Inntil da: bruk fag-oversikten i presentasjonen for et raskt overblikk."
      presentationLink={{ route: '/learning/presentations/ml1/direkte-markedsforing-internett', description: 'Direkte markedsføring og internett — 10 slides' }}
    />
  );
}
