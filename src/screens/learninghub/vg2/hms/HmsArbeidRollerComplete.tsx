import LearningComplete from '../../shared/LearningComplete'

export default function HmsArbeidRollerComplete() {
  return (
    <LearningComplete
      moduleTitle="HMS-arbeid og roller"
      moduleIcon="🦺"
      retryRoute="/learning/vg2/hms/hms-arbeid-roller"
      learningOutcomes={[
        'Du kan beskrive de fire trinnene i internkontroll og forklare hva hvert trinn inneholder',
        'Du forstår forskjellen mellom daglig leders juridiske ansvar og verneombudets overvåkingsrolle',
        'Du vet hva AMU er, når det er lovpålagt, og hva avvikssystemet brukes til',
      ]}
    />
  )
}
