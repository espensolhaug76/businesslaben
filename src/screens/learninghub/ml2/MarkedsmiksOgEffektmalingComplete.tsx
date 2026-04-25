import LearningComplete from '../shared/LearningComplete'

export default function MarkedsmiksOgEffektmalingComplete() {
  return (
    <LearningComplete
      moduleTitle="Markedsmiks og effektmåling"
      moduleIcon="📊"
      retryRoute="/learning/ml2/markedsmiks-og-effektmaling"
      learningOutcomes={[
        'Du forstår markedsmiksen som integrert sett av strategiske valg',
'Du kan vurdere synergi mellom de 4 P-ene og avdekke sprik',
'Du kan måle kommunikasjonseffekt med kjennskap, recall og preferanse',
'Du behersker ROAS, ROI og analytics som verktøy for performance-måling',
'Du forstår feilkilder ved måling og forskjellen på korrelasjon og kausalitet',
      ]}
    />
  )
}
