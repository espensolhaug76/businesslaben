import LearningComplete from '../../shared/LearningComplete'

export default function TrenderForretningsmodellerComplete() {
  return (
    <LearningComplete
      moduleTitle="Trender, forretningsmodeller og bærekraft"
      moduleIcon="🌱"
      retryRoute="/learning/vg2/okonomi/trender-forretningsmodeller"
      learningOutcomes={[
        'Du kan beskrive de tre megatrendene og forklare konsekvensene for servicebransjen',
        'Du forstår abonnementsmodell, delingsøkonomi og sirkulærøkonomi som forretningsmodeller',
        'Du kan forklare den tredoble bunnlinjen og skille ekte bærekraft fra grønnvasking',
      ]}
    />
  )
}
