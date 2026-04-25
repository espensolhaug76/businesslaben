import LearningComplete from '../../shared/LearningComplete'

export default function NokkeltallLonnsomhetComplete() {
  return (
    <LearningComplete
      moduleTitle="Nøkkeltall og lønnsomhet"
      moduleIcon="📊"
      retryRoute="/learning/vg2/okonomi/nokkeltall-lonnsomhet"
      learningOutcomes={[
        'Du kan beregne og tolke rentabilitet, likviditet, soliditet og dekningsgrad',
        'Du forstår at overskudd og likviditet er to forskjellige ting',
        'Du kan forklare hva arbeidskapital er og hvorfor positiv arbeidskapital er viktig',
      ]}
    />
  )
}
