import Phaser from 'phaser'

// ── Isometric constants ───────────────────────────────────────────────────────
const TW = 128, TH = 64, FH = 24 // floor height reduced 40% (was 40)

function iso(c: number, r: number) {
  const ri = r - 1
  return { x: (c - ri) * (TW / 2), y: (c + ri) * (TH / 2) }
}
function isoC(c: number, r: number) {
  const p = iso(c, r); return { x: p.x, y: p.y + TH / 2 }
}
function toGrid(wx: number, wy: number) {
  return { col: (wx / (TW / 2) + wy / (TH / 2)) / 2, row: (wy / (TH / 2) - wx / (TW / 2)) / 2 + 1 }
}
function dk(c: number, f: number): number {
  return (Math.floor(((c >> 16) & 0xff) * f) << 16) | (Math.floor(((c >> 8) & 0xff) * f) << 8) | Math.floor((c & 0xff) * f)
}

const _A=0,_B=1,_C=2,_D=3,_E=4,_F=5,_G=6,_H=7,_I=8,_J=9,_L=11
const _M=12,_N=13,_O=14,_P=15,_Q=16,_R=17,_S=18,_T=19,_U=20,_V=21
const _W=22,_X=23,_Y=24,_Z=25,_AA=26,_AB=27,_AC=28,_AD=29,_AE=30,_AF=31,_AG=32
// East-expansion columns (Bydel Øst + Stasjonsbyen eastern edge). _K is
// intentionally skipped in the naming convention; column 10 has no _ alias.
const _AH=33,_AI=34,_AJ=35,_AK=36,_AL=37,_AM=38,_AN=39,_AO=40

// ── Road data ─────────────────────────────────────────────────────────────────
interface HR{row:number;c1:number;c2:number;color:number;dash:boolean;lbl:string;rail?:boolean;boulevard?:boolean}
const HROADS:HR[]=[
  {row:1,c1:_U,c2:_AB,color:0xc0c0c0,dash:false,lbl:'Markedsveien'},
  {row:4,c1:_A,c2:_AG,color:0xc0c0c0,dash:true,lbl:'Parkvegen'},
  {row:7,c1:_C,c2:_S,color:0xc0c0c0,dash:true,lbl:'Fjellgata'},
  {row:11,c1:_A,c2:_U,color:0xc0c0c0,dash:true,lbl:'Brugata'},
  // Row 15 (Glomma) removed — replaced by central park + flanking buildings.
  // Row 16: was 'Glommengata' road alongside the river; now widened to a
  // boulevard ('Sentralgata') with median and tree-row, lighter asphalt.
  {row:16,c1:_A,c2:_AG,color:0xb8b8b8,dash:false,lbl:'Sentralgata',boulevard:true},
  {row:17,c1:_A,c2:_AG,color:0x666666,dash:false,lbl:'Jernbane',rail:true},
  {row:19,c1:_A,c2:_AG,color:0xc0c0c0,dash:true,lbl:'Jernbanegata'},
  {row:23,c1:_X,c2:_AE,color:0xc0c0c0,dash:false,lbl:''},
  // ── Bydel Øst (cols _AH–_AO) — eastern road grid ────────────────────────
  // Boulevard extension east through Bydel Øst.
  {row:16,c1:_AH,c2:_AO,color:0xb8b8b8,dash:false,lbl:'',boulevard:true},
  // Local east-west streets between the new east-side blocks.
  {row:8, c1:_AH,c2:_AO,color:0xc0c0c0,dash:true,lbl:''},
  {row:12,c1:_AH,c2:_AO,color:0xc0c0c0,dash:true,lbl:''},
  {row:17,c1:_AH,c2:_AO,color:0xc0c0c0,dash:true,lbl:''},
  {row:20,c1:_AH,c2:_AO,color:0xc0c0c0,dash:true,lbl:''},
  {row:23,c1:_AH,c2:_AO,color:0xc0c0c0,dash:true,lbl:''},
  // ── Stasjonsbyen (rader 27–34) — main rail line + southern street ──────
  {row:27,c1:_A, c2:_AO,color:0x666666,dash:false,lbl:'Jernbane Sør',rail:true},
  {row:33,c1:_A, c2:_AO,color:0xc0c0c0,dash:true,lbl:''},
]
interface VR{col:number;r1:number;r2:number;color:number;dash:boolean;lbl:string}
const VROADS:VR[]=[
  {col:_U,r1:1,r2:26,color:0xc0c0c0,dash:true,lbl:'Storgata'},
  {col:_N,r1:4,r2:11,color:0xc0c0c0,dash:true,lbl:'Tommelstads'},
  {col:_H,r1:4,r2:17,color:0xc0c0c0,dash:true,lbl:'Eidemsgate'},
  {col:_C,r1:4,r2:13,color:0xc0c0c0,dash:true,lbl:''},
  {col:_S,r1:8,r2:10,color:0xc0c0c0,dash:true,lbl:''},
  {col:_V,r1:11,r2:11,color:0xc0c0c0,dash:false,lbl:''},
  {col:_X,r1:19,r2:23,color:0xc0c0c0,dash:true,lbl:''},
  {col:_AE,r1:19,r2:23,color:0xc0c0c0,dash:true,lbl:''},
  // Bydel Øst north-south spine (rader 4–22).
  {col:_AK,r1:4, r2:22,color:0xc0c0c0,dash:true,lbl:''},
  // Stasjonsbyen — separates pedestrian street from east block, and bank from grocery.
  {col:_S, r1:28,r2:34,color:0xc0c0c0,dash:true,lbl:''},
  {col:_AA,r1:28,r2:34,color:0xc0c0c0,dash:true,lbl:''},
]
const ROAD_SINGLES=[{col:_S,row:12}]

// ── Building data ─────────────────────────────────────────────────────────────
interface BD{ca:number;ra:number;cb:number;rb:number;fill:number;border:number;bw?:number;dashed?:boolean
  name?:string;symbol?:string;header?:string;plaza?:boolean;fl?:number
  // Texture key from BootScene's MODERN_BUILDING_ASSETS. When set (and the
  // texture exists in cache) the building renders as a sprite; the procedural
  // box is only a fallback. Assignments follow docs/CITY_SLOT_REGISTRY.md.
  asset?:string
  // Manual facing override ('SE'|'SW'); default derived from adjacent streets
  // by facingOf() — see docs/ROTATION_AUDIT.md.
  facing?:Facing
  grid?:{cols:number;rows:number;units:string[]};zone?:string;rent?:number;traffic?:string;sqm?:number;cap?:number}

