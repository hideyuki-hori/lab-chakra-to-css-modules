import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import styles from '../../styles/components/form.module.css';

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
      className,
      ...props
    },
    ref
  ) => {
    const hasLeftElement = !!leftElement;
    const hasRightElement = !!rightElement;

    const labelClasses = [styles.label, isRequired ? styles.labelRequired : ''].filter(Boolean).join(' ');
    const inputClasses = [
      styles.input,
      error ? styles.inputError : '',
      hasLeftElement ? styles.inputWithLeftElement : '',
      hasRightElement ? styles.inputWithRightElement : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div className={styles.formControl}>
        {label && <label className={labelClasses}>{label}</label>}
        <div className={styles.inputGroup}>
          {hasLeftElement && <span className={styles.leftElement}>{leftElement}</span>}
          <input ref={ref} className={inputClasses} {...props} />
          {hasRightElement && <span className={styles.rightElement}>{rightElement}</span>}
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
