import { HTMLAttributes } from 'react';
import styles from '../../styles/components/badge.module.css';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

interface PriorityBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  priority: Priority;
  variant?: 'solid' | 'subtle';
}

const priorityConfig: Record<Priority, { solidClass: string; subtleClass: string; label: string }> = {
  low: { solidClass: styles.solidGray, subtleClass: styles.subtleGray, label: '低' },
  medium: { solidClass: styles.solidBlue, subtleClass: styles.subtleBlue, label: '中' },
  high: { solidClass: styles.solidOrange, subtleClass: styles.subtleOrange, label: '高' },
  urgent: { solidClass: styles.solidRed, subtleClass: styles.subtleRed, label: '緊急' },
};

export default function PriorityBadge({
  priority,
  variant = 'solid',
  className,
  ...props
}: PriorityBadgeProps) {
  const config = priorityConfig[priority] || { solidClass: styles.solidGray, subtleClass: styles.subtleGray, label: priority };
  const colorClass = variant === 'solid' ? config.solidClass : config.subtleClass;
  const badgeClasses = [styles.badge, colorClass, className].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {config.label}
    </span>
  );
}
