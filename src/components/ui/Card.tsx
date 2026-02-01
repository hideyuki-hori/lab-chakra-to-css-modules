import {
  Box,
  BoxProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface CardProps extends BoxProps {
  children: ReactNode;
  isHoverable?: boolean;
}

export default function Card({
  children,
  isHoverable = false,
  ...props
}: CardProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const hoverStyles = isHoverable
    ? {
        _hover: {
          borderColor: 'primary.300',
          bg: 'gray.50',
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        },
        transition: 'all 0.2s',
        cursor: 'pointer',
      }
    : {};

  return (
    <Box
      p={4}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      bg={bgColor}
      boxShadow="sm"
      {...hoverStyles}
      {...props}
    >
      {children}
    </Box>
  );
}
