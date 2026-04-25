import LearningComplete from '../../shared/LearningComplete'

export default function BaerekraftVerdikjedeComplete() {
  return (
    <LearningComplete
      moduleTitle="Bærekraft i verdikjeden"
      moduleIcon="🌍"
      retryRoute="/learning/vg2/okonomi/baerekraft-verdikjede"
      learningOutcomes={[
        'Du kan forklare hva Scope 1, 2 og 3-utslipp er og hvorfor Scope 3 er viktigst',
        'Du forstår hva Åpenhetsloven krever av norske bedrifter',
        'Du kan beskrive sporbarhet og leverandøroppfølging som bærekraftsverktøy',
      ]}
    />
  )
}
