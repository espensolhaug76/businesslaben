import LearningComplete from '../shared/LearningComplete'

export default function AvslutningOppsummeringComplete() {
  return (
    <LearningComplete
      moduleTitle="Avslutning og oppsummering"
      moduleIcon="🎯"
      retryRoute="/learning/ent2/avslutning-oppsummering"
      learningOutcomes={[
        'Innhold under utvikling — fullt læringsutbytte legges inn når modulen er ferdig',
      ]}
    />
  )
}
