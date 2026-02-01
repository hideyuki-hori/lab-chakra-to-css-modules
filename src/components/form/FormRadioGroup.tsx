import styles from '../../styles/components/form.module.css';

interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps {
  name: string;
  label?: string;
  error?: string;
  isRequired?: boolean;
  options: RadioOption[];
  direction?: 'row' | 'column';
  value?: string;
  onChange?: (value: string) => void;
}

export default function FormRadioGroup({
  name,
  label,
  error,
  isRequired = false,
  options,
  direction = 'row',
  value,
  onChange,
}: FormRadioGroupProps) {
  const labelClasses = [styles.label, isRequired ? styles.labelRequired : ''].filter(Boolean).join(' ');
  const radioGroupClasses = [styles.radioGroup, direction === 'column' ? styles.radioGroupColumn : ''].filter(Boolean).join(' ');

  return (
    <div className={styles.formControl}>
      {label && <label className={labelClasses}>{label}</label>}
      <div className={radioGroupClasses}>
        {options.map((option) => (
          <label key={option.value} className={styles.radio}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className={styles.radioInput}
            />
            <span className={styles.radioLabel}>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
