import LearningComplete from '../shared/LearningComplete'

export default function ForretningsutviklingSkaleringComplete() {
  return (
    <LearningComplete
      moduleTitle="Forretningsutvikling og skalering"
      moduleIcon="📈"
      retryRoute="/learning/ent2/forretningsutvikling-skalering"
      learningOutcomes={[
        'Du forstår at skalering krever PMF, repeterbar prosess og automatisering',
'Du behersker terminologien: PMF, CAC, LTV, runway, blitzscaling',
'Du kjenner finansieringsrunder fra seed til Series C med tilhørende milepæler',
'Du forstår strategiske valg ved internasjonalisering og markedsposisjon',
'Du ser compliance-utfordringene som følger med vekst',
      ]}
    />
  )
}
