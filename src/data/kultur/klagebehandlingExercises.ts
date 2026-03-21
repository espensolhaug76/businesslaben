import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const KLAGEBEHANDLING_EXERCISES: QuizExercise[] = [
  {
    id: 'klage-01',
    icon: '👟',
    title: 'Feil størrelse levert',
    context:
      'Du jobber i kundeservice hos Zalando. En kunde ringer og forteller at de bestilte Nike-sko i størrelse 42, men fikk størrelse 40 levert.',
    question:
      'Kunden er skuffet og trenger skoene til helgen. Hva er den beste måten å håndtere klagen på?',
    choices: [
      {
        id: 'a',
        label:
          'Be kunden returnere feil par, vente på at returen registreres, og deretter sende riktig størrelse — vanlig prosedyre.',
        isCorrect: false,
        feedback:
          'Feil. Vanlig prosedyre er ikke god nok når det er bedriftens feil. Kunden må ikke tape tid på grunn av din feil.',
      },
      {
        id: 'b',
        label:
          'Beklage feilen, sende riktig størrelse med expressfrakt på bedriftens regning, og la kunden beholde det feilleverte paret eller returnere det for full refusjon.',
        isCorrect: true,
        feedback:
          'Riktig! Dette er god klagebehandling: du tar fullt ansvar, fikser problemet raskt og gir kunden valgfrihet. En slik opplevelse gjør at kunden kommer tilbake — og forteller det til andre.',
      },
      {
        id: 'c',
        label:
          'Beklage og tilby 10% rabatt på neste bestilling som kompensasjon — kunden kan beholde de feil skoene.',
        isCorrect: false,
        feedback:
          'Feil. Kunden vil ha riktige sko, ikke rabatt på noe de ikke har bestilt enda. Rabatten løser ikke det faktiske problemet.',
      },
      {
        id: 'd',
        label:
          'Forklare at feil størrelse ved levering skjer innimellom og at kunden må levere inn skoene i butikken for bytte.',
        isCorrect: false,
        feedback:
          'Feil. Å normalisere feilen og pålegge kunden merarbeid er stikk i strid med god klagebehandling. Det er Zalandos feil — ikke kundens problem å løse.',
      },
    ],
    espenTip:
      '⚠️ En klage er en gave — kunden gir deg sjansen til å rette opp. 70% av kunder som får god klagebehandling, kommer tilbake!',
  },
  {
    id: 'klage-02',
    icon: '🎁',
    title: 'Knust gave ved levering',
    context:
      'Du jobber i nettbutikken til Flying Tiger Copenhagen. En kunde ringer gråtkvalt — de bestilte en gave til datteren sin bursdagsfeiring i dag, og pakken ankom knust.',
    question:
      'Gaven var til en spesiell anledning og festen er i kveld. Hva gjør du?',
    choices: [
      {
        id: 'a',
        label:
          'Beklage og tilby refusjon — kunden kan bestille på nytt til neste gang.',
        isCorrect: false,
        feedback:
          'Feil. Refusjon løser ikke problemet for kunden i dag. Datteren fyller år nå — ikke neste uke. Løsningen mangler empati for situasjonens alvor.',
      },
      {
        id: 'b',
        label:
          'Be kunden ta bilder av skaden og sende inn reklamasjonsskjema, så behandles saken innen 5–10 virkedager.',
        isCorrect: false,
        feedback:
          'Feil. Byråkratisk og kaldt. I en situasjon med sterk emosjonell kontekst er dette det verste du kan gjøre. Kunden trenger handling, ikke skjemaer.',
      },
      {
        id: 'c',
        label:
          'Forklare at transportskader er fraktfirmaets ansvar og sende kunden videre til PostNord.',
        isCorrect: false,
        feedback:
          'Feil. Kunden bestilte fra Flying Tiger — ikke fra PostNord. Å sende kunden videre til en tredjepart er ansvarsfraskrivelse og dårlig service.',
      },
      {
        id: 'd',
        label:
          'Beklage oppriktig, sende nytt produkt med expressfrakt samme dag, og tilby en oppgradering eller ekstra gave siden det er en spesiell anledning.',
        isCorrect: true,
        feedback:
          'Riktig! Du viser ekte empati for situasjonen, handler raskt og går ett steg lenger enn forventet. Kunden vil huske dette — og fortelle det videre.',
      },
    ],
    espenTip:
      '⚠️ En klage er en gave — kunden gir deg sjansen til å rette opp. 70% av kunder som får god klagebehandling, kommer tilbake!',
  },
  {
    id: 'klage-03',
    icon: '🍽️',
    title: 'For lang ventetid på restaurant',
    context:
      'Du er restaurantsjef på Illegal Burger. Et par hadde bordreservasjon kl. 19:00, men fikk ikke sitte ned før 19:45 på grunn av en feil i bookingsystemet. Nå krever de kompensasjon.',
    question: 'Hvordan håndterer du situasjonen best?',
    choices: [
      {
        id: 'a',
        label:
          'Beklage oppriktig, forklare hva som gikk galt med bookingsystemet, og tilby gratis forrett eller dessert som en gest.',
        isCorrect: true,
        feedback:
          'Riktig! Du tar ansvar, er transparent om årsaken og gir en konkret og naturlig kompensasjon i konteksten av et restaurantbesøk. Gjestene føler seg sett og ivaretatt.',
      },
      {
        id: 'b',
        label:
          'Forklare at 45 minutter ikke er uvanlig og at de burde ha forventet litt ventetid på en fredag kveld.',
        isCorrect: false,
        feedback:
          'Feil. Dette ugyldiggjør kundens frustrasjon fullstendig. De hadde en bekreftet reservasjon — ventetid var ikke forventet eller akseptabelt.',
      },
      {
        id: 'c',
        label:
          'Tilby 50% rabatt på hele regningen for å gjøre dem fornøyde, uten å forklare hva som skjedde.',
        isCorrect: false,
        feedback:
          'Delvis riktig, men å ikke forklare hva som gikk galt og hoppe rett til stor rabatt kan fremstå som et forsøk på å kjøpe seg ut av konflikten — ikke genuin beklagelse.',
      },
      {
        id: 'd',
        label:
          'Si at du skal undersøke saken og komme tilbake til dem — og i mellomtiden be dem sette seg i baren.',
        isCorrect: false,
        feedback:
          'Feil. Utsettelse og mangel på umiddelbar handling er frustrerende for gjester som allerede har ventet lenge. Situasjonen krever handling nå, ikke undersøkelse.',
      },
    ],
    espenTip:
      '⚠️ En klage er en gave — kunden gir deg sjansen til å rette opp. 70% av kunder som får god klagebehandling, kommer tilbake!',
  },
  {
    id: 'klage-04',
    icon: '💳',
    title: 'Feil pris belastet',
    context:
      'Du jobber i kassen på Clas Ohlson. En kunde oppdager at de ble belastet 1 299 kr for en drill som var priset til 899 kr på hyllen. De kontakter deg etter å ha sjekket kvitteringen hjemme.',
    question: 'Kunden vil ha tilbake differansen på 400 kr. Hva gjør du?',
    choices: [
      {
        id: 'a',
        label:
          'Spørre kunden om de kan ta med seg kvittering og hylleskiltet som bevis til nærmeste butikk.',
        isCorrect: false,
        feedback:
          'Feil. Kunden skal ikke måtte bevise bedriftens feil. Dette er unødvendig byråkrati som setter kunden i en defensiv posisjon.',
      },
      {
        id: 'b',
        label:
          'Forklare at hylle- og kassepriser av og til er forskjellige og at kassaprisen alltid er gjeldende.',
        isCorrect: false,
        feedback:
          'Feil og ulovlig. Prisloven i Norge sier at butikken er bundet av den laveste oppgitte prisen. Kunden har krav på å betale 899 kr.',
      },
      {
        id: 'c',
        label:
          'Refundere differansen på 400 kr umiddelbart, beklage feilen og forklare at butikken er bundet av hylleprisen.',
        isCorrect: true,
        feedback:
          'Riktig! Dette er juridisk korrekt og god service i ett. Prisloven sikrer kunden retten til laveste oppgitte pris — og en rask, problemfri løsning bygger tillit.',
      },
      {
        id: 'd',
        label:
          'Tilby 400 kr som butikkreditt i stedet for kontantrefusjon — det er enklere å registrere i systemet.',
        isCorrect: false,
        feedback:
          'Feil. Kunden har krav på refusjon i original betalingsform, ikke kreditt som tvinger dem til å handle mer. Det er å legge byrden på kunden igjen.',
      },
    ],
    espenTip:
      '⚠️ En klage er en gave — kunden gir deg sjansen til å rette opp. 70% av kunder som får god klagebehandling, kommer tilbake!',
  },
  {
    id: 'klage-05',
    icon: '😤',
    title: 'Klage på uhøflig ansatt',
    context:
      'Du er butikksjef på H&M. En kunde tar kontakt og forteller at en ansatt var uhøflig og nedlatende da kunden spurte om hjelp i garderoben.',
    question: 'Kunden er lei seg og vil at noe skal gjøres. Hva er riktig håndtering?',
    choices: [
      {
        id: 'a',
        label:
          'Forsvare den ansatte og forklare at det sikkert var en misforståelse — den ansatte er vanligvis veldig hyggelig.',
        isCorrect: false,
        feedback:
          'Feil. Å avvise kundens opplevelse er nedlatende. Uansett hva som faktisk skjedde, skal kunden alltid føle seg trodd og respektert.',
      },
      {
        id: 'b',
        label:
          'Si at du ikke kan gjøre noe uten å ha hørt begge sider av saken, og at kunden må vente på en intern undersøkelse.',
        isCorrect: false,
        feedback:
          'Feil. Kunden opplever dette som avvisning. Du kan anerkjenne og beklage opplevelsen uten å ha gjennomført en full gransking.',
      },
      {
        id: 'c',
        label:
          'Beklage opplevelsen på butikkens vegne, ta klagen på alvor internt, og følge opp kunden med beskjed om at du tar det med den aktuelle ansatte.',
        isCorrect: true,
        feedback:
          'Riktig! Du eier kundens opplevelse på vegne av butikken. Beklager uten å avkrefte eller bekrefte skyld, tar intern oppfølging seriøst og holder kunden informert. Dette er profesjonell klagebehandling.',
      },
      {
        id: 'd',
        label:
          'Tilby kunden 20% rabatt på neste kjøp og håpe at det er nok til å avslutte saken.',
        isCorrect: false,
        feedback:
          'Feil. Rabatt uten en genuin beklagelse og intern oppfølging er bare å kjøpe taushet. Det løser ikke årsaken til problemet og kunden kjenner forskjellen.',
      },
    ],
    espenTip:
      '⚠️ En klage er en gave — kunden gir deg sjansen til å rette opp. 70% av kunder som får god klagebehandling, kommer tilbake!',
  },
]
