import LearningComplete from '../shared/LearningComplete'

export default function ProduktstrategiAvansertComplete() {
  return (
    <LearningComplete
      moduleTitle="Produktstrategi (avansert)"
      moduleIcon="📦"
      retryRoute="/learning/ml2/produktstrategi-avansert"
      learningOutcomes={[
        'Du kan klassifisere produkter i BCG-matrisen og velge riktig strategi per kvadrant',
'Du forstår PLC og hvordan tiltak må tilpasses livssyklus-fase',
'Du kan velge mellom House of Brands og Branded House merkearkitektur',
'Du kjenner Open Innovation som strategi for å hente ideer utenfra',
'Du ser ettermarkedet og økosystem-strategi som ofte mer lønnsomme enn førstesalg',
      ]}
    />
  )
}
