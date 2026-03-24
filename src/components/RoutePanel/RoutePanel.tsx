import { useState } from 'react'
import type { RouteResult } from '../../types/Route'
import { geocode, getGPSCoords, calculateRoute } from '../../services/routeService'
import styles from './RoutePanel.module.css'
import { ChevronDown, ChevronUp, Map } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';

interface Props {
  onResult: (result: RouteResult | null) => void
}

export default function RoutePanel({ onResult }: Props) {
  const [open, setOpen] = useState(false)
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [active, setActive] = useState(false)
  const isMobile = useIsMobile();

  async function handleCalculate() {
    if (!destination.trim()) return
    setLoading(true)
    setError(null)

    try {
      const originCoords = origin.trim() ? await geocode(origin) : await getGPSCoords()
      const destCoords = await geocode(destination)
      const result = await calculateRoute(originCoords, destCoords)
      onResult(result)
      setActive(true)
      setOpen(false)
    } catch (e) {
      const isGeoError = e instanceof GeolocationPositionError
      setError(
        isGeoError
          ? 'Permita o acesso à localização ou informe o endereço de origem.'
          : (e as Error).message || 'Não foi possível calcular a rota.'
      )
      onResult(null)
    }

    setLoading(false)
  }

  function handleClear() {
    onResult(null)
    setActive(false)
    setOrigin('')
    setDestination('')
    setError(null)
  }

  if (isMobile){
    if(!open) {
      return (
        <div>
          <div>
            <button className={styles.toggleBtn} onClick={() => setOpen(true)}>
              <ChevronUp />
              <span>Traçar rota</span>
            </button>
          </div>
        </div>
      );
    }
  }

  if (!open && !isMobile) {
    return (
      <button className={styles.toggleBtn} onClick={() => setOpen(true)}>
        <div className={styles.panelIconContainer}><Map className={styles.panelIconDesktop} /></div>
        <span className={styles.toggleBtnTitle}>Traçar rota</span>
      </button>
    )
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle} onClick={isMobile ? () => { setOpen(false) } : undefined}>
          <Map className={styles.panelIconDesktop} />
          <ChevronDown className={styles.panelIconMobile}/>
          Traçar rota
        </div>
        <button className={styles.closeBtn} onClick={() => { setOpen(false); handleClear() }}>✕</button>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.label}>Origem</label>
          <input
            className={styles.input}
            placeholder="Deixe vazio para usar GPS"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Destino</label>
          <input
            className={styles.input}
            placeholder="Ex: Av. Brasil, 2001"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
            disabled={loading}
          />
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        {active && (
          <button className={styles.clearBtn} onClick={handleClear} disabled={loading}>
            Limpar
          </button>
        )}
        <button
          className={styles.calcBtn}
          onClick={handleCalculate}
          disabled={loading || !destination.trim()}
        >
          {loading ? 'Calculando...' : 'Calcular'}
        </button>
      </div>
    </div>
  )
}