const B:BD[]=[
  {ca:_V,ra:2,cb:_V,rb:3,fill:0xffe8c0,border:0xd08020,name:'Hotell 🏨',fl:3,asset:'hotel'},
  {ca:_T,ra:2,cb:_T,rb:3,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:1,rows:2,units:['V','V']},zone:'gagata',rent:36000,traffic:'Middels',sqm:50,cap:110},
  {ca:_A,ra:5,cb:_B,rb:8,fill:0xd0e8f8,border:0x378add,bw:3,name:'Sykehuset 🏥',fl:3,asset:'sykehuset'},
  {ca:_D,ra:5,cb:_G,rb:6,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:4,rows:2,units:['🏠','🏠','🏠','🏠','🏠','🏠','🏠','🏠']}},
  {ca:_I,ra:6,cb:_L,rb:6,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:4,rows:1,units:['🏠','🏠','🏠','🏠']}},
  {ca:_I,ra:8,cb:_M,rb:8,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:5,rows:1,units:['🏠','🏠','🏠','🏠','🏠']}},
  {ca:_M,ra:5,cb:_M,rb:5,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:1,rows:1,units:['V']},zone:'hovedgata',rent:20000,traffic:'Middels',sqm:35,cap:60},
  {ca:_M,ra:6,cb:_M,rb:6,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:1,rows:1,units:['V']},zone:'hovedgata',rent:20000,traffic:'Middels',sqm:35,cap:60},
  {ca:_O,ra:5,cb:_Q,rb:6,fill:0xfff0f0,border:0xcc2020,grid:{cols:3,rows:2,units:['V','V','V','V','V','V']},zone:'gagata',rent:55000,traffic:'Høy',sqm:80,cap:180},
  {ca:_R,ra:5,cb:_T,rb:6,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:3,rows:2,units:['V','V','V','V','V','V']},zone:'gagata',rent:50000,traffic:'Høy',sqm:75,cap:170},
  {ca:_V,ra:5,cb:_V,rb:5,fill:0xb8e0f8,border:0x3182bd,symbol:'⛲',name:'⛲',fl:0},
  {ca:_W,ra:5,cb:_W,rb:5,fill:0xf0e8d0,border:0xa08040,symbol:'🎭',name:'🎭',fl:1,asset:'radhusteateret'},
  {ca:_V,ra:6,cb:_W,rb:7,fill:0xddd8c0,border:0xa09060,name:'Rådhuset 🏛️',fl:3,asset:'radhus'},
  {ca:_Z,ra:5,cb:_AA,rb:6,fill:0xb8e8ff,border:0x2080c0,name:'Kongsbadet 🏊',fl:2,asset:'kongsbadet'},
  {ca:_E,ra:8,cb:_G,rb:9,fill:0xfff0d0,border:0xe08000,name:'⛽ ESSO',fl:1,asset:'esso'},
  {ca:_O,ra:8,cb:_R,rb:8,fill:0xf0f8ff,border:0x6040a0,grid:{cols:4,rows:1,units:['V','V','V','Græb']},zone:'hovedgata',rent:28000,traffic:'Middels',sqm:55,cap:85},
  {ca:_V,ra:8,cb:_Y,rb:9,fill:0xcfc6b4,border:0xa89c84,plaza:true,name:'Rådhusplassen',fl:0},
  {ca:_Y,ra:7,cb:_Z,rb:7,fill:0xe8e0f8,border:0x6050b0,name:'📚 Bibliotek',fl:2,asset:'bibliotek'},
  {ca:_AA,ra:8,cb:_AB,rb:9,fill:0xd0e8f8,border:0x378add,name:'Sentrum VGS 🏫',fl:2,asset:'sentrum_vgs'},
  {ca:_Q,ra:9,cb:_Q,rb:9,fill:0xe8d8f0,border:0x9060b0,name:'Øyeklinikk',asset:'legekontor'},
  {ca:_R,ra:9,cb:_R,rb:9,fill:0xffd8b0,border:0xc06000,name:'Peders',asset:'peders'},
  {ca:_O,ra:9,cb:_P,rb:10,fill:0xf0f0ff,border:0x4060c0,grid:{cols:2,rows:2,units:['V','V','V','V']},zone:'hovedgata',rent:24000,traffic:'Middels',sqm:50,cap:80},
  {ca:_Q,ra:10,cb:_Q,rb:10,fill:0xffe0b0,border:0xe8a020,name:'Specsavers',asset:'optician'},
  {ca:_R,ra:10,cb:_R,rb:10,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:1,rows:1,units:['V']},zone:'hovedgata',rent:26000,traffic:'Middels',sqm:48,cap:78},
  {ca:_T,ra:9,cb:_T,rb:9,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:1,rows:1,units:['V']},zone:'hovedgata',rent:26000,traffic:'Middels',sqm:48,cap:78},
  {ca:_T,ra:10,cb:_T,rb:10,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:1,rows:1,units:['V']},zone:'hovedgata',rent:26000,traffic:'Middels',sqm:48,cap:78},
  {ca:_V,ra:10,cb:_Y,rb:10,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:4,rows:1,units:['V','V','V','V']},zone:'gagata',rent:45000,traffic:'Høy',sqm:65,cap:150},
  {ca:_J,ra:10,cb:_L,rb:10,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:3,rows:1,units:['V','V','V']},zone:'hovedgata',rent:22000,traffic:'Middels',sqm:42,cap:70},
  {ca:_A,ra:12,cb:_A,rb:13,fill:0xe8f8e0,border:0x40a020,name:'KIWI 🛒',asset:'kiwi'},
  {ca:_D,ra:12,cb:_G,rb:14,fill:0xfff8e8,border:0xc08000,bw:3,header:'KONGSSENTERET',fl:2,grid:{cols:2,rows:3,units:['Elkjøp','Normal','Nille','V','Lindex','KappAhl']},zone:'hovedgata',rent:30000,traffic:'Middels',sqm:60,cap:90},
  {ca:_I,ra:12,cb:_N,rb:13,fill:0xfff8e8,border:0xc08000,bw:3,header:'KONGSSENTERET',fl:2,grid:{cols:6,rows:2,units:['V','H&M','Norli','Cubus','Kicks','Intersport','Dressmann','XXL','Vita','Europris','V','Søstrene G']},zone:'hovedgata',rent:32000,traffic:'Middels',sqm:65,cap:100},
  {ca:_O,ra:12,cb:_R,rb:13,fill:0xfff8e8,border:0xc08000,bw:3,header:'KONGSSENTERET',fl:2,grid:{cols:4,rows:2,units:['C.Ohlson','Power','Vinmonopolet','V','Jernia','Nille','Apotek 1','V']},zone:'hovedgata',rent:34000,traffic:'Middels',sqm:70,cap:105},
  {ca:_T,ra:12,cb:_T,rb:13,fill:0xd8d8d8,border:0xaaaaaa,name:'P',symbol:'P'},
  {ca:_V,ra:12,cb:_V,rb:12,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:1,rows:1,units:['V']},zone:'hovedgata',rent:25000,traffic:'Middels',sqm:45,cap:75},
  {ca:_V,ra:13,cb:_V,rb:13,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:1,rows:1,units:['V']},zone:'hovedgata',rent:25000,traffic:'Middels',sqm:45,cap:75},
  {ca:_V,ra:18,cb:_V,rb:18,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:1,rows:1,units:['V']},zone:'utkant',rent:10000,traffic:'Lav',sqm:30,cap:40},
  {ca:_AE,ra:18,cb:_AG,rb:18,fill:0xd8e0f0,border:0x4060a0,bw:3,name:'SSB'},
  {ca:_AA,ra:18,cb:_AC,rb:18,fill:0xe8d8f8,border:0x6040a0,name:'🚉 Lokalstasjon',asset:'jernbanestasjon'},
  {ca:_W,ra:21,cb:_W,rb:21,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:1,rows:1,units:['V']},zone:'utkant',rent:10000,traffic:'Lav',sqm:32,cap:42},
  {ca:_W,ra:22,cb:_W,rb:22,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:1,rows:1,units:['V']},zone:'utkant',rent:10000,traffic:'Lav',sqm:32,cap:42},
  {ca:_Y,ra:20,cb:_AD,rb:20,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:6,rows:1,units:['V','V','V','V','V','V']},zone:'utkant',rent:14000,traffic:'Lav',sqm:40,cap:55},
  {ca:_V,ra:20,cb:_V,rb:20,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:1,rows:1,units:['V']},zone:'utkant',rent:10000,traffic:'Lav',sqm:30,cap:40},
  {ca:_W,ra:20,cb:_W,rb:20,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:1,rows:1,units:['V']},zone:'utkant',rent:10000,traffic:'Lav',sqm:30,cap:40},
  {ca:_Y,ra:22,cb:_AD,rb:22,fill:0xffe8e8,border:0xcc2020,dashed:true,grid:{cols:6,rows:1,units:['V','V','V','V','V','V']},zone:'utkant',rent:14000,traffic:'Lav',sqm:40,cap:55},
  {ca:_AF,ra:20,cb:_AG,rb:22,fill:0xe8f8e0,border:0x40a020,name:'Coop Mega 🛒'},
  // Scattered housing
  {ca:_A,ra:2,cb:_B,rb:3,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:2,rows:2,units:['🏠','🏠','🏠','🏠']}},
  {ca:_D,ra:2,cb:_F,rb:3,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:3,rows:2,units:['🏠','🏠','🏠','🏠','🏠','🏠']}},
  {ca:_I,ra:2,cb:_L,rb:3,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:4,rows:2,units:['🏠','🏠','🏠','🏠','🏠','🏠','🏠','🏠']}},
  {ca:_N,ra:2,cb:_P,rb:3,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:3,rows:2,units:['🏠','🏠','🏠','🏠','🏠','🏠']}},
  {ca:_Z,ra:2,cb:_AB,rb:3,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:3,rows:2,units:['🏠','🏠','🏠','🏠','🏠','🏠']}},
  {ca:_I,ra:5,cb:_L,rb:5,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:4,rows:1,units:['🏠','🏠','🏠','🏠']}},
  {ca:_AB,ra:5,cb:_AC,rb:6,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:2,rows:2,units:['🏠','🏠','🏠','🏠']}},
  {ca:_W,ra:7,cb:_X,rb:7,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:2,rows:1,units:['🏠','🏠']}},
  {ca:_D,ra:8,cb:_D,rb:9,fill:0xf0e8d8,border:0xa08860,fl:2,name:'🏠'},
  {ca:_I,ra:9,cb:_L,rb:9,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:4,rows:1,units:['🏠','🏠','🏠','🏠']}},
  {ca:_D,ra:10,cb:_G,rb:10,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:4,rows:1,units:['🏠','🏠','🏠','🏠']}},
  {ca:_I,ra:10,cb:_I,rb:10,fill:0xf0e8d8,border:0xa08860,fl:2,name:'🏠'},
  {ca:_M,ra:9,cb:_M,rb:10,fill:0xf0e8d8,border:0xa08860,fl:2,name:'🏠'},
  {ca:_AC,ra:8,cb:_AD,rb:9,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:2,rows:2,units:['🏠','🏠','🏠','🏠']}},
  {ca:_Z,ra:10,cb:_AB,rb:10,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:3,rows:1,units:['🏠','🏠','🏠']}},
  {ca:_B,ra:12,cb:_B,rb:13,fill:0xf0e8d8,border:0xa08860,fl:2,name:'🏠'},
  {ca:_A,ra:14,cb:_B,rb:14,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:2,rows:1,units:['🏠','🏠']}},
  {ca:_I,ra:14,cb:_L,rb:14,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:4,rows:1,units:['🏠','🏠','🏠','🏠']}},
  {ca:_O,ra:14,cb:_Q,rb:14,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:3,rows:1,units:['🏠','🏠','🏠']}},
  {ca:_V,ra:14,cb:_W,rb:14,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:2,rows:1,units:['🏠','🏠']}},
  {ca:_A,ra:18,cb:_D,rb:18,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:4,rows:1,units:['🏠','🏠','🏠','🏠']}},
  {ca:_I,ra:18,cb:_L,rb:18,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:4,rows:1,units:['🏠','🏠','🏠','🏠']}},
  {ca:_A,ra:20,cb:_D,rb:22,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:4,rows:3,units:['🏠','🏠','🏠','🏠','🏠','🏠','🏠','🏠','🏠','🏠','🏠','🏠']}},
  {ca:_I,ra:20,cb:_L,rb:22,fill:0xf0e8d8,border:0xa08860,fl:2,name:'Boliger',grid:{cols:4,rows:3,units:['🏠','🏠','🏠','🏠','🏠','🏠','🏠','🏠','🏠','🏠','🏠','🏠']}},
  // ── Row 15 — buildings flanking the central park (replaces Glomma) ──────
  // West side: leilighet (3F) / kontor (2F) / butikk (1F).
  // Centre cols _O–_U are the new park — no buildings there.
  // East side: kontor (3F) / leilighet (4F).
  // cb:10 on the Butikk spans _I–col10; _K is intentionally skipped in the
  // column-constant table so col 10 has no _ name.
  {ca:_A,ra:15,cb:_C,rb:15,fill:0xf0e8d8,border:0xa08860,fl:3,name:'Bolig'},
  {ca:_E,ra:15,cb:_G,rb:15,fill:0xd8e0f0,border:0x4060a0,fl:2,name:'Kontor'},
  {ca:_I,ra:15,cb:10,rb:15,fill:0xffe0b0,border:0xe8a020,fl:1,name:'Butikk'},
  {ca:_V,ra:15,cb:_Y,rb:15,fill:0xd8e0f0,border:0x4060a0,fl:3,name:'Kontor'},
  {ca:_AA,ra:15,cb:_AC,rb:15,fill:0xf0e8d8,border:0xa08860,fl:4,name:'Leilighet'},
  // ── Bydel Øst (cols _AH–_AO, rader 4–22) ─────────────────────────────────
  // Skole anker + idrettsanlegg + tennisbaner + bolig-mix (rekkehus/eneboliger/tomannsboliger).
  {ca:_AH,ra:4, cb:_AJ,rb:7, fill:0xe8e8d8,border:0xa09080,fl:3,name:'Sentrum ungdomsskole'},
  {ca:_AH,ra:9, cb:_AJ,rb:11,fill:0xc0d8e0,border:0x6090a0,fl:2,name:'Sentrum idrettshall'},
  {ca:_AK,ra:9, cb:_AO,rb:13,fill:0xc0a070,border:0x806040,plaza:true,fl:0,name:'Friidrettsanlegg'},
  {ca:_AK,ra:14,cb:_AM,rb:16,fill:0x4a7050,border:0x305030,plaza:true,fl:0,name:'Tennisbaner'},
  {ca:_AH,ra:18,cb:_AI,rb:19,fill:0xd8b888,border:0xa08060,fl:1,name:'Rekkehus'},
  {ca:_AJ,ra:18,cb:_AK,rb:19,fill:0xd8b888,border:0xa08060,fl:1,name:'Rekkehus'},
  {ca:_AL,ra:18,cb:_AM,rb:19,fill:0xe8d8c8,border:0xb09080,fl:1,name:'Enebolig'},
  {ca:_AN,ra:18,cb:_AO,rb:19,fill:0xe8d8c8,border:0xb09080,fl:1,name:'Enebolig'},
  {ca:_AH,ra:21,cb:_AJ,rb:22,fill:0xc8b898,border:0x907060,fl:2,name:'Tomannsbolig'},
  {ca:_AL,ra:21,cb:_AO,rb:22,fill:0xc8b898,border:0x907060,fl:2,name:'Tomannsbolig'},
  // ── Stasjonsbyen (rader 27–34) ───────────────────────────────────────────
  // Hovedstasjonen + gågate-butikker (nord rad 29, sør rad 32) + bank + dagligvare + boligkompleks.
  // NOTE: Hovedstasjonen footprint _M–_R overlaps rad-29 butikker per spec
  // (Restaurant _L–_M, Butikk _N–_O, Kafé _P–_R). Both kept literally; depth-sort
  // decides render order. Espen iterates visually if needed.
  {ca:_M, ra:28,cb:_R, rb:29,fill:0xd8d8c8,border:0xa09080,fl:2,name:'Hovedstasjonen'},
  {ca:_G, ra:29,cb:_H, rb:29,fill:0xf0d8a8,border:0xa08850,fl:1,name:'Butikk'},
  {ca:_I, ra:29,cb:_J, rb:29,fill:0xe8c898,border:0x986830,fl:1,name:'Butikk'},
  {ca:_L, ra:29,cb:_M, rb:29,fill:0xd8a878,border:0x884818,fl:1,name:'Restaurant'},
  {ca:_N, ra:29,cb:_O, rb:29,fill:0xf0d8a8,border:0xa08850,fl:1,name:'Butikk'},
  {ca:_P, ra:29,cb:_R, rb:29,fill:0xc89868,border:0x785820,fl:2,name:'Kafé'},
  {ca:_G, ra:32,cb:_H, rb:32,fill:0xe8c898,border:0x986830,fl:1,name:'Butikk'},
  {ca:_I, ra:32,cb:_J, rb:32,fill:0xd8b8b8,border:0xa08080,fl:1,name:'Boutique'},
  {ca:_L, ra:32,cb:_M, rb:32,fill:0xc8b898,border:0x907060,fl:1,name:'Bokhandel'},
  {ca:_N, ra:32,cb:_O, rb:32,fill:0xe8d8a8,border:0xa09060,fl:1,name:'Butikk'},
  {ca:_P, ra:32,cb:_R, rb:32,fill:0xd8d8e8,border:0xa0a0c0,fl:1,name:'Apotek'},
  {ca:_T, ra:30,cb:_V, rb:31,fill:0xc8d0d8,border:0x808890,fl:3,name:'Sparebanken'},
  {ca:_X, ra:30,cb:_Z, rb:31,fill:0x88c060,border:0x508030,fl:1,name:'Kiwi'},
  {ca:_AB,ra:30,cb:_AE,rb:33,fill:0xd8c8b8,border:0x988878,fl:5,name:'Stasjonsparken'},
  // ── Re-added per docs/CITY_SLOT_REGISTRY.md (slot #3) ────────────────────
  // Kirke at _R,2→_S,3 was lost in an earlier city rewrite; the lot has been
  // empty since. Appended last so existing registry indices stay stable.
  {ca:_R,ra:2,cb:_S,rb:3,fill:0xfff8f0,border:0xb0a090,fl:2,name:'⛪ Kirke',asset:'kirke'},
]

