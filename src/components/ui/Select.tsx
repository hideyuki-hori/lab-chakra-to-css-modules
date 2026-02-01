import { forwardRef, SelectHTMLAttributes, ReactNode } from 'react';
import styles from './Select.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'color'>, LayoutProps {
  size?: SelectSize;
  placeholder?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  children?: ReactNode;
}

const sizeClassMap: Record<SelectSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = 'md',
      placeholder,
      isDisabled = false,
      isInvalid = false,
      isReadOnly = false,
      isRequired = false,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [styles.select, sizeClassMap[size], className]
      .filter(Boolean)
      .join(' ');

    const mergedStyle = mergeStyles(layoutStyle, style);

    return (
      <select
        ref={ref}
        className={classNames}
        style={mergedStyle}
        disabled={isDisabled || isReadOnly}
        required={isRequired}
        aria-invalid={isInvalid || undefined}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export default Select;
