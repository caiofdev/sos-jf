import type { RouteResult } from '../types/Route'

const WORKER_URL = 'https://v1-ors.sos-jf.workers.dev'

/**
 * Geocodes an address using Nominatim, appending Juiz de Fora context.
 * Returns [lon, lat] as expected by ORS.
 */
export async function geocode(address: string): Promise<[number, number]> {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    address + ', Juiz de Fora, MG, Brasil'
  )}&format=json&limit=1`
  const res = await fetch(url, { headers: { 'User-Agent': 'SOS-JF/1.0' } })
  const data = await res.json()
  if (!data.length) throw new Error(`Endereço não encontrado: "${address}"`)
  return [parseFloat(data[0].lon), parseFloat(data[0].lat)]
}

/**
 * Resolves the user's current GPS position.
 * Returns [lon, lat] as expected by ORS.
 */
export function getGPSCoords(): Promise<[number, number]> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve([pos.coords.longitude, pos.coords.latitude]),
      reject,
      { timeout: 10000 }
    )
  )
}

/**
 * Calculates a driving route between two [lon, lat] coordinates using ORS.
 */
export async function calculateRoute(
  origin: [number, number],
  destination: [number, number]
): Promise<RouteResult> {
  
  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ coordinates: [origin, destination] }),
  })

  if (!response.ok) throw new Error('Erro ao calcular rota')

  const data = await response.json()
  const coords: [number, number][] = data.features[0].geometry.coordinates.map(
    ([lon, lat]: [number, number]) => [lat, lon]
  )
  const props = data.features[0].properties.summary

  return {
    coords,
    distanceKm: parseFloat((props.distance / 1000).toFixed(1)),
    durationMin: Math.round(props.duration / 60),
  }
}