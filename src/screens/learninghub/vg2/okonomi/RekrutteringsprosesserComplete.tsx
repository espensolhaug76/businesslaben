import LearningComplete from '../../shared/LearningComplete'

export default function RekrutteringsprosesserComplete() {
  return (
    <LearningComplete
      moduleTitle="Rekrutteringsprosesser"
      moduleIcon="👥"
      retryRoute="/learning/vg2/okonomi/rekrutteringsprosesser"
      learningOutcomes={[
        'Du kan beskrive rekrutteringshjulets faser fra jobbanalyse til onboarding',
        'Du forstår hva arbeidsmiljøloven sier om prøvetid og saklig oppsigelsesgrunn',
        'Du kan forklare hva SSR-bedrifter vektlegger i utvelgelse av kandidater',
      ]}
    />
  )
}
