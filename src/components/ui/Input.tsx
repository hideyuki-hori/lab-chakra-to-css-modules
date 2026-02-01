import React, { forwardRef, createContext, useContext } from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'outline' | 'filled' | 'flushed';

interface InputGroupContextValue {
  size?: InputSize;
  hasLeftElement?: boolean;
  hasRightElement?: boolean;
}

const InputGroupContext = createContext<InputGroupContextValue>({});

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  variant?: InputVariant;
  isInvalid?: boolean;
  isDisabled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size: sizeProp = 'md',
      variant = 'outline',
      isInvalid = false,
      isDisabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const context = useContext(InputGroupContext);
    const size = context.size || sizeProp;
    const hasLeftElement = context.hasLeftElement;
    const hasRightElement = context.hasRightElement;

    const classNames = [
      styles.input,
      styles[size],
      styles[variant],
      isInvalid ? styles.invalid : '',
      hasLeftElement ? styles.withLeftElement : '',
      hasRightElement ? styles.withRightElement : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <input
        ref={ref}
        className={classNames}
        disabled={isDisabled}
        aria-invalid={isInvalid}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: InputSize;
  children: React.ReactNode;
}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ size = 'md', children, className, ...props }, ref) => {
    const hasLeftElement = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && child.type === InputLeftElement
    );
    const hasRightElement = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && child.type === InputRightElement
    );

    const classNames = [styles.inputGroup, className].filter(Boolean).join(' ');

    return (
      <InputGroupContext.Provider value={{ size, hasLeftElement, hasRightElement }}>
        <div ref={ref} className={classNames} {...props}>
          {children}
        </div>
      </InputGroupContext.Provider>
    );
  }
);

InputGroup.displayName = 'InputGroup';

export interface InputElementProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const InputLeftElement = forwardRef<HTMLDivElement, InputElementProps>(
  ({ children, className, ...props }, ref) => {
    const context = useContext(InputGroupContext);
    const size = context.size || 'md';

    const classNames = [
      styles.inputElement,
      styles.inputLeftElement,
      styles[`element${size.charAt(0).toUpperCase() + size.slice(1)}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

InputLeftElement.displayName = 'InputLeftElement';

export const InputRightElement = forwardRef<HTMLDivElement, InputElementProps>(
  ({ children, className, ...props }, ref) => {
    const context = useContext(InputGroupContext);
    const size = context.size || 'md';

    const classNames = [
      styles.inputElement,
      styles.inputRightElement,
      styles[`element${size.charAt(0).toUpperCase() + size.slice(1)}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

InputRightElement.displayName = 'InputRightElement';

export default Input;
