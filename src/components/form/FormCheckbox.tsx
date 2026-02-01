import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/components/form/FormCheckbox.module.css';

interface FormCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string;
  isAnimated?: boolean;
  children?: ReactNode;
}

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ error, isAnimated = true, children, className = '', ...props }, ref) => {
    const checkboxElement = (
      <label className={styles.label}>
        <input
          ref={ref}
          type="checkbox"
          className={`${styles.checkbox} ${className}`}
          {...props}
        />
        {children && <span className={styles.labelText}>{children}</span>}
      </label>
    );

    if (isAnimated) {
      return (
        <div className={styles.formControl}>
          <motion.span
            className={styles.wrapper}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {checkboxElement}
          </motion.span>
          {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
      );
    }

    return (
      <div className={styles.formControl}>
        {checkboxElement}
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;
