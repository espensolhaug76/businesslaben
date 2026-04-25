import LearningComplete from '../shared/LearningComplete'

export default function VisjonOgMalComplete() {
  return (
    <LearningComplete
      moduleTitle="Visjon, mål og overordnede strategier"
      moduleIcon="🌟"
      retryRoute="/learning/ml2/visjon-og-mal"
      learningOutcomes={[
        'Du forstår at forretningsidé må svare på hva, for hvem, hvordan, hvorfor oss',
'Du kan formulere SMART-mål og bygge målhierarki fra visjon til handling',
'Du kjenner Ansoffs vekstmatrise og Porters 3 generiske konkurransestrategier',
'Du behersker GAP-analyse som verktøy for å konkretisere innsats',
'Du forstår at verdier vises i handling, ikke ord — og at 70 % av strategier feiler på implementering',
      ]}
    />
  )
}
