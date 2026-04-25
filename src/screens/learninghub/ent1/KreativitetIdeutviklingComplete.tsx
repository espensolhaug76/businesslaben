import LearningComplete from '../shared/LearningComplete'

export default function KreativitetIdeutviklingComplete() {
  return (
    <LearningComplete
      moduleTitle="Kreativitet og idéutvikling"
      moduleIcon="🎨"
      retryRoute="/learning/ent1/kreativitet-ideutvikling"
      learningOutcomes={[
        'Du forstår at kreativitet er nytt + nyttig — og at det kan trenes',
'Du kjenner de 4 fasene i kreativ prosess (forberedelse, inkubasjon, illuminasjon, verifikasjon)',
'Du behersker brainstorming, SCAMPER og Design Thinking som strukturerte teknikker',
'Du kan validere en idé på 3 kriterier: reelt problem, stor målgruppe, betalingsvilje',
'Du forstår at enkle prototyper gir mer læring per krone enn ferdige produkter',
      ]}
    />
  )
}
