# Bransje 2: Sesong/kolleksjon — designdokument (klesbutikkens «svinn»)

## Kjerneidé
Klær forringes ikke daglig — de går AV MOTEN. Sesong er klesbutikkens
svinnRegel (jf. IndustryDefinition: 'sesong' vs 'ferskvare-daglig').
Pedagogikken: LAGERRISIKO OVER TID — kjøp inn for mye av en kolleksjon,
og tapet kommer ved sesongslutt, ikke i kveld.

## Datamodell
Plagg får season: 'vår-sommer' | 'høst-vinter' | 'helår'.
Spillkalenderen (månedene finnes alt) definerer aktiv sesong:
  mars–august = vår-sommer · september–februar = høst-vinter.
Kolleksjonsskifte = to datoer i året (1. mars / 1. september).

## Mekanikker (i stigende byggerekkefølge)
1. EKSPONERINGS-SIGNAL (v1): ute-av-sesong-plagg i vindu/dukke/stativ får
   diskret varsel («Ute av sesong») — samme mønster som prismerking-varselet.
   Ingen straff, kun synliggjøring.
2. ETTERSPØRSEL: ute-av-sesong selger dårlig — kundescenarier/spawn vekter
   mot aktiv sesong (kobles på dagssyklus/brandPull-mekanikken).
3. NEDSKRIVNING VED KOLLEKSJONSSKIFTE: usolgt ute-av-sesong-lager nedskrives
   (f.eks. 50 % av costPrice) i et SESONGOPPGJØR — månedsoppgjørets store
   fetter. Dyre merker (Nordheim) = større tap: kobler til
   BRANSJE2_LEVERANDORER.md.
4. MOTTREKK (runde 2, speiler kafeens svinn-tiltak): SALG/UTSALG — eleven
   setter rabatt på utgående kolleksjon FØR skiftet. Mindre tap enn
   nedskrivning, mindre margin enn fullpris. Det er den ekte avveiningen
   bransjen lever i (jan/juli-salg!).

## Pedagogikk
- Innkjøpsmengde × sesongtiming = risikostyring
- Salg/utsalg som RASJONELT verktøy, ikke panikk — elevene forstår hvorfor
  januarsalget finnes
- Helår-varer (basics/Basiq!) som lavrisiko-ryggrad vs. sesongvarer som
  høyrisiko/høymargin — porteføljetenkning

## Avgrensning v1
Kun mekanikk 1 (signal) + season-feltet i data. 2–4 kobles på etter at
dagssyklusen og klesbutikk-sonene står. Kafeen berøres ikke
(svinnRegel 'ferskvare-daglig' uendret).
