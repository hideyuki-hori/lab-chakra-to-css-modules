import {
  Box,
  HStack,
  VStack,
  Text,
  Avatar,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { StatusBadge, ProgressBar } from '../ui';
import type { ProjectStatus } from '../ui/StatusBadge';

const MotionBox = motion(Box);

interface ProjectCardProps {
  name: string;
  description?: string;
  status: ProjectStatus;
  progress: number;
  startDate: Date;
  endDate: Date;
  owner: {
    name: string;
    avatar?: string;
  };
  onClick?: () => void;
  isAnimated?: boolean;
}

export default function ProjectCard({
  name,
  description,
  status,
  progress,
  startDate,
  endDate,
  owner,
  onClick,
  isAnimated = true,
}: ProjectCardProps) {
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
          {name}
        </Text>
        <StatusBadge status={status} type="project" />
      </HStack>
      {description && (
        <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
          {description}
        </Text>
      )}
      <VStack align="stretch" spacing={2}>
        <ProgressBar value={progress} showLabel size="sm" />
        <HStack justify="space-between" fontSize="xs">
          <HStack spacing={1}>
            <Avatar size="xs" name={owner.name} src={owner.avatar} />
            <Text color="gray.600">{owner.name}</Text>
          </HStack>
          <Text color="gray.500">
            {formatDate(startDate)} - {formatDate(endDate)}
          </Text>
        </HStack>
      </VStack>
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
