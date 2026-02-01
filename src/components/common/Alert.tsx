import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo, FiAlertTriangle, FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';
import styles from '../../styles/components/alert.module.css';

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

const statusConfig: Record<AlertStatus, { alertClass: string; iconClass: string; Icon: typeof FiInfo }> = {
  info: { alertClass: styles.alertInfo, iconClass: styles.iconInfo, Icon: FiInfo },
  warning: { alertClass: styles.alertWarning, iconClass: styles.iconWarning, Icon: FiAlertTriangle },
  success: { alertClass: styles.alertSuccess, iconClass: styles.iconSuccess, Icon: FiCheckCircle },
  error: { alertClass: styles.alertError, iconClass: styles.iconError, Icon: FiXCircle },
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
  const config = statusConfig[status];
  const alertClasses = [styles.alert, config.alertClass].join(' ');
  const iconClasses = [styles.icon, config.iconClass].join(' ');

  const alertContent = (
    <div className={alertClasses}>
      <config.Icon className={iconClasses} />
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
      </div>
      {isClosable && (
        <button className={styles.closeButton} onClick={onClose} aria-label="閉じる">
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
