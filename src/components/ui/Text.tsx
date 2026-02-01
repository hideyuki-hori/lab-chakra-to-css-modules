import React from 'react';
import styles from './Text.module.css';

type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'label';
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  color?: string;
  noOfLines?: number;
  textAlign?: 'left' | 'center' | 'right';
  maxW?: string;
}

const fontSizeMap: Record<FontSize, string> = {
  xs: 'var(--font-size-xs)',
  sm: 'var(--font-size-sm)',
  md: 'var(--font-size-md)',
  lg: 'var(--font-size-lg)',
  xl: 'var(--font-size-xl)',
  '2xl': 'var(--font-size-2xl)',
  '3xl': 'var(--font-size-3xl)',
  '4xl': 'var(--font-size-4xl)',
};

const fontWeightMap: Record<FontWeight, string> = {
  normal: 'var(--font-weight-normal)',
  medium: 'var(--font-weight-medium)',
  semibold: 'var(--font-weight-semibold)',
  bold: 'var(--font-weight-bold)',
};

export function Text({
  as: Component = 'p',
  fontSize,
  fontWeight,
  color,
  noOfLines,
  textAlign,
  maxW,
  className,
  style,
  children,
  ...props
}: TextProps) {
  const textStyle: React.CSSProperties = {
    ...(fontSize && { fontSize: fontSizeMap[fontSize] }),
    ...(fontWeight && { fontWeight: fontWeightMap[fontWeight] }),
    ...(color && { color }),
    ...(textAlign && { textAlign }),
    ...(maxW && { maxWidth: maxW }),
    ...(noOfLines && {
      display: '-webkit-box',
      WebkitLineClamp: noOfLines,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden',
    }),
    ...style,
  };

  const classNames = [styles.text, className].filter(Boolean).join(' ');

  return (
    <Component className={classNames} style={textStyle} {...props}>
      {children}
    </Component>
  );
}

export default Text;
