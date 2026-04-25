import LearningComplete from '../../shared/LearningComplete'

export default function ReiselivsproduktComplete() {
  return (
    <LearningComplete
      moduleTitle="Helhetlige reiselivsprodukter"
      moduleIcon="✈️"
      retryRoute="/learning/vg2/kommunikasjon/reiselivsprodukt"
      learningOutcomes={[
        'Du kan sette pris på en reiselivspakke med riktig margin',
        'Du forstår pakkereiseloven og arrangøransvaret',
        'Du kjenner de 5 hovedelementene i et reiselivsprodukt',
      ]}
    />
  )
}
