import type { Meta, StoryObj } from '@storybook/react';
import { Table, Thead, Tbody, Tr, Th, Td } from '../Table';
import { VStack, Badge } from '../';

const meta: Meta<typeof Table> = {
  title: 'Data/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
  { id: 1, name: 'タスク A', status: '進行中', priority: '高', assignee: '田中' },
  { id: 2, name: 'タスク B', status: '完了', priority: '中', assignee: '佐藤' },
  { id: 3, name: 'タスク C', status: '未着手', priority: '低', assignee: '鈴木' },
];

export const Default: Story = {
  render: () => (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>タスク名</Th>
          <Th>ステータス</Th>
          <Th>優先度</Th>
          <Th>担当者</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sampleData.map((row) => (
          <Tr key={row.id}>
            <Td>{row.id}</Td>
            <Td>{row.name}</Td>
            <Td>
              <Badge
                colorScheme={
                  row.status === '完了' ? 'green' : row.status === '進行中' ? 'blue' : 'gray'
                }
              >
                {row.status}
              </Badge>
            </Td>
            <Td>{row.priority}</Td>
            <Td>{row.assignee}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>タスク名</Th>
          <Th>ステータス</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sampleData.map((row) => (
          <Tr key={row.id}>
            <Td>{row.id}</Td>
            <Td>{row.name}</Td>
            <Td>{row.status}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack spacing={8} align="stretch">
      <div>
        <p style={{ marginBottom: '8px', fontWeight: 600 }}>Small</p>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Item A</Td>
              <Td isNumeric>100</Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontWeight: 600 }}>Medium (Default)</p>
        <Table size="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Item A</Td>
              <Td isNumeric>100</Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontWeight: 600 }}>Large</p>
        <Table size="lg">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Item A</Td>
              <Td isNumeric>100</Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    </VStack>
  ),
};
