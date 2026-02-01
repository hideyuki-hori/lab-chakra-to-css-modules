import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { Button, Card } from '../../components/ui';
import { Alert } from '../../components/common';
import { FormInput, FormTextarea, FormSelect, FormRadioGroup } from '../../components/form';
import { mockProjects, mockUsers } from '../../lib/mockData';
import styles from '../../styles/pages/tasks/new.module.css';

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('タスクデータ:', data);
    setShowSuccessAlert(true);

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

  const projectOptions = mockProjects.map((project) => ({
    value: project.id,
    label: project.name,
  }));

  const userOptions = mockUsers.map((user) => ({
    value: user.id,
    label: `${user.name} (${user.email})`,
  }));

  const statusOptions = [
    { value: 'todo', label: '未着手' },
    { value: 'in-progress', label: '進行中' },
    { value: 'completed', label: '完了' },
  ];

  const priorityOptions = [
    { value: 'low', label: '低' },
    { value: 'medium', label: '中' },
    { value: 'high', label: '高' },
    { value: 'urgent', label: '緊急' },
  ];

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>新規タスク作成</h1>
          <p className={styles.description}>新しいタスクを作成します</p>
        </div>

        {showSuccessAlert && (
          <Alert
            status="success"
            title="作成成功!"
            description="タスクが正常に作成されました。一覧ページに戻ります..."
          />
        )}

        {Object.keys(errors).length > 0 && (
          <Alert
            status="error"
            title="入力エラー"
            description="必須項目を入力してください。エラーがあるフィールドを確認してください。"
          />
        )}

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <motion.div
              animate={getFieldAnimation('title')}
              transition={{ duration: 0.2 }}
            >
              <FormInput
                label="タスク名"
                isRequired
                placeholder="例: トップページのUIデザイン作成"
                error={errors.title?.message}
                {...register('title', {
                  required: 'タスク名を入力してください',
                  minLength: {
                    value: 3,
                    message: 'タスク名は3文字以上で入力してください',
                  },
                })}
                onFocus={() => setFocusedField('title')}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>

            <motion.div
              animate={getFieldAnimation('description')}
              transition={{ duration: 0.2 }}
            >
              <FormTextarea
                label="説明"
                isRequired
                placeholder="タスクの詳細な説明を入力してください"
                rows={5}
                error={errors.description?.message}
                {...register('description', {
                  required: '説明を入力してください',
                  minLength: {
                    value: 10,
                    message: '説明は10文字以上で入力してください',
                  },
                })}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>

            <motion.div
              animate={getFieldAnimation('projectId')}
              transition={{ duration: 0.2 }}
            >
              <FormSelect
                label="プロジェクト"
                isRequired
                options={projectOptions}
                placeholder="プロジェクトを選択"
                error={errors.projectId?.message}
                {...register('projectId', {
                  required: 'プロジェクトを選択してください',
                })}
                onFocus={() => setFocusedField('projectId')}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>

            <motion.div
              animate={getFieldAnimation('assigneeId')}
              transition={{ duration: 0.2 }}
            >
              <FormSelect
                label="担当者"
                isRequired
                options={userOptions}
                placeholder="担当者を選択"
                error={errors.assigneeId?.message}
                {...register('assigneeId', {
                  required: '担当者を選択してください',
                })}
                onFocus={() => setFocusedField('assigneeId')}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>

            <FormRadioGroup
              name="priority"
              label="優先度"
              isRequired
              options={priorityOptions}
              value={priority}
              onChange={(val) => setValue('priority', val as TaskFormData['priority'])}
              direction="row"
            />

            <motion.div
              animate={getFieldAnimation('status')}
              transition={{ duration: 0.2 }}
            >
              <FormSelect
                label="ステータス"
                isRequired
                options={statusOptions}
                error={errors.status?.message}
                {...register('status', {
                  required: 'ステータスを選択してください',
                })}
                onFocus={() => setFocusedField('status')}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>

            <motion.div
              animate={getFieldAnimation('dueDate')}
              transition={{ duration: 0.2 }}
            >
              <FormInput
                label="期限"
                type="date"
                isRequired
                error={errors.dueDate?.message}
                {...register('dueDate', {
                  required: '期限を入力してください',
                })}
                onFocus={() => setFocusedField('dueDate')}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>

            <div className={styles.formActions}>
              <Button
                leftIcon={<FiX />}
                variant="ghost"
                onClick={() => router.push('/tasks')}
                disabled={isSubmitting}
              >
                キャンセル
              </Button>
              <Button
                leftIcon={<FiSave />}
                variant="primary"
                type="submit"
                isLoading={isSubmitting}
              >
                タスクを作成
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
