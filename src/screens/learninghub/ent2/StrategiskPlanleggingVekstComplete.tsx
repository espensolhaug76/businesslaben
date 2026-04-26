import LearningComplete from '../shared/LearningComplete'

export default function StrategiskPlanleggingVekstComplete() {
  return (
    <LearningComplete
      moduleTitle="Strategisk planlegging for vekst"
      moduleIcon="🎯"
      retryRoute="/learning/ent2/strategisk-planlegging-vekst"
      learningOutcomes={[
        'Du forstår at strategi er valg om hva man IKKE gjør, ikke bare hva man gjør',
'Du behersker PESTEL, Porter 5 Forces, BCG og Ansoff som strategiske analyseverktøy',
'Du kjenner Porter generiske strategier: kostnad, differensiering, fokusering',
'Du forstår V/M/V, OKR og KPI som styringsverktøy',
'Du ser at strategi må forholde seg til lov, ESG og taksonomi',
      ]}
    />
  )
}
