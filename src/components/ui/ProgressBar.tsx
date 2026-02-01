import { motion } from 'framer-motion';
import styles from '../../styles/components/ui/ProgressBar.module.css';

interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: string;
  isAnimated?: boolean;
}

const sizeClasses = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

export default function ProgressBar({
  value,
  showLabel = false,
  size = 'md',
  isAnimated = true,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const trackClasses = [styles.track, sizeClasses[size]].join(' ');

  return (
    <div className={styles.container}>
      {showLabel && (
        <div className={styles.labelRow}>
          <span className={styles.labelText}>進捗率</span>
          <span className={styles.valueText}>{clampedValue}%</span>
        </div>
      )}
      <div className={trackClasses}>
        {isAnimated ? (
          <motion.div
            className={styles.bar}
            initial={{ width: 0 }}
            animate={{ width: `${clampedValue}%` }}
          />
        ) : (
          <div
            className={styles.bar}
            style={{ width: `${clampedValue}%` }}
          />
        )}
      </div>
    </div>
  );
}
