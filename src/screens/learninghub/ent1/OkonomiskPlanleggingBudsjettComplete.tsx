import LearningComplete from '../shared/LearningComplete'

export default function OkonomiskPlanleggingBudsjettComplete() {
  return (
    <LearningComplete
      moduleTitle="Økonomisk planlegging og budsjett"
      moduleIcon="📊"
      retryRoute="/learning/ent1/okonomisk-planlegging-budsjett"
      learningOutcomes={[
        'Du forstår de 3 hovedformålene med budsjettering: forutse, styre, dokumentere',
'Du kjenner forskjellen på resultatbudsjett (lønnsomhet) og likviditetsbudsjett (cash flow)',
'Du kan beregne dekningsbidrag, dekningsgrad og break-even punkt',
'Du forstår skillet på faste og variable kostnader og strategisk betydning',
'Du ser at god økonomistyring er forskjellen på suksess og konkurs',
      ]}
    />
  )
}
