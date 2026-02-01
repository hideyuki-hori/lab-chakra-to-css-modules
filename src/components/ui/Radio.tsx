import { forwardRef, InputHTMLAttributes, ReactNode, useContext } from 'react';
import styles from './Radio.module.css';
import { RadioGroupContext } from './RadioGroup';

export type RadioColorScheme = 'blue' | 'primary' | 'green' | 'red' | 'orange' | 'gray';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string;
  colorScheme?: RadioColorScheme;
  children?: ReactNode;
  isDisabled?: boolean;
}

const colorSchemeClassMap: Record<RadioColorScheme, string> = {
  blue: styles.colorBlue,
  primary: styles.colorPrimary,
  green: styles.colorGreen,
  red: styles.colorRed,
  orange: styles.colorOrange,
  gray: styles.colorGray,
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      colorScheme = 'blue',
      children,
      isDisabled = false,
      className,
      onChange,
      checked,
      name,
      ...props
    },
    ref
  ) => {
    const context = useContext(RadioGroupContext);

    const isChecked = context ? context.value === value : checked;
    const handleChange = context
      ? (e: React.ChangeEvent<HTMLInputElement>) => {
          context.onChange(e.target.value);
          if (onChange) onChange(e);
        }
      : onChange;
    const groupName = context?.name || name;

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
          type="radio"
          className={styles.input}
          value={value}
          checked={isChecked}
          onChange={handleChange}
          disabled={isDisabled}
          name={groupName}
          {...props}
        />
        <span className={styles.radio}>
          <span className={styles.dot} />
        </span>
        {children && <span className={styles.label}>{children}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
