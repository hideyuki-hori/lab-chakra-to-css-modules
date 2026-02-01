import { forwardRef, HTMLAttributes } from 'react';
import styles from './Progress.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';
export type ProgressColorScheme = 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'cyan' | 'pink' | 'yellow' | 'gray';

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  value?: number;
  min?: number;
  max?: number;
  size?: ProgressSize;
  colorScheme?: ProgressColorScheme;
  hasStripe?: boolean;
  isAnimated?: boolean;
  isIndeterminate?: boolean;
  borderRadius?: string;
}

const sizeClassMap: Record<ProgressSize, string> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const colorSchemeClassMap: Record<ProgressColorScheme, string> = {
  blue: styles.colorBlue,
  green: styles.colorGreen,
  orange: styles.colorOrange,
  red: styles.colorRed,
  purple: styles.colorPurple,
  cyan: styles.colorCyan,
  pink: styles.colorPink,
  yellow: styles.colorYellow,
  gray: styles.colorGray,
};

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      min = 0,
      max = 100,
      size = 'md',
      colorScheme = 'blue',
      hasStripe = false,
      isAnimated = false,
      isIndeterminate = false,
      borderRadius,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { layoutProps, rest } = extractLayoutProps({ borderRadius, ...props });
    const { style: layoutStyle } = buildStyles(layoutProps);

    const percent = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

    const trackClassNames = [
      styles.track,
      sizeClassMap[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const filledClassNames = [
      styles.filled,
      colorSchemeClassMap[colorScheme],
      hasStripe ? styles.stripe : '',
      isAnimated && hasStripe ? styles.animated : '',
      isIndeterminate ? styles.indeterminate : '',
    ]
      .filter(Boolean)
      .join(' ');

    const mergedStyle = mergeStyles(layoutStyle, style);

    const filledStyle = isIndeterminate
      ? {}
      : { width: `${percent}%` };

    return (
      <div
        ref={ref}
        className={trackClassNames}
        style={mergedStyle}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={min}
        aria-valuemax={max}
        {...rest}
      >
        <div className={filledClassNames} style={filledStyle} />
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export default Progress;
