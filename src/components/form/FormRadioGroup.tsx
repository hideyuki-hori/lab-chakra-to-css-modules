import styles from '../../styles/components/form/FormRadioGroup.module.css';

interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  isRequired?: boolean;
  options: RadioOption[];
  direction?: 'row' | 'column';
}

export default function FormRadioGroup({
  name,
  value,
  onChange,
  label,
  error,
  isRequired = false,
  options,
  direction = 'row',
}: FormRadioGroupProps) {
  const formControlClasses = [
    styles.formControl,
    error && styles.invalid,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClasses = [
    styles.label,
    isRequired && styles.required,
  ]
    .filter(Boolean)
    .join(' ');

  const radioGroupClasses = [
    styles.radioGroup,
    direction === 'row' ? styles.radioGroupRow : styles.radioGroupColumn,
  ].join(' ');

  return (
    <div className={formControlClasses}>
      {label && <span className={labelClasses}>{label}</span>}
      <div className={radioGroupClasses} role="radiogroup">
        {options.map((option) => (
          <label key={option.value} className={styles.radioLabel}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className={styles.radio}
            />
            <span className={styles.radioText}>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
