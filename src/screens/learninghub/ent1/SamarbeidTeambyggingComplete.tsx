import LearningComplete from '../shared/LearningComplete'

export default function SamarbeidTeambyggingComplete() {
  return (
    <LearningComplete
      moduleTitle="Samarbeid og teambygging"
      moduleIcon="🤝"
      retryRoute="/learning/ent1/samarbeid-teambygging"
      learningOutcomes={[
        'Du forstår at komplementære team (hacker, hustler, hipster) slår solo-gründere',
'Du kjenner Tuckmans 4 faser og at storming er normal og sunn',
'Du behersker kommunikasjons-strategier for både fysiske og virtuelle team',
'Du forstår at konflikt er hovedårsak til startup-kollaps — aksjonæravtale forebygger',
'Du ser at team slår idé — investorer satser på folk fordi sterkt team adapterer',
      ]}
    />
  )
}
