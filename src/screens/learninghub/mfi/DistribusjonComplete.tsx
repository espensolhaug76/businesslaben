import LearningComplete from '../shared/LearningComplete'

export default function DistribusjonComplete() {
  return (
    <LearningComplete
      moduleTitle="Distribusjon"
      moduleIcon="🚚"
      retryRoute="/learning/mfi/distribusjon"
      learningOutcomes={[
        'Du forstår forskjellen på direkte og indirekte distribusjon',
        'Du kan forklare intensiv, selektiv og eksklusiv distribusjon med eksempler',
        'Du forstår hva som skiller omnikanal fra multikanal',
        'Du kjenner til push- og pull-strategier i distribusjonskjeden',
      ]}
    />
  )
}
