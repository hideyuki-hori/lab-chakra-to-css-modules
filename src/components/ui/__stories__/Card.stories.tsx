import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from '../Card';
import { Heading, Text, Button, HStack, VStack } from '../';

const meta: Meta<typeof Card> = {
  title: 'Display/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: '320px' }}>
      <CardHeader>
        <Heading size="md">Card Title</Heading>
      </CardHeader>
      <CardBody>
        <Text>This is the card body content. You can put any content here.</Text>
      </CardBody>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <HStack spacing={4} align="flex-start">
      <Card variant="elevated" style={{ width: '200px' }}>
        <CardBody>
          <Text>Elevated</Text>
        </CardBody>
      </Card>
      <Card variant="outline" style={{ width: '200px' }}>
        <CardBody>
          <Text>Outline</Text>
        </CardBody>
      </Card>
      <Card variant="filled" style={{ width: '200px' }}>
        <CardBody>
          <Text>Filled</Text>
        </CardBody>
      </Card>
    </HStack>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Card isHoverable style={{ maxWidth: '320px' }}>
      <CardBody>
        <Text>Hover over me!</Text>
      </CardBody>
    </Card>
  ),
};
