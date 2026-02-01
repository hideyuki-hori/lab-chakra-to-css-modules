import type { Meta, StoryObj } from '@storybook/react';
import { Progress, ProgressLabel } from '../Progress';
import { VStack, Box } from '../';

const meta: Meta<typeof Progress> = {
  title: 'Data/Progress',
  component: Progress,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const Sizes: Story = {
  render: () => (
    <VStack spacing={4} align="stretch" style={{ width: '300px' }}>
      <Progress value={60} size="xs" />
      <Progress value={60} size="sm" />
      <Progress value={60} size="md" />
      <Progress value={60} size="lg" />
    </VStack>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <VStack spacing={4} align="stretch" style={{ width: '300px' }}>
      <Progress value={60} colorScheme="primary" />
      <Progress value={60} colorScheme="green" />
      <Progress value={60} colorScheme="blue" />
      <Progress value={60} colorScheme="red" />
      <Progress value={60} colorScheme="yellow" />
    </VStack>
  ),
};

export const Striped: Story = {
  render: () => (
    <VStack spacing={4} align="stretch" style={{ width: '300px' }}>
      <Progress value={60} hasStripe />
      <Progress value={60} hasStripe isAnimated />
    </VStack>
  ),
};

export const Indeterminate: Story = {
  args: {
    value: 0,
    isIndeterminate: true,
  },
  decorators: [
    (Story) => (
      <Box style={{ width: '300px' }}>
        <Story />
      </Box>
    ),
  ],
};

export const WithLabel: Story = {
  render: () => (
    <Box style={{ width: '300px' }}>
      <ProgressLabel value={75} colorScheme="primary" />
      <Progress value={75} colorScheme="primary" />
    </Box>
  ),
};
