import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../Input';
import { VStack } from '../';

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Sizes: Story = {
  render: () => (
    <VStack spacing={4} align="stretch">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </VStack>
  ),
};

export const Variants: Story = {
  render: () => (
    <VStack spacing={4} align="stretch">
      <Input variant="outline" placeholder="Outline" />
      <Input variant="filled" placeholder="Filled" />
      <Input variant="flushed" placeholder="Flushed" />
    </VStack>
  ),
};

export const Invalid: Story = {
  args: {
    placeholder: 'Invalid input',
    isInvalid: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    isDisabled: true,
  },
};
