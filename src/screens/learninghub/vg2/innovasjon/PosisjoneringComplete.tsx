import LearningComplete from '../../shared/LearningComplete'

export default function PosisjoneringComplete() {
  return (
    <LearningComplete
      moduleTitle="Posisjonering"
      moduleIcon="📍"
      retryRoute="/learning/vg2/innovasjon/posisjonering"
      learningOutcomes={[
        'Du kan plassere merker på et posisjoneringskartet',
        'Du forstår Blue Ocean Strategy',
        'Du kan identifisere gap i markedet',
      ]}
    />
  )
}
