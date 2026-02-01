import { useState } from 'react';
import {
  Box as ChakraBox,
  Checkbox as ChakraCheckbox,
  Radio as ChakraRadio,
  RadioGroup as ChakraRadioGroup,
  Switch as ChakraSwitch,
  SimpleGrid as ChakraSimpleGrid,
  Text,
  Heading,
  VStack as ChakraVStack,
  HStack as ChakraHStack,
} from '@chakra-ui/react';
import {
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  VStack,
  HStack,
  Box,
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

const FormSelectionComparePage = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const [switchChecked, setSwitchChecked] = useState(false);

  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>Form Selection Components Comparison</Heading>

      <CompareSection
        title="Checkbox - Basic"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraCheckbox>Default checkbox</ChakraCheckbox>
            <ChakraCheckbox isChecked>Checked checkbox</ChakraCheckbox>
            <ChakraCheckbox isDisabled>Disabled checkbox</ChakraCheckbox>
            <ChakraCheckbox isChecked isDisabled>Checked disabled</ChakraCheckbox>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Checkbox>Default checkbox</Checkbox>
            <Checkbox isChecked>Checked checkbox</Checkbox>
            <Checkbox isDisabled>Disabled checkbox</Checkbox>
            <Checkbox isChecked isDisabled>Checked disabled</Checkbox>
          </VStack>
        }
      />

      <CompareSection
        title="Checkbox - Controlled"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraCheckbox
              isChecked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}
            >
              Toggle me (Chakra)
            </ChakraCheckbox>
            <Text>Checked: {checkboxChecked ? 'Yes' : 'No'}</Text>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Checkbox
              isChecked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}
            >
              Toggle me (New)
            </Checkbox>
            <Box>Checked: {checkboxChecked ? 'Yes' : 'No'}</Box>
          </VStack>
        }
      />

      <CompareSection
        title="Checkbox - Color Schemes"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraCheckbox colorScheme="blue" isChecked>Blue</ChakraCheckbox>
            <ChakraCheckbox colorScheme="green" isChecked>Green</ChakraCheckbox>
            <ChakraCheckbox colorScheme="red" isChecked>Red</ChakraCheckbox>
            <ChakraCheckbox colorScheme="orange" isChecked>Orange</ChakraCheckbox>
            <ChakraCheckbox colorScheme="gray" isChecked>Gray</ChakraCheckbox>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Checkbox colorScheme="blue" isChecked>Blue</Checkbox>
            <Checkbox colorScheme="green" isChecked>Green</Checkbox>
            <Checkbox colorScheme="red" isChecked>Red</Checkbox>
            <Checkbox colorScheme="orange" isChecked>Orange</Checkbox>
            <Checkbox colorScheme="gray" isChecked>Gray</Checkbox>
          </VStack>
        }
      />

      <CompareSection
        title="Radio - Basic"
        chakraVersion={
          <ChakraRadioGroup value={radioValue} onChange={setRadioValue}>
            <ChakraVStack spacing={4} align="stretch">
              <ChakraRadio value="1">Option 1</ChakraRadio>
              <ChakraRadio value="2">Option 2</ChakraRadio>
              <ChakraRadio value="3">Option 3</ChakraRadio>
            </ChakraVStack>
          </ChakraRadioGroup>
        }
        newVersion={
          <RadioGroup value={radioValue} onChange={setRadioValue}>
            <VStack spacing={4} align="stretch">
              <Radio value="1">Option 1</Radio>
              <Radio value="2">Option 2</Radio>
              <Radio value="3">Option 3</Radio>
            </VStack>
          </RadioGroup>
        }
      />

      <CompareSection
        title="Radio - Color Schemes"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraRadio colorScheme="blue" isChecked>Blue</ChakraRadio>
            <ChakraRadio colorScheme="green" isChecked>Green</ChakraRadio>
            <ChakraRadio colorScheme="red" isChecked>Red</ChakraRadio>
            <ChakraRadio colorScheme="orange" isChecked>Orange</ChakraRadio>
            <ChakraRadio colorScheme="gray" isChecked>Gray</ChakraRadio>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Radio value="blue" colorScheme="blue" checked>Blue</Radio>
            <Radio value="green" colorScheme="green" checked>Green</Radio>
            <Radio value="red" colorScheme="red" checked>Red</Radio>
            <Radio value="orange" colorScheme="orange" checked>Orange</Radio>
            <Radio value="gray" colorScheme="gray" checked>Gray</Radio>
          </VStack>
        }
      />

      <CompareSection
        title="Radio - Disabled"
        chakraVersion={
          <ChakraRadioGroup defaultValue="1">
            <ChakraVStack spacing={4} align="stretch">
              <ChakraRadio value="1">Enabled option</ChakraRadio>
              <ChakraRadio value="2" isDisabled>Disabled option</ChakraRadio>
              <ChakraRadio value="3">Another enabled</ChakraRadio>
            </ChakraVStack>
          </ChakraRadioGroup>
        }
        newVersion={
          <RadioGroup value="1" onChange={() => {}}>
            <VStack spacing={4} align="stretch">
              <Radio value="1">Enabled option</Radio>
              <Radio value="2" isDisabled>Disabled option</Radio>
              <Radio value="3">Another enabled</Radio>
            </VStack>
          </RadioGroup>
        }
      />

      <CompareSection
        title="Switch - Basic"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraHStack>
              <ChakraSwitch />
              <Text>Default switch</Text>
            </ChakraHStack>
            <ChakraHStack>
              <ChakraSwitch isChecked />
              <Text>Checked switch</Text>
            </ChakraHStack>
            <ChakraHStack>
              <ChakraSwitch isDisabled />
              <Text>Disabled switch</Text>
            </ChakraHStack>
            <ChakraHStack>
              <ChakraSwitch isChecked isDisabled />
              <Text>Checked disabled</Text>
            </ChakraHStack>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <HStack>
              <Switch />
              <Box>Default switch</Box>
            </HStack>
            <HStack>
              <Switch isChecked />
              <Box>Checked switch</Box>
            </HStack>
            <HStack>
              <Switch isDisabled />
              <Box>Disabled switch</Box>
            </HStack>
            <HStack>
              <Switch isChecked isDisabled />
              <Box>Checked disabled</Box>
            </HStack>
          </VStack>
        }
      />

      <CompareSection
        title="Switch - Controlled"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraHStack>
              <ChakraSwitch
                isChecked={switchChecked}
                onChange={(e) => setSwitchChecked(e.target.checked)}
              />
              <Text>Toggle me (Chakra)</Text>
            </ChakraHStack>
            <Text>Checked: {switchChecked ? 'Yes' : 'No'}</Text>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <HStack>
              <Switch
                isChecked={switchChecked}
                onChange={(e) => setSwitchChecked(e.target.checked)}
              />
              <Box>Toggle me (New)</Box>
            </HStack>
            <Box>Checked: {switchChecked ? 'Yes' : 'No'}</Box>
          </VStack>
        }
      />

      <CompareSection
        title="Switch - Color Schemes"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraHStack>
              <ChakraSwitch colorScheme="blue" isChecked />
              <Text>Blue</Text>
            </ChakraHStack>
            <ChakraHStack>
              <ChakraSwitch colorScheme="green" isChecked />
              <Text>Green</Text>
            </ChakraHStack>
            <ChakraHStack>
              <ChakraSwitch colorScheme="red" isChecked />
              <Text>Red</Text>
            </ChakraHStack>
            <ChakraHStack>
              <ChakraSwitch colorScheme="orange" isChecked />
              <Text>Orange</Text>
            </ChakraHStack>
            <ChakraHStack>
              <ChakraSwitch colorScheme="teal" isChecked />
              <Text>Teal</Text>
            </ChakraHStack>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <HStack>
              <Switch colorScheme="blue" isChecked />
              <Box>Blue</Box>
            </HStack>
            <HStack>
              <Switch colorScheme="green" isChecked />
              <Box>Green</Box>
            </HStack>
            <HStack>
              <Switch colorScheme="red" isChecked />
              <Box>Red</Box>
            </HStack>
            <HStack>
              <Switch colorScheme="orange" isChecked />
              <Box>Orange</Box>
            </HStack>
            <HStack>
              <Switch colorScheme="teal" isChecked />
              <Box>Teal</Box>
            </HStack>
          </VStack>
        }
      />

      <CompareSection
        title="Switch - Default Checked"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraHStack>
              <ChakraSwitch defaultChecked colorScheme="blue" />
              <Text>Default checked</Text>
            </ChakraHStack>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <HStack>
              <Switch defaultChecked colorScheme="blue" />
              <Box>Default checked</Box>
            </HStack>
          </VStack>
        }
      />
    </ChakraBox>
  );
};

export default FormSelectionComparePage;
