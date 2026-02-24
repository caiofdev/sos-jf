import { useState } from 'react'
import Header from './components/Header/Header'
import AlertBanner from './components/AlertBanner/AlertBanner'
import MapView from './components/MapView/MapView'
import PointsList from './components/PointsList/PointsList'
import Footer from './components/Footer/Footer'
import collectionPointsData from './data/collectionPoints.json'
import type { CollectionPoint } from './types/CollectionPoint'

const collectionPoints = collectionPointsData as CollectionPoint[]

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

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
      <AlertBanner totalPoints={collectionPoints.length} />
      <main>
        <section id="mapa">
          <MapView
            points={collectionPoints}
            selectedId={selectedId}
            onMarkerClick={handleMarkerClick}
          />
        </section>
        <PointsList
          points={collectionPoints}
          selectedId={selectedId}
          onSelect={handleCardSelect}
        />
      </main>
      <Footer />
    </>
  )
}
