import LearningComplete from '../shared/LearningComplete'

export default function SituasjonsanalyseComplete() {
  return (
    <LearningComplete
      moduleTitle="Situasjonsanalyse"
      moduleIcon="🔍"
      retryRoute="/learning/ml1/situasjonsanalyse"
      learningOutcomes={[
        'Du kan gjennomføre en SWOT-analyse og skille interne fra eksterne faktorer',
        'Du kan bruke PESTEL til å kartlegge makroomgivelsene',
        'Du forstår Porters fem krefter og kan bruke BCG-matrisen',
      ]}
    />
  )
}
