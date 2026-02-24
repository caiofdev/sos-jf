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

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Desenvolvedor</h3>
          <p className={styles.devName}>Caio Reis</p>
          <ul className={styles.devLinks}>
            <li>
              <a
                href="https://linkedin.com/in/caiofreis"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:caiofreis2005@gmail.com">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"/></svg>
                caiofreis2005@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://github.com/caiofdev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                caiofdev
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          SOS JF &mdash; Solidariedade em tempo de crise &mdash; Juiz de Fora, MG
        </p>
        <p className={styles.disclaimer}>
          Desenvolvido por <a href="https://github.com/caiofdev" target="_blank" rel="noopener noreferrer">Caio Reis</a> &mdash; Site voluntário e informativo. Informações sujeitas a atualização.
        </p>
      </div>
    </footer>
  )
}
