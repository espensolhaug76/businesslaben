import LearningComplete from '../shared/LearningComplete'

export default function BaerekraftForretningsideeComplete() {
  return (
    <LearningComplete
      moduleTitle="Bærekraftig forretningsidé"
      moduleIcon="🌱"
      retryRoute="/learning/mfi/baerekraft-forretningsidee"
      learningOutcomes={[
        'Du forstår Triple Bottom Line (People, Planet, Profit)',
        'Du kan identifisere greenwashing',
        'Du kan vurdere bærekraft i en forretningsidé',
      ]}
    />
  )
}
