import LearningComplete from '../shared/LearningComplete'

export default function MarkederComplete() {
  return (
    <LearningComplete
      moduleTitle="Markeder"
      moduleIcon="🏪"
      retryRoute="/learning/ml1/markeder"
      learningOutcomes={[
        'Innhold under utvikling — fullt læringsutbytte legges inn når modulen er ferdig',
      ]}
    />
  )
}
