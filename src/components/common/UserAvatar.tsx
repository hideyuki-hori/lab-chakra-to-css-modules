import { HTMLAttributes } from 'react';
import styles from '../../styles/components/avatar.module.css';

type UserStatusType = 'active' | 'away' | 'offline';
type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  src?: string;
  size?: AvatarSize;
  status?: UserStatusType;
  showStatus?: boolean;
}

const sizeClassMap: Record<AvatarSize, string> = {
  sm: styles.avatarSm,
  md: styles.avatarMd,
  lg: styles.avatarLg,
  xl: styles.avatarXl,
};

const statusClassMap: Record<UserStatusType, string> = {
  active: styles.badgeActive,
  away: styles.badgeAway,
  offline: styles.badgeOffline,
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
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
  className,
  ...props
}: UserAvatarProps) {
  const avatarClasses = [styles.avatar, sizeClassMap[size], className].filter(Boolean).join(' ');
  const badgeClasses = status ? [styles.badge, statusClassMap[status]].join(' ') : '';

  return (
    <div className={avatarClasses} {...props}>
      {src ? (
        <img src={src} alt={name || ''} className={styles.image} />
      ) : (
        name && getInitials(name)
      )}
      {showStatus && status && <span className={badgeClasses} />}
    </div>
  );
}
