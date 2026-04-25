import LearningComplete from '../shared/LearningComplete'

export default function ProfesjonelleMarkederComplete() {
  return (
    <LearningComplete
      moduleTitle="Profesjonelle markeder"
      moduleIcon="🏛️"
      retryRoute="/learning/ml1/profesjonelle-markeder"
      learningOutcomes={[
        'Innhold under utvikling — fullt læringsutbytte legges inn når modulen er ferdig',
      ]}
    />
  )
}
