import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '../Alert';
import { VStack } from '../';

const meta: Meta<typeof Alert> = {
  title: 'Display/Alert',
  component: Alert,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertIcon />
      <AlertTitle>Info Alert</AlertTitle>
      <AlertDescription>This is an informational alert.</AlertDescription>
    </Alert>
  ),
};

export const Statuses: Story = {
  render: () => (
    <VStack spacing={4} align="stretch">
      <Alert status="info">
        <AlertIcon status="info" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is an info alert.</AlertDescription>
      </Alert>
      <Alert status="warning">
        <AlertIcon status="warning" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This is a warning alert.</AlertDescription>
      </Alert>
      <Alert status="success">
        <AlertIcon status="success" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>This is a success alert.</AlertDescription>
      </Alert>
      <Alert status="error">
        <AlertIcon status="error" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>This is an error alert.</AlertDescription>
      </Alert>
    </VStack>
  ),
};
