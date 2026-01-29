import { Badge, BadgeProps } from '@chakra-ui/react';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

interface PriorityBadgeProps extends Omit<BadgeProps, 'colorScheme'> {
  priority: Priority;
}

const priorityConfig: Record<Priority, { color: string; label: string }> = {
  low: { color: 'gray', label: '低' },
  medium: { color: 'blue', label: '中' },
  high: { color: 'orange', label: '高' },
  urgent: { color: 'red', label: '緊急' },
};

export default function PriorityBadge({ priority, ...props }: PriorityBadgeProps) {
  const config = priorityConfig[priority] || { color: 'gray', label: priority };

  return (
    <Badge colorScheme={config.color} {...props}>
      {config.label}
    </Badge>
  );
}
