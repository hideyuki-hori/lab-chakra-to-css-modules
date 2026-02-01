import { CSSProperties } from 'react';

export type CSSPropertiesWithVars = CSSProperties & { [key: `--${string}`]: string };

export type ResponsiveValue<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };

export type SpacingValue = number | string;
export type ColorValue = string;
export type RadiusValue = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | string;

export interface LayoutProps {
  p?: ResponsiveValue<SpacingValue>;
  px?: ResponsiveValue<SpacingValue>;
  py?: ResponsiveValue<SpacingValue>;
  pt?: ResponsiveValue<SpacingValue>;
  pb?: ResponsiveValue<SpacingValue>;
  pl?: ResponsiveValue<SpacingValue>;
  pr?: ResponsiveValue<SpacingValue>;
  m?: ResponsiveValue<SpacingValue>;
  mx?: ResponsiveValue<SpacingValue>;
  my?: ResponsiveValue<SpacingValue>;
  mt?: ResponsiveValue<SpacingValue>;
  mb?: ResponsiveValue<SpacingValue>;
  ml?: ResponsiveValue<SpacingValue>;
  mr?: ResponsiveValue<SpacingValue>;
  w?: ResponsiveValue<string>;
  h?: ResponsiveValue<string>;
  minW?: ResponsiveValue<string>;
  maxW?: ResponsiveValue<string>;
  minH?: ResponsiveValue<string>;
  maxH?: ResponsiveValue<string>;
  bg?: ColorValue;
  bgColor?: ColorValue;
  color?: ColorValue;
  borderRadius?: RadiusValue;
  borderWidth?: string;
  borderTopWidth?: string;
  borderBottomWidth?: string;
  borderLeftWidth?: string;
  borderRightWidth?: string;
  borderColor?: ColorValue;
  border?: string;
  boxShadow?: 'sm' | 'md' | 'lg' | 'xl' | string;
  display?: ResponsiveValue<CSSProperties['display']>;
  flex?: string | number;
  flexWrap?: ResponsiveValue<CSSProperties['flexWrap']>;
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  textAlign?: CSSProperties['textAlign'];
  overflow?: CSSProperties['overflow'];
  overflowX?: CSSProperties['overflowX'];
  overflowY?: CSSProperties['overflowY'];
  transition?: string;
  cursor?: CSSProperties['cursor'];
  gap?: ResponsiveValue<SpacingValue>;
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | string;
}

const isResponsiveObject = <T>(value: ResponsiveValue<T>): value is { base?: T; sm?: T; md?: T; lg?: T; xl?: T } => {
  return typeof value === 'object' && value !== null && ('base' in value || 'sm' in value || 'md' in value || 'lg' in value || 'xl' in value);
};

const parseColorValue = (color: string): string => {
  if (color.includes('.')) {
    const [colorName, shade] = color.split('.');
    return `var(--color-${colorName}-${shade})`;
  }
  if (color === 'white') return 'var(--color-white)';
  if (color === 'black') return 'var(--color-black)';
  return color;
};

const parseSpacingValue = (value: SpacingValue): string => {
  if (typeof value === 'number') {
    return `calc(var(--spacing) * ${value})`;
  }
  return value;
};

const parseRadiusValue = (value: RadiusValue): string => {
  const radiusMap: Record<string, string> = {
    none: 'var(--radius-none)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    full: 'var(--radius-full)',
  };
  return radiusMap[value] || value;
};

const parseShadowValue = (value: string): string => {
  const shadowMap: Record<string, string> = {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
  };
  return shadowMap[value] || value;
};

const parseFontSizeValue = (value: string): string => {
  const fontSizeMap: Record<string, string> = {
    xs: 'var(--font-size-xs)',
    sm: 'var(--font-size-sm)',
    md: 'var(--font-size-md)',
    lg: 'var(--font-size-lg)',
    xl: 'var(--font-size-xl)',
    '2xl': 'var(--font-size-2xl)',
    '3xl': 'var(--font-size-3xl)',
    '4xl': 'var(--font-size-4xl)',
  };
  return fontSizeMap[value] || value;
};

const parseSizeValue = (value: string): string => {
  if (value === 'full') return '100%';
  return value;
};

