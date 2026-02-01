'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.css';

export type ToastStatus = 'info' | 'warning' | 'success' | 'error';
export type ToastPosition =
  | 'top'
  | 'top-right'
  | 'top-left'
  | 'bottom'
  | 'bottom-right'
  | 'bottom-left';

export interface ToastOptions {
  title?: string;
  description?: string;
  status?: ToastStatus;
  duration?: number;
  isClosable?: boolean;
  position?: ToastPosition;
}

interface ToastInstance extends ToastOptions {
  id: string;
  isClosing?: boolean;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  closeToast: (id: string) => void;
  closeAllToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let toastIdCounter = 0;

const generateToastId = (): string => {
  toastIdCounter += 1;
  return `toast-${toastIdCounter}`;
};

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold">
      i
    </text>
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <polygon
      points="12,2 22,22 2,22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <text x="12" y="19" textAnchor="middle" fontSize="14" fontWeight="bold">
      !
    </text>
  </svg>
);

const SuccessIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M8 12 L11 15 L16 9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M8 8 L16 16 M16 8 L8 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path
      d="M6 6 L18 18 M18 6 L6 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const iconMap: Record<ToastStatus, React.FC> = {
  info: InfoIcon,
  warning: WarningIcon,
  success: SuccessIcon,
  error: ErrorIcon,
};

const statusClassMap: Record<ToastStatus, string> = {
  info: styles.statusInfo,
  warning: styles.statusWarning,
  success: styles.statusSuccess,
  error: styles.statusError,
};

const positionClassMap: Record<ToastPosition, string> = {
  top: styles.positionTop,
  'top-right': styles.positionTopRight,
  'top-left': styles.positionTopLeft,
  bottom: styles.positionBottom,
  'bottom-right': styles.positionBottomRight,
  'bottom-left': styles.positionBottomLeft,
};

interface ToastItemProps {
  toast: ToastInstance;
  onClose: (id: string) => void;
}

const ToastItem = ({ toast, onClose }: ToastItemProps) => {
  const status = toast.status || 'info';
  const IconComponent = iconMap[status];

  const classNames = [
    styles.toast,
    statusClassMap[status],
    toast.isClosing ? styles.toastClosing : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} role="alert">
      <span className={styles.toastIcon}>
        <IconComponent />
      </span>
      <div className={styles.toastContent}>
        {toast.title && <div className={styles.toastTitle}>{toast.title}</div>}
        {toast.description && (
          <div className={styles.toastDescription}>{toast.description}</div>
        )}
      </div>
      {toast.isClosable && (
        <button
          className={styles.toastCloseButton}
          onClick={() => onClose(toast.id)}
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastInstance[];
  onClose: (id: string) => void;
  position: ToastPosition;
}

const ToastContainer = ({ toasts, onClose, position }: ToastContainerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredToasts = toasts.filter(
    (t) => (t.position || 'top-right') === position
  );

  if (filteredToasts.length === 0) return null;

  const classNames = [styles.toastContainer, positionClassMap[position]].join(
    ' '
  );

  return createPortal(
    <div className={classNames}>
      {filteredToasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>,
    document.body
  );
};

export interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastInstance[]>([]);

  const closeToast = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isClosing: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 200);
  }, []);

  const toast = useCallback(
    (options: ToastOptions): string => {
      const id = generateToastId();
      const duration = options.duration ?? 5000;

      const newToast: ToastInstance = {
        ...options,
        id,
        status: options.status || 'info',
        isClosable: options.isClosable ?? true,
        position: options.position || 'top-right',
      };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          closeToast(id);
        }, duration);
      }

      return id;
    },
    [closeToast]
  );

  const closeAllToasts = useCallback(() => {
    setToasts((prev) => prev.map((t) => ({ ...t, isClosing: true })));
    setTimeout(() => {
      setToasts([]);
    }, 200);
  }, []);

  const positions: ToastPosition[] = [
    'top',
    'top-right',
    'top-left',
    'bottom',
    'bottom-right',
    'bottom-left',
  ];

  return (
    <ToastContext.Provider value={{ toast, closeToast, closeAllToasts }}>
      {children}
      {positions.map((position) => (
        <ToastContainer
          key={position}
          toasts={toasts}
          onClose={closeToast}
          position={position}
        />
      ))}
    </ToastContext.Provider>
  );
};

export function useToast(): (options: ToastOptions) => string {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
}

export function useToastActions(): ToastContextValue {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastActions must be used within a ToastProvider');
  }
  return context;
}

export default useToast;
