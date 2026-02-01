import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../Flex';
import { Box } from '../Box';

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const Default: Story = {
  render: () => (
    <Flex gap={4}>
      <Box p={4} bg="var(--color-primary-100)">Item 1</Box>
      <Box p={4} bg="var(--color-primary-200)">Item 2</Box>
      <Box p={4} bg="var(--color-primary-300)">Item 3</Box>
    </Flex>
  ),
};

export const SpaceBetween: Story = {
  render: () => (
    <Flex justify="space-between" p={4} bg="var(--color-gray-100)">
      <Box p={4} bg="var(--color-primary-100)">Left</Box>
      <Box p={4} bg="var(--color-primary-200)">Right</Box>
    </Flex>
  ),
};

export const Centered: Story = {
  render: () => (
    <Flex justify="center" align="center" h="200px" bg="var(--color-gray-100)">
      <Box p={4} bg="var(--color-primary-100)">Centered</Box>
    </Flex>
  ),
};
