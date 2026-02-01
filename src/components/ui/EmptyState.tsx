import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FiInbox } from 'react-icons/fi';
import Button from './Button';
import styles from '../../styles/components/ui/EmptyState.module.css';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: IconType;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = 'データがありません',
  description,
  icon: Icon = FiInbox,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={styles.content}>
        <Icon className={styles.icon} />
        <div className={styles.textContent}>
          <p className={styles.title}>{title}</p>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
        {actionLabel && onAction && (
          <div className={styles.actionButton}>
            <Button variant="primary" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