const GAGATE={c1:_Y,c2:_AD,row:21}
const PARK={ca:_W,ra:2,cb:_Y,rb:3}

// Exported for MiniMap
export { HROADS, VROADS, ROAD_SINGLES, B, GAGATE, PARK, _AG, _AO, _S, _H, _U, iso, isoC, toGrid }
export type { BD, HR, VR }

interface VE{id:string;zone:string;rent:number;footTraffic:string;capacity:number;sqm:number
  worldX:number;worldY:number;gca:number;gra:number;gcb:number;grb:number
  glow:Phaser.GameObjects.Graphics}

function getfl(b:BD):number{
  if(b.fl!==undefined)return b.fl; if(b.header)return 2; if(b.plaza)return 0; return 1
}

// ── Sprite sizing (DEL 2) — single source of truth, no per-asset numbers ────
// Width-fit against the plot diamond, height-clamped so elongated slots
// (4×1, 6×2 …) don't blow a ~square texture up into a tower.
const SPRITE_FILL=0.82      // sprite width as fraction of plot-diamond width
// scripts/trim-assets.py crops every raw PNG to its alpha bbox, so the wall
// base now touches the image bottom — origin y 1.0 puts it exactly on the
// plot centroid (bottom-center anchor).
const SPRITE_BASE_Y=1.0
const SPRITE_MAX_EXTRA_H=5*FH
function spriteScale(imgW:number,imgH:number,fw:number,fh:number):number{
  return Math.min(fw*SPRITE_FILL/imgW,(fh+SPRITE_MAX_EXTRA_H)/imgH)
}

// ── Filler wiring (DEL 6) — fallback sprite pools keyed by BD name ──────────
// Explicit b.asset always wins. A name maps to a pool of colour variants;
// pickVariant hashes plot coords so the choice is stable across reloads.
// Missing texture ⇒ procedural box remains as the emergency fallback.
// Grid BDs (Boliger/TIL LEIE/Kongssenteret) render one sprite PER CELL —
// cells are ~square so the shared scaling stays distortion-free; cells with
// no pool of their own use the generic storefront pool ('Butikk').
const FILLER:Record<string,string[]>={
  'Boliger':['boligblokk_lav_a','boligblokk_lav_b','boligblokk_lav_c'],
  '🏠':['enebolig_a','enebolig_b','enebolig_c'],
  'Bolig':['boligblokk_hoy_a'],
  'Leilighet':['boligblokk_hoy_b'],
  'Stasjonsparken':['boligblokk_hoy_c'],
  'Kontor':['kontorbygg_a','kontorbygg_b'],
  'SSB':['kontorbygg_c'],
  'Rekkehus':['rekkehus_a','rekkehus_b'],
  'Enebolig':['enebolig_a','enebolig_b','enebolig_c'],
  'Tomannsbolig':['tomannsbolig_a','tomannsbolig_b'],
  'Butikk':['butikklokale_a','butikklokale_b','butikklokale_c'],
  'Boutique':['fashion_shop'],
  'Restaurant':['restaurant_modern'],
  'Kafé':['cafe'],
  'Bokhandel':['bokhandel'],
  'Apotek':['apotek1'],
  'Sparebanken':['bank'],
  'Kiwi':['kiwi'],
  'Coop Mega 🛒':['coop_mega'],
  'Hovedstasjonen':['jernbanestasjon'],
  'Sentrum ungdomsskole':['skolebygg_a'],
  'Sentrum idrettshall':['idrettshall_a'],
  'P':['parkeringshus_a'],
}
function pickVariant(pool:string[],a:number,b:number):string{
  return pool[Math.abs(((a*31+b*17)|0))%pool.length]
}

