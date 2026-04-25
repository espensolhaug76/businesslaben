import LearningComplete from '../shared/LearningComplete'

export default function MarkedsforingsLovverkEtikkComplete() {
  return (
    <LearningComplete
      moduleTitle="Markedsføringens lovverk og etikk"
      moduleIcon="⚖️"
      retryRoute="/learning/ml1/markedsforings-lovverk-etikk"
      learningOutcomes={[
        'Du kjenner Markedsføringsloven og hvordan Forbrukertilsynet håndhever den',
'Du kan rådgi om Angrerettloven og E-handelsloven for nettbutikker',
'Du forstår Åpenhetsloven og hvordan den påvirker leverandørkjedearbeid',
'Du kjenner reglene for reklame mot barn og hva grønnvasking koster',
'Du kan vurdere etiske dilemmaer med 4-stegs-testen og bygge etisk markedsføringskultur',
      ]}
    />
  )
}
