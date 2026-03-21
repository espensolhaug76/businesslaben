import LearningComplete from '../shared/LearningComplete'

export default function StpComplete() {
  return (
    <LearningComplete
      moduleTitle="Segmentering, målgruppe og posisjonering (STP)"
      moduleIcon="🎯"
      retryRoute="/learning/ml1/stp"
      learningOutcomes={[
        'Du kan segmentere et marked etter de fire segmenteringskriteriene',
        'Du forstår de tre målgruppe-strategiene og kan velge riktig for en bedrift',
        'Du kan posisjonere et produkt og bygge en persona',
      ]}
    />
  )
}
