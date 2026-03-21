import LearningComplete from '../shared/LearningComplete'

export default function KommunikasjonComplete() {
  return (
    <LearningComplete
      moduleTitle="Profesjonell kommunikasjon"
      moduleIcon="💬"
      retryRoute="/learning/kultur/kommunikasjon"
      learningOutcomes={[
        'Du kan tilpasse kommunikasjonsstil til ulike kanaler',
        'Du forstår viktigheten av tone of voice og kroppsspråk',
        'Du vet hvordan du håndterer negative tilbakemeldinger profesjonelt',
      ]}
    />
  )
}
