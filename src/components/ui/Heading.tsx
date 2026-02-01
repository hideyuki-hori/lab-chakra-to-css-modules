import React from 'react';
import styles from './Heading.module.css';

type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: HeadingSize;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  mb?: number;
}

const sizeToElement: Record<HeadingSize, HeadingLevel> = {
  '4xl': 'h1',
  '3xl': 'h1',
  '2xl': 'h2',
  xl: 'h2',
  lg: 'h3',
  md: 'h4',
  sm: 'h5',
  xs: 'h6',
};

const sizeToFontSize: Record<HeadingSize, string> = {
  '4xl': 'var(--font-size-4xl)',
  '3xl': 'var(--font-size-3xl)',
  '2xl': 'var(--font-size-2xl)',
  xl: 'var(--font-size-xl)',
  lg: 'var(--font-size-lg)',
  md: 'var(--font-size-md)',
  sm: 'var(--font-size-sm)',
  xs: 'var(--font-size-xs)',
};

const spacingMap: Record<number, string> = {
  0: '0',
  1: 'var(--spacing-1)',
  2: 'var(--spacing-2)',
  3: 'var(--spacing-3)',
  4: 'var(--spacing-4)',
  5: 'var(--spacing-5)',
  6: 'var(--spacing-6)',
  8: 'var(--spacing-8)',
};

export function Heading({
  as,
  size = 'xl',
  color,
  textAlign,
  mb,
  className,
  style,
  children,
  ...props
}: HeadingProps) {
  const Component = as ?? sizeToElement[size];

  const headingStyle: React.CSSProperties = {
    fontSize: sizeToFontSize[size],
    fontWeight: 'var(--font-weight-bold)',
    fontFamily: 'var(--font-family-heading)',
    lineHeight: 'var(--line-height-tight)',
    ...(color && { color }),
    ...(textAlign && { textAlign }),
    ...(mb !== undefined && { marginBottom: spacingMap[mb] }),
    ...style,
  };

  const classNames = [styles.heading, className].filter(Boolean).join(' ');

  return (
    <Component className={classNames} style={headingStyle} {...props}>
      {children}
    </Component>
  );
}

export default Heading;
