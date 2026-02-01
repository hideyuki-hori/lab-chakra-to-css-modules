import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
  Radio,
  RadioGroup,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Card,
  CardBody,
  Stack,
  Spinner,
  Badge,
} from '@chakra-ui/react';
import { FiSave, FiX, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import { mockProjects, mockUsers, mockTasks } from '../../../lib/mockData';

const MotionBox = motion(Box);

interface TaskFormData {
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate: string;
}

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = router.query;
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<TaskFormData>({
    defaultValues: {
      priority: 'medium',
      status: 'todo',
    },
  });

  const priority = watch('priority');

  useEffect(() => {
    if (id) {
      // タスクデータの読み込みをシミュレート
      setTimeout(() => {
        const foundTask = mockTasks.find((t) => t.id === id);
        if (foundTask) {
          setTask(foundTask);
          // フォームに既存データを設定
          reset({
            title: foundTask.title,
            description: foundTask.description,
            projectId: foundTask.projectId,
            assigneeId: foundTask.assignee?.id || '',
            priority: foundTask.priority as any,
            status: foundTask.status as any,
            dueDate: new Date(foundTask.dueDate).toISOString().split('T')[0],
          });
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id, reset]);

  const onSubmit = async (data: TaskFormData) => {
    // フォーム送信処理をシミュレート
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('更新されたタスクデータ:', data);
    setShowSuccessAlert(true);

    // 2秒後にタスク一覧ページへリダイレクト
    setTimeout(() => {
      router.push('/tasks');
    }, 2000);
  };

  const handleDelete = () => {
    if (confirm('このタスクを削除してもよろしいですか?')) {
      console.log('タスク削除:', id);
      router.push('/tasks');
    }
  };

  const getFieldAnimation = (fieldName: string) => {
    return {
      scale: focusedField === fieldName ? 1.01 : 1,
      boxShadow:
        focusedField === fieldName
          ? '0 0 0 3px rgba(66, 153, 225, 0.15)'
          : '0 0 0 0px rgba(66, 153, 225, 0)',
    };
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

  if (isLoading) {
    return (
      <Layout>
        <VStack align="center" justify="center" minH="400px" spacing={4}>
          <Spinner size="xl" color="primary.500" thickness="4px" />
          <Text color="gray.600">タスクデータを読み込み中...</Text>
        </VStack>
      </Layout>
    );
  }

  if (!task) {
    return (
      <Layout>
        <VStack align="center" justify="center" minH="400px" spacing={4}>
          <Heading size="lg" color="gray.600">
            タスクが見つかりません
          </Heading>
          <Button colorScheme="primary" onClick={() => router.push('/tasks')}>
            タスク一覧に戻る
          </Button>
        </VStack>
      </Layout>
    );
  }

  return (
    <Layout>
      <VStack align="stretch" spacing={6} maxW="800px" mx="auto">
        <HStack justify="space-between" align="start">
          <Box>
            <Heading size="lg" mb={2}>
              タスク編集
            </Heading>
            <HStack spacing={3}>
              <Text color="gray.600">タスクの情報を編集します</Text>
              <Badge colorScheme={getTaskStatusColor(task.status)}>
                {task.status}
              </Badge>
              <Badge colorScheme={getTaskPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
            </HStack>
          </Box>
          <Button
            leftIcon={<FiTrash2 />}
            colorScheme="red"
            variant="outline"
            size="sm"
            onClick={handleDelete}
          >
            削除
          </Button>
        </HStack>

        {showSuccessAlert && (
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>更新成功!</AlertTitle>
              <AlertDescription>
                タスクが正常に更新されました。一覧ページに戻ります...
              </AlertDescription>
            </Box>
          </Alert>
        )}

        {Object.keys(errors).length > 0 && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>入力エラー</AlertTitle>
              <AlertDescription>
                必須項目を入力してください。エラーがあるフィールドを確認してください。
              </AlertDescription>
            </Box>
          </Alert>
        )}

        <Card>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={6}>
                <MotionBox
                  animate={getFieldAnimation('title')}
                  transition={{ duration: 0.2 }}
                >
                  <FormControl isInvalid={!!errors.title} isRequired>
                    <FormLabel>タスク名</FormLabel>
                    <Input
                      {...register('title', {
                        required: 'タスク名を入力してください',
                        minLength: {
                          value: 3,
                          message: 'タスク名は3文字以上で入力してください',
                        },
                      })}
                      placeholder="例: トップページのUIデザイン作成"
                      onFocus={() => setFocusedField('title')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <FormErrorMessage>
                      {errors.title && errors.title.message}
                    </FormErrorMessage>
                  </FormControl>
                </MotionBox>

                <MotionBox
                  animate={getFieldAnimation('description')}
                  transition={{ duration: 0.2 }}
                >
                  <FormControl isInvalid={!!errors.description} isRequired>
                    <FormLabel>説明</FormLabel>
                    <Textarea
                      {...register('description', {
                        required: '説明を入力してください',
                        minLength: {
                          value: 10,
                          message: '説明は10文字以上で入力してください',
                        },
                      })}
                      placeholder="タスクの詳細な説明を入力してください"
                      rows={5}
                      onFocus={() => setFocusedField('description')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <FormErrorMessage>
                      {errors.description && errors.description.message}
                    </FormErrorMessage>
                  </FormControl>
                </MotionBox>

                <MotionBox
                  animate={getFieldAnimation('projectId')}
                  transition={{ duration: 0.2 }}
                >
                  <FormControl isInvalid={!!errors.projectId} isRequired>
                    <FormLabel>プロジェクト</FormLabel>
                    <Select
                      {...register('projectId', {
                        required: 'プロジェクトを選択してください',
                      })}
                      placeholder="プロジェクトを選択"
                      onFocus={() => setFocusedField('projectId')}
                      onBlur={() => setFocusedField(null)}
                    >
                      {mockProjects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>
                      {errors.projectId && errors.projectId.message}
                    </FormErrorMessage>
                  </FormControl>
                </MotionBox>

                <MotionBox
                  animate={getFieldAnimation('assigneeId')}
                  transition={{ duration: 0.2 }}
                >
                  <FormControl isInvalid={!!errors.assigneeId} isRequired>
                    <FormLabel>担当者</FormLabel>
                    <Select
                      {...register('assigneeId', {
                        required: '担当者を選択してください',
                      })}
                      placeholder="担当者を選択"
                      onFocus={() => setFocusedField('assigneeId')}
                      onBlur={() => setFocusedField(null)}
                    >
                      {mockUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>
                      {errors.assigneeId && errors.assigneeId.message}
                    </FormErrorMessage>
                  </FormControl>
                </MotionBox>

                <FormControl isRequired>
                  <FormLabel>優先度</FormLabel>
                  <RadioGroup value={priority} onChange={(val) => setValue('priority', val as any)}>
                    <Stack direction="row" spacing={6}>
                      <Radio value="low" colorScheme="gray">
                        低
                      </Radio>
                      <Radio value="medium" colorScheme="blue">
                        中
                      </Radio>
                      <Radio value="high" colorScheme="orange">
                        高
                      </Radio>
                      <Radio value="urgent" colorScheme="red">
                        緊急
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <MotionBox
                  animate={getFieldAnimation('status')}
                  transition={{ duration: 0.2 }}
                >
                  <FormControl isInvalid={!!errors.status} isRequired>
                    <FormLabel>ステータス</FormLabel>
                    <Select
                      {...register('status', {
                        required: 'ステータスを選択してください',
                      })}
                      onFocus={() => setFocusedField('status')}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="todo">未着手</option>
                      <option value="in-progress">進行中</option>
                      <option value="completed">完了</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.status && errors.status.message}
                    </FormErrorMessage>
                  </FormControl>
                </MotionBox>

                <MotionBox
                  animate={getFieldAnimation('dueDate')}
                  transition={{ duration: 0.2 }}
                >
                  <FormControl isInvalid={!!errors.dueDate} isRequired>
                    <FormLabel>期限</FormLabel>
                    <Input
                      type="date"
                      {...register('dueDate', {
                        required: '期限を入力してください',
                      })}
                      onFocus={() => setFocusedField('dueDate')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <FormErrorMessage>
                      {errors.dueDate && errors.dueDate.message}
                    </FormErrorMessage>
                  </FormControl>
                </MotionBox>

                <HStack justify="flex-end" spacing={4} pt={4}>
                  <Button
                    leftIcon={<FiX />}
                    variant="ghost"
                    onClick={() => router.push('/tasks')}
                    isDisabled={isSubmitting}
                  >
                    キャンセル
                  </Button>
                  <Button
                    leftIcon={<FiSave />}
                    colorScheme="primary"
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="保存中..."
                  >
                    変更を保存
                  </Button>
                </HStack>
              </Stack>
            </form>
          </CardBody>
        </Card>

        <Card bg="gray.50">
          <CardBody>
            <VStack align="start" spacing={2}>
              <Text fontSize="sm" fontWeight="semibold" color="gray.600">
                作成日時
              </Text>
              <Text fontSize="sm" color="gray.700">
                {new Date(task.createdAt).toLocaleString('ja-JP')}
              </Text>
              <Text fontSize="sm" fontWeight="semibold" color="gray.600" mt={2}>
                最終更新日時
              </Text>
              <Text fontSize="sm" color="gray.700">
                {new Date(task.updatedAt).toLocaleString('ja-JP')}
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Layout>
  );
}
