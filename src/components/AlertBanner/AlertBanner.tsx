import styles from './AlertBanner.module.css'

export default function AlertBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.inner}>
        <div className={styles.icon}>⚠️</div>
        <div className={styles.content}>
          <h2 className={styles.heading}>Situação de Emergência</h2>
          <p className={styles.text}>
            Na noite de <strong>23 de fevereiro de 2025</strong>, fortes chuvas atingiram Juiz de
            Fora causando inundações, deslizamentos e deixando diversas famílias desabrigadas em
            vários bairros. A Defesa Civil segue em alerta máximo. Se você puder ajudar,{' '}
            <strong>qualquer doação faz a diferença.</strong>
          </p>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>7</span>
            <span className={styles.statLabel}>Pontos de coleta</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>24h</span>
            <span className={styles.statLabel}>Emergência ativa</span>
          </div>
        </div>
      </div>
    </section>
  )
}
