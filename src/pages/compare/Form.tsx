import {
  Box as ChakraBox,
  Input as ChakraInput,
  InputGroup as ChakraInputGroup,
  InputLeftElement as ChakraInputLeftElement,
  InputRightElement as ChakraInputRightElement,
  Textarea as ChakraTextarea,
  Select as ChakraSelect,
  SimpleGrid as ChakraSimpleGrid,
  Text,
  Heading,
  HStack as ChakraHStack,
  VStack as ChakraVStack,
} from '@chakra-ui/react';
import { FiSearch, FiMail, FiLock, FiX } from 'react-icons/fi';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea,
  Select,
  Box,
  HStack,
  VStack,
  IconButton,
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

const FormComparePage = () => {
  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>Form Components Comparison</Heading>

      <CompareSection
        title="Input - Basic"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraInput placeholder="Default input" />
            <ChakraInput placeholder="With value" defaultValue="Hello World" />
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Input placeholder="Default input" />
            <Input placeholder="With value" defaultValue="Hello World" />
          </VStack>
        }
      />

      <CompareSection
        title="Input - Types"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraInput type="text" placeholder="Text input" />
            <ChakraInput type="email" placeholder="Email input" />
            <ChakraInput type="password" placeholder="Password input" />
            <ChakraInput type="number" placeholder="Number input" />
            <ChakraInput type="date" />
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Input type="text" placeholder="Text input" />
            <Input type="email" placeholder="Email input" />
            <Input type="password" placeholder="Password input" />
            <Input type="number" placeholder="Number input" />
            <Input type="date" />
          </VStack>
        }
      />

      <CompareSection
        title="Input - Sizes"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraInput size="sm" placeholder="Small" />
            <ChakraInput size="md" placeholder="Medium" />
            <ChakraInput size="lg" placeholder="Large" />
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium" />
            <Input size="lg" placeholder="Large" />
          </VStack>
        }
      />

      <CompareSection
        title="Input - States"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraInput placeholder="Normal" />
            <ChakraInput placeholder="Disabled" isDisabled />
            <ChakraInput placeholder="Read only" isReadOnly defaultValue="Read only value" />
            <ChakraInput placeholder="Invalid" isInvalid />
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Input placeholder="Normal" />
            <Input placeholder="Disabled" isDisabled />
            <Input placeholder="Read only" isReadOnly defaultValue="Read only value" />
            <Input placeholder="Invalid" isInvalid />
          </VStack>
        }
      />

      <CompareSection
        title="InputGroup with InputLeftElement"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraInputGroup>
              <ChakraInputLeftElement pointerEvents="none">
                <FiSearch color="gray" />
              </ChakraInputLeftElement>
              <ChakraInput placeholder="Search..." />
            </ChakraInputGroup>
            <ChakraInputGroup>
              <ChakraInputLeftElement pointerEvents="none">
                <FiMail color="gray" />
              </ChakraInputLeftElement>
              <ChakraInput type="email" placeholder="Email address" />
            </ChakraInputGroup>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray" />
              </InputLeftElement>
              <Input placeholder="Search..." />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiMail color="gray" />
              </InputLeftElement>
              <Input type="email" placeholder="Email address" />
            </InputGroup>
          </VStack>
        }
      />

      <CompareSection
        title="InputGroup with InputRightElement"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraInputGroup>
              <ChakraInput placeholder="Search..." />
              <ChakraInputRightElement>
                <FiX color="gray" />
              </ChakraInputRightElement>
            </ChakraInputGroup>
            <ChakraInputGroup>
              <ChakraInputLeftElement pointerEvents="none">
                <FiLock color="gray" />
              </ChakraInputLeftElement>
              <ChakraInput type="password" placeholder="Password" />
              <ChakraInputRightElement>
                <FiX color="gray" />
              </ChakraInputRightElement>
            </ChakraInputGroup>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <InputGroup>
              <Input placeholder="Search..." />
              <InputRightElement>
                <FiX color="gray" />
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiLock color="gray" />
              </InputLeftElement>
              <Input type="password" placeholder="Password" />
              <InputRightElement>
                <FiX color="gray" />
              </InputRightElement>
            </InputGroup>
          </VStack>
        }
      />

      <CompareSection
        title="Textarea - Basic"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraTextarea placeholder="Enter description..." />
            <ChakraTextarea placeholder="With rows" rows={5} />
            <ChakraTextarea placeholder="With default value" defaultValue="Lorem ipsum dolor sit amet" />
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Textarea placeholder="Enter description..." />
            <Textarea placeholder="With rows" rows={5} />
            <Textarea placeholder="With default value" defaultValue="Lorem ipsum dolor sit amet" />
          </VStack>
        }
      />

      <CompareSection
        title="Textarea - States"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraTextarea placeholder="Normal" />
            <ChakraTextarea placeholder="Disabled" isDisabled />
            <ChakraTextarea placeholder="Read only" isReadOnly defaultValue="Read only content" />
            <ChakraTextarea placeholder="Invalid" isInvalid />
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Textarea placeholder="Normal" />
            <Textarea placeholder="Disabled" isDisabled />
            <Textarea placeholder="Read only" isReadOnly defaultValue="Read only content" />
            <Textarea placeholder="Invalid" isInvalid />
          </VStack>
        }
      />

      <CompareSection
        title="Select - Basic"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraSelect placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </ChakraSelect>
            <ChakraSelect defaultValue="option2">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </ChakraSelect>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Select placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Select defaultValue="option2">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </VStack>
        }
      />

      <CompareSection
        title="Select - Sizes"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraSelect size="sm" placeholder="Small">
              <option value="option1">Option 1</option>
            </ChakraSelect>
            <ChakraSelect size="md" placeholder="Medium">
              <option value="option1">Option 1</option>
            </ChakraSelect>
            <ChakraSelect size="lg" placeholder="Large">
              <option value="option1">Option 1</option>
            </ChakraSelect>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Select size="sm" placeholder="Small">
              <option value="option1">Option 1</option>
            </Select>
            <Select size="md" placeholder="Medium">
              <option value="option1">Option 1</option>
            </Select>
            <Select size="lg" placeholder="Large">
              <option value="option1">Option 1</option>
            </Select>
          </VStack>
        }
      />

      <CompareSection
        title="Select - States"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraSelect placeholder="Normal">
              <option value="option1">Option 1</option>
            </ChakraSelect>
            <ChakraSelect placeholder="Disabled" isDisabled>
              <option value="option1">Option 1</option>
            </ChakraSelect>
            <ChakraSelect placeholder="Invalid" isInvalid>
              <option value="option1">Option 1</option>
            </ChakraSelect>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Select placeholder="Normal">
              <option value="option1">Option 1</option>
            </Select>
            <Select placeholder="Disabled" isDisabled>
              <option value="option1">Option 1</option>
            </Select>
            <Select placeholder="Invalid" isInvalid>
              <option value="option1">Option 1</option>
            </Select>
          </VStack>
        }
      />

      <CompareSection
        title="Input with bg prop"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraInput placeholder="Default" />
            <ChakraInput placeholder="White background" bg="white" />
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Input placeholder="Default" />
            <Input placeholder="White background" bg="white" />
          </VStack>
        }
      />
    </ChakraBox>
  );
};

export default FormComparePage;
