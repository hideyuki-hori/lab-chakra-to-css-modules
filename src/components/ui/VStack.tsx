import React, { forwardRef } from 'react';
import { Flex, FlexProps } from './Flex';

export interface VStackProps extends Omit<FlexProps, 'direction'> {
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
}

export const VStack = forwardRef<HTMLDivElement, VStackProps>(({
  spacing = 4,
  align = 'center',
  ...props
}, ref) => {
  return (
    <Flex
      ref={ref}
      direction="column"
      align={align}
      gap={spacing}
      {...props}
    />
  );
});

VStack.displayName = 'VStack';

export default VStack;
