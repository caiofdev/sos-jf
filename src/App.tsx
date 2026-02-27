import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import AlertBanner from './components/AlertBanner/AlertBanner'
import MapView from './components/MapView/MapView'
import PointsList from './components/PointsList/PointsList'
import UsefulLinks from './components/UsefulLinks/UsefulLinks'
import Footer from './components/Footer/Footer'
import type { CollectionPoint } from './types/CollectionPoint'

const SHEET_URL = 'https://v1.sos-jf.workers.dev/'

export default function App() {
  const [collectionPoints, setCollectionPoints] = useState<CollectionPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Erro na resposta')
        return res.json()
      })
      .then((data: CollectionPoint[]) => {
        setCollectionPoints(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  function handleCardSelect(id: string) {
    setSelectedId((prev) => (prev === id ? null : id))
    document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleMarkerClick(id: string) {
    setSelectedId((prev) => (prev === id ? null : id))
    setTimeout(() => {
      document.getElementById(`point-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 400)
  }

  return (
    <>
      <Header />
      <AlertBanner
        totalPoints={collectionPoints.filter((p) => p.type === 'coleta').length}
        totalShelters={collectionPoints.filter((p) => p.type === 'abrigo').length}
      />
      <main>
        <section id="mapa">
          <MapView
            points={collectionPoints}
            selectedId={selectedId}
            onMarkerClick={handleMarkerClick}
          />
        </section>
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
            Carregando pontos...
          </div>
        )}
        {error && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-red-light)' }}>
            Erro ao carregar os pontos. Tente novamente mais tarde.
          </div>
        )}
        {!loading && !error && (
          <PointsList
            points={collectionPoints}
            selectedId={selectedId}
            onSelect={handleCardSelect}
          />
        )}
        <UsefulLinks />
      </main>
      <Footer />
    </>
  )
}
