import { Avatar, AvatarBadge, AvatarProps } from '@chakra-ui/react';

type UserStatusType = 'active' | 'away' | 'offline';

interface UserAvatarProps extends AvatarProps {
  status?: UserStatusType;
  showStatus?: boolean;
}

const statusColors: Record<UserStatusType, string> = {
  active: 'green.500',
  away: 'yellow.500',
  offline: 'gray.400',
};

export default function UserAvatar({
  status,
  showStatus = false,
  ...props
}: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {showStatus && status && (
        <AvatarBadge
          boxSize="1em"
          bg={statusColors[status]}
          border="2px solid white"
        />
      )}
    </Avatar>
  );
}
