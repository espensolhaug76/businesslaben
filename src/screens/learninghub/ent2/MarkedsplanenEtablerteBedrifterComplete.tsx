import LearningComplete from '../shared/LearningComplete'

export default function MarkedsplanenEtablerteBedrifterComplete() {
  return (
    <LearningComplete
      moduleTitle="Markedsplanen for etablerte bedrifter"
      moduleIcon="📋"
      retryRoute="/learning/ent2/markedsplanen-etablerte-bedrifter"
      learningOutcomes={[
        'Innhold under utvikling — fullt læringsutbytte legges inn når modulen er ferdig',
      ]}
    />
  )
}
