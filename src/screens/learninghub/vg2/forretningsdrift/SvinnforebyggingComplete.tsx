import LearningComplete from '../../shared/LearningComplete'

export default function SvinnforebyggingComplete() {
  return (
    <LearningComplete
      moduleTitle="Svinnforebygging"
      moduleIcon="🛡️"
      retryRoute="/learning/vg2/forretningsdrift/svinnforebygging"
      learningOutcomes={[
        'Du kjenner de ulike typene svinn (eksternt, internt, ukurans)',
        'Du kan beregne svinnprosent og vurdere tiltak',
        'Du forstår FIFO og rutiner for leverandørreklamasjon',
      ]}
    />
  )
}
