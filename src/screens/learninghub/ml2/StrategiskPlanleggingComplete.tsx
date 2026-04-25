import LearningComplete from '../shared/LearningComplete'

export default function StrategiskPlanleggingComplete() {
  return (
    <LearningComplete
      moduleTitle="Strategisk planlegging"
      moduleIcon="🎯"
      retryRoute="/learning/ml2/strategisk-planlegging"
      learningOutcomes={[
        'Du forstår at strategi handler om langsiktige valg som er vanskelige å reversere',
'Du kan strukturere en strategiprosess: visjon → analyse → mål → strategi → implementering',
'Du behersker PESTEL og SWOT som analyseverktøy og kjenner Ansoffs vekstmatrise',
'Du kan identifisere kritiske suksessfaktorer og koble dem med målbare KPI-er',
'Du forstår at 70 % av strategier mislykkes på implementering — og hvordan unngå det',
      ]}
    />
  )
}
