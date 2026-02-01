import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiInfo, FiAlertTriangle, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import styles from '../../styles/components/common/Alert.module.css';

type AlertStatus = 'info' | 'warning' | 'success' | 'error';

interface AlertProps {
  status: AlertStatus;
  title?: string;
  description?: string;
  isClosable?: boolean;
  onClose?: () => void;
  isVisible?: boolean;
  isAnimated?: boolean;
}

const statusIcons = {
  info: FiInfo,
  warning: FiAlertTriangle,
  success: FiCheckCircle,
  error: FiXCircle,
};

const statusClasses: Record<AlertStatus, string> = {
  info: styles.info,
  warning: styles.warning,
  success: styles.success,
  error: styles.error,
};

export default function Alert({
  status,
  title,
  description,
  isClosable = false,
  onClose,
  isVisible = true,
  isAnimated = true,
}: AlertProps) {
  const Icon = statusIcons[status];
  const alertClasses = [styles.alert, statusClasses[status]].join(' ');

  const alertContent = (
    <div className={alertClasses}>
      <Icon className={styles.icon} />
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {isClosable && (
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="閉じる"
        >
          <FiX />
        </button>
      )}
    </div>
  );

  if (isAnimated) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {alertContent}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (!isVisible) return null;

  return alertContent;
}
