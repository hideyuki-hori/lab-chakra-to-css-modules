import { IconType } from 'react-icons';
import { FiAlertTriangle } from 'react-icons/fi';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../ui/Modal';
import Button from '../ui/Button';
import styles from '../../styles/components/confirm-modal.module.css';

type IconColor = 'orange' | 'red' | 'blue' | 'green';

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
  iconColor?: IconColor;
  isLoading?: boolean;
}

const iconColorClassMap: Record<IconColor, string> = {
  orange: styles.iconOrange,
  red: styles.iconRed,
  blue: styles.iconBlue,
  green: styles.iconGreen,
};

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
  iconColor = 'orange',
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalHeader onClose={onClose}>{title}</ModalHeader>
      <ModalBody>
        <div className={styles.messageContainer}>
          <Icon className={`${styles.icon} ${iconColorClassMap[iconColor]}`} />
          <p className={styles.message}>{message}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose} disabled={isLoading}>
          {cancelLabel}
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm} isLoading={isLoading}>
          {confirmLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
