import styles from './AlertBanner.module.css'

interface Props {
  totalPoints: number
  totalShelters: number
}

export default function AlertBanner({ totalPoints, totalShelters }: Props) {
  return (
    <section className={styles.banner}>
      <div className={styles.inner}>
        <span className={styles.icon}>⚠️</span>
        <p className={styles.text}>
          <strong>Emergência ativa</strong> — Chuvas em Juiz de Fora em 23/02/2026. Defesa Civil em alerta máximo.
          <strong> Qualquer doação faz a diferença.</strong>
        </p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{totalPoints}</span>
            <span className={styles.statLabel}>Pontos de coleta</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>{totalShelters}</span>
            <span className={styles.statLabel}>Abrigos</span>
          </div>
        </div>
      </div>
    </section>
  )
}
