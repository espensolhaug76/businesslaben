import LearningComplete from '../shared/LearningComplete'

export default function MalgruppeComplete() {
  return (
    <LearningComplete
      moduleTitle="Målgrupper og segmentering"
      moduleIcon="🎯"
      retryRoute="/learning/mfi/malgruppe"
      learningOutcomes={[
        'Du kan segmentere et marked etter de 4 kriteriene',
        'Du kan bygge en enkel persona for en målgruppe',
        'Du forstår forskjellen på primær og sekundær målgruppe',
      ]}
    />
  )
}
