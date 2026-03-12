import styles from './Pagination.module.css'

interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

function getPageNumbers(currentPage: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)

  if (currentPage <= 3) return [1, 2, 3, '...', totalPages]
  if (currentPage >= totalPages - 2)
    return [1, '...', totalPages - 2, totalPages - 1, totalPages]
  return [1, '...', currentPage, '...', totalPages]
}

export default function Pagination({ currentPage, totalPages, totalItems, pageSize, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const start = (currentPage - 1) * pageSize

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageBtn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        ‹
      </button>

      {getPageNumbers(currentPage, totalPages).map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className={styles.ellipsis}>…</span>
        ) : (
          <button
            key={page}
            className={`${styles.pageBtn} ${page === currentPage ? styles.pageBtnActive : ''}`}
            onClick={() => onPageChange(page)}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        className={styles.pageBtn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        ›
      </button>

      <span className={styles.pageInfo}>
        {start + 1}–{Math.min(start + pageSize, totalItems)} de {totalItems} pontos
      </span>
    </div>
  )
}
