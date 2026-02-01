import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './Badge.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';

export type BadgeVariant = 'solid' | 'subtle' | 'outline';
export type BadgeColorScheme = 'gray' | 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'yellow';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'>, LayoutProps {
  variant?: BadgeVariant;
  colorScheme?: BadgeColorScheme;
  children?: ReactNode;
}

const variantColorClassMap: Record<BadgeVariant, Record<BadgeColorScheme, string>> = {
  solid: {
    gray: styles.solidGray,
    blue: styles.solidBlue,
    green: styles.solidGreen,
    orange: styles.solidOrange,
    red: styles.solidRed,
    purple: styles.solidPurple,
    yellow: styles.solidYellow,
  },
  subtle: {
    gray: styles.subtleGray,
    blue: styles.subtleBlue,
    green: styles.subtleGreen,
    orange: styles.subtleOrange,
    red: styles.subtleRed,
    purple: styles.subtlePurple,
    yellow: styles.subtleYellow,
  },
  outline: {
    gray: styles.outlineGray,
    blue: styles.outlineBlue,
    green: styles.outlineGreen,
    orange: styles.outlineOrange,
    red: styles.outlineRed,
    purple: styles.outlinePurple,
    yellow: styles.outlineYellow,
  },
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'subtle',
      colorScheme = 'gray',
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [
      styles.badge,
      variantColorClassMap[variant][colorScheme],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const mergedStyle = mergeStyles(layoutStyle, style);

    return (
      <span ref={ref} className={classNames} style={mergedStyle} {...rest}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
