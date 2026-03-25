export const TILE_W = 128
export const TILE_H = 64

export function cartToIso(cx: number, cy: number) {
  return {
    x: (cx - cy) * (TILE_W / 2),
    y: (cx + cy) * (TILE_H / 2),
  }
}

export function isoToCart(ix: number, iy: number) {
  return {
    x: (ix / (TILE_W / 2) + iy / (TILE_H / 2)) / 2,
    y: (iy / (TILE_H / 2) - ix / (TILE_W / 2)) / 2,
  }
}
