import { forwardRef, LabelHTMLAttributes, ReactNode } from 'react';
import styles from './FormLabel.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';
import { useFormControlContext } from './FormControl';

export interface FormLabelProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'color'>, LayoutProps {
  children?: ReactNode;
}

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, className, style, ...props }, ref) => {
    const formControl = useFormControlContext();
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const isRequired = formControl?.isRequired ?? false;

    const classNames = [styles.label, className].filter(Boolean).join(' ');
    const mergedStyle = mergeStyles(layoutStyle, style);

    return (
      <label
        ref={ref}
        id={formControl?.labelId}
        htmlFor={formControl?.id}
        className={classNames}
        style={mergedStyle}
        {...rest}
      >
        {children}
        {isRequired && <span className={styles.requiredIndicator}>*</span>}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';

export default FormLabel;
