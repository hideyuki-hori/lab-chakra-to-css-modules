import { HTMLAttributes } from 'react';
import styles from '../../styles/components/common/UserAvatar.module.css';

type UserStatusType = 'active' | 'away' | 'offline';
type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  src?: string;
  size?: AvatarSize;
  status?: UserStatusType;
  showStatus?: boolean;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
  '2xl': styles.size2xl,
};

const statusClasses: Record<UserStatusType, string> = {
  active: styles.statusActive,
  away: styles.statusAway,
  offline: styles.statusOffline,
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function UserAvatar({
  name,
  src,
  size = 'md',
  status,
  showStatus = false,
  className = '',
  ...props
}: UserAvatarProps) {
  const avatarClasses = [styles.avatar, sizeClasses[size]].join(' ');
  const containerClasses = [styles.container, className].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      <div className={avatarClasses}>
        {src ? (
          <img src={src} alt={name || 'avatar'} />
        ) : (
          <span>{name ? getInitials(name) : '?'}</span>
        )}
      </div>
      {showStatus && status && (
        <span className={`${styles.statusBadge} ${statusClasses[status]}`} />
      )}
    </div>
  );
}
