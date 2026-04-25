import LearningComplete from '../../shared/LearningComplete'

export default function EtiskeDilemmaerComplete() {
  return (
    <LearningComplete
      moduleTitle="Etiske dilemmaer"
      moduleIcon="🧩"
      retryRoute="/learning/vg2/hms/etiske-dilemmaer"
      learningOutcomes={[
        'Du kan identifisere korrupsjon, industrispionasje og greenwashing',
        'Du forstår supply chain due diligence',
        'Du kan argumentere for etiske valg i en forretningskontekst',
      ]}
    />
  )
}
