import LearningComplete from '../shared/LearningComplete'

export default function OkonomistyringKalkulasjonBudsjetteringComplete() {
  return (
    <LearningComplete
      moduleTitle="Økonomistyring, kalkulasjon og budsjettering"
      moduleIcon="💰"
      retryRoute="/learning/ml2/okonomistyring-kalkulasjon-budsjettering"
      learningOutcomes={[
        'Du forstår at marketing må snakke økonomi-språket for å vinne i ledelsen',
'Du behersker bidragsmetoden vs selvkostmetoden — riktig metode per beslutning',
'Du kan beregne dekningsbidrag, dekningsgrad og break-even',
'Du kjenner forskjellen på resultatbudsjett, likviditetsbudsjett og investeringsbudsjett',
'Du forstår NPV, payback og hvordan tidsverdien av penger styrer investeringsbeslutninger',
      ]}
    />
  )
}
