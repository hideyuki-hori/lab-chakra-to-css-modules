import type { Meta, StoryObj } from '@storybook/react';
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '../Stat';
import { HStack, Card, CardBody, SimpleGrid } from '../';

const meta: Meta<typeof Stat> = {
  title: 'Data/Stat',
  component: Stat,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stat>;

export const Default: Story = {
  render: () => (
    <Stat>
      <StatLabel>総売上</StatLabel>
      <StatNumber>¥345,670</StatNumber>
      <StatHelpText>1月1日 - 1月31日</StatHelpText>
    </Stat>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <HStack spacing={8}>
      <Stat>
        <StatLabel>売上</StatLabel>
        <StatNumber>¥345,670</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          23.36%
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>コスト</StatLabel>
        <StatNumber>¥45,670</StatNumber>
        <StatHelpText>
          <StatArrow type="decrease" />
          9.05%
        </StatHelpText>
      </Stat>
    </HStack>
  ),
};

export const InCards: Story = {
  render: () => (
    <SimpleGrid columns={3} spacing={4}>
      <Card>
        <CardBody>
          <Stat>
            <StatLabel>タスク完了数</StatLabel>
            <StatNumber>42</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              12%
            </StatHelpText>
          </Stat>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Stat>
            <StatLabel>進行中</StatLabel>
            <StatNumber>15</StatNumber>
            <StatHelpText>前週比</StatHelpText>
          </Stat>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Stat>
            <StatLabel>遅延</StatLabel>
            <StatNumber>3</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              5%
            </StatHelpText>
          </Stat>
        </CardBody>
      </Card>
    </SimpleGrid>
  ),
};
