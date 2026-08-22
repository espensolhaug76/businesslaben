# Rekruttering — stillingsannonse, søkere, intervju

## Pedagogisk mål (kv1011)
Rekrutteringsprosess og arbeidsgiveravveining. Eleven skal erfare at man
ikke bare «trykker ansett»: man lyser ut en stilling, setter lønn selv (mot
en tariff-referanse, jf. VG2-begrepet Tariffavtale, JUS_007), beskriver
hvilke egenskaper man ser etter, og vurderer søkere. Avveiningen er reell:
lav lønn og løse krav gir en svakere søkerbunke; lønn over referansen og
tydelige krav trekker sterkere folk — men koster mer per måned.

## Prinsipp (ufravikelig)
ALDRI fasit eller «riktig/feil»-tall til eleven. Intervju-tilbakemeldinger
er NARRATIVE inntrykk, ikke poeng. Konsekvensen av dårlige valg (lønn under
tariff, dårlig matchede egenskaper) vises som et SPØRSMÅL i refleksjons-
motoren («Se over organisasjonen»), aldri som en advarsel i selve
ansettelsesflyten.

## Flyt
Opprett funksjon i org-kartet → **Lys ut ny stilling** (velg stilling +
nivå, dra inntil 3 ønskede egenskaper inn i annonsen, sett lønn) →
**søkerliste** med 3 kandidater → valgfritt **intervju** (2 faste spørsmål,
narrativ tilbakemelding per svar) → **Ansett** en kandidat (eller Avlys).
Ansettelse lukker utlysningen. Kandidaten beholder lønna du tilbød og
egenskapene sine (lagres på den ansatte).

## Lønn styrer søkerbunken (skjult for eleven)
Tilbudt lønn måles mot `REFERANSELONN[nivå]` (junior 15k / senior 25k /
ekspert 40k — samme beløp som den gamle faste lønna, nå en referanse):
- **under 85 %** → svak bunke: 0–1 treff på ønskede egenskaper, lite
  erfaring, og alle vil ha *mer* enn du tilbød.
- **85–115 %** → normal bunke: 1–2 treff, blandet erfaring, forventning ca.
  det du tilbød.
- **over 115 %** → sterk bunke: 2–3 treff, god erfaring, tar gjerne tilbudet.

Tallene (tier-grenser, antall treff, lønnsforventning) står i
`src/game/data/rekruttering.ts` og vises ALDRI som en «score» for eleven —
de merkes bare indirekte i hvem som dukker opp og hva de vil ha.

## Kobling til refleksjonsmotoren
Har eleven ansatte med lønn under tariff-referansen, slår regelen
`lonn-under-tariff` (`data/orgRefleksjon.ts`) ut i «Se over organisasjonen»
og kan velges til dagsoppgjørets ene refleksjonslinje: *«Du har ansatte med
lønn under tariff-referansen … hva gjør det med hvem som søker neste gang,
og hvor lenge de blir?»* Et spørsmål, ikke en dom.

## Bevisst utelatt (v1)
Kandidater takker aldri nei · ingen lønnsforhandling (forventningen vises,
men påvirker ikke om de kan ansettes) · ingen utløpsdato/kø på annonsen ·
ingen faktisk turnover/oppsigelse fra egenskaps-mismatch (kun refleksjon) ·
kladden i annonseskjemaet (valgte egenskaper + lønn før utlysning)
persisteres ikke ved fanebytte — kun den POSTede utlysningen ligger i state.
