import LearningComplete from '../shared/LearningComplete'

export default function LederensRolleComplete() {
  return (
    <LearningComplete
      moduleTitle="Lederens rolle og funksjon"
      moduleIcon="👤"
      retryRoute="/learning/ml2/lederens-rolle"
      learningOutcomes={[
        'Du forstår forskjellen på ledelse (endring) og administrasjon (opprettholde)',
'Du kjenner Mintzbergs 10 lederroller og Fayols 5 funksjoner',
'Du kan velge riktig lederstil etter situasjon — særlig situasjonsbestemt ledelse',
'Du forstår at EQ er viktigere enn IQ for ledelse, og at den kan trenes',
'Du kjenner Kotters endringsmodell og hvorfor 70 % av endringsprogrammer mislykkes',
      ]}
    />
  )
}
