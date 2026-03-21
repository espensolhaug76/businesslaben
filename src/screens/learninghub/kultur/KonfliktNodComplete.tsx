import LearningComplete from '../shared/LearningComplete'

export default function KonfliktNodComplete() {
  return (
    <LearningComplete
      moduleTitle="Konflikt- og nødssituasjonshåndtering"
      moduleIcon="🚨"
      retryRoute="/learning/kultur/konflikt-nodssituasjon"
      learningOutcomes={[
        'Du kan skille mellom sakskonflikter og relasjonskonflikter, og vet hva Arbeidsmiljøloven sier om trakassering',
        'Du kjenner til Thomas-Kilmann-modellens fem konfliktstrategier og kan bruke deeskaleringsteknikker',
        'Du kan de tre norske nødnumrene og vet korrekt handlingsrekkefølge ved bevisstløshet',
        'Du forstår din rolle som ansatt under evakuering og nødssituasjoner',
      ]}
    />
  )
}
