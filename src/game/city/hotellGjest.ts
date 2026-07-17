// ─── Hotellets gjestescenarier — eleven ER verten i resepsjonen ──────────────
// Spor C DEL 5. Fire forgrenings-scenarier i Likeverd-kvalitet: konstruktivt,
// aldri «game over», ALDRI en fasit — feedbacken forklarer HVORFOR, tallene og
// refleksjonen er svaret. Gjestene er turist-sprites fra A-grenens register
// (defensivt koblet: mangler spriten vises en nøytral silhuett).
//
// Anbefalinger går mot BYKATALOGEN (delt datakilde). Recommend-steg («anbefal»)
// bygger valg fra katalogen; er tilbudet BOOKBART får eleven «Skal jeg booke det
// for deg?» → provisjon (DEL 4b) — men gjesten takker JA kun hvis anbefalingen
// traff behovs-taggene. Motoren (HotellGjestOverlay) håndterer treff/booking.

import type { ByTag } from '../data/bykatalog'

export type Kvalitet = 'god' | 'delvis' | 'dårlig'

export interface GjestValg {
  id: string
  tekst: string
  kvalitet: Kvalitet
  /** Tilbakemelding etter valget (forklarer hvorfor — aldri fasit). */
  feedback: string
  /** Forgrening: hopp hit. Utelatt ⇒ til resultatet. */
  next?: string
}

export interface GjestSteg {
  id: string
  /** Gjestens replikk. */
  replikk: string
  /** Valgfri regi/utdypning under replikken. */
  note?: string
  /** 'valg' (default) = faste `valg`. 'anbefal' = motoren bygger valg fra
   *  bykatalogen (tilbudIds) og legger på booking-steget for bookbare tilbud. */
  kind?: 'valg' | 'anbefal'
  valg?: GjestValg[]
  // ── kind: 'anbefal' ──
  /** Behovs-taggene gjesten (skjult) egentlig trenger — styrer treff/kvalitet. */
  behov?: ByTag[]
  /** Tilbud-id-er som tilbys som anbefalingsvalg (kontrollert utvalg — bl.a.
   *  provisjons-spenningen: best-for-gjest lav provisjon vs. «ok» høy provisjon). */
  tilbudIds?: string[]
  /** Etter anbefaling (+ evt. booking): gå hit. Utelatt ⇒ resultatet. */
  anbefalNext?: string
}

export interface Gjestescenario {
  id: string
  tittel: string
  gjestNavn: string
  /** Turist-sprite-id (A-grenens register, /assets/raw/customers/<id>.png). */
  spriteId: string
  beskrivelse: string
  /** Gjestens SKJULTE behov — vises i resultatet, aldri som fasit på forhånd. */
  skjultBehov: string
  /** Læringspoenget (vises i resultatet; motoren rendrer fagord der det passer). */
  laeringspoeng: string
  /** true = gir kun mening i turistsesong. false = hele året (Klagen, Mersalget). */
  sesongGated: boolean
  steps: GjestSteg[]
}

// ── 1 · «Innsjekket» — behovsanalyse → tilbud (+ provisjons-spenningen) ────────
const INNSJEKKET: Gjestescenario = {
  id: 'innsjekket', tittel: 'Innsjekket', gjestNavn: 'Familien Berg', spriteId: 'turist-familie',
  beskrivelse: 'En sliten familie sjekker inn sent på kvelden. De vil ha «noe å finne på i morgen» — men ønsket er diffust.',
  skjultBehov: 'Etter en lang reisedag trenger de noe ROLIG og BARNEVENNLIG i morgen — ikke noe som sliter ut barna (og foreldrene) enda mer. «Ikke for mye» var nøkkelen.',
  laeringspoeng: 'Godt vertskap starter med å SPØRRE, ikke å ramse opp. Og det beste for gjesten er ikke alltid det som gir hotellet mest — der ligger den egentlige prøven.',
  sesongGated: true,
  steps: [
    {
      id: 'inn',
      replikk: 'Uff, vi har kjørt hele dagen og ungene er helt ferdige. Har dere noe å finne på i morgen som ikke blir … for mye?',
      note: 'Ønsket er diffust. Avdekk behovet før du anbefaler.',
      valg: [
        { id: 'inn_a', kvalitet: 'god', next: 'anbefal',
          tekst: 'Så fint at dere kom trygt fram! Fortell — hvor gamle er barna, og vil dere ha det rolig i morgen, eller er de klare for full fart?',
          feedback: 'Akkurat riktig: du spør om alder OG tempo før du anbefaler noe. Nå vet du at det er to små og en sliten familie som vil ha det rolig.' },
        { id: 'inn_b', kvalitet: 'delvis', next: 'anbefal',
          tekst: 'Barn liker jo badeland — skal jeg foreslå det?',
          feedback: 'Du gjetter i stedet for å spørre. Badeland KAN passe, men du vet ennå ikke om de vil ha det rolig eller aktivt — du hopper over behovsanalysen.' },
        { id: 'inn_c', kvalitet: 'dårlig', next: 'anbefal',
          tekst: 'Her er en bunke brosjyrer med alt byen har å by på — bare bla i gjennom.',
          feedback: 'Å dumpe alt på en utslitt familie er det motsatte av vertskap. De ba om hjelp til å VELGE, ikke om mer å forholde seg til.' },
      ],
    },
    {
      id: 'anbefal', kind: 'anbefal',
      behov: ['barnevennlig', 'rolig'],
      // Gårdsbesøket = full treff (rolig+barnevennlig), LAV provisjon (8 %).
      // Klatreparken = delvis (barnevennlig, men AKTIV = «for mye»), HØY provisjon
      // (18 %) → spenningen. Bryggeriomvisningen = bom (18+), tester feilmatch.
      tilbudIds: ['gardsbesok', 'klatrepark', 'lokalbryggeri'],
      replikk: '(mamma gjesper) Ja … noe rolig hadde vært helt perfekt. Hva anbefaler du?',
      note: 'Behovet er rolig + barnevennlig. Merk: det som passer BEST gir minst provisjon.',
      anbefalNext: 'result',
    },
  ],
}

