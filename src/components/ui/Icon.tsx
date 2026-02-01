import { forwardRef, SVGAttributes, ReactElement, cloneElement, isValidElement } from 'react';
import styles from './Icon.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IconProps extends Omit<SVGAttributes<SVGElement>, 'color'>, LayoutProps {
  as?: ReactElement;
  boxSize?: IconSize | string | number;
  color?: string;
}

const sizeClassMap: Record<IconSize, string> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
  '2xl': styles.size2xl,
};

const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      as: asElement,
      boxSize = 'md',
      color,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { layoutProps, rest } = extractLayoutProps({ color, ...props });
    const { style: layoutStyle } = buildStyles(layoutProps);

    const sizeClass = typeof boxSize === 'string' && boxSize in sizeClassMap
      ? sizeClassMap[boxSize as IconSize]
      : null;

    const classNames = [
      styles.icon,
      sizeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const customSizeStyle = !sizeClass && boxSize !== undefined
      ? {
          width: typeof boxSize === 'number' ? `${boxSize}px` : boxSize,
          height: typeof boxSize === 'number' ? `${boxSize}px` : boxSize,
        }
      : {};

    const mergedStyle = mergeStyles(layoutStyle, { ...customSizeStyle, ...style });

    if (asElement && isValidElement(asElement)) {
      return cloneElement(asElement, {
        ref,
        className: classNames,
        style: mergedStyle,
        ...rest,
      } as SVGAttributes<SVGElement>);
    }

    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        className={classNames}
        style={mergedStyle}
        fill="currentColor"
        {...rest}
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
