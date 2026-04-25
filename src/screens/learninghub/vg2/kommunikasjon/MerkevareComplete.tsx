import LearningComplete from '../../shared/LearningComplete'

export default function MerkevareComplete() {
  return (
    <LearningComplete
      moduleTitle="Merkevarestrategi"
      moduleIcon="⭐"
      retryRoute="/learning/vg2/kommunikasjon/merkevare"
      learningOutcomes={[
        'Du forstår hva brand equity betyr i praksis',
        'Du kan posisjonere en merkevare mot konkurrenter',
        'Du kjenner risikoen ved rebranding',
      ]}
    />
  )
}
