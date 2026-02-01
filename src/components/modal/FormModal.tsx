import { useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Button from '../ui/Button';
import styles from '../../styles/components/modal/Modal.module.css';
import formStyles from '../../styles/components/modal/FormModal.module.css';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  size?: ModalSize;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
};

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitLabel = '保存',
  cancelLabel = 'キャンセル',
  isLoading = false,
  size = 'lg',
}: FormModalProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const modalClasses = [styles.modal, sizeClasses[size]].join(' ');

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
            className={modalClasses}
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
            <form className={formStyles.form} onSubmit={handleSubmit}>
              <div className={styles.body}>
                <div className={formStyles.formContent}>{children}</div>
              </div>
              <div className={styles.footer}>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  disabled={isLoading}
                  isAnimated={false}
                >
                  {cancelLabel}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  isAnimated={false}
                >
                  {submitLabel}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
