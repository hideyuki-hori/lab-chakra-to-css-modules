import {
  Box,
  VStack,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMoreVertical } from 'react-icons/fi';
import { RoleBadge } from '../ui';

const MotionBox = motion(Box);

interface MemberAction {
  label: string;
  onClick: () => void;
}

interface MemberCardProps {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  taskCount?: number;
  actions?: MemberAction[];
  isAnimated?: boolean;
  animationDelay?: number;
}

export default function MemberCard({
  name,
  email,
  role,
  avatar,
  taskCount,
  actions,
  isAnimated = true,
  animationDelay = 0,
}: MemberCardProps) {
  const content = (
    <VStack spacing={4}>
      <Avatar size="xl" name={name} src={avatar} />
      <VStack spacing={2} align="center">
        <Text fontSize="xl" fontWeight="bold">
          {name}
        </Text>
        <RoleBadge role={role} />
        <Text fontSize="sm" color="gray.600">
          {email}
        </Text>
        {taskCount !== undefined && (
          <Text fontSize="sm" color="gray.500">
            担当タスク: {taskCount}件
          </Text>
        )}
      </VStack>
      {actions && actions.length > 0 && (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="オプション"
            icon={<FiMoreVertical />}
            variant="outline"
            size="sm"
          />
          <MenuList>
            {actions.map((action, index) => (
              <MenuItem key={index} onClick={action.onClick}>
                {action.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
    </VStack>
  );

  if (isAnimated) {
    return (
      <MotionBox
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        bg="white"
        shadow="md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: animationDelay }}
        whileHover={{ scale: 1.05 }}
      >
        {content}
      </MotionBox>
    );
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} bg="white" shadow="md">
      {content}
    </Box>
  );
}
