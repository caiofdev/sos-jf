import { useState } from 'react'
import type { CollectionPoint } from '../../types/CollectionPoint'
import styles from './CollectionPointCard.module.css'

interface Props {
  point: CollectionPoint
  isSelected: boolean
  onSelect: (id: string) => void
}

export default function CollectionPointCard({ point, isSelected, onSelect }: Props) {
  const [copied, setCopied] = useState(false)

  function copyPhone() {
    navigator.clipboard.writeText(point.phone.replace(/\D/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <article
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      id={`point-${point.id}`}
    >
      <div className={styles.top}>
        <div className={styles.pin}>{point.type === 'abrigo' ? '🏠' : '📍'}</div>
        <div className={styles.info}>
          <div className={styles.nameRow}>
            <h3 className={styles.name}>{point.name}</h3>
            <div className={styles.badgeGroup}>
              <span className={point.type === 'abrigo' ? styles.abrigoBadge : styles.coletaBadge}>
                {point.type === 'abrigo' ? 'Abrigo' : 'Ponto de Coleta'}
              </span>
              {point.hasCollectionRoute && (
                <span className={styles.routeBadge} title="Este local realiza rota de coleta">
                  🚚 Rota de coleta
                </span>
              )}
            </div>
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
          <div className={styles.phoneRow}>
            <a
              href={`tel:${point.phone.replace(/\D/g, '')}`}
              className={styles.phone}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={styles.metaIcon}>📞</span>
              {point.phone}
            </a>
            <button
              className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`}
              onClick={(e) => { e.stopPropagation(); copyPhone() }}
              title="Copiar número"
            >
              {copied ? '✓' : '📋'}
            </button>
          </div>
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

      <div className={styles.cardFooter}>
        <button
          className={styles.mapBtn}
          onClick={() => onSelect(point.id)}
        >
          🗳️ Ver no mapa
        </button>
      </div>
    </article>
  )
}
