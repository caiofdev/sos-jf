import { useState } from 'react'
import type { CollectionPoint } from '../../types/CollectionPoint'
import styles from './CollectionPointCard.module.css'
import { House, MapPinned, Truck, Clock, Phone, CopyCheck, Copy, Info, Map} from 'lucide-react'

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
        <div className={styles.pin}>
          {point.type === 'abrigo' ? 
            <House className={styles.houseIcon}/> : <MapPinned className={styles.mapPinIcon} />}
        </div>
        <div className={styles.info}>
          <div className={styles.nameRow}>
            <h3 className={styles.name}>{point.name}</h3>
            <div className={styles.badgeGroup}>
              <span className={point.type === 'abrigo' ? styles.abrigoBadge : styles.coletaBadge}>
                {point.type === 'abrigo' ? 'Abrigo' : 'Ponto de Coleta'}
              </span>
              {point.hasCollectionRoute && (
                <span className={styles.routeBadge} title="Este local realiza rota de coleta">
                  <Truck size={16} />
                  Rota de coleta
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
          <Clock size={14}/>
          {point.hours}
        </span>
        {point.phone && (
          <div className={styles.phoneRow}>
            <a
              href={`tel:${point.phone.replace(/\D/g, '')}`}
              className={styles.phone}
              onClick={(e) => e.stopPropagation()}
              title='Ligar'
            >
              <Phone className={styles.phoneIcon}/>
              {point.phone}
            </a>
            <button
              className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`}
              onClick={(e) => { e.stopPropagation(); copyPhone() }}
              title="Copiar número"
            >
              {copied ? <CopyCheck className={styles.copyCheckIcon} /> : <Copy className={styles.copyIcon} />}
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
        <div className={styles.notes}>
          <Info className={styles.infoIcon}/>
          {point.notes}
        </div>
      )}

      <div className={styles.cardFooter}>
        <button
          className={styles.mapBtn}
          onClick={() => onSelect(point.id)}
        > 
          <Map size={16}/>
          Ver no mapa
        </button>
      </div>
    </article>
  )
}
