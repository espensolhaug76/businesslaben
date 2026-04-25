import LearningComplete from '../shared/LearningComplete'

export default function ForretningsmodellBmcComplete() {
  return (
    <LearningComplete
      moduleTitle="Forretningsmodellen (BMC)"
      moduleIcon="🗺️"
      retryRoute="/learning/ent1/forretningsmodell-bmc"
      learningOutcomes={[
        'Du forstår BMC som verktøy for å visualisere hele forretningsmodellen på én side',
'Du kan beskrive de 9 byggestenene og hvordan de henger sammen',
'Du behersker Lean Startup-tilnærmingen — test antakelser, pivoter ved feil',
'Du forstår forskjellen på faste og variable kostnader og deres strategiske betydning',
'Du ser BMC som levende dokument som utvikler seg med bedriften',
      ]}
    />
  )
}
