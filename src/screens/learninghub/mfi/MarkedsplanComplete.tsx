import LearningComplete from '../shared/LearningComplete'

export default function MarkedsplanComplete() {
  return (
    <LearningComplete
      moduleTitle="Markedsplan og SMART-mål"
      moduleIcon="📋"
      retryRoute="/learning/mfi/markedsplan"
      learningOutcomes={[
        'Du kan formulere SMART-mål',
        'Du forstår sammenhengen mellom målgruppe, kanal og budsjett',
        'Du kan vurdere effekten av en kampanje med NPS og KPIer',
      ]}
    />
  )
}
