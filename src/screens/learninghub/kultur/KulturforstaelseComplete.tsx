import LearningComplete from '../shared/LearningComplete'

export default function KulturforstaelseComplete() {
  return (
    <LearningComplete
      moduleTitle="Kulturforståelse og mangfold"
      moduleIcon="🌍"
      retryRoute="/learning/kultur/kulturforstaelse"
      learningOutcomes={[
        'Du kan tilpasse service til kunder fra ulike kulturer',
        'Du kjenner til kulturelle forskjeller i kommunikasjon og skikker',
        'Du forstår diskrimineringslovens krav om tilrettelegging',
      ]}
    />
  )
}
