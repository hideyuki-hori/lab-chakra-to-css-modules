import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../Tooltip';
import { Button, HStack, VStack } from '../';

const meta: Meta<typeof Tooltip> = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '100px' }}>
      <Tooltip content="This is a tooltip">
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}>
      <VStack spacing={8}>
        <Tooltip content="Top tooltip" placement="top">
          <Button>Top</Button>
        </Tooltip>
        <HStack spacing={8}>
          <Tooltip content="Left tooltip" placement="left">
            <Button>Left</Button>
          </Tooltip>
          <Tooltip content="Right tooltip" placement="right">
            <Button>Right</Button>
          </Tooltip>
        </HStack>
        <Tooltip content="Bottom tooltip" placement="bottom">
          <Button>Bottom</Button>
        </Tooltip>
      </VStack>
    </div>
  ),
};

export const WithoutArrow: Story = {
  render: () => (
    <div style={{ padding: '100px' }}>
      <Tooltip content="No arrow" hasArrow={false}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};
