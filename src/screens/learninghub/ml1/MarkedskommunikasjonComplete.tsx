import LearningComplete from '../shared/LearningComplete'

export default function MarkedskommunikasjonComplete() {
  return (
    <LearningComplete
      moduleTitle="Markedskommunikasjon"
      moduleIcon="📣"
      retryRoute="/learning/ml1/markedskommunikasjon"
      learningOutcomes={[
        'Du kan forklare kommunikasjonsprosessen og hva støy er',
        'Du kan bruke AIDA-modellen til å planlegge kommunikasjonsarbeid',
        'Du forstår forskjellen mellom reklame, PR og innholdsmarkedsføring',
      ]}
    />
  )
}
