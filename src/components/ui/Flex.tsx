import { forwardRef, HTMLAttributes, CSSProperties, useMemo } from 'react';
import styles from './Flex.module.css';
import { LayoutProps, buildStyles, extractLayoutProps, mergeStyles, applyCSSVars, ResponsiveValue, SpacingValue, CSSPropertiesWithVars } from './styleUtils';

export interface FlexProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  direction?: ResponsiveValue<CSSProperties['flexDirection']>;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: ResponsiveValue<CSSProperties['flexWrap']>;
  spacing?: ResponsiveValue<SpacingValue>;
}

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ className, style, children, direction, align, justify, wrap, spacing, ...props }, ref) => {
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
    if (wrap && !layoutProps.flexWrap) {
      layoutProps.flexWrap = wrap;
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

    const classNames = [styles.flex];
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

Flex.displayName = 'Flex';

export default Flex;
