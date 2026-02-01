import { forwardRef, HTMLAttributes, CSSProperties, useMemo } from 'react';
import styles from './Stack.module.css';
import { LayoutProps, buildStyles, extractLayoutProps, mergeStyles, applyCSSVars, ResponsiveValue, SpacingValue, CSSPropertiesWithVars } from './styleUtils';

export interface StackProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  direction?: ResponsiveValue<'row' | 'column' | 'row-reverse' | 'column-reverse'>;
  spacing?: ResponsiveValue<SpacingValue>;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
}

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, style, children, direction = 'column', spacing, align, justify, ...props }, ref) => {
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
      if (direction) {
        if (typeof direction === 'string') {
          result.flexDirection = direction;
        } else if (direction.base) {
          result.flexDirection = direction.base;
        }
      }
      return result;
    }, [computedStyle, style, cssVars, direction]);

    const classNames = [styles.stack];
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

Stack.displayName = 'Stack';

export default Stack;
