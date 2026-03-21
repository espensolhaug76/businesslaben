import LearningComplete from '../shared/LearningComplete'

export default function MarkedsforingFagComplete() {
  return (
    <LearningComplete
      moduleTitle="Markedsføring som fag og tankesett"
      moduleIcon="📚"
      retryRoute="/learning/ml1/markedsforingfag"
      learningOutcomes={[
        'Du kan forklare hva markedsføring er og hvorfor det er mer enn reklame',
        'Du kan beskrive markedsføringens historiske utvikling',
        'Du forstår hva en markedsorientert bedrift gjør annerledes',
      ]}
    />
  )
}
