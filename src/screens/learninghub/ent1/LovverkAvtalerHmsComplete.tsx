import LearningComplete from '../shared/LearningComplete'

export default function LovverkAvtalerHmsComplete() {
  return (
    <LearningComplete
      moduleTitle="Lovverk, avtaler og HMS"
      moduleIcon="⚖️"
      retryRoute="/learning/ent1/lovverk-avtaler-hms"
      learningOutcomes={[
        'Du forstår grunnleggende lover som påvirker bedrifter (avtaleloven, kjøpsloven, mfl.)',
'Du kjenner viktigheten av skriftlige avtaler og hvorfor maler er smarte',
'Du behersker HMS-kravene og kan gjøre enkel ROS-analyse',
'Du forstår GDPR-kravene og 4 % omsetning som maks bot',
'Du ser at orden i juridisk arbeid er strategisk forsvar — ikke kostnad',
      ]}
    />
  )
}
