import { forwardRef, HTMLAttributes, CSSProperties, useMemo } from 'react';
import styles from './VStack.module.css';
import { LayoutProps, buildStyles, extractLayoutProps, mergeStyles, applyCSSVars, ResponsiveValue, SpacingValue, CSSPropertiesWithVars } from './styleUtils';

export interface VStackProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  spacing?: ResponsiveValue<SpacingValue>;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
}

const VStack = forwardRef<HTMLDivElement, VStackProps>(
  ({ className, style, children, spacing, align = 'center', justify, ...props }, ref) => {
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
      return applyCSSVars(merged, cssVars);
    }, [computedStyle, style, cssVars]);

    const classNames = [styles.vstack];
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

VStack.displayName = 'VStack';

export default VStack;
