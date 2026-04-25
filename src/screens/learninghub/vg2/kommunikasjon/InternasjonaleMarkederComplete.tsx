import LearningComplete from '../../shared/LearningComplete'

export default function InternasjonaleMarkederComplete() {
  return (
    <LearningComplete
      moduleTitle="Internasjonale markeder"
      moduleIcon="🌐"
      retryRoute="/learning/vg2/kommunikasjon/internasjonale-markeder"
      learningOutcomes={[
        'Du forstår Norges EØS-avtale og hva den betyr for handel',
        'Du kan håndtere kulturelle forskjeller i internasjonale møter',
        'Du forstår valutarisiko og grunnleggende kontraktspunkter',
      ]}
    />
  )
}
