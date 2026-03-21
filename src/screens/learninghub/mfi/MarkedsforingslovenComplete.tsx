import LearningComplete from '../shared/LearningComplete'

export default function MarkedsforingslovenComplete() {
  return (
    <LearningComplete
      moduleTitle="Markedsføringsloven"
      moduleIcon="⚖️"
      retryRoute="/learning/mfi/markedsforingsloven"
      learningOutcomes={[
        'Du kan identifisere ulovlig markedsføring',
        'Du kjenner til krav om merking av reklame og #annonse',
        'Du forstår GDPR-regler for e-postmarkedsføring',
      ]}
    />
  )
}
