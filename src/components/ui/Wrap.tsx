import { forwardRef, HTMLAttributes, CSSProperties, useMemo } from 'react';
import styles from './Wrap.module.css';
import { LayoutProps, buildStyles, extractLayoutProps, mergeStyles, applyCSSVars, ResponsiveValue, SpacingValue, CSSPropertiesWithVars } from './styleUtils';

export interface WrapProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  spacing?: ResponsiveValue<SpacingValue>;
  spacingX?: ResponsiveValue<SpacingValue>;
  spacingY?: ResponsiveValue<SpacingValue>;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
}

const Wrap = forwardRef<HTMLDivElement, WrapProps>(
  ({ className, style, children, spacing, spacingX, spacingY, align, justify, ...props }, ref) => {
    const { layoutProps, rest } = extractLayoutProps(props);

    if (spacing !== undefined && layoutProps.gap === undefined) {
      layoutProps.gap = spacing;
    }
    if (align && !layoutProps.alignItems) {
      layoutProps.alignItems = align;
    }
    if (justify && !layoutProps.justifyContent) {
      layoutProps.justifyContent = justify;
    }

    const { style: computedStyle, cssVars } = buildStyles(layoutProps);

    const combinedStyle = useMemo((): CSSPropertiesWithVars => {
      const merged = mergeStyles(computedStyle, style);
      const result = applyCSSVars(merged, cssVars);

      const parseSpacing = (value: SpacingValue): string => {
        if (typeof value === 'number') {
          return `calc(var(--spacing) * ${value})`;
        }
        return value;
      };

      if (spacingX !== undefined) {
        if (typeof spacingX === 'object') {
          if (spacingX.base !== undefined) {
            result.columnGap = parseSpacing(spacingX.base);
          }
        } else {
          result.columnGap = parseSpacing(spacingX);
        }
      }

      if (spacingY !== undefined) {
        if (typeof spacingY === 'object') {
          if (spacingY.base !== undefined) {
            result.rowGap = parseSpacing(spacingY.base);
          }
        } else {
          result.rowGap = parseSpacing(spacingY);
        }
      }

      return result;
    }, [computedStyle, style, cssVars, spacingX, spacingY]);

    const classNames = [styles.wrap];
    if (className) {
      classNames.push(className);
    }

    return (
      <div
        ref={ref}
        className={classNames.join(' ')}
        style={combinedStyle}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Wrap.displayName = 'Wrap';

export default Wrap;
