import { forwardRef, TextareaHTMLAttributes } from 'react';
import styles from '../../styles/components/form.module.css';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, isRequired = false, className, ...props }, ref) => {
    const labelClasses = [styles.label, isRequired ? styles.labelRequired : ''].filter(Boolean).join(' ');
    const textareaClasses = [styles.textarea, error ? styles.inputError : '', className].filter(Boolean).join(' ');

    return (
      <div className={styles.formControl}>
        {label && <label className={labelClasses}>{label}</label>}
        <textarea ref={ref} className={textareaClasses} {...props} />
        {error && <p className={styles.errorMessage}>{error}</p>}
        {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
