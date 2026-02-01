import { forwardRef, TextareaHTMLAttributes } from 'react';
import styles from '../../styles/components/form/FormTextarea.module.css';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, isRequired = false, className = '', ...props }, ref) => {
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

    const textareaClasses = [styles.textarea, className].filter(Boolean).join(' ');

    return (
      <div className={formControlClasses}>
        {label && <label className={labelClasses}>{label}</label>}
        <textarea ref={ref} className={textareaClasses} {...props} />
        {error && <span className={styles.errorMessage}>{error}</span>}
        {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
