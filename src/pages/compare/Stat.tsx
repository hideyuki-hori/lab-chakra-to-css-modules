import {
  Box as ChakraBox,
  Stat as ChakraStat,
  StatLabel as ChakraStatLabel,
  StatNumber as ChakraStatNumber,
  StatHelpText as ChakraStatHelpText,
  StatArrow as ChakraStatArrow,
  SimpleGrid as ChakraSimpleGrid,
  Text,
  Heading,
  VStack as ChakraVStack,
  Card as ChakraCard,
  CardBody as ChakraCardBody,
} from '@chakra-ui/react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  VStack,
  Card,
  CardBody,
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

const StatComparePage = () => {
  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>Stat Components Comparison</Heading>

      <CompareSection
        title="Stat - Basic"
        chakraVersion={
          <ChakraStat>
            <ChakraStatLabel>Total Users</ChakraStatLabel>
            <ChakraStatNumber>1,234</ChakraStatNumber>
          </ChakraStat>
        }
        newVersion={
          <Stat>
            <StatLabel>Total Users</StatLabel>
            <StatNumber>1,234</StatNumber>
          </Stat>
        }
      />

      <CompareSection
        title="Stat - With HelpText"
        chakraVersion={
          <ChakraStat>
            <ChakraStatLabel>Monthly Revenue</ChakraStatLabel>
            <ChakraStatNumber>$12,345</ChakraStatNumber>
            <ChakraStatHelpText>Feb 1 - Feb 28</ChakraStatHelpText>
          </ChakraStat>
        }
        newVersion={
          <Stat>
            <StatLabel>Monthly Revenue</StatLabel>
            <StatNumber>$12,345</StatNumber>
            <StatHelpText>Feb 1 - Feb 28</StatHelpText>
          </Stat>
        }
      />

      <CompareSection
        title="Stat - Increase Arrow"
        chakraVersion={
          <ChakraStat>
            <ChakraStatLabel>Total Sales</ChakraStatLabel>
            <ChakraStatNumber>$45,670</ChakraStatNumber>
            <ChakraStatHelpText>
              <ChakraStatArrow type="increase" />
              23.36%
            </ChakraStatHelpText>
          </ChakraStat>
        }
        newVersion={
          <Stat>
            <StatLabel>Total Sales</StatLabel>
            <StatNumber>$45,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        }
      />

      <CompareSection
        title="Stat - Decrease Arrow"
        chakraVersion={
          <ChakraStat>
            <ChakraStatLabel>Bounce Rate</ChakraStatLabel>
            <ChakraStatNumber>32.5%</ChakraStatNumber>
            <ChakraStatHelpText>
              <ChakraStatArrow type="decrease" />
              9.05%
            </ChakraStatHelpText>
          </ChakraStat>
        }
        newVersion={
          <Stat>
            <StatLabel>Bounce Rate</StatLabel>
            <StatNumber>32.5%</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
        }
      />

      <CompareSection
        title="Multiple Stats (Dashboard Style)"
        chakraVersion={
          <ChakraSimpleGrid columns={3} spacing={4}>
            <ChakraCard>
              <ChakraCardBody>
                <ChakraStat>
                  <ChakraStatLabel>Total Users</ChakraStatLabel>
                  <ChakraStatNumber>1,234</ChakraStatNumber>
                  <ChakraStatHelpText>
                    <ChakraStatArrow type="increase" />
                    12%
                  </ChakraStatHelpText>
                </ChakraStat>
              </ChakraCardBody>
            </ChakraCard>
            <ChakraCard>
              <ChakraCardBody>
                <ChakraStat>
                  <ChakraStatLabel>Revenue</ChakraStatLabel>
                  <ChakraStatNumber>$56,789</ChakraStatNumber>
                  <ChakraStatHelpText>
                    <ChakraStatArrow type="increase" />
                    8.2%
                  </ChakraStatHelpText>
                </ChakraStat>
              </ChakraCardBody>
            </ChakraCard>
            <ChakraCard>
              <ChakraCardBody>
                <ChakraStat>
                  <ChakraStatLabel>Churn Rate</ChakraStatLabel>
                  <ChakraStatNumber>2.4%</ChakraStatNumber>
                  <ChakraStatHelpText>
                    <ChakraStatArrow type="decrease" />
                    0.5%
                  </ChakraStatHelpText>
                </ChakraStat>
              </ChakraCardBody>
            </ChakraCard>
          </ChakraSimpleGrid>
        }
        newVersion={
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'calc(var(--spacing) * 4)' }}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Total Users</StatLabel>
                  <StatNumber>1,234</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    12%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Revenue</StatLabel>
                  <StatNumber>$56,789</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    8.2%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Churn Rate</StatLabel>
                  <StatNumber>2.4%</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    0.5%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </div>
        }
      />

      <CompareSection
        title="Stat - Japanese Content"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraStat>
              <ChakraStatLabel>総売上</ChakraStatLabel>
              <ChakraStatNumber>¥1,234,567</ChakraStatNumber>
              <ChakraStatHelpText>
                <ChakraStatArrow type="increase" />
                前月比 15.2%
              </ChakraStatHelpText>
            </ChakraStat>
            <ChakraStat>
              <ChakraStatLabel>新規会員数</ChakraStatLabel>
              <ChakraStatNumber>256</ChakraStatNumber>
              <ChakraStatHelpText>
                <ChakraStatArrow type="decrease" />
                前週比 3.1%
              </ChakraStatHelpText>
            </ChakraStat>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Stat>
              <StatLabel>総売上</StatLabel>
              <StatNumber>¥1,234,567</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                前月比 15.2%
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>新規会員数</StatLabel>
              <StatNumber>256</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                前週比 3.1%
              </StatHelpText>
            </Stat>
          </VStack>
        }
      />
    </ChakraBox>
  );
};

export default StatComparePage;
