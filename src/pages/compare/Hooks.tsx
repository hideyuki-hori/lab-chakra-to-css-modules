'use client';

import {
  Box as ChakraBox,
  Button as ChakraButton,
  SimpleGrid as ChakraSimpleGrid,
  Text,
  Heading,
  VStack as ChakraVStack,
  HStack as ChakraHStack,
  useDisclosure as useChakraDisclosure,
  useToast as useChakraToast,
  useColorModeValue as useChakraColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Button, VStack, HStack, Box } from '../../components/ui';
import { useDisclosure, useToast, useColorModeValue } from '../../hooks';

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
    <Heading size="md" mb={4}>
      {title}
    </Heading>
    <ChakraSimpleGrid columns={2} spacing={4}>
      <ChakraBox>
        <Text fontWeight="bold" mb={2} color="blue.600">
          Chakra UI
        </Text>
        <ChakraBox border="1px" borderColor="gray.200" p={4} borderRadius="md">
          {chakraVersion}
        </ChakraBox>
      </ChakraBox>
      <ChakraBox>
        <Text fontWeight="bold" mb={2} color="green.600">
          New (CSS Modules)
        </Text>
        <ChakraBox border="1px" borderColor="gray.200" p={4} borderRadius="md">
          {newVersion}
        </ChakraBox>
      </ChakraBox>
    </ChakraSimpleGrid>
  </ChakraBox>
);

const ChakraDisclosureDemo = () => {
  const { isOpen, onOpen, onClose, onToggle } = useChakraDisclosure();
  return (
    <ChakraVStack spacing={4} align="stretch">
      <ChakraHStack spacing={2}>
        <ChakraButton size="sm" onClick={onOpen} colorScheme="blue">
          Open
        </ChakraButton>
        <ChakraButton size="sm" onClick={onClose} colorScheme="red">
          Close
        </ChakraButton>
        <ChakraButton size="sm" onClick={onToggle} colorScheme="gray">
          Toggle
        </ChakraButton>
      </ChakraHStack>
      <Text>isOpen: {isOpen ? 'true' : 'false'}</Text>
      {isOpen && (
        <ChakraBox p={4} bg="blue.50" borderRadius="md">
          This content is visible when open
        </ChakraBox>
      )}
    </ChakraVStack>
  );
};

const NewDisclosureDemo = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={2}>
        <Button size="sm" onClick={onOpen} colorScheme="blue">
          Open
        </Button>
        <Button size="sm" onClick={onClose} colorScheme="red">
          Close
        </Button>
        <Button size="sm" onClick={onToggle} colorScheme="gray">
          Toggle
        </Button>
      </HStack>
      <Text>isOpen: {isOpen ? 'true' : 'false'}</Text>
      {isOpen && (
        <Box p={4} bg="blue.50" borderRadius="md">
          This content is visible when open
        </Box>
      )}
    </VStack>
  );
};

const ChakraDisclosureModalDemo = () => {
  const { isOpen, onOpen, onClose } = useChakraDisclosure();
  return (
    <ChakraVStack spacing={4} align="stretch">
      <ChakraButton onClick={onOpen} colorScheme="blue">
        Open Modal
      </ChakraButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This is the modal content using useDisclosure hook.
          </ModalBody>
          <ModalFooter>
            <ChakraButton colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </ChakraButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraVStack>
  );
};

