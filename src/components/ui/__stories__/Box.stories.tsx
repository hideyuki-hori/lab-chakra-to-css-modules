import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: 'Box content',
    p: 4,
    bg: 'var(--color-gray-100)',
  },
};

export const WithPadding: Story = {
  args: {
    children: 'Padded box',
    p: 6,
    bg: 'var(--color-primary-100)',
    borderRadius: 'md',
  },
};

export const WithBorder: Story = {
  args: {
    children: 'Bordered box',
    p: 4,
    border: '1px solid var(--color-gray-300)',
    borderRadius: 'lg',
  },
};
