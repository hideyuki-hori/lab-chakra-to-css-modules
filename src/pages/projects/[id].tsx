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
import { Button, Card, StatusBadge, PriorityBadge, ProgressBar, RoleBadge } from '../../components/ui';
import { UserAvatar } from '../../components/common';
import { StatCard, DataTable } from '../../components/data';
import { FormInput, FormTextarea, FormSelect } from '../../components/form';
import { mockProjects, mockTasks, mockUsers } from '../../lib/mockData';
import styles from '../../styles/pages/projects/detail.module.css';

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState(0);

  const project = mockProjects.find((p) => p.id === id);
  const projectTasks = mockTasks.filter((t) => t.projectId === id);

  if (!project) {
    return (
      <Layout>
        <div className={styles.notFoundContainer}>
          <p className={styles.notFoundText}>プロジェクトが見つかりませんでした</p>
          <Button onClick={() => router.push('/projects')}>
            プロジェクト一覧に戻る
          </Button>
        </div>
      </Layout>
    );
  }

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
  const projectDays = Math.ceil(
    (project.endDate.getTime() - project.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const tabs = [
    { label: '概要', id: 0 },
    { label: `タスク (${projectTasks.length})`, id: 1 },
    { label: `メンバー (${project.members.length})`, id: 2 },
    { label: '設定', id: 3 },
  ];

  const taskColumns = [
    {
      key: 'title',
      header: 'タスク名',
      render: (task: typeof mockTasks[0]) => (
        <div className={styles.memberDetails}>
          <span className={styles.memberName}>{task.title}</span>
          <span className={styles.memberEmail}>{task.description}</span>
        </div>
      ),
    },
    {
      key: 'assignee',
      header: '担当者',
      render: (task: typeof mockTasks[0]) =>
        task.assignee ? (
          <div className={styles.memberInfo}>
            <UserAvatar size="sm" name={task.assignee.name} src={task.assignee.avatar} />
            <span>{task.assignee.name}</span>
          </div>
        ) : (
          <span className={styles.memberEmail}>未割り当て</span>
        ),
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
      render: (task: typeof mockTasks[0]) => (
        <span className={styles.memberEmail}>{formatDate(task.dueDate)}</span>
      ),
    },
  ];

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
              <FiArrowLeft size={20} />
            </button>
            <div className={styles.headerInfo}>
              <div className={styles.titleRow}>
                <h1 className={styles.title}>{project.name}</h1>
                <StatusBadge status={project.status} type="project" />
              </div>
              <p className={styles.description}>{project.description}</p>
            </div>
          </div>
          <Button leftIcon={<FiEdit2 />} variant="primary">
            編集
          </Button>
        </div>

        <div className={styles.tabs}>
          <div className={styles.tabList}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.container}>
                <div className={styles.statsGrid}>
                  <StatCard
                    label="進捗率"
                    value={`${project.progress}%`}
                    helpText={`目標: ${formatDate(project.endDate)}`}
                    icon={FiClock}
                  />
                  <StatCard
                    label="タスク完了率"
                    value={`${taskCompletionRate}%`}
                    helpText={`${completedTasks}/${totalTasks} 完了`}
                    icon={FiCheckCircle}
                  />
                  <StatCard
                    label="チームメンバー"
                    value={project.members.length}
                    helpText={`オーナー: ${project.owner.name}`}
                    icon={FiUsers}
                  />
                  <StatCard
                    label="プロジェクト期間"
                    value={`${projectDays}日`}
                    helpText={`${formatDate(project.startDate)}〜`}
                    icon={FiCalendar}
                  />
                </div>

                <Card>
                  <h3 className={styles.cardTitle}>プロジェクト進捗</h3>
                  <div className={styles.progressSection}>
                    <div className={styles.progressRow}>
                      <span className={styles.progressLabel}>全体進捗</span>
                      <span className={styles.progressValue}>{project.progress}%</span>
                    </div>
                    <ProgressBar value={project.progress} size="lg" />

                    <div className={styles.infoGrid}>
                      <div className={styles.infoCard}>
                        <p className={styles.infoLabel}>開始日</p>
                        <p className={styles.infoValue}>{formatDate(project.startDate)}</p>
                      </div>
                      <div className={styles.infoCard}>
                        <p className={styles.infoLabel}>終了予定日</p>
                        <p className={styles.infoValue}>{formatDate(project.endDate)}</p>
                      </div>
                      <div className={styles.infoCard}>
                        <p className={styles.infoLabel}>ステータス</p>
                        <StatusBadge status={project.status} type="project" />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h3 className={styles.cardTitle}>タグ</h3>
                  <div className={styles.tagsSection}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        <FiTag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>タスク一覧</h3>
                  <Button leftIcon={<FiCheckCircle />} size="sm" variant="primary">
                    新規タスク
                  </Button>
                </div>
                <DataTable
                  columns={taskColumns}
                  data={projectTasks}
                  keyExtractor={(task) => task.id}
                  emptyMessage="このプロジェクトにはまだタスクがありません"
                />
              </Card>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              key="members"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>プロジェクトメンバー</h3>
                  <Button leftIcon={<FiUsers />} size="sm" variant="primary">
                    メンバー追加
                  </Button>
                </div>
                <div className={styles.memberList}>
                  {project.members.map((member) => {
                    const memberTasks = projectTasks.filter((t) => t.assignee?.id === member.id);
                    return (
                      <div key={member.id} className={styles.memberCard}>
                        <div className={styles.memberRow}>
                          <div className={styles.memberInfo}>
                            <UserAvatar size="md" name={member.name} src={member.avatar} />
                            <div className={styles.memberDetails}>
                              <div className={styles.memberNameRow}>
                                <span className={styles.memberName}>{member.name}</span>
                                <RoleBadge role={member.role} />
                                {member.id === project.owner.id && (
                                  <StatusBadge status="active" type="user" />
                                )}
                              </div>
                              <span className={styles.memberEmail}>{member.email}</span>
                              {member.bio && (
                                <span className={styles.memberBio}>{member.bio}</span>
                              )}
                            </div>
                          </div>
                          <div className={styles.memberStats}>
                            <StatusBadge status={member.status} type="user" />
                            <span className={styles.taskCount}>
                              担当タスク: {memberTasks.length}件
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 3 && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <h3 className={styles.cardTitle}>プロジェクト設定</h3>
                <div className={styles.formSection}>
                  <FormInput
                    label="プロジェクト名"
                    defaultValue={project.name}
                  />
                  <FormTextarea
                    label="説明"
                    defaultValue={project.description}
                    rows={4}
                  />
                  <div className={styles.formGrid}>
                    <FormInput
                      label="開始日"
                      type="date"
                      defaultValue={project.startDate.toISOString().split('T')[0]}
                    />
                    <FormInput
                      label="終了予定日"
                      type="date"
                      defaultValue={project.endDate.toISOString().split('T')[0]}
                    />
                  </div>
                  <div className={styles.formGrid}>
                    <FormSelect
                      label="ステータス"
                      defaultValue={project.status}
                      options={[
                        { value: 'planning', label: '計画中' },
                        { value: 'active', label: '進行中' },
                        { value: 'on-hold', label: '保留' },
                        { value: 'completed', label: '完了' },
                      ]}
                    />
                    <FormInput
                      label="進捗率 (%)"
                      type="number"
                      min={0}
                      max={100}
                      defaultValue={project.progress}
                    />
                  </div>
                  <FormInput
                    label="タグ (カンマ区切り)"
                    defaultValue={project.tags.join(', ')}
                  />
                  <div className={styles.formActions}>
                    <Button variant="outline">キャンセル</Button>
                    <Button variant="primary">保存</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
