import LearningComplete from '../../shared/LearningComplete'

export default function DigitalSikkerhetPersonvernComplete() {
  return (
    <LearningComplete
      moduleTitle="Digital sikkerhet og personvern"
      moduleIcon="🔒"
      retryRoute="/learning/vg2/hms/digital-sikkerhet-personvern"
      learningOutcomes={[
        'Du kan gjenkjenne phishing og vet hva du gjør for å beskytte deg og bedriften',
        'Du forstår GDPR-prinsippene dataminimering, formålsbegrensning og sletterutiner',
        'Du kjenner de vanligste sikkerhetsfeilene i hverdagen og vet hvordan du unngår dem',
      ]}
    />
  )
}
