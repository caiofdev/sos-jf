import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { CollectionPoint } from '../../types/CollectionPoint'
import styles from './MapView.module.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

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

        {points.map((point) => (
          <Marker
            key={point.id}
            position={[point.coordinates.lat, point.coordinates.lng]}
            icon={redIcon}
            eventHandlers={{ click: () => onMarkerClick(point.id) }}
          >
            <Popup>
              <div className={styles.popup}>
                <strong>{point.name}</strong>
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
        ))}
      </MapContainer>

      {selectedId && (
        <div className={styles.badge}>
          📍 Ponto selecionado — veja os detalhes na lista abaixo
        </div>
      )}
    </div>
  )
}