// ── Kvartaler (KVARTALSBY) ───────────────────────────────────────────────────
// Sentrum-BDs grouped into Norwegian town blocks. Each kvartal renders ONE
// shared facade sprite over the combined footprint; member BDs (matched by
// footprint containment) draw no building of their own — their V-units
// become TIL LEIE hotspots at street level on the kvartal facade, with
// rent/sqm/capacity untouched from the slot data. Zone classification and
// this table are mirrored in docs/CITY_SLOT_REGISTRY.md. Missing texture ⇒
// members fall back to their normal filler/box rendering.
interface KV{id:string;ca:number;ra:number;cb:number;rb:number;asset:string}
const KVARTALER:KV[]=[
  {id:'K01',ca:_M,ra:5, cb:_M,rb:6, asset:'kvartal_smal_a'},
  {id:'K02',ca:_O,ra:5, cb:_Q,rb:6, asset:'kvartal_a'},
  {id:'K03',ca:_R,ra:5, cb:_T,rb:6, asset:'kvartal_b'},
  {id:'K04',ca:_T,ra:2, cb:_T,rb:3, asset:'kvartal_smal_b'},
  {id:'K05',ca:_O,ra:8, cb:_R,rb:8, asset:'kvartal_c'},
  {id:'K06',ca:_O,ra:9, cb:_P,rb:10,asset:'kvartal_d'},
  {id:'K07',ca:_T,ra:9, cb:_T,rb:10,asset:'kvartal_smal_a'},
  {id:'K08',ca:_V,ra:10,cb:_Y,rb:10,asset:'kvartal_e'},
  {id:'K09',ca:_J,ra:10,cb:_L,rb:10,asset:'kvartal_f'},
  {id:'K10',ca:_V,ra:12,cb:_V,rb:13,asset:'kvartal_smal_b'},
  // Kongssenteret: ONE shared kjopesenter texture, one sprite per block —
  // the three blocks are split by real streets (Eidemsgate m.fl.), so a
  // single sprite across all of them would paint over the road. Tenant
  // labels stay as text overlays on the facade.
  {id:'K11',ca:_D,ra:12,cb:_G,rb:14,asset:'kjopesenter'},
  {id:'K12',ca:_I,ra:12,cb:_N,rb:13,asset:'kjopesenter'},
  {id:'K13',ca:_O,ra:12,cb:_R,rb:13,asset:'kjopesenter'},
]
function kvartalOf(b:BD):KV|undefined{
  return KVARTALER.find(k=>b.ca>=k.ca&&b.cb<=k.cb&&b.ra>=k.ra&&b.rb<=k.rb)
}

// ── Facing (ORIENTERINGS-PASS) ───────────────────────────────────────────────
// The camera shows a building's SE (screen down-right) and SW (down-left)
// faces. facingOf() derives which one the facade should use from adjacent
// streets — rail rows excluded, named plazas/torg count as streets. The
// renderer then mirrors the sprite (flipX) when the asset's built-in facing
// (ASSET_BASE_FACING, default 'SE') disagrees. Streets on the NE/NW sides
// can NOT be faced with a mirror — those are flagged 'avvik-*' and listed
// in docs/ROTATION_AUDIT.md for a future NE/NW render pass.
type Facing='SE'|'SW'
interface FacingResult{facing:Facing;gate:string;source:string}
const FACING_TARGETS:Map<string,string>=(()=>{
  const m=new Map<string,string>()
  for(const r of HROADS){if(r.rail)continue;for(let c=r.c1;c<=r.c2;c++)m.set(`${c},${r.row}`,r.lbl||`vei rad ${r.row}`)}
  for(const v of VROADS)for(let row=v.r1;row<=v.r2;row++)m.set(`${v.col},${row}`,v.lbl||`vei kol ${v.col}`)
  for(const s of ROAD_SINGLES)m.set(`${s.col},${s.row}`,'vei')
  m.set(`${_S},7`,'Fjellgata')
  for(const b of B)if(b.plaza&&b.name)for(let c=b.ca;c<=b.cb;c++)for(let r=b.ra;r<=b.rb;r++)m.set(`${c},${r}`,b.name)
  return m
})()
function facingOf(ca:number,ra:number,cb:number,rb:number):FacingResult{
  const look=(cells:[number,number][]):string|null=>{
    for(const[c,r]of cells){const g=FACING_TARGETS.get(`${c},${r}`);if(g)return g}
    return null
  }
  const side=(which:Facing,dist:number):string|null=>{
    const cells:[number,number][]=[]
    if(which==='SW')for(let c=ca;c<=cb;c++)cells.push([c,rb+dist])
    else for(let r=ra;r<=rb;r++)cells.push([cb+dist,r])
    return look(cells)
  }
  // 1) Direct street contact on a camera-visible side (SW wins ties — the
  //    east-west hovedgater are the dominant street lines).
  for(const f of['SW','SE'] as Facing[]){const g=side(f,1);if(g)return{facing:f,gate:g,source:'gate'}}
  // 2) Street only on the back (NE/NW) — flipX cannot face it; flag it.
  const ne=look(Array.from({length:cb-ca+1},(_,i)=>[ca+i,ra-1] as [number,number]))
  const nw=look(Array.from({length:rb-ra+1},(_,i)=>[ca-1,ra+i] as [number,number]))
  if(ne)return{facing:'SW',gate:ne,source:'avvik-NE'}
  if(nw)return{facing:'SE',gate:nw,source:'avvik-NW'}
  // 3) No contact at all: inherit the nearest street within 4 tiles.
  for(let d=2;d<=4;d++)for(const f of['SW','SE'] as Facing[]){const g=side(f,d);if(g)return{facing:f,gate:g,source:'arvet'}}
  return{facing:'SW',gate:'(ingen)',source:'arvet'}
}
// Assets whose built-in facade faces SW (entrance/shopfront on the screen
// down-LEFT face). Everything else is assumed SE. Visually assessed
// 2026-06-12 — see docs/ROTATION_AUDIT.md; corner blocks (kvartal_a/d/e,
// kvartal_smal_*, boligblokk_hoy_b) are symmetric and never need a flip,
// they are left at the SE default.
const ASSET_BASE_FACING:Record<string,Facing>={
  kvartal_b:'SW',
  kontorbygg_a:'SW',kontorbygg_b:'SW',kontorbygg_c:'SW',
  rekkehus_a:'SW',rekkehus_b:'SW',
  enebolig_a:'SW',enebolig_b:'SW',enebolig_c:'SW',
  tomannsbolig_a:'SW',tomannsbolig_b:'SW',
  boligblokk_lav_b:'SW',boligblokk_lav_c:'SW',boligblokk_hoy_c:'SW',
  skolebygg_a:'SW',idrettshall_a:'SW',parkeringshus_a:'SW',
}
function flipFor(key:string,f:Facing):boolean{
  return f!==(ASSET_BASE_FACING[key]??'SE')
}

// Global xray toggle shared with React HUD
declare global { interface Window { __CITY_XRAY__: boolean } }
if (typeof window !== 'undefined' && window.__CITY_XRAY__ === undefined) window.__CITY_XRAY__ = false

// ── Global colour grade (DEL 3) ───────────────────────────────────────────────
// Full-scene PostFX: slightly warmer tones, +12% saturation, soft vignette.
// WebGL only; disabled with ?nofx=1 for A/B comparison.
const GRADE_FRAG=`
precision mediump float;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;
void main(){
  vec4 c=texture2D(uMainSampler,outTexCoord);
  vec3 col=c.rgb*vec3(1.05,1.00,0.93);
  float l=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(l),col,1.12);
  float d=distance(outTexCoord,vec2(0.5));
  col*=1.0-0.22*smoothstep(0.45,0.85,d);
  gl_FragColor=vec4(clamp(col,0.0,1.0),c.a);
}`
class CityGradePipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline{
  constructor(game:Phaser.Game){super({game,name:'CityGrade',fragShader:GRADE_FRAG})}
}

// ══════════════════════════════════════════════════════════════════════════════
export default class CityScene extends Phaser.Scene{
  private vb:VE[]=[]
  private hov:VE|null=null
  private cursors!:Phaser.Types.Input.Keyboard.CursorKeys
  private pLabel:Phaser.GameObjects.Text|null=null
  private dragging=false;private dsx=0;dsy=0;csx=0;csy=0;private vid=0
  private roadSet=new Set<string>()
  private railSet=new Set<string>()
  // Central list of ALL building graphics+texts for xray toggle
  private allBuildings:Phaser.GameObjects.GameObject[]=[]
  private xrayActive=false

  constructor(){super({key:'CityScene'})}

