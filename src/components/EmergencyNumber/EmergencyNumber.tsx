import styles from '../EmergencyNumber/EmergencyNumber.module.css'

interface EmergencyNumberProps {
  icon: React.ReactNode;        
  label: string;       
  phone: string;       
}

export default function EmergencyNumber({ icon, label, phone }: EmergencyNumberProps) {
  return (
    <div className={styles.emergencyNumber}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
      <a className={styles.phone} href={`tel:${phone}`}>
        {phone}
      </a>
    </div>


  );
}