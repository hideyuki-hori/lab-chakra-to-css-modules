import { HTMLAttributes } from 'react';
import styles from '../../styles/components/ui/Badge.module.css';

export type Role = 'admin' | 'member' | 'guest';

interface RoleBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  role: Role | string;
}

const roleConfig: Record<string, { colorClass: string; label: string }> = {
  admin: { colorClass: styles.red, label: '管理者' },
  member: { colorClass: styles.blue, label: 'メンバー' },
  guest: { colorClass: styles.gray, label: 'ゲスト' },
  '管理者': { colorClass: styles.red, label: '管理者' },
  'メンバー': { colorClass: styles.blue, label: 'メンバー' },
  'ゲスト': { colorClass: styles.gray, label: 'ゲスト' },
};

export default function RoleBadge({
  role,
  className = '',
  ...props
}: RoleBadgeProps) {
  const config = roleConfig[role] || { colorClass: styles.green, label: role };
  const badgeClasses = [styles.badge, config.colorClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {config.label}
    </span>
  );
}
