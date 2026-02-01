import { forwardRef, HTMLAttributes, ReactNode, createContext, useContext } from 'react';
import styles from './Alert.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles, RadiusValue } from './styleUtils';

export type AlertStatus = 'info' | 'warning' | 'success' | 'error';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  status?: AlertStatus;
  borderRadius?: RadiusValue;
  children?: ReactNode;
}

export interface AlertIconProps extends HTMLAttributes<HTMLSpanElement> {}

export interface AlertTitleProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export interface AlertDescriptionProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

interface AlertContextValue {
  status: AlertStatus;
}

const AlertContext = createContext<AlertContextValue | null>(null);

const useAlertContext = (): AlertContextValue | null => {
  return useContext(AlertContext);
};

const statusClassMap: Record<AlertStatus, string> = {
  info: styles.statusInfo,
  warning: styles.statusWarning,
  success: styles.statusSuccess,
  error: styles.statusError,
};

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold">i</text>
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <polygon points="12,2 22,22 2,22" fill="none" stroke="currentColor" strokeWidth="2" />
    <text x="12" y="19" textAnchor="middle" fontSize="14" fontWeight="bold">!</text>
  </svg>
);

const SuccessIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12 L11 15 L16 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8 L16 16 M16 8 L8 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const iconMap: Record<AlertStatus, React.FC> = {
  info: InfoIcon,
  warning: WarningIcon,
  success: SuccessIcon,
  error: ErrorIcon,
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      status = 'info',
      borderRadius,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { layoutProps, rest } = extractLayoutProps({ borderRadius, ...props });
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [
      styles.alert,
      statusClassMap[status],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const mergedStyle = mergeStyles(layoutStyle, style);

    const contextValue: AlertContextValue = { status };

    return (
      <AlertContext.Provider value={contextValue}>
        <div ref={ref} className={classNames} style={mergedStyle} role="alert" {...rest}>
          {children}
        </div>
      </AlertContext.Provider>
    );
  }
);

Alert.displayName = 'Alert';

const AlertIcon = forwardRef<HTMLSpanElement, AlertIconProps>(
  ({ className, ...props }, ref) => {
    const context = useAlertContext();
    const status = context?.status || 'info';

    const IconComponent = iconMap[status];

    const classNames = [
      styles.alertIcon,
      styles[`icon${status.charAt(0).toUpperCase()}${status.slice(1)}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        <IconComponent />
      </span>
    );
  }
);

AlertIcon.displayName = 'AlertIcon';

const AlertTitle = forwardRef<HTMLSpanElement, AlertTitleProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.alertTitle, className].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {children}
      </span>
    );
  }
);

AlertTitle.displayName = 'AlertTitle';

const AlertDescription = forwardRef<HTMLSpanElement, AlertDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.alertDescription, className].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {children}
      </span>
    );
  }
);

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertIcon, AlertTitle, AlertDescription };
export default Alert;
