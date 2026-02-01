import { ReactNode } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../ui/Modal';
import Button from '../ui/Button';
import styles from '../../styles/components/form-modal.module.css';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  submitVariant?: 'primary' | 'danger';
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitLabel = '保存',
  cancelLabel = 'キャンセル',
  submitVariant = 'primary',
  isLoading = false,
  size = 'lg',
}: FormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalHeader onClose={onClose}>{title}</ModalHeader>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <ModalBody>
          <div className={styles.formBody}>{children}</div>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button variant={submitVariant} type="submit" isLoading={isLoading}>
            {submitLabel}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
