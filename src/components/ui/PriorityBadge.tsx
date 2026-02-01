import { HTMLAttributes } from 'react';
import styles from '../../styles/components/ui/Badge.module.css';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

interface PriorityBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  priority: Priority;
}

const priorityConfig: Record<Priority, { colorClass: string; label: string }> = {
  low: { colorClass: styles.gray, label: '低' },
  medium: { colorClass: styles.blue, label: '中' },
  high: { colorClass: styles.orange, label: '高' },
  urgent: { colorClass: styles.red, label: '緊急' },
};

export default function PriorityBadge({
  priority,
  className = '',
  ...props
}: PriorityBadgeProps) {
  const config = priorityConfig[priority] || { colorClass: styles.gray, label: priority };
  const badgeClasses = [styles.badge, config.colorClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {config.label}
    </span>
  );
}
