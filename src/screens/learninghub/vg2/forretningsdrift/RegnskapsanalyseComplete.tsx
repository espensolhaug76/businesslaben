import LearningComplete from '../../shared/LearningComplete'

export default function RegnskapsanalyseComplete() {
  return (
    <LearningComplete
      moduleTitle="Regnskapsanalyse"
      moduleIcon="📈"
      retryRoute="/learning/vg2/forretningsdrift/regnskapsanalyse"
      learningOutcomes={[
        'Du kan beregne dekningsgrad, likviditetsgrad og soliditet',
        'Du forstår break-even-beregning',
        'Du kan lese og tolke et resultatregnskap',
      ]}
    />
  )
}
