import { forwardRef, HTMLAttributes, useMemo, useId, useEffect } from 'react';
import styles from './SimpleGrid.module.css';
import { LayoutProps, buildStyles, extractLayoutProps, mergeStyles, applyCSSVars, ResponsiveValue, SpacingValue, CSSPropertiesWithVars } from './styleUtils';

type ColumnsValue = number | { base?: number; sm?: number; md?: number; lg?: number; xl?: number };

export interface SimpleGridProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  columns?: ColumnsValue;
  spacing?: ResponsiveValue<SpacingValue>;
  spacingX?: ResponsiveValue<SpacingValue>;
  spacingY?: ResponsiveValue<SpacingValue>;
}

const isResponsiveColumns = (value: ColumnsValue): value is { base?: number; sm?: number; md?: number; lg?: number; xl?: number } => {
  return typeof value === 'object' && value !== null;
};

const parseSpacing = (value: SpacingValue): string => {
  if (typeof value === 'number') {
    return `calc(var(--spacing) * ${value})`;
  }
  return value;
};

const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridProps>(
  ({ className, style, children, columns = 1, spacing, spacingX, spacingY, ...props }, ref) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: computedStyle, cssVars } = buildStyles(layoutProps);
    const uniqueId = useId();
    const gridId = `simple-grid-${uniqueId.replace(/:/g, '')}`;

    useEffect(() => {
      const styleId = `style-${gridId}`;
      let styleEl = document.getElementById(styleId);

      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }

      let cssRules = '';

      if (isResponsiveColumns(columns)) {
        if (columns.base !== undefined) {
          cssRules += `.${gridId} { grid-template-columns: repeat(${columns.base}, minmax(0, 1fr)); }\n`;
        }
        if (columns.sm !== undefined) {
          cssRules += `@media (min-width: 480px) { .${gridId} { grid-template-columns: repeat(${columns.sm}, minmax(0, 1fr)); } }\n`;
        }
        if (columns.md !== undefined) {
          cssRules += `@media (min-width: 768px) { .${gridId} { grid-template-columns: repeat(${columns.md}, minmax(0, 1fr)); } }\n`;
        }
        if (columns.lg !== undefined) {
          cssRules += `@media (min-width: 992px) { .${gridId} { grid-template-columns: repeat(${columns.lg}, minmax(0, 1fr)); } }\n`;
        }
        if (columns.xl !== undefined) {
          cssRules += `@media (min-width: 1280px) { .${gridId} { grid-template-columns: repeat(${columns.xl}, minmax(0, 1fr)); } }\n`;
        }
      }

      styleEl.textContent = cssRules;

      return () => {
        const el = document.getElementById(styleId);
        if (el) {
          el.remove();
        }
      };
    }, [columns, gridId]);

    const combinedStyle = useMemo((): CSSPropertiesWithVars => {
      const merged = mergeStyles(computedStyle, style);
      const result = applyCSSVars(merged, cssVars);

      if (!isResponsiveColumns(columns)) {
        result.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
      }

      const gapValue = spacing !== undefined ? spacing : layoutProps.gap;
      if (gapValue !== undefined) {
        if (typeof gapValue === 'object') {
          if (gapValue.base !== undefined) {
            result.gap = parseSpacing(gapValue.base);
          }
        } else {
          result.gap = parseSpacing(gapValue);
        }
      }

      if (spacingX !== undefined) {
        if (typeof spacingX === 'object') {
          if (spacingX.base !== undefined) {
            result.columnGap = parseSpacing(spacingX.base);
          }
        } else {
          result.columnGap = parseSpacing(spacingX);
        }
      }

      if (spacingY !== undefined) {
        if (typeof spacingY === 'object') {
          if (spacingY.base !== undefined) {
            result.rowGap = parseSpacing(spacingY.base);
          }
        } else {
          result.rowGap = parseSpacing(spacingY);
        }
      }

      return result;
    }, [computedStyle, style, cssVars, columns, spacing, spacingX, spacingY, layoutProps.gap]);

    const classNames = [styles.simpleGrid, gridId];
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

SimpleGrid.displayName = 'SimpleGrid';

export default SimpleGrid;
