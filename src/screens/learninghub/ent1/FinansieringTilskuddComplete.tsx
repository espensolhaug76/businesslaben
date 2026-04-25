import LearningComplete from '../shared/LearningComplete'

export default function FinansieringTilskuddComplete() {
  return (
    <LearningComplete
      moduleTitle="Finansiering og tilskudd"
      moduleIcon="💰"
      retryRoute="/learning/ent1/finansiering-tilskudd"
      learningOutcomes={[
        'Innhold under utvikling — fullt læringsutbytte legges inn når modulen er ferdig',
      ]}
    />
  )
}
