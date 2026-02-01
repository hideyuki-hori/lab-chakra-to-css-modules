import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/components/form.module.css';

interface FormCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string;
  isAnimated?: boolean;
  children?: ReactNode;
}

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ error, isAnimated = true, children, className, ...props }, ref) => {
    const checkbox = (
      <label className={styles.checkbox}>
        <input
          ref={ref}
          type="checkbox"
          className={styles.checkboxInput}
          {...props}
        />
        {children && <span className={styles.checkboxLabel}>{children}</span>}
      </label>
    );

    if (isAnimated) {
      return (
        <div className={styles.formControl}>
          <motion.div
            style={{ display: 'inline-block' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {checkbox}
          </motion.div>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      );
    }

    return (
      <div className={styles.formControl}>
        {checkbox}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;
