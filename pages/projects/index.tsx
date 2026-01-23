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
  AvatarGroup,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
  Progress,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiUsers,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { mockProjects } from '../../lib/mockData';

const MotionTr = motion(Tr);

export default function ProjectsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredProjects = mockProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.owner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <VStack align="stretch" spacing={6}>
        <Box>
          <Heading size="lg" mb={2}>
            プロジェクト一覧
          </Heading>
          <Text color="gray.600">
            すべてのプロジェクトを管理できます
          </Text>
        </Box>

        <HStack justify="space-between">
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray" />
            </InputLeftElement>
            <Input
              placeholder="プロジェクトを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="white"
            />
          </InputGroup>

          <Button
            leftIcon={<FiPlus />}
            colorScheme="primary"
            onClick={() => {
              // 新規作成ハンドラー
              console.log('新規プロジェクト作成');
            }}
          >
            新規プロジェクト
          </Button>
        </HStack>

        <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>プロジェクト名</Th>
                <Th>オーナー</Th>
                <Th>メンバー</Th>
                <Th>ステータス</Th>
                <Th>進捗</Th>
                <Th>期限</Th>
                <Th width="50px">操作</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredProjects.map((project) => (
                <MotionTr
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                  transition={{ duration: 0.2 }}
                  cursor="pointer"
                  onClick={() => router.push(`/projects/${project.id}`)}
                >
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold">{project.name}</Text>
                      <Text fontSize="sm" color="gray.600" noOfLines={1}>
                        {project.description}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Avatar
                        size="sm"
                        name={project.owner.name}
                        src={project.owner.avatar}
                      />
                      <Text fontSize="sm">{project.owner.name}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Tooltip
                      label={project.members.map((m) => m.name).join(', ')}
                      placement="top"
                    >
                      <HStack spacing={2}>
                        <AvatarGroup size="sm" max={3}>
                          {project.members.map((member) => (
                            <Avatar
                              key={member.id}
                              name={member.name}
                              src={member.avatar}
                            />
                          ))}
                        </AvatarGroup>
                        <Text fontSize="sm" color="gray.600">
                          <FiUsers style={{ display: 'inline', marginRight: '4px' }} />
                          {project.members.length}
                        </Text>
                      </HStack>
                    </Tooltip>
                  </Td>
                  <Td>
                    <Badge colorScheme={getProjectStatusColor(project.status)}>
                      {getProjectStatusLabel(project.status)}
                    </Badge>
                  </Td>
                  <Td>
                    <VStack align="stretch" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold">
                        {project.progress}%
                      </Text>
                      <Progress
                        value={project.progress}
                        size="sm"
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
                    </VStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.600">
                      {formatDate(project.endDate)}
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
                          onClick={() => router.push(`/projects/${project.id}`)}
                        >
                          詳細を表示
                        </MenuItem>
                        <MenuItem
                          icon={<FiEdit2 />}
                          onClick={() => {
                            console.log('編集:', project.id);
                          }}
                        >
                          編集
                        </MenuItem>
                        <MenuItem
                          icon={<FiTrash2 />}
                          color="red.500"
                          onClick={() => {
                            console.log('削除:', project.id);
                          }}
                        >
                          削除
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </MotionTr>
              ))}
            </Tbody>
          </Table>

          {filteredProjects.length === 0 && (
            <Box py={10} textAlign="center">
              <Text color="gray.500">
                検索条件に一致するプロジェクトが見つかりませんでした
              </Text>
            </Box>
          )}
        </Box>

        <HStack justify="space-between" fontSize="sm" color="gray.600">
          <Text>全 {filteredProjects.length} 件のプロジェクト</Text>
          <HStack spacing={4}>
            <Badge colorScheme="blue">
              進行中 {mockProjects.filter((p) => p.status === 'active').length}
            </Badge>
            <Badge colorScheme="green">
              完了 {mockProjects.filter((p) => p.status === 'completed').length}
            </Badge>
            <Badge colorScheme="gray">
              計画中 {mockProjects.filter((p) => p.status === 'planning').length}
            </Badge>
            <Badge colorScheme="orange">
              保留 {mockProjects.filter((p) => p.status === 'on-hold').length}
            </Badge>
          </HStack>
        </HStack>
      </VStack>
    </Layout>
  );
}
