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
    cafe:              { path: 'assets/buildings/cafe.png',              fallbackColor: 0xd4a574, width: 130, height: 150 },
    bakery:            { path: 'assets/buildings/bakery.png',            fallbackColor: 0xe8a87c, width: 130, height: 150 },
    bank:              { path: 'assets/buildings/bank.png',              fallbackColor: 0x2d5a27, width: 160, height: 190 },
    restaurant:        { path: 'assets/buildings/restaurant.png',        fallbackColor: 0xc0392b, width: 140, height: 160 },
    apartment:         { path: 'assets/buildings/apartment.png',         fallbackColor: 0xbdc3c7, width: 150, height: 220 },
    gym:               { path: 'assets/buildings/gym.png',               fallbackColor: 0x27ae60, width: 150, height: 170 },
    house:             { path: 'assets/buildings/house.png',             fallbackColor: 0xa0856e, width: 120, height: 130 },
    // Locked / future
    locked_web:        { path: 'assets/buildings/locked_web.png',        fallbackColor: 0x444455, width: 140, height: 160 },
    locked_franchise:  { path: 'assets/buildings/locked_franchise.png',  fallbackColor: 0x444455, width: 160, height: 200 },
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
