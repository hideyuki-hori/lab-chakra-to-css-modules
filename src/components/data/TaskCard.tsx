import {
  Box,
  HStack,
  VStack,
  Text,
  Avatar,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { StatusBadge, PriorityBadge } from '../ui';
import type { TaskStatus } from '../ui/StatusBadge';
import type { Priority } from '../ui/PriorityBadge';

const MotionBox = motion(Box);

interface TaskCardProps {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: Date;
  projectName?: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  onClick?: () => void;
  isAnimated?: boolean;
}

export default function TaskCard({
  title,
  description,
  status,
  priority,
  dueDate,
  projectName,
  assignee,
  onClick,
  isAnimated = true,
}: TaskCardProps) {
  const isOverdue = new Date(dueDate) < new Date() && status !== 'completed';

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
    });
  };

  const content = (
    <>
      <HStack justify="space-between" mb={2}>
        <Text fontWeight="semibold" fontSize="sm">
          {title}
        </Text>
        <PriorityBadge priority={priority} />
      </HStack>
      {description && (
        <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
          {description}
        </Text>
      )}
      <HStack justify="space-between" fontSize="xs">
        <HStack spacing={2}>
          <StatusBadge status={status} type="task" />
          {projectName && <Text color="gray.500">{projectName}</Text>}
        </HStack>
        <HStack spacing={2}>
          {assignee && (
            <HStack spacing={1}>
              <Avatar size="xs" name={assignee.name} src={assignee.avatar} />
              <Text color="gray.600">{assignee.name}</Text>
            </HStack>
          )}
          <Text
            color={isOverdue ? 'red.500' : 'gray.500'}
            fontWeight={isOverdue ? 'semibold' : 'normal'}
          >
            {formatDate(dueDate)}
          </Text>
        </HStack>
      </HStack>
    </>
  );

  if (isAnimated) {
    return (
      <MotionBox
        p={4}
        borderRadius="md"
        border="1px"
        borderColor="gray.200"
        _hover={{ borderColor: 'primary.300', bg: 'gray.50' }}
        cursor={onClick ? 'pointer' : 'default'}
        onClick={onClick}
        whileHover={{ scale: 1.01 }}
      >
        {content}
      </MotionBox>
    );
  }

  return (
    <Box
      p={4}
      borderRadius="md"
      border="1px"
      borderColor="gray.200"
      _hover={{ borderColor: 'primary.300', bg: 'gray.50' }}
      transition="all 0.2s"
      cursor={onClick ? 'pointer' : 'default'}
      onClick={onClick}
    >
      {content}
    </Box>
  );
}
