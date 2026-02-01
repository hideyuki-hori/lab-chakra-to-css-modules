import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Switch.module.css';

export type SwitchColorScheme = 'blue' | 'primary' | 'green' | 'red' | 'orange' | 'gray' | 'teal';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  isChecked?: boolean;
  colorScheme?: SwitchColorScheme;
  isDisabled?: boolean;
}

const colorSchemeClassMap: Record<SwitchColorScheme, string> = {
  blue: styles.colorBlue,
  primary: styles.colorPrimary,
  green: styles.colorGreen,
  red: styles.colorRed,
  orange: styles.colorOrange,
  gray: styles.colorGray,
  teal: styles.colorTeal,
};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      isChecked,
      colorScheme = 'blue',
      isDisabled = false,
      className,
      defaultChecked,
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
          defaultChecked={defaultChecked}
          disabled={isDisabled}
          {...props}
        />
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
      </label>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
