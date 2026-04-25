import LearningComplete from '../shared/LearningComplete'

export default function PersonaladministrasjonHRMComplete() {
  return (
    <LearningComplete
      moduleTitle="Personaladministrasjon og HRM"
      moduleIcon="👥"
      retryRoute="/learning/ml2/personaladministrasjon-hrm"
      learningOutcomes={[
        'Du forstår HRM som strategisk arbeid med mennesker — ikke bare administrasjon',
'Du kjenner Herzbergs to-faktor-teori og 70-20-10-læringsmodellen',
'Du behersker rekrutteringsprosessen og kostnaden ved feil ansettelse',
'Du forstår norsk arbeidsmiljølov og krav til oppsigelser',
'Du ser employer branding og HR-strategi som kritiske strategiske disipliner',
      ]}
    />
  )
}
