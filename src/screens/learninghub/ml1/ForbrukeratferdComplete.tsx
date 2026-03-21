import LearningComplete from '../shared/LearningComplete'

export default function ForbrukeratferdComplete() {
  return (
    <LearningComplete
      moduleTitle="Forbrukeratferd"
      moduleIcon="🛒"
      retryRoute="/learning/ml1/forbrukeratferd"
      learningOutcomes={[
        'Du kan beskrive kjøpsprosessens 5 faser og hva markedsføring kan gjøre i hver fase',
        'Du forstår indre og ytre påvirkningsfaktorer på kjøpsatferd',
        'Du kan forklare forskjellen mellom B2B og B2C kjøpsatferd',
      ]}
    />
  )
}
