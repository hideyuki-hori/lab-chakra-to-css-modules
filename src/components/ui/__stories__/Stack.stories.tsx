import type { Meta, StoryObj } from '@storybook/react';
import { VStack } from '../VStack';
import { HStack } from '../HStack';
import { Box } from '../Box';

const meta: Meta<typeof VStack> = {
  title: 'Layout/Stack',
  component: VStack,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VStack>;

export const Vertical: Story = {
  render: () => (
    <VStack spacing={4}>
      <Box p={4} bg="var(--color-primary-100)" w="100%">Item 1</Box>
      <Box p={4} bg="var(--color-primary-200)" w="100%">Item 2</Box>
      <Box p={4} bg="var(--color-primary-300)" w="100%">Item 3</Box>
    </VStack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <HStack spacing={4}>
      <Box p={4} bg="var(--color-accent-100)">Item 1</Box>
      <Box p={4} bg="var(--color-accent-200)">Item 2</Box>
      <Box p={4} bg="var(--color-accent-300)">Item 3</Box>
    </HStack>
  ),
};
