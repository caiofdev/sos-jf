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

  function handleSelect(id: string) {
    setSelectedId((prev) => (prev === id ? null : id))
    // Scroll to map on mobile
    document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Header />
      <AlertBanner />
      <main>
        <section id="mapa">
          <MapView
            points={collectionPoints}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </section>
        <PointsList
          points={collectionPoints}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </main>
      <Footer />
    </>
  )
}