// ── 2 · «Mersalget» — naturlig, aldri pushy ───────────────────────────────────
const MERSALGET: Gjestescenario = {
  id: 'mersalget', tittel: 'Mersalget', gjestNavn: 'Paret Dahl', spriteId: 'turist-par',
  beskrivelse: 'Et par skal ut og spise og spør om et tips. Bak spørsmålet ligger en anledning — om du tar deg tid til å finne den.',
  skjultBehov: 'Det er 10-årsdagen deres. De vil at kvelden skal bli SPESIELL — og de vet ikke selv at hotellet kan gjøre den det.',
  laeringspoeng: 'Mersalg er ikke å selge mest mulig — det er å dekke et behov gjesten ikke visste kunne dekkes. Avdekk anledningen, så følger forslaget naturlig.',
  sesongGated: false,
  steps: [
    {
      id: 'inn',
      replikk: 'Vi skal ut og spise i kveld — har du et godt tips til et sted?',
      valg: [
        { id: 'm_a', kvalitet: 'god', next: 'anledning',
          tekst: 'Så hyggelig! Er det en spesiell anledning, eller bare en fin kveld ute?',
          feedback: 'Du åpner samtalen i stedet for å svare mekanisk. Det er slik du finner ut hva kvelden EGENTLIG handler om.' },
        { id: 'm_b', kvalitet: 'delvis', next: 'result',
          tekst: 'Da anbefaler jeg hotellrestauranten — det dyreste og fineste vi har.',
          feedback: 'Du peker rett på det dyreste uten å vite hva de er ute etter. Det kan treffe, men det er pris-pushing, ikke vertskap.' },
        { id: 'm_c', kvalitet: 'dårlig', next: 'result',
          tekst: 'Det ligger noen brosjyrer med spisesteder der borte.',
          feedback: 'Du sender dem videre uten å hjelpe. En gjest som spør deg direkte, fortjener mer enn en peker mot en brosjyrestativ.' },
      ],
    },
    {
      id: 'anledning',
      replikk: 'Faktisk ja — det er 10-årsdagen vår i dag!',
      note: 'Nå kjenner du anledningen. Et NATURLIG forslag som gjør kvelden spesiell — ikke mest mulig påsalg.',
      valg: [
        { id: 'an_a', kvalitet: 'god', next: 'result',
          tekst: 'Gratulerer så mye! Da fortjener dere restauranten vår i kveld — og skal jeg reservere en spa-time til dere i morgen? En rolig start på feiringen.',
          feedback: 'Perfekt mersalg: du knytter forslaget til anledningen. Restaurant + spa føles som en gave, ikke som et press — du dekket et behov de ikke visste hotellet kunne fylle.' },
        { id: 'an_b', kvalitet: 'delvis', next: 'result',
          tekst: 'Da bør dere ta ALT — restaurant, spa, frokost på rommet OG en byvandring!',
          feedback: 'Iveren er god, men å ramse opp alt blir påtrengende. Mersalg er å treffe behovet presist, ikke å fylle handlekurven.' },
        { id: 'an_c', kvalitet: 'god', next: 'result',
          tekst: 'Gratulerer! Restauranten vår passer fint i kveld — og stikk gjerne innom kaféen i sentrum til en rolig frokostkaffe i morgen.',
          feedback: 'Lett og naturlig: du gjør kvelden spesiell uten å presse. Å sende dem til kaféen er raust og bygger tillit.' },
      ],
    },
  ],
}

