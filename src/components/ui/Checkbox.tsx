import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import styles from './Checkbox.module.css';

export type CheckboxColorScheme = 'blue' | 'primary' | 'green' | 'red' | 'orange' | 'gray';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  isChecked?: boolean;
  colorScheme?: CheckboxColorScheme;
  children?: ReactNode;
  isDisabled?: boolean;
}

const colorSchemeClassMap: Record<CheckboxColorScheme, string> = {
  blue: styles.colorBlue,
  primary: styles.colorPrimary,
  green: styles.colorGreen,
  red: styles.colorRed,
  orange: styles.colorOrange,
  gray: styles.colorGray,
};

const CheckIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 12 10"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="1.5 6 4.5 9 10.5 1" />
  </svg>
);

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      isChecked,
      colorScheme = 'blue',
      children,
      isDisabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const containerClasses = [
      styles.container,
      colorSchemeClassMap[colorScheme],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={containerClasses}>
        <input
          ref={ref}
          type="checkbox"
          className={styles.input}
          checked={isChecked}
          disabled={isDisabled}
          {...props}
        />
        <span className={styles.checkbox}>
          <CheckIcon />
        </span>
        {children && <span className={styles.label}>{children}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
