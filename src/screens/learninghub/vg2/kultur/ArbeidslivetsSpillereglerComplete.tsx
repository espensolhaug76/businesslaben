import LearningComplete from '../../shared/LearningComplete'

export default function ArbeidslivetsSpillereglerComplete() {
  return (
    <LearningComplete
      moduleTitle="Arbeidslivets spilleregler"
      moduleIcon="📜"
      retryRoute="/learning/vg2/kultur/arbeidslivets-spilleregler"
      learningOutcomes={[
        'Du kjenner arbeidsmiljølovens regler om arbeidstid og overtid',
        'Du forstår permittering vs oppsigelse og verneperioden ved sykdom',
        'Du vet hvem som har HMS-ansvaret i en bedrift',
      ]}
    />
  )
}
