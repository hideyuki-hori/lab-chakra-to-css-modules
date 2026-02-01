import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../Heading';
import { VStack } from '../VStack';

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: 'Default Heading',
  },
};

export const Sizes: Story = {
  render: () => (
    <VStack spacing={4} align="flex-start">
      <Heading size="4xl">Heading 4XL</Heading>
      <Heading size="3xl">Heading 3XL</Heading>
      <Heading size="2xl">Heading 2XL</Heading>
      <Heading size="xl">Heading XL</Heading>
      <Heading size="lg">Heading LG</Heading>
      <Heading size="md">Heading MD</Heading>
      <Heading size="sm">Heading SM</Heading>
      <Heading size="xs">Heading XS</Heading>
    </VStack>
  ),
};

export const AsElement: Story = {
  render: () => (
    <VStack spacing={4} align="flex-start">
      <Heading as="h1" size="xl">H1 Element</Heading>
      <Heading as="h2" size="lg">H2 Element</Heading>
      <Heading as="h3" size="md">H3 Element</Heading>
    </VStack>
  ),
};
