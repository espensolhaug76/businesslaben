import LearningComplete from '../shared/LearningComplete'

export default function OrganiseringOgLedelseStrategiskComplete() {
  return (
    <LearningComplete
      moduleTitle="Organisering og ledelse (strategisk nivå)"
      moduleIcon="🏢"
      retryRoute="/learning/ml2/organisering-og-ledelse-strategisk"
      learningOutcomes={[
        'Du forstår at strukturen følger strategien — endre strategi, vurder struktur',
'Du kan diagnostisere bedriftskultur og dens effekt på strategi-implementering',
'Du kjenner Kotters 8-stegs endringsmodell og hvorfor 70 % mislykkes',
'Du forstår agil organisering som svar på rask digital endring',
'Du ser internmarkedsføring og kompetansestrategi som kritiske implementeringsverktøy',
      ]}
    />
  )
}