  create(){
    this.cameras.main.setBackgroundColor(0x4a8030)
    // DEL 3: colour grade on the whole scene unless ?nofx=1 (Canvas renderer
    // has no post pipelines — skip silently there).
    if(new URLSearchParams(window.location.search).get('nofx')!=='1'&&this.game.renderer.type===Phaser.WEBGL){
      const r=this.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer
      r.pipelines.addPostPipeline('CityGrade',CityGradePipeline)
      this.cameras.main.setPostPipeline(CityGradePipeline)
      console.log('[CityScene] colour grade ON (disable with ?nofx=1)')
    }
    this.buildRoadSet()
    this.drawGround()
    this.drawCurbs()
    this.drawZoneOverlays()
    this.drawBoulevard()
    this.drawPark()
    this.drawPedestrianStreet()
    this.drawKvartaler()
    this.drawBuildings()
    this.spawnCars()
    this.spawnPeds()
    this.setupCamera()
    this.setupInput()
    // Facing-audit (ORIENTERINGS-PASS DEL 1) — consumed by dev tooling to
    // produce docs/ROTATION_AUDIT.md. Cheap to compute; always exposed.
    ;(window as unknown as Record<string,unknown>).__FACING_AUDIT__={
      bds:B.map((b,i)=>{
        const base=b.plaza?{facing:'-',gate:'-',source:'plaza'}
          :b.facing?{facing:b.facing,gate:'(manuell)',source:'manuell'}
          :facingOf(b.ca,b.ra,b.cb,b.rb)
        return{i:i+1,name:b.name??b.header??(b.grid?'TIL LEIE':'?'),ca:b.ca,ra:b.ra,cb:b.cb,rb:b.rb,...base}
      }),
      kvartaler:KVARTALER.map(k=>({id:k.id,asset:k.asset,flip:flipFor(k.asset,facingOf(k.ca,k.ra,k.cb,k.rb).facing),...facingOf(k.ca,k.ra,k.cb,k.rb)})),
    }
    // Emit minimap data
    window.dispatchEvent(new CustomEvent('phaser:mapReady'))
    window.addEventListener('game:enterInterior',this.onEnter)
    window.addEventListener('game:locationRented',this.onRented)
  }
  shutdown(){window.removeEventListener('game:enterInterior',this.onEnter);window.removeEventListener('game:locationRented',this.onRented)}
  private onEnter=(e:Event)=>{
    const d=(e as CustomEvent).detail??{}
    this.scene.start('InteriorScene',{
      shopName:d.shopName??'',
      industry:d.industry??'fashion',
      totalStock:d.totalStock??0,
      storageCapacity:d.storageCapacity??100,
    })
  }
  private onRented=(e:Event)=>{
    const{id,companyName}=(e as CustomEvent).detail??{}
    const v=this.vb.find(b=>b.id===id);if(!v)return
    this.vb=this.vb.filter(b=>b.id!==id)
    this.cameras.main.pan(v.worldX,v.worldY,800,'Power2')
    if(this.pLabel)this.pLabel.destroy()
    this.pLabel=this.add.text(v.worldX,v.worldY-20,`🏪 ${companyName}`,{fontSize:'9px',fontFamily:'Outfit,sans-serif',color:'#00d4aa',stroke:'#000',strokeThickness:2,fontStyle:'bold'}).setOrigin(.5).setDepth(9999)
  }

  // ── Road set ──────────────────────────────────────────────────────────────
  private buildRoadSet(){
    for(const r of HROADS)for(let c=r.c1;c<=r.c2;c++){
      this.roadSet.add(`${c},${r.row}`)
      if(r.rail)this.railSet.add(`${c},${r.row}`)
    }
    for(const r of VROADS)for(let row=r.r1;row<=r.r2;row++)this.roadSet.add(`${r.col},${row}`)
    for(const s of ROAD_SINGLES)this.roadSet.add(`${s.col},${s.row}`)
    this.roadSet.add(`${_S},7`)
  }

  // Grass tone variation: 3 greens within ±3% brightness picked by a
  // deterministic tile hash — texture without a visible checkerboard at
  // normal zoom (DEL 7 dampened the original ±6% spread).
  private static GRASS=[0x7ec850,0x7ac24e,0x82cd52]
  private slotColor(c:number,r:number):number{
    const k=`${c},${r}`
    if(!this.roadSet.has(k)){
      if(r===GAGATE.row&&c>=GAGATE.c1&&c<=GAGATE.c2)return 0xc8b898
      return CityScene.GRASS[(c*7+r*13+((c*r)>>2))%3]
    }
    for(const h of HROADS)if(h.row===r&&c>=h.c1&&c<=h.c2){
      if(h.boulevard)return 0xb8b8b8;if(h.rail)return 0x555555;return 0xb0b0b0}
    if(c===_S&&r===7)return 0xc8a830
    return 0xb0b0b0
  }

  // ── Draw ground (all rows; boulevard + central park rendered as overlays) ─
  private drawGround(){
    const g=this.add.graphics().setDepth(0)
    for(let c=0;c<=_AO;c++)for(let r=1;r<=34;r++){
      const p=iso(c,r),col=this.slotColor(c,r)
      g.fillStyle(col,1);g.beginPath()
      g.moveTo(p.x,p.y);g.lineTo(p.x+TW/2,p.y+TH/2);g.lineTo(p.x,p.y+TH);g.lineTo(p.x-TW/2,p.y+TH/2)
      g.closePath();g.fillPath()
      g.lineStyle(1,0x000000,.05);g.strokePath()
    }
    // Park tiles
    const pg=this.add.graphics().setDepth(2)
    for(let c=PARK.ca;c<=PARK.cb;c++)for(let r=PARK.ra;r<=PARK.rb;r++){
      const p=iso(c,r)
      pg.fillStyle(0x90d468,1);pg.beginPath()
      pg.moveTo(p.x,p.y);pg.lineTo(p.x+TW/2,p.y+TH/2);pg.lineTo(p.x,p.y+TH);pg.lineTo(p.x-TW/2,p.y+TH/2)
      pg.closePath();pg.fillPath()
    }
    for(const[fx,fy] of [[_W+.3,2.3],[_X+.5,2.2],[_Y+.2,2.7],[_W+.7,3.5],[_X+.4,3.6],[_Y+.6,3.3]]){
      const p=isoC(fx,fy)
      pg.fillStyle(0x5a3a1a);pg.fillRect(p.x-2,p.y-12,4,14)
      pg.fillStyle(0x2a7a3e);pg.fillCircle(p.x,p.y-18,8)
      pg.fillStyle(0x3cb868,.5);pg.fillCircle(p.x+3,p.y-22,5)
    }
    this.add.text(isoC(_X,3).x,isoC(_X,3).y-5,'Byparken 🌳',{fontSize:'8px',fontFamily:'Outfit,sans-serif',color:'#2a5a18',fontStyle:'italic'}).setOrigin(.5).setDepth(3)
  }

  // ── Sidewalk curbs (DEL 2) ────────────────────────────────────────────────
  // Warm-cream sidewalk band (base_style_legacy palette: aged white / warm
  // cream) inside every non-road tile along edges shared with a road tile,
  // plus a darker curb line on the road edge itself. Rail edges get no curb.
  private drawCurbs(){
    const g=this.add.graphics().setDepth(1)
    const isRoad=(c:number,r:number)=>c>=0&&c<=_AO&&r>=1&&r<=34&&this.roadSet.has(`${c},${r}`)&&!this.railSet.has(`${c},${r}`)
    const K=0.26 // band depth, fraction of edge→tile-centre distance
    for(let c=0;c<=_AO;c++)for(let r=1;r<=34;r++){
      if(this.roadSet.has(`${c},${r}`))continue
      const p=iso(c,r)
      const T={x:p.x,y:p.y},R={x:p.x+TW/2,y:p.y+TH/2},Bt={x:p.x,y:p.y+TH},L={x:p.x-TW/2,y:p.y+TH/2}
      const C={x:p.x,y:p.y+TH/2}
      const edges:[boolean,{x:number,y:number},{x:number,y:number}][]=[
        [isRoad(c,r-1),T,R],[isRoad(c+1,r),R,Bt],[isRoad(c,r+1),L,Bt],[isRoad(c-1,r),T,L],
      ]
      for(const[hit,p1,p2]of edges){
        if(!hit)continue
        const q1={x:p1.x+(C.x-p1.x)*K,y:p1.y+(C.y-p1.y)*K},q2={x:p2.x+(C.x-p2.x)*K,y:p2.y+(C.y-p2.y)*K}
        g.fillStyle(0xd9d2c2,1);g.beginPath()
        g.moveTo(p1.x,p1.y);g.lineTo(p2.x,p2.y);g.lineTo(q2.x,q2.y);g.lineTo(q1.x,q1.y)
        g.closePath();g.fillPath()
        g.lineStyle(2,0xa49c8c,.9)
        g.beginPath();g.moveTo(p1.x,p1.y);g.lineTo(p2.x,p2.y);g.strokePath()
      }
    }
  }

  // ── Boulevard overlay on row 16 (Sentralgata) ────────────────────────────
  // Diagonal median stripe + tree row along the central east-west axis.
  // Replaces the old Glomma/Glommengata rendering; row 16 is now a wider
  // boulevard styled via a lighter asphalt + this overlay (median + trees).
  private drawBoulevard(){
    const bg=this.add.graphics().setDepth(2)
    // Median stripe — diagonal polyline along row-16 cell centres.
    bg.lineStyle(3,0x9a9a9a,1);bg.beginPath()
    for(let c=0;c<=_AO;c++){
      const p=isoC(c,16)
      if(c===0)bg.moveTo(p.x,p.y); else bg.lineTo(p.x,p.y)
    }
    bg.strokePath()
    // Tree row along the median — every other column for breathing room.
    for(let c=1;c<=_AO;c+=2){
      const p=isoC(c,16)
      bg.fillStyle(0x5a3a1a,1);bg.fillRect(p.x-1,p.y-6,2,7)
      bg.fillStyle(0x2a7a3e,1);bg.fillCircle(p.x,p.y-10,4)
      bg.fillStyle(0x3cb868,.5);bg.fillCircle(p.x+1,p.y-12,2)
    }
  }

