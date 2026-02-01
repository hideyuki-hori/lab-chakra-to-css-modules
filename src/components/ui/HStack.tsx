import React, { forwardRef } from 'react';
import { Flex, FlexProps } from './Flex';

export interface HStackProps extends Omit<FlexProps, 'direction'> {
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
}

export const HStack = forwardRef<HTMLDivElement, HStackProps>(({
  spacing = 4,
  align = 'center',
  ...props
}, ref) => {
  return (
    <Flex
      ref={ref}
      direction="row"
      align={align}
      gap={spacing}
      {...props}
    />
  );
});

HStack.displayName = 'HStack';

export default HStack;
