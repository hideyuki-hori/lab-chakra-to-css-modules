import React from 'react';
import styles from './Progress.module.css';

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';
export type ProgressColorScheme = 'primary' | 'green' | 'blue' | 'red' | 'yellow' | 'gray';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: ProgressSize;
  colorScheme?: ProgressColorScheme;
  hasStripe?: boolean;
  isAnimated?: boolean;
  isIndeterminate?: boolean;
}

export function Progress({
  value,
  size = 'md',
  colorScheme = 'primary',
  hasStripe = false,
  isAnimated = false,
  isIndeterminate = false,
  className,
  ...props
}: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const containerClassNames = [styles.progress, styles[size], className]
    .filter(Boolean)
    .join(' ');

  const barClassNames = [
    styles.progressBar,
    styles[colorScheme],
    hasStripe ? styles.striped : '',
    isAnimated ? styles.animated : '',
    isIndeterminate ? styles.indeterminate : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClassNames}
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div
        className={barClassNames}
        style={isIndeterminate ? undefined : { width: `${clampedValue}%` }}
      />
    </div>
  );
}

export interface ProgressLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  colorScheme?: ProgressColorScheme;
}

export function ProgressLabel({
  value,
  colorScheme = 'primary',
  className,
  ...props
}: ProgressLabelProps) {
  const classNames = [styles.progressLabel, className].filter(Boolean).join(' ');
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={classNames} {...props}>
      <span className={styles.progressLabelText}>進捗率</span>
      <span className={`${styles.progressLabelValue} ${styles[colorScheme]}`}>
        {clampedValue}%
      </span>
    </div>
  );
}

export default Progress;