  // ── Central park on row 15, cols _O–_U (replaces Glomma's central span) ──
  // Dark-green base + east-west path + scattered trees + label. Skips cells
  // that are part of a vertical road (Storgata _U) so the road shows through.
  private drawPark(){
    const pg=this.add.graphics().setDepth(2)
    // Dark-green base over the 7 park cells (skipping road overlap).
    pg.fillStyle(0x4a8030,1)
    for(let c=_O;c<=_U;c++){
      if(this.roadSet.has(`${c},15`))continue
      const p=iso(c,15)
      pg.beginPath()
      pg.moveTo(p.x,p.y);pg.lineTo(p.x+TW/2,p.y+TH/2);pg.lineTo(p.x,p.y+TH);pg.lineTo(p.x-TW/2,p.y+TH/2)
      pg.closePath();pg.fillPath()
    }
    // East-west path through park cell centres.
    pg.lineStyle(3,0xd0d0d0,1);pg.beginPath()
    for(let c=_O;c<=_U;c++){
      const p=isoC(c,15)
      if(c===_O)pg.moveTo(p.x,p.y); else pg.lineTo(p.x,p.y)
    }
    pg.strokePath()
    // Scattered trees — darker green than the boulevard trees.
    for(const[fx,fy] of [[_O+.3,15.2],[_P+.7,15.6],[_Q+.4,15.3],[_R+.6,15.7],[_S+.2,15.2],[_T+.7,15.6],[_U+.3,15.4]]){
      const p=isoC(fx,fy)
      pg.fillStyle(0x5a3a1a,1);pg.fillRect(p.x-2,p.y-12,4,14)
      pg.fillStyle(0x3a7020,1);pg.fillCircle(p.x,p.y-18,8)
      pg.fillStyle(0x4a9030,.5);pg.fillCircle(p.x+3,p.y-22,5)
    }
    this.add.text(isoC(_R,15).x,isoC(_R,15).y-5,'Sentralparken 🌳',{fontSize:'8px',fontFamily:'Outfit,sans-serif',color:'#2a5a18',fontStyle:'italic'}).setOrigin(.5).setDepth(3)
  }

  // ── Zone overlays (Bydel Øst + Stasjonsbyen) + Hovedstasjonen platform ───
  // Subtle pastel tints over non-road cells, drawn between ground (depth 0)
  // and boulevard/park/pedestrian overlays (depth 2). Platform stripe sits at
  // depth 1; the Hovedstasjonen building (depth ~460) will cover most of it —
  // it's a soft hint, not a strong visual.
  private drawZoneOverlays(){
    const zg=this.add.graphics().setDepth(1)
    const diamond=(c:number,r:number)=>{
      const p=iso(c,r)
      zg.beginPath()
      zg.moveTo(p.x,p.y);zg.lineTo(p.x+TW/2,p.y+TH/2);zg.lineTo(p.x,p.y+TH);zg.lineTo(p.x-TW/2,p.y+TH/2)
      zg.closePath();zg.fillPath()
    }
    // Bydel Øst — warm pastel, rader 4–22 cols _AH–_AO
    zg.fillStyle(0xfff0e0,0.18)
    for(let c=_AH;c<=_AO;c++)for(let r=4;r<=22;r++){
      if(this.roadSet.has(`${c},${r}`))continue
      diamond(c,r)
    }
    // Stasjonsbyen — cool pastel, rader 27–34 all cols
    zg.fillStyle(0xe8eaf0,0.20)
    for(let c=_A;c<=_AO;c++)for(let r=27;r<=34;r++){
      if(this.roadSet.has(`${c},${r}`))continue
      diamond(c,r)
    }
    // Hovedstasjonen platform stripe — light tile under the station front row.
    zg.fillStyle(0xeeeede,1)
    for(let c=_M;c<=_R;c++)diamond(c,28)
    // Zone labels — subtle, italic, depth 3 to sit above overlays.
    this.add.text(isoC((_AH+_AO)/2,5).x,isoC((_AH+_AO)/2,5).y-5,'Bydel Øst',{fontSize:'9px',fontFamily:'Outfit,sans-serif',color:'#a06840',fontStyle:'italic'}).setOrigin(.5).setDepth(3)
    this.add.text(isoC((_A+_AO)/2,27).x,isoC((_A+_AO)/2,27).y-10,'Stasjonsbyen',{fontSize:'9px',fontFamily:'Outfit,sans-serif',color:'#506080',fontStyle:'italic'}).setOrigin(.5).setDepth(3)
  }

  // ── Pedestrian street (Gågata) on rad 30–31 cols _G–_R ────────────────────
  // Stone-tile base + scattered café-table circles + label. Drawn at depth 2
  // (same layer as boulevard/park overlays). Skips any road cells.
  private drawPedestrianStreet(){
    const pg=this.add.graphics().setDepth(2)
    pg.fillStyle(0xe0d8c8,1)
    for(let c=_G;c<=_R;c++)for(let r=30;r<=31;r++){
      if(this.roadSet.has(`${c},${r}`))continue
      const p=iso(c,r)
      pg.beginPath()
      pg.moveTo(p.x,p.y);pg.lineTo(p.x+TW/2,p.y+TH/2);pg.lineTo(p.x,p.y+TH);pg.lineTo(p.x-TW/2,p.y+TH/2)
      pg.closePath();pg.fillPath()
    }
    // Café tables along the centre between the two pedestrian rows.
    for(let c=_G;c<=_R;c+=2){
      const p=isoC(c+.5,30.5)
      pg.fillStyle(0x8a6030,1);pg.fillCircle(p.x,p.y,3)
      pg.fillStyle(0xb89060,1);pg.fillCircle(p.x,p.y,2)
    }
    this.add.text(isoC((_G+_R)/2,30.5).x,isoC((_G+_R)/2,30.5).y,'Gågata 🚶',{fontSize:'8px',fontFamily:'Outfit,sans-serif',color:'#5a4030',fontStyle:'italic'}).setOrigin(.5).setDepth(3)
  }

  // ── Draw iso box ──────────────────────────────────────────────────────────
  private drawBox(g:Phaser.GameObjects.Graphics,ca:number,ra:number,cb:number,rb:number,floors:number,top:number,left:number,right:number){
    const h=floors*FH
    const nw=iso(ca,ra),ne=iso(cb+1,ra),se=iso(cb+1,rb+1),sw=iso(ca,rb+1)
    if(h>0){
      g.fillStyle(left,1);g.beginPath()
      g.moveTo(sw.x,sw.y-h);g.lineTo(se.x,se.y-h);g.lineTo(se.x,se.y);g.lineTo(sw.x,sw.y);g.closePath();g.fillPath()
      g.fillStyle(right,1);g.beginPath()
      g.moveTo(ne.x,ne.y-h);g.lineTo(se.x,se.y-h);g.lineTo(se.x,se.y);g.lineTo(ne.x,ne.y);g.closePath();g.fillPath()
      g.lineStyle(1,dk(right,.7),.4)
      g.beginPath();g.moveTo(se.x,se.y-h);g.lineTo(se.x,se.y);g.strokePath()
      g.beginPath();g.moveTo(sw.x,sw.y-h);g.lineTo(sw.x,sw.y);g.strokePath()
      g.beginPath();g.moveTo(ne.x,ne.y-h);g.lineTo(ne.x,ne.y);g.strokePath()
    }
    g.fillStyle(top,1);g.beginPath()
    g.moveTo(nw.x,nw.y-h);g.lineTo(ne.x,ne.y-h);g.lineTo(se.x,se.y-h);g.lineTo(sw.x,sw.y-h);g.closePath();g.fillPath()
    g.lineStyle(1,dk(top,.7),.3);g.strokePath()
  }

  // ── Global drop shadow (DEL 1, justert) ──────────────────────────────────
  // Soft ellipse under every building mass. w ≈ visual footprint width +10%,
  // peak opacity ~0.16 — same offset everywhere (sun in NW).
  private drawShadow(cx:number,cy:number,w:number,depth:number){
    const g=this.add.graphics().setDepth(depth)
    const h=w*0.5,ox=4,oy=2
    g.fillStyle(0x000000,0.06);g.fillEllipse(cx+ox,cy+oy,w,h)
    g.fillStyle(0x000000,0.10);g.fillEllipse(cx+ox,cy+oy,w*0.78,h*0.78)
    this.allBuildings.push(g)
  }

  // ── Baseplate (DEL 1) — procedural plot under every sprite building ───────
  // Fills the WHOLE slot diamond: light grey-beige paving with a thin curb,
  // clearly offset from the surrounding grass. Sits between terrain and the
  // building's shadow/sprite.
  private drawPlate(ca:number,ra:number,cb:number,rb:number,depth:number){
    const nw=iso(ca,ra),ne=iso(cb+1,ra),se=iso(cb+1,rb+1),sw=iso(ca,rb+1)
    const g=this.add.graphics().setDepth(depth)
    g.fillStyle(0xd8d2c4,1);g.beginPath()
    g.moveTo(nw.x,nw.y);g.lineTo(ne.x,ne.y);g.lineTo(se.x,se.y);g.lineTo(sw.x,sw.y)
    g.closePath();g.fillPath()
    g.lineStyle(2,0xb0a896,1);g.strokePath()
    this.allBuildings.push(g)
  }

  // ── Pad (ORIENTERINGS-PASS DEL 3) — plot under the FOOTPRINT only ─────────
  // Small diamond under the building mass + a narrow rim, instead of paving
  // the whole slot. Grass dominates between buildings again.
  private drawPad(cx:number,cy:number,w:number,depth:number){
    const h=w/2,by=cy+w*0.05 // bottom vertex slightly in front of the facade
    const g=this.add.graphics().setDepth(depth)
    g.fillStyle(0xd8d2c4,1);g.beginPath()
    g.moveTo(cx,by);g.lineTo(cx-w/2,by-h/2);g.lineTo(cx,by-h);g.lineTo(cx+w/2,by-h/2)
    g.closePath();g.fillPath()
    g.lineStyle(2,0xb0a896,1);g.strokePath()
    this.allBuildings.push(g)
  }

