import React, { forwardRef } from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'outline' | 'filled' | 'flushed';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  variant?: InputVariant;
  isInvalid?: boolean;
  isDisabled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      variant = 'outline',
      isInvalid = false,
      isDisabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.input,
      styles[size],
      styles[variant],
      isInvalid ? styles.invalid : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <input
        ref={ref}
        className={classNames}
        disabled={isDisabled}
        aria-invalid={isInvalid}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