export interface StyleResult {
  style: CSSPropertiesWithVars;
  cssVars: Record<string, string>;
}

export const buildStyles = (props: LayoutProps): StyleResult => {
  const style: CSSPropertiesWithVars = {};
  const cssVars: Record<string, string> = {};
  let varCounter = 0;

  const getVarName = (prefix: string): string => {
    varCounter++;
    return `--${prefix}-${varCounter}`;
  };

  const handleResponsiveValue = <T>(
    value: ResponsiveValue<T> | undefined,
    cssProperty: keyof CSSProperties,
    transformer?: (v: T) => string
  ): void => {
    if (value === undefined) return;

    if (isResponsiveObject(value)) {
      const varName = getVarName(String(cssProperty));
      if (value.base !== undefined) {
        const transformed = transformer ? transformer(value.base) : String(value.base);
        cssVars[varName] = transformed;
        Object.assign(style, { [cssProperty]: `var(${varName})` });
      }
    } else {
      const transformed = transformer ? transformer(value) : String(value);
      Object.assign(style, { [cssProperty]: transformed });
    }
  };

  handleResponsiveValue(props.p, 'padding', parseSpacingValue);
  handleResponsiveValue(props.px, 'paddingInline', parseSpacingValue);
  handleResponsiveValue(props.py, 'paddingBlock', parseSpacingValue);
  handleResponsiveValue(props.pt, 'paddingTop', parseSpacingValue);
  handleResponsiveValue(props.pb, 'paddingBottom', parseSpacingValue);
  handleResponsiveValue(props.pl, 'paddingLeft', parseSpacingValue);
  handleResponsiveValue(props.pr, 'paddingRight', parseSpacingValue);

  handleResponsiveValue(props.m, 'margin', parseSpacingValue);
  handleResponsiveValue(props.mx, 'marginInline', parseSpacingValue);
  handleResponsiveValue(props.my, 'marginBlock', parseSpacingValue);
  handleResponsiveValue(props.mt, 'marginTop', parseSpacingValue);
  handleResponsiveValue(props.mb, 'marginBottom', parseSpacingValue);
  handleResponsiveValue(props.ml, 'marginLeft', parseSpacingValue);
  handleResponsiveValue(props.mr, 'marginRight', parseSpacingValue);

  handleResponsiveValue(props.w, 'width', parseSizeValue);
  handleResponsiveValue(props.h, 'height', parseSizeValue);
  handleResponsiveValue(props.minW, 'minWidth', parseSizeValue);
  handleResponsiveValue(props.maxW, 'maxWidth', parseSizeValue);
  handleResponsiveValue(props.minH, 'minHeight', parseSizeValue);
  handleResponsiveValue(props.maxH, 'maxHeight', parseSizeValue);

  if (props.bg) {
    style.background = parseColorValue(props.bg);
  }
  if (props.bgColor) {
    style.backgroundColor = parseColorValue(props.bgColor);
  }
  if (props.color) {
    style.color = parseColorValue(props.color);
  }
  if (props.borderRadius) {
    style.borderRadius = parseRadiusValue(props.borderRadius);
  }
  if (props.borderWidth) {
    style.borderWidth = props.borderWidth;
    style.borderStyle = 'solid';
  }
  if (props.borderTopWidth) {
    style.borderTopWidth = props.borderTopWidth;
    style.borderTopStyle = 'solid';
  }
  if (props.borderBottomWidth) {
    style.borderBottomWidth = props.borderBottomWidth;
    style.borderBottomStyle = 'solid';
  }
  if (props.borderLeftWidth) {
    style.borderLeftWidth = props.borderLeftWidth;
    style.borderLeftStyle = 'solid';
  }
  if (props.borderRightWidth) {
    style.borderRightWidth = props.borderRightWidth;
    style.borderRightStyle = 'solid';
  }
  if (props.borderColor) {
    style.borderColor = parseColorValue(props.borderColor);
  }
  if (props.border) {
    const parts = props.border.split(' ');
    if (parts.length >= 1) {
      style.borderWidth = parts[0];
      style.borderStyle = parts[1] || 'solid';
      if (parts[2]) {
        style.borderColor = parseColorValue(parts[2]);
      }
    }
  }
  if (props.boxShadow) {
    style.boxShadow = parseShadowValue(props.boxShadow);
  }
  handleResponsiveValue(props.display, 'display');
  if (props.flex !== undefined) {
    style.flex = props.flex;
  }
  handleResponsiveValue(props.flexWrap, 'flexWrap');
  if (props.alignItems) {
    style.alignItems = props.alignItems;
  }
  if (props.justifyContent) {
    style.justifyContent = props.justifyContent;
  }
  if (props.textAlign) {
    style.textAlign = props.textAlign;
  }
  if (props.overflow) {
    style.overflow = props.overflow;
  }
  if (props.overflowX) {
    style.overflowX = props.overflowX;
  }
  if (props.overflowY) {
    style.overflowY = props.overflowY;
  }
  if (props.transition) {
    style.transition = props.transition;
  }
  if (props.cursor) {
    style.cursor = props.cursor;
  }
  handleResponsiveValue(props.gap, 'gap', parseSpacingValue);
  if (props.fontSize) {
    style.fontSize = parseFontSizeValue(props.fontSize);
  }

  return { style, cssVars };
};

