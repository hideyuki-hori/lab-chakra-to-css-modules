import React, { forwardRef } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonColorScheme = 'primary' | 'gray' | 'red' | 'green' | 'blue';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  colorScheme?: ButtonColorScheme;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      colorScheme = 'primary',
      size = 'md',
      isLoading = false,
      isDisabled = false,
      leftIcon,
      rightIcon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.button,
      styles[variant],
      styles[colorScheme],
      styles[size],
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
        {...props}
      >
        {isLoading && <span className={styles.spinner} />}
        {!isLoading && leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <span className={styles.content}>{children}</span>
        {!isLoading && rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
