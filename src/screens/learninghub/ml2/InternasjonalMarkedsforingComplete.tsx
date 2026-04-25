import LearningComplete from '../shared/LearningComplete'

export default function InternasjonalMarkedsforingComplete() {
  return (
    <LearningComplete
      moduleTitle="Markedsføring på internasjonale markeder"
      moduleIcon="🌍"
      retryRoute="/learning/ml2/internasjonal-markedsforing"
      learningOutcomes={[
        'Du forstår de 3 hovedgrunnene til internasjonalisering: vekst, skala, risikospredning',
'Du kan velge etableringsstrategi (eksport → datterselskap) basert på risiko og kontroll-behov',
'Du kjenner Hofstedes dimensjoner og hvorfor kulturell forståelse er strategisk',
'Du behersker glocal-strategien — global ramme + lokal tilpasning',
'Du kjenner Incoterms, EØS-effekt, og norske institusjoner som GIEK',
      ]}
    />
  )
}
