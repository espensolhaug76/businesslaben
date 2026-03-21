import LearningComplete from '../../shared/LearningComplete'

export default function KonflikthandteringComplete() {
  return (
    <LearningComplete
      moduleTitle="Konflikthåndtering"
      moduleIcon="🤜"
      retryRoute="/learning/vg2/kultur/konflikthåndtering"
      learningOutcomes={[
        'Du kan megle i konflikter mellom ansatte og mellom kunde og ansatt',
        'Du forstår varslingsprosedyren (aml §2A)',
        'Du vet når og hvordan en leverandørkonflikt eskaleres',
      ]}
    />
  )
}
