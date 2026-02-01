import { useState } from 'react';
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
} from '@chakra-ui/react';
import { FiSave, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { mockProjects, mockUsers } from '../../lib/mockData';

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

export default function NewTaskPage() {
  const router = useRouter();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<TaskFormData>({
    defaultValues: {
      priority: 'medium',
      status: 'todo',
    },
  });

  const priority = watch('priority');

  const onSubmit = async (data: TaskFormData) => {
    // フォーム送信処理をシミュレート
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('タスクデータ:', data);
    setShowSuccessAlert(true);

    // 3秒後にタスク一覧ページへリダイレクト
    setTimeout(() => {
      router.push('/tasks');
    }, 2000);
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

  return (
    <Layout>
      <VStack align="stretch" spacing={6} maxW="800px" mx="auto">
        <Box>
          <Heading size="lg" mb={2}>
            新規タスク作成
          </Heading>
          <Text color="gray.600">新しいタスクを作成します</Text>
        </Box>

        {showSuccessAlert && (
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>作成成功!</AlertTitle>
              <AlertDescription>
                タスクが正常に作成されました。一覧ページに戻ります...
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
                    loadingText="作成中..."
                  >
                    タスクを作成
                  </Button>
                </HStack>
              </Stack>
            </form>
          </CardBody>
        </Card>
      </VStack>
    </Layout>
  );
}
