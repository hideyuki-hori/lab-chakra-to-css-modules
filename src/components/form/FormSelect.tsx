import { forwardRef, SelectHTMLAttributes } from 'react';
import styles from '../../styles/components/form.module.css';

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
      className,
      ...props
    },
    ref
  ) => {
    const labelClasses = [styles.label, isRequired ? styles.labelRequired : ''].filter(Boolean).join(' ');
    const selectClasses = [styles.select, error ? styles.inputError : '', className].filter(Boolean).join(' ');

    return (
      <div className={styles.formControl}>
        {label && <label className={labelClasses}>{label}</label>}
        <select ref={ref} className={selectClasses} {...props}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
