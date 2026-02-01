import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../Switch';
import { HStack } from '../';

const meta: Meta<typeof Switch> = {
  title: 'Form/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    children: 'Switch',
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
      <Switch size="sm">Small</Switch>
      <Switch size="md">Medium</Switch>
      <Switch size="lg">Large</Switch>
    </HStack>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <HStack spacing={6}>
      <Switch colorScheme="primary" defaultChecked>Primary</Switch>
      <Switch colorScheme="green" defaultChecked>Green</Switch>
      <Switch colorScheme="blue" defaultChecked>Blue</Switch>
      <Switch colorScheme="red" defaultChecked>Red</Switch>
    </HStack>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    isDisabled: true,
  },
};
