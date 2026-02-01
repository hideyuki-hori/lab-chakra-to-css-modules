import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import { Button, StatusBadge, PriorityBadge } from '../components/ui';
import { Tooltip } from '../components/common';
import { StatCard } from '../components/data';
import { reportStats, reportDetails } from '../lib/mockData';
import styles from '../styles/pages/reports.module.css';

const Reports = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleExport = (format: string) => {
    toast.success(`${format}形式でエクスポートしています...`);
  };

  const tabs = [
    { label: 'プロジェクト別', id: 0 },
    { label: 'メンバー別', id: 1 },
    { label: '期間別', id: 2 },
  ];

  const getProductivityBadgeColor = (productivity: string) => {
    switch (productivity) {
      case '高':
        return 'var(--color-success-500)';
      case '中':
        return 'var(--color-blue-500)';
      default:
        return 'var(--color-warning-500)';
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.headerRow}>
            <h1 className={styles.title}>レポート・分析</h1>
            <div className={styles.exportButtons}>
              <Button variant="primary" onClick={() => handleExport('Excel')}>
                Excelエクスポート
              </Button>
              <Button variant="secondary" onClick={() => handleExport('PDF')}>
                PDFエクスポート
              </Button>
            </div>
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

          {activeTab === 0 && (
            <div className={styles.tabContent}>
              <div className={styles.statsGrid}>
                {reportStats.project.map((stat, index) => (
                  <Tooltip key={index} content={stat.description}>
                    <div>
                      <StatCard
                        label={stat.label}
                        value={stat.value}
                        helpText={`${Math.abs(stat.change)}%`}
                        trend={stat.change > 0 ? 'increase' : 'decrease'}
                        delay={index * 0.1}
                      />
                    </div>
                  </Tooltip>
                ))}
              </div>

              <div className={styles.tableSection}>
                <h2 className={styles.sectionTitle}>プロジェクト詳細</h2>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.tableHeader}>プロジェクト名</th>
                      <th className={styles.tableHeader}>タスク数</th>
                      <th className={styles.tableHeader}>完了率</th>
                      <th className={styles.tableHeader}>ステータス</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportDetails.project.map((project) => (
                      <tr key={project.id}>
                        <td className={styles.tableCell}>{project.name}</td>
                        <td className={styles.tableCell}>{project.taskCount}</td>
                        <td className={styles.tableCell}>{project.completion}%</td>
                        <td className={styles.tableCell}>
                          <StatusBadge
                            status={
                              project.status === '完了'
                                ? 'completed'
                                : project.status === '進行中'
                                ? 'active'
                                : project.status === '保留'
                                ? 'on-hold'
                                : 'planning'
                            }
                            type="project"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className={styles.tabContent}>
              <div className={styles.statsGrid}>
                {reportStats.member.map((stat, index) => (
                  <Tooltip key={index} content={stat.description}>
                    <div>
                      <StatCard
                        label={stat.label}
                        value={stat.value}
                        helpText={`${Math.abs(stat.change)}%`}
                        trend={stat.change > 0 ? 'increase' : 'decrease'}
                        delay={index * 0.1}
                      />
                    </div>
                  </Tooltip>
                ))}
              </div>

              <div className={styles.tableSection}>
                <h2 className={styles.sectionTitle}>メンバー詳細</h2>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.tableHeader}>メンバー名</th>
                      <th className={styles.tableHeader}>担当タスク</th>
                      <th className={styles.tableHeader}>完了タスク</th>
                      <th className={styles.tableHeader}>生産性</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportDetails.member.map((member) => (
                      <tr key={member.id}>
                        <td className={styles.tableCell}>{member.name}</td>
                        <td className={styles.tableCell}>{member.assignedTasks}</td>
                        <td className={styles.tableCell}>{member.completedTasks}</td>
                        <td className={styles.tableCell}>
                          <span
                            style={{
                              padding: '2px 8px',
                              borderRadius: '9999px',
                              fontSize: '12px',
                              backgroundColor:
                                member.productivity === '高'
                                  ? 'var(--color-success-100)'
                                  : member.productivity === '中'
                                  ? 'var(--color-blue-100)'
                                  : 'var(--color-warning-100)',
                              color: getProductivityBadgeColor(member.productivity),
                            }}
                          >
                            {member.productivity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className={styles.tabContent}>
              <div className={styles.statsGrid}>
                {reportStats.period.map((stat, index) => (
                  <Tooltip key={index} content={stat.description}>
                    <div>
                      <StatCard
                        label={stat.label}
                        value={stat.value}
                        helpText={`${Math.abs(stat.change)}%`}
                        trend={stat.change > 0 ? 'increase' : 'decrease'}
                        delay={index * 0.1}
                      />
                    </div>
                  </Tooltip>
                ))}
              </div>

              <div className={styles.tableSection}>
                <h2 className={styles.sectionTitle}>期間別詳細（月次）</h2>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.tableHeader}>月</th>
                      <th className={styles.tableHeader}>新規タスク</th>
                      <th className={styles.tableHeader}>完了タスク</th>
                      <th className={styles.tableHeader}>達成率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportDetails.period.map((period) => (
                      <tr key={period.id}>
                        <td className={styles.tableCell}>{period.month}</td>
                        <td className={styles.tableCell}>{period.newTasks}</td>
                        <td className={styles.tableCell}>{period.completedTasks}</td>
                        <td className={styles.tableCell}>
                          <span
                            style={{
                              padding: '2px 8px',
                              borderRadius: '9999px',
                              fontSize: '12px',
                              backgroundColor:
                                period.achievementRate >= 80
                                  ? 'var(--color-success-100)'
                                  : period.achievementRate >= 60
                                  ? 'var(--color-blue-100)'
                                  : 'var(--color-warning-100)',
                              color:
                                period.achievementRate >= 80
                                  ? 'var(--color-success-600)'
                                  : period.achievementRate >= 60
                                  ? 'var(--color-blue-600)'
                                  : 'var(--color-warning-600)',
                            }}
                          >
                            {period.achievementRate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
