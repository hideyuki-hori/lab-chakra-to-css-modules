import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import styles from '../../styles/components/data-card.module.css';

interface StatCardProps {
  label: string;
  value: number | string;
  helpText?: string;
  trend?: 'increase' | 'decrease';
  icon?: IconType;
  isAnimated?: boolean;
  delay?: number;
}

export default function StatCard({
  label,
  value,
  helpText,
  trend,
  icon: Icon,
  isAnimated = true,
  delay = 0,
}: StatCardProps) {
  const trendClass = trend === 'increase' ? styles.trendUp : trend === 'decrease' ? styles.trendDown : '';

  const cardContent = (
    <>
      <div className={styles.statHeader}>
        {Icon && <Icon className={styles.statIcon} />}
        <span className={styles.statLabel}>{label}</span>
      </div>
      <div className={styles.statValue}>{value}</div>
      {helpText && (
        <div className={[styles.statHelpText, trendClass].filter(Boolean).join(' ')}>
          {trend === 'increase' && <FiTrendingUp />}
          {trend === 'decrease' && <FiTrendingDown />}
          {helpText}
        </div>
      )}
    </>
  );

  if (isAnimated) {
    return (
      <motion.div
        className={styles.statCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
        whileHover={{ scale: 1.02 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return <div className={styles.statCard}>{cardContent}</div>;
}
