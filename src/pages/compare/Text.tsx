import {
  Box as ChakraBox,
  Text as ChakraText,
  Heading as ChakraHeading,
  SimpleGrid as ChakraSimpleGrid,
  VStack as ChakraVStack,
} from '@chakra-ui/react';
import {
  Box,
  Text,
  Heading,
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
    <ChakraHeading size="md" mb={4}>{title}</ChakraHeading>
    <ChakraSimpleGrid columns={2} spacing={4}>
      <ChakraBox>
        <ChakraText fontWeight="bold" mb={2} color="blue.600">Chakra UI</ChakraText>
        <ChakraBox border="1px" borderColor="gray.200" p={4} borderRadius="md">
          {chakraVersion}
        </ChakraBox>
      </ChakraBox>
      <ChakraBox>
        <ChakraText fontWeight="bold" mb={2} color="green.600">New (CSS Modules)</ChakraText>
        <ChakraBox border="1px" borderColor="gray.200" p={4} borderRadius="md">
          {newVersion}
        </ChakraBox>
      </ChakraBox>
    </ChakraSimpleGrid>
  </ChakraBox>
);

const TextComparePage = () => {
  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <ChakraHeading mb={8}>Text & Heading Components Comparison</ChakraHeading>

      <ChakraHeading size="lg" mb={4}>Text Component</ChakraHeading>

      <CompareSection
        title="Text - Basic"
        chakraVersion={
          <ChakraText>This is a basic text</ChakraText>
        }
        newVersion={
          <Text>This is a basic text</Text>
        }
      />

      <CompareSection
        title="Text - Font Sizes"
        chakraVersion={
          <ChakraVStack align="start" spacing={2}>
            <ChakraText fontSize="xs">Font size xs (0.75rem)</ChakraText>
            <ChakraText fontSize="sm">Font size sm (0.875rem)</ChakraText>
            <ChakraText fontSize="md">Font size md (1rem)</ChakraText>
            <ChakraText fontSize="lg">Font size lg (1.125rem)</ChakraText>
            <ChakraText fontSize="xl">Font size xl (1.25rem)</ChakraText>
            <ChakraText fontSize="2xl">Font size 2xl (1.5rem)</ChakraText>
            <ChakraText fontSize="3xl">Font size 3xl (1.875rem)</ChakraText>
            <ChakraText fontSize="4xl">Font size 4xl (2.25rem)</ChakraText>
          </ChakraVStack>
        }
        newVersion={
          <VStack align="start" spacing={2}>
            <Text fontSize="xs">Font size xs (0.75rem)</Text>
            <Text fontSize="sm">Font size sm (0.875rem)</Text>
            <Text fontSize="md">Font size md (1rem)</Text>
            <Text fontSize="lg">Font size lg (1.125rem)</Text>
            <Text fontSize="xl">Font size xl (1.25rem)</Text>
            <Text fontSize="2xl">Font size 2xl (1.5rem)</Text>
            <Text fontSize="3xl">Font size 3xl (1.875rem)</Text>
            <Text fontSize="4xl">Font size 4xl (2.25rem)</Text>
          </VStack>
        }
      />

      <CompareSection
        title="Text - Font Weights"
        chakraVersion={
          <ChakraVStack align="start" spacing={2}>
            <ChakraText fontWeight="normal">Normal weight (400)</ChakraText>
            <ChakraText fontWeight="medium">Medium weight (500)</ChakraText>
            <ChakraText fontWeight="semibold">Semibold weight (600)</ChakraText>
            <ChakraText fontWeight="bold">Bold weight (700)</ChakraText>
          </ChakraVStack>
        }
        newVersion={
          <VStack align="start" spacing={2}>
            <Text fontWeight="normal">Normal weight (400)</Text>
            <Text fontWeight="medium">Medium weight (500)</Text>
            <Text fontWeight="semibold">Semibold weight (600)</Text>
            <Text fontWeight="bold">Bold weight (700)</Text>
          </VStack>
        }
      />

      <CompareSection
        title="Text - Colors"
        chakraVersion={
          <ChakraVStack align="start" spacing={2}>
            <ChakraText color="gray.600">Gray 600</ChakraText>
            <ChakraText color="gray.500">Gray 500</ChakraText>
            <ChakraText color="blue.600">Blue 600</ChakraText>
            <ChakraText color="green.600">Green 600</ChakraText>
            <ChakraText color="red.500">Red 500</ChakraText>
            <ChakraText color="primary.600">Primary 600</ChakraText>
          </ChakraVStack>
        }
        newVersion={
          <VStack align="start" spacing={2}>
            <Text color="gray.600">Gray 600</Text>
            <Text color="gray.500">Gray 500</Text>
            <Text color="blue.600">Blue 600</Text>
            <Text color="green.600">Green 600</Text>
            <Text color="red.500">Red 500</Text>
            <Text color="primary.600">Primary 600</Text>
          </VStack>
        }
      />

      <CompareSection
        title="Text - noOfLines (Text Truncation)"
        chakraVersion={
          <ChakraVStack align="start" spacing={4}>
            <ChakraBox maxW="300px">
              <ChakraText noOfLines={1}>
                This is a very long text that should be truncated after one line because we set noOfLines to 1.
              </ChakraText>
            </ChakraBox>
            <ChakraBox maxW="300px">
              <ChakraText noOfLines={2}>
                This is a very long text that should be truncated after two lines. It contains multiple sentences to demonstrate how the text truncation works with more content than can fit in the specified number of lines.
              </ChakraText>
            </ChakraBox>
          </ChakraVStack>
        }
        newVersion={
          <VStack align="start" spacing={4}>
            <Box maxW="300px">
              <Text noOfLines={1}>
                This is a very long text that should be truncated after one line because we set noOfLines to 1.
              </Text>
            </Box>
            <Box maxW="300px">
              <Text noOfLines={2}>
                This is a very long text that should be truncated after two lines. It contains multiple sentences to demonstrate how the text truncation works with more content than can fit in the specified number of lines.
              </Text>
            </Box>
          </VStack>
        }
      />

      <CompareSection
        title="Text - Text Align"
        chakraVersion={
          <ChakraVStack align="stretch" spacing={2}>
            <ChakraText textAlign="left">Left aligned text</ChakraText>
            <ChakraText textAlign="center">Center aligned text</ChakraText>
            <ChakraText textAlign="right">Right aligned text</ChakraText>
          </ChakraVStack>
        }
        newVersion={
          <VStack align="stretch" spacing={2}>
            <Text textAlign="left">Left aligned text</Text>
            <Text textAlign="center">Center aligned text</Text>
            <Text textAlign="right">Right aligned text</Text>
          </VStack>
        }
      />

      <CompareSection
        title="Text - With Margin"
        chakraVersion={
          <ChakraBox>
            <ChakraText mb={4}>Text with margin bottom 4</ChakraText>
            <ChakraText mt={2}>Text with margin top 2</ChakraText>
          </ChakraBox>
        }
        newVersion={
          <Box>
            <Text mb={4}>Text with margin bottom 4</Text>
            <Text mt={2}>Text with margin top 2</Text>
          </Box>
        }
      />

      <ChakraHeading size="lg" mb={4} mt={8}>Heading Component</ChakraHeading>

      <CompareSection
        title="Heading - Sizes"
        chakraVersion={
          <ChakraVStack align="start" spacing={2}>
            <ChakraHeading size="4xl">Heading 4xl</ChakraHeading>
            <ChakraHeading size="3xl">Heading 3xl</ChakraHeading>
            <ChakraHeading size="2xl">Heading 2xl</ChakraHeading>
            <ChakraHeading size="xl">Heading xl</ChakraHeading>
            <ChakraHeading size="lg">Heading lg</ChakraHeading>
            <ChakraHeading size="md">Heading md</ChakraHeading>
            <ChakraHeading size="sm">Heading sm</ChakraHeading>
            <ChakraHeading size="xs">Heading xs</ChakraHeading>
          </ChakraVStack>
        }
        newVersion={
          <VStack align="start" spacing={2}>
            <Heading size="4xl">Heading 4xl</Heading>
            <Heading size="3xl">Heading 3xl</Heading>
            <Heading size="2xl">Heading 2xl</Heading>
            <Heading size="xl">Heading xl</Heading>
            <Heading size="lg">Heading lg</Heading>
            <Heading size="md">Heading md</Heading>
            <Heading size="sm">Heading sm</Heading>
            <Heading size="xs">Heading xs</Heading>
          </VStack>
        }
      />

      <CompareSection
        title="Heading - Colors"
        chakraVersion={
          <ChakraVStack align="start" spacing={2}>
            <ChakraHeading size="lg" color="primary.600">Primary 600 Heading</ChakraHeading>
            <ChakraHeading size="lg" color="gray.600">Gray 600 Heading</ChakraHeading>
            <ChakraHeading size="lg" color="blue.600">Blue 600 Heading</ChakraHeading>
          </ChakraVStack>
        }
        newVersion={
          <VStack align="start" spacing={2}>
            <Heading size="lg" color="primary.600">Primary 600 Heading</Heading>
            <Heading size="lg" color="gray.600">Gray 600 Heading</Heading>
            <Heading size="lg" color="blue.600">Blue 600 Heading</Heading>
          </VStack>
        }
      />

      <CompareSection
        title="Heading - With Margin"
        chakraVersion={
          <ChakraBox>
            <ChakraHeading size="lg" mb={4}>Heading with mb={4}</ChakraHeading>
            <ChakraText>Some text below</ChakraText>
            <ChakraHeading size="md" mb={2} mt={4}>Heading with mb={2} mt={4}</ChakraHeading>
            <ChakraText>More text below</ChakraText>
          </ChakraBox>
        }
        newVersion={
          <Box>
            <Heading size="lg" mb={4}>Heading with mb={4}</Heading>
            <Text>Some text below</Text>
            <Heading size="md" mb={2} mt={4}>Heading with mb={2} mt={4}</Heading>
            <Text>More text below</Text>
          </Box>
        }
      />

      <CompareSection
        title="Heading - Custom Tag (as prop)"
        chakraVersion={
          <ChakraVStack align="start" spacing={2}>
            <ChakraHeading as="h1" size="lg">H1 element with size lg</ChakraHeading>
            <ChakraHeading as="h2" size="md">H2 element with size md</ChakraHeading>
            <ChakraHeading as="h3" size="sm">H3 element with size sm</ChakraHeading>
          </ChakraVStack>
        }
        newVersion={
          <VStack align="start" spacing={2}>
            <Heading as="h1" size="lg">H1 element with size lg</Heading>
            <Heading as="h2" size="md">H2 element with size md</Heading>
            <Heading as="h3" size="sm">H3 element with size sm</Heading>
          </VStack>
        }
      />

      <CompareSection
        title="Combined - Typical Page Layout"
        chakraVersion={
          <ChakraBox>
            <ChakraHeading size="xl" mb={4}>Page Title</ChakraHeading>
            <ChakraText fontSize="lg" color="gray.600" mb={6}>
              This is a subtitle or description text that provides more context about the page.
            </ChakraText>
            <ChakraHeading size="md" mb={2}>Section Heading</ChakraHeading>
            <ChakraText color="gray.700" mb={4}>
              Regular paragraph text with default styling. This demonstrates how text components work together.
            </ChakraText>
            <ChakraText fontSize="sm" color="gray.500">
              Small helper text or caption
            </ChakraText>
          </ChakraBox>
        }
        newVersion={
          <Box>
            <Heading size="xl" mb={4}>Page Title</Heading>
            <Text fontSize="lg" color="gray.600" mb={6}>
              This is a subtitle or description text that provides more context about the page.
            </Text>
            <Heading size="md" mb={2}>Section Heading</Heading>
            <Text color="gray.700" mb={4}>
              Regular paragraph text with default styling. This demonstrates how text components work together.
            </Text>
            <Text fontSize="sm" color="gray.500">
              Small helper text or caption
            </Text>
          </Box>
        }
      />
    </ChakraBox>
  );
};

export default TextComparePage;
