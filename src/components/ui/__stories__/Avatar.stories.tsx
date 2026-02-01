import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from '../Avatar';
import { HStack } from '../';

const meta: Meta<typeof Avatar> = {
  title: 'Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'John Doe',
  },
};

export const Sizes: Story = {
  render: () => (
    <HStack spacing={4}>
      <Avatar size="xs" name="XS" />
      <Avatar size="sm" name="SM" />
      <Avatar size="md" name="MD" />
      <Avatar size="lg" name="LG" />
      <Avatar size="xl" name="XL" />
      <Avatar size="2xl" name="2XL" />
    </HStack>
  ),
};

export const Initials: Story = {
  render: () => (
    <HStack spacing={4}>
      <Avatar name="John Doe" />
      <Avatar name="Jane Smith" />
      <Avatar name="Bob" />
    </HStack>
  ),
};

export const Fallback: Story = {
  render: () => <Avatar />,
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar name="John Doe" />
      <Avatar name="Jane Smith" />
      <Avatar name="Bob Wilson" />
      <Avatar name="Alice Brown" />
      <Avatar name="Charlie Davis" />
    </AvatarGroup>
  ),
};
