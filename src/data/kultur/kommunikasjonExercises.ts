import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const KOMMUNIKASJON_EXERCISES: QuizExercise[] = [
  {
    id: 'komm-01',
    icon: '📞',
    title: 'Telefon: Utålmodig kunde',
    context:
      'Du jobber i kundeservice hos Elkjøp. Telefonen ringer og du svarer — kunden er tydelig irritert fra første sekund.',
    question:
      'Kunde sier: "Jeg har ventet 20 minutter i kø! Det er helt uakseptabelt!" Hva er det beste svaret?',
    choices: [
      {
        id: 'a',
        label:
          '"Det er ikke vi som bestemmer køtiden — det er faktisk veldig mange som ringer akkurat nå."',
        isCorrect: false,
        feedback:
          'Feil. Dette er defensivt og skyver ansvaret over på kunden. Det gjør situasjonen verre, ikke bedre.',
      },
      {
        id: 'b',
        label:
          '"Jeg beklager ventetiden — det var ikke greit. La oss komme i gang med en gang. Hva kan jeg hjelpe deg med?"',
        isCorrect: true,
        feedback:
          'Riktig! Du viser empati, tar ansvar og går raskt over til handling. Kunden føler seg hørt og sett — og dere kan komme videre.',
      },
      {
        id: 'c',
        label: '"20 minutter? Det er faktisk ganske normalt for oss på fredager."',
        isCorrect: false,
        feedback:
          'Feil. Å normalisere ventetiden uten å beklage validerer ikke kundens frustrasjon. Det virker likegyldig.',
      },
      {
        id: 'd',
        label: '"Hva kan jeg hjelpe deg med?" (hopper rett over ventetiden)',
        isCorrect: false,
        feedback:
          'Feil. Å ignorere frustrasjon og gå rett på sak uten å anerkjenne opplevelsen gjør at kunden føler seg avvist.',
      },
    ],
    espenTip:
      '⚠️ Tone of voice er like viktig som innholdet — kunden husker HVORDAN du sa det!',
  },
  {
    id: 'komm-02',
    icon: '✉️',
    title: 'E-post: Klage fra kunde',
    context:
      'Du er ansatt i kundeservice hos Normal og har mottatt en klage-e-post. Kunden er misfornøyd med at en krem de bestilte var utgått på dato.',
    question: 'Hvilket e-postsvar er det beste?',
    choices: [
      {
        id: 'a',
        label:
          'Emne: "Re: Din henvendelse om krem" | "Hei, send produktet i retur så refunderer vi."',
        isCorrect: false,
        feedback:
          'Mangelfullt. Ingen personlig hilsen, ingen unnskyldning og ingen konkret tidsramme. Kunden sitter igjen med usikkerhet.',
      },
      {
        id: 'b',
        label:
          'Emne: "Svar på din klage" | "Vi beklager feilen. Vennligst besøk nærmeste butikk for videre hjelp."',
        isCorrect: false,
        feedback:
          'Feil. Å sende kunden videre uten å løse problemet selv er dårlig service. Kunden tok kontakt digitalt — da bør løsningen også skje digitalt.',
      },
      {
        id: 'c',
        label:
          'Emne: "Re: Din henvendelse — vi hjelper deg" | Personlig hilsen med kundens navn, oppriktig beklagelse, konkret løsning (refusjon eller nytt produkt) innen 48 timer.',
        isCorrect: true,
        feedback:
          'Riktig! En god emnejlinje, personlig tone, tydelig beklagelse og konkret handlingsplan skaper tillit og viser profesjonalitet.',
      },
      {
        id: 'd',
        label:
          'Emne: "VIKTIG: Klage mottatt" | Lang forklaring om hvordan dette sjelden skjer og at kvalitetskontrollen normalt er god.',
        isCorrect: false,
        feedback:
          'Feil. Å forsvare seg og forklare internt kvalitetsarbeid er ikke det kunden trenger. Fokus skal være på løsning, ikke bortforklaring.',
      },
    ],
    espenTip:
      '⚠️ Tone of voice er like viktig som innholdet — kunden husker HVORDAN du sa det!',
  },
  {
    id: 'komm-03',
    icon: '💬',
    title: 'Chat: Hastehenvendelse',
    context:
      'Du jobber i chatten til Finn.no sin kundeservice. En melding popper opp i køen din.',
    question: 'Kunde skriver: "hei, trenger hjelp asap pls". Hva svarer du?',
    choices: [
      {
        id: 'a',
        label:
          '"Hei! Takk for at du tar kontakt. For at vi skal kunne hjelpe deg best mulig ber vi deg om å beskrive henvendelsen din så detaljert som mulig, gjerne med saksnummer dersom du har det."',
        isCorrect: false,
        feedback:
          'For tungt og formelt. I chat forventer kunden rask og lettlest kommunikasjon — ikke en wall of text.',
      },
      {
        id: 'b',
        label: '"Hei! Hva er problemet?" (kort og direkte)',
        isCorrect: false,
        feedback:
          'Bedre, men litt knapt. Kunden skrev at det haster — det bør anerkjennes. Svaret mangler varme og handling.',
      },
      {
        id: 'c',
        label:
          '"Hei og velkommen til chatten vår! Jeg er her for å hjelpe deg. Hva trenger du hjelp med i dag? 😊"',
        isCorrect: false,
        feedback:
          'Vennlig, men for langt og rituelt til en hastehenvendelse. Kunden har allerede sagt at det haster — svar kjapt.',
      },
      {
        id: 'd',
        label:
          '"Hei! Jeg hjelper deg nå. Hva trenger du hjelp med?"',
        isCorrect: true,
        feedback:
          'Riktig! Raskt, vennlig og handlingsorientert. Kunden ser at du tar det på alvor uten unødvendig prating. Perfekt for chat-format.',
      },
    ],
    espenTip:
      '⚠️ Tone of voice er like viktig som innholdet — kunden husker HVORDAN du sa det!',
  },
  {
    id: 'komm-04',
    icon: '🤝',
    title: 'Ansikt til ansikt: Frustrert kunde',
    context:
      'Du jobber i skranken på et reisebyrå. En kunde kommer bort til deg, gestikulerer mye og snakker høyt om at ferien deres ble ødelagt.',
    question:
      'Kunden er tydelig frustrert og gestikulerer mye. Hva er viktigst å gjøre?',
    choices: [
      {
        id: 'a',
        label:
          'Oppretthold rolig øyekontakt, senk stemmen din og hold et åpent kroppsspråk — ikke-verbal kommunikasjon smitter over på kunden.',
        isCorrect: true,
        feedback:
          'Riktig! Ikke-verbal kommunikasjon er minst like viktig som ord. Et rolig kroppsspråk og lav stemme signaliserer kontroll og empati — og kunden roer seg gjerne ned i takt med deg.',
      },
      {
        id: 'b',
        label:
          'Snakk tydelig og bestemt med høy stemme slik at kunden hører at du mener det du sier.',
        isCorrect: false,
        feedback:
          'Feil. Å heve stemmen eskalerer situasjonen. Kunden blir mer opprørt, ikke roligere.',
      },
      {
        id: 'c',
        label:
          'Unngå øyekontakt for ikke å provosere kunden ytterligere — gi dem plass.',
        isCorrect: false,
        feedback:
          'Feil. Å unngå øyekontakt kan oppleves som uinteressert eller uærlig. Rolig, jevn øyekontakt viser at du er til stede og lytter.',
      },
      {
        id: 'd',
        label:
          'Gå et skritt tilbake og kryss armene for å vise at du holder deg profesjonell.',
        isCorrect: false,
        feedback:
          'Feil. Kryssede armer er et lukket kroppsspråk som signaliserer forsvar eller avvisning — stikk motsatt av hva du vil formidle.',
      },
    ],
    espenTip:
      '⚠️ Tone of voice er like viktig som innholdet — kunden husker HVORDAN du sa det!',
  },
  {
    id: 'komm-05',
    icon: '⭐',
    title: 'Sosiale medier: Negativ Google-anmeldelse',
    context:
      'Du administrerer Google-profilen til en frisørsalong. Dere får en ny anmeldelse: 2 stjerner. Kunden skriver at de ventet lenge og at resultatet var skuffende.',
    question: 'Hva er den beste responsen på anmeldelsen?',
    choices: [
      {
        id: 'a',
        label:
          'Ikke svar — alle kan se at anmeldelsen er urettferdig, og et svar kan bare gjøre det verre.',
        isCorrect: false,
        feedback:
          'Feil. Taushet tolkes som likegyldighet. Andre potensielle kunder leser anmeldelsene og legger merke til om bedriften bryr seg nok til å svare.',
      },
      {
        id: 'b',
        label:
          'Svar offentlig med en beklagelse for opplevelsen, og tilby å løse saken privat via telefon eller e-post.',
        isCorrect: true,
        feedback:
          'Riktig! Et offentlig, profesjonelt svar viser alle andre at dere tar tilbakemeldinger på alvor. Ved å invitere til privat dialog unngår dere å diskutere detaljer offentlig — og kunden får en reell sjanse til å bli fornøyd.',
      },
      {
        id: 'c',
        label:
          'Rapporter anmeldelsen til Google som urettferdig — dere var ikke skyldige i forsinkelsen.',
        isCorrect: false,
        feedback:
          'Feil. Google fjerner svært sjelden anmeldelser. Å prøve å slette i stedet for å håndtere ser dårlig ut og løser ingenting.',
      },
      {
        id: 'd',
        label:
          'Svar og forklar at kunden misforsto situasjonen og at dere faktisk ikke hadde noen forsinkelse den dagen.',
        isCorrect: false,
        feedback:
          'Feil. Å argumentere offentlig mot en kunde — selv om du har rett — fremstår som defensivt og uprofesjonelt for alle som leser.',
      },
    ],
    espenTip:
      '⚠️ Tone of voice er like viktig som innholdet — kunden husker HVORDAN du sa det!',
  },
]
