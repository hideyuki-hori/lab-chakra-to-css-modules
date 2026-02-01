import {
  Box as ChakraBox,
  Badge as ChakraBadge,
  SimpleGrid as ChakraSimpleGrid,
  Text,
  Heading,
  HStack as ChakraHStack,
  VStack as ChakraVStack,
} from '@chakra-ui/react';
import {
  Badge,
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

const colorSchemes = ['gray', 'blue', 'green', 'orange', 'red', 'purple', 'yellow'] as const;

const BadgeComparePage = () => {
  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>Badge Components Comparison</Heading>

      <CompareSection
        title="Badge - Subtle Variant (Default)"
        chakraVersion={
          <ChakraHStack spacing={2} wrap="wrap">
            {colorSchemes.map((color) => (
              <ChakraBadge key={color} colorScheme={color}>
                {color}
              </ChakraBadge>
            ))}
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={2} flexWrap="wrap">
            {colorSchemes.map((color) => (
              <Badge key={color} colorScheme={color}>
                {color}
              </Badge>
            ))}
          </HStack>
        }
      />

      <CompareSection
        title="Badge - Solid Variant"
        chakraVersion={
          <ChakraHStack spacing={2} wrap="wrap">
            {colorSchemes.map((color) => (
              <ChakraBadge key={color} colorScheme={color} variant="solid">
                {color}
              </ChakraBadge>
            ))}
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={2} flexWrap="wrap">
            {colorSchemes.map((color) => (
              <Badge key={color} colorScheme={color} variant="solid">
                {color}
              </Badge>
            ))}
          </HStack>
        }
      />

      <CompareSection
        title="Badge - Outline Variant"
        chakraVersion={
          <ChakraHStack spacing={2} wrap="wrap">
            {colorSchemes.map((color) => (
              <ChakraBadge key={color} colorScheme={color} variant="outline">
                {color}
              </ChakraBadge>
            ))}
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={2} flexWrap="wrap">
            {colorSchemes.map((color) => (
              <Badge key={color} colorScheme={color} variant="outline">
                {color}
              </Badge>
            ))}
          </HStack>
        }
      />

      <CompareSection
        title="Badge - All Variants for Blue"
        chakraVersion={
          <ChakraHStack spacing={4}>
            <ChakraVStack align="start">
              <Text fontSize="sm">subtle:</Text>
              <ChakraBadge colorScheme="blue" variant="subtle">Badge</ChakraBadge>
            </ChakraVStack>
            <ChakraVStack align="start">
              <Text fontSize="sm">solid:</Text>
              <ChakraBadge colorScheme="blue" variant="solid">Badge</ChakraBadge>
            </ChakraVStack>
            <ChakraVStack align="start">
              <Text fontSize="sm">outline:</Text>
              <ChakraBadge colorScheme="blue" variant="outline">Badge</ChakraBadge>
            </ChakraVStack>
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <VStack align="start">
              <span style={{ fontSize: '0.875rem' }}>subtle:</span>
              <Badge colorScheme="blue" variant="subtle">Badge</Badge>
            </VStack>
            <VStack align="start">
              <span style={{ fontSize: '0.875rem' }}>solid:</span>
              <Badge colorScheme="blue" variant="solid">Badge</Badge>
            </VStack>
            <VStack align="start">
              <span style={{ fontSize: '0.875rem' }}>outline:</span>
              <Badge colorScheme="blue" variant="outline">Badge</Badge>
            </VStack>
          </HStack>
        }
      />

      <CompareSection
        title="Badge - fontSize (xs, sm)"
        chakraVersion={
          <ChakraHStack spacing={4} align="center">
            <ChakraBadge colorScheme="blue" fontSize="xs">fontSize xs</ChakraBadge>
            <ChakraBadge colorScheme="blue" fontSize="sm">fontSize sm</ChakraBadge>
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4} align="center">
            <Badge colorScheme="blue" fontSize="xs">fontSize xs</Badge>
            <Badge colorScheme="blue" fontSize="sm">fontSize sm</Badge>
          </HStack>
        }
      />

      <CompareSection
        title="Badge - width (w='100%')"
        chakraVersion={
          <ChakraVStack spacing={2} align="stretch">
            <ChakraBadge colorScheme="green" textAlign="center" w="100%">Full Width</ChakraBadge>
            <ChakraBadge colorScheme="blue" textAlign="center">Normal</ChakraBadge>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={2} align="stretch">
            <Badge colorScheme="green" textAlign="center" w="100%">Full Width</Badge>
            <Badge colorScheme="blue" textAlign="center">Normal</Badge>
          </VStack>
        }
      />

      <CompareSection
        title="Badge - padding (px)"
        chakraVersion={
          <ChakraHStack spacing={4}>
            <ChakraBadge colorScheme="purple">Default</ChakraBadge>
            <ChakraBadge colorScheme="purple" px={4}>px=4</ChakraBadge>
            <ChakraBadge colorScheme="purple" px={6}>px=6</ChakraBadge>
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <Badge colorScheme="purple">Default</Badge>
            <Badge colorScheme="purple" px={4}>px=4</Badge>
            <Badge colorScheme="purple" px={6}>px=6</Badge>
          </HStack>
        }
      />

      <CompareSection
        title="Badge - Use Cases"
        chakraVersion={
          <ChakraVStack spacing={3} align="start">
            <ChakraHStack>
              <Text>Status:</Text>
              <ChakraBadge colorScheme="green">Active</ChakraBadge>
              <ChakraBadge colorScheme="red">Inactive</ChakraBadge>
              <ChakraBadge colorScheme="yellow">Pending</ChakraBadge>
            </ChakraHStack>
            <ChakraHStack>
              <Text>Priority:</Text>
              <ChakraBadge colorScheme="red" variant="solid">High</ChakraBadge>
              <ChakraBadge colorScheme="orange" variant="solid">Medium</ChakraBadge>
              <ChakraBadge colorScheme="gray" variant="solid">Low</ChakraBadge>
            </ChakraHStack>
            <ChakraHStack>
              <Text>Role:</Text>
              <ChakraBadge colorScheme="purple" variant="outline">Owner</ChakraBadge>
              <ChakraBadge colorScheme="blue" variant="outline">Member</ChakraBadge>
            </ChakraHStack>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={3} align="start">
            <HStack>
              <span>Status:</span>
              <Badge colorScheme="green">Active</Badge>
              <Badge colorScheme="red">Inactive</Badge>
              <Badge colorScheme="yellow">Pending</Badge>
            </HStack>
            <HStack>
              <span>Priority:</span>
              <Badge colorScheme="red" variant="solid">High</Badge>
              <Badge colorScheme="orange" variant="solid">Medium</Badge>
              <Badge colorScheme="gray" variant="solid">Low</Badge>
            </HStack>
            <HStack>
              <span>Role:</span>
              <Badge colorScheme="purple" variant="outline">Owner</Badge>
              <Badge colorScheme="blue" variant="outline">Member</Badge>
            </HStack>
          </VStack>
        }
      />
    </ChakraBox>
  );
};

export default BadgeComparePage;
