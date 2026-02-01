import {
  Box,
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
} from '@/src/components/ui';
import { FiFolderPlus, FiCheckSquare, FiClock, FiAlertCircle } from 'react-icons/fi';
import Layout from '../components/layout/Layout';
import { calculateStatistics, mockTasks, mockProjects } from '../lib/mockData';
import styles from '../styles/pages/dashboard.module.css';

export default function Home() {
  const stats = calculateStatistics();

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'red';
      case 'high':
        return 'yellow';
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
        return 'yellow';
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
          <Heading size="lg" style={{ marginBottom: 'var(--spacing-2)' }}>
            ダッシュボード
          </Heading>
          <Text color="var(--color-gray-600)">
            プロジェクトとタスクの概要を確認できます
          </Text>
        </Box>

        <div className={styles.statsGrid}>
          <Card className={styles.gradientCard}>
            <CardBody>
              <Stat>
                <HStack spacing={2} style={{ marginBottom: 'var(--spacing-2)' }}>
                  <FiFolderPlus size={20} className={styles.gradientIcon} />
                  <StatLabel className={styles.gradientLabel}>総プロジェクト数</StatLabel>
                </HStack>
                <StatNumber className={styles.gradientNumber} style={{ fontSize: 'var(--font-size-3xl)' }}>
                  {stats.totalProjects}
                </StatNumber>
                <StatHelpText className={styles.gradientHelpText}>
                  <StatArrow type="increase" />
                  進行中 {stats.activeProjects}件
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <HStack spacing={2} style={{ marginBottom: 'var(--spacing-2)' }}>
                  <FiCheckSquare size={20} style={{ color: 'var(--color-accent-500)' }} />
                  <StatLabel>総タスク数</StatLabel>
                </HStack>
                <StatNumber style={{ fontSize: 'var(--font-size-3xl)' }}>
                  {stats.totalTasks}
                </StatNumber>
                <StatHelpText>
                  完了 {stats.completedTasks}件
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <HStack spacing={2} style={{ marginBottom: 'var(--spacing-2)' }}>
                  <FiClock size={20} style={{ color: 'var(--color-blue-500)' }} />
                  <StatLabel>進行中のタスク</StatLabel>
                </HStack>
                <StatNumber style={{ fontSize: 'var(--font-size-3xl)' }}>
                  {stats.inProgressTasks}
                </StatNumber>
                <StatHelpText>
                  未着手 {stats.todoTasks}件
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <HStack spacing={2} style={{ marginBottom: 'var(--spacing-2)' }}>
                  <FiAlertCircle size={20} style={{ color: 'var(--color-yellow-500)' }} />
                  <StatLabel>遅延プロジェクト</StatLabel>
                </HStack>
                <StatNumber style={{ fontSize: 'var(--font-size-3xl)' }}>
                  {stats.delayedProjects}
                </StatNumber>
                <StatHelpText>
                  {stats.delayedProjects > 0 ? '要対応' : '問題なし'}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </div>

        <div className={styles.contentGrid}>
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
                    <div key={task.id} className={styles.taskItem}>
                      <HStack style={{ justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
                        <Text fontWeight="semibold" fontSize="sm">
                          {task.title}
                        </Text>
                        <Badge colorScheme={getTaskPriorityColor(task.priority)}>
                          {getTaskPriorityLabel(task.priority)}
                        </Badge>
                      </HStack>
                      <Text fontSize="sm" color="var(--color-gray-600)" noOfLines={2} style={{ marginBottom: 'var(--spacing-3)' }}>
                        {task.description}
                      </Text>
                      <HStack style={{ justifyContent: 'space-between', fontSize: 'var(--font-size-xs)' }}>
                        <HStack spacing={2}>
                          <Badge colorScheme={getTaskStatusColor(task.status)} variant="subtle">
                            {getTaskStatusLabel(task.status)}
                          </Badge>
                          {project && (
                            <Text as="span" color="var(--color-gray-500)">{project.name}</Text>
                          )}
                        </HStack>
                        <HStack spacing={2}>
                          {task.assignee && (
                            <HStack spacing={1}>
                              <Avatar size="xs" name={task.assignee.name} src={task.assignee.avatar} />
                              <Text as="span" color="var(--color-gray-600)">{task.assignee.name}</Text>
                            </HStack>
                          )}
                          <Text
                            as="span"
                            color={isOverdue ? 'var(--color-red-500)' : 'var(--color-gray-500)'}
                            fontWeight={isOverdue ? 'semibold' : 'normal'}
                          >
                            {formatDate(task.dueDate)}
                          </Text>
                        </HStack>
                      </HStack>
                    </div>
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
                  <div key={project.id} className={styles.projectItem}>
                    <HStack style={{ justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
                      <Text fontWeight="semibold" fontSize="sm">
                        {project.name}
                      </Text>
                      <Badge colorScheme={getProjectStatusColor(project.status)}>
                        {getProjectStatusLabel(project.status)}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="var(--color-gray-600)" noOfLines={2} style={{ marginBottom: 'var(--spacing-3)' }}>
                      {project.description}
                    </Text>
                    <VStack align="stretch" spacing={2}>
                      <HStack style={{ justifyContent: 'space-between', fontSize: 'var(--font-size-xs)' }}>
                        <Text as="span" color="var(--color-gray-500)">進捗率</Text>
                        <Text as="span" fontWeight="semibold" color="var(--color-primary-600)">
                          {project.progress}%
                        </Text>
                      </HStack>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <HStack style={{ justifyContent: 'space-between', fontSize: 'var(--font-size-xs)' }}>
                        <HStack spacing={1}>
                          <Avatar size="xs" name={project.owner.name} src={project.owner.avatar} />
                          <Text as="span" color="var(--color-gray-600)">{project.owner.name}</Text>
                        </HStack>
                        <Text as="span" color="var(--color-gray-500)">
                          {formatDate(project.startDate)} - {formatDate(project.endDate)}
                        </Text>
                      </HStack>
                    </VStack>
                  </div>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </div>
      </VStack>
    </Layout>
  );
}
