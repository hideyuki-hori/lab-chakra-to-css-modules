import { createContext, forwardRef, HTMLAttributes, ReactNode, useContext, useId } from 'react';
import styles from './FormControl.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';

export interface FormControlContextValue {
  isRequired: boolean;
  isInvalid: boolean;
  isDisabled: boolean;
  isReadOnly: boolean;
  id: string;
  labelId: string;
  helpTextId: string;
  errorMessageId: string;
}

const FormControlContext = createContext<FormControlContextValue | null>(null);

export const useFormControlContext = (): FormControlContextValue | null => {
  return useContext(FormControlContext);
};

export interface FormControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  children?: ReactNode;
}

const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  (
    {
      isRequired = false,
      isInvalid = false,
      isDisabled = false,
      isReadOnly = false,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const id = `field-${generatedId}`;
    const labelId = `label-${generatedId}`;
    const helpTextId = `helptext-${generatedId}`;
    const errorMessageId = `error-${generatedId}`;

    const contextValue: FormControlContextValue = {
      isRequired,
      isInvalid,
      isDisabled,
      isReadOnly,
      id,
      labelId,
      helpTextId,
      errorMessageId,
    };

    const classNames = [styles.formControl, className].filter(Boolean).join(' ');
    const mergedStyle = mergeStyles(layoutStyle, style);

    return (
      <FormControlContext.Provider value={contextValue}>
        <div ref={ref} role="group" className={classNames} style={mergedStyle} {...rest}>
          {children}
        </div>
      </FormControlContext.Provider>
    );
  }
);

FormControl.displayName = 'FormControl';

export default FormControl;
