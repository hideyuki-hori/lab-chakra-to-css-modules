import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../Tabs';
import { Text, VStack } from '../';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Text>Content for Tab 1</Text>
        </TabPanel>
        <TabPanel>
          <Text>Content for Tab 2</Text>
        </TabPanel>
        <TabPanel>
          <Text>Content for Tab 3</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const Variants: Story = {
  render: () => (
    <VStack spacing={8} align="stretch">
      <div>
        <Text style={{ marginBottom: '8px', fontWeight: 600 }}>Line (Default)</Text>
        <Tabs variant="line">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text>Line variant content</Text>
            </TabPanel>
            <TabPanel>
              <Text>Content 2</Text>
            </TabPanel>
            <TabPanel>
              <Text>Content 3</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <Text style={{ marginBottom: '8px', fontWeight: 600 }}>Enclosed</Text>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text>Enclosed variant content</Text>
            </TabPanel>
            <TabPanel>
              <Text>Content 2</Text>
            </TabPanel>
            <TabPanel>
              <Text>Content 3</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <Text style={{ marginBottom: '8px', fontWeight: 600 }}>Soft Rounded</Text>
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text>Soft rounded variant content</Text>
            </TabPanel>
            <TabPanel>
              <Text>Content 2</Text>
            </TabPanel>
            <TabPanel>
              <Text>Content 3</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </VStack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab isDisabled>Disabled</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Text>Content for Tab 1</Text>
        </TabPanel>
        <TabPanel>
          <Text>Content for disabled tab (not visible)</Text>
        </TabPanel>
        <TabPanel>
          <Text>Content for Tab 3</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};
