import {
  Box,
  Button,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  VStack,
  HStack,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { reportStats, reportDetails } from '../lib/mockData';

const MotionBox = motion(Box);

const Reports = () => {
  const toast = useToast();

  const handleExport = (format: string) => {
    toast({
      title: 'レポート生成中',
      description: `${format}形式でエクスポートしています...`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case '完了':
        return 'green';
      case '進行中':
        return 'blue';
      case '保留':
        return 'yellow';
      case '未着手':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <Layout>
      <Box p={8}>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Text fontSize="3xl" fontWeight="bold">
              レポート・分析
            </Text>
            <HStack>
              <Button
                colorScheme="green"
                onClick={() => handleExport('Excel')}
              >
                Excelエクスポート
              </Button>
              <Button colorScheme="blue" onClick={() => handleExport('PDF')}>
                PDFエクスポート
              </Button>
            </HStack>
          </HStack>

          <Tabs colorScheme="blue" variant="enclosed">
            <TabList>
              <Tab>プロジェクト別</Tab>
              <Tab>メンバー別</Tab>
              <Tab>期間別</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                    {reportStats.project.map((stat, index) => (
                      <MotionBox
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Tooltip label={stat.description}>
                          <Box
                            borderWidth="1px"
                            borderRadius="lg"
                            p={6}
                            bg="white"
                            shadow="md"
                            _hover={{ shadow: 'xl' }}
                          >
                            <Stat>
                              <StatLabel>{stat.label}</StatLabel>
                              <StatNumber>{stat.value}</StatNumber>
                              <StatHelpText>
                                <StatArrow
                                  type={
                                    stat.change > 0 ? 'increase' : 'decrease'
                                  }
                                />
                                {Math.abs(stat.change)}%
                              </StatHelpText>
                            </Stat>
                          </Box>
                        </Tooltip>
                      </MotionBox>
                    ))}
                  </SimpleGrid>

                  <Box borderWidth="1px" borderRadius="lg" p={4} bg="white">
                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                      プロジェクト詳細
                    </Text>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>プロジェクト名</Th>
                          <Th>タスク数</Th>
                          <Th>完了率</Th>
                          <Th>ステータス</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {reportDetails.project.map((project) => (
                          <Tr key={project.id}>
                            <Td>{project.name}</Td>
                            <Td>{project.taskCount}</Td>
                            <Td>{project.completion}%</Td>
                            <Td>
                              <Badge
                                colorScheme={getStatusBadgeColor(
                                  project.status
                                )}
                              >
                                {project.status}
                              </Badge>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                </VStack>
              </TabPanel>

              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                    {reportStats.member.map((stat, index) => (
                      <MotionBox
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Tooltip label={stat.description}>
                          <Box
                            borderWidth="1px"
                            borderRadius="lg"
                            p={6}
                            bg="white"
                            shadow="md"
                            _hover={{ shadow: 'xl' }}
                          >
                            <Stat>
                              <StatLabel>{stat.label}</StatLabel>
                              <StatNumber>{stat.value}</StatNumber>
                              <StatHelpText>
                                <StatArrow
                                  type={
                                    stat.change > 0 ? 'increase' : 'decrease'
                                  }
                                />
                                {Math.abs(stat.change)}%
                              </StatHelpText>
                            </Stat>
                          </Box>
                        </Tooltip>
                      </MotionBox>
                    ))}
                  </SimpleGrid>

                  <Box borderWidth="1px" borderRadius="lg" p={4} bg="white">
                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                      メンバー詳細
                    </Text>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>メンバー名</Th>
                          <Th>担当タスク</Th>
                          <Th>完了タスク</Th>
                          <Th>生産性</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {reportDetails.member.map((member) => (
                          <Tr key={member.id}>
                            <Td>{member.name}</Td>
                            <Td>{member.assignedTasks}</Td>
                            <Td>{member.completedTasks}</Td>
                            <Td>
                              <Badge
                                colorScheme={
                                  member.productivity === '高'
                                    ? 'green'
                                    : member.productivity === '中'
                                      ? 'blue'
                                      : 'yellow'
                                }
                              >
                                {member.productivity}
                              </Badge>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                </VStack>
              </TabPanel>

              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                    {reportStats.period.map((stat, index) => (
                      <MotionBox
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Tooltip label={stat.description}>
                          <Box
                            borderWidth="1px"
                            borderRadius="lg"
                            p={6}
                            bg="white"
                            shadow="md"
                            _hover={{ shadow: 'xl' }}
                          >
                            <Stat>
                              <StatLabel>{stat.label}</StatLabel>
                              <StatNumber>{stat.value}</StatNumber>
                              <StatHelpText>
                                <StatArrow
                                  type={
                                    stat.change > 0 ? 'increase' : 'decrease'
                                  }
                                />
                                {Math.abs(stat.change)}%
                              </StatHelpText>
                            </Stat>
                          </Box>
                        </Tooltip>
                      </MotionBox>
                    ))}
                  </SimpleGrid>

                  <Box borderWidth="1px" borderRadius="lg" p={4} bg="white">
                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                      期間別詳細（月次）
                    </Text>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>月</Th>
                          <Th>新規タスク</Th>
                          <Th>完了タスク</Th>
                          <Th>達成率</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {reportDetails.period.map((period) => (
                          <Tr key={period.id}>
                            <Td>{period.month}</Td>
                            <Td>{period.newTasks}</Td>
                            <Td>{period.completedTasks}</Td>
                            <Td>
                              <Badge
                                colorScheme={
                                  period.achievementRate >= 80
                                    ? 'green'
                                    : period.achievementRate >= 60
                                      ? 'blue'
                                      : 'yellow'
                                }
                              >
                                {period.achievementRate}%
                              </Badge>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </Layout>
  );
};

export default Reports;
