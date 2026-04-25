import LearningComplete from '../../shared/LearningComplete'

export default function SalgsprosessenVg2Complete() {
  return (
    <LearningComplete
      moduleTitle="Salgsprosessen"
      moduleIcon="🤝"
      retryRoute="/learning/vg2/kommunikasjon/salgsprosessen-vg2"
      learningOutcomes={[
        'Du kan beskrive salgsprosessens seks faser og forklare verdien av behovsavdekking',
        'Du kan bruke FAB-modellen til å presentere produkter koblet til kundens behov',
        'Du forstår hva mersalg og kryss-salg er og kan gjøre det etisk og verdiskapende',
      ]}
    />
  )
}