// ── 3 · «Klagen» — service recovery (LYTT før løsning) ────────────────────────
const KLAGEN: Gjestescenario = {
  id: 'klagen', tittel: 'Klagen', gjestNavn: 'Herr Lund', spriteId: 'turist-eldre-stokk',
  beskrivelse: 'En gjest kommer opprørt til resepsjonen. Naborommet bråkte hele natten, og morgenen er ødelagt.',
  skjultBehov: 'Vil bli HØRT og få en ærlig beklagelse — ikke bortforklaring, og ikke penger kastet i fanget før noen har lyttet. Å bli tatt på alvor betyr mer enn kompensasjonen.',
  laeringspoeng: 'Service recovery starter med å LYTTE ferdig og beklage ærlig — DERETTER et konkret tiltak. Å forsvare seg eskalerer; å kaste penger uten å lytte føles som avvisning.',
  sesongGated: false,
  steps: [
    {
      id: 'inn',
      replikk: 'Jeg fikk ikke sove i natt! Naborommet bråkte til langt på natt, og ingen i resepsjonen gjorde noe. Hele morgenen er ødelagt.',
      note: 'Førsteinntrykket avgjør alt. Hva gjør du FØRST?',
      valg: [
        { id: 'k_a', kvalitet: 'god', next: 'losning',
          tekst: 'Det er jeg virkelig lei meg for å høre. Fortell meg hva som skjedde — jeg vil forstå det ordentlig.',
          feedback: 'Riktig: du lytter og anerkjenner FØR du løser. Gjesten senker skuldrene med en gang — han blir tatt på alvor.' },
        { id: 'k_b', kvalitet: 'dårlig', next: 'eskalering',
          tekst: 'Naborommet? Det har vi ikke fått andre klager på. Er du sikker på at det var så ille?',
          feedback: 'Å betvile gjesten er det verste du kan gjøre. Du gjør ham til motpart i stedet for å stå på hans side — dette eskalerer.' },
        { id: 'k_c', kvalitet: 'delvis', next: 'avfeid',
          tekst: 'Her, ta 500 kr i avslag på regningen, så er vi kvitt.',
          feedback: 'Penger FØR du har lyttet føles som å bli kjøpt til taushet. Gesten kan komme senere — men først må gjesten bli hørt.' },
      ],
    },
    {
      id: 'losning',
      replikk: 'Takk for at du faktisk hører på meg. Det holdt på i timevis, og jeg er helt utkjørt.',
      note: 'Nå har du lyttet. Hva er et KONKRET tiltak?',
      valg: [
        { id: 'l_a', kvalitet: 'god', next: 'result',
          tekst: 'Det skal du slippe én natt til. Jeg flytter deg til et roligere rom nå, og frokosten i dag er selvsagt på huset. Er det greit for deg?',
          feedback: 'Forbilledlig: ekte beklagelse + et konkret, rimelig tiltak (rombytte + frokost). Gjesten går herfra gjenopprettet — kanskje mer fornøyd enn før.' },
        { id: 'l_b', kvalitet: 'delvis', next: 'result',
          tekst: 'Jeg skal si fra til de andre gjestene om å ta hensyn.',
          feedback: 'Godt ment, men det løser ikke NOE for HAM. Han trenger et tiltak som gjelder hans opphold, ikke et løfte om andres oppførsel.' },
      ],
    },
    {
      id: 'eskalering',
      replikk: 'Så du tror jeg lyver? Nå vil jeg snakke med sjefen din — dette er helt uakseptabelt!',
      note: 'Klagen er nå en konflikt. Kan du snu det?',
      valg: [
        { id: 'e_a', kvalitet: 'god', next: 'result',
          tekst: 'Nei, jeg tror deg — og jeg beklager at det kom ut feil. La meg gjøre det godt igjen: nytt, roligere rom og frokost på huset.',
          feedback: 'Du tar ansvar og snur det. Litt sent — tilliten fikk en knekk først — men et ærlig tiltak henter mye tilbake.' },
        { id: 'e_b', kvalitet: 'dårlig', next: 'result',
          tekst: 'Sjefen sier det samme som meg. Vi kan ikke styre hva gjester på andre rom gjør.',
          feedback: 'Nå er gjesten tapt. Å gjemme seg bak «reglene» og sjefen bekrefter bare følelsen av å ikke bli tatt på alvor.' },
      ],
    },
    {
      id: 'avfeid',
      replikk: 'Jeg vil ikke ha pengene dine — jeg vil bli TATT PÅ ALVOR!',
      note: 'Pengene kom for tidlig. Kan du rette opp?',
      valg: [
        { id: 'a_a', kvalitet: 'god', next: 'result',
          tekst: 'Du har helt rett, unnskyld. Fortell meg hva som skjedde — jeg skulle ha lyttet først.',
          feedback: 'Du tar et skritt tilbake og gjør det riktige: lytter. Rekkefølgen betyr alt — anerkjennelse FØR kompensasjon.' },
        { id: 'a_b', kvalitet: 'delvis', next: 'result',
          tekst: 'Ok, da 1 000 kr i stedet?',
          feedback: 'Mer penger løser ikke problemet — han ba om å bli HØRT, ikke om et større beløp. Du gjentar samme feil, bare dyrere.' },
      ],
    },
  ],
}

