import LearningComplete from '../shared/LearningComplete'

export default function TeamarbeidComplete() {
  return (
    <LearningComplete
      moduleTitle="Teamarbeid og roller"
      moduleIcon="👥"
      retryRoute="/learning/kultur/teamarbeid"
      learningOutcomes={[
        'Du forstår Tuckmans teamutviklingsmodell',
        'Du kan fordele roller og ansvar i et team',
        'Du vet hvordan leder håndterer konflikter og motiverer',
      ]}
    />
  )
}
