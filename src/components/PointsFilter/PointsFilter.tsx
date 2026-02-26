import styles from './PointsFilter.module.css'

export type FilterType = 'todos' | 'coleta' | 'abrigo'

interface Props {
  active: FilterType
  onChange: (filter: FilterType) => void
  totalAll: number
  totalColeta: number
  totalAbrigo: number
}

export default function PointsFilter({ active, onChange, totalAll, totalColeta, totalAbrigo }: Props) {
  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.btn} ${active === 'todos' ? styles.active : ''}`}
        onClick={() => onChange('todos')}
      >
        Todos
        <span className={styles.count}>{totalAll}</span>
      </button>
      <button
        className={`${styles.btn} ${styles.btnColeta} ${active === 'coleta' ? styles.activeColeta : ''}`}
        onClick={() => onChange('coleta')}
      >
        📦 Pontos de Coleta
        <span className={styles.count}>{totalColeta}</span>
      </button>
      <button
        className={`${styles.btn} ${styles.btnAbrigo} ${active === 'abrigo' ? styles.activeAbrigo : ''}`}
        onClick={() => onChange('abrigo')}
      >
        🏠 Abrigos
        <span className={styles.count}>{totalAbrigo}</span>
      </button>
    </div>
  )
}
