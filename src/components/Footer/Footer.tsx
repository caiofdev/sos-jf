import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Números de Emergência</h3>
          <ul className={styles.contacts}>
            <li><a href="tel:199">Defesa Civil — <strong>199</strong></a></li>
            <li><a href="tel:193">Corpo de Bombeiros — <strong>193</strong></a></li>
            <li><a href="tel:192">SAMU — <strong>192</strong></a></li>
            <li><a href="tel:190">Polícia Militar — <strong>190</strong></a></li>
            <li><a href="tel:156">Prefeitura de JF — <strong>156</strong></a></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>O que doar?</h3>
          <ul className={styles.list}>
            <li>✅ Alimentos não perecíveis</li>
            <li>✅ Água mineral e garrafas plásticas</li>
            <li>✅ Roupas, calçados e cobertores</li>
            <li>✅ Produtos de higiene pessoal</li>
            <li>✅ Medicamentos lacrados</li>
            <li>✅ Fraldas adultas e infantis</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Como ajudar?</h3>
          <p className={styles.text}>
            Dirija-se pessoalmente a um dos pontos de coleta listados no mapa.
            Evite enviar doações sem comunicação prévia. Voluntários estão organizando
            a triagem nos locais indicados.
          </p>
          <p className={styles.text} style={{ marginTop: '0.5rem' }}>
            Se você está em situação de risco, <strong>ligue imediatamente 199</strong>.
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          SOS JF &mdash; Solidariedade em tempo de crise &mdash; Juiz de Fora, MG
        </p>
        <p className={styles.disclaimer}>
          Este site é voluntário e informativo. Informações sujeitas a atualização.
        </p>
      </div>
    </footer>
  )
}
