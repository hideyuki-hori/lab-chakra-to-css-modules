import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../Text';
import { VStack } from '../VStack';

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'Default text content',
  },
};

export const Sizes: Story = {
  render: () => (
    <VStack spacing={2} align="flex-start">
      <Text fontSize="xs">Extra Small (xs)</Text>
      <Text fontSize="sm">Small (sm)</Text>
      <Text fontSize="md">Medium (md)</Text>
      <Text fontSize="lg">Large (lg)</Text>
      <Text fontSize="xl">Extra Large (xl)</Text>
      <Text fontSize="2xl">2XL</Text>
    </VStack>
  ),
};

export const Weights: Story = {
  render: () => (
    <VStack spacing={2} align="flex-start">
      <Text fontWeight="normal">Normal weight</Text>
      <Text fontWeight="medium">Medium weight</Text>
      <Text fontWeight="semibold">Semibold weight</Text>
      <Text fontWeight="bold">Bold weight</Text>
    </VStack>
  ),
};

export const Truncated: Story = {
  args: {
    children: 'This is a very long text that should be truncated after a certain number of lines to prevent overflow issues.',
    noOfLines: 1,
    maxW: '200px',
  },
};
