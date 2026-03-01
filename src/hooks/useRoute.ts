import { useState } from 'react'

export interface RouteState {
  coords: [number, number][] | null
  distance: string | null
  duration: string | null
  loading: boolean
  error: string | null
}

const ORS_KEY = import.meta.env.VITE_ORS_API_KEY as string

export function useRoute() {
  const [state, setState] = useState<RouteState>({
    coords: null,
    distance: null,
    duration: null,
    loading: false,
    error: null,
  })

  async function fetchRoute(destination: { lat: number; lng: number }) {
    setState({ coords: null, distance: null, duration: null, loading: true, error: null })

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 })
      )

      const { latitude, longitude } = position.coords

      const response = await fetch(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
        {
          method: 'POST',
          headers: {
            Authorization: ORS_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coordinates: [
              [longitude, latitude],
              [destination.lng, destination.lat],
            ],
          }),
        }
      )

      if (!response.ok) throw new Error('Erro na API')

      const data = await response.json()
      const feature = data.features[0]

      const coords: [number, number][] = feature.geometry.coordinates.map(
        ([lon, lat]: [number, number]) => [lat, lon]
      )

      const summary = feature.properties.summary
      const km = (summary.distance / 1000).toFixed(1)
      const min = Math.round(summary.duration / 60)

      setState({
        coords,
        distance: `${km} km`,
        duration: `${min} min`,
        loading: false,
        error: null,
      })
    } catch (e) {
      const isGeoError = e instanceof GeolocationPositionError
      setState({
        coords: null,
        distance: null,
        duration: null,
        loading: false,
        error: isGeoError
          ? 'Permita o acesso à sua localização para traçar a rota.'
          : 'Não foi possível traçar a rota. Tente novamente.',
      })
    }
  }

  function clearRoute() {
    setState({ coords: null, distance: null, duration: null, loading: false, error: null })
  }

  return { ...state, fetchRoute, clearRoute }
}
