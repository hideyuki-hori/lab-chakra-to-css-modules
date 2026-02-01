import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TooltipProps extends Omit<ChakraTooltipProps, 'children'> {
  children: ReactNode;
  content: string;
}

export default function Tooltip({ children, content, ...props }: TooltipProps) {
  return (
    <ChakraTooltip
      label={content}
      hasArrow
      placement="top"
      bg="gray.700"
      color="white"
      fontSize="sm"
      px={3}
      py={2}
      borderRadius="md"
      {...props}
    >
      {children}
    </ChakraTooltip>
  );
}
