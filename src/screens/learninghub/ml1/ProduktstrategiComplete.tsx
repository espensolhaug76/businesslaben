import LearningComplete from '../shared/LearningComplete'

export default function ProduktstrategiComplete() {
  return (
    <LearningComplete
      moduleTitle="Produktstrategi"
      moduleIcon="📦"
      retryRoute="/learning/ml1/produktstrategi"
      learningOutcomes={[
        'Du kan beskrive produktets livssyklus og hva som skjer i hver fase',
        'Du forstår sortimentsbeslutninger og merkearkitektur',
        'Du kan analysere emballasje som markedsføringsverktøy',
      ]}
    />
  )
}
