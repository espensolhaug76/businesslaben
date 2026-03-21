import LearningComplete from '../shared/LearningComplete'

export default function ReglerLovverkComplete() {
  return (
    <LearningComplete
      moduleTitle="Regler og lovverk for servicenæringen"
      moduleIcon="⚖️"
      retryRoute="/learning/forretningsdrift/regler-lovverk"
      learningOutcomes={[
        'Du kjenner de viktigste lovene i servicenæringen: AML, ferieloven, forbrukerkjøpsloven og markedsføringsloven',
        'Du forstår forskjellen mellom reklamasjonsrett og garanti',
        'Du vet hva angrerettloven innebærer for netthandel',
        'Du kan forklare kravene til bedriftsregistrering, serveringsbevilling og MVA-registrering',
      ]}
    />
  )
}
