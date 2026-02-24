import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.sos}>SOS</span>
          <span className={styles.jf}>JF</span>
        </div>
        <div className={styles.tagline}>
          <p className={styles.title}>Chuvas em Juiz de Fora — 23 de Fevereiro de 2025</p>
          <p className={styles.subtitle}>
            Encontre os pontos de coleta de doações e ajude quem mais precisa
          </p>
        </div>
      </div>

      <div className={styles.emergencyBar}>
        <span>🚨 Defesa Civil:</span>
        <a href="tel:199">199</a>
        <span className={styles.divider}>|</span>
        <span>🚒 Bombeiros:</span>
        <a href="tel:193">193</a>
        <span className={styles.divider}>|</span>
        <span>🚑 SAMU:</span>
        <a href="tel:192">192</a>
        <span className={styles.divider}>|</span>
        <span>🆘 Emergência:</span>
        <a href="tel:190">190</a>
      </div>
    </header>
  )
}
