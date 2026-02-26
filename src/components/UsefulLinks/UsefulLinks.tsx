import styles from './UsefulLinks.module.css'
import whatsappGroupsData from '../../data/whatsappGroups.json'
import devToolsData from '../../data/devTools.json'

interface WhatsAppGroup {
  id: string
  emoji: string
  title: string
  description: string
  cta: string
  url: string
  accent: 'red' | 'orange' | 'yellow'
}

interface DevTool {
  id: string
  emoji: string
  title: string
  description: string
  url: string
}

const whatsappGroups = whatsappGroupsData as WhatsAppGroup[]
const devTools = devToolsData as DevTool[]

export default function UsefulLinks() {
  return (
    <section className={styles.section} id="links-uteis">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Grupos de Apoio — WhatsApp</h2>
          <p className={styles.subtitle}>
             Participe dos grupos para organizar abrigos, pontos de coleta e voluntários em Juiz de Fora
          </p>
        </div>

        <div className={styles.grid}>
          {whatsappGroups.map((group) => (
            <a
              key={group.id}
              href={group.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} ${styles[`accent_${group.accent}`]}`}
            >
              <div className={styles.cardTop}>
                <span className={styles.emoji}>{group.emoji}</span>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{group.title}</h3>
                  <p className={styles.cardDesc}>{group.description}</p>
                </div>
              </div>
              <div className={styles.cardCta}>
                <svg className={styles.whatsappIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.940 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                <span>{group.cta}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.inner} style={{ marginTop: '2rem' }}>
        <div className={styles.heading}>
          <h2 className={styles.titleTools}>Ferramentas da Comunidade</h2>
          <p className={styles.subtitle}>
            Outras ferramentas desenvolvidas por devs de Juiz de Fora para ajudar a população
          </p>
        </div>

        <div className={styles.toolsGrid}>
          {devTools.map((tool) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.toolCard}
            >
              <span className={styles.toolEmoji}>{tool.emoji}</span>
              <div className={styles.toolInfo}>
                <h3 className={styles.toolTitle}>{tool.title}</h3>
                <p className={styles.toolDesc}>{tool.description}</p>
              </div>
              <svg className={styles.externalIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}