import { forwardRef, HTMLAttributes, useMemo, CSSProperties } from 'react';
import styles from './Text.module.css';
import {
  LayoutProps,
  buildStyles,
  extractLayoutProps,
  mergeStyles,
  applyCSSVars,
  CSSPropertiesWithVars,
} from './styleUtils';

type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface TextProps extends Omit<HTMLAttributes<HTMLParagraphElement>, 'color'>, LayoutProps {
  fontWeight?: FontWeight;
  noOfLines?: number;
}

const fontWeightClassMap: Record<FontWeight, string> = {
  normal: styles.fontWeightNormal,
  medium: styles.fontWeightMedium,
  semibold: styles.fontWeightSemibold,
  bold: styles.fontWeightBold,
};

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, style, children, fontWeight, noOfLines, ...props }, ref) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: computedStyle, cssVars } = buildStyles(layoutProps);

    const combinedStyle = useMemo((): CSSPropertiesWithVars => {
      const merged = mergeStyles(computedStyle, style);
      const withVars = applyCSSVars(merged, cssVars);

      if (noOfLines !== undefined) {
        withVars['--lines'] = String(noOfLines);
      }

      return withVars;
    }, [computedStyle, style, cssVars, noOfLines]);

    const classNames = [styles.text];

    if (fontWeight) {
      classNames.push(fontWeightClassMap[fontWeight]);
    }

    if (noOfLines !== undefined) {
      classNames.push(styles.truncate);
    }

    if (className) {
      classNames.push(className);
    }

    return (
      <p
        ref={ref}
        className={classNames.join(' ')}
        style={combinedStyle}
        {...rest}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';

export default Text;
