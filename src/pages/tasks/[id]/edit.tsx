import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave, FiX, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import { Button, Card, StatusBadge, PriorityBadge } from '../../../components/ui';
import { Alert } from '../../../components/common';
import { FormInput, FormTextarea, FormSelect, FormRadioGroup } from '../../../components/form';
import { mockProjects, mockUsers, mockTasks } from '../../../lib/mockData';
import styles from '../../../styles/pages/tasks/edit.module.css';

type TaskStatus = 'todo' | 'in-progress' | 'completed';
type Priority = 'low' | 'medium' | 'high' | 'urgent';

interface TaskFormData {
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignee: { id: string; name: string } | null;
  priority: Priority;
  status: TaskStatus;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = router.query;
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState<Task | null>(null);

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
      setTimeout(() => {
        const foundTask = mockTasks.find((t) => t.id === id);
        if (foundTask) {
          setTask(foundTask);
          reset({
            title: foundTask.title,
            description: foundTask.description,
            projectId: foundTask.projectId,
            assigneeId: foundTask.assignee?.id || '',
            priority: foundTask.priority,
            status: foundTask.status,
            dueDate: new Date(foundTask.dueDate).toISOString().split('T')[0],
          });
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id, reset]);

  const onSubmit = async (data: TaskFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('更新されたタスクデータ:', data);
    setShowSuccessAlert(true);

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

  if (isLoading) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>タスクデータを読み込み中...</p>
        </div>
      </Layout>
    );
  }

  if (!task) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <h2 className={styles.notFoundTitle}>タスクが見つかりません</h2>
          <Button variant="primary" onClick={() => router.push('/tasks')}>
            タスク一覧に戻る
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.headerInfo}>
            <h1 className={styles.title}>タスク編集</h1>
            <div className={styles.headerMeta}>
              <span className={styles.description}>タスクの情報を編集します</span>
              <StatusBadge status={task.status} type="task" />
              <PriorityBadge priority={task.priority} />
            </div>
          </div>
          <Button
            leftIcon={<FiTrash2 />}
            variant="danger"
            size="sm"
            onClick={handleDelete}
          >
            削除
          </Button>
        </div>

        {showSuccessAlert && (
          <Alert
            status="success"
            title="更新成功!"
            description="タスクが正常に更新されました。一覧ページに戻ります..."
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
                変更を保存
              </Button>
            </div>
          </form>
        </Card>

        <div className={styles.infoCard}>
          <div className={styles.infoContent}>
            <span className={styles.infoLabel}>作成日時</span>
            <span className={styles.infoValue}>
              {new Date(task.createdAt).toLocaleString('ja-JP')}
            </span>
            <span className={styles.infoLabelSpaced}>最終更新日時</span>
            <span className={styles.infoValue}>
              {new Date(task.updatedAt).toLocaleString('ja-JP')}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
