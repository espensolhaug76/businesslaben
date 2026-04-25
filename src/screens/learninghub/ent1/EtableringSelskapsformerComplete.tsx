import LearningComplete from '../shared/LearningComplete'

export default function EtableringSelskapsformerComplete() {
  return (
    <LearningComplete
      moduleTitle="Etablering og selskapsformer"
      moduleIcon="🏛️"
      retryRoute="/learning/ent1/etablering-selskapsformer"
      learningOutcomes={[
        'Du forstår forskjellen på ENK og AS — særlig ansvar og kapitalkrav',
'Du kjenner registreringsprosessen via Brønnøysund og Altinn',
'Du behersker grunnleggende skatteregler (mva, skattetrekk, AGA)',
'Du forstår viktigheten av aksjonæravtale før konflikten oppstår',
'Du kan velge selskapsform basert på risiko, ambisjon og kapitalbehov',
      ]}
    />
  )
}
