import LearningComplete from '../shared/LearningComplete'

export default function ReklameMedieplanleggingComplete() {
  return (
    <LearningComplete
      moduleTitle="Reklame og medieplanlegging"
      moduleIcon="📺"
      retryRoute="/learning/ml1/reklame-medieplanlegging"
      learningOutcomes={[
        'Du kjenner reklamens grunnbegreper: dekning, frekvens, GRP, CPM, CPC, ROAS',
'Du kan strukturere en medieplan med klare SMART-mål, riktig kanalvalg og målbart resultat',
'Du forstår etiske krav til reklame i Norge — merkeplikt, prisregler, vern av barn',
'Du kjenner forskjell på programmatisk annonsering og tradisjonelle medier — og når hver passer',
'Du kan vurdere effekten av en kampanje med riktige metrikker, ikke vanity metrics',
      ]}
    />
  )
}
