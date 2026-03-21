import LearningComplete from '../shared/LearningComplete'

export default function EtikkComplete() {
  return (
    <LearningComplete
      moduleTitle="Etikk og yrkesstolthet"
      moduleIcon="🧭"
      retryRoute="/learning/kultur/etikk"
      learningOutcomes={[
        'Du kan identifisere og handle riktig i etiske dilemmaer',
        'Du kjenner varslingsplikten og dine rettigheter',
        'Du forstår hva yrkesstolthet innebærer i praksis',
      ]}
    />
  )
}
