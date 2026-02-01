import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import styles from '../../styles/components/form/FormInput.module.css';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      helperText,
      isRequired = false,
      leftElement,
      rightElement,
      className = '',
      ...props
    },
    ref
  ) => {
    const hasLeftElement = !!leftElement;
    const hasRightElement = !!rightElement;

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

    const inputClasses = [
      styles.input,
      hasLeftElement && styles.inputWithLeftElement,
      hasRightElement && styles.inputWithRightElement,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={formControlClasses}>
        {label && <label className={labelClasses}>{label}</label>}
        <div className={styles.inputGroup}>
          {hasLeftElement && (
            <span className={styles.leftElement}>{leftElement}</span>
          )}
          <input ref={ref} className={inputClasses} {...props} />
          {hasRightElement && (
            <span className={styles.rightElement}>{rightElement}</span>
          )}
        </div>
        {error && <span className={styles.errorMessage}>{error}</span>}
        {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
