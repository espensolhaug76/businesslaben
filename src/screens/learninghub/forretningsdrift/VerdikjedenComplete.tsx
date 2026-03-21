import LearningComplete from '../shared/LearningComplete'

export default function VerdikjedenComplete() {
  return (
    <LearningComplete
      moduleTitle="Verdikjeden og bærekraftig utvikling"
      moduleIcon="🔗"
      retryRoute="/learning/forretningsdrift/verdikjeden"
      learningOutcomes={[
        'Du kan forklare Porters verdikjede og skille mellom primær- og støtteaktiviteter',
        'Du forstår Triple Bottom Line og hva bærekraftig forretningsdrift innebærer',
        'Du kan gjenkjenne grønnvasking og forklare hva som skiller det fra ekte bærekraft',
        'Du kjenner til sirkulær økonomi og kan gi eksempler på bærekraftige tiltak i servicenæringen',
      ]}
    />
  )
}
