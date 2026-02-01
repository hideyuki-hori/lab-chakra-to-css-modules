import { Box, Heading, Text, HStack, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const MotionBox = motion(Box);

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  isAnimated?: boolean;
}

export default function PageHeader({
  title,
  description,
  actions,
  isAnimated = true,
}: PageHeaderProps) {
  const content = (
    <Flex justify="space-between" align="start" wrap="wrap" gap={4}>
      <Box>
        <Heading size="lg" mb={description ? 2 : 0}>
          {title}
        </Heading>
        {description && <Text color="gray.600">{description}</Text>}
      </Box>
      {actions && <HStack spacing={3}>{actions}</HStack>}
    </Flex>
  );

  if (isAnimated) {
    return (
      <MotionBox
        mb={6}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {content}
      </MotionBox>
    );
  }

  return <Box mb={6}>{content}</Box>;
}
