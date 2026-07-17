# Spor C — Hotell-lobby (møtescene for B2B)

**Gren:** `spor-c/hotell-lobby` (fra `origin/main`) · **Start:** 2026-07-17

Møtescene for B2B i Byhotellet — IKKE en drivbar bransje (bransje 4 kommer
senere via autonom-pipelinen). Bygges i tre deler: (1) NB-lobby-interiør,
(2) lobby-rute + okklusjon/møtepunkt etter kaféens kassevy-mønster,
(3) hotellsjef-sprite + ett møtescenario «Gjestepakke-forhandlingen».

> **Miljø-merknader (flagget til Espen, bekreftet):**
> - `scripts/nb-generate.sh` + `docs/AUTONOM_PIPELINE.md` ligger på
>   `origin/eksperiment/autonom-sport` (ikke merget til main) — scriptet er hentet
>   inn i denne grenen for gjenbruk (`git show …:scripts/nb-generate.sh`).
> - NB-generering er BLOKKERT i CC-sesjonen: `GEMINI_API_KEY` i `~/.bashrc` er en
>   `AQ.`-token (401 UNAUTHENTICATED på `?key=`/Bearer/`x-goog-api-key`), ikke en
>   `AIza`-nøkkel. Espen genererer NB-bildene manuelt fra den ferdige prompten;
>   CC pilot-porterer, etterbehandler (✦-fjerning), kalibrerer og koder.
> - `spor-a.md` pkt. 36 (Byhotellet/gjestepakken) + `hotellavtale-state` ligger på
>   `spor-a/tema-reiseliv` (ikke merget). DEL 3 kobles DEFENSIVT: scenariet
>   fungerer frittstående på main og auto-kobles når reiseliv merges.

---

## DEL 1 — NB-lobby-interiør (pilot-port + ✦-fjerning) ✅

**Prompt (diorama-stilformelen, forankret i `interior-cafe.png`):** varm norsk
småby-hotell-lobby sett fra inngangen mot resepsjonsdisken; ett-punkts
perspektiv; mørk treverksdisk i NEDRE felt som forgrunn/okklusjonssone (tom
flate); bak disken mørkt treverk + eksponert rødbrun murstein (rimer med
hotellets mursteinseksteriør), peis med varm glød + to skinnstoler i en lounge-
krok, messing-lampetter + pendel, plante, sildebensgulv; nordisk fjellhotell-
varme; TOMT for folk; ingen tekst/logoer/skilt. Full prompt ligger i
`scripts/` sin bruk (kjørbar når `AIza`-nøkkel er på plass):
`./scripts/nb-generate.sh hotell-lobby-pilot-1-raw "<prompt>" public/assets/raw/interior-cafe.png`

**Resultat:** Espen genererte + VALGTE på første forsøk →
`public/assets/raw/hotell-lobby-pilot-1.png` (1376×768, RGBA). Ingen kandidat 2
nødvendig. Komposisjonen treffer: resepsjonsdisk lav (~28 % av bildehøyden,
overkant ~72 %) — resepsjonsdisk, IKKE kafédisk; brass-ringeklokke + skinn-
gjestebok på disken (tekstfrie); peis + skinnstoler høyre, murstein venstre,
inngangsvindu bak.

**✦-vannmerke (nede t.h.) — fjernet via inpainting, pikseldiff-verifisert:**
- ✦ lokalisert som lokal lys-anomali på mørk disk: kjerne x[1232–1279]
  y[624–671], glød til ~x[1204–1299] y[604–681].
- Metode: per-rad referanse (median av ren disk i samme rad, høyre strimmel
  x[1305–1372]) → maske = diskpiksler > rad-referanse + 16, dilatert 5px →
  `cv2.inpaint` (Navier–Stokes, radius 3). Tett maske (2 646 px) så bare stjernen
  fjernes, IKKE diskkanten (et første, for bredt forsøk smurte diskskyggen — rettet).
- **Pikseldiff:** endrede piksler KUN i ✦-regionen (x[1204–1299] y[604–681]);
  **0 endrede piksler utenfor**. Tidligere stjernekjerne-luminans etter:
  median 67 / max 82 (matcher omkringliggende disk ~70–90, ingen lys stjerne).
- Visuelt verifisert: ren, kontinuerlig treverksmaser, ingen smøring/lapp.

> **Uhell + gjenoppretting (ærlig):** første (for brede) inpaint OVERSKREV
> originalen (untracket → ikke i git). Originalen ble gjenopprettet fra
> `/mnt/c/Users/espen/Downloads/hotell-lobby-pilot-1.png` og inpainting kjørt på
> nytt med tett maske. Lærdom: ta backup FØR destruktiv bildebehandling av
> untrackede assets.

**Til DEL 2 (Espens føring):** disken er bevisst LAV. OCCLUDE-linja traces langs
diskens OVERKANT (~72 % høyde). Hotellsjef-spriten skal være synlig fra ca.
lårene og opp (mer synlig enn kaféens kundemodell) — førstepasning kalibreres mot
det.

**Endret:** `public/assets/raw/hotell-lobby-pilot-1.png` (ny, ✦-fri),
`scripts/nb-generate.sh` (hentet fra sport-grenen), denne rapporten.
