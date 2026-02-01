import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { HStack, VStack } from '../';

const meta: Meta<typeof Button> = {
  title: 'Form/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <HStack spacing={4}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </HStack>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <HStack spacing={4}>
      <Button colorScheme="primary">Primary</Button>
      <Button colorScheme="gray">Gray</Button>
      <Button colorScheme="red">Red</Button>
      <Button colorScheme="green">Green</Button>
      <Button colorScheme="blue">Blue</Button>
    </HStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack spacing={4} align="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </HStack>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Loading',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    isDisabled: true,
  },
};
