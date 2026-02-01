import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '../Divider';
import { Box, VStack, HStack, Text } from '../';

const meta: Meta<typeof Divider> = {
  title: 'Display/Divider',
  component: Divider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <VStack spacing={4} align="stretch" style={{ width: '300px' }}>
      <Text>Above the divider</Text>
      <Divider />
      <Text>Below the divider</Text>
    </VStack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <HStack spacing={4} style={{ height: '50px' }}>
      <Text>Left</Text>
      <Divider orientation="vertical" />
      <Text>Right</Text>
    </HStack>
  ),
};
