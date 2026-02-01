import React from 'react';
import styles from './Spinner.module.css';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  color?: string;
  thickness?: string;
  speed?: string;
  label?: string;
}

export function Spinner({
  size = 'md',
  color,
  thickness,
  speed,
  label = 'Loading...',
  className,
  style,
  ...props
}: SpinnerProps) {
  const classNames = [styles.spinner, styles[size], className]
    .filter(Boolean)
    .join(' ');

  const customStyle: React.CSSProperties = {
    ...(color && { borderColor: `${color} transparent transparent transparent` }),
    ...(thickness && { borderWidth: thickness }),
    ...(speed && { animationDuration: speed }),
    ...style,
  };

  return (
    <div className={classNames} style={customStyle} role="status" {...props}>
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
}

export default Spinner;
