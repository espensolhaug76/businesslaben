import LearningComplete from '../shared/LearningComplete'

export default function LovverkAvtalerHmsComplete() {
  return (
    <LearningComplete
      moduleTitle="Lovverk, avtaler og HMS"
      moduleIcon="⚖️"
      retryRoute="/learning/ent1/lovverk-avtaler-hms"
      learningOutcomes={[
        'Innhold under utvikling — fullt læringsutbytte legges inn når modulen er ferdig',
      ]}
    />
  )
}
