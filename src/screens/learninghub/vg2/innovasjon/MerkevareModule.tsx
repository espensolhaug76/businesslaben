import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '⭐',
    title: 'Hva er en merkevare og hvorfor er den verdifull?',
    quote: 'En merkevare er et løfte — og verdien er proporsjonal med troen folk har på at løftet holdes.',
    content: 'Merkevareverdien (brand equity) er den ekstra betalingsvilligheten kunder har fordi produktet bærer et bestemt navn. Freia Melkesjokolade selger ikke bare kakao og sukker — de selger "Et lite stykke Norge", et løfte om kvalitet og trygghet bygget opp gjennom 130 år.',
    subpoints: [
      'BRAND EQUITY: Den ekstra verdien merkevaren tilfører utover funksjonelle egenskaper',
      'MERKEVARETILLIT: Bygges over tid gjennom konsistent kvalitet og oppfylte løfter',
      'IMMATERIELL VERDI: For Coca-Cola, TINE og Freia utgjør merkevaren en stor del av selskapets totale verdi',
    ],
    practical: 'Velg to konkurrerende produkter (f.eks. Freia og Nidar). Hva er prisdifferansen, og hva er årsaken til at kunder velger det dyrere alternativet?',
    glossaryTerm: 'Merkevare (Brand)',
    exercises: [
      {
        id: 'mv-1-1',
        question: 'Hva er "brand equity"?',
        choices: [
          { id: 'a', text: 'Det visuelle designet til en merkevare' },
          { id: 'b', text: 'Den ekstra verdien og betalingsvilligheten kunder har fordi produktet bærer et bestemt navn' },
          { id: 'c', text: 'Markedsverdien til selskapet på børsen' },
          { id: 'd', text: 'Antall kunder som kjenner til merkevaren' },
        ],
        correctId: 'b',
        explanation: 'Brand equity er den ekstra verdien en merkevare tilfører utover produktets funksjonelle egenskaper — målbar som prispremium og kundelojalitet.',
      },
      {
        id: 'mv-1-2',
        question: 'Freia Melkesjokolade selger ofte for 20–30% mer enn konkurrenter. Hva er den viktigste forklaringen?',
        choices: [
          { id: 'a', text: 'Freia bruker dyrere råvarer' },
          { id: 'b', text: 'Sterk merkevare bygget over 130 år gir høyere betalingsvilje' },
          { id: 'c', text: 'Det er ingen reelle alternativer' },
          { id: 'd', text: 'Freia har bedre distribusjon' },
        ],
        correctId: 'b',
        explanation: 'Freia selger ikke bare sjokolade — de selger "Et lite stykke Norge". 130 års tilstedeværelse har bygget sterk emosjonell merkevaretillit som rettferdiggjør prispremium.',
      },
      {
        id: 'mv-1-3',
        question: 'Hva skjer med merkevaretillit ved en skandale?',
        choices: [
          { id: 'a', text: 'Det tar tid, men tillit bygges aldri ned raskt' },
          { id: 'b', text: 'Tillit bygges over tid men kan rives ned på dager' },
          { id: 'c', text: 'Skandaler påvirker ikke store merkevarer' },
          { id: 'd', text: 'Tillit er uavhengig av bedriftens handlinger' },
        ],
        correctId: 'b',
        explanation: 'Merkevaretillit er asymmetrisk: det tar år å bygge, men kan rives ned på dager gjennom en skandale eller tillitsbrudd.',
      },
      {
        id: 'mv-1-4',
        question: 'Hvis Coca-Cola ble utslettet over natten, hva ville det vanskeligste være å gjenskape?',
        choices: [
          { id: 'a', text: 'Fabrikker og produksjonsutstyr' },
          { id: 'b', text: 'Merkevaren — estimert til 80–100 mrd dollar' },
          { id: 'c', text: 'Resepten på drikken' },
          { id: 'd', text: 'Distribusjonsnettverket' },
        ],
        correctId: 'b',
        explanation: 'Fabrikker kan gjenoppbygges raskt av nye aktører. Coca-Cola-merkevaren, estimert til 80–100 milliarder dollar, ville ta generasjoner å erstatte.',
      },
      {
        id: 'mv-1-5',
        question: 'Hva er den viktigste funksjonen til en sterk merkevare for bedriften?',
        choices: [
          { id: 'a', text: 'Å spare kostnader på produksjon' },
          { id: 'b', text: 'Å rettferdiggjøre høyere priser, bygge lojalitet og overleve kriser bedre' },
          { id: 'c', text: 'Å unngå regulering og skatter' },
          { id: 'd', text: 'Å gjøre produktene billigst mulig' },
        ],
        correctId: 'b',
        explanation: 'Sterke merkevarer lar bedrifter ta høyere priser, rekruttere bedre folk og overleve kriser som ville knust et ukjent produkt.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🪞',
    title: 'Merkevarens identitet vs image',
    quote: 'Identitet er hva du vil at folk skal tenke om deg. Image er hva de faktisk tenker. Gapet mellom dem er jobbeskrivelsen din.',
    content: 'Merkeidentiteten er den bevisste strategiske posisjonen bedriften ønsker å innta. Brand image er hva kundene faktisk opplever og husker — og det avviker nesten alltid noe fra den tiltenkte identiteten.',
    subpoints: [
      'MERKEIDENTITET: Bevisst definert — hva merkevaren vil stå for og hvem den henvender seg til',
      'BRAND IMAGE: Kundenes faktiske oppfatning fra produktopplevelser, kommunikasjon og jungeltelegrafen',
      'GAPANALYSE: Kundeundersøkelser avdekker gapet og peker på hvilken kommunikasjon som trenger justering',
    ],
    practical: 'Velg en norsk merkevare du kjenner. Beskriv den intenderte identiteten og hva du faktisk forbinder med den. Er det gap?',
    exercises: [
      {
        id: 'mv-2-1',
        question: 'Hva er forskjellen på merkeidentitet og brand image?',
        choices: [
          { id: 'a', text: 'Merkeidentitet er det synlige designet; image er det verbale uttrykket' },
          { id: 'b', text: 'Merkeidentitet er hva bedriften vil kommunisere; image er kundenes faktiske oppfatning' },
          { id: 'c', text: 'De er det samme — to ord for samme konsept' },
          { id: 'd', text: 'Image er viktigere enn identitet' },
        ],
        correctId: 'b',
        explanation: 'Merkeidentitet er strategisk og bedriftsstyrt; brand image er kundenes faktiske oppfatning basert på alle erfaringer de har med merkevaren.',
      },
      {
        id: 'mv-2-2',
        question: 'Helly Hansen ønsker å posisjonere seg som et premium outdoor-merke med norsk autentisitet. Hva er dette?',
        choices: [
          { id: 'a', text: 'Brand image' },
          { id: 'b', text: 'Merkeidentitet' },
          { id: 'c', text: 'Brand equity' },
          { id: 'd', text: 'Merkevaretillit' },
        ],
        correctId: 'b',
        explanation: 'Den bevisste og strategiske posisjonen Helly Hansen ønsker å innta er merkeidentiteten — hva de vil at kundene skal tenke.',
      },
      {
        id: 'mv-2-3',
        question: 'Hva er en gapanalyse i merkevarekontekst?',
        choices: [
          { id: 'a', text: 'En analyse av hvilke markeder merkevaren ikke er i' },
          { id: 'b', text: 'En sammenligning av intendert identitet og faktisk kundeopppfatning (image)' },
          { id: 'c', text: 'En vurdering av konkurrentenes merkevarer' },
          { id: 'd', text: 'En analyse av prisdifferansen mellom produkter' },
        ],
        correctId: 'b',
        explanation: 'Gapanalyse sammenligner hva bedriften ønsker å kommunisere (identitet) med hva kundene faktisk opplever (image), og peker på hva som bør justeres.',
      },
      {
        id: 'mv-2-4',
        question: 'Et selskap kommuniserer "premium kvalitet" men kundene opplever middelmådig service. Hva er problemet?',
        choices: [
          { id: 'a', text: 'Merkevaren er for dyr' },
          { id: 'b', text: 'Gap mellom intendert identitet og faktisk brand image' },
          { id: 'c', text: 'Produktet er ikke godt nok' },
          { id: 'd', text: 'De har feil målgruppe' },
        ],
        correctId: 'b',
        explanation: 'Når kundenes faktiske opplevelse ikke matcher det kommuniserte løftet, oppstår et gap mellom identitet og image — som svekker merkevaretilliten.',
      },
      {
        id: 'mv-2-5',
        question: 'Moods of Norway valgte en leken og ironisk norsk identitet. Hva er hensikten?',
        choices: [
          { id: 'a', text: 'Å spare kostnader på reklame' },
          { id: 'b', text: 'Å differensiere seg tydelig fra den mer alvorlige norske moteindustrien' },
          { id: 'c', text: 'Å tiltrekke seg eldre kunder' },
          { id: 'd', text: 'Fordi ironisk markedsføring er billigst' },
        ],
        correctId: 'b',
        explanation: 'Bevisst valg av en annerledes identitet skaper differensiering — Moods of Norway skiller seg ut fra alvorlig norsk mote og skapte et unikt image.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🌿',
    title: 'Merkevareutvidelse og merkevareverdier',
    quote: 'En merkevare er sterk nok til å strekkes — men strekker du den for langt, sprekker den.',
    content: 'Merkevareutvidelse er strategien med å bruke et etablert merkenavn på nye produktkategorier. Suksessen avhenger av hvor nær utvidelsen er merkevarens kjernepersonlighet.',
    subpoints: [
      'LINJEUTVIDELSE: Nye varianter innen samme kategori (Freia Kvikk Lunsj Mørk) — lavest risiko',
      'KATEGORIUTVIDELSE: Bruk av merkenavnet i ny kategori (TINE proteinbar) — høyere risiko',
      'MERKEFORTYNNING: Utvidelse som svekker kjerneassosiasjonen og gjør merkevaren utydelig',
    ],
    practical: 'Diskuter: Bør Bergans lansere Bergans-kaffebønner? Ville det styrket eller svekket merkevaren?',
    glossaryTerm: 'Differensiering',
    exercises: [
      {
        id: 'mv-3-1',
        question: 'Freia lanserer en ny variant "Freia Kvikk Lunsj Mørk". Hva er dette?',
        choices: [
          { id: 'a', text: 'Kategoriutvidelse' },
          { id: 'b', text: 'Linjeutvidelse' },
          { id: 'c', text: 'Merkefortynning' },
          { id: 'd', text: 'Repositionering' },
        ],
        correctId: 'b',
        explanation: 'En ny variant innen samme produktkategori (sjokolade) er linjeutvidelse — lavest risiko fordi den er nær kjernen.',
      },
      {
        id: 'mv-3-2',
        question: 'Harley-Davidson lanserte parfyme og mislyktes. Hva var årsaken?',
        choices: [
          { id: 'a', text: 'Parfymen var av dårlig kvalitet' },
          { id: 'b', text: 'Parfyme passet ikke Harley-Davidsons kjernepersonlighet om motorolje, frihet og maskulinitet' },
          { id: 'c', text: 'Parfyme er et for lite marked' },
          { id: 'd', text: 'De markedsførte ikke parfymen godt nok' },
        ],
        correctId: 'b',
        explanation: 'Harley-Davidson er assosiiert med motorolje og frihet — parfyme brøt med merkevaren DNA og skapte kognitiv dissonans hos kundene.',
      },
      {
        id: 'mv-3-3',
        question: 'Hva er merkefortynning?',
        choices: [
          { id: 'a', text: 'At merkevaren blir for sterk' },
          { id: 'b', text: 'Utvidelse som svekker kjerneassosiasjonen og gjør merkevaren utydelig' },
          { id: 'c', text: 'At merkevaren selges til en konkurrent' },
          { id: 'd', text: 'At merkevaren lanseres i nye markeder' },
        ],
        correctId: 'b',
        explanation: 'Merkefortynning oppstår når utvidelser svekker det unike og distinkte ved merkevaren, noe som gjør den utydelig og vanskelig å erstatte.',
      },
      {
        id: 'mv-3-4',
        question: 'TINE lanserer proteinbarer. Hva er dette et eksempel på?',
        choices: [
          { id: 'a', text: 'Linjeutvidelse' },
          { id: 'b', text: 'Kategoriutvidelse' },
          { id: 'c', text: 'Merkefortynning' },
          { id: 'd', text: 'Repositionering' },
        ],
        correctId: 'b',
        explanation: 'TINE bruker merkevaren i en ny kategori (proteiner) som er nærliggende til kjernen (meieriprodukter og helse) — kategoriutvidelse.',
      },
      {
        id: 'mv-3-5',
        question: 'Hva er den viktigste regelen for vellykket merkevareutvidelse?',
        choices: [
          { id: 'a', text: 'Jo mer ulik kategorien er, jo bedre — for å nå nye markeder' },
          { id: 'b', text: 'Jo nærmere utvidelsen er merkevarens kjernepersonlighet, jo større er sjansen for suksess' },
          { id: 'c', text: 'Alle utvidelser er like risikable' },
          { id: 'd', text: 'Pris er den viktigste faktoren' },
        ],
        correctId: 'b',
        explanation: 'Merkevareutvidelse lykkes best når utvidelsen styrker og passer med merkevaren DNA — jo nærmere kjernen, jo lavere risiko.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '📖',
    title: 'Storytelling og autentisitet',
    quote: 'Folk glemmer fakta. Folk husker historier. Merkevarer som forteller ekte historier, eier kundenes hjerte.',
    content: 'Nevrobiologisk forskning viser at historier aktiverer langt flere deler av hjernen enn fakta og tall. Stormberg er Norges beste eksempel: startet i kjelleren, ble møtt med skepsis, og ble Norges mest beundrede bærekraftige merkevare.',
    subpoints: [
      'AUTENTISITET: Historien må være sann og dokumenterbar — oppfunnet opprinnelsesmyte avsløres raskt',
      'SPENNINGSBUE: De beste historiene har utfordring, kamp og transformasjon',
      'VERDIER SOM HANDLING: Stormberg ansetter faktisk langtidsledige og publiserer tallene',
    ],
    practical: 'Finn en liten norsk merkevare du liker. Skriv historien bak den i fem setninger. Hva gjør historien troverdig?',
    exercises: [
      {
        id: 'mv-4-1',
        question: 'Hva viser nevrobiologisk forskning om historier vs fakta i markedsføring?',
        choices: [
          { id: 'a', text: 'Fakta er mer overbevisende enn historier' },
          { id: 'b', text: 'Historier aktiverer flere deler av hjernen og huskes og deles lettere' },
          { id: 'c', text: 'Det er ingen forskjell mellom historier og fakta' },
          { id: 'd', text: 'Fakta gir høyere tillit' },
        ],
        correctId: 'b',
        explanation: 'Historier aktiverer langt flere deler av hjernen enn tørre fakta og tall — og huskes og deles langt lettere.',
      },
      {
        id: 'mv-4-2',
        question: 'Hva gjør Stormbergs merkevarehistorie til en suksess?',
        choices: [
          { id: 'a', text: 'De har det største markedsbudsjettet' },
          { id: 'b', text: 'Autentisk gründerhistorie med dokumenterbare verdier om inkludering og bærekraft' },
          { id: 'c', text: 'De selger billigst' },
          { id: 'd', text: 'De har kjente ambassadører' },
        ],
        correctId: 'b',
        explanation: 'Stormbergs styrke er autentisitet: startet i kjelleren, ansetter faktisk langtidsledige og publiserer tallene. Det er ikke spin — det er genuin og dokumenterbar history.',
      },
      {
        id: 'mv-4-3',
        question: 'Hva er den avgjørende forskjellen mellom god og dårlig merkevare-storytelling?',
        choices: [
          { id: 'a', text: 'Budsjettets størrelse' },
          { id: 'b', text: 'Autentisitet — ekte historier som kan dokumenteres' },
          { id: 'c', text: 'Bruk av kjente influencere' },
          { id: 'd', text: 'Lengden på historien' },
        ],
        correctId: 'b',
        explanation: 'Kunder i dag er eksperter på å skille mellom konstruerte markedsnarrativ og ekte historier — og avstraffer selskaper som lyver.',
      },
      {
        id: 'mv-4-4',
        question: 'Hva menes med "verdier som handling" i merkevarebygging?',
        choices: [
          { id: 'a', text: 'Å ha verdier skrevet ned i årsrapporten' },
          { id: 'b', text: 'Å faktisk handle i tråd med verdiene og dokumentere det' },
          { id: 'c', text: 'Å markedsføre verdiene i reklame' },
          { id: 'd', text: 'Å ha verdier som er populære i markedet' },
        ],
        correctId: 'b',
        explanation: 'Stormberg sier ikke bare at de er inkluderende — de ansetter faktisk langtidsledige og publiserer tallene. Handling er langt mer troverdig enn ord.',
      },
      {
        id: 'mv-4-5',
        question: 'Bergans bruker sin history siden 1908 aktivt i markedsføringen. Hva oppnår de?',
        choices: [
          { id: 'a', text: 'De unngår å måtte fornye sortimentet' },
          { id: 'b', text: 'De rettferdiggjør prispremium gjennom autentisitet og norsk friluftslivs-arv' },
          { id: 'c', text: 'De slipper å konkurrere med internasjonale aktører' },
          { id: 'd', text: 'De kan bruke billigere råvarer' },
        ],
        correctId: 'b',
        explanation: 'Bergans bruker 115 år med norsk friluftslivshistorie til å skape en autentisk fortelling som berettiger prispremium i et marked med sterke internasjonale konkurrenter.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📱',
    title: 'Merkevarebygging i sosiale medier',
    quote: 'Sosiale medier gir merkevaren en stemme — men en stemme uten karakter er bare støy.',
    content: 'Merkevarebygging i digitale kanaler krever konsistens på tvers av alle flater. Norske nisjemerker som Oleana og Holzweiler har lyktes med autentisk historiefortelling og tydelig estetikk på sosiale medier.',
    subpoints: [
      'KONSISTENS: Brandguide med tone-of-voice, fargepalett og verdiformidling for alle kanaler',
      'COMMUNITY: Et engasjert fellesskap er det beste vernet mot kriser og negative innlegg',
      'KRISEHÅNDTERING: Ha plan klar — hvem svarer, hva sies, og når. De første 24 timer er avgjørende',
    ],
    practical: 'Analyser Instagram-profilen til Oleana eller Holzweiler: Hva er tonen? Hvilke verdier kommuniseres? Hva er konsekvent over de siste 12 innleggene?',
    exercises: [
      {
        id: 'mv-5-1',
        question: 'Hva er viktigst for merkevarebygging på sosiale medier?',
        choices: [
          { id: 'a', text: 'Å poste så ofte som mulig' },
          { id: 'b', text: 'Konsistens i tone, verdier og visuell profil på tvers av alle kanaler' },
          { id: 'c', text: 'Å bruke alle tilgjengelige plattformer' },
          { id: 'd', text: 'Å ha flest mulig følgere' },
        ],
        correctId: 'b',
        explanation: 'Konsistens er nøkkelen — merkevaren skal snakke med én stemme og ett visuelt uttrykk uansett om det er Instagram, TikTok eller LinkedIn.',
      },
      {
        id: 'mv-5-2',
        question: 'Hva er et "community" i merkevare-sammenheng?',
        choices: [
          { id: 'a', text: 'Alle som bor i nærheten av bedriften' },
          { id: 'b', text: 'Et engasjert fellesskap av ekte fans som identifiserer seg med merkevarens verdier' },
          { id: 'c', text: 'Bedriftens ansatte' },
          { id: 'd', text: 'Kunder som handler mer enn én gang' },
        ],
        correctId: 'b',
        explanation: 'Et sterkt community av ekte fans er det beste vernet mot kriser — de forsvarer merkevaren når den angripes og sprer positiv word-of-mouth.',
      },
      {
        id: 'mv-5-3',
        question: 'En bedrift får et viralt negativt innlegg om sine produkter. Hva er det viktigste de gjør de første 24 timene?',
        choices: [
          { id: 'a', text: 'Venter og håper det går over' },
          { id: 'b', text: 'Responderer raskt, ærlig og empatisk ifølge krisekommunikasjonsplanen' },
          { id: 'c', text: 'Sletter alle sosiale mediekontoer' },
          { id: 'd', text: 'Kontatker en PR-byrå og venter på råd' },
        ],
        correctId: 'b',
        explanation: 'De første 24 timene er avgjørende i krisehåndtering på sosiale medier. Rask, ærlig og empatisk respons begrenser skaden dramatisk.',
      },
      {
        id: 'mv-5-4',
        question: 'Oleana viser produksjonsprosessen og garnvalg i sine innlegg. Hvilken merkevarestrategi er dette?',
        choices: [
          { id: 'a', text: 'Produktreklame' },
          { id: 'b', text: 'Autentisk storytelling som kommuniserer håndverk og unik verdi' },
          { id: 'c', text: 'Pris-markedsføring' },
          { id: 'd', text: 'Konkurrentanalyse' },
        ],
        correctId: 'b',
        explanation: 'Oleanas strategi er å vise håndverket og verdien bak produktet — autentisk storytelling som rettferdiggjør premium-posisjon.',
      },
      {
        id: 'mv-5-5',
        question: 'Hva er "kansellering" som risiko for merkevarer på sosiale medier?',
        choices: [
          { id: 'a', text: 'At algoritmen slutter å vise innleggene' },
          { id: 'b', text: 'At kunder boikotter og kritiserer merkevaren offentlig, ofte etter ett kontroversielt innlegg' },
          { id: 'c', text: 'At konkurrenter kopierer merkevaren' },
          { id: 'd', text: 'At innhold slettes av plattformen' },
        ],
        correctId: 'b',
        explanation: 'Kansellering er når kunder kollektivt boikotter og kritiserer en merkevare offentlig. Det kan ta år å komme seg fra, og understreker viktigheten av sterk community og kriseberedskap.',
      },
    ],
  },
]

export default function MerkevareModule() {
  return (
    <DrawerModule
      moduleCode="IMF-VG2-1"
      moduleTitle="Merkevarestrategi"
      moduleIcon="⭐"
      storageKey="learning-vg2-merkevare"
      completeRoute="/learning/vg2/innovasjon/merkevare/complete"
      phases={phases}
      intro="En merkevare er langt mer enn et logo — det er summen av alle erfaringer, følelser og forventninger knyttet til et navn. Sterke merkevarer lar bedrifter ta høyere priser og overleve kriser som ville knust et ukjent produkt."
      vissteduAt="Freia Melkesjokolade har vært på det norske markedet siden 1906. Slagordet «Et lite stykke Norge» ble introdusert i 1986 og er ett av de mest gjenkjennelige i landet."
      espenSier="Mange gründere investerer alt i produktet og ingenting i merkevaren — og lurer på hvorfor de taper mot konkurrenter med dårligere produkter men sterkere historier."
      presentationLink={{ route: '/learning/presentations/forretningsidee', description: 'Forretningsidé — en visuell gjennomgang av merkevarebygging og USP' }}
    />
  )
}
