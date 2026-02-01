import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import Button from '../ui/Button';
import styles from '../../styles/components/modal/Modal.module.css';
import confirmStyles from '../../styles/components/modal/ConfirmModal.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: 'primary' | 'danger';
  icon?: IconType;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = '確認',
  cancelLabel = 'キャンセル',
  confirmVariant = 'danger',
  icon: Icon = FiAlertTriangle,
  isLoading = false,
}: ConfirmModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isLoading, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className={`${styles.modal} ${styles.sizeMd}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className={styles.header}>
              <h2 id="modal-title" className={styles.title}>{title}</h2>
              <button
                className={styles.closeButton}
                onClick={onClose}
                disabled={isLoading}
                aria-label="閉じる"
              >
                <FiX />
              </button>
            </div>
            <div className={styles.body}>
              <div className={confirmStyles.content}>
                <div className={confirmStyles.messageRow}>
                  <Icon className={confirmStyles.icon} />
                  <p className={confirmStyles.message}>{message}</p>
                </div>
              </div>
            </div>
            <div className={styles.footer}>
              <Button
                variant="ghost"
                onClick={onClose}
                disabled={isLoading}
                isAnimated={false}
              >
                {cancelLabel}
              </Button>
              <Button
                variant={confirmVariant}
                onClick={onConfirm}
                isLoading={isLoading}
                isAnimated={false}
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
