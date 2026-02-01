import { forwardRef, ReactElement, ButtonHTMLAttributes } from 'react';
import styles from './IconButton.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';

export type IconButtonVariant = 'solid' | 'outline' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonColorScheme = 'blue' | 'primary' | 'red' | 'green' | 'gray';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'children'>, LayoutProps {
  icon: ReactElement;
  'aria-label': string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  colorScheme?: IconButtonColorScheme;
  isDisabled?: boolean;
}

const sizeClassMap: Record<IconButtonSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const variantColorClassMap: Record<IconButtonVariant, Record<IconButtonColorScheme, string>> = {
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

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      'aria-label': ariaLabel,
      variant = 'solid',
      size = 'md',
      colorScheme = 'gray',
      isDisabled = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [
      styles.iconButton,
      sizeClassMap[size],
      variantColorClassMap[variant][colorScheme],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const mergedStyle = mergeStyles(layoutStyle, style);

    return (
      <button
        ref={ref}
        type="button"
        className={classNames}
        style={mergedStyle}
        disabled={isDisabled}
        aria-label={ariaLabel}
        {...rest}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
