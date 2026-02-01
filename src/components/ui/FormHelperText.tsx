import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './FormHelperText.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';
import { useFormControlContext } from './FormControl';

export interface FormHelperTextProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  children?: ReactNode;
}

const FormHelperText = forwardRef<HTMLDivElement, FormHelperTextProps>(
  ({ children, className, style, ...props }, ref) => {
    const formControl = useFormControlContext();
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [styles.helperText, className].filter(Boolean).join(' ');
    const mergedStyle = mergeStyles(layoutStyle, style);

    return (
      <div
        ref={ref}
        id={formControl?.helpTextId}
        className={classNames}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

FormHelperText.displayName = 'FormHelperText';

export default FormHelperText;
