import Phaser from 'phaser'

export interface BuildingColors {
  top: number    // hex number e.g. 0x14b8a6
  left: number
  right: number
}

/** Draw an isometric box building using Phaser Graphics.
 *  bx/by = bottom-center of the building in world coords
 *  w = half-width of tile, h = height of building, d = depth (tile height)
 */
export function drawIsoBuilding(
  scene: Phaser.Scene,
  bx: number, by: number,
  w: number, h: number, d: number,
  colors: BuildingColors
): Phaser.GameObjects.Graphics {
  const g = scene.add.graphics()

  // Top face (parallelogram)
  g.fillStyle(colors.top, 1)
  g.beginPath()
  g.moveTo(bx,      by - h - d)
  g.lineTo(bx + w,  by - h - d + d/2)
  g.lineTo(bx,      by - h)
  g.lineTo(bx - w,  by - h + d/2)
  g.closePath()
  g.fillPath()

  // Left face
  g.fillStyle(colors.left, 1)
  g.beginPath()
  g.moveTo(bx - w, by - h + d/2)
  g.lineTo(bx,     by - h)
  g.lineTo(bx,     by)
  g.lineTo(bx - w, by + d/2)
  g.closePath()
  g.fillPath()

  // Right face
  g.fillStyle(colors.right, 1)
  g.beginPath()
  g.moveTo(bx + w, by - h - d + d/2)
  g.lineTo(bx,     by - h)
  g.lineTo(bx,     by)
  g.lineTo(bx + w, by - d/2)
  g.closePath()
  g.fillPath()

  return g
}
