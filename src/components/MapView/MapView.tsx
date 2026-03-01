import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { CollectionPoint } from '../../types/CollectionPoint'
import type { RouteResult } from '../../types/Route'
import { redIcon, blueIcon, greenIcon } from '../../utils/mapIcons'
import { isNearRoute } from '../../utils/routeGeometry'
import RoutePanel from '../RoutePanel/RoutePanel'
import styles from './MapView.module.css'

interface Props {
  points: CollectionPoint[]
  selectedId: string | null
  onMarkerClick: (id: string) => void
}

const JF_CENTER: [number, number] = [-21.7642, -43.3503]

function MapFlyController({ selectedId, points }: { selectedId: string | null; points: CollectionPoint[] }) {
  const map = useMap()

  useEffect(() => {
    if (!selectedId) return
    const point = points.find((p) => p.id === selectedId)
    if (point) {
      map.flyTo([point.coordinates.lat, point.coordinates.lng], 16, { duration: 1.2 })
    }
  }, [selectedId, points, map])

  return null
}

export default function MapView({ points, selectedId, onMarkerClick }: Props) {
  const [routeCoords, setRouteCoords] = useState<[number, number][] | null>(null)
  const [routeInfo, setRouteInfo] = useState<{ distanceKm: number; durationMin: number } | null>(null)
  const [nearbyIds, setNearbyIds] = useState<Set<string>>(new Set())

  function handleRouteResult(result: RouteResult | null) {
    if (!result) {
      setRouteCoords(null)
      setRouteInfo(null)
      setNearbyIds(new Set())
      return
    }
    setRouteCoords(result.coords)
    setRouteInfo({ distanceKm: result.distanceKm, durationMin: result.durationMin })
    const ids = new Set(points.filter((p) => isNearRoute(p, result.coords)).map((p) => p.id))
    setNearbyIds(ids)
  }
  return (
    <div className={styles.wrapper}>
      <MapContainer
        center={JF_CENTER}
        zoom={13}
        className={styles.map}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapFlyController selectedId={selectedId} points={points} />

        {routeCoords && (
          <Polyline
            positions={routeCoords}
            pathOptions={{ color: '#3b82f6', weight: 5, opacity: 0.85 }}
          />
        )}

        {points.map((point) => {
          const isNearby = nearbyIds.has(point.id)
          const icon = isNearby ? greenIcon : point.type === 'abrigo' ? blueIcon : redIcon
          return (
            <Marker
              key={point.id}
              position={[point.coordinates.lat, point.coordinates.lng]}
              icon={icon}
              eventHandlers={{ click: () => onMarkerClick(point.id) }}
            >
              <Popup>
                <div className={styles.popup}>
                  <strong>{point.name}</strong>
                  <br />
                  <span>{point.type === 'abrigo' ? '🏠 Abrigo' : '📦 Ponto de Coleta'}</span>
                  <br />
                  <span>{point.address}, {point.neighborhood}</span>
                  <br />
                  <span>⏰ {point.hours}</span>
                  <br />
                  {point.phone && (
                    <a href={`tel:${point.phone.replace(/\D/g, '')}`}>{point.phone}</a>
                  )}
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      <RoutePanel onResult={handleRouteResult} />

      {routeInfo && (
        <div className={styles.routeSummary}>
          🗺️ {routeInfo.distanceKm} km — {routeInfo.durationMin} min de carro
          {nearbyIds.size > 0 && (
            <span className={styles.nearbyCount}>
              • {nearbyIds.size} ponto{nearbyIds.size > 1 ? 's' : ''} na rota
            </span>
          )}
        </div>
      )}

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#e74c3c' }} />
          Ponto de Coleta
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#3b82f6' }} />
          Abrigo
        </div>
        {nearbyIds.size > 0 && (
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#22c55e' }} />
            Na sua rota
          </div>
        )}
      </div>
    </div>
  )
}
