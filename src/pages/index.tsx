import { FiFolderPlus, FiCheckSquare, FiClock, FiAlertCircle } from 'react-icons/fi';
import Layout from '../components/layout/Layout';
import { calculateStatistics, mockTasks, mockProjects } from '../lib/mockData';
import styles from '../styles/pages/dashboard.module.css';

export default function Home() {
  const stats = calculateStatistics();

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
        return `${styles.badge} ${styles.badgeGreen} ${styles.badgeSubtle}`;
      case 'in-progress':
        return `${styles.badge} ${styles.badgeBlue} ${styles.badgeSubtle}`;
      case 'todo':
        return `${styles.badge} ${styles.badgeGray} ${styles.badgeSubtle}`;
      default:
        return `${styles.badge} ${styles.badgeGray} ${styles.badgeSubtle}`;
    }
  };

  const getProjectStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return styles.badgeGreen;
      case 'active':
        return styles.badgeBlue;
      case 'planning':
        return styles.badgeGray;
      case 'on-hold':
        return styles.badgeOrange;
      default:
        return styles.badgeGray;
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

  const recentTasks = mockTasks
    .filter((task) => task.status === 'in-progress' || task.status === 'todo')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const recentProjects = mockProjects
    .filter((project) => project.status === 'active')
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>ダッシュボード</h1>
          <p className={styles.subtitle}>プロジェクトとタスクの概要を確認できます</p>
        </div>

        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.statCardPrimary}`}>
            <div className={styles.statHeader}>
              <FiFolderPlus className={`${styles.statIcon} ${styles.statIconPrimary}`} />
              <p className={`${styles.statLabel} ${styles.statLabelPrimary}`}>総プロジェクト数</p>
            </div>
            <p className={`${styles.statNumber} ${styles.statNumberPrimary}`}>{stats.totalProjects}</p>
            <p className={`${styles.statHelp} ${styles.statHelpPrimary}`}>
              <span className={styles.statArrowUp} />
              進行中 {stats.activeProjects}件
            </p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <FiCheckSquare className={`${styles.statIcon} ${styles.statIconAccent}`} />
              <p className={styles.statLabel}>総タスク数</p>
            </div>
            <p className={styles.statNumber}>{stats.totalTasks}</p>
            <p className={styles.statHelp}>完了 {stats.completedTasks}件</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <FiClock className={`${styles.statIcon} ${styles.statIconBlue}`} />
              <p className={styles.statLabel}>進行中のタスク</p>
            </div>
            <p className={styles.statNumber}>{stats.inProgressTasks}</p>
            <p className={styles.statHelp}>未着手 {stats.todoTasks}件</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <FiAlertCircle className={`${styles.statIcon} ${styles.statIconOrange}`} />
              <p className={styles.statLabel}>遅延プロジェクト</p>
            </div>
            <p className={styles.statNumber}>{stats.delayedProjects}</p>
            <p className={styles.statHelp}>
              {stats.delayedProjects > 0 ? '要対応' : '問題なし'}
            </p>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>最近のタスク</h2>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.taskList}>
                {recentTasks.map((task) => {
                  const project = mockProjects.find((p) => p.id === task.projectId);
                  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

                  return (
                    <div key={task.id} className={styles.taskItem}>
                      <div className={styles.taskHeader}>
                        <p className={styles.taskTitle}>{task.title}</p>
                        <span className={`${styles.badge} ${getTaskPriorityBadgeClass(task.priority)}`}>
                          {getTaskPriorityLabel(task.priority)}
                        </span>
                      </div>
                      <p className={styles.taskDescription}>{task.description}</p>
                      <div className={styles.taskFooter}>
                        <div className={styles.taskMeta}>
                          <span className={getTaskStatusBadgeClass(task.status)}>
                            {getTaskStatusLabel(task.status)}
                          </span>
                          {project && (
                            <p className={styles.projectName}>{project.name}</p>
                          )}
                        </div>
                        <div className={styles.taskMeta}>
                          {task.assignee && (
                            <div className={styles.taskAssignee}>
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
                              <p className={styles.assigneeName}>{task.assignee.name}</p>
                            </div>
                          )}
                          <span className={isOverdue ? styles.taskDateOverdue : styles.taskDate}>
                            {formatDate(task.dueDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>進行中のプロジェクト</h2>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.taskList}>
                {recentProjects.map((project) => (
                  <div key={project.id} className={styles.taskItem}>
                    <div className={styles.taskHeader}>
                      <p className={styles.taskTitle}>{project.name}</p>
                      <span className={`${styles.badge} ${getProjectStatusBadgeClass(project.status)}`}>
                        {getProjectStatusLabel(project.status)}
                      </span>
                    </div>
                    <p className={styles.taskDescription}>{project.description}</p>
                    <div className={styles.progressSection}>
                      <div className={styles.progressHeader}>
                        <p className={styles.progressLabel}>進捗率</p>
                        <p className={styles.progressValue}>{project.progress}%</p>
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className={styles.projectFooter}>
                        <div className={styles.taskAssignee}>
                          {project.owner.avatar ? (
                            <img
                              src={project.owner.avatar}
                              alt={project.owner.name}
                              className={styles.avatar}
                            />
                          ) : (
                            <div
                              className={styles.avatarPlaceholder}
                              style={{ background: getAvatarColor(project.owner.name) }}
                            >
                              {project.owner.name.charAt(0)}
                            </div>
                          )}
                          <p className={styles.assigneeName}>{project.owner.name}</p>
                        </div>
                        <p className={styles.projectDate}>
                          {formatDate(project.startDate)} - {formatDate(project.endDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
