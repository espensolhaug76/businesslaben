// ─── «Gjestepakke-forhandlingen» — B2B-møtescenario i hotell-lobbyen ─────────
// Spor C DEL 3. Forgrenings-format (samme mønster som sales/scenarios.ts:
// steg → replikk + valg → forgrening via `next`, terminalvalg bærer et
// `utfall`). VG2-forhandling: hotellsjefen tilbyr kaféen plass i hotellets
// gjestepakke mot 15 % rabatt til pakkegjestene. Eleven kan AKSEPTERE, komme med
// MOTFORSLAG, eller TAKKE NEI. KONSEKVENS i avtalen (margin ↔ trafikk), ALDRI en
// fasit — begge veier er gyldige avveininger.
//
// KOBLING: utfallet setter `state.hotellavtale` ('akseptert' | 'avslatt') via
// SET_HOTELLAVTALE. DEFENSIVT (som ambient-gjestene): den action-typen finnes kun
// på spor-a/tema-reiseliv (ikke merget). På main er dispatchen en no-op
// (reduceren returnerer uendret state) — forhandlingen spilles frittstående og
// setter avtalen automatisk når reiseliv merges. Ren DATA her; overlayet
// (GjestepakkeOverlay) håndterer dispatch + visning.

export type AvtaleSvar = 'akseptert' | 'avslatt'

export interface ForhandlingsValg {
  id: string
  text: string
  /** Konsekvens-tekst som vises etter valget (aldri fasit — beskriver avveiningen). */
  konsekvens: string
  /** Forgrening: hopp til dette steg-id-et. Utelatt ⇒ terminalvalg (vis
   *  konsekvensen + «Fullfør avtalen»). */
  next?: string
  /** Terminalvalg: hva avtalen blir. Settes i state.hotellavtale ved fullføring. */
  utfall?: AvtaleSvar
}

export interface ForhandlingsSteg {
  id: string
  /** Hotellsjefens replikk. */
  replikk: string
  /** Valgfri regi/utdypning under replikken. */
  note?: string
  valg: ForhandlingsValg[]
}

export interface Forhandling {
  id: string
  motpart: string
  beskrivelse: string
  steps: ForhandlingsSteg[]
}

export const GJESTEPAKKE_FORHANDLING: Forhandling = {
  id: 'gjestepakke-forhandlingen',
  motpart: 'Hotellsjefen',
  beskrivelse: 'Byhotellet vil ha kaféen med i gjestepakken sin. En forhandling om vilkår — margin mot trafikk.',
  steps: [
    {
      id: 'tilbud',
      replikk: 'Vi setter sammen en gjestepakke for turistene våre i sesongen — overnatting, opplevelser og en kaffe på veien. Vil kaféen din være «kaffestoppet»? Betingelsen er 15 % rabatt til pakkegjestene.',
      note: 'Rabatten kutter marginen på pakkesalget, men hotellet sender en jevn strøm av gjester innom i sesongen.',
      valg: [
        {
          id: 'aksepter-15',
          text: 'Ja — vi blir med på 15 %',
          konsekvens: 'Avtale i havn. Kaféen står i gjestepakken: flere turister innom i sesongen, men lavere margin på pakkesalget. Du satser på VOLUM. En helt gyldig strategi — om trafikken veier opp for kuttet.',
          utfall: 'akseptert',
        },
        {
          id: 'motforslag',
          text: 'Motforslag: 8 % rabatt mot at vi står øverst i pakken',
          konsekvens: 'Du prøver å beskytte marginen og be om synlighet i bytte. Hotellsjefen tar en tenkepause …',
          next: 'kontring',
        },
        {
          id: 'takke-nei',
          text: 'Nei takk — vi klarer oss uten pakken',
          konsekvens: 'Du står utenfor gjestepakken. Full margin på hvert salg, men færre turister finner veien innom kaféen i sesongen. Du satser på MARGIN framfor volum — like gyldig, med en annen risiko.',
          utfall: 'avslatt',
        },
      ],
    },
    {
      id: 'kontring',
      replikk: '8 % er i tynneste laget for oss — men jeg forstår at marginen betyr noe for deg. Vi kan møtes på midten: 12 %, uten toppplassering, men fortsatt godt synlig i pakken. Blir vi enige?',
      note: 'Et kompromiss: mindre kutt enn hotellet ba om, men uten den beste plasseringen.',
      valg: [
        {
          id: 'enig-12',
          text: 'Greit — vi møtes på 12 %',
          konsekvens: 'Enige på 12 %. Kaféen er med i pakken med et mildere kutt enn hotellets utgangspunkt — du forhandlet marginen litt tilbake. Balansert utfall mellom volum og margin.',
          utfall: 'akseptert',
        },
        {
          id: 'brudd',
          text: 'Da takker vi nei likevel',
          konsekvens: 'Dere ble ikke enige. Kaféen står utenfor gjestepakken denne sesongen — full margin, men uten hotellets gjestestrøm. Å holde på prisen har også en pris.',
          utfall: 'avslatt',
        },
      ],
    },
  ],
}
