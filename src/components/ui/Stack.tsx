import React, { forwardRef } from 'react';
import { Flex, FlexProps } from './Flex';

export interface StackProps extends FlexProps {
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(({
  spacing = 4,
  direction = 'column',
  ...props
}, ref) => {
  return (
    <Flex
      ref={ref}
      direction={direction}
      gap={spacing}
      {...props}
    />
  );
});

Stack.displayName = 'Stack';

export default Stack;
