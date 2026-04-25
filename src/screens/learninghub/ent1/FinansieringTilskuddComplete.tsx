import LearningComplete from '../shared/LearningComplete'

export default function FinansieringTilskuddComplete() {
  return (
    <LearningComplete
      moduleTitle="Finansiering og tilskudd"
      moduleIcon="💵"
      retryRoute="/learning/ent1/finansiering-tilskudd"
      learningOutcomes={[
        'Du forstår kapitalbehov og hvordan beregne \'runway\'',
'Du kjenner forskjellen på egenkapital, lån, tilskudd og crowdfunding',
'Du behersker norske støtteordninger via Innovasjon Norge og Forskningsrådet',
'Du kan strukturere en investor-pitch på standardmal',
'Du forstår kapitaltrappestigen og match mellom finansieringskilde og vekstfase',
      ]}
    />
  )
}
