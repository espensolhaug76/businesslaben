import LearningComplete from '../shared/LearningComplete'

export default function MarkedsplanenComplete() {
  return (
    <LearningComplete
      moduleTitle="Markedsplanen"
      moduleIcon="📋"
      retryRoute="/learning/ml2/markedsplanen"
      learningOutcomes={[
        'Du forstår at markedsplanen er styringsdokument som binder strategi til handling',
'Du kan strukturere en plan: situasjonsanalyse → SMART-mål → STP → handlingsplan → budsjett → kontroll',
'Du behersker SMART-mål-rammeverket og hvorfor alle 5 kriterier må oppfylles',
'Du forstår at 70 % av jobben er implementering — ikke planlegging',
'Du kjenner PDCA-syklusen og verdien av læring fra hver runde',
      ]}
    />
  )
}
