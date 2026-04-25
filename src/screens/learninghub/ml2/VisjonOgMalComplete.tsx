import LearningComplete from '../shared/LearningComplete'

export default function VisjonOgMalComplete() {
  return (
    <LearningComplete
      moduleTitle="Visjon og mål"
      moduleIcon="🌟"
      retryRoute="/learning/ml2/visjon-og-mal"
      learningOutcomes={[
        'Innhold under utvikling — fullt læringsutbytte legges inn når modulen er ferdig',
      ]}
    />
  )
}
