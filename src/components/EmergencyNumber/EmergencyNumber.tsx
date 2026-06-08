import styles from '../EmergencyNumber/EmergencyNumber.module.css'
import { LucideIcon } from "lucide-react";

interface EmergencyNumberProps {
  icon: LucideIcon;
  label: string;
  phone: string;
}

export default function EmergencyNumber({ icon: Icon, label, phone }: EmergencyNumberProps) {
  return (
    <div className={styles.emergencyNumber}>
      <span className={styles.icon}>
        <Icon size={18} />
      </span>
      <span className={styles.label}>{label}</span>
      <a className={styles.phone} href={`tel:${phone}`}>
        {phone}
      </a>
    </div>
  );
}