import LearningComplete from '../shared/LearningComplete'

export default function PrisstrategiMl1Complete() {
  return (
    <LearningComplete
      moduleTitle="Prisstrategi"
      moduleIcon="💰"
      retryRoute="/learning/ml1/prisstrategi"
      learningOutcomes={[
        'Du kan beregne og tolke priselastisitet',
        'Du kjenner de tre prisingsmetodene og kan velge riktig',
        'Du forstår prispsykologi, dynamisk prising og prisdiskriminering',
      ]}
    />
  )
}
