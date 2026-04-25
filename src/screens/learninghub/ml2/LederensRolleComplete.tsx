import LearningComplete from '../shared/LearningComplete'

export default function LederensRolleComplete() {
  return (
    <LearningComplete
      moduleTitle="Lederens rolle"
      moduleIcon="👤"
      retryRoute="/learning/ml2/lederens-rolle"
      learningOutcomes={[
        'Innhold under utvikling — fullt læringsutbytte legges inn når modulen er ferdig',
      ]}
    />
  )
}
