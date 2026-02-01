import React, { forwardRef } from 'react';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxColorScheme = 'primary' | 'green' | 'blue' | 'red';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: CheckboxSize;
  colorScheme?: CheckboxColorScheme;
  isChecked?: boolean;
  isDisabled?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'md',
      colorScheme = 'primary',
      isChecked,
      isDisabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const wrapperClassNames = [
      styles.wrapper,
      styles[size],
      isDisabled ? styles.disabled : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const checkboxClassNames = [styles.checkbox, styles[colorScheme]]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={wrapperClassNames}>
        <input
          ref={ref}
          type="checkbox"
          className={checkboxClassNames}
          checked={isChecked}
          disabled={isDisabled}
          {...props}
        />
        <span className={styles.control}>
          <svg
            className={styles.icon}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {children && <span className={styles.label}>{children}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
