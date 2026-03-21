import LearningComplete from '../shared/LearningComplete'

export default function SalgsprosessenComplete() {
  return (
    <LearningComplete
      moduleTitle="Salgsprosessen"
      moduleIcon="🤝"
      retryRoute="/learning/mfi/salgsprosessen"
      learningOutcomes={[
        'Du kjenner de 5 fasene i salgsprosessen',
        'Du kan stille åpne behovsspørsmål',
        'Du behersker innvendingshåndtering og avslutning',
      ]}
    />
  )
}
