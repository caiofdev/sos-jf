import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { CollectionPoint } from '../../types/CollectionPoint'
import type { RouteResult } from '../../types/Route'
import { redIcon, blueIcon, greenIcon } from '../../utils/mapIcons'
import { isNearRoute } from '../../utils/routeGeometry'
import { AlertTriangle, Clock, Copy, CopyCheck, House, MapPin, Package, Phone, Map, X, LocateFixed, Lightbulb, Info} from 'lucide-react';
import RoutePanel from '../RoutePanel/RoutePanel'
import styles from './MapView.module.css'
import { useIsMobile } from '../../hooks/useIsMobile'

const GMAIL_BASE =
  'https://mail.google.com/mail/?view=cm&to=caiofreis2005@gmail.com&su=Informa%C3%A7%C3%B5es+incorretas+%E2%80%94+SOS+JF&body=Ol%C3%A1%2C%0A%0AIdentifiquei+uma+informa%C3%A7%C3%A3o+incorreta+no+site+SOS+JF%3A%0A%0ALocal%3A+'

function PointPopup({ point }: { point: CollectionPoint }) {
  const [copied, setCopied] = useState(false)

  function copyPhone(e: React.MouseEvent) {
    e.stopPropagation()
    navigator.clipboard.writeText(point.phone.replace(/\D/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reportUrl = GMAIL_BASE + encodeURIComponent(point.name) + '%0AProblema%3A+'

  return (
    <div className={styles.popup}>
      <strong>{point.name}</strong>
      <span className={styles.popupRow}>
        {point.type === "abrigo" ? <House className={styles.popupHouseIcon} /> : <Package className={styles.popupPackageIcon} />}
        {point.type === "abrigo" ? "Abrigo" : "Ponto de Coleta"}
      </span>
      <span className={styles.popupRow}>
        <MapPin className={styles.popupMapPinIcon} /> {point.address}, {point.neighborhood}
      </span>
      <span className={styles.popupRow}>
        <Clock className={styles.popupClockIcon}/> {point.hours}
      </span>
      {point.phone && (
        <div className={styles.popupPhoneRow}>
          <Phone className={styles.popupPhoneIcon} />
          <a href={`tel:${point.phone.replace(/\D/g, '')}`} className={styles.popupPhone} title='Ligar'>
            {point.phone}
          </a>
          <button
            className={`${styles.popupCopyBtn} ${copied ? styles.popupCopyBtnDone : ''}`}
            onClick={copyPhone}
            title="Copiar número"
          >
            {copied ? <CopyCheck className={styles.popupCopyCheckIcon} /> : <Copy className={styles.popupCopyIcon} />}
          </button>
        </div>
      )}
      <div className={styles.popupActions}>
        <a
          href={reportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.popupReportBtn}
        >
          <AlertTriangle className={styles.popupAlertIcon} />
          Reportar informação incorreta
        </a>
      </div>
    </div>
  )
}

interface Props {
  points: CollectionPoint[]
  selectedId: string | null
  onMarkerClick: (id: string) => void
}

const JF_CENTER: [number, number] = [-21.7642, -43.3503]

function ScrollWheelController() {
  const map = useMap();
  const mapRef = useRef(false);
  const popupOpenRef = useRef(false);

  const [showHint, setShowHint] = useState(true);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    map.scrollWheelZoom.disable();
    const mapContainer = map.getContainer();

    function handleWheel(event: WheelEvent) {
      if (!event.ctrlKey) return;

      if (popupOpenRef.current) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (mapRef.current) {
        event.preventDefault();
        map.scrollWheelZoom.enable();

        setTimeout(() => {
          map.scrollWheelZoom.disable();
        }, 100);
      }
    }

    function handleMouseEnter() {
      mapRef.current = true;
    }

    function handleMouseLeave() {
      mapRef.current = false;
    }

    map.on('popupopen', () => {
      popupOpenRef.current = true;
    })

    map.on('popupclose', () => {
      popupOpenRef.current = false;
    })

    mapContainer.addEventListener('mouseenter', handleMouseEnter);
    mapContainer.addEventListener('mouseleave', handleMouseLeave);
    mapContainer.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      mapContainer.removeEventListener('mouseenter', handleMouseEnter);
      mapContainer.removeEventListener('mouseleave', handleMouseLeave);
      mapContainer.removeEventListener('wheel', handleWheel, { capture: true });
      map.off('popupopen');
      map.off('popupclose');
    }
  }, [map, isMobile]);

  function closeHint(e: React.MouseEvent) {
    e.stopPropagation();
    setShowHint(false);
  }

  if (isMobile) return null;

  return showHint && !popupOpenRef.current ? (
    <div className={styles.scrollHint}>
      Segure Ctrl e role para ampliar
      <button
        className={styles.closeHintBtn}
        onClick={closeHint}
        title="Fechar dica"
      >
        <X size={16}/>
      </button>
    </div>
  ) : (
    <div className={styles.lampWrapper}>
      <Lightbulb size={18}/>
      <div className={styles.lampHint}>
        Segure Ctrl + scroll para ampliar
      </div>
    </div>
  );
}

function CentralizeMap() {
  const map = useMap();

  const handleCentralize = () => {
    map.flyTo(JF_CENTER, 13, { duration: 1.2 });
  }

  return (
    <button
      type='button'
      onClick={handleCentralize}
      className={styles.centralizeBtn}
      title="Centralizar mapa"
      aria-label="Centralizar mapa"
    >
      <LocateFixed  size={16} />
    </button>
  );
}

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
  const isMobile = useIsMobile();
  const [legendOpen, setLegendOpen] = useState(false);

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
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ScrollWheelController />
        <CentralizeMap />
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
                <PointPopup point={point} />
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      <RoutePanel onResult={handleRouteResult} />

      {routeInfo && (
        <div className={styles.routeSummary}>
          <Map className={styles.mapIcon} />
          {routeInfo.distanceKm} km — {routeInfo.durationMin} min de carro
          {nearbyIds.size > 0 && (
            <span className={styles.nearbyCount}>
              • {nearbyIds.size} ponto{nearbyIds.size > 1 ? 's' : ''} na rota
            </span>
          )}
          <button
            className={styles.clearRouteBtn}
            onClick={() => handleRouteResult(null)}
            title="Limpar rota"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {isMobile && (
        <div className={styles.legendToggle} onClick={() => setLegendOpen(!legendOpen)}>
          <Info className={styles.legendInfoIcon}/>
          <span> {!legendOpen ? '' : 'Ocultar'} Legenda</span>
        </div>
      )}

      <div className={`${styles.legend} ${legendOpen ? styles.legendOpen : ''}`}>
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