// ── 4 · «Den umulige forespørselen» — ærlighet + omdirigering ─────────────────
const UMULIGE: Gjestescenario = {
  id: 'umulige', tittel: 'Den umulige forespørselen', gjestNavn: 'Turist med kart', spriteId: 'turist-kart',
  beskrivelse: 'En gjest spør etter noe byen rett og slett ikke har. Hva gjør du når svaret er «det finnes ikke»?',
  skjultBehov: 'Bak «hvor er akvariet?» ligger det egentlige behovet: noe GØY og BARNEVENNLIG å gjøre INNE med barna. Akvariet var bare én måte å dekke det på.',
  laeringspoeng: 'Ærlighet + omdirigering er vertskap: si sant at dere ikke har det, men fang OPP behovet bak og tilby noe som dekker det samme.',
  sesongGated: true,
  steps: [
    {
      id: 'inn',
      replikk: 'Hei! Hvor finner vi akvariet? Barna har gledet seg sånn til å se fisk.',
      note: 'Byen har ikke noe akvarium. Hva sier du?',
      valg: [
        { id: 'u_a', kvalitet: 'god', next: 'anbefal',
          tekst: 'Å, akvarium har vi dessverre ikke her i byen — men jeg skjønner at dere vil ha noe gøy INNE for barna. Skal jeg foreslå noe som treffer det samme?',
          feedback: 'Perfekt: ærlig om at det ikke finnes, OG du fanger behovet bak (barn + inne + gøy). Nå kan du redde dagen deres.' },
        { id: 'u_b', kvalitet: 'delvis', next: 'result',
          tekst: 'Hmm, jeg tror det ligger et akvarium et sted lenger nord? Prøv å google.',
          feedback: 'Du dikter opp et svar for å slippe å si «nei». Det er verre enn å være ærlig — de kan kaste bort dagen på en fisketur som ikke finnes.' },
        { id: 'u_c', kvalitet: 'dårlig', next: 'result',
          tekst: 'Akvarium? Nei, det har vi ikke. (trekker på skuldrene)',
          feedback: 'Ærlig, men uten hjelp. Du lot en skuffet familie stå igjen uten et alternativ — halve vertskapet mangler.' },
      ],
    },
    {
      id: 'anbefal', kind: 'anbefal',
      behov: ['barnevennlig'],
      tilbudIds: ['badeland', 'bymuseum', 'klatrepark'],
      replikk: 'Å ja, takk! Bare det er noe ungene synes er gøy — og helst inne, det ser ut som det blir regn.',
      note: 'Behovet: barnevennlig + inne. Badelandet er innendørs; velg det som treffer.',
      anbefalNext: 'result',
    },
  ],
}

export const GJESTESCENARIER: Gjestescenario[] = [INNSJEKKET, MERSALGET, KLAGEN, UMULIGE]
export const gjestescenarioById = (id: string): Gjestescenario | undefined =>
  GJESTESCENARIER.find(s => s.id === id)

/** Deterministisk «møt en gjest»-rotasjon: velg neste scenario ut fra en seed
 *  (dag) + sesong-gating. Klagen/Mersalget går hele året; Innsjekket/Umulige kun
 *  i turistsesong. Ren funksjon (ingen Math.random). */
export function velgGjestescenario(seed: number, erSesong: boolean): Gjestescenario {
  const pool = GJESTESCENARIER.filter(s => erSesong || !s.sesongGated)
  const liste = pool.length ? pool : GJESTESCENARIER
  return liste[(seed >>> 0) % liste.length]!
}
