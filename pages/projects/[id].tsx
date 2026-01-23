import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Avatar,
  AvatarGroup,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import {
  FiArrowLeft,
  FiEdit2,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiCalendar,
  FiTag,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { mockProjects, mockTasks, mockUsers } from '../../lib/mockData';

const MotionBox = motion(Box);

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState(0);

  const project = mockProjects.find((p) => p.id === id);
  const projectTasks = mockTasks.filter((t) => t.projectId === id);

  if (!project) {
    return (
      <Layout>
        <Box textAlign="center" py={10}>
          <Text fontSize="xl" color="gray.600">
            プロジェクトが見つかりませんでした
          </Text>
          <Button mt={4} onClick={() => router.push('/projects')}>
            プロジェクト一覧に戻る
          </Button>
        </Box>
      </Layout>
    );
  }

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

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'purple';
      case 'member':
        return 'blue';
      case 'guest':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return '管理者';
      case 'member':
        return 'メンバー';
      case 'guest':
        return 'ゲスト';
      default:
        return role;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const completedTasks = projectTasks.filter((t) => t.status === 'completed').length;
  const totalTasks = projectTasks.length;
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Layout>
      <VStack align="stretch" spacing={6}>
        <HStack justify="space-between">
          <HStack spacing={4}>
            <IconButton
              icon={<FiArrowLeft />}
              aria-label="戻る"
              variant="ghost"
              onClick={() => router.push('/projects')}
            />
            <Box>
              <HStack spacing={3} mb={2}>
                <Heading size="lg">{project.name}</Heading>
                <Badge colorScheme={getProjectStatusColor(project.status)} fontSize="sm">
                  {getProjectStatusLabel(project.status)}
                </Badge>
              </HStack>
              <Text color="gray.600">{project.description}</Text>
            </Box>
          </HStack>
          <Button leftIcon={<FiEdit2 />} colorScheme="primary">
            編集
          </Button>
        </HStack>

        <Tabs
          variant="enclosed"
          colorScheme="primary"
          index={activeTab}
          onChange={setActiveTab}
        >
          <TabList>
            <Tab>概要</Tab>
            <Tab>タスク ({projectTasks.length})</Tab>
            <Tab>メンバー ({project.members.length})</Tab>
            <Tab>設定</Tab>
          </TabList>

          <TabPanels>
            <AnimatePresence mode="wait">
              <TabPanel key={activeTab} p={0} pt={6}>
                {activeTab === 0 && (
                  <MotionBox
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <VStack align="stretch" spacing={6}>
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                        <Card>
                          <CardBody>
                            <Stat>
                              <HStack mb={2}>
                                <FiClock color="var(--chakra-colors-blue-500)" />
                                <StatLabel>進捗率</StatLabel>
                              </HStack>
                              <StatNumber fontSize="3xl">{project.progress}%</StatNumber>
                              <StatHelpText>
                                目標: {formatDate(project.endDate)}
                              </StatHelpText>
                            </Stat>
                          </CardBody>
                        </Card>

                        <Card>
                          <CardBody>
                            <Stat>
                              <HStack mb={2}>
                                <FiCheckCircle color="var(--chakra-colors-green-500)" />
                                <StatLabel>タスク完了率</StatLabel>
                              </HStack>
                              <StatNumber fontSize="3xl">{taskCompletionRate}%</StatNumber>
                              <StatHelpText>
                                {completedTasks}/{totalTasks} 完了
                              </StatHelpText>
                            </Stat>
                          </CardBody>
                        </Card>

                        <Card>
                          <CardBody>
                            <Stat>
                              <HStack mb={2}>
                                <FiUsers color="var(--chakra-colors-purple-500)" />
                                <StatLabel>チームメンバー</StatLabel>
                              </HStack>
                              <StatNumber fontSize="3xl">{project.members.length}</StatNumber>
                              <StatHelpText>
                                オーナー: {project.owner.name}
                              </StatHelpText>
                            </Stat>
                          </CardBody>
                        </Card>

                        <Card>
                          <CardBody>
                            <Stat>
                              <HStack mb={2}>
                                <FiCalendar color="var(--chakra-colors-orange-500)" />
                                <StatLabel>プロジェクト期間</StatLabel>
                              </HStack>
                              <StatNumber fontSize="2xl">
                                {Math.ceil(
                                  (project.endDate.getTime() - project.startDate.getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )}
                                日
                              </StatNumber>
                              <StatHelpText>
                                {formatDate(project.startDate)}〜
                              </StatHelpText>
                            </Stat>
                          </CardBody>
                        </Card>
                      </SimpleGrid>

                      <Card>
                        <CardHeader>
                          <Heading size="md">プロジェクト進捗</Heading>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={4}>
                            <Box>
                              <HStack justify="space-between" mb={2}>
                                <Text fontSize="sm" fontWeight="semibold">
                                  全体進捗
                                </Text>
                                <Text fontSize="sm" fontWeight="bold" color="primary.600">
                                  {project.progress}%
                                </Text>
                              </HStack>
                              <Progress
                                value={project.progress}
                                size="lg"
                                colorScheme={
                                  project.progress >= 75
                                    ? 'green'
                                    : project.progress >= 50
                                    ? 'blue'
                                    : project.progress >= 25
                                    ? 'orange'
                                    : 'red'
                                }
                                borderRadius="full"
                              />
                            </Box>

                            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                              <Box p={4} bg="gray.50" borderRadius="md">
                                <Text fontSize="sm" color="gray.600" mb={1}>
                                  開始日
                                </Text>
                                <Text fontWeight="semibold">
                                  {formatDate(project.startDate)}
                                </Text>
                              </Box>
                              <Box p={4} bg="gray.50" borderRadius="md">
                                <Text fontSize="sm" color="gray.600" mb={1}>
                                  終了予定日
                                </Text>
                                <Text fontWeight="semibold">
                                  {formatDate(project.endDate)}
                                </Text>
                              </Box>
                              <Box p={4} bg="gray.50" borderRadius="md">
                                <Text fontSize="sm" color="gray.600" mb={1}>
                                  ステータス
                                </Text>
                                <Badge
                                  colorScheme={getProjectStatusColor(project.status)}
                                  fontSize="sm"
                                >
                                  {getProjectStatusLabel(project.status)}
                                </Badge>
                              </Box>
                            </SimpleGrid>
                          </VStack>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardHeader>
                          <Heading size="md">タグ</Heading>
                        </CardHeader>
                        <CardBody>
                          <HStack spacing={2} flexWrap="wrap">
                            {project.tags.map((tag) => (
                              <Badge
                                key={tag}
                                colorScheme="primary"
                                variant="subtle"
                                px={3}
                                py={1}
                                borderRadius="full"
                              >
                                <HStack spacing={1}>
                                  <FiTag size={12} />
                                  <Text>{tag}</Text>
                                </HStack>
                              </Badge>
                            ))}
                          </HStack>
                        </CardBody>
                      </Card>
                    </VStack>
                  </MotionBox>
                )}

                {activeTab === 1 && (
                  <MotionBox
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card>
                      <CardHeader>
                        <HStack justify="space-between">
                          <Heading size="md">タスク一覧</Heading>
                          <Button leftIcon={<FiCheckCircle />} size="sm" colorScheme="primary">
                            新規タスク
                          </Button>
                        </HStack>
                      </CardHeader>
                      <CardBody p={0}>
                        <Box overflowX="auto">
                          <Table variant="simple">
                            <Thead bg="gray.50">
                              <Tr>
                                <Th width="30px">
                                  <Checkbox />
                                </Th>
                                <Th>タスク名</Th>
                                <Th>担当者</Th>
                                <Th>優先度</Th>
                                <Th>ステータス</Th>
                                <Th>期限</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {projectTasks.map((task) => (
                                <Tr key={task.id} _hover={{ bg: 'gray.50' }}>
                                  <Td>
                                    <Checkbox
                                      isChecked={task.status === 'completed'}
                                      colorScheme="primary"
                                    />
                                  </Td>
                                  <Td>
                                    <VStack align="start" spacing={1}>
                                      <Text fontWeight="semibold">{task.title}</Text>
                                      <Text fontSize="sm" color="gray.600" noOfLines={1}>
                                        {task.description}
                                      </Text>
                                    </VStack>
                                  </Td>
                                  <Td>
                                    {task.assignee ? (
                                      <HStack spacing={2}>
                                        <Avatar
                                          size="sm"
                                          name={task.assignee.name}
                                          src={task.assignee.avatar}
                                        />
                                        <Text fontSize="sm">{task.assignee.name}</Text>
                                      </HStack>
                                    ) : (
                                      <Text fontSize="sm" color="gray.400">
                                        未割り当て
                                      </Text>
                                    )}
                                  </Td>
                                  <Td>
                                    <Badge colorScheme={getTaskPriorityColor(task.priority)}>
                                      {getTaskPriorityLabel(task.priority)}
                                    </Badge>
                                  </Td>
                                  <Td>
                                    <Badge
                                      colorScheme={getTaskStatusColor(task.status)}
                                      variant="subtle"
                                    >
                                      {getTaskStatusLabel(task.status)}
                                    </Badge>
                                  </Td>
                                  <Td>
                                    <Text fontSize="sm" color="gray.600">
                                      {formatDate(task.dueDate)}
                                    </Text>
                                  </Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>

                          {projectTasks.length === 0 && (
                            <Box py={10} textAlign="center">
                              <Text color="gray.500">
                                このプロジェクトにはまだタスクがありません
                              </Text>
                            </Box>
                          )}
                        </Box>
                      </CardBody>
                    </Card>
                  </MotionBox>
                )}

                {activeTab === 2 && (
                  <MotionBox
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card>
                      <CardHeader>
                        <HStack justify="space-between">
                          <Heading size="md">プロジェクトメンバー</Heading>
                          <Button leftIcon={<FiUsers />} size="sm" colorScheme="primary">
                            メンバー追加
                          </Button>
                        </HStack>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          {project.members.map((member) => (
                            <Box
                              key={member.id}
                              p={4}
                              borderRadius="md"
                              border="1px"
                              borderColor="gray.200"
                              _hover={{ borderColor: 'primary.300', bg: 'gray.50' }}
                              transition="all 0.2s"
                            >
                              <HStack justify="space-between">
                                <HStack spacing={4}>
                                  <Avatar
                                    size="md"
                                    name={member.name}
                                    src={member.avatar}
                                  />
                                  <Box>
                                    <HStack spacing={2} mb={1}>
                                      <Text fontWeight="semibold">{member.name}</Text>
                                      <Badge colorScheme={getRoleBadgeColor(member.role)}>
                                        {getRoleLabel(member.role)}
                                      </Badge>
                                      {member.id === project.owner.id && (
                                        <Badge colorScheme="purple">オーナー</Badge>
                                      )}
                                    </HStack>
                                    <Text fontSize="sm" color="gray.600">
                                      {member.email}
                                    </Text>
                                    {member.bio && (
                                      <Text fontSize="sm" color="gray.500" mt={1}>
                                        {member.bio}
                                      </Text>
                                    )}
                                  </Box>
                                </HStack>
                                <VStack align="end" spacing={1}>
                                  <Badge
                                    colorScheme={
                                      member.status === 'active'
                                        ? 'green'
                                        : member.status === 'away'
                                        ? 'yellow'
                                        : 'gray'
                                    }
                                  >
                                    {member.status === 'active'
                                      ? 'オンライン'
                                      : member.status === 'away'
                                      ? '離席中'
                                      : 'オフライン'}
                                  </Badge>
                                  <Text fontSize="xs" color="gray.500">
                                    担当タスク:{' '}
                                    {
                                      projectTasks.filter(
                                        (t) => t.assignee?.id === member.id
                                      ).length
                                    }
                                    件
                                  </Text>
                                </VStack>
                              </HStack>
                            </Box>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>
                  </MotionBox>
                )}

                {activeTab === 3 && (
                  <MotionBox
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card>
                      <CardHeader>
                        <Heading size="md">プロジェクト設定</Heading>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={6}>
                          <FormControl>
                            <FormLabel>プロジェクト名</FormLabel>
                            <Input defaultValue={project.name} />
                          </FormControl>

                          <FormControl>
                            <FormLabel>説明</FormLabel>
                            <Textarea defaultValue={project.description} rows={4} />
                          </FormControl>

                          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            <FormControl>
                              <FormLabel>開始日</FormLabel>
                              <Input
                                type="date"
                                defaultValue={
                                  project.startDate.toISOString().split('T')[0]
                                }
                              />
                            </FormControl>

                            <FormControl>
                              <FormLabel>終了予定日</FormLabel>
                              <Input
                                type="date"
                                defaultValue={project.endDate.toISOString().split('T')[0]}
                              />
                            </FormControl>
                          </SimpleGrid>

                          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            <FormControl>
                              <FormLabel>ステータス</FormLabel>
                              <Select defaultValue={project.status}>
                                <option value="planning">計画中</option>
                                <option value="active">進行中</option>
                                <option value="on-hold">保留</option>
                                <option value="completed">完了</option>
                              </Select>
                            </FormControl>

                            <FormControl>
                              <FormLabel>進捗率 (%)</FormLabel>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                defaultValue={project.progress}
                              />
                            </FormControl>
                          </SimpleGrid>

                          <FormControl>
                            <FormLabel>タグ (カンマ区切り)</FormLabel>
                            <Input defaultValue={project.tags.join(', ')} />
                          </FormControl>

                          <HStack justify="flex-end" spacing={3}>
                            <Button variant="outline">キャンセル</Button>
                            <Button colorScheme="primary">保存</Button>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </MotionBox>
                )}
              </TabPanel>
            </AnimatePresence>
          </TabPanels>
        </Tabs>
      </VStack>
    </Layout>
  );
}
