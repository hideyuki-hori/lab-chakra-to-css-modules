import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'solid' | 'subtle' | 'outline';
export type BadgeColorScheme = 'gray' | 'primary' | 'green' | 'red' | 'yellow' | 'blue' | 'purple' | 'orange';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  colorScheme?: BadgeColorScheme;
}

export function Badge({
  variant = 'subtle',
  colorScheme = 'gray',
  className,
  children,
  ...props
}: BadgeProps) {
  const classNames = [
    styles.badge,
    styles[variant],
    styles[colorScheme],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  );
}

export default Badge;
