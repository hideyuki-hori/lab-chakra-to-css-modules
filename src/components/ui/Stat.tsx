import React from 'react';
import styles from './Stat.module.css';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Stat({ className, children, ...props }: StatProps) {
  const classNames = [styles.stat, className].filter(Boolean).join(' ');
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export interface StatLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StatLabel({ className, children, ...props }: StatLabelProps) {
  const classNames = [styles.statLabel, className].filter(Boolean).join(' ');
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export interface StatNumberProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StatNumber({ className, children, ...props }: StatNumberProps) {
  const classNames = [styles.statNumber, className].filter(Boolean).join(' ');
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export interface StatHelpTextProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StatHelpText({ className, children, ...props }: StatHelpTextProps) {
  const classNames = [styles.statHelpText, className].filter(Boolean).join(' ');
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export type StatArrowType = 'increase' | 'decrease';

export interface StatArrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: StatArrowType;
}

export function StatArrow({ type, className, ...props }: StatArrowProps) {
  const classNames = [styles.statArrow, styles[type], className].filter(Boolean).join(' ');

  return (
    <span className={classNames} aria-label={type === 'increase' ? '増加' : '減少'} {...props}>
      {type === 'increase' ? (
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
          <path d="M7 14l5-5 5 5z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      )}
    </span>
  );
}

export default Stat;
