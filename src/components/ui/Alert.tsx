import React from 'react';
import styles from './Alert.module.css';

export type AlertStatus = 'info' | 'warning' | 'success' | 'error';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: AlertStatus;
}

export function Alert({
  status = 'info',
  className,
  children,
  ...props
}: AlertProps) {
  const classNames = [styles.alert, styles[status], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} role="alert" {...props}>
      {children}
    </div>
  );
}

export interface AlertIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: AlertStatus;
}

const icons: Record<AlertStatus, React.ReactNode> = {
  info: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  ),
};

export function AlertIcon({ status = 'info', className, ...props }: AlertIconProps) {
  const classNames = [styles.alertIcon, className].filter(Boolean).join(' ');

  return (
    <span className={classNames} {...props}>
      {icons[status]}
    </span>
  );
}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AlertTitle({ className, children, ...props }: AlertTitleProps) {
  const classNames = [styles.alertTitle, className].filter(Boolean).join(' ');
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AlertDescription({ className, children, ...props }: AlertDescriptionProps) {
  const classNames = [styles.alertDescription, className].filter(Boolean).join(' ');
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export default Alert;
