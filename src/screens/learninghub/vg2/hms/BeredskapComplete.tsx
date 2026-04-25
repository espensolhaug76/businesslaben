import LearningComplete from '../../shared/LearningComplete'

export default function BeredskapComplete() {
  return (
    <LearningComplete
      moduleTitle="Beredskap og krisehåndtering"
      moduleIcon="🚨"
      retryRoute="/learning/vg2/hms/beredskap"
      learningOutcomes={[
        'Du kan beskrive innholdet i en beredskapsplan og begrunne hvorfor den er nødvendig',
        'Du kan skille mellom fysiske, tekniske og administrative sikkerhetstiltak',
        'Du forstår krisekommunikasjonens betydning og lederansvar under kriser',
      ]}
    />
  )
}
