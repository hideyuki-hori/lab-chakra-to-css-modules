import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';
import { HStack, VStack } from '../';

const meta: Meta<typeof Badge> = {
  title: 'Display/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <HStack spacing={4}>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="outline">Outline</Badge>
    </HStack>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <VStack spacing={4} align="flex-start">
      <HStack spacing={2}>
        <Badge colorScheme="gray">Gray</Badge>
        <Badge colorScheme="primary">Primary</Badge>
        <Badge colorScheme="green">Green</Badge>
        <Badge colorScheme="red">Red</Badge>
        <Badge colorScheme="yellow">Yellow</Badge>
        <Badge colorScheme="blue">Blue</Badge>
        <Badge colorScheme="purple">Purple</Badge>
      </HStack>
      <HStack spacing={2}>
        <Badge variant="solid" colorScheme="gray">Gray</Badge>
        <Badge variant="solid" colorScheme="primary">Primary</Badge>
        <Badge variant="solid" colorScheme="green">Green</Badge>
        <Badge variant="solid" colorScheme="red">Red</Badge>
        <Badge variant="solid" colorScheme="yellow">Yellow</Badge>
        <Badge variant="solid" colorScheme="blue">Blue</Badge>
        <Badge variant="solid" colorScheme="purple">Purple</Badge>
      </HStack>
    </VStack>
  ),
};