export const extractLayoutProps = <T extends LayoutProps>(props: T): { layoutProps: LayoutProps; rest: Omit<T, keyof LayoutProps> } => {
  const {
    p, px, py, pt, pb, pl, pr,
    m, mx, my, mt, mb, ml, mr,
    w, h, minW, maxW, minH, maxH,
    bg, bgColor, color,
    borderRadius, borderWidth, borderTopWidth, borderBottomWidth, borderLeftWidth, borderRightWidth,
    borderColor, border, boxShadow,
    display, flex, flexWrap, alignItems, justifyContent,
    textAlign, overflow, overflowX, overflowY,
    transition, cursor, gap, fontSize,
    ...rest
  } = props;

  return {
    layoutProps: {
      p, px, py, pt, pb, pl, pr,
      m, mx, my, mt, mb, ml, mr,
      w, h, minW, maxW, minH, maxH,
      bg, bgColor, color,
      borderRadius, borderWidth, borderTopWidth, borderBottomWidth, borderLeftWidth, borderRightWidth,
      borderColor, border, boxShadow,
      display, flex, flexWrap, alignItems, justifyContent,
      textAlign, overflow, overflowX, overflowY,
      transition, cursor, gap, fontSize,
    },
    rest: rest as Omit<T, keyof LayoutProps>,
  };
};

export const mergeStyles = (baseStyle: CSSPropertiesWithVars, additionalStyle?: CSSProperties): CSSPropertiesWithVars => {
  if (!additionalStyle) return baseStyle;
  return { ...baseStyle, ...additionalStyle };
};

export const applyCSSVars = (style: CSSProperties, cssVars: Record<string, string>): CSSPropertiesWithVars => {
  const result: CSSPropertiesWithVars = { ...style };
  Object.entries(cssVars).forEach(([key, value]) => {
    if (key.startsWith('--')) {
      result[key as `--${string}`] = value;
    }
  });
  return result;
};

export const generateResponsiveCSSVars = <T>(
  value: ResponsiveValue<T>,
  varNamePrefix: string,
  transformer: (v: T) => string
): { cssVarsBase: Record<string, string>; mediaQueries: { breakpoint: string; vars: Record<string, string> }[] } => {
  const cssVarsBase: Record<string, string> = {};
  const mediaQueries: { breakpoint: string; vars: Record<string, string> }[] = [];

  if (!isResponsiveObject(value)) {
    cssVarsBase[`--${varNamePrefix}`] = transformer(value);
    return { cssVarsBase, mediaQueries };
  }

  if (value.base !== undefined) {
    cssVarsBase[`--${varNamePrefix}`] = transformer(value.base);
  }

  const breakpoints = {
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
  };

  (['sm', 'md', 'lg', 'xl'] as const).forEach((bp) => {
    if (value[bp] !== undefined) {
      mediaQueries.push({
        breakpoint: breakpoints[bp],
        vars: { [`--${varNamePrefix}`]: transformer(value[bp] as T) },
      });
    }
  });

  return { cssVarsBase, mediaQueries };
};
