import LearningComplete from '../shared/LearningComplete'

export default function TeknologiKiComplete() {
  return (
    <LearningComplete
      moduleTitle="Teknologi og KI i salg"
      moduleIcon="🤖"
      retryRoute="/learning/mfi/teknologi-ki"
      learningOutcomes={[
        'Du kan forklare hva et CRM-system er og hvorfor det brukes i salgsbedrifter',
        'Du forstår hva omnikanal-salg innebærer og hva konverteringsrate betyr',
        'Du kan gi eksempler på KI i markedsføring: chatbots, produktanbefalinger og dynamisk prissetting',
        'Du kjenner til trender i fremtidens salg: AR, live shopping og sosiale bevis',
      ]}
    />
  )
}
