import LearningComplete from '../../shared/LearningComplete'

export default function RegelverkServicebedrifterComplete() {
  return (
    <LearningComplete
      moduleTitle="Regelverk for servicebedrifter"
      moduleIcon="⚖️"
      retryRoute="/learning/vg2/okonomi/regelverk-servicebedrifter"
      learningOutcomes={[
        'Du kan forklare reklamasjonsretten (2 og 5 år) og riktig rekkefølge for tiltak',
        'Du forstår angrerettlovens 14-dagersfrist og de viktigste unntakene',
        'Du kan skille mellom garanti og reklamasjon, og mellom bytterett og lovfestede rettigheter',
      ]}
    />
  )
}