  // One sprite, bottom-center anchored on the plot centroid, scaled by the
  // shared spriteScale(). flipX mirrors the facade toward the slot's street
  // (DEL 2); shadow and pad are symmetric and unaffected by the flip. Pads
  // are skipped for kvartal sprites — the kvartal draws its own shared plate.
  private placeSprite(key:string,cx:number,cy:number,fw:number,fh:number,depth:number,flip=false,pad=true):Phaser.GameObjects.Image{
    const img=this.add.image(cx,cy,key)
    img.setScale(spriteScale(img.width,img.height,fw,fh)).setOrigin(0.5,SPRITE_BASE_Y).setDepth(depth)
    img.setFlipX(flip)
    if(pad)this.drawPad(cx,cy,img.displayWidth*1.12,depth-2)
    this.drawShadow(cx,cy,img.displayWidth*1.1,depth-1)
    this.allBuildings.push(img)
    return img
  }

  // ── Kvartaler (KVARTALSBY DEL 3) ──────────────────────────────────────────
  // One plate + one shared facade sprite per kvartal, spanning the combined
  // member footprint — same plate/scale/shadow pipeline as single buildings.
  private drawKvartaler(){
    for(const k of KVARTALER){
      if(!this.textures.exists(k.asset))continue
      const nw=iso(k.ca,k.ra),se=iso(k.cb+1,k.rb+1),sw=iso(k.ca,k.rb+1),ne=iso(k.cb+1,k.ra)
      const cx=(nw.x+se.x)/2,cy=(nw.y+se.y)/2
      const fw=ne.x-sw.x,fh=se.y-nw.y
      const depth=(k.cb+(k.rb-1))*10+2*5+10
      this.drawPlate(k.ca,k.ra,k.cb,k.rb,depth-2)
      const facing=facingOf(k.ca,k.ra,k.cb,k.rb).facing
      this.placeSprite(k.asset,cx,cy,fw,fh,depth,flipFor(k.asset,facing),false)
    }
  }

  // ── Draw buildings (depth sorted, ALL registered in allBuildings) ───────────
  private drawBuildings(){
    const sorted=[...B].sort((a,b)=>(a.cb+a.rb)-(b.cb+b.rb))
    for(const b of sorted){
      const floors=getfl(b)
      const depth=(b.cb+(b.rb-1))*10+floors*5+10
      // Footprint metrics: iso() is linear, so the diamond centroid is the
      // midpoint of nw/se. fw/fh = pixel size of the footprint diamond.
      const nw=iso(b.ca,b.ra),se=iso(b.cb+1,b.rb+1),sw=iso(b.ca,b.rb+1),ne=iso(b.cb+1,b.ra)
      const cx=(nw.x+se.x)/2,cy=(nw.y+se.y)/2
      const fw=ne.x-sw.x,fh=se.y-nw.y
      // KVARTALSBY: BDs inside a kvartal envelope draw no building of their
      // own — the shared kvartal facade (drawKvartaler) covers them.
      const kv=kvartalOf(b)
      const inKvartal=!!(kv&&this.textures.exists(kv.asset))
      // Sprite resolution: explicit asset > FILLER name pool > none.
      const pool=b.asset?[b.asset]:(b.name?FILLER[b.name]:undefined)
      const envKey=!b.grid&&pool&&!inKvartal?pickVariant(pool,b.ca,b.ra):null
      const useSprite=!!(envKey&&this.textures.exists(envKey))
      // Grid BDs render per-cell sprites instead of one stretched envelope.
      const cellPool=b.grid&&!inKvartal?((b.name&&FILLER[b.name])||FILLER['Butikk']):null
      const cellSprites=!!(cellPool&&cellPool.some(k=>this.textures.exists(k)))
      // Facing toward the slot's street (DEL 1/2); manual override wins.
      const facing=b.facing??facingOf(b.ca,b.ra,b.cb,b.rb).facing
      let img:Phaser.GameObjects.Image|null=null
      if(useSprite){
        img=this.placeSprite(envKey!,cx,cy,fw,fh,depth,flipFor(envKey!,facing))
      }else if(b.plaza){
        // Plaza/torg: per-tile alternating stone diamonds instead of one flat
        // box — reads as paving (DEL 2).
        const g=this.add.graphics().setDepth(depth)
        for(let c=b.ca;c<=b.cb;c++)for(let r=b.ra;r<=b.rb;r++){
          const p=iso(c,r)
          g.fillStyle(((c+r)&1)===0?b.fill:dk(b.fill,.92),1)
          g.beginPath()
          g.moveTo(p.x,p.y);g.lineTo(p.x+TW/2,p.y+TH/2);g.lineTo(p.x,p.y+TH);g.lineTo(p.x-TW/2,p.y+TH/2)
          g.closePath();g.fillPath()
        }
        this.allBuildings.push(g)
      }else if(!cellSprites&&!inKvartal){
        // Emergency fallback only: no sprite wired or texture file missing.
        this.drawShadow(cx,cy,fw*1.05,depth-1)
        const g=this.add.graphics().setDepth(depth)
        this.drawBox(g,b.ca,b.ra,b.cb,b.rb,floors,b.fill,dk(b.fill,.82),dk(b.fill,.65))
        this.allBuildings.push(g)
      }
      const center=isoC((b.ca+b.cb+1)/2,(b.ra+b.rb+1)/2)
      // Labels sit on the box roof — or just above the sprite's top edge.
      const ly=img?cy-img.displayHeight*SPRITE_BASE_Y-6:center.y-floors*FH
      if(b.header){const t=this.add.text(center.x,ly-4,b.header,{fontSize:'7px',fontFamily:'Outfit,sans-serif',color:'#6a4800',fontStyle:'bold',stroke:'#fff',strokeThickness:1}).setOrigin(.5).setDepth(depth+1);this.allBuildings.push(t)}
      if(b.symbol&&!useSprite){const t=this.add.text(center.x,ly+(b.name&&b.name.length>2?-6:0),b.symbol,{fontSize:'14px'}).setOrigin(.5).setDepth(depth+1);this.allBuildings.push(t)}
      if(b.name&&!b.grid&&!b.symbol&&!b.header){const t=this.add.text(center.x,ly,b.name,{fontSize:'7px',fontFamily:'Outfit,sans-serif',color:'#3a3020',fontStyle:'bold',stroke:'#fff',strokeThickness:1}).setOrigin(.5).setDepth(depth+1);this.allBuildings.push(t)}
      if(b.name&&b.symbol&&b.name.length>2){const t=this.add.text(center.x,ly+8,b.name.replace(/[⛲🎭]/g,'').trim(),{fontSize:'5px',fontFamily:'Outfit,sans-serif',color:'#3a3020',fontStyle:'bold',stroke:'#fff',strokeThickness:1}).setOrigin(.5).setDepth(depth+1);this.allBuildings.push(t)}
      if(b.grid){
        const cw=(b.cb-b.ca+1)/b.grid.cols,rh=(b.rb-b.ra+1)/b.grid.rows
        for(let i=0;i<b.grid.units.length;i++){
          const gc=i%b.grid.cols,gr=Math.floor(i/b.grid.cols)
          const uca=b.ca+gc*cw,ucb=b.ca+(gc+1)*cw,ura=b.ra+gr*rh,urb=b.ra+(gr+1)*rh
          const uc=isoC((uca+ucb)/2,(ura+urb)/2)
          // Kvartal members: TIL LEIE signs and tenant labels sit on the
          // facade at street level (DEL 4), not on a roof.
          let uy=inKvartal?uc.y-6:uc.y-floors*FH
          if(cellSprites){
            const key=pickVariant(cellPool!,Math.round(uca*7)+i,Math.round(ura*13))
            if(this.textures.exists(key)){
              // Cell centroid + cell diamond size; same shared scaling.
              const cc=iso((uca+ucb)/2,(ura+urb)/2)
              const cfw=((ucb-uca)+(urb-ura))*TW/2
              const s=this.placeSprite(key,cc.x,cc.y,cfw,cfw/2,depth+(gc+gr)*0.01,flipFor(key,facing))
              uy=cc.y-s.displayHeight*SPRITE_BASE_Y-4
            }
          }
          if(b.grid.units[i]==='V')this.mkV(uc.x,uy,uca,ura,ucb,urb,depth,b.zone!,b.rent!,b.traffic!,b.sqm!,b.cap!)
          else if(!b.grid.units[i].startsWith('🏠')){
            const t=this.add.text(uc.x,uy,b.grid.units[i],{fontSize:'6px',fontFamily:'Outfit,sans-serif',color:'#4a4030',stroke:'#fff',strokeThickness:1}).setOrigin(.5).setDepth(depth+1);this.allBuildings.push(t)
          }
        }
      }
    }
  }

