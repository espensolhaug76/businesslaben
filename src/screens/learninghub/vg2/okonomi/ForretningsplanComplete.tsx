import LearningComplete from '../../shared/LearningComplete'

export default function ForretningsplanComplete() {
  return (
    <LearningComplete
      moduleTitle="Forretningsplanlegging"
      moduleIcon="📑"
      retryRoute="/learning/vg2/okonomi/forretningsplan"
      learningOutcomes={[
        'Du kan beskrive hovedelementene i en forretningsplan',
        'Du forstår PEST-analyse og risikovurdering',
        'Du kan beregne et enkelt driftsresultat og vurdere finansieringsmix',
      ]}
    />
  )
}
