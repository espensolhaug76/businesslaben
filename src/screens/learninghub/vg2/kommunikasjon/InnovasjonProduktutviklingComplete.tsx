import LearningComplete from '../../shared/LearningComplete'

export default function InnovasjonProduktutviklingComplete() {
  return (
    <LearningComplete
      moduleTitle="Innovasjon og produktutvikling"
      moduleIcon="💡"
      retryRoute="/learning/vg2/kommunikasjon/innovasjon-produktutvikling"
      learningOutcomes={[
        'Du kan definere innovasjon og skille mellom inkrementell og radikal innovasjon',
        'Du kan beskrive produktutviklingsprosessens faser og forklare verdien av tidlig testing',
        'Du forstår at innovasjon må balansere lønnsomhet, klima og etikk',
      ]}
    />
  )
}
