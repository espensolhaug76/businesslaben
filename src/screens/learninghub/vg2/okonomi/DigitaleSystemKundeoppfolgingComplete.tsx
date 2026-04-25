import LearningComplete from '../../shared/LearningComplete'

export default function DigitaleSystemKundeoppfolgingComplete() {
  return (
    <LearningComplete
      moduleTitle="Digitale system og kundeoppfølging"
      moduleIcon="💻"
      retryRoute="/learning/vg2/okonomi/digitale-system-kundeoppfolging"
      learningOutcomes={[
        'Du forstår hva et CRM-system er og hvorfor det er mer enn en adressebok',
        'Du kan forklare salgstrakten, lead-scoring og ticketing-systemets funksjon',
        'Du kjenner GDPR-kravene som gjelder ved bruk av CRM og kundedata',
      ]}
    />
  )
}
