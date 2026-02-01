import {
  Box as ChakraBox,
  Flex as ChakraFlex,
  VStack as ChakraVStack,
  HStack as ChakraHStack,
  SimpleGrid as ChakraSimpleGrid,
  Center as ChakraCenter,
  Stack as ChakraStack,
  Wrap as ChakraWrap,
  WrapItem as ChakraWrapItem,
  Text,
  Heading,
} from '@chakra-ui/react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
  Center,
  Stack,
  Wrap,
  WrapItem,
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

const LayoutComparePage = () => {
  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>Layout Components Comparison</Heading>

      <CompareSection
        title="Box - Basic"
        chakraVersion={
          <ChakraBox p={4} bg="blue.100" borderRadius="lg">
            Box with padding, background and border radius
          </ChakraBox>
        }
        newVersion={
          <Box p={4} bg="blue.100" borderRadius="lg">
            Box with padding, background and border radius
          </Box>
        }
      />

      <CompareSection
        title="Box - With Border"
        chakraVersion={
          <ChakraBox p={4} bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="md" boxShadow="sm">
            Box with border and shadow
          </ChakraBox>
        }
        newVersion={
          <Box p={4} bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="md" boxShadow="sm">
            Box with border and shadow
          </Box>
        }
      />

      <CompareSection
        title="Flex - Basic"
        chakraVersion={
          <ChakraFlex gap={4} align="center" justify="space-between">
            <ChakraBox bg="red.200" p={2}>Item 1</ChakraBox>
            <ChakraBox bg="green.200" p={2}>Item 2</ChakraBox>
            <ChakraBox bg="blue.200" p={2}>Item 3</ChakraBox>
          </ChakraFlex>
        }
        newVersion={
          <Flex gap={4} align="center" justify="space-between">
            <Box bg="red.200" p={2}>Item 1</Box>
            <Box bg="green.200" p={2}>Item 2</Box>
            <Box bg="blue.200" p={2}>Item 3</Box>
          </Flex>
        }
      />

      <CompareSection
        title="VStack"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraBox bg="purple.200" p={2}>Item 1</ChakraBox>
            <ChakraBox bg="purple.300" p={2}>Item 2</ChakraBox>
            <ChakraBox bg="purple.400" p={2}>Item 3</ChakraBox>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Box bg="purple.200" p={2}>Item 1</Box>
            <Box bg="purple.300" p={2}>Item 2</Box>
            <Box bg="purple.400" p={2}>Item 3</Box>
          </VStack>
        }
      />

      <CompareSection
        title="HStack"
        chakraVersion={
          <ChakraHStack spacing={4}>
            <ChakraBox bg="orange.200" p={2}>Item 1</ChakraBox>
            <ChakraBox bg="orange.300" p={2}>Item 2</ChakraBox>
            <ChakraBox bg="orange.400" p={2}>Item 3</ChakraBox>
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <Box bg="orange.200" p={2}>Item 1</Box>
            <Box bg="orange.300" p={2}>Item 2</Box>
            <Box bg="orange.400" p={2}>Item 3</Box>
          </HStack>
        }
      />

      <CompareSection
        title="Stack - Row Direction"
        chakraVersion={
          <ChakraStack direction="row" spacing={4}>
            <ChakraBox bg="teal.200" p={2}>Item 1</ChakraBox>
            <ChakraBox bg="teal.300" p={2}>Item 2</ChakraBox>
            <ChakraBox bg="teal.400" p={2}>Item 3</ChakraBox>
          </ChakraStack>
        }
        newVersion={
          <Stack direction="row" spacing={4}>
            <Box bg="teal.200" p={2}>Item 1</Box>
            <Box bg="teal.300" p={2}>Item 2</Box>
            <Box bg="teal.400" p={2}>Item 3</Box>
          </Stack>
        }
      />

      <CompareSection
        title="Stack - Column Direction"
        chakraVersion={
          <ChakraStack direction="column" spacing={4}>
            <ChakraBox bg="cyan.200" p={2}>Item 1</ChakraBox>
            <ChakraBox bg="cyan.300" p={2}>Item 2</ChakraBox>
            <ChakraBox bg="cyan.400" p={2}>Item 3</ChakraBox>
          </ChakraStack>
        }
        newVersion={
          <Stack direction="column" spacing={4}>
            <Box bg="cyan.200" p={2}>Item 1</Box>
            <Box bg="cyan.300" p={2}>Item 2</Box>
            <Box bg="cyan.400" p={2}>Item 3</Box>
          </Stack>
        }
      />

      <CompareSection
        title="Center"
        chakraVersion={
          <ChakraCenter h="100px" bg="gray.100">
            Centered content
          </ChakraCenter>
        }
        newVersion={
          <Center h="100px" bg="gray.100">
            Centered content
          </Center>
        }
      />

      <CompareSection
        title="SimpleGrid - Fixed Columns"
        chakraVersion={
          <ChakraSimpleGrid columns={3} spacing={4}>
            <ChakraBox bg="pink.200" p={2}>1</ChakraBox>
            <ChakraBox bg="pink.200" p={2}>2</ChakraBox>
            <ChakraBox bg="pink.200" p={2}>3</ChakraBox>
            <ChakraBox bg="pink.200" p={2}>4</ChakraBox>
            <ChakraBox bg="pink.200" p={2}>5</ChakraBox>
            <ChakraBox bg="pink.200" p={2}>6</ChakraBox>
          </ChakraSimpleGrid>
        }
        newVersion={
          <SimpleGrid columns={3} spacing={4}>
            <Box bg="pink.200" p={2}>1</Box>
            <Box bg="pink.200" p={2}>2</Box>
            <Box bg="pink.200" p={2}>3</Box>
            <Box bg="pink.200" p={2}>4</Box>
            <Box bg="pink.200" p={2}>5</Box>
            <Box bg="pink.200" p={2}>6</Box>
          </SimpleGrid>
        }
      />

      <CompareSection
        title="SimpleGrid - Responsive Columns"
        chakraVersion={
          <ChakraSimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
            <ChakraBox bg="yellow.200" p={2}>1</ChakraBox>
            <ChakraBox bg="yellow.200" p={2}>2</ChakraBox>
            <ChakraBox bg="yellow.200" p={2}>3</ChakraBox>
            <ChakraBox bg="yellow.200" p={2}>4</ChakraBox>
          </ChakraSimpleGrid>
        }
        newVersion={
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
            <Box bg="yellow.200" p={2}>1</Box>
            <Box bg="yellow.200" p={2}>2</Box>
            <Box bg="yellow.200" p={2}>3</Box>
            <Box bg="yellow.200" p={2}>4</Box>
          </SimpleGrid>
        }
      />

      <CompareSection
        title="Wrap"
        chakraVersion={
          <ChakraWrap spacing={4}>
            <ChakraWrapItem>
              <ChakraBox bg="red.200" p={2}>Tag 1</ChakraBox>
            </ChakraWrapItem>
            <ChakraWrapItem>
              <ChakraBox bg="green.200" p={2}>Tag 2</ChakraBox>
            </ChakraWrapItem>
            <ChakraWrapItem>
              <ChakraBox bg="blue.200" p={2}>Tag 3</ChakraBox>
            </ChakraWrapItem>
            <ChakraWrapItem>
              <ChakraBox bg="purple.200" p={2}>Tag 4</ChakraBox>
            </ChakraWrapItem>
            <ChakraWrapItem>
              <ChakraBox bg="orange.200" p={2}>Tag 5</ChakraBox>
            </ChakraWrapItem>
          </ChakraWrap>
        }
        newVersion={
          <Wrap spacing={4}>
            <WrapItem>
              <Box bg="red.200" p={2}>Tag 1</Box>
            </WrapItem>
            <WrapItem>
              <Box bg="green.200" p={2}>Tag 2</Box>
            </WrapItem>
            <WrapItem>
              <Box bg="blue.200" p={2}>Tag 3</Box>
            </WrapItem>
            <WrapItem>
              <Box bg="purple.200" p={2}>Tag 4</Box>
            </WrapItem>
            <WrapItem>
              <Box bg="orange.200" p={2}>Tag 5</Box>
            </WrapItem>
          </Wrap>
        }
      />

      <CompareSection
        title="Complex Layout"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraHStack justify="space-between" p={4} bg="gray.50" borderRadius="lg">
              <ChakraBox>Header Left</ChakraBox>
              <ChakraHStack spacing={2}>
                <ChakraBox bg="blue.400" color="white" px={3} py={1} borderRadius="md">Button 1</ChakraBox>
                <ChakraBox bg="green.400" color="white" px={3} py={1} borderRadius="md">Button 2</ChakraBox>
              </ChakraHStack>
            </ChakraHStack>
            <ChakraSimpleGrid columns={3} spacing={4}>
              <ChakraBox p={4} bg="white" borderWidth="1px" borderRadius="md">Card 1</ChakraBox>
              <ChakraBox p={4} bg="white" borderWidth="1px" borderRadius="md">Card 2</ChakraBox>
              <ChakraBox p={4} bg="white" borderWidth="1px" borderRadius="md">Card 3</ChakraBox>
            </ChakraSimpleGrid>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between" p={4} bg="gray.50" borderRadius="lg">
              <Box>Header Left</Box>
              <HStack spacing={2}>
                <Box bg="blue.400" color="white" px={3} py={1} borderRadius="md">Button 1</Box>
                <Box bg="green.400" color="white" px={3} py={1} borderRadius="md">Button 2</Box>
              </HStack>
            </HStack>
            <SimpleGrid columns={3} spacing={4}>
              <Box p={4} bg="white" borderWidth="1px" borderRadius="md">Card 1</Box>
              <Box p={4} bg="white" borderWidth="1px" borderRadius="md">Card 2</Box>
              <Box p={4} bg="white" borderWidth="1px" borderRadius="md">Card 3</Box>
            </SimpleGrid>
          </VStack>
        }
      />
    </ChakraBox>
  );
};

export default LayoutComparePage;
