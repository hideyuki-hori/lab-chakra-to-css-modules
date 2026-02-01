'use client';

import { forwardRef, ImgHTMLAttributes, useState, SyntheticEvent } from 'react';
import styles from './Image.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles, RadiusValue } from './styleUtils';

export type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'color'>, LayoutProps {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
  fallback?: React.ReactNode;
  fit?: ImageFit;
  borderRadius?: RadiusValue;
  boxSize?: string | number;
  ignoreFallback?: boolean;
  onLoad?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
}

const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt = '',
      fallbackSrc,
      fallback,
      fit = 'cover',
      borderRadius,
      boxSize,
      ignoreFallback = false,
      className,
      style,
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const { layoutProps, rest } = extractLayoutProps({ borderRadius, ...props });
    const { style: layoutStyle } = buildStyles(layoutProps);

    const handleLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
      setIsLoaded(true);
      setHasError(false);
      onLoad?.(event);
    };

    const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
      setHasError(true);
      onError?.(event);
    };

    const classNames = [
      styles.image,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const boxSizeStyle = boxSize !== undefined
      ? {
          width: typeof boxSize === 'number' ? `${boxSize}px` : boxSize,
          height: typeof boxSize === 'number' ? `${boxSize}px` : boxSize,
        }
      : {};

    const mergedStyle = mergeStyles(layoutStyle, {
      objectFit: fit,
      ...boxSizeStyle,
      ...style,
    });

    if (!ignoreFallback && hasError && fallback) {
      return <>{fallback}</>;
    }

    if (!ignoreFallback && hasError && fallbackSrc) {
      return (
        <img
          ref={ref}
          src={fallbackSrc}
          alt={alt}
          className={classNames}
          style={mergedStyle}
          {...rest}
        />
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={classNames}
        style={mergedStyle}
        onLoad={handleLoad}
        onError={handleError}
        data-loaded={isLoaded}
        {...rest}
      />
    );
  }
);

Image.displayName = 'Image';

export default Image;
