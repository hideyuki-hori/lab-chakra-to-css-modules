import { forwardRef, HTMLAttributes } from 'react';
import styles from './Spinner.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  size?: SpinnerSize;
  color?: string;
  thickness?: string;
  speed?: string;
  emptyColor?: string;
  label?: string;
}

const sizeClassMap: Record<SpinnerSize, string> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
};

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      color,
      thickness = '2px',
      speed = '0.65s',
      emptyColor = 'transparent',
      label = 'Loading...',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [
      styles.spinner,
      sizeClassMap[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const customStyle = {
      borderWidth: thickness,
      animationDuration: speed,
      borderColor: emptyColor,
      borderTopColor: color || '#3182CE',
      borderBottomColor: color || '#3182CE',
    };

    const mergedStyle = mergeStyles(layoutStyle, { ...customStyle, ...style });

    return (
      <div
        ref={ref}
        className={classNames}
        style={mergedStyle}
        role="status"
        aria-label={label}
        {...rest}
      >
        <span className={styles.srOnly}>{label}</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export default Spinner;
