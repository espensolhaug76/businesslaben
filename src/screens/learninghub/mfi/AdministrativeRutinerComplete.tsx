import LearningComplete from '../shared/LearningComplete'

export default function AdministrativeRutinerComplete() {
  return (
    <LearningComplete
      moduleTitle="Administrative rutiner"
      moduleIcon="🗂️"
      retryRoute="/learning/mfi/administrative-rutiner"
      learningOutcomes={[
        'Du kan håndtere retur og reklamasjon korrekt',
        'Du kjenner reklamasjonsretten (2 år) og forbrukerkjøpsloven',
        'Du forstår verdien av dokumentasjon og rutiner',
      ]}
    />
  )
}
