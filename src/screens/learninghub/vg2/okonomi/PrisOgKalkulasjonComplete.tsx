import LearningComplete from '../../shared/LearningComplete'

export default function PrisOgKalkulasjonComplete() {
  return (
    <LearningComplete
      moduleTitle="Pris og kalkulasjon"
      moduleIcon="🧮"
      retryRoute="/learning/vg2/okonomi/pris-og-kalkulasjon"
      learningOutcomes={[
        'Du kan beregne selvkost og forstår når den brukes som grunnlag for prissetting',
        'Du kan beregne dekningsbidrag og bruke bidragskalkyle ved ledig kapasitet',
        'Du skiller korrekt mellom avanse (av innkjøpspris) og dekningsgrad (av salgspris)',
      ]}
    />
  )
}
