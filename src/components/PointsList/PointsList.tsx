import { useState, useEffect } from 'react'
import type { CollectionPoint } from '../../types/CollectionPoint'
import CollectionPointCard from '../CollectionPointCard/CollectionPointCard'
import styles from './PointsList.module.css'

const PAGE_SIZE = 9

interface Props {
  points: CollectionPoint[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export default function PointsList({ points, selectedId, onSelect }: Props) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(points.length / PAGE_SIZE)
  const start = (currentPage - 1) * PAGE_SIZE
  const visiblePoints = points.slice(start, start + PAGE_SIZE)

  // When a marker is clicked on the map, jump to the page that contains the selected card
  useEffect(() => {
    if (!selectedId) return
    const index = points.findIndex((p) => p.id === selectedId)
    if (index === -1) return
    const page = Math.floor(index / PAGE_SIZE) + 1
    setCurrentPage(page)
  }, [selectedId, points])

  function goToPage(page: number) {
    setCurrentPage(page)
    document.getElementById('pontos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className={styles.section} id="pontos">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Pontos de Coleta</h2>
          <p className={styles.subtitle}>
            Clique em um ponto para destacá-lo no mapa. Leve suas doações diretamente ao local.
          </p>
        </div>

        <div className={styles.grid}>
          {visiblePoints.map((point) => (
            <CollectionPointCard
              key={point.id}
              point={point}
              isSelected={selectedId === point.id}
              onSelect={onSelect}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Página anterior"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.pageBtn} ${page === currentPage ? styles.pageBtnActive : ''}`}
                onClick={() => goToPage(page)}
                aria-label={`Página ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            ))}

            <button
              className={styles.pageBtn}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Próxima página"
            >
              ›
            </button>

            <span className={styles.pageInfo}>
              {start + 1}–{Math.min(start + PAGE_SIZE, points.length)} de {points.length} pontos
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
