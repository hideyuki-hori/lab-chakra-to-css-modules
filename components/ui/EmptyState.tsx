import { Box, Text, VStack, Icon, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FiInbox } from 'react-icons/fi';

const MotionBox = motion(Box);

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: IconType;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = 'データがありません',
  description,
  icon = FiInbox,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <MotionBox
      py={12}
      textAlign="center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <VStack spacing={4}>
        <Icon as={icon} boxSize={12} color="gray.400" />
        <VStack spacing={2}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.600">
            {title}
          </Text>
          {description && (
            <Text fontSize="sm" color="gray.500" maxW="md">
              {description}
            </Text>
          )}
        </VStack>
        {actionLabel && onAction && (
          <Button colorScheme="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </VStack>
    </MotionBox>
  );
}
