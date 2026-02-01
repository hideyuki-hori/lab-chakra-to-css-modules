import { forwardRef, HTMLAttributes, CSSProperties } from 'react';
import styles from './AvatarBadge.module.css';

export interface AvatarBadgeProps extends HTMLAttributes<HTMLDivElement> {
  boxSize?: string;
  bg?: string;
  border?: string;
}

const parseColorValue = (color: string): string => {
  if (color.includes('.')) {
    const [colorName, shade] = color.split('.');
    return `var(--color-${colorName}-${shade})`;
  }
  if (color === 'white') return 'var(--color-white)';
  if (color === 'black') return 'var(--color-black)';
  return color;
};

const AvatarBadge = forwardRef<HTMLDivElement, AvatarBadgeProps>(
  ({ boxSize = '1em', bg, border, className, style, children, ...props }, ref) => {
    const classNames = [styles.avatarBadge, className].filter(Boolean).join(' ');

    const computedStyle: CSSProperties = {
      ...style,
      width: boxSize,
      height: boxSize,
    };

    if (bg) {
      computedStyle.backgroundColor = parseColorValue(bg);
    }

    if (border) {
      computedStyle.border = border;
    }

    return (
      <div ref={ref} className={classNames} style={computedStyle} {...props}>
        {children}
      </div>
    );
  }
);

AvatarBadge.displayName = 'AvatarBadge';

export default AvatarBadge;
