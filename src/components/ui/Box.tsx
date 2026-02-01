import { forwardRef, HTMLAttributes, useMemo } from 'react';
import styles from './Box.module.css';
import { LayoutProps, buildStyles, extractLayoutProps, mergeStyles, applyCSSVars, CSSPropertiesWithVars } from './styleUtils';

export interface BoxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  _hover?: {
    bg?: string;
    borderColor?: string;
    transform?: string;
    boxShadow?: string;
  };
}

const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ className, style, children, _hover, ...props }, ref) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: computedStyle, cssVars } = buildStyles(layoutProps);

    const combinedStyle = useMemo((): CSSPropertiesWithVars => {
      const merged = mergeStyles(computedStyle, style);
      return applyCSSVars(merged, cssVars);
    }, [computedStyle, style, cssVars]);

    const classNames = [styles.box];
    if (_hover) {
      classNames.push(styles.hoverable);
    }
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

Box.displayName = 'Box';

export default Box;
