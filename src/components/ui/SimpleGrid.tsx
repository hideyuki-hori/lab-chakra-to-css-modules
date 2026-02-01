import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';
import styles from './SimpleGrid.module.css';

export interface SimpleGridProps extends BoxProps {
  columns?: number | { base?: number; sm?: number; md?: number; lg?: number; xl?: number };
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  spacingX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  spacingY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  minChildWidth?: string;
}

const spacingMap: Record<number, string> = {
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

export const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridProps>(({
  columns = 1,
  spacing = 4,
  spacingX,
  spacingY,
  minChildWidth,
  className,
  style,
  ...props
}, ref) => {
  const columnCount = typeof columns === 'number' ? columns : columns.base ?? 1;

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: minChildWidth
      ? `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`
      : `repeat(${columnCount}, 1fr)`,
    gap: spacingMap[spacing],
    ...(spacingX !== undefined && { columnGap: spacingMap[spacingX] }),
    ...(spacingY !== undefined && { rowGap: spacingMap[spacingY] }),
    ...style,
  };

  const classNames = [styles.simpleGrid, className].filter(Boolean).join(' ');

  return <Box ref={ref} className={classNames} style={gridStyle} {...props} />;
});

SimpleGrid.displayName = 'SimpleGrid';

export default SimpleGrid;
