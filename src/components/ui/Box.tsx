import React, { forwardRef } from 'react';
import styles from './Box.module.css';

type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  p?: SpacingValue;
  px?: SpacingValue;
  py?: SpacingValue;
  pt?: SpacingValue;
  pb?: SpacingValue;
  pl?: SpacingValue;
  pr?: SpacingValue;
  m?: SpacingValue;
  mx?: SpacingValue;
  my?: SpacingValue;
  mt?: SpacingValue;
  mb?: SpacingValue;
  ml?: SpacingValue;
  mr?: SpacingValue;
  bg?: string;
  color?: string;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  display?: 'block' | 'flex' | 'inline' | 'inline-block' | 'inline-flex' | 'none';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  w?: string;
  h?: string;
  minH?: string;
  maxW?: string;
  textAlign?: 'left' | 'center' | 'right';
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  zIndex?: number;
}

const spacingMap: Record<SpacingValue, string> = {
  0: '0',
  1: 'var(--spacing-1)',
  2: 'var(--spacing-2)',
  3: 'var(--spacing-3)',
  4: 'var(--spacing-4)',
  5: 'var(--spacing-5)',
  6: 'var(--spacing-6)',
  8: 'var(--spacing-8)',
  10: 'var(--spacing-10)',
  12: 'var(--spacing-12)',
  16: 'var(--spacing-16)',
  20: 'var(--spacing-20)',
  24: 'var(--spacing-24)',
};

const radiusMap: Record<string, string> = {
  none: 'var(--radius-none)',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  '2xl': 'var(--radius-2xl)',
  full: 'var(--radius-full)',
};

const shadowMap: Record<string, string> = {
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  '2xl': 'var(--shadow-2xl)',
};

export const Box = forwardRef<HTMLDivElement, BoxProps>(({
  as: Component = 'div',
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  bg,
  color,
  borderRadius,
  shadow,
  display,
  position,
  w,
  h,
  minH,
  maxW,
  textAlign,
  overflow,
  zIndex,
  className,
  style,
  children,
  ...props
}, ref) => {
  const customStyle: React.CSSProperties = {
    ...(p !== undefined && { padding: spacingMap[p] }),
    ...(px !== undefined && { paddingLeft: spacingMap[px], paddingRight: spacingMap[px] }),
    ...(py !== undefined && { paddingTop: spacingMap[py], paddingBottom: spacingMap[py] }),
    ...(pt !== undefined && { paddingTop: spacingMap[pt] }),
    ...(pb !== undefined && { paddingBottom: spacingMap[pb] }),
    ...(pl !== undefined && { paddingLeft: spacingMap[pl] }),
    ...(pr !== undefined && { paddingRight: spacingMap[pr] }),
    ...(m !== undefined && { margin: spacingMap[m] }),
    ...(mx !== undefined && { marginLeft: spacingMap[mx], marginRight: spacingMap[mx] }),
    ...(my !== undefined && { marginTop: spacingMap[my], marginBottom: spacingMap[my] }),
    ...(mt !== undefined && { marginTop: spacingMap[mt] }),
    ...(mb !== undefined && { marginBottom: spacingMap[mb] }),
    ...(ml !== undefined && { marginLeft: spacingMap[ml] }),
    ...(mr !== undefined && { marginRight: spacingMap[mr] }),
    ...(bg && { backgroundColor: bg }),
    ...(color && { color }),
    ...(borderRadius && { borderRadius: radiusMap[borderRadius] }),
    ...(shadow && { boxShadow: shadowMap[shadow] }),
    ...(display && { display }),
    ...(position && { position }),
    ...(w && { width: w }),
    ...(h && { height: h }),
    ...(minH && { minHeight: minH }),
    ...(maxW && { maxWidth: maxW }),
    ...(textAlign && { textAlign }),
    ...(overflow && { overflow }),
    ...(zIndex !== undefined && { zIndex }),
    ...style,
  };

  const classNames = [styles.box, className].filter(Boolean).join(' ');

  return (
    <Component ref={ref} className={classNames} style={customStyle} {...props}>
      {children}
    </Component>
  );
});

Box.displayName = 'Box';

export default Box;
