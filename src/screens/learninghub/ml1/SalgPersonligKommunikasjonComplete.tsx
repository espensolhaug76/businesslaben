import LearningComplete from '../shared/LearningComplete'

export default function SalgPersonligKommunikasjonComplete() {
  return (
    <LearningComplete
      moduleTitle="Salg og personlig kommunikasjon"
      moduleIcon="🤝"
      retryRoute="/learning/ml1/salg-personlig-kommunikasjon"
      learningOutcomes={[
        'Du kjenner salgsprosessens syv steg og kan strukturere et salgsmøte profesjonelt',
'Du behersker behovsanalyse med åpne spørsmål, SPIN-modellen og 70/30-regelen',
'Du kan håndtere innvendinger som \'for dyrt\' uten å gi rabatt eller miste salget',
'Du forstår verdien av etterarbeid og relasjonsmarkedsføring (CLV, NPS)',
'Du opererer innenfor markedsføringsloven og praktiserer etisk salg overfor alle kundegrupper',
      ]}
    />
  )
}
