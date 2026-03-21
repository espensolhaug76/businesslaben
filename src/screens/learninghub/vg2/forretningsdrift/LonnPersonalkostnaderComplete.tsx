import LearningComplete from '../../shared/LearningComplete'

export default function LonnPersonalkostnaderComplete() {
  return (
    <LearningComplete
      moduleTitle="Lønn og personalkostnader"
      moduleIcon="💸"
      retryRoute="/learning/vg2/forretningsdrift/lonn-personalkostnader"
      learningOutcomes={[
        'Du kan beregne timelønn, fastlønn og provisjonslønn',
        'Du forstår arbeidsgiveravgift (14,1%) og feriepenger (10,2%)',
        'Du vet forskjellen mellom bruttolønn og total lønnskostnad',
      ]}
    />
  )
}
