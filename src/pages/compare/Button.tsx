import {
  Box as ChakraBox,
  Button as ChakraButton,
  IconButton as ChakraIconButton,
  CloseButton as ChakraCloseButton,
  SimpleGrid as ChakraSimpleGrid,
  Text,
  Heading,
  HStack as ChakraHStack,
  VStack as ChakraVStack,
} from '@chakra-ui/react';
import { FiPlus, FiSave, FiTrash2, FiArrowLeft, FiBell, FiX } from 'react-icons/fi';
import {
  Button,
  IconButton,
  CloseButton,
  Box,
  HStack,
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

const ButtonComparePage = () => {
  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>Button Components Comparison</Heading>

      <CompareSection
        title="Button - Solid Variants"
        chakraVersion={
          <ChakraHStack spacing={4} wrap="wrap">
            <ChakraButton colorScheme="blue">Blue</ChakraButton>
            <ChakraButton colorScheme="green">Green</ChakraButton>
            <ChakraButton colorScheme="red">Red</ChakraButton>
            <ChakraButton colorScheme="gray">Gray</ChakraButton>
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <Button colorScheme="blue">Blue</Button>
            <Button colorScheme="green">Green</Button>
            <Button colorScheme="red">Red</Button>
            <Button colorScheme="gray">Gray</Button>
          </HStack>
        }
      />

      <CompareSection
        title="Button - Outline Variants"
        chakraVersion={
          <ChakraHStack spacing={4} wrap="wrap">
            <ChakraButton variant="outline" colorScheme="blue">Blue</ChakraButton>
            <ChakraButton variant="outline" colorScheme="green">Green</ChakraButton>
            <ChakraButton variant="outline" colorScheme="red">Red</ChakraButton>
            <ChakraButton variant="outline">Gray</ChakraButton>
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <Button variant="outline" colorScheme="blue">Blue</Button>
            <Button variant="outline" colorScheme="green">Green</Button>
            <Button variant="outline" colorScheme="red">Red</Button>
            <Button variant="outline" colorScheme="gray">Gray</Button>
          </HStack>
        }
      />

      <CompareSection
        title="Button - Ghost Variants"
        chakraVersion={
          <ChakraHStack spacing={4} wrap="wrap">
            <ChakraButton variant="ghost" colorScheme="blue">Blue</ChakraButton>
            <ChakraButton variant="ghost" colorScheme="green">Green</ChakraButton>
            <ChakraButton variant="ghost" colorScheme="red">Red</ChakraButton>
            <ChakraButton variant="ghost">Gray</ChakraButton>
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <Button variant="ghost" colorScheme="blue">Blue</Button>
            <Button variant="ghost" colorScheme="green">Green</Button>
            <Button variant="ghost" colorScheme="red">Red</Button>
            <Button variant="ghost" colorScheme="gray">Gray</Button>
          </HStack>
        }
      />

      <CompareSection
        title="Button - Sizes"
        chakraVersion={
          <ChakraHStack spacing={4} align="center">
            <ChakraButton size="sm" colorScheme="blue">Small</ChakraButton>
            <ChakraButton size="md" colorScheme="blue">Medium</ChakraButton>
            <ChakraButton size="lg" colorScheme="blue">Large</ChakraButton>
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4} align="center">
            <Button size="sm" colorScheme="blue">Small</Button>
            <Button size="md" colorScheme="blue">Medium</Button>
            <Button size="lg" colorScheme="blue">Large</Button>
          </HStack>
        }
      />

      <CompareSection
        title="Button - With Icons"
        chakraVersion={
          <ChakraHStack spacing={4} wrap="wrap">
            <ChakraButton leftIcon={<FiPlus />} colorScheme="blue">Add Item</ChakraButton>
            <ChakraButton leftIcon={<FiSave />} colorScheme="green">Save</ChakraButton>
            <ChakraButton leftIcon={<FiTrash2 />} colorScheme="red" variant="outline">Delete</ChakraButton>
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <Button leftIcon={<FiPlus />} colorScheme="blue">Add Item</Button>
            <Button leftIcon={<FiSave />} colorScheme="green">Save</Button>
            <Button leftIcon={<FiTrash2 />} colorScheme="red" variant="outline">Delete</Button>
          </HStack>
        }
      />

      <CompareSection
        title="Button - Loading State"
        chakraVersion={
          <ChakraHStack spacing={4}>
            <ChakraButton isLoading colorScheme="blue">Loading</ChakraButton>
            <ChakraButton isLoading loadingText="Saving..." colorScheme="green">Save</ChakraButton>
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <Button isLoading colorScheme="blue">Loading</Button>
            <Button isLoading loadingText="Saving..." colorScheme="green">Save</Button>
          </HStack>
        }
      />

      <CompareSection
        title="Button - Disabled State"
        chakraVersion={
          <ChakraHStack spacing={4}>
            <ChakraButton isDisabled colorScheme="blue">Disabled</ChakraButton>
            <ChakraButton isDisabled variant="outline">Disabled Outline</ChakraButton>
            <ChakraButton isDisabled variant="ghost">Disabled Ghost</ChakraButton>
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <Button isDisabled colorScheme="blue">Disabled</Button>
            <Button isDisabled variant="outline">Disabled Outline</Button>
            <Button isDisabled variant="ghost">Disabled Ghost</Button>
          </HStack>
        }
      />

      <CompareSection
        title="IconButton - Variants"
        chakraVersion={
          <ChakraHStack spacing={4}>
            <ChakraIconButton icon={<FiArrowLeft />} aria-label="Back" />
            <ChakraIconButton icon={<FiBell />} aria-label="Notifications" variant="ghost" />
            <ChakraIconButton icon={<FiX />} aria-label="Clear" variant="outline" size="sm" />
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <IconButton icon={<FiArrowLeft />} aria-label="Back" />
            <IconButton icon={<FiBell />} aria-label="Notifications" variant="ghost" />
            <IconButton icon={<FiX />} aria-label="Clear" variant="outline" size="sm" />
          </HStack>
        }
      />

      <CompareSection
        title="IconButton - Sizes"
        chakraVersion={
          <ChakraHStack spacing={4} align="center">
            <ChakraIconButton icon={<FiBell />} aria-label="Notifications" size="sm" colorScheme="blue" />
            <ChakraIconButton icon={<FiBell />} aria-label="Notifications" size="md" colorScheme="blue" />
            <ChakraIconButton icon={<FiBell />} aria-label="Notifications" size="lg" colorScheme="blue" />
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4} align="center">
            <IconButton icon={<FiBell />} aria-label="Notifications" size="sm" colorScheme="blue" />
            <IconButton icon={<FiBell />} aria-label="Notifications" size="md" colorScheme="blue" />
            <IconButton icon={<FiBell />} aria-label="Notifications" size="lg" colorScheme="blue" />
          </HStack>
        }
      />

      <CompareSection
        title="CloseButton - Sizes"
        chakraVersion={
          <ChakraHStack spacing={4} align="center">
            <ChakraCloseButton size="sm" />
            <ChakraCloseButton size="md" />
            <ChakraCloseButton size="lg" />
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4} align="center">
            <CloseButton size="sm" />
            <CloseButton size="md" />
            <CloseButton size="lg" />
          </HStack>
        }
      />

      <CompareSection
        title="Button - Full Width"
        chakraVersion={
          <ChakraVStack spacing={4}>
            <ChakraButton w="full" colorScheme="blue">Full Width Button</ChakraButton>
            <ChakraButton w="full" variant="outline">Full Width Outline</ChakraButton>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Button w="full" colorScheme="blue">Full Width Button</Button>
            <Button w="full" variant="outline">Full Width Outline</Button>
          </VStack>
        }
      />
    </ChakraBox>
  );
};

export default ButtonComparePage;
