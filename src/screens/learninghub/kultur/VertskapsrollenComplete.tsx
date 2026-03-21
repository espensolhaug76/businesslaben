import LearningComplete from '../shared/LearningComplete'

export default function VertskapsrollenComplete() {
  return (
    <LearningComplete
      moduleTitle="Vertskapsrollen"
      moduleIcon="🏨"
      retryRoute="/learning/kultur/vertskapsrollen"
      learningOutcomes={[
        'Du kan forklare hva vertskapsrollen innebærer og hvorfor den er sentral i servicenæringen',
        'Du forstår "sannhetens øyeblikk" og opplevelsesøkonomi',
        'Du kan beskrive elementer i profesjonell velkomst og bruk av non-verbal kommunikasjon',
        'Du kjenner til proaktiv service og kan gi eksempler på å lese gjestens behov',
      ]}
    />
  )
}
