import { motion } from 'framer-motion';
import styles from '../../styles/components/progress-bar.module.css';

interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isAnimated?: boolean;
}

const sizeClassMap = {
  sm: styles.trackSm,
  md: styles.trackMd,
  lg: styles.trackLg,
};

export default function ProgressBar({
  value,
  showLabel = false,
  size = 'md',
  isAnimated = true,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const trackClasses = [styles.track, sizeClassMap[size]].join(' ');

  return (
    <div className={styles.container}>
      {showLabel && (
        <div className={styles.labelContainer}>
          <span className={styles.labelText}>進捗率</span>
          <span className={styles.labelValue}>{clampedValue}%</span>
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
