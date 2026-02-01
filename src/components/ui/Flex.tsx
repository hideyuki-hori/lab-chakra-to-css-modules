import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';
import styles from './Flex.module.css';

export interface FlexProps extends BoxProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
}

const gapMap: Record<number, string> = {
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
};

export const Flex = forwardRef<HTMLDivElement, FlexProps>(({
  direction,
  justify,
  align,
  wrap,
  gap,
  className,
  style,
  ...props
}, ref) => {
  const flexStyle: React.CSSProperties = {
    display: 'flex',
    ...(direction && { flexDirection: direction }),
    ...(justify && { justifyContent: justify }),
    ...(align && { alignItems: align }),
    ...(wrap && { flexWrap: wrap }),
    ...(gap !== undefined && { gap: gapMap[gap] }),
    ...style,
  };

  const classNames = [styles.flex, className].filter(Boolean).join(' ');

  return <Box ref={ref} className={classNames} style={flexStyle} {...props} />;
});

Flex.displayName = 'Flex';

export default Flex;
