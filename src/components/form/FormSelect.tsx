import { forwardRef, SelectHTMLAttributes } from 'react';
import styles from '../../styles/components/form/FormSelect.module.css';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      error,
      helperText,
      isRequired = false,
      options,
      placeholder = '選択してください',
      className = '',
      ...props
    },
    ref
  ) => {
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

    const selectClasses = [styles.select, className].filter(Boolean).join(' ');

    return (
      <div className={formControlClasses}>
        {label && <label className={labelClasses}>{label}</label>}
        <select ref={ref} className={selectClasses} {...props}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className={styles.errorMessage}>{error}</span>}
        {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
