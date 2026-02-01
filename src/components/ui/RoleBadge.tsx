import { HTMLAttributes } from 'react';
import styles from '../../styles/components/badge.module.css';

export type Role = 'admin' | 'member' | 'guest';

interface RoleBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  role: Role | string;
}

const roleConfig: Record<string, { colorClass: string; label: string }> = {
  admin: { colorClass: styles.subtleRed, label: '管理者' },
  member: { colorClass: styles.subtleBlue, label: 'メンバー' },
  guest: { colorClass: styles.subtleGray, label: 'ゲスト' },
  '管理者': { colorClass: styles.subtleRed, label: '管理者' },
  'メンバー': { colorClass: styles.subtleBlue, label: 'メンバー' },
  'ゲスト': { colorClass: styles.subtleGray, label: 'ゲスト' },
};

export default function RoleBadge({ role, className, ...props }: RoleBadgeProps) {
  const config = roleConfig[role] || { colorClass: styles.subtleGreen, label: role };
  const badgeClasses = [styles.badge, config.colorClass, className].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {config.label}
    </span>
  );
}
