import React, { forwardRef } from 'react';
import styles from './Switch.module.css';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchColorScheme = 'primary' | 'green' | 'blue' | 'red';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: SwitchSize;
  colorScheme?: SwitchColorScheme;
  isChecked?: boolean;
  isDisabled?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
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

    const switchClassNames = [styles.switch, styles[colorScheme]]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={wrapperClassNames}>
        <input
          ref={ref}
          type="checkbox"
          className={switchClassNames}
          checked={isChecked}
          disabled={isDisabled}
          role="switch"
          {...props}
        />
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
        {children && <span className={styles.label}>{children}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
