import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'>, LayoutProps {
  size?: InputSize;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  hasLeftElement?: boolean;
  hasRightElement?: boolean;
}

const sizeClassMap: Record<InputSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      isDisabled = false,
      isInvalid = false,
      isReadOnly = false,
      isRequired = false,
      hasLeftElement = false,
      hasRightElement = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [
      styles.input,
      sizeClassMap[size],
      hasLeftElement ? styles.hasLeftElement : undefined,
      hasRightElement ? styles.hasRightElement : undefined,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const mergedStyle = mergeStyles(layoutStyle, style);

    return (
      <input
        ref={ref}
        className={classNames}
        style={mergedStyle}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        aria-invalid={isInvalid || undefined}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