  private mkV(cx:number,cy:number,gca:number,gra:number,gcb:number,grb:number,bd:number,zone:string,rent:number,traffic:string,sqm:number,cap:number){
    const id=`v${String(++this.vid).padStart(2,'0')}`
    const rv=rent+Math.round((Math.random()-.5)*rent*.06),sv=sqm+Math.round((Math.random()-.5)*6),cv=cap+Math.round((Math.random()-.5)*8)
    const sd=bd+50
    const sg=this.add.graphics().setDepth(sd)
    sg.fillStyle(0x8b6914);sg.fillRect(cx-1,cy+1,2,8)
    sg.fillStyle(0xd4a056);sg.fillRoundedRect(cx-18,cy-6,36,11,2)
    sg.lineStyle(1,0x8b6914,1);sg.strokeRoundedRect(cx-18,cy-6,36,11,2)
    const st=this.add.text(cx,cy-1,'TIL LEIE',{fontSize:'6px',fontFamily:'Outfit,sans-serif',color:'#4a3520',fontStyle:'bold'}).setOrigin(.5).setDepth(sd+1)
    this.allBuildings.push(sg,st)
    const glow=this.add.graphics().setDepth(sd+2)
    glow.lineStyle(2,0x38bdf8,1);glow.strokeRect(cx-25,cy-14,50,28);glow.setAlpha(0)
    this.vb.push({id,zone,rent:rv,footTraffic:traffic,capacity:cv,sqm:sv,worldX:cx,worldY:cy,gca,gra,gcb,grb,glow})
  }

  // ── Cars ──────────────────────────────────────────────────────────────────
  private spawnCars(){
    const cc=[0xe74c3c,0x3498db,0x2ecc71,0xf1c40f,0x9b59b6,0xe67e22,0x1abc9c,0x34495e,0xc0392b,0x2980b9,0x27ae60,0xf39c12,0x8e44ad,0xd35400,0x16a085,0x2c3e50,0x95a5a6,0xbdc3c7]
    for(let i=0;i<6;i++){const s=isoC(i*5,16);this.mkCar(s.x,s.y,16,cc[i],0,_AO)}
    for(let i=0;i<4;i++){const s=isoC(i*5,11);this.mkCar(s.x,s.y,11,cc[6+i],0,_U)}
    for(let i=0;i<4;i++){const s=isoC(_U,2+i*4);this.mkCarV(s.x,s.y,_U,cc[10+i%4],1,20)}
    // Bydel Øst + Stasjonsbyen — 4 additional cars (~30% more total).
    {const s=isoC(_AH,8); this.mkCar(s.x,s.y,8,cc[14],_AH,_AO)}
    {const s=isoC(_AH,23);this.mkCar(s.x,s.y,23,cc[15],_AH,_AO)}
    {const s=isoC(_AK,4); this.mkCarV(s.x,s.y,_AK,cc[16],4,22)}
    {const s=isoC(0,33);  this.mkCar(s.x,s.y,33,cc[17],_A,_AO)}
  }
  private mkCar(px:number,py:number,row:number,color:number,c1:number,c2:number){
    const g=this.add.graphics().setDepth(500);g.fillStyle(color,1);g.fillRoundedRect(-8,-5,16,10,2);g.fillStyle(0xffffff,.25);g.fillRect(5,-3,2,6);g.setPosition(px,py)
    const drive=()=>{const tc=c1+Math.random()*(c2-c1);const tp=isoC(tc,row);const d=Phaser.Math.Distance.Between(g.x,g.y,tp.x,tp.y);g.setDepth((tc+(row-1))*10+50);this.tweens.add({targets:g,x:tp.x,y:tp.y,duration:d*4+300,ease:'Linear',onComplete:drive})}
    this.time.delayedCall(Math.random()*3000,drive)
  }
  private mkCarV(px:number,py:number,col:number,color:number,r1:number,r2:number){
    const g=this.add.graphics().setDepth(500);g.fillStyle(color,1);g.fillRoundedRect(-5,-8,10,16,2);g.fillStyle(0xffffff,.25);g.fillRect(-3,-6,6,2);g.setPosition(px,py)
    const drive=()=>{const tr=r1+Math.random()*(r2-r1);const tp=isoC(col,tr);const d=Phaser.Math.Distance.Between(g.x,g.y,tp.x,tp.y);g.setDepth((col+(tr-1))*10+50);this.tweens.add({targets:g,x:tp.x,y:tp.y,duration:d*4+300,ease:'Linear',onComplete:drive})}
    this.time.delayedCall(Math.random()*3000,drive)
  }

  // ── Pedestrians ───────────────────────────────────────────────────────────
  private spawnPeds(){
    const pc=[0x38bdf8,0xa855f7,0xf97316,0x22c55e,0xff6b6b,0xfbbf24,0xf472b6,0x34d399,0x818cf8,0xfb7185]
    for(let i=0;i<6;i++)this.mkPed(11,pc[i],0,_U)
    for(let i=0;i<4;i++)this.mkPed(4,pc[6+i],0,_AG)
  }
  private mkPed(row:number,color:number,c1:number,c2:number){
    const sc_=c1+Math.random()*(c2-c1);const sp=isoC(sc_,row+.3)
    const c=this.add.container(sp.x,sp.y).setDepth(500);const b=this.add.graphics()
    b.fillStyle(0,.08);b.fillEllipse(0,4,8,4);b.fillStyle(color);b.fillCircle(0,0,4);b.fillStyle(0xffffff,.4);b.fillCircle(-1,-1,1.5);c.add(b)
    const walk=()=>{const tc=c1+Math.random()*(c2-c1);const tp=isoC(tc,row+.3+(Math.random()-.5)*.4);const d=Phaser.Math.Distance.Between(c.x,c.y,tp.x,tp.y);c.setDepth((tc+(row-1))*10+48);this.tweens.add({targets:c,x:tp.x,y:tp.y,duration:d*12+200,ease:'Linear',onComplete:walk})}
    this.time.delayedCall(Math.random()*2000,walk)
  }

  // ── Camera ────────────────────────────────────────────────────────────────
  private setupCamera(){const c=isoC(_Q,10);this.cameras.main.centerOn(c.x,c.y);this.cameras.main.setZoom(.65)}

  // ── Input ─────────────────────────────────────────────────────────────────
  private setupInput(){
    const cam=this.cameras.main,canvas=this.game.canvas;this.cursors=this.input.keyboard!.createCursorKeys()
    // Ikke blokker Space (og andre taster) i input/textarea-elementer
    this.input.keyboard!.removeCapture(Phaser.Input.Keyboard.KeyCodes.SPACE)
    const hit=(px:number,py:number):VE|null=>{if(window.__OVERLAY_OPEN__)return null;const wp=cam.getWorldPoint(px,py);for(const v of this.vb)if(Math.abs(wp.x-v.worldX)<28&&Math.abs(wp.y-v.worldY)<16)return v;return null}
    this.input.on('pointermove',(p:Phaser.Input.Pointer)=>{if(window.__OVERLAY_OPEN__)return;if(this.dragging){cam.scrollX=this.csx+(this.dsx-p.x)/cam.zoom;cam.scrollY=this.csy+(this.dsy-p.y)/cam.zoom;return}
      const h=hit(p.x,p.y);if(h!==this.hov){if(this.hov){this.tweens.killTweensOf(this.hov.glow);this.tweens.add({targets:this.hov.glow,alpha:0,duration:150})}this.hov=h;if(h){this.tweens.add({targets:h.glow,alpha:1,duration:150});canvas.style.cursor='pointer'}else canvas.style.cursor='default'}})
    this.input.on('pointerdown',(p:Phaser.Input.Pointer)=>{if(window.__OVERLAY_OPEN__)return;if(!hit(p.x,p.y)){this.dragging=true;this.dsx=p.x;this.dsy=p.y;this.csx=cam.scrollX;this.csy=cam.scrollY;canvas.style.cursor='grab'}})
    this.input.on('pointerup',(p:Phaser.Input.Pointer)=>{if(this.dragging){this.dragging=false;canvas.style.cursor='default';if(Math.abs(p.x-this.dsx)>5||Math.abs(p.y-this.dsy)>5)return}
      if(window.__OVERLAY_OPEN__)return;const h=hit(p.x,p.y);if(!h)return;this.tweens.killTweensOf(h.glow);h.glow.setAlpha(0);this.hov=null;canvas.style.cursor='default'
      cam.pan(h.worldX,h.worldY,500,'Power2');window.dispatchEvent(new CustomEvent('phaser:vacantClicked',{detail:{id:h.id,label:'TIL LEIE',zone:h.zone,rent:h.rent,footTraffic:h.footTraffic,sqm:h.sqm,capacity:h.capacity,worldX:h.worldX,worldY:h.worldY}}))})
    document.addEventListener('pointerup',()=>{if(this.dragging){this.dragging=false;canvas.style.cursor='default'}})
    this.input.on('wheel',(_:unknown,__:unknown,___:number,dy:number)=>{if(window.__OVERLAY_OPEN__)return;cam.setZoom(Phaser.Math.Clamp(cam.zoom-dy*.001,.25,2.0))})
  }

  update(){
    if(window.__OVERLAY_OPEN__)return
    const cam=this.cameras.main,s=6/cam.zoom
    if(this.cursors.left.isDown)cam.scrollX-=s;if(this.cursors.right.isDown)cam.scrollX+=s
    if(this.cursors.up.isDown)cam.scrollY-=s;if(this.cursors.down.isDown)cam.scrollY+=s
    // Xray toggle: apply alpha to ALL buildings when state changes
    if(window.__CITY_XRAY__!==this.xrayActive){
      this.xrayActive=window.__CITY_XRAY__
      const a=this.xrayActive?0.25:1.0
      for(const obj of this.allBuildings)(obj as Phaser.GameObjects.Graphics).setAlpha(a)
    }
    // Emit camera state for minimap
    window.dispatchEvent(new CustomEvent('phaser:cameraUpdate',{detail:{scrollX:cam.scrollX,scrollY:cam.scrollY,zoom:cam.zoom,width:cam.width,height:cam.height}}))
  }
}
