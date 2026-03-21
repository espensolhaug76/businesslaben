import LearningComplete from '../shared/LearningComplete'

export default function ProduktBehovComplete() {
  return (
    <LearningComplete
      moduleTitle="Produkt og behov"
      moduleIcon="🛍️"
      retryRoute="/learning/mfi/produkt-behov"
      learningOutcomes={[
        'Du kjenner Maslows behovspyramide og kan knytte produkter til behovsnivåer',
        'Du forstår forskjellen på reelle og skapte behov',
        'Du kan beskrive et produkt på tre nivåer (kjernenytte, faktisk, utvidet)',
      ]}
    />
  )
}
