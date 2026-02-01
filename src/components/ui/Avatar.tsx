import React from 'react';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  src?: string;
  name?: string;
  bg?: string;
}

function getInitials(name: string): string {
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function stringToColor(str: string): string {
  const colors = [
    'var(--color-primary-500)',
    'var(--color-green-500)',
    'var(--color-blue-500)',
    'var(--color-purple-500)',
    'var(--color-red-500)',
    'var(--color-yellow-500)',
    'var(--color-accent-500)',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({
  size = 'md',
  src,
  name,
  bg,
  className,
  style,
  ...props
}: AvatarProps) {
  const classNames = [styles.avatar, styles[size], className]
    .filter(Boolean)
    .join(' ');

  const backgroundColor = bg || (name ? stringToColor(name) : 'var(--color-gray-400)');

  return (
    <div
      className={classNames}
      style={{ backgroundColor, ...style }}
      {...props}
    >
      {src ? (
        <img src={src} alt={name || 'Avatar'} className={styles.image} />
      ) : name ? (
        <span className={styles.initials}>{getInitials(name)}</span>
      ) : (
        <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      )}
    </div>
  );
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarSize;
}

export function AvatarGroup({
  max = 3,
  size = 'md',
  className,
  children,
  ...props
}: AvatarGroupProps) {
  const classNames = [styles.avatarGroup, className].filter(Boolean).join(' ');

  const childArray = React.Children.toArray(children);
  const visibleChildren = childArray.slice(0, max);
  const excess = childArray.length - max;

  return (
    <div className={classNames} {...props}>
      {visibleChildren.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { size, key: index } as AvatarProps)
          : child
      )}
      {excess > 0 && (
        <div
          className={`${styles.avatar} ${styles[size]} ${styles.excess}`}
        >
          +{excess}
        </div>
      )}
    </div>
  );
}

export default Avatar;
