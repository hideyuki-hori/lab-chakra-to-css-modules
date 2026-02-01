import {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useCallback,
  MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  size?: ModalSize;
  isCentered?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

export interface ModalOverlayProps extends HTMLAttributes<HTMLDivElement> {}

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface ModalCloseButtonProps extends HTMLAttributes<HTMLButtonElement> {}

interface ModalContextValue {
  onClose: () => void;
  closeOnOverlayClick: boolean;
  size: ModalSize;
  isCentered: boolean;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal compound components must be used within Modal');
  }
  return context;
};

const sizeClassMap: Record<ModalSize, string> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
  '2xl': styles.size2xl,
  '3xl': styles.size3xl,
  '4xl': styles.size4xl,
  '5xl': styles.size5xl,
  '6xl': styles.size6xl,
  full: styles.sizeFull,
};

const Modal = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  isCentered = false,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: ModalProps) => {
  const handleKeyDown = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEsc) {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) {
    return null;
  }

  const contextValue: ModalContextValue = {
    onClose,
    closeOnOverlayClick,
    size,
    isCentered,
  };

  return createPortal(
    <ModalContext.Provider value={contextValue}>
      <div className={styles.modalRoot} role="dialog" aria-modal="true">
        {children}
      </div>
    </ModalContext.Provider>,
    document.body
  );
};

Modal.displayName = 'Modal';

const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
  ({ className, onClick, ...props }, ref) => {
    const { onClose, closeOnOverlayClick } = useModalContext();

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
      onClick?.(event);
    };

    const classNames = [styles.overlay, className].filter(Boolean).join(' ');

    return <div ref={ref} className={classNames} onClick={handleClick} {...props} />;
  }
);

ModalOverlay.displayName = 'ModalOverlay';

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, className, ...props }, ref) => {
    const { size, isCentered } = useModalContext();

    const classNames = [
      styles.content,
      sizeClassMap[size],
      isCentered && styles.centered,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

ModalContent.displayName = 'ModalContent';

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.header, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.body, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

ModalBody.displayName = 'ModalBody';

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.footer, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = 'ModalFooter';

const ModalCloseButton = forwardRef<HTMLButtonElement, ModalCloseButtonProps>(
  ({ className, onClick, ...props }, ref) => {
    const { onClose } = useModalContext();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      onClose();
      onClick?.(event);
    };

    const classNames = [styles.closeButton, className].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Close"
        className={classNames}
        onClick={handleClick}
        {...props}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    );
  }
);

ModalCloseButton.displayName = 'ModalCloseButton';

export default Modal;
export { ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton };
