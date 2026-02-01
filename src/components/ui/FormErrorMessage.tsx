import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './FormErrorMessage.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';
import { useFormControlContext } from './FormControl';

export interface FormErrorMessageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  children?: ReactNode;
}

const FormErrorMessage = forwardRef<HTMLDivElement, FormErrorMessageProps>(
  ({ children, className, style, ...props }, ref) => {
    const formControl = useFormControlContext();
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const isInvalid = formControl?.isInvalid ?? false;

    if (!isInvalid) {
      return null;
    }

    const classNames = [styles.errorMessage, className].filter(Boolean).join(' ');
    const mergedStyle = mergeStyles(layoutStyle, style);

    return (
      <div
        ref={ref}
        id={formControl?.errorMessageId}
        role="alert"
        aria-live="polite"
        className={classNames}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

FormErrorMessage.displayName = 'FormErrorMessage';

export default FormErrorMessage;
