import { House, Package } from 'lucide-react'
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
      </button>
      <button
        className={`${styles.btn} ${styles.btnColeta} ${active === 'coleta' ? styles.activeColeta : ''}`}
        onClick={() => onChange('coleta')}
      >
        <Package className={styles.packageIcon} />
        Pontos de Coleta  
      </button>
      <button
        className={`${styles.btn} ${styles.btnAbrigo} ${active === 'abrigo' ? styles.activeAbrigo : ''}`}
        onClick={() => onChange('abrigo')}
      >
        <House className={styles.houseIcon} />
        Abrigos
      </button>
    </div>
  )
}
