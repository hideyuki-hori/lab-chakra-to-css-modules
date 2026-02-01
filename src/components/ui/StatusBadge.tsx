import { Badge, BadgeProps } from '@chakra-ui/react';

export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type ProjectStatus = 'planning' | 'active' | 'completed' | 'on-hold';
export type UserStatus = 'active' | 'away' | 'offline';

type StatusType = TaskStatus | ProjectStatus | UserStatus;

interface StatusBadgeProps extends Omit<BadgeProps, 'colorScheme'> {
  status: StatusType;
  type?: 'task' | 'project' | 'user';
}

const taskStatusConfig: Record<TaskStatus, { color: string; label: string }> = {
  todo: { color: 'gray', label: '未着手' },
  'in-progress': { color: 'blue', label: '進行中' },
  completed: { color: 'green', label: '完了' },
};

const projectStatusConfig: Record<ProjectStatus, { color: string; label: string }> = {
  planning: { color: 'gray', label: '計画中' },
  active: { color: 'blue', label: '進行中' },
  completed: { color: 'green', label: '完了' },
  'on-hold': { color: 'orange', label: '保留' },
};

const userStatusConfig: Record<UserStatus, { color: string; label: string }> = {
  active: { color: 'green', label: 'オンライン' },
  away: { color: 'yellow', label: '離席中' },
  offline: { color: 'gray', label: 'オフライン' },
};

function getStatusConfig(status: StatusType, type: 'task' | 'project' | 'user') {
  switch (type) {
    case 'task':
      return taskStatusConfig[status as TaskStatus] || { color: 'gray', label: status };
    case 'project':
      return projectStatusConfig[status as ProjectStatus] || { color: 'gray', label: status };
    case 'user':
      return userStatusConfig[status as UserStatus] || { color: 'gray', label: status };
    default:
      return { color: 'gray', label: status };
  }
}

export default function StatusBadge({
  status,
  type = 'task',
  ...props
}: StatusBadgeProps) {
  const config = getStatusConfig(status, type);

  return (
    <Badge colorScheme={config.color} variant="subtle" {...props}>
      {config.label}
    </Badge>
  );
}
