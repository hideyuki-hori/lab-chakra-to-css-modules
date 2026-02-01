import {
  Box as ChakraBox,
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  FormErrorMessage as ChakraFormErrorMessage,
  FormHelperText as ChakraFormHelperText,
  Input as ChakraInput,
  Textarea as ChakraTextarea,
  Select as ChakraSelect,
  SimpleGrid as ChakraSimpleGrid,
  Text,
  Heading,
  VStack as ChakraVStack,
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Select,
  Box,
  VStack,
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

const FormControlComparePage = () => {
  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>FormControl Components Comparison</Heading>

      <CompareSection
        title="FormControl + FormLabel - Basic"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraFormControl>
              <ChakraFormLabel>Name</ChakraFormLabel>
              <ChakraInput placeholder="Enter your name" />
            </ChakraFormControl>
            <ChakraFormControl>
              <ChakraFormLabel>Email</ChakraFormLabel>
              <ChakraInput type="email" placeholder="Enter your email" />
            </ChakraFormControl>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Enter your name" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
          </VStack>
        }
      />

      <CompareSection
        title="FormControl - isRequired"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraFormControl isRequired>
              <ChakraFormLabel>Username</ChakraFormLabel>
              <ChakraInput placeholder="Required field" />
            </ChakraFormControl>
            <ChakraFormControl isRequired>
              <ChakraFormLabel>Password</ChakraFormLabel>
              <ChakraInput type="password" placeholder="Required password" />
            </ChakraFormControl>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Required field" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Required password" />
            </FormControl>
          </VStack>
        }
      />

      <CompareSection
        title="FormControl - isInvalid with FormErrorMessage"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraFormControl isInvalid>
              <ChakraFormLabel>Email</ChakraFormLabel>
              <ChakraInput type="email" placeholder="Enter email" />
              <ChakraFormErrorMessage>Email is required.</ChakraFormErrorMessage>
            </ChakraFormControl>
            <ChakraFormControl isInvalid>
              <ChakraFormLabel>Password</ChakraFormLabel>
              <ChakraInput type="password" placeholder="Enter password" />
              <ChakraFormErrorMessage>Password must be at least 8 characters.</ChakraFormErrorMessage>
            </ChakraFormControl>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter email" isInvalid />
              <FormErrorMessage>Email is required.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter password" isInvalid />
              <FormErrorMessage>Password must be at least 8 characters.</FormErrorMessage>
            </FormControl>
          </VStack>
        }
      />

      <CompareSection
        title="FormControl - isValid (no error message shown)"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraFormControl isInvalid={false}>
              <ChakraFormLabel>Valid Field</ChakraFormLabel>
              <ChakraInput placeholder="This is valid" />
              <ChakraFormErrorMessage>This should not be visible.</ChakraFormErrorMessage>
            </ChakraFormControl>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid={false}>
              <FormLabel>Valid Field</FormLabel>
              <Input placeholder="This is valid" />
              <FormErrorMessage>This should not be visible.</FormErrorMessage>
            </FormControl>
          </VStack>
        }
      />

      <CompareSection
        title="FormControl - with FormHelperText"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraFormControl>
              <ChakraFormLabel>Bio</ChakraFormLabel>
              <ChakraTextarea placeholder="Tell us about yourself" />
              <ChakraFormHelperText>Maximum 500 characters.</ChakraFormHelperText>
            </ChakraFormControl>
            <ChakraFormControl>
              <ChakraFormLabel>Website</ChakraFormLabel>
              <ChakraInput placeholder="https://example.com" />
              <ChakraFormHelperText>Include the full URL with https://</ChakraFormHelperText>
            </ChakraFormControl>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea placeholder="Tell us about yourself" />
              <FormHelperText>Maximum 500 characters.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Website</FormLabel>
              <Input placeholder="https://example.com" />
              <FormHelperText>Include the full URL with https://</FormHelperText>
            </FormControl>
          </VStack>
        }
      />

      <CompareSection
        title="FormControl - isRequired + isInvalid"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraFormControl isRequired isInvalid>
              <ChakraFormLabel>Required Email</ChakraFormLabel>
              <ChakraInput type="email" placeholder="Enter email" />
              <ChakraFormErrorMessage>This field is required.</ChakraFormErrorMessage>
            </ChakraFormControl>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <FormControl isRequired isInvalid>
              <FormLabel>Required Email</FormLabel>
              <Input type="email" placeholder="Enter email" isInvalid />
              <FormErrorMessage>This field is required.</FormErrorMessage>
            </FormControl>
          </VStack>
        }
      />

      <CompareSection
        title="FormControl - with Select"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraFormControl>
              <ChakraFormLabel>Country</ChakraFormLabel>
              <ChakraSelect placeholder="Select country">
                <option value="jp">Japan</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
              </ChakraSelect>
              <ChakraFormHelperText>Select your country of residence.</ChakraFormHelperText>
            </ChakraFormControl>
            <ChakraFormControl isRequired isInvalid>
              <ChakraFormLabel>Priority</ChakraFormLabel>
              <ChakraSelect placeholder="Select priority">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </ChakraSelect>
              <ChakraFormErrorMessage>Please select a priority.</ChakraFormErrorMessage>
            </ChakraFormControl>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select placeholder="Select country">
                <option value="jp">Japan</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
              </Select>
              <FormHelperText>Select your country of residence.</FormHelperText>
            </FormControl>
            <FormControl isRequired isInvalid>
              <FormLabel>Priority</FormLabel>
              <Select placeholder="Select priority" isInvalid>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
              <FormErrorMessage>Please select a priority.</FormErrorMessage>
            </FormControl>
          </VStack>
        }
      />

      <CompareSection
        title="FormLabel - with mb and flex props"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraFormControl display="flex" alignItems="center">
              <ChakraFormLabel mb="0" flex="1">Enable notifications</ChakraFormLabel>
              <Box>Switch would go here</Box>
            </ChakraFormControl>
            <ChakraFormControl>
              <ChakraFormLabel mb="0">No margin bottom</ChakraFormLabel>
              <ChakraInput placeholder="Input right below label" />
            </ChakraFormControl>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <FormControl display="flex" alignItems="center">
              <FormLabel mb={0} flex="1">Enable notifications</FormLabel>
              <Box>Switch would go here</Box>
            </FormControl>
            <FormControl>
              <FormLabel mb={0}>No margin bottom</FormLabel>
              <Input placeholder="Input right below label" />
            </FormControl>
          </VStack>
        }
      />
    </ChakraBox>
  );
};

export default FormControlComparePage;
