import LearningComplete from '../shared/LearningComplete'

export default function KommunikasjonKanalerComplete() {
  return (
    <LearningComplete
      moduleTitle="Kommunikasjon og kanaler"
      moduleIcon="📣"
      retryRoute="/learning/mfi/kommunikasjon-kanaler"
      learningOutcomes={[
        'Du kan forklare AIDA-modellens fire faser med eksempler',
        'Du forstår forskjellen på push- og pull-markedsføring',
        'Du kjenner til betalte, fortjente og eide medier (paid/earned/owned)',
        'Du forstår hvordan algoritmer påvirker organisk rekkevidde',
      ]}
    />
  )
}
