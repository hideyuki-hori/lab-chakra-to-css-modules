import { forwardRef, ReactElement, ReactNode, ButtonHTMLAttributes, ElementType } from 'react';
import styles from './Button.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColorScheme = 'blue' | 'primary' | 'red' | 'green' | 'gray';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, LayoutProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorScheme?: ButtonColorScheme;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  isLoading?: boolean;
  loadingText?: string;
  isDisabled?: boolean;
  children?: ReactNode;
  as?: ElementType;
  htmlFor?: string;
}

const sizeClassMap: Record<ButtonSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const variantColorClassMap: Record<ButtonVariant, Record<ButtonColorScheme, string>> = {
  solid: {
    blue: styles.solidBlue,
    primary: styles.solidPrimary,
    red: styles.solidRed,
    green: styles.solidGreen,
    gray: styles.solidGray,
  },
  outline: {
    blue: styles.outlineBlue,
    primary: styles.outlinePrimary,
    red: styles.outlineRed,
    green: styles.outlineGreen,
    gray: styles.outlineGray,
  },
  ghost: {
    blue: styles.ghostBlue,
    primary: styles.ghostPrimary,
    red: styles.ghostRed,
    green: styles.ghostGreen,
    gray: styles.ghostGray,
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      colorScheme = 'primary',
      leftIcon,
      rightIcon,
      isLoading = false,
      loadingText,
      isDisabled = false,
      children,
      className,
      style,
      as,
      htmlFor,
      w,
      ...props
    },
    ref
  ) => {
    const { layoutProps, rest } = extractLayoutProps({ w, ...props });
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [
      styles.button,
      sizeClassMap[size],
      variantColorClassMap[variant][colorScheme],
      className,
      w === 'full' ? styles.fullWidth : undefined,
    ]
      .filter(Boolean)
      .join(' ');

    const mergedStyle = mergeStyles(layoutStyle, style);

    const content = isLoading ? (
      <>
        <span className={styles.spinner} />
        {loadingText && <span>{loadingText}</span>}
      </>
    ) : (
      <>
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        {children}
        {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </>
    );

    const Component = as || 'button';

    const buttonProps: Record<string, unknown> = {
      className: classNames,
      style: mergedStyle,
      disabled: isDisabled || isLoading,
      ...rest,
    };

    if (as === 'label' && htmlFor) {
      buttonProps.htmlFor = htmlFor;
    }

    if (Component === 'button') {
      buttonProps.type = buttonProps.type || 'button';
    }

    if (as) {
      return (
        <Component {...buttonProps}>
          {content}
        </Component>
      );
    }

    return (
      <button ref={ref} {...buttonProps}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
