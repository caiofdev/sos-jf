import styles from './Header.module.css'
import EmergencyNumber from '../EmergencyNumber/EmergencyNumber'
import { Siren, FireExtinguisher, Ambulance, Shield  } from "lucide-react"

const emergencyNumbers = [
  { icon: Siren, label: "Defesa Civil -", phone: "199" },
  { icon: FireExtinguisher, label: "Bombeiros -", phone: "193" },
  { icon: Ambulance, label: "SAMU -", phone: "192" },
  { icon: Shield, label: "Polícia Militar -", phone: "190" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.sos}>SOS</span>
          <span className={styles.jf}>JF</span>
        </div>
        <div className={styles.tagline}>
          <p className={styles.title}>Chuvas em Juiz de Fora — 23 de Fevereiro de 2026</p>
          <p className={styles.subtitle}>
            Encontre os pontos de coleta de doações e ajude quem mais precisa
          </p>
        </div>
        <div className={styles.numbers}>
          {emergencyNumbers.map((number) => (
            <EmergencyNumber
              key={number.phone}
              icon={number.icon}
              label={number.label}
              phone={number.phone}
            />
          ))}
        </div>
      </div>
    </header>
  )
}


