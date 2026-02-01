import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import styles from '../../styles/components/data/StatCard.module.css';

interface StatCardProps {
  label: string;
  value: number | string;
  helpText?: string;
  trend?: 'increase' | 'decrease';
  icon?: IconType;
  iconColor?: string;
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
  const trendClasses = [
    styles.trendIcon,
    trend === 'increase' && styles.increase,
    trend === 'decrease' && styles.decrease,
  ]
    .filter(Boolean)
    .join(' ');

  const cardContent = (
    <>
      <div className={styles.header}>
        {Icon && <Icon className={styles.icon} />}
        <p className={styles.label}>{label}</p>
      </div>
      <p className={styles.value}>{value}</p>
      {helpText && (
        <p className={styles.helpText}>
          {trend && (
            <span className={trendClasses}>
              {trend === 'increase' ? <FiTrendingUp /> : <FiTrendingDown />}
            </span>
          )}
          {helpText}
        </p>
      )}
    </>
  );

  if (isAnimated) {
    return (
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
        whileHover={{ scale: 1.02 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return <div className={styles.card}>{cardContent}</div>;
}
