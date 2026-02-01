import { FiFolderPlus, FiCheckSquare, FiClock, FiAlertCircle } from 'react-icons/fi';
import Layout from '../components/layout/Layout';
import { Card } from '../components/ui';
import { StatCard, TaskCard, ProjectCard } from '../components/data';
import { calculateStatistics, mockTasks, mockProjects } from '../lib/mockData';
import styles from '../styles/pages/dashboard.module.css';

export default function Home() {
  const stats = calculateStatistics();

  const recentTasks = mockTasks
    .filter((task) => task.status === 'in-progress' || task.status === 'todo')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const recentProjects = mockProjects
    .filter((project) => project.status === 'active')
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>ダッシュボード</h1>
          <p className={styles.description}>
            プロジェクトとタスクの概要を確認できます
          </p>
        </div>

        <div className={styles.statsGrid}>
          <StatCard
            label="総プロジェクト数"
            value={stats.totalProjects}
            helpText={`進行中 ${stats.activeProjects}件`}
            trend="increase"
            icon={FiFolderPlus}
            delay={0}
          />
          <StatCard
            label="総タスク数"
            value={stats.totalTasks}
            helpText={`完了 ${stats.completedTasks}件`}
            icon={FiCheckSquare}
            delay={0.1}
          />
          <StatCard
            label="進行中のタスク"
            value={stats.inProgressTasks}
            helpText={`未着手 ${stats.todoTasks}件`}
            icon={FiClock}
            delay={0.2}
          />
          <StatCard
            label="遅延プロジェクト"
            value={stats.delayedProjects}
            helpText={stats.delayedProjects > 0 ? '要対応' : '問題なし'}
            icon={FiAlertCircle}
            delay={0.3}
          />
        </div>

        <div className={styles.contentGrid}>
          <Card>
            <h2 className={styles.sectionTitle}>最近のタスク</h2>
            <div className={styles.taskList}>
              {recentTasks.map((task) => {
                const project = mockProjects.find((p) => p.id === task.projectId);
                return (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    projectName={project?.name}
                    assignee={task.assignee || undefined}
                  />
                );
              })}
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>進行中のプロジェクト</h2>
            <div className={styles.projectList}>
              {recentProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  description={project.description}
                  status={project.status}
                  progress={project.progress}
                  startDate={project.startDate}
                  endDate={project.endDate}
                  owner={project.owner}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
