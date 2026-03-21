import LearningComplete from '../../shared/LearningComplete'

export default function MarkedsundersokelseComplete() {
  return (
    <LearningComplete
      moduleTitle="Markedsundersøkelser"
      moduleIcon="🔎"
      retryRoute="/learning/vg2/innovasjon/markedsundersokelse"
      learningOutcomes={[
        'Du kan skille mellom primær- og sekundærdata',
        'Du kan beregne og tolke NPS-score',
        'Du forstår hva representativt utvalg betyr',
      ]}
    />
  )
}
