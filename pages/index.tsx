import {
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { FiFolderPlus, FiCheckSquare, FiClock, FiAlertCircle } from 'react-icons/fi';
import Layout from '../components/layout/Layout';
import { calculateStatistics, mockTasks, mockProjects } from '../lib/mockData';

export default function Home() {
  const stats = calculateStatistics();

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'red';
      case 'high':
        return 'orange';
      case 'medium':
        return 'blue';
      case 'low':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'in-progress':
        return 'blue';
      case 'todo':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'active':
        return 'blue';
      case 'planning':
        return 'gray';
      case 'on-hold':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const getProjectStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return '完了';
      case 'active':
        return '進行中';
      case 'planning':
        return '計画中';
      case 'on-hold':
        return '保留';
      default:
        return status;
    }
  };

  const getTaskStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return '完了';
      case 'in-progress':
        return '進行中';
      case 'todo':
        return '未着手';
      default:
        return status;
    }
  };

  const getTaskPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '緊急';
      case 'high':
        return '高';
      case 'medium':
        return '中';
      case 'low':
        return '低';
      default:
        return priority;
    }
  };

  const recentTasks = mockTasks
    .filter((task) => task.status === 'in-progress' || task.status === 'todo')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const recentProjects = mockProjects
    .filter((project) => project.status === 'active')
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      <VStack align="stretch" spacing={6}>
        <Box>
          <Heading size="lg" mb={2}>
            ダッシュボード
          </Heading>
          <Text color="gray.600">
            プロジェクトとタスクの概要を確認できます
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <Card>
            <CardBody>
              <Stat>
                <HStack mb={2}>
                  <Icon as={FiFolderPlus} boxSize={5} color="primary.500" />
                  <StatLabel>総プロジェクト数</StatLabel>
                </HStack>
                <StatNumber fontSize="3xl">{stats.totalProjects}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  進行中 {stats.activeProjects}件
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <HStack mb={2}>
                  <Icon as={FiCheckSquare} boxSize={5} color="accent.500" />
                  <StatLabel>総タスク数</StatLabel>
                </HStack>
                <StatNumber fontSize="3xl">{stats.totalTasks}</StatNumber>
                <StatHelpText>
                  完了 {stats.completedTasks}件
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <HStack mb={2}>
                  <Icon as={FiClock} boxSize={5} color="blue.500" />
                  <StatLabel>進行中のタスク</StatLabel>
                </HStack>
                <StatNumber fontSize="3xl">{stats.inProgressTasks}</StatNumber>
                <StatHelpText>
                  未着手 {stats.todoTasks}件
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <HStack mb={2}>
                  <Icon as={FiAlertCircle} boxSize={5} color="orange.500" />
                  <StatLabel>遅延プロジェクト</StatLabel>
                </HStack>
                <StatNumber fontSize="3xl">{stats.delayedProjects}</StatNumber>
                <StatHelpText>
                  {stats.delayedProjects > 0 ? '要対応' : '問題なし'}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          <Card>
            <CardHeader>
              <Heading size="md">最近のタスク</Heading>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" spacing={4}>
                {recentTasks.map((task) => {
                  const project = mockProjects.find((p) => p.id === task.projectId);
                  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

                  return (
                    <Box
                      key={task.id}
                      p={4}
                      borderRadius="md"
                      border="1px"
                      borderColor="gray.200"
                      _hover={{ borderColor: 'primary.300', bg: 'gray.50' }}
                      transition="all 0.2s"
                    >
                      <HStack justify="space-between" mb={2}>
                        <Text fontWeight="semibold" fontSize="sm">
                          {task.title}
                        </Text>
                        <Badge colorScheme={getTaskPriorityColor(task.priority)}>
                          {getTaskPriorityLabel(task.priority)}
                        </Badge>
                      </HStack>
                      <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
                        {task.description}
                      </Text>
                      <HStack justify="space-between" fontSize="xs">
                        <HStack spacing={2}>
                          <Badge colorScheme={getTaskStatusColor(task.status)} variant="subtle">
                            {getTaskStatusLabel(task.status)}
                          </Badge>
                          {project && (
                            <Text color="gray.500">{project.name}</Text>
                          )}
                        </HStack>
                        <HStack spacing={2}>
                          {task.assignee && (
                            <HStack spacing={1}>
                              <Avatar size="xs" name={task.assignee.name} src={task.assignee.avatar} />
                              <Text color="gray.600">{task.assignee.name}</Text>
                            </HStack>
                          )}
                          <Text color={isOverdue ? 'red.500' : 'gray.500'} fontWeight={isOverdue ? 'semibold' : 'normal'}>
                            {formatDate(task.dueDate)}
                          </Text>
                        </HStack>
                      </HStack>
                    </Box>
                  );
                })}
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">進行中のプロジェクト</Heading>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" spacing={4}>
                {recentProjects.map((project) => (
                  <Box
                    key={project.id}
                    p={4}
                    borderRadius="md"
                    border="1px"
                    borderColor="gray.200"
                    _hover={{ borderColor: 'primary.300', bg: 'gray.50' }}
                    transition="all 0.2s"
                  >
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="semibold" fontSize="sm">
                        {project.name}
                      </Text>
                      <Badge colorScheme={getProjectStatusColor(project.status)}>
                        {getProjectStatusLabel(project.status)}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
                      {project.description}
                    </Text>
                    <VStack align="stretch" spacing={2}>
                      <HStack justify="space-between" fontSize="xs">
                        <Text color="gray.500">進捗率</Text>
                        <Text fontWeight="semibold" color="primary.600">
                          {project.progress}%
                        </Text>
                      </HStack>
                      <Box h="6px" bg="gray.200" borderRadius="full" overflow="hidden">
                        <Box
                          h="full"
                          bg="primary.500"
                          w={`${project.progress}%`}
                          transition="width 0.3s"
                        />
                      </Box>
                      <HStack justify="space-between" fontSize="xs">
                        <HStack spacing={1}>
                          <Avatar size="xs" name={project.owner.name} src={project.owner.avatar} />
                          <Text color="gray.600">{project.owner.name}</Text>
                        </HStack>
                        <Text color="gray.500">
                          {formatDate(project.startDate)} - {formatDate(project.endDate)}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </Layout>
  );
}
