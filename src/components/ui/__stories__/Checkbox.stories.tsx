import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../Checkbox';
import { VStack, HStack } from '../';

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    children: 'Checkbox',
  },
};

export const Checked: Story = {
  args: {
    children: 'Checked',
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <HStack spacing={6}>
      <Checkbox size="sm">Small</Checkbox>
      <Checkbox size="md">Medium</Checkbox>
      <Checkbox size="lg">Large</Checkbox>
    </HStack>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <HStack spacing={6}>
      <Checkbox colorScheme="primary" defaultChecked>Primary</Checkbox>
      <Checkbox colorScheme="green" defaultChecked>Green</Checkbox>
      <Checkbox colorScheme="blue" defaultChecked>Blue</Checkbox>
      <Checkbox colorScheme="red" defaultChecked>Red</Checkbox>
    </HStack>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    isDisabled: true,
  },
};
