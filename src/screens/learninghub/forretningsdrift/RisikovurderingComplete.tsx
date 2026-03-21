import LearningComplete from '../shared/LearningComplete'

export default function RisikovurderingComplete() {
  return (
    <LearningComplete
      moduleTitle="Risikovurdering og forebyggende tiltak"
      moduleIcon="⚠️"
      retryRoute="/learning/forretningsdrift/risikovurdering"
      learningOutcomes={[
        'Du kan forklare hva en risikovurdering er og hva Arbeidsmiljøloven krever',
        'Du kan bruke en risikomatrise til å vurdere og prioritere risikoer',
        'Du kjenner til tiltakshierarkiet og kan velge riktig nivå av forebyggende tiltak',
        'Du forstår hva restrisiko er og kan dokumentere risikovurderinger',
      ]}
    />
  )
}
