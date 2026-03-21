import LearningComplete from '../shared/LearningComplete'

export default function PrisstrategierComplete() {
  return (
    <LearningComplete
      moduleTitle="Prisstrategier"
      moduleIcon="💰"
      retryRoute="/learning/mfi/prisstrategier"
      learningOutcomes={[
        'Du forstår forskjellen på kostbasert, markedsbasert og verdibasert prising',
        'Du kan forklare skumming og penetrasjonsprising med eksempler',
        'Du kan beregne dekningsbidrag og break-even-punkt',
        'Du kjenner til psykologisk prising og hvorfor det virker',
      ]}
    />
  )
}
