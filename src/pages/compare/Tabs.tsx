import { useState } from 'react';
import {
  Box as ChakraBox,
  Tabs as ChakraTabs,
  TabList as ChakraTabList,
  Tab as ChakraTab,
  TabPanels as ChakraTabPanels,
  TabPanel as ChakraTabPanel,
  SimpleGrid as ChakraSimpleGrid,
  Text,
  Heading,
} from '@chakra-ui/react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '../../components/ui';

const CompareSection = ({
  title,
  chakraVersion,
  newVersion,
}: {
  title: string;
  chakraVersion: React.ReactNode;
  newVersion: React.ReactNode;
}) => (
  <ChakraBox mb={8}>
    <Heading size="md" mb={4}>{title}</Heading>
    <ChakraSimpleGrid columns={2} spacing={4}>
      <ChakraBox>
        <Text fontWeight="bold" mb={2} color="blue.600">Chakra UI</Text>
        <ChakraBox border="1px" borderColor="gray.200" p={4} borderRadius="md">
          {chakraVersion}
        </ChakraBox>
      </ChakraBox>
      <ChakraBox>
        <Text fontWeight="bold" mb={2} color="green.600">New (CSS Modules)</Text>
        <ChakraBox border="1px" borderColor="gray.200" p={4} borderRadius="md">
          {newVersion}
        </ChakraBox>
      </ChakraBox>
    </ChakraSimpleGrid>
  </ChakraBox>
);

