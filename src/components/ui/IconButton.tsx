import React, { forwardRef } from 'react';
import styles from './IconButton.module.css';

export type IconButtonVariant = 'solid' | 'outline' | 'ghost';
export type IconButtonColorScheme = 'primary' | 'gray' | 'red' | 'green' | 'blue';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: React.ReactNode;
  'aria-label': string;
  variant?: IconButtonVariant;
  colorScheme?: IconButtonColorScheme;
  size?: IconButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  isRound?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      'aria-label': ariaLabel,
      variant = 'solid',
      colorScheme = 'gray',
      size = 'md',
      isLoading = false,
      isDisabled = false,
      isRound = false,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.iconButton,
      styles[variant],
      styles[colorScheme],
      styles[size],
      isRound ? styles.round : '',
      isLoading ? styles.loading : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={isDisabled || isLoading}
        aria-label={ariaLabel}
        {...props}
      >
        {isLoading ? <span className={styles.spinner} /> : icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
