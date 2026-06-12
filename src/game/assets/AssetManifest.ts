// ─── AdVenture 3.0 — Asset Manifest ────────────────────────────────────────
// Every asset has a PNG path AND a fallback colour.
// Drop AI-generated PNGs into public/assets/ without any code changes.

export interface AssetDef {
  path: string
  fallbackColor: number
  width: number
  height: number
}

export const ASSETS = {
  buildings: {
    // Vacant / rentable
    vacant:            { path: 'assets/buildings/vacant.png',            fallbackColor: 0x888888, width: 140, height: 160 },
    // Player shops by tier
    shop_tier1:        { path: 'assets/buildings/shop_tier1.png',        fallbackColor: 0x00d4aa, width: 160, height: 200 },
    shop_tier2:        { path: 'assets/buildings/shop_tier2.png',        fallbackColor: 0x4facfe, width: 180, height: 220 },
    shop_tier3:        { path: 'assets/buildings/shop_tier3.png',        fallbackColor: 0xffd700, width: 200, height: 240 },
    // Decoration buildings
    warehouse:         { path: 'assets/buildings/warehouse.png',         fallbackColor: 0xff8c42, width: 150, height: 160 },
    office:            { path: 'assets/buildings/office.png',            fallbackColor: 0x4facfe, width: 140, height: 180 },
    cafe:              { path: 'assets/raw/cafe.png',                    fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    bakery:            { path: 'assets/buildings/bakery.png',            fallbackColor: 0xe8a87c, width: 130,  height: 150 },
    bank:              { path: 'assets/buildings/bank.png',              fallbackColor: 0x2d5a27, width: 160,  height: 190 },
    restaurant:        { path: 'assets/buildings/restaurant.png',        fallbackColor: 0xc0392b, width: 140,  height: 160 },
    apartment:         { path: 'assets/buildings/apartment.png',         fallbackColor: 0xbdc3c7, width: 150,  height: 220 },
    gym:               { path: 'assets/raw/gym.png',                     fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    house:             { path: 'assets/buildings/house.png',             fallbackColor: 0xa0856e, width: 120,  height: 130 },
    // Locked / future
    locked_web:        { path: 'assets/buildings/locked_web.png',        fallbackColor: 0x444455, width: 140,  height: 160 },
    locked_franchise:  { path: 'assets/buildings/locked_franchise.png',  fallbackColor: 0x444455, width: 160,  height: 200 },
    // Modern Norwegian commercial — generated 2026-05-02 (Phase E)
    bakery_kongsvinger:{ path: 'assets/raw/bakery_kongsvinger.png',      fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    hair_salon:        { path: 'assets/raw/hair_salon.png',              fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    sports_shop:       { path: 'assets/raw/sports_shop.png',             fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    tech_shop:         { path: 'assets/raw/tech_shop.png',               fallbackColor: 0x9aa3ad, width: 1376, height: 768 },
    fashion_shop:      { path: 'assets/raw/fashion_shop.png',            fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    sentrum_vgs:       { path: 'assets/raw/sentrum_vgs.png',             fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    bibliotek:         { path: 'assets/raw/bibliotek.png',               fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    politi:            { path: 'assets/raw/politi.png',                  fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    brannstasjon:      { path: 'assets/raw/brannstasjon.png',            fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    jernbanestasjon:   { path: 'assets/raw/jernbanestasjon.png',         fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    // Modern legacy heritage (style_variant: legacy)
    radhus:            { path: 'assets/raw/radhus.png',                  fallbackColor: 0xc0a878, width: 1408, height: 768 },
    kirke:             { path: 'assets/raw/kirke.png',                   fallbackColor: 0xe8e0d0, width: 1408, height: 768 },
    // Batch 2 NPC competitors — generated 2026-05-06
    kiosk:             { path: 'assets/raw/kiosk.png',                   fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    apotek1:           { path: 'assets/raw/apotek1.png',                 fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    kiwi:              { path: 'assets/raw/kiwi.png',                    fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    coop_mega:         { path: 'assets/raw/coop_mega.png',               fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    rema:              { path: 'assets/raw/rema.png',                    fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    restaurant_modern: { path: 'assets/raw/restaurant_modern.png',       fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    fast_food:         { path: 'assets/raw/fast_food.png',               fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    brewpub:           { path: 'assets/raw/brewpub.png',                 fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    bokhandel:         { path: 'assets/raw/bokhandel.png',               fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    post:              { path: 'assets/raw/post.png',                    fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    florist:           { path: 'assets/raw/florist.png',                 fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    optician:          { path: 'assets/raw/optician.png',                fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    legekontor:        { path: 'assets/raw/legekontor.png',              fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    dentist:           { path: 'assets/raw/dentist.png',                 fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    hotel:             { path: 'assets/raw/hotel.png',                   fallbackColor: 0x9aa3ad, width: 1408, height: 768 },
    // Canonical-spec landmarks — generated 2026-05-06
    sykehuset:         { path: 'assets/raw/sykehuset.png',               fallbackColor: 0xd0e8f8, width: 1408, height: 768 },
    radhusteateret:    { path: 'assets/raw/radhusteateret.png',          fallbackColor: 0xf0e8d0, width: 1408, height: 768 },
    kongsbadet:        { path: 'assets/raw/kongsbadet.png',              fallbackColor: 0xb8e8ff, width: 1408, height: 768 },
    esso:              { path: 'assets/raw/esso.png',                    fallbackColor: 0xfff0d0, width: 1408, height: 768 },
    peders:            { path: 'assets/raw/peders.png',                  fallbackColor: 0xffd8b0, width: 1408, height: 768 },
  },

  tiles: {
    grass:       { path: 'assets/tiles/grass.png',       fallbackColor: 0x2d5a27, width: 128, height: 64 },
    asphalt:     { path: 'assets/tiles/asphalt.png',     fallbackColor: 0x3a3a3a, width: 128, height: 64 },
    cobblestone: { path: 'assets/tiles/cobblestone.png', fallbackColor: 0x8b7355, width: 128, height: 64 },
    industrial:  { path: 'assets/tiles/industrial.png',  fallbackColor: 0x505050, width: 128, height: 64 },
  },

  props: {
    tree:         { path: 'assets/props/tree.png',         fallbackColor: 0x228b22, width: 60,  height: 80  },
    bench:        { path: 'assets/props/bench.png',        fallbackColor: 0x8b4513, width: 40,  height: 30  },
    flower_pot:   { path: 'assets/props/flower_pot.png',   fallbackColor: 0xff69b4, width: 20,  height: 30  },
    street_lamp:  { path: 'assets/props/street_lamp.png',  fallbackColor: 0xc0c0c0, width: 12,  height: 60  },
    fountain:     { path: 'assets/props/fountain.png',     fallbackColor: 0x4facfe, width: 80,  height: 50  },
  },

  characters: {
    npc_1: { path: 'assets/characters/npc_1.png', fallbackColor: 0x38bdf8, width: 20, height: 32 },
    npc_2: { path: 'assets/characters/npc_2.png', fallbackColor: 0xa855f7, width: 20, height: 32 },
    npc_3: { path: 'assets/characters/npc_3.png', fallbackColor: 0xf97316, width: 20, height: 32 },
    npc_4: { path: 'assets/characters/npc_4.png', fallbackColor: 0x22c55e, width: 20, height: 32 },
    npc_5: { path: 'assets/characters/npc_5.png', fallbackColor: 0xff6b6b, width: 20, height: 32 },
    npc_6: { path: 'assets/characters/npc_6.png', fallbackColor: 0xfbbf24, width: 20, height: 32 },
  },

  interior: {
    desk:      { path: 'assets/interior/desk.png',      fallbackColor: 0x4facfe, width: 120, height: 80  },
    shelves:   { path: 'assets/interior/shelves.png',   fallbackColor: 0x8b6914, width: 200, height: 150 },
    counter:   { path: 'assets/interior/counter.png',   fallbackColor: 0xd4a574, width: 180, height: 60  },
    rack:      { path: 'assets/interior/rack.png',      fallbackColor: 0x888888, width: 80,  height: 140 },
  },

  ui: {
    til_leie_badge: { path: 'assets/ui/til_leie.png', fallbackColor: 0x38bdf8, width: 70, height: 24 },
    lock_icon:      { path: 'assets/ui/lock.png',     fallbackColor: 0x666666, width: 24, height: 24 },
  },
} satisfies Record<string, Record<string, AssetDef>>
