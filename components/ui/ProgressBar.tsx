import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: string;
  isAnimated?: boolean;
}

const sizeMap = {
  sm: '4px',
  md: '6px',
  lg: '10px',
};

export default function ProgressBar({
  value,
  showLabel = false,
  size = 'md',
  colorScheme = 'primary',
  isAnimated = true,
}: ProgressBarProps) {
  const bgColor = useColorModeValue('gray.200', 'gray.600');
  const barColor = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.400`);
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <Box w="full">
      {showLabel && (
        <HStack justify="space-between" fontSize="xs" mb={1}>
          <Text color="gray.500">進捗率</Text>
          <Text fontWeight="semibold" color={`${colorScheme}.600`}>
            {clampedValue}%
          </Text>
        </HStack>
      )}
      <Box h={sizeMap[size]} bg={bgColor} borderRadius="full" overflow="hidden">
        {isAnimated ? (
          <MotionBox
            h="full"
            bg={barColor}
            borderRadius="full"
            initial={{ width: 0 }}
            animate={{ width: `${clampedValue}%` }}
          />
        ) : (
          <Box
            h="full"
            bg={barColor}
            borderRadius="full"
            w={`${clampedValue}%`}
            transition="width 0.3s"
          />
        )}
      </Box>
    </Box>
  );
}
