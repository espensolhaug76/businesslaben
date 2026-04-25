import LearningComplete from '../../shared/LearningComplete'

export default function BrannvernComplete() {
  return (
    <LearningComplete
      moduleTitle="Brannvern og brannøving"
      moduleIcon="🔥"
      retryRoute="/learning/vg2/hms/brannvern"
      learningOutcomes={[
        'Du kan forklare branntrekanten og velge riktig slokkemiddel for ulike branntyper',
        'Du kjenner handlingsregelen Varsle–Redde–Slokke og kan gjennomføre en evakuering',
        'Du forstår det juridiske ansvaret for brannvern og kravene i Brann- og eksplosjonsvernloven',
      ]}
    />
  )
}
