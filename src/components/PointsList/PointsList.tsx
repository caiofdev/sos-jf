import { useState, useEffect } from 'react'
import type { CollectionPoint } from '../../types/CollectionPoint'
import CollectionPointCard from '../CollectionPointCard/CollectionPointCard'
import NoticeCard from '../NoticeCard/NoticeCard'
import styles from './PointsList.module.css'

const PAGE_SIZE = 6

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

  function getPageNumbers(): (number | '...')[] {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)

    if (currentPage <= 3) return [1, 2, 3, '...', totalPages]
    if (currentPage >= totalPages - 2)
      return [1, '...', totalPages - 2, totalPages - 1, totalPages]
    return [1, '...', currentPage, '...', totalPages]
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

        <NoticeCard />

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

            {getPageNumbers().map((page, i) =>
              page === '...' ? (
                <span key={`ellipsis-${i}`} className={styles.ellipsis}>…</span>
              ) : (
                <button
                  key={page}
                  className={`${styles.pageBtn} ${page === currentPage ? styles.pageBtnActive : ''}`}
                  onClick={() => goToPage(page)}
                  aria-label={`Página ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            )}

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