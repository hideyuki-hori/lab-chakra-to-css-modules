import { Badge, BadgeProps } from '@chakra-ui/react';

export type Role = 'admin' | 'member' | 'guest';

interface RoleBadgeProps extends Omit<BadgeProps, 'colorScheme'> {
  role: Role | string;
}

const roleConfig: Record<string, { color: string; label: string }> = {
  admin: { color: 'red', label: '管理者' },
  member: { color: 'blue', label: 'メンバー' },
  guest: { color: 'gray', label: 'ゲスト' },
  '管理者': { color: 'red', label: '管理者' },
  'メンバー': { color: 'blue', label: 'メンバー' },
  'ゲスト': { color: 'gray', label: 'ゲスト' },
};

export default function RoleBadge({ role, ...props }: RoleBadgeProps) {
  const config = roleConfig[role] || { color: 'green', label: role };

  return (
    <Badge colorScheme={config.color} {...props}>
      {config.label}
    </Badge>
  );
}
