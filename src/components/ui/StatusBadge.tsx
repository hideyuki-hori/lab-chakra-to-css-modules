import { HTMLAttributes } from 'react';
import styles from '../../styles/components/badge.module.css';

export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type ProjectStatus = 'planning' | 'active' | 'completed' | 'on-hold';
export type UserStatus = 'active' | 'away' | 'offline';

type StatusType = TaskStatus | ProjectStatus | UserStatus;

interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: StatusType;
  type?: 'task' | 'project' | 'user';
}

const taskStatusConfig: Record<TaskStatus, { colorClass: string; label: string }> = {
  todo: { colorClass: styles.subtleGray, label: '未着手' },
  'in-progress': { colorClass: styles.subtleBlue, label: '進行中' },
  completed: { colorClass: styles.subtleGreen, label: '完了' },
};

const projectStatusConfig: Record<ProjectStatus, { colorClass: string; label: string }> = {
  planning: { colorClass: styles.subtleGray, label: '計画中' },
  active: { colorClass: styles.subtleBlue, label: '進行中' },
  completed: { colorClass: styles.subtleGreen, label: '完了' },
  'on-hold': { colorClass: styles.subtleOrange, label: '保留' },
};

const userStatusConfig: Record<UserStatus, { colorClass: string; label: string }> = {
  active: { colorClass: styles.subtleGreen, label: 'オンライン' },
  away: { colorClass: styles.subtleYellow, label: '離席中' },
  offline: { colorClass: styles.subtleGray, label: 'オフライン' },
};

function getStatusConfig(status: StatusType, type: 'task' | 'project' | 'user') {
  switch (type) {
    case 'task':
      return taskStatusConfig[status as TaskStatus] || { colorClass: styles.subtleGray, label: status };
    case 'project':
      return projectStatusConfig[status as ProjectStatus] || { colorClass: styles.subtleGray, label: status };
    case 'user':
      return userStatusConfig[status as UserStatus] || { colorClass: styles.subtleGray, label: status };
    default:
      return { colorClass: styles.subtleGray, label: status };
  }
}

export default function StatusBadge({
  status,
  type = 'task',
  className,
  ...props
}: StatusBadgeProps) {
  const config = getStatusConfig(status, type);
  const badgeClasses = [styles.badge, config.colorClass, className].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {config.label}
    </span>
  );
}
