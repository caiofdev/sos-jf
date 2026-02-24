import type { CollectionPoint } from '../../types/CollectionPoint'
import CollectionPointCard from '../CollectionPointCard/CollectionPointCard'
import styles from './PointsList.module.css'

interface Props {
  points: CollectionPoint[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export default function PointsList({ points, selectedId, onSelect }: Props) {
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
          {points.map((point) => (
            <CollectionPointCard
              key={point.id}
              point={point}
              isSelected={selectedId === point.id}
              onSelect={(id) => {
                onSelect(id)
                document.getElementById(`point-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
