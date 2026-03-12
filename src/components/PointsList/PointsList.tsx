import { useState, useEffect } from 'react'
import type { CollectionPoint } from '../../types/CollectionPoint'
import CollectionPointCard from '../CollectionPointCard/CollectionPointCard'
import NoticeCard from '../NoticeCard/NoticeCard'
import PointsFilter, { type FilterType } from '../PointsFilter/PointsFilter'
import Pagination from '../Pagination/Pagination'
import styles from './PointsList.module.css'

const PAGE_SIZE = 6

interface Props {
  points: CollectionPoint[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export default function PointsList({ points, selectedId, onSelect }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState<FilterType>('todos')
  const [search, setSearch] = useState('')

  const filteredPoints = points
    .filter((p) => filter === 'todos' || p.type === filter)
    .filter((p) => {
      const q = search.toLowerCase().trim()
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q)
      )
    })

  const totalPages = Math.ceil(filteredPoints.length / PAGE_SIZE)
  const start = (currentPage - 1) * PAGE_SIZE
  const visiblePoints = filteredPoints.slice(start, start + PAGE_SIZE)

  useEffect(() => {
    setCurrentPage(1)
  }, [filter, search])

  function handlePageChange(page: number) {
    setCurrentPage(page)
    document.getElementById('pontos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className={styles.section} id="pontos">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Pontos de Coleta e Abrigos</h2>
          <p className={styles.subtitle}>
            Clique em um ponto para destacá-lo no mapa. Leve suas doações diretamente ao local.
          </p>
        </div>

        <div className={styles.controlsRow}>
          <PointsFilter
            active={filter}
            onChange={setFilter}
            totalAll={points.length}
            totalColeta={points.filter((p) => p.type === 'coleta').length}
            totalAbrigo={points.filter((p) => p.type === 'abrigo').length}
          />

          <div className={styles.controlsRight}>
            <div className={styles.searchWrapper}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Pesquisar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Pesquisar pontos"
              />
              {search && (
                <button className={styles.searchClear} onClick={() => setSearch('')} aria-label="Limpar pesquisa">
                  ×
                </button>
              )}
            </div>

            <a
              href="https://forms.gle/LqRJDZH8PmoSMpCZ7"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.registerBtn}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.registerIcon} aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Cadastrar ponto
            </a>
          </div>
        </div>

        <NoticeCard />

        {filteredPoints.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔍</span>
            <p>Nenhum ponto encontrado para <strong>"{search}"</strong></p>
            <button className={styles.emptyClear} onClick={() => { setSearch(''); setFilter('todos') }}>
              Limpar filtros
            </button>
          </div>
        ) : (
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
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredPoints.length}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  )
}