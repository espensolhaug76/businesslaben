import LearningComplete from '../../shared/LearningComplete'

export default function BeredskapsledelseComplete() {
  return (
    <LearningComplete
      moduleTitle="Beredskapsledelse"
      moduleIcon="🚨"
      retryRoute="/learning/vg2/innovasjon/beredskapsledelse"
      learningOutcomes={[
        'Du kan lede et team gjennom ulike krisescenarier',
        'Du kjenner riktig handlingsrekkefølge ved brann, ran og medisinsk nødsituasjon',
        'Du forstår viktigheten av krisekommunikasjon',
      ]}
    />
  )
}
