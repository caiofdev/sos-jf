import type { CollectionPoint } from '../../types/CollectionPoint'
import styles from './CollectionPointCard.module.css'

interface Props {
  point: CollectionPoint
  isSelected: boolean
  onSelect: (id: string) => void
}

export default function CollectionPointCard({ point, isSelected, onSelect }: Props) {
  return (
    <article
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={() => onSelect(point.id)}
      id={`point-${point.id}`}
    >
      <div className={styles.top}>
        <div className={styles.pin}>📍</div>
        <div className={styles.info}>
          <div className={styles.nameRow}>
            <h3 className={styles.name}>{point.name}</h3>
            {point.hasCollectionRoute && (
              <span className={styles.routeBadge} title="Este local realiza rota de coleta">
                🚚 Rota de coleta
              </span>
            )}
          </div>
          <p className={styles.address}>
            {point.address} — <span className={styles.neighborhood}>{point.neighborhood}</span>
          </p>
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon}>⏰</span>
          {point.hours}
        </span>
        {point.phone && (
          <a
            href={`tel:${point.phone.replace(/\D/g, '')}`}
            className={styles.phone}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.metaIcon}>📞</span>
            {point.phone}
          </a>
        )}
      </div>

      <div className={styles.items}>
        <p className={styles.itemsLabel}>Itens aceitos:</p>
        <ul className={styles.itemsList}>
          {point.acceptedItems.map((item) => (
            <li key={item} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {point.notes && (
        <p className={styles.notes}>
          <span className={styles.notesIcon}>ℹ️</span> {point.notes}
        </p>
      )}
    </article>
  )
}
