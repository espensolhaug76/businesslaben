import LearningComplete from '../shared/LearningComplete'

export default function MarkedsanalysePosisjoneringComplete() {
  return (
    <LearningComplete
      moduleTitle="Markedsanalyse og posisjonering"
      moduleIcon="🔍"
      retryRoute="/learning/ent2/markedsanalyse-posisjonering"
      learningOutcomes={[
        'Du forstår markedsanalyse som strukturert datainnsamling om marked, kunder, konkurrenter',
'Du behersker STP-modellen: Segmentering, Targeting, Posisjonering',
'Du kjenner differensieringsdimensjoner og hvordan posisjonering skjer i kundens hode',
'Du kan bygge personas og bruke dem på tvers av produktutvikling, salg og marketing',
'Du forstår markedstesting (MVP, A/B, smoke, concierge) før storskala lansering',
      ]}
    />
  )
}
