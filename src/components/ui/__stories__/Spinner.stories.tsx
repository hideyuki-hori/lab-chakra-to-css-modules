import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../Spinner';
import { HStack } from '../';

const meta: Meta<typeof Spinner> = {
  title: 'Display/Spinner',
  component: Spinner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <HStack spacing={4}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </HStack>
  ),
};

export const CustomColor: Story = {
  args: {
    color: 'var(--color-primary-500)',
  },
};
