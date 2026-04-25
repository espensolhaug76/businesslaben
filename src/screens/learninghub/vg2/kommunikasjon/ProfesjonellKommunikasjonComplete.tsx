import LearningComplete from '../../shared/LearningComplete'

export default function ProfesjonellKommunikasjonComplete() {
  return (
    <LearningComplete
      moduleTitle="Avansert kommunikasjon"
      moduleIcon="🎙️"
      retryRoute="/learning/vg2/kommunikasjon/profesjonell-kommunikasjon"
      learningOutcomes={[
        'Du kan gjennomføre en B2B-presentasjon og investorpitch',
        'Du vet hvordan du kommuniserer i en pressesituasjon',
        'Du kan fasilitere møter og håndtere krisekommunikasjon',
      ]}
    />
  )
}
