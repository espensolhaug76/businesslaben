import LearningComplete from '../shared/LearningComplete'

export default function PrisstrategiAvansertComplete() {
  return (
    <LearningComplete
      moduleTitle="Prisstrategier (avansert)"
      moduleIcon="💰"
      retryRoute="/learning/ml2/prisstrategi-avansert"
      learningOutcomes={[
        'Du forstår at pris er det eneste P-et som genererer inntekt — sterkt strategisk verktøy',
'Du kan velge mellom selvkost og bidragsmetoden basert på beslutningstype',
'Du kjenner skumming vs penetrering som lansering-strategier',
'Du behersker yield management og avansert prisdiskriminering',
'Du forstår psykologisk prissetting og pris-effekt på bunnlinjen (1 % = 5-10 %)',
      ]}
    />
  )
}