const NewDisclosureModalDemo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack spacing={4} align="stretch">
      <Button onClick={onOpen} colorScheme="blue">
        Open Modal
      </Button>
      {isOpen && (
        <Box
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.200"
        >
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontWeight="bold">Modal Title</Text>
              <Button size="sm" variant="ghost" onClick={onClose}>
                X
              </Button>
            </HStack>
            <Text>This is the modal content using useDisclosure hook.</Text>
            <HStack justify="flex-end">
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

const ChakraToastDemo = () => {
  const toast = useChakraToast();
  return (
    <ChakraVStack spacing={4} align="stretch">
      <ChakraHStack spacing={2} wrap="wrap">
        <ChakraButton
          size="sm"
          colorScheme="blue"
          onClick={() =>
            toast({
              title: 'Info Toast',
              description: 'This is an info message',
              status: 'info',
              duration: 3000,
              isClosable: true,
            })
          }
        >
          Info
        </ChakraButton>
        <ChakraButton
          size="sm"
          colorScheme="green"
          onClick={() =>
            toast({
              title: 'Success Toast',
              description: 'Operation completed successfully',
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
          }
        >
          Success
        </ChakraButton>
        <ChakraButton
          size="sm"
          colorScheme="orange"
          onClick={() =>
            toast({
              title: 'Warning Toast',
              description: 'Please check your input',
              status: 'warning',
              duration: 3000,
              isClosable: true,
            })
          }
        >
          Warning
        </ChakraButton>
        <ChakraButton
          size="sm"
          colorScheme="red"
          onClick={() =>
            toast({
              title: 'Error Toast',
              description: 'Something went wrong',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
          }
        >
          Error
        </ChakraButton>
      </ChakraHStack>
    </ChakraVStack>
  );
};

const NewToastDemo = () => {
  const toast = useToast();
  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={2}>
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() =>
            toast({
              title: 'Info Toast',
              description: 'This is an info message',
              status: 'info',
              duration: 3000,
              isClosable: true,
            })
          }
        >
          Info
        </Button>
        <Button
          size="sm"
          colorScheme="green"
          onClick={() =>
            toast({
              title: 'Success Toast',
              description: 'Operation completed successfully',
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
          }
        >
          Success
        </Button>
        <Button
          size="sm"
          colorScheme="gray"
          onClick={() =>
            toast({
              title: 'Warning Toast',
              description: 'Please check your input',
              status: 'warning',
              duration: 3000,
              isClosable: true,
            })
          }
        >
          Warning
        </Button>
        <Button
          size="sm"
          colorScheme="red"
          onClick={() =>
            toast({
              title: 'Error Toast',
              description: 'Something went wrong',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
          }
        >
          Error
        </Button>
      </HStack>
    </VStack>
  );
};

const ChakraColorModeValueDemo = () => {
  const bgColor = useChakraColorModeValue('gray.100', 'gray.700');
  const textColor = useChakraColorModeValue('gray.800', 'gray.100');
  return (
    <ChakraBox p={4} bg={bgColor} color={textColor} borderRadius="md">
      <Text>
        Background: {bgColor}, Text: {textColor}
      </Text>
      <Text fontSize="sm" mt={2}>
        (Currently in light mode - shows light values)
      </Text>
    </ChakraBox>
  );
};

const NewColorModeValueDemo = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  return (
    <Box p={4} bg={bgColor} color={textColor} borderRadius="md">
      <Text>
        Background: {bgColor}, Text: {textColor}
      </Text>
      <Text fontSize="sm" mt={2}>
        (Currently in light mode - shows light values)
      </Text>
    </Box>
  );
};

const ChakraDisclosureWithCallbackDemo = () => {
  const [openCount, setOpenCount] = useState(0);
  const [closeCount, setCloseCount] = useState(0);

  const { isOpen, onOpen, onClose, onToggle } = useChakraDisclosure({
    onOpen: () => setOpenCount((c) => c + 1),
    onClose: () => setCloseCount((c) => c + 1),
  });

  return (
    <ChakraVStack spacing={4} align="stretch">
      <ChakraHStack spacing={2}>
        <ChakraButton size="sm" onClick={onOpen} colorScheme="blue">
          Open
        </ChakraButton>
        <ChakraButton size="sm" onClick={onClose} colorScheme="red">
          Close
        </ChakraButton>
        <ChakraButton size="sm" onClick={onToggle} colorScheme="gray">
          Toggle
        </ChakraButton>
      </ChakraHStack>
      <Text>isOpen: {isOpen ? 'true' : 'false'}</Text>
      <Text>onOpen called: {openCount} times</Text>
      <Text>onClose called: {closeCount} times</Text>
    </ChakraVStack>
  );
};

const NewDisclosureWithCallbackDemo = () => {
  const [openCount, setOpenCount] = useState(0);
  const [closeCount, setCloseCount] = useState(0);

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    onOpen: () => setOpenCount((c) => c + 1),
    onClose: () => setCloseCount((c) => c + 1),
  });

  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={2}>
        <Button size="sm" onClick={onOpen} colorScheme="blue">
          Open
        </Button>
        <Button size="sm" onClick={onClose} colorScheme="red">
          Close
        </Button>
        <Button size="sm" onClick={onToggle} colorScheme="gray">
          Toggle
        </Button>
      </HStack>
      <Text>isOpen: {isOpen ? 'true' : 'false'}</Text>
      <Text>onOpen called: {openCount} times</Text>
      <Text>onClose called: {closeCount} times</Text>
    </VStack>
  );
};

const HooksComparePage = () => {
  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>Hooks Comparison</Heading>

      <CompareSection
        title="useDisclosure - Basic Usage"
        chakraVersion={<ChakraDisclosureDemo />}
        newVersion={<NewDisclosureDemo />}
      />

      <CompareSection
        title="useDisclosure - With Callbacks"
        chakraVersion={<ChakraDisclosureWithCallbackDemo />}
        newVersion={<NewDisclosureWithCallbackDemo />}
      />

      <CompareSection
        title="useDisclosure - Modal Pattern"
        chakraVersion={<ChakraDisclosureModalDemo />}
        newVersion={<NewDisclosureModalDemo />}
      />

      <CompareSection
        title="useToast - Notifications"
        chakraVersion={<ChakraToastDemo />}
        newVersion={<NewToastDemo />}
      />

      <CompareSection
        title="useColorModeValue - Theme Colors"
        chakraVersion={<ChakraColorModeValueDemo />}
        newVersion={<NewColorModeValueDemo />}
      />
    </ChakraBox>
  );
};

export default HooksComparePage;
