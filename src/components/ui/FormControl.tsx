import React, { createContext, useContext } from 'react';
import styles from './FormControl.module.css';

interface FormControlContextValue {
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
}

const FormControlContext = createContext<FormControlContextValue>({});

export const useFormControl = () => useContext(FormControlContext);

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
}

export function FormControl({
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  className,
  children,
  ...props
}: FormControlProps) {
  const classNames = [styles.formControl, className].filter(Boolean).join(' ');

  return (
    <FormControlContext.Provider value={{ isRequired, isInvalid, isDisabled }}>
      <div className={classNames} {...props}>
        {children}
      </div>
    </FormControlContext.Provider>
  );
}

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function FormLabel({ className, children, ...props }: FormLabelProps) {
  const { isRequired } = useFormControl();
  const classNames = [styles.formLabel, className].filter(Boolean).join(' ');

  return (
    <label className={classNames} {...props}>
      {children}
      {isRequired && <span className={styles.requiredIndicator}>*</span>}
    </label>
  );
}

export interface FormErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormErrorMessage({ className, children, ...props }: FormErrorMessageProps) {
  const { isInvalid } = useFormControl();

  if (!isInvalid) return null;

  const classNames = [styles.formErrorMessage, className].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="alert" {...props}>
      {children}
    </div>
  );
}

export interface FormHelperTextProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormHelperText({ className, children, ...props }: FormHelperTextProps) {
  const classNames = [styles.formHelperText, className].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