const TabsComparePage = () => {
  const [controlledIndex, setControlledIndex] = useState(0);
  const [controlledIndex2, setControlledIndex2] = useState(0);

  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>Tabs Components Comparison</Heading>

      <CompareSection
        title="Tabs - Default (Line variant)"
        chakraVersion={
          <ChakraTabs>
            <ChakraTabList>
              <ChakraTab>Tab 1</ChakraTab>
              <ChakraTab>Tab 2</ChakraTab>
              <ChakraTab>Tab 3</ChakraTab>
            </ChakraTabList>
            <ChakraTabPanels>
              <ChakraTabPanel>
                <Text>Content of Tab 1</Text>
              </ChakraTabPanel>
              <ChakraTabPanel>
                <Text>Content of Tab 2</Text>
              </ChakraTabPanel>
              <ChakraTabPanel>
                <Text>Content of Tab 3</Text>
              </ChakraTabPanel>
            </ChakraTabPanels>
          </ChakraTabs>
        }
        newVersion={
          <Tabs>
            <TabList>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <span>Content of Tab 1</span>
              </TabPanel>
              <TabPanel>
                <span>Content of Tab 2</span>
              </TabPanel>
              <TabPanel>
                <span>Content of Tab 3</span>
              </TabPanel>
            </TabPanels>
          </Tabs>
        }
      />

      <CompareSection
        title="Tabs - Enclosed variant"
        chakraVersion={
          <ChakraTabs variant="enclosed">
            <ChakraTabList>
              <ChakraTab>Home</ChakraTab>
              <ChakraTab>Settings</ChakraTab>
              <ChakraTab>Profile</ChakraTab>
            </ChakraTabList>
            <ChakraTabPanels>
              <ChakraTabPanel>
                <Text>Home content</Text>
              </ChakraTabPanel>
              <ChakraTabPanel>
                <Text>Settings content</Text>
              </ChakraTabPanel>
              <ChakraTabPanel>
                <Text>Profile content</Text>
              </ChakraTabPanel>
            </ChakraTabPanels>
          </ChakraTabs>
        }
        newVersion={
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Home</Tab>
              <Tab>Settings</Tab>
              <Tab>Profile</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <span>Home content</span>
              </TabPanel>
              <TabPanel>
                <span>Settings content</span>
              </TabPanel>
              <TabPanel>
                <span>Profile content</span>
              </TabPanel>
            </TabPanels>
          </Tabs>
        }
      />

      <CompareSection
        title="Tabs - With defaultIndex"
        chakraVersion={
          <ChakraTabs defaultIndex={1}>
            <ChakraTabList>
              <ChakraTab>First</ChakraTab>
              <ChakraTab>Second (Default)</ChakraTab>
              <ChakraTab>Third</ChakraTab>
            </ChakraTabList>
            <ChakraTabPanels>
              <ChakraTabPanel>
                <Text>First tab content</Text>
              </ChakraTabPanel>
              <ChakraTabPanel>
                <Text>Second tab content (default selected)</Text>
              </ChakraTabPanel>
              <ChakraTabPanel>
                <Text>Third tab content</Text>
              </ChakraTabPanel>
            </ChakraTabPanels>
          </ChakraTabs>
        }
        newVersion={
          <Tabs defaultIndex={1}>
            <TabList>
              <Tab>First</Tab>
              <Tab>Second (Default)</Tab>
              <Tab>Third</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <span>First tab content</span>
              </TabPanel>
              <TabPanel>
                <span>Second tab content (default selected)</span>
              </TabPanel>
              <TabPanel>
                <span>Third tab content</span>
              </TabPanel>
            </TabPanels>
          </Tabs>
        }
      />

      <CompareSection
        title="Tabs - Controlled"
        chakraVersion={
          <ChakraBox>
            <Text mb={2} fontSize="sm" color="gray.600">
              Current index: {controlledIndex}
            </Text>
            <ChakraTabs index={controlledIndex} onChange={setControlledIndex}>
              <ChakraTabList>
                <ChakraTab>Overview</ChakraTab>
                <ChakraTab>Details</ChakraTab>
                <ChakraTab>Reviews</ChakraTab>
              </ChakraTabList>
              <ChakraTabPanels>
                <ChakraTabPanel>
                  <Text>Overview panel</Text>
                </ChakraTabPanel>
                <ChakraTabPanel>
                  <Text>Details panel</Text>
                </ChakraTabPanel>
                <ChakraTabPanel>
                  <Text>Reviews panel</Text>
                </ChakraTabPanel>
              </ChakraTabPanels>
            </ChakraTabs>
          </ChakraBox>
        }
        newVersion={
          <div>
            <span style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
              Current index: {controlledIndex2}
            </span>
            <Tabs index={controlledIndex2} onChange={setControlledIndex2}>
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Details</Tab>
                <Tab>Reviews</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <span>Overview panel</span>
                </TabPanel>
                <TabPanel>
                  <span>Details panel</span>
                </TabPanel>
                <TabPanel>
                  <span>Reviews panel</span>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        }
      />

      <CompareSection
        title="Tabs - With Disabled Tab"
        chakraVersion={
          <ChakraTabs>
            <ChakraTabList>
              <ChakraTab>Active</ChakraTab>
              <ChakraTab isDisabled>Disabled</ChakraTab>
              <ChakraTab>Another Active</ChakraTab>
            </ChakraTabList>
            <ChakraTabPanels>
              <ChakraTabPanel>
                <Text>Active tab content</Text>
              </ChakraTabPanel>
              <ChakraTabPanel>
                <Text>Disabled tab content</Text>
              </ChakraTabPanel>
              <ChakraTabPanel>
                <Text>Another active tab content</Text>
              </ChakraTabPanel>
            </ChakraTabPanels>
          </ChakraTabs>
        }
        newVersion={
          <Tabs>
            <TabList>
              <Tab>Active</Tab>
              <Tab isDisabled>Disabled</Tab>
              <Tab>Another Active</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <span>Active tab content</span>
              </TabPanel>
              <TabPanel>
                <span>Disabled tab content</span>
              </TabPanel>
              <TabPanel>
                <span>Another active tab content</span>
              </TabPanel>
            </TabPanels>
          </Tabs>
        }
      />

      <CompareSection
        title="Tabs - Japanese Labels"
        chakraVersion={
          <ChakraTabs variant="enclosed">
            <ChakraTabList>
              <ChakraTab>概要</ChakraTab>
              <ChakraTab>設定</ChakraTab>
              <ChakraTab>履歴</ChakraTab>
            </ChakraTabList>
            <ChakraTabPanels>
              <ChakraTabPanel>
                <Text>概要タブの内容です。</Text>
              </ChakraTabPanel>
              <ChakraTabPanel>
                <Text>設定タブの内容です。</Text>
              </ChakraTabPanel>
              <ChakraTabPanel>
                <Text>履歴タブの内容です。</Text>
              </ChakraTabPanel>
            </ChakraTabPanels>
          </ChakraTabs>
        }
        newVersion={
          <Tabs variant="enclosed">
            <TabList>
              <Tab>概要</Tab>
              <Tab>設定</Tab>
              <Tab>履歴</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <span>概要タブの内容です。</span>
              </TabPanel>
              <TabPanel>
                <span>設定タブの内容です。</span>
              </TabPanel>
              <TabPanel>
                <span>履歴タブの内容です。</span>
              </TabPanel>
            </TabPanels>
          </Tabs>
        }
      />

      <CompareSection
        title="Tabs - Many Tabs"
        chakraVersion={
          <ChakraTabs>
            <ChakraTabList>
              <ChakraTab>Tab 1</ChakraTab>
              <ChakraTab>Tab 2</ChakraTab>
              <ChakraTab>Tab 3</ChakraTab>
              <ChakraTab>Tab 4</ChakraTab>
              <ChakraTab>Tab 5</ChakraTab>
            </ChakraTabList>
            <ChakraTabPanels>
              <ChakraTabPanel><Text>Panel 1</Text></ChakraTabPanel>
              <ChakraTabPanel><Text>Panel 2</Text></ChakraTabPanel>
              <ChakraTabPanel><Text>Panel 3</Text></ChakraTabPanel>
              <ChakraTabPanel><Text>Panel 4</Text></ChakraTabPanel>
              <ChakraTabPanel><Text>Panel 5</Text></ChakraTabPanel>
            </ChakraTabPanels>
          </ChakraTabs>
        }
        newVersion={
          <Tabs>
            <TabList>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
              <Tab>Tab 4</Tab>
              <Tab>Tab 5</Tab>
            </TabList>
            <TabPanels>
              <TabPanel><span>Panel 1</span></TabPanel>
              <TabPanel><span>Panel 2</span></TabPanel>
              <TabPanel><span>Panel 3</span></TabPanel>
              <TabPanel><span>Panel 4</span></TabPanel>
              <TabPanel><span>Panel 5</span></TabPanel>
            </TabPanels>
          </Tabs>
        }
      />
    </ChakraBox>
  );
};

export default TabsComparePage;
