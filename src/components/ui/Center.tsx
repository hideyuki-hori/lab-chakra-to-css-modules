import { forwardRef, HTMLAttributes, useMemo } from 'react';
import styles from './Center.module.css';
import { LayoutProps, buildStyles, extractLayoutProps, mergeStyles, applyCSSVars, CSSPropertiesWithVars } from './styleUtils';

export interface CenterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {}

const Center = forwardRef<HTMLDivElement, CenterProps>(
  ({ className, style, children, ...props }, ref) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: computedStyle, cssVars } = buildStyles(layoutProps);

    const combinedStyle = useMemo((): CSSPropertiesWithVars => {
      const merged = mergeStyles(computedStyle, style);
      return applyCSSVars(merged, cssVars);
    }, [computedStyle, style, cssVars]);

    const classNames = [styles.center];
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

Center.displayName = 'Center';

export default Center;
