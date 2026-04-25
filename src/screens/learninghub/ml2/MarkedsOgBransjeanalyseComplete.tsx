import LearningComplete from '../shared/LearningComplete'

export default function MarkedsOgBransjeanalyseComplete() {
  return (
    <LearningComplete
      moduleTitle="Markeds- og bransjeanalyse"
      moduleIcon="🔍"
      retryRoute="/learning/ml2/markeds-og-bransjeanalyse"
      learningOutcomes={[
        'Du forstår Porters 5 krefter og hvordan hver kraft påvirker bransjens lønnsomhet',
'Du kan vurdere om en bransje er attraktiv eller strukturelt ulønnsom',
'Du kjenner forskjellen på rivalisering, nyetablerere, substitutter, leverandørmakt og kundemakt',
'Du forstår strategiske grupper og bransjeglidning som dynamiske krefter',
'Du kan koble bransjeanalyse til konkrete strategiske valg om posisjonering',
      ]}
    />
  )
}
