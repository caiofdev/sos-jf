import styles from './NoticeCard.module.css'

const GMAIL_URL =
  'https://mail.google.com/mail/?view=cm&to=caiofreis2005@gmail.com&su=Informa%C3%A7%C3%B5es+incorretas+%E2%80%94+SOS+JF&body=Ol%C3%A1%2C%0A%0AIdentifiquei+uma+informa%C3%A7%C3%A3o+incorreta+no+site+SOS+JF%3A%0A%0ALocal%3A+%0AProblema%3A+'

export default function NoticeCard() {
  return (
    <div className={styles.notice}>
      <span className={styles.noticeIcon}>⚠️</span>
      <div className={styles.noticeBody}>
        <p className={styles.noticeText}>
          <strong>Atenção:</strong> sempre verifique as informações dos locais antes de se
          deslocar. É recomendado ligar com antecedência para confirmar horários e a situação
          atual do ponto de coleta. <strong>Todos os pontos inseridos foram validados pela nossa equipe.</strong>
        </p>
        <a className={styles.reportBtn} href={GMAIL_URL} target="_blank" rel="noopener noreferrer">
           Reportar informação incorreta
        </a>
      </div>
    </div>
  )
}
