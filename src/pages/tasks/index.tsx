import { useState } from 'react';
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
import { Menu, MenuItem } from '../../components/ui/Menu';
import styles from '../../styles/pages/tasks.module.css';

export default function TasksPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProject, setFilterProject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());

  const getTaskPriorityBadgeClass = (priority: string) => {
    switch (priority) {
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

  const getAvatarColor = (name: string) => {
    const colors = [
      'linear-gradient(135deg, #38b2ac, #319795)',
      'linear-gradient(135deg, #ed64a6, #d53f8c)',
      'linear-gradient(135deg, #a0522d, #8b4513)',
      'linear-gradient(135deg, #9f7aea, #805ad5)',
      'linear-gradient(135deg, #ecc94b, #d69e2e)',
      'linear-gradient(135deg, #4299e1, #3182ce)',
      'linear-gradient(135deg, #48bb78, #38a169)',
      'linear-gradient(135deg, #fc8181, #f56565)',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
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
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>タスク一覧</h1>
          <p className={styles.subtitle}>すべてのタスクを管理できます</p>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="タスクを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.filters}>
            <div className={styles.filterLabel}>
              <FiFilter />
              <span>フィルター:</span>
            </div>
            <select
              className={`${styles.select} ${styles.selectProject}`}
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

          <button
            className={styles.addButton}
            onClick={() => router.push('/tasks/new')}
          >
            <FiPlus />
            新規タスク
          </button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={`${styles.th} ${styles.thCheckbox}`}>完了</th>
                <th className={styles.th}>タスク名</th>
                <th className={styles.th}>プロジェクト</th>
                <th className={styles.th}>担当者</th>
                <th className={styles.th}>優先度</th>
                <th className={styles.th}>ステータス</th>
                <th className={styles.th}>期限</th>
                <th className={`${styles.th} ${styles.thActions}`}>操作</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredTasks.map((task) => {
                  const project = mockProjects.find((p) => p.id === task.projectId);
                  const isOverdue =
                    new Date(task.dueDate) < new Date() && task.status !== 'completed';
                  const isChecked = checkedTasks.has(task.id);

                  return (
                    <motion.tr
                      key={task.id}
                      className={styles.tr}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100, height: 0 }}
                      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <td className={styles.td} onClick={(e) => e.stopPropagation()}>
                        <motion.div
                          className={styles.checkboxWrapper}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.1 }}
                        >
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(task.id)}
                          />
                        </motion.div>
                      </td>
                      <td
                        className={styles.td}
                        onClick={() => router.push(`/tasks/${task.id}/edit`)}
                      >
                        <div className={styles.taskInfo}>
                          <p className={styles.taskTitle}>{task.title}</p>
                          <p className={styles.taskDescription}>{task.description}</p>
                        </div>
                      </td>
                      <td
                        className={styles.td}
                        onClick={() => router.push(`/tasks/${task.id}/edit`)}
                      >
                        {project && (
                          <p className={styles.projectName}>{project.name}</p>
                        )}
                      </td>
                      <td
                        className={styles.td}
                        onClick={() => router.push(`/tasks/${task.id}/edit`)}
                      >
                        {task.assignee && (
                          <div className={styles.assigneeCell}>
                            {task.assignee.avatar ? (
                              <img
                                src={task.assignee.avatar}
                                alt={task.assignee.name}
                                className={styles.avatar}
                              />
                            ) : (
                              <div
                                className={styles.avatarPlaceholder}
                                style={{ background: getAvatarColor(task.assignee.name) }}
                              >
                                {task.assignee.name.charAt(0)}
                              </div>
                            )}
                            <span className={styles.assigneeName}>{task.assignee.name}</span>
                          </div>
                        )}
                      </td>
                      <td
                        className={styles.td}
                        onClick={() => router.push(`/tasks/${task.id}/edit`)}
                      >
                        <span className={`${styles.badge} ${getTaskPriorityBadgeClass(task.priority)}`}>
                          {getTaskPriorityLabel(task.priority)}
                        </span>
                      </td>
                      <td
                        className={styles.td}
                        onClick={() => router.push(`/tasks/${task.id}/edit`)}
                      >
                        <span className={`${styles.badge} ${getTaskStatusBadgeClass(task.status)}`}>
                          {getTaskStatusLabel(task.status)}
                        </span>
                      </td>
                      <td
                        className={styles.td}
                        onClick={() => router.push(`/tasks/${task.id}/edit`)}
                      >
                        <p className={`${styles.dateText} ${isOverdue ? styles.dateOverdue : ''}`}>
                          {formatDate(task.dueDate)}
                        </p>
                      </td>
                      <td className={styles.td} onClick={(e) => e.stopPropagation()}>
                        <Menu
                          trigger={
                            <button className={styles.actionButton} aria-label="アクション">
                              <FiMoreVertical />
                            </button>
                          }
                        >
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
                            color="#c53030"
                            onClick={() => {
                              console.log('削除:', task.id);
                            }}
                          >
                            削除
                          </MenuItem>
                        </Menu>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredTasks.length === 0 && (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>
                検索条件に一致するタスクが見つかりませんでした
              </p>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <p>全 {filteredTasks.length} 件のタスク</p>
          <div className={styles.footerBadges}>
            <span className={`${styles.badge} ${styles.badgeGray}`}>
              未着手 {mockTasks.filter((t) => t.status === 'todo').length}
            </span>
            <span className={`${styles.badge} ${styles.badgeBlue}`}>
              進行中 {mockTasks.filter((t) => t.status === 'in-progress').length}
            </span>
            <span className={`${styles.badge} ${styles.badgeGreen}`}>
              完了 {mockTasks.filter((t) => t.status === 'completed').length}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
