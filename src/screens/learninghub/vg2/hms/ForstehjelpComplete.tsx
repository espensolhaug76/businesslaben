import LearningComplete from '../../shared/LearningComplete'

export default function ForstehjelpComplete() {
  return (
    <LearningComplete
      moduleTitle="Førstehjelp og skadested"
      moduleIcon="🚑"
      retryRoute="/learning/vg2/hms/forstehjelp"
      learningOutcomes={[
        'Du kan gjennomføre BLÅ-vurdering (Bevissthet, Luftveier, Åndedrett) og velge riktig tiltak',
        'Du kan utføre HLR i forholdet 30:2 og bruke en hjertestarter (AED)',
        'Du forstår skadestedsledelse og kan delegere oppgaver effektivt under press',
      ]}
    />
  )
}
