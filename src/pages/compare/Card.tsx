import {
  Box as ChakraBox,
  Card as ChakraCard,
  CardHeader as ChakraCardHeader,
  CardBody as ChakraCardBody,
  SimpleGrid as ChakraSimpleGrid,
  Text,
  Heading,
  VStack as ChakraVStack,
  HStack as ChakraHStack,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import {
  Card,
  CardHeader,
  CardBody,
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

const CardComparePage = () => {
  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>Card Components Comparison</Heading>

      <CompareSection
        title="Card - Default"
        chakraVersion={
          <ChakraCard>
            <ChakraCardBody>
              <Text>This is a default card.</Text>
            </ChakraCardBody>
          </ChakraCard>
        }
        newVersion={
          <Card>
            <CardBody>
              <span>This is a default card.</span>
            </CardBody>
          </Card>
        }
      />

      <CompareSection
        title="Card with Header and Body"
        chakraVersion={
          <ChakraCard>
            <ChakraCardHeader>
              <Heading size="md">Card Title</Heading>
            </ChakraCardHeader>
            <ChakraCardBody>
              <Text>Card body content goes here.</Text>
            </ChakraCardBody>
          </ChakraCard>
        }
        newVersion={
          <Card>
            <CardHeader>
              <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Card Title</span>
            </CardHeader>
            <CardBody>
              <span>Card body content goes here.</span>
            </CardBody>
          </Card>
        }
      />

      <CompareSection
        title="Card with bg prop (gray.50)"
        chakraVersion={
          <ChakraCard bg="gray.50">
            <ChakraCardBody>
              <Text>Card with gray.50 background.</Text>
            </ChakraCardBody>
          </ChakraCard>
        }
        newVersion={
          <Card bg="gray.50">
            <CardBody>
              <span>Card with gray.50 background.</span>
            </CardBody>
          </Card>
        }
      />

      <CompareSection
        title="Card with style prop (gradient)"
        chakraVersion={
          <ChakraCard style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <ChakraCardBody>
              <Text>Card with gradient background.</Text>
            </ChakraCardBody>
          </ChakraCard>
        }
        newVersion={
          <Card style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardBody>
              <span>Card with gradient background.</span>
            </CardBody>
          </Card>
        }
      />

      <CompareSection
        title="CardBody with p={0}"
        chakraVersion={
          <ChakraCard>
            <ChakraCardHeader>
              <Heading size="md">Header</Heading>
            </ChakraCardHeader>
            <ChakraCardBody p={0}>
              <ChakraBox bg="gray.100" p={4}>
                <Text>Body with p=0 (no padding)</Text>
              </ChakraBox>
            </ChakraCardBody>
          </ChakraCard>
        }
        newVersion={
          <Card>
            <CardHeader>
              <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Header</span>
            </CardHeader>
            <CardBody p={0}>
              <div style={{ background: 'var(--color-gray-100)', padding: 'calc(var(--spacing) * 4)' }}>
                <span>Body with p=0 (no padding)</span>
              </div>
            </CardBody>
          </Card>
        }
      />

      <CompareSection
        title="Card - isHoverable (existing feature)"
        chakraVersion={
          <ChakraVStack spacing={4}>
            <Text fontSize="sm" color="gray.600">Chakra UI Card does not have isHoverable prop by default</Text>
            <ChakraCard _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }} transition="all 0.2s" cursor="pointer">
              <ChakraCardBody>
                <Text>Hover over this card</Text>
              </ChakraCardBody>
            </ChakraCard>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4}>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>New Card supports isHoverable prop</span>
            <Card isHoverable>
              <CardBody>
                <span>Hover over this card</span>
              </CardBody>
            </Card>
          </VStack>
        }
      />

      <CompareSection
        title="Multiple Cards Layout"
        chakraVersion={
          <ChakraSimpleGrid columns={2} spacing={4}>
            <ChakraCard>
              <ChakraCardBody>
                <Stat>
                  <StatLabel>Total Users</StatLabel>
                  <StatNumber>1,234</StatNumber>
                </Stat>
              </ChakraCardBody>
            </ChakraCard>
            <ChakraCard>
              <ChakraCardBody>
                <Stat>
                  <StatLabel>Active Sessions</StatLabel>
                  <StatNumber>567</StatNumber>
                </Stat>
              </ChakraCardBody>
            </ChakraCard>
          </ChakraSimpleGrid>
        }
        newVersion={
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'calc(var(--spacing) * 4)' }}>
            <Card>
              <CardBody>
                <VStack align="start" spacing={1}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>Total Users</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>1,234</span>
                </VStack>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <VStack align="start" spacing={1}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>Active Sessions</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>567</span>
                </VStack>
              </CardBody>
            </Card>
          </div>
        }
      />

      <CompareSection
        title="Card with Full Content"
        chakraVersion={
          <ChakraCard>
            <ChakraCardHeader>
              <ChakraHStack justify="space-between">
                <Heading size="md">Project Status</Heading>
                <Text color="blue.500" fontSize="sm">View All</Text>
              </ChakraHStack>
            </ChakraCardHeader>
            <ChakraCardBody>
              <ChakraVStack align="stretch" spacing={3}>
                <ChakraHStack justify="space-between">
                  <Text>Task Completion</Text>
                  <Text fontWeight="bold">75%</Text>
                </ChakraHStack>
                <ChakraBox h="8px" bg="gray.200" borderRadius="full">
                  <ChakraBox h="full" w="75%" bg="blue.500" borderRadius="full" />
                </ChakraBox>
              </ChakraVStack>
            </ChakraCardBody>
          </ChakraCard>
        }
        newVersion={
          <Card>
            <CardHeader>
              <HStack justifyContent="space-between">
                <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Project Status</span>
                <span style={{ color: 'var(--color-blue-500)', fontSize: '0.875rem' }}>View All</span>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" spacing={3}>
                <HStack justifyContent="space-between">
                  <span>Task Completion</span>
                  <span style={{ fontWeight: 600 }}>75%</span>
                </HStack>
                <div style={{ height: '8px', background: 'var(--color-gray-200)', borderRadius: '9999px' }}>
                  <div style={{ height: '100%', width: '75%', background: 'var(--color-blue-500)', borderRadius: '9999px' }} />
                </div>
              </VStack>
            </CardBody>
          </Card>
        }
      />
    </ChakraBox>
  );
};

export default CardComparePage;
