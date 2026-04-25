import LearningComplete from '../../shared/LearningComplete'

export default function RisikoanalyseComplete() {
  return (
    <LearningComplete
      moduleTitle="Risikoanalyse"
      moduleIcon="🔍"
      retryRoute="/learning/vg2/hms/risikoanalyse"
      learningOutcomes={[
        'Du kan bruke risikomatrisen (sannsynlighet × konsekvens)',
        'Du forstår nøkkelperson- og leverandørrisiko',
        'Du vet hvordan omdømmerisiko håndteres',
      ]}
    />
  )
}
