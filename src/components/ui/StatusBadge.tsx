import { HTMLAttributes } from 'react';
import styles from '../../styles/components/ui/Badge.module.css';

export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type ProjectStatus = 'planning' | 'active' | 'completed' | 'on-hold';
export type UserStatus = 'active' | 'away' | 'offline';

type StatusType = TaskStatus | ProjectStatus | UserStatus;

interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: StatusType;
  type?: 'task' | 'project' | 'user';
}

const taskStatusConfig: Record<TaskStatus, { colorClass: string; label: string }> = {
  todo: { colorClass: styles.gray, label: '未着手' },
  'in-progress': { colorClass: styles.blue, label: '進行中' },
  completed: { colorClass: styles.green, label: '完了' },
};

const projectStatusConfig: Record<ProjectStatus, { colorClass: string; label: string }> = {
  planning: { colorClass: styles.gray, label: '計画中' },
  active: { colorClass: styles.blue, label: '進行中' },
  completed: { colorClass: styles.green, label: '完了' },
  'on-hold': { colorClass: styles.orange, label: '保留' },
};

const userStatusConfig: Record<UserStatus, { colorClass: string; label: string }> = {
  active: { colorClass: styles.green, label: 'オンライン' },
  away: { colorClass: styles.yellow, label: '離席中' },
  offline: { colorClass: styles.gray, label: 'オフライン' },
};

function getStatusConfig(status: StatusType, type: 'task' | 'project' | 'user') {
  switch (type) {
    case 'task':
      return taskStatusConfig[status as TaskStatus] || { colorClass: styles.gray, label: status };
    case 'project':
      return projectStatusConfig[status as ProjectStatus] || { colorClass: styles.gray, label: status };
    case 'user':
      return userStatusConfig[status as UserStatus] || { colorClass: styles.gray, label: status };
    default:
      return { colorClass: styles.gray, label: status };
  }
}

export default function StatusBadge({
  status,
  type = 'task',
  className = '',
  ...props
}: StatusBadgeProps) {
  const config = getStatusConfig(status, type);
  const badgeClasses = [styles.badge, styles.subtle, config.colorClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {config.label}
    </span>
  );
}
