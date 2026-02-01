import {
  Alert as ChakraAlert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

type AlertStatus = 'info' | 'warning' | 'success' | 'error';

interface AlertProps {
  status: AlertStatus;
  title?: string;
  description?: string;
  isClosable?: boolean;
  onClose?: () => void;
  isVisible?: boolean;
  isAnimated?: boolean;
}

export default function Alert({
  status,
  title,
  description,
  isClosable = false,
  onClose,
  isVisible = true,
  isAnimated = true,
}: AlertProps) {
  const alertContent = (
    <ChakraAlert status={status} borderRadius="md">
      <AlertIcon />
      <Box flex="1">
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
      </Box>
      {isClosable && (
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      )}
    </ChakraAlert>
  );

  if (isAnimated) {
    return (
      <AnimatePresence>
        {isVisible && (
          <MotionBox
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {alertContent}
          </MotionBox>
        )}
      </AnimatePresence>
    );
  }

  if (!isVisible) return null;

  return alertContent;
}
