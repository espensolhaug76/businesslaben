import LearningComplete from '../shared/LearningComplete'

export default function KlagebehandlingComplete() {
  return (
    <LearningComplete
      moduleTitle="Klagebehandling og reklamasjon"
      moduleIcon="📩"
      retryRoute="/learning/kultur/klagebehandling"
      learningOutcomes={[
        'Du kan håndtere klager med empati og profesjonalitet',
        'Du kjenner forbrukernes rettigheter ved reklamasjon',
        'Du forstår hvordan god klagebehandling skaper lojale kunder',
      ]}
    />
  )
}
