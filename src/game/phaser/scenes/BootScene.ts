import Phaser from 'phaser'

// Legacy tycoon set. 'cafe'/'gym'/'bank'/'cinema' removed — those keys now
// belong exclusively to the modern raw/ textures (they used to be queued here
// too and produced 4 duplicate-key skips in the loader).
const BUILDING_ASSETS = [
  'shop_tier1', 'shop_tier2', 'shop_tier3', 'warehouse', 'office', 'vacant',
  'bakery', 'restaurant', 'apartment', 'house', 'drugstore',
  'firestation', 'locked_web', 'locked_franchise',
  'fountain', 'bench', 'streetlamp', 'flowerpot', 'tree_leafy', 'tree_pine',
]

// Modern Norwegian commercial assets. v2 set generated 2026-05-02 (Phase E),
// regenerated 2026-05-06 with the strict tight-crop prompt. Batch 2 NPCs
// (kiosk → cinema) added 2026-05-06.
const MODERN_BUILDING_ASSETS = [
  // v2 set — original 14 landmarks
  'bakery_kongsvinger', 'cafe', 'hair_salon', 'sports_shop', 'gym',
  'tech_shop', 'fashion_shop',
  'sentrum_vgs', 'bibliotek', 'politi', 'brannstasjon', 'jernbanestasjon',
  'radhus', 'kirke',
  // Batch 2 NPCs — convenience + health
  'kiosk', 'apotek1',
  // Batch 2 NPCs — grocery (3 brands sharing the grocery building_type)
  'kiwi', 'coop_mega', 'rema',
  // Batch 2 NPCs — food
  'restaurant_modern', 'fast_food', 'brewpub',
  // Batch 2 NPCs — books / services
  'bokhandel', 'bank', 'post', 'florist', 'optician',
  // Batch 2 NPCs — health
  'legekontor', 'dentist',
  // Batch 2 NPCs — hospitality / entertainment
  'hotel', 'cinema',
  // Canonical-spec landmarks (generated 2026-05-06)
  'sykehuset', 'radhusteateret', 'kongsbadet', 'esso', 'peders',
  // Filler set (generated 2026-06-11/12, see docs/FILLER_ASSETS.md) —
  // generic housing/office/retail used by CityScene's FILLER name-pools.
  'boligblokk_lav_a', 'boligblokk_lav_b', 'boligblokk_lav_c',
  'boligblokk_hoy_a', 'boligblokk_hoy_b', 'boligblokk_hoy_c',
  'kontorbygg_a', 'kontorbygg_b', 'kontorbygg_c',
  'rekkehus_a', 'rekkehus_b',
  'enebolig_a', 'enebolig_b', 'enebolig_c',
  'tomannsbolig_a', 'tomannsbolig_b',
  'butikklokale_a', 'butikklokale_b', 'butikklokale_c',
  'skolebygg_a', 'idrettshall_a', 'parkeringshus_a',
  // Kvartal set (KVARTALSBY, generated 2026-06-12) — sentrum town-block
  // facades + Kongssenteret mall, used by CityScene's KVARTALER table.
  'kvartal_a', 'kvartal_b', 'kvartal_c', 'kvartal_d', 'kvartal_e', 'kvartal_f',
  'kvartal_smal_a', 'kvartal_smal_b', 'kjopesenter',
]

export default class BootScene extends Phaser.Scene {
  constructor() { super({ key: 'BootScene' }) }

  preload() {
    const w = this.scale.width
    const h = this.scale.height
    this.add.rectangle(w / 2, h / 2, w, h, 0x7ec850)

    const text = this.add.text(w / 2, h / 2, 'Laster kart…', {
      fontSize: '24px',
      fontFamily: 'Outfit, sans-serif',
      color: '#2d5a27',
    }).setOrigin(0.5)

    this.tweens.add({
      targets: text,
      alpha: 0.3,
      yoyo: true,
      repeat: -1,
      duration: 700,
    })

    let loaded = 0
    let failed = 0
    const missing: string[] = []

    // Leading-slash paths resolve from origin root regardless of the document URL
    // (e.g. /game vs /game/something).
    for (const key of MODERN_BUILDING_ASSETS) {
      this.load.image(key, `/assets/raw/${key}.png`)
    }
    for (const key of BUILDING_ASSETS) {
      this.load.image(key, `/assets/buildings/${key}.png`)
    }

    const totalQueued = BUILDING_ASSETS.length + MODERN_BUILDING_ASSETS.length

    this.load.on('filecomplete', (key: string) => {
      loaded++
      // Trim the noise — only log modern keys to confirm raw/ assets resolve
      if (MODERN_BUILDING_ASSETS.includes(key)) console.log(`[BootScene] ✓ modern "${key}"`)
    })
    this.load.on('loaderror', (file: Phaser.Loader.File) => {
      failed++
      missing.push(file.key)
      console.error(`[BootScene] ✗ FAILED "${file.key}" url=${file.url}`)
    })

    this.load.on('complete', () => {
      const skipped = totalQueued - loaded - failed
      console.log(`[BootScene] complete: ${loaded} loaded, ${failed} failed, ${skipped} duplicate-key skips (queued ${BUILDING_ASSETS.length} legacy + ${MODERN_BUILDING_ASSETS.length} modern)`)
      const modernPresent = MODERN_BUILDING_ASSETS.filter(k => this.textures.exists(k))
      const modernAbsent  = MODERN_BUILDING_ASSETS.filter(k => !this.textures.exists(k))
      console.log(`[BootScene] modern keys IN cache (${modernPresent.length}/${MODERN_BUILDING_ASSETS.length}):`, modernPresent)
      if (modernAbsent.length) console.error(`[BootScene] modern keys NOT in cache:`, modernAbsent)
      if (missing.length) console.error(`[BootScene] failed keys: ${missing.join(', ')}`)
    })
  }

  create() {
    this.time.delayedCall(400, () => this.scene.start('CityScene'))
  }
}
