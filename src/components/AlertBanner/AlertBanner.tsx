import styles from './AlertBanner.module.css'

export default function AlertBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.inner}>
        <span className={styles.icon}>⚠️</span>
        <p className={styles.text}>
          <strong>Emergência ativa</strong> — Chuvas em Juiz de Fora em 23/02/2026. Defesa Civil em alerta máximo.
          <strong> Qualquer doação faz a diferença.</strong>
        </p>       
      </div>
    </section>
  )
}
