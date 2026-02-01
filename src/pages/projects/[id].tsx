import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  FiArrowLeft,
  FiEdit2,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiCalendar,
  FiTag,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { mockProjects, mockTasks } from '../../lib/mockData';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../components/ui/Tabs';
import styles from '../../styles/pages/project-detail.module.css';

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState(0);

  const project = mockProjects.find((p) => p.id === id);
  const projectTasks = mockTasks.filter((t) => t.projectId === id);

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

  if (!project) {
    return (
      <Layout>
        <div className={styles.notFoundContainer}>
          <p className={styles.notFoundText}>プロジェクトが見つかりませんでした</p>
          <button className={styles.backToListButton} onClick={() => router.push('/projects')}>
            プロジェクト一覧に戻る
          </button>
        </div>
      </Layout>
    );
  }

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

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return styles.badgePurple;
      case 'member':
        return styles.badgeBlue;
      case 'guest':
        return styles.badgeGray;
      default:
        return styles.badgeGray;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return '管理者';
      case 'member':
        return 'メンバー';
      case 'guest':
        return 'ゲスト';
      default:
        return role;
    }
  };

  const getMemberStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return styles.badgeGreen;
      case 'away':
        return styles.badgeYellow;
      default:
        return styles.badgeGray;
    }
  };

  const getMemberStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'オンライン';
      case 'away':
        return '離席中';
      default:
        return 'オフライン';
    }
  };

  const getProgressFillClass = (progress: number) => {
    if (progress >= 75) return styles.progressFillGreen;
    if (progress >= 50) return styles.progressFillBlue;
    if (progress >= 25) return styles.progressFillOrange;
    return styles.progressFillRed;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const completedTasks = projectTasks.filter((t) => t.status === 'completed').length;
  const totalTasks = projectTasks.length;
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <button
              className={styles.backButton}
              onClick={() => router.push('/projects')}
              aria-label="戻る"
            >
              <FiArrowLeft />
            </button>
            <div className={styles.headerInfo}>
              <div className={styles.titleRow}>
                <h1 className={styles.title}>{project.name}</h1>
                <span className={`${styles.badge} ${getProjectStatusBadgeClass(project.status)}`}>
                  {getProjectStatusLabel(project.status)}
                </span>
              </div>
              <p className={styles.description}>{project.description}</p>
            </div>
          </div>
          <button className={styles.editButton}>
            <FiEdit2 />
            編集
          </button>
        </div>

        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab index={0}>概要</Tab>
            <Tab index={1}>タスク ({projectTasks.length})</Tab>
            <Tab index={2}>メンバー ({project.members.length})</Tab>
            <Tab index={3}>設定</Tab>
          </TabList>

          <TabPanels>
            <TabPanel index={0}>
              <AnimatePresence mode="wait">
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.container}>
                    <div className={styles.statsGrid}>
                      <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                          <FiClock className={`${styles.statIcon} ${styles.statIconBlue}`} />
                          <p className={styles.statLabel}>進捗率</p>
                        </div>
                        <p className={styles.statNumber}>{project.progress}%</p>
                        <p className={styles.statHelp}>目標: {formatDate(project.endDate)}</p>
                      </div>

                      <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                          <FiCheckCircle className={`${styles.statIcon} ${styles.statIconGreen}`} />
                          <p className={styles.statLabel}>タスク完了率</p>
                        </div>
                        <p className={styles.statNumber}>{taskCompletionRate}%</p>
                        <p className={styles.statHelp}>{completedTasks}/{totalTasks} 完了</p>
                      </div>

                      <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                          <FiUsers className={`${styles.statIcon} ${styles.statIconPurple}`} />
                          <p className={styles.statLabel}>チームメンバー</p>
                        </div>
                        <p className={styles.statNumber}>{project.members.length}</p>
                        <p className={styles.statHelp}>オーナー: {project.owner.name}</p>
                      </div>

                      <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                          <FiCalendar className={`${styles.statIcon} ${styles.statIconOrange}`} />
                          <p className={styles.statLabel}>プロジェクト期間</p>
                        </div>
                        <p className={`${styles.statNumber} ${styles.statNumberMd}`}>
                          {Math.ceil(
                            (project.endDate.getTime() - project.startDate.getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}日
                        </p>
                        <p className={styles.statHelp}>{formatDate(project.startDate)}〜</p>
                      </div>
                    </div>

                    <div className={styles.card}>
                      <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>プロジェクト進捗</h2>
                      </div>
                      <div className={styles.cardBody}>
                        <div className={styles.progressSection}>
                          <div>
                            <div className={styles.progressHeader}>
                              <p className={styles.progressLabel}>全体進捗</p>
                              <p className={styles.progressValue}>{project.progress}%</p>
                            </div>
                            <div className={styles.progressBar}>
                              <div
                                className={`${styles.progressFill} ${getProgressFillClass(project.progress)}`}
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>

                          <div className={styles.infoGrid}>
                            <div className={styles.infoBox}>
                              <p className={styles.infoLabel}>開始日</p>
                              <p className={styles.infoValue}>{formatDate(project.startDate)}</p>
                            </div>
                            <div className={styles.infoBox}>
                              <p className={styles.infoLabel}>終了予定日</p>
                              <p className={styles.infoValue}>{formatDate(project.endDate)}</p>
                            </div>
                            <div className={styles.infoBox}>
                              <p className={styles.infoLabel}>ステータス</p>
                              <span className={`${styles.badge} ${getProjectStatusBadgeClass(project.status)}`}>
                                {getProjectStatusLabel(project.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.card}>
                      <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>タグ</h2>
                      </div>
                      <div className={styles.cardBody}>
                        <div className={styles.tagsContainer}>
                          {project.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                              <FiTag className={styles.tagIcon} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </TabPanel>

            <TabPanel index={1}>
              <AnimatePresence mode="wait">
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.card}>
                    <div className={`${styles.cardHeader} ${styles.cardHeaderFlex}`}>
                      <h2 className={styles.cardTitle}>タスク一覧</h2>
                      <button className={styles.addButton}>
                        <FiCheckCircle />
                        新規タスク
                      </button>
                    </div>
                    <div className={styles.cardBodyNoPadding}>
                      <div style={{ overflowX: 'auto' }}>
                        <table className={styles.table}>
                          <thead className={styles.tableHeader}>
                            <tr>
                              <th className={`${styles.th} ${styles.thCheckbox}`}>
                                <input type="checkbox" className={styles.checkbox} />
                              </th>
                              <th className={styles.th}>タスク名</th>
                              <th className={styles.th}>担当者</th>
                              <th className={styles.th}>優先度</th>
                              <th className={styles.th}>ステータス</th>
                              <th className={styles.th}>期限</th>
                            </tr>
                          </thead>
                          <tbody>
                            {projectTasks.map((task) => (
                              <tr key={task.id} className={styles.tr}>
                                <td className={styles.td}>
                                  <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={task.status === 'completed'}
                                    readOnly
                                  />
                                </td>
                                <td className={styles.td}>
                                  <div className={styles.taskInfo}>
                                    <p className={styles.taskTitle}>{task.title}</p>
                                    <p className={styles.taskDescription}>{task.description}</p>
                                  </div>
                                </td>
                                <td className={styles.td}>
                                  {task.assignee ? (
                                    <div className={styles.assigneeCell}>
                                      {task.assignee.avatar ? (
                                        <img
                                          src={task.assignee.avatar}
                                          alt={task.assignee.name}
                                          className={`${styles.avatar} ${styles.avatarSm}`}
                                        />
                                      ) : (
                                        <div
                                          className={`${styles.avatarPlaceholder} ${styles.avatarPlaceholderSm}`}
                                          style={{ background: getAvatarColor(task.assignee.name) }}
                                        >
                                          {task.assignee.name.charAt(0)}
                                        </div>
                                      )}
                                      <p className={styles.assigneeName}>{task.assignee.name}</p>
                                    </div>
                                  ) : (
                                    <p className={styles.unassigned}>未割り当て</p>
                                  )}
                                </td>
                                <td className={styles.td}>
                                  <span className={`${styles.badge} ${getTaskPriorityBadgeClass(task.priority)}`}>
                                    {getTaskPriorityLabel(task.priority)}
                                  </span>
                                </td>
                                <td className={styles.td}>
                                  <span className={getTaskStatusBadgeClass(task.status)}>
                                    {getTaskStatusLabel(task.status)}
                                  </span>
                                </td>
                                <td className={styles.td}>
                                  <p className={styles.dateText}>{formatDate(task.dueDate)}</p>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {projectTasks.length === 0 && (
                          <div className={styles.emptyState}>
                            <p className={styles.emptyText}>
                              このプロジェクトにはまだタスクがありません
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </TabPanel>

            <TabPanel index={2}>
              <AnimatePresence mode="wait">
                <motion.div
                  key="members"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.card}>
                    <div className={`${styles.cardHeader} ${styles.cardHeaderFlex}`}>
                      <h2 className={styles.cardTitle}>プロジェクトメンバー</h2>
                      <button className={styles.addButton}>
                        <FiUsers />
                        メンバー追加
                      </button>
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.memberList}>
                        {project.members.map((member) => (
                          <div key={member.id} className={styles.memberCard}>
                            <div className={styles.memberCardInner}>
                              <div className={styles.memberInfo}>
                                {member.avatar ? (
                                  <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className={`${styles.avatar} ${styles.avatarMd}`}
                                  />
                                ) : (
                                  <div
                                    className={`${styles.avatarPlaceholder} ${styles.avatarPlaceholderMd}`}
                                    style={{ background: getAvatarColor(member.name) }}
                                  >
                                    {member.name.charAt(0)}
                                  </div>
                                )}
                                <div className={styles.memberDetails}>
                                  <div className={styles.memberNameRow}>
                                    <p className={styles.memberName}>{member.name}</p>
                                    <span className={`${styles.badge} ${getRoleBadgeClass(member.role)}`}>
                                      {getRoleLabel(member.role)}
                                    </span>
                                    {member.id === project.owner.id && (
                                      <span className={`${styles.badge} ${styles.badgePurple}`}>
                                        オーナー
                                      </span>
                                    )}
                                  </div>
                                  <p className={styles.memberEmail}>{member.email}</p>
                                  {member.bio && (
                                    <p className={styles.memberBio}>{member.bio}</p>
                                  )}
                                </div>
                              </div>
                              <div className={styles.memberStatus}>
                                <span className={`${styles.badge} ${getMemberStatusBadgeClass(member.status)}`}>
                                  {getMemberStatusLabel(member.status)}
                                </span>
                                <p className={styles.memberTaskCount}>
                                  担当タスク: {projectTasks.filter((t) => t.assignee?.id === member.id).length}件
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </TabPanel>

            <TabPanel index={3}>
              <AnimatePresence mode="wait">
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.card}>
                    <div className={styles.cardHeader}>
                      <h2 className={styles.cardTitle}>プロジェクト設定</h2>
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.formGroup}>
                        <div className={styles.formControl}>
                          <label className={styles.formLabel}>プロジェクト名</label>
                          <input type="text" className={styles.input} defaultValue={project.name} />
                        </div>

                        <div className={styles.formControl}>
                          <label className={styles.formLabel}>説明</label>
                          <textarea
                            className={styles.textarea}
                            defaultValue={project.description}
                            rows={4}
                          />
                        </div>

                        <div className={styles.formGrid}>
                          <div className={styles.formControl}>
                            <label className={styles.formLabel}>開始日</label>
                            <input
                              type="date"
                              className={styles.input}
                              defaultValue={project.startDate.toISOString().split('T')[0]}
                            />
                          </div>

                          <div className={styles.formControl}>
                            <label className={styles.formLabel}>終了予定日</label>
                            <input
                              type="date"
                              className={styles.input}
                              defaultValue={project.endDate.toISOString().split('T')[0]}
                            />
                          </div>
                        </div>

                        <div className={styles.formGrid}>
                          <div className={styles.formControl}>
                            <label className={styles.formLabel}>ステータス</label>
                            <select className={styles.select} defaultValue={project.status}>
                              <option value="planning">計画中</option>
                              <option value="active">進行中</option>
                              <option value="on-hold">保留</option>
                              <option value="completed">完了</option>
                            </select>
                          </div>

                          <div className={styles.formControl}>
                            <label className={styles.formLabel}>進捗率 (%)</label>
                            <input
                              type="number"
                              className={styles.input}
                              min="0"
                              max="100"
                              defaultValue={project.progress}
                            />
                          </div>
                        </div>

                        <div className={styles.formControl}>
                          <label className={styles.formLabel}>タグ (カンマ区切り)</label>
                          <input
                            type="text"
                            className={styles.input}
                            defaultValue={project.tags.join(', ')}
                          />
                        </div>

                        <div className={styles.formActions}>
                          <button className={styles.cancelButton}>キャンセル</button>
                          <button className={styles.saveButton}>保存</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Layout>
  );
}
