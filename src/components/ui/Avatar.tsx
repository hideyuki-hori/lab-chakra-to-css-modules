import { forwardRef, HTMLAttributes, ReactNode, useState, createContext, useContext } from 'react';
import styles from './Avatar.module.css';

export type AvatarSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  name?: string;
  src?: string;
  children?: ReactNode;
}

interface AvatarContextValue {
  size: AvatarSize;
}

export const AvatarContext = createContext<AvatarContextValue | null>(null);

export const useAvatarContext = (): AvatarContextValue | null => {
  return useContext(AvatarContext);
};

const sizeClassMap: Record<AvatarSize, string> = {
  '2xs': styles.size2xs,
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
  '2xl': styles.size2xl,
};

const backgroundColors = [
  '#E53E3E',
  '#DD6B20',
  '#D69E2E',
  '#38A169',
  '#319795',
  '#3182CE',
  '#805AD5',
  '#D53F8C',
];

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const getBackgroundColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % backgroundColors.length;
  return backgroundColors[index];
};

const DefaultIcon = () => (
  <svg viewBox="0 0 128 128" role="img" aria-label="avatar">
    <g>
      <path
        d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
        fill="currentColor"
      />
      <path
        d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
        fill="currentColor"
      />
    </g>
  </svg>
);

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = 'md', name, src, children, className, style, ...props }, ref) => {
    const [imageError, setImageError] = useState(false);

    const classNames = [styles.avatar, sizeClassMap[size], className]
      .filter(Boolean)
      .join(' ');

    const handleImageError = () => {
      setImageError(true);
    };

    const showImage = src && !imageError;
    const showInitials = !showImage && name;
    const showFallbackIcon = !showImage && !name;

    const backgroundColor = name ? getBackgroundColor(name) : undefined;

    const mergedStyle = {
      ...style,
      ...(showInitials ? { backgroundColor } : {}),
    };

    const contextValue: AvatarContextValue = { size };

    return (
      <AvatarContext.Provider value={contextValue}>
        <div ref={ref} className={classNames} style={mergedStyle} {...props}>
          {showImage && (
            <div className={styles.imageWrapper}>
              <img
                src={src}
                alt={name || 'avatar'}
                className={styles.image}
                onError={handleImageError}
              />
            </div>
          )}
          {showInitials && (
            <span className={styles.initials}>{getInitials(name)}</span>
          )}
          {showFallbackIcon && (
            <div className={styles.fallbackIcon}>
              <DefaultIcon />
            </div>
          )}
          {children}
        </div>
      </AvatarContext.Provider>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
