import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Avatar,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Checkbox,
  Select,
  Flex,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiFilter,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { mockTasks, mockProjects } from '../../lib/mockData';

const MotionTr = motion(Tr);
const MotionBox = motion(Box);

export default function TasksPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProject, setFilterProject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());

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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleCheckboxChange = (taskId: string) => {
    setCheckedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.assignee && task.assignee.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesProject = filterProject === 'all' || task.projectId === filterProject;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;

    return matchesSearch && matchesProject && matchesStatus && matchesPriority;
  });

  return (
    <Layout>
      <VStack align="stretch" spacing={6}>
        <Box>
          <Heading size="lg" mb={2}>
            タスク一覧
          </Heading>
          <Text color="gray.600">すべてのタスクを管理できます</Text>
        </Box>

        <Flex gap={4} flexWrap="wrap" align="center">
          <InputGroup maxW="400px" flex="1" minW="200px">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray" />
            </InputLeftElement>
            <Input
              placeholder="タスクを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="white"
            />
          </InputGroup>

          <HStack spacing={3} flex="1" flexWrap="wrap">
            <HStack spacing={2}>
              <FiFilter />
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                フィルター:
              </Text>
            </HStack>
            <Select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              bg="white"
              maxW="200px"
              size="md"
            >
              <option value="all">すべてのプロジェクト</option>
              {mockProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </Select>

            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              bg="white"
              maxW="150px"
              size="md"
            >
              <option value="all">すべてのステータス</option>
              <option value="todo">未着手</option>
              <option value="in-progress">進行中</option>
              <option value="completed">完了</option>
            </Select>

            <Select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              bg="white"
              maxW="150px"
              size="md"
            >
              <option value="all">すべての優先度</option>
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
              <option value="urgent">緊急</option>
            </Select>
          </HStack>

          <Button
            leftIcon={<FiPlus />}
            colorScheme="primary"
            onClick={() => router.push('/tasks/new')}
          >
            新規タスク
          </Button>
        </Flex>

        <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th width="50px">完了</Th>
                <Th>タスク名</Th>
                <Th>プロジェクト</Th>
                <Th>担当者</Th>
                <Th>優先度</Th>
                <Th>ステータス</Th>
                <Th>期限</Th>
                <Th width="50px">操作</Th>
              </Tr>
            </Thead>
            <Tbody>
              <AnimatePresence mode="popLayout">
                {filteredTasks.map((task) => {
                  const project = mockProjects.find((p) => p.id === task.projectId);
                  const isOverdue =
                    new Date(task.dueDate) < new Date() && task.status !== 'completed';
                  const isChecked = checkedTasks.has(task.id);

                  return (
                    <MotionTr
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100, height: 0 }}
                      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                      transition={{ duration: 0.2 }}
                      cursor="pointer"
                    >
                      <Td onClick={(e) => e.stopPropagation()}>
                        <MotionBox
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.1 }}
                        >
                          <Checkbox
                            isChecked={isChecked}
                            onChange={() => handleCheckboxChange(task.id)}
                            colorScheme="primary"
                          />
                        </MotionBox>
                      </Td>
                      <Td onClick={() => router.push(`/tasks/${task.id}/edit`)}>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold">{task.title}</Text>
                          <Text fontSize="sm" color="gray.600" noOfLines={1}>
                            {task.description}
                          </Text>
                        </VStack>
                      </Td>
                      <Td onClick={() => router.push(`/tasks/${task.id}/edit`)}>
                        {project && (
                          <Text fontSize="sm" color="gray.600">
                            {project.name}
                          </Text>
                        )}
                      </Td>
                      <Td onClick={() => router.push(`/tasks/${task.id}/edit`)}>
                        {task.assignee && (
                          <HStack spacing={2}>
                            <Avatar
                              size="sm"
                              name={task.assignee.name}
                              src={task.assignee.avatar}
                            />
                            <Text fontSize="sm">{task.assignee.name}</Text>
                          </HStack>
                        )}
                      </Td>
                      <Td onClick={() => router.push(`/tasks/${task.id}/edit`)}>
                        <Badge colorScheme={getTaskPriorityColor(task.priority)}>
                          {getTaskPriorityLabel(task.priority)}
                        </Badge>
                      </Td>
                      <Td onClick={() => router.push(`/tasks/${task.id}/edit`)}>
                        <Badge
                          colorScheme={getTaskStatusColor(task.status)}
                          variant="subtle"
                        >
                          {getTaskStatusLabel(task.status)}
                        </Badge>
                      </Td>
                      <Td onClick={() => router.push(`/tasks/${task.id}/edit`)}>
                        <Text
                          fontSize="sm"
                          color={isOverdue ? 'red.500' : 'gray.600'}
                          fontWeight={isOverdue ? 'semibold' : 'normal'}
                        >
                          {formatDate(task.dueDate)}
                        </Text>
                      </Td>
                      <Td onClick={(e) => e.stopPropagation()}>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<FiMoreVertical />}
                            variant="ghost"
                            size="sm"
                            aria-label="アクション"
                          />
                          <MenuList>
                            <MenuItem
                              icon={<FiEye />}
                              onClick={() => router.push(`/tasks/${task.id}/edit`)}
                            >
                              詳細を表示
                            </MenuItem>
                            <MenuItem
                              icon={<FiEdit2 />}
                              onClick={() => router.push(`/tasks/${task.id}/edit`)}
                            >
                              編集
                            </MenuItem>
                            <MenuItem
                              icon={<FiTrash2 />}
                              color="red.500"
                              onClick={() => {
                                console.log('削除:', task.id);
                              }}
                            >
                              削除
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </MotionTr>
                  );
                })}
              </AnimatePresence>
            </Tbody>
          </Table>

          {filteredTasks.length === 0 && (
            <Box py={10} textAlign="center">
              <Text color="gray.500">
                検索条件に一致するタスクが見つかりませんでした
              </Text>
            </Box>
          )}
        </Box>

        <HStack justify="space-between" fontSize="sm" color="gray.600" flexWrap="wrap">
          <Text>全 {filteredTasks.length} 件のタスク</Text>
          <HStack spacing={4} flexWrap="wrap">
            <Badge colorScheme="gray">
              未着手 {mockTasks.filter((t) => t.status === 'todo').length}
            </Badge>
            <Badge colorScheme="blue">
              進行中 {mockTasks.filter((t) => t.status === 'in-progress').length}
            </Badge>
            <Badge colorScheme="green">
              完了 {mockTasks.filter((t) => t.status === 'completed').length}
            </Badge>
          </HStack>
        </HStack>
      </VStack>
    </Layout>
  );
}
