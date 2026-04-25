import LearningComplete from '../shared/LearningComplete'

export default function CsrEtikkComplete() {
  return (
    <LearningComplete
      moduleTitle="CSR og etikk"
      moduleIcon="🌱"
      retryRoute="/learning/ent2/csr-etikk"
      learningOutcomes={[
        'Innhold under utvikling — fullt læringsutbytte legges inn når modulen er ferdig',
      ]}
    />
  )
}
