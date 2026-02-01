import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave, FiX, FiTrash2, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import { mockProjects, mockUsers, mockTasks } from '../../../lib/mockData';
import styles from '../../../styles/pages/task-form.module.css';

interface TaskFormData {
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate: string;
}

type TaskType = typeof mockTasks[number];

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = router.query;
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState<TaskType | null>(null);

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
            priority: foundTask.priority as TaskFormData['priority'],
            status: foundTask.status as TaskFormData['status'],
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

  const getTaskStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return styles.badgeGreen;
      case 'in-progress':
        return styles.badgeBlue;
      case 'todo':
        return styles.badgeGray;
      default:
        return styles.badgeGray;
    }
  };

  const getTaskPriorityBadgeClass = (priorityVal: string) => {
    switch (priorityVal) {
      case 'urgent':
        return styles.badgeRed;
      case 'high':
        return styles.badgeOrange;
      case 'medium':
        return styles.badgeBlue;
      case 'low':
        return styles.badgeGray;
      default:
        return styles.badgeGray;
    }
  };

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
        <div className={styles.notFoundContainer}>
          <h2 className={styles.notFoundTitle}>タスクが見つかりません</h2>
          <button
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={() => router.push('/tasks')}
          >
            タスク一覧に戻る
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>タスク編集</h1>
            <div className={styles.subtitleRow}>
              <p className={styles.subtitle}>タスクの情報を編集します</p>
              <span className={`${styles.badge} ${getTaskStatusBadgeClass(task.status)}`}>
                {task.status}
              </span>
              <span className={`${styles.badge} ${getTaskPriorityBadgeClass(task.priority)}`}>
                {task.priority}
              </span>
            </div>
          </div>
          <button className={styles.deleteButton} onClick={handleDelete}>
            <FiTrash2 />
            削除
          </button>
        </div>

        {showSuccessAlert && (
          <div className={`${styles.alert} ${styles.alertSuccess}`}>
            <FiCheckCircle className={`${styles.alertIcon} ${styles.alertIconSuccess}`} />
            <div className={styles.alertContent}>
              <p className={styles.alertTitle}>更新成功!</p>
              <p className={styles.alertDescription}>
                タスクが正常に更新されました。一覧ページに戻ります...
              </p>
            </div>
          </div>
        )}

        {Object.keys(errors).length > 0 && (
          <div className={`${styles.alert} ${styles.alertError}`}>
            <FiAlertCircle className={`${styles.alertIcon} ${styles.alertIconError}`} />
            <div className={styles.alertContent}>
              <p className={styles.alertTitle}>入力エラー</p>
              <p className={styles.alertDescription}>
                必須項目を入力してください。エラーがあるフィールドを確認してください。
              </p>
            </div>
          </div>
        )}

        <div className={styles.card}>
          <div className={styles.cardBody}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <motion.div
                className={styles.formField}
                animate={getFieldAnimation('title')}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.formControl}>
                  <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                    タスク名
                  </label>
                  <input
                    {...register('title', {
                      required: 'タスク名を入力してください',
                      minLength: {
                        value: 3,
                        message: 'タスク名は3文字以上で入力してください',
                      },
                    })}
                    className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                    placeholder="例: トップページのUIデザイン作成"
                    onFocus={() => setFocusedField('title')}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.title && (
                    <p className={styles.errorMessage}>{errors.title.message}</p>
                  )}
                </div>
              </motion.div>

              <motion.div
                className={styles.formField}
                animate={getFieldAnimation('description')}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.formControl}>
                  <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                    説明
                  </label>
                  <textarea
                    {...register('description', {
                      required: '説明を入力してください',
                      minLength: {
                        value: 10,
                        message: '説明は10文字以上で入力してください',
                      },
                    })}
                    className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                    placeholder="タスクの詳細な説明を入力してください"
                    rows={5}
                    onFocus={() => setFocusedField('description')}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.description && (
                    <p className={styles.errorMessage}>{errors.description.message}</p>
                  )}
                </div>
              </motion.div>

              <motion.div
                className={styles.formField}
                animate={getFieldAnimation('projectId')}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.formControl}>
                  <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                    プロジェクト
                  </label>
                  <select
                    {...register('projectId', {
                      required: 'プロジェクトを選択してください',
                    })}
                    className={`${styles.select} ${errors.projectId ? styles.inputError : ''}`}
                    onFocus={() => setFocusedField('projectId')}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="" disabled>プロジェクトを選択</option>
                    {mockProjects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                  {errors.projectId && (
                    <p className={styles.errorMessage}>{errors.projectId.message}</p>
                  )}
                </div>
              </motion.div>

              <motion.div
                className={styles.formField}
                animate={getFieldAnimation('assigneeId')}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.formControl}>
                  <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                    担当者
                  </label>
                  <select
                    {...register('assigneeId', {
                      required: '担当者を選択してください',
                    })}
                    className={`${styles.select} ${errors.assigneeId ? styles.inputError : ''}`}
                    onFocus={() => setFocusedField('assigneeId')}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="" disabled>担当者を選択</option>
                    {mockUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                  {errors.assigneeId && (
                    <p className={styles.errorMessage}>{errors.assigneeId.message}</p>
                  )}
                </div>
              </motion.div>

              <div className={styles.formControl}>
                <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                  優先度
                </label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      value="low"
                      checked={priority === 'low'}
                      onChange={() => setValue('priority', 'low')}
                      className={`${styles.radioInput} ${styles.radioGray}`}
                    />
                    低
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      value="medium"
                      checked={priority === 'medium'}
                      onChange={() => setValue('priority', 'medium')}
                      className={`${styles.radioInput} ${styles.radioBlue}`}
                    />
                    中
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      value="high"
                      checked={priority === 'high'}
                      onChange={() => setValue('priority', 'high')}
                      className={`${styles.radioInput} ${styles.radioOrange}`}
                    />
                    高
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      value="urgent"
                      checked={priority === 'urgent'}
                      onChange={() => setValue('priority', 'urgent')}
                      className={`${styles.radioInput} ${styles.radioRed}`}
                    />
                    緊急
                  </label>
                </div>
              </div>

              <motion.div
                className={styles.formField}
                animate={getFieldAnimation('status')}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.formControl}>
                  <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                    ステータス
                  </label>
                  <select
                    {...register('status', {
                      required: 'ステータスを選択してください',
                    })}
                    className={`${styles.select} ${errors.status ? styles.inputError : ''}`}
                    onFocus={() => setFocusedField('status')}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="todo">未着手</option>
                    <option value="in-progress">進行中</option>
                    <option value="completed">完了</option>
                  </select>
                  {errors.status && (
                    <p className={styles.errorMessage}>{errors.status.message}</p>
                  )}
                </div>
              </motion.div>

              <motion.div
                className={styles.formField}
                animate={getFieldAnimation('dueDate')}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.formControl}>
                  <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                    期限
                  </label>
                  <input
                    type="date"
                    {...register('dueDate', {
                      required: '期限を入力してください',
                    })}
                    className={`${styles.input} ${errors.dueDate ? styles.inputError : ''}`}
                    onFocus={() => setFocusedField('dueDate')}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.dueDate && (
                    <p className={styles.errorMessage}>{errors.dueDate.message}</p>
                  )}
                </div>
              </motion.div>

              <div className={styles.buttonRow}>
                <button
                  type="button"
                  className={`${styles.button} ${styles.buttonGhost}`}
                  onClick={() => router.push('/tasks')}
                  disabled={isSubmitting}
                >
                  <FiX />
                  キャンセル
                </button>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.buttonPrimary}`}
                  disabled={isSubmitting}
                >
                  <FiSave />
                  {isSubmitting ? '保存中...' : '変更を保存'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className={`${styles.card} ${styles.cardGray}`}>
          <div className={styles.cardBody}>
            <div className={styles.metaInfo}>
              <p className={styles.metaLabel}>作成日時</p>
              <p className={styles.metaValue}>
                {new Date(task.createdAt).toLocaleString('ja-JP')}
              </p>
              <p className={`${styles.metaLabel} ${styles.metaLabelSpaced}`}>最終更新日時</p>
              <p className={styles.metaValue}>
                {new Date(task.updatedAt).toLocaleString('ja-JP')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
