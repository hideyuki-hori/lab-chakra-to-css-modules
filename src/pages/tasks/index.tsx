import { useState } from 'react';
import { FiPlus, FiFilter, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { Button, StatusBadge, PriorityBadge } from '../../components/ui';
import { PageHeader, UserAvatar, ActionMenu } from '../../components/common';
import { SearchInput } from '../../components/form';
import { DataTable } from '../../components/data';
import { mockTasks, mockProjects } from '../../lib/mockData';
import styles from '../../styles/pages/tasks/index.module.css';

export default function TasksPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProject, setFilterProject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());

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

  const columns = [
    {
      key: 'checkbox',
      header: '完了',
      width: '50px',
      render: (task: typeof mockTasks[0]) => (
        <div className={styles.checkboxCell} onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={checkedTasks.has(task.id)}
            onChange={() => handleCheckboxChange(task.id)}
          />
        </div>
      ),
    },
    {
      key: 'title',
      header: 'タスク名',
      render: (task: typeof mockTasks[0]) => (
        <div className={styles.taskInfo}>
          <span className={styles.taskTitle}>{task.title}</span>
          <span className={styles.taskDescription}>{task.description}</span>
        </div>
      ),
    },
    {
      key: 'project',
      header: 'プロジェクト',
      render: (task: typeof mockTasks[0]) => {
        const project = mockProjects.find((p) => p.id === task.projectId);
        return project ? (
          <span className={styles.projectName}>{project.name}</span>
        ) : null;
      },
    },
    {
      key: 'assignee',
      header: '担当者',
      render: (task: typeof mockTasks[0]) =>
        task.assignee ? (
          <div className={styles.assigneeInfo}>
            <UserAvatar size="sm" name={task.assignee.name} src={task.assignee.avatar} />
            <span className={styles.assigneeName}>{task.assignee.name}</span>
          </div>
        ) : null,
    },
    {
      key: 'priority',
      header: '優先度',
      render: (task: typeof mockTasks[0]) => <PriorityBadge priority={task.priority} />,
    },
    {
      key: 'status',
      header: 'ステータス',
      render: (task: typeof mockTasks[0]) => <StatusBadge status={task.status} type="task" />,
    },
    {
      key: 'dueDate',
      header: '期限',
      render: (task: typeof mockTasks[0]) => {
        const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
        return (
          <span className={isOverdue ? styles.dueDateOverdue : styles.dueDate}>
            {formatDate(task.dueDate)}
          </span>
        );
      },
    },
    {
      key: 'actions',
      header: '操作',
      width: '50px',
      render: (task: typeof mockTasks[0]) => (
        <div onClick={(e) => e.stopPropagation()}>
          <ActionMenu
            items={[
              {
                label: '詳細を表示',
                icon: FiEye,
                onClick: () => router.push(`/tasks/${task.id}/edit`),
              },
              {
                label: '編集',
                icon: FiEdit2,
                onClick: () => router.push(`/tasks/${task.id}/edit`),
              },
              {
                label: '削除',
                icon: FiTrash2,
                onClick: () => console.log('削除:', task.id),
                color: 'var(--color-red-500)',
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className={styles.container}>
        <PageHeader
          title="タスク一覧"
          description="すべてのタスクを管理できます"
        />

        <div className={styles.toolbar}>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="タスクを検索..."
          />

          <div className={styles.filterSection}>
            <span className={styles.filterIcon}>
              <FiFilter />
              フィルター:
            </span>
            <select
              className={styles.select}
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
            >
              <option value="all">すべてのプロジェクト</option>
              {mockProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">すべてのステータス</option>
              <option value="todo">未着手</option>
              <option value="in-progress">進行中</option>
              <option value="completed">完了</option>
            </select>
            <select
              className={styles.select}
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">すべての優先度</option>
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
              <option value="urgent">緊急</option>
            </select>
          </div>

          <Button
            leftIcon={<FiPlus />}
            variant="primary"
            onClick={() => router.push('/tasks/new')}
          >
            新規タスク
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={filteredTasks}
          keyExtractor={(task) => task.id}
          onRowClick={(task) => router.push(`/tasks/${task.id}/edit`)}
          emptyMessage="検索条件に一致するタスクが見つかりませんでした"
        />

        <div className={styles.footer}>
          <span>全 {filteredTasks.length} 件のタスク</span>
          <div className={styles.statsRow}>
            <StatusBadge status="todo" type="task" />
            <span>{mockTasks.filter((t) => t.status === 'todo').length}</span>
            <StatusBadge status="in-progress" type="task" />
            <span>{mockTasks.filter((t) => t.status === 'in-progress').length}</span>
            <StatusBadge status="completed" type="task" />
            <span>{mockTasks.filter((t) => t.status === 'completed').length}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
