import type { CollectionPoint } from '../types/CollectionPoint'

export function haversineKm(a: [number, number], b: [number, number]): number {
  const R = 6371
  const dLat = ((b[0] - a[0]) * Math.PI) / 180
  const dLon = ((b[1] - a[1]) * Math.PI) / 180
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a[0] * Math.PI) / 180) *
      Math.cos((b[0] * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
}

/**
 * Minimum perpendicular distance (km) from point P to segment AB,
 * using a local planar projection for accuracy at city scale.
 */
export function pointToSegmentKm(
  p: [number, number],
  a: [number, number],
  b: [number, number]
): number {
  const R = 6371000 // metres
  const lat0 = (a[0] + b[0]) / 2
  const cosLat = Math.cos((lat0 * Math.PI) / 180)
  const toM = Math.PI / 180

  const px = (p[1] - a[1]) * cosLat * toM * R
  const py = (p[0] - a[0]) * toM * R
  const bx = (b[1] - a[1]) * cosLat * toM * R
  const by = (b[0] - a[0]) * toM * R

  const lenSq = bx * bx + by * by
  if (lenSq === 0) return Math.sqrt(px * px + py * py) / 1000

  const t = Math.max(0, Math.min(1, (px * bx + py * by) / lenSq))
  const dx = px - t * bx
  const dy = py - t * by
  return Math.sqrt(dx * dx + dy * dy) / 1000
}

/**
 * Returns true if the collection point lies within `thresholdKm` of any
 * segment in the route polyline (default 60 m — same-street precision).
 */
export function isNearRoute(
  point: CollectionPoint,
  route: [number, number][],
  thresholdKm = 0.06
): boolean {
  const p: [number, number] = [point.coordinates.lat, point.coordinates.lng]
  for (let i = 0; i < route.length - 1; i++) {
    if (pointToSegmentKm(p, route[i], route[i + 1]) <= thresholdKm) return true
  }
  return false
}
