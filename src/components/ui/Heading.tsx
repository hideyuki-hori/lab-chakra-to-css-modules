import { forwardRef, HTMLAttributes, useMemo, createElement } from 'react';
import styles from './Heading.module.css';
import {
  LayoutProps,
  buildStyles,
  extractLayoutProps,
  mergeStyles,
  applyCSSVars,
  CSSPropertiesWithVars,
} from './styleUtils';

type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>, Omit<LayoutProps, 'fontSize'> {
  size?: HeadingSize;
  as?: HeadingTag;
}

const sizeClassMap: Record<HeadingSize, string> = {
  '4xl': styles.size4xl,
  '3xl': styles.size3xl,
  '2xl': styles.size2xl,
  xl: styles.sizeXl,
  lg: styles.sizeLg,
  md: styles.sizeMd,
  sm: styles.sizeSm,
  xs: styles.sizeXs,
};

const sizeToTagMap: Record<HeadingSize, HeadingTag> = {
  '4xl': 'h1',
  '3xl': 'h2',
  '2xl': 'h3',
  xl: 'h4',
  lg: 'h5',
  md: 'h6',
  sm: 'h6',
  xs: 'h6',
};

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, style, children, size = 'xl', as, ...props }, ref) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: computedStyle, cssVars } = buildStyles(layoutProps);

    const combinedStyle = useMemo((): CSSPropertiesWithVars => {
      const merged = mergeStyles(computedStyle, style);
      return applyCSSVars(merged, cssVars);
    }, [computedStyle, style, cssVars]);

    const classNames = [styles.heading, sizeClassMap[size]];

    if (className) {
      classNames.push(className);
    }

    const tag = as || sizeToTagMap[size];

    return createElement(
      tag,
      {
        ref,
        className: classNames.join(' '),
        style: combinedStyle,
        ...rest,
      },
      children
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
