import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../components/ui/Tabs';
import { Tooltip } from '../components/ui/Tooltip';
import { reportStats, reportDetails } from '../lib/mockData';
import styles from '../styles/pages/reports.module.css';

const Reports = () => {
  const handleExport = (format: string) => {
    toast(`${format}形式でエクスポートしています...`, {
      icon: 'ℹ️',
      duration: 2000,
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case '完了':
        return styles.badgeGreen;
      case '進行中':
        return styles.badgeBlue;
      case '保留':
        return styles.badgeYellow;
      case '未着手':
        return styles.badgeGray;
      default:
        return styles.badgeGray;
    }
  };

  const getProductivityBadgeClass = (productivity: string) => {
    switch (productivity) {
      case '高':
        return styles.badgeGreen;
      case '中':
        return styles.badgeBlue;
      default:
        return styles.badgeYellow;
    }
  };

  const getAchievementBadgeClass = (rate: number) => {
    if (rate >= 80) return styles.badgeGreen;
    if (rate >= 60) return styles.badgeBlue;
    return styles.badgeYellow;
  };

  const renderStatCard = (
    stat: { label: string; value: string | number; change: number; description: string },
    index: number
  ) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Tooltip label={stat.description}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>{stat.label}</p>
          <p className={styles.statNumber}>{stat.value}</p>
          <p className={styles.statHelpText}>
            <span className={stat.change > 0 ? styles.statArrowIncrease : styles.statArrowDecrease}>
              {stat.change > 0 ? '▲' : '▼'}
            </span>
            {Math.abs(stat.change)}%
          </p>
        </div>
      </Tooltip>
    </motion.div>
  );

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>レポート・分析</h1>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.buttonGreen}`}
              onClick={() => handleExport('Excel')}
            >
              Excelエクスポート
            </button>
            <button
              className={`${styles.button} ${styles.buttonBlue}`}
              onClick={() => handleExport('PDF')}
            >
              PDFエクスポート
            </button>
          </div>
        </div>

        <Tabs>
          <TabList>
            <Tab index={0}>プロジェクト別</Tab>
            <Tab index={1}>メンバー別</Tab>
            <Tab index={2}>期間別</Tab>
          </TabList>

          <TabPanels>
            <TabPanel index={0}>
              <div className={styles.tabContent}>
                <div className={styles.statsGrid}>
                  {reportStats.project.map((stat, index) => renderStatCard(stat, index))}
                </div>

                <div className={styles.tableCard}>
                  <h2 className={styles.tableTitle}>プロジェクト詳細</h2>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th className={styles.th}>プロジェクト名</th>
                        <th className={styles.th}>タスク数</th>
                        <th className={styles.th}>完了率</th>
                        <th className={styles.th}>ステータス</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportDetails.project.map((project) => (
                        <tr key={project.id}>
                          <td className={styles.td}>{project.name}</td>
                          <td className={styles.td}>{project.taskCount}</td>
                          <td className={styles.td}>{project.completion}%</td>
                          <td className={styles.td}>
                            <span className={`${styles.badge} ${getStatusBadgeClass(project.status)}`}>
                              {project.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>

            <TabPanel index={1}>
              <div className={styles.tabContent}>
                <div className={styles.statsGrid}>
                  {reportStats.member.map((stat, index) => renderStatCard(stat, index))}
                </div>

                <div className={styles.tableCard}>
                  <h2 className={styles.tableTitle}>メンバー詳細</h2>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th className={styles.th}>メンバー名</th>
                        <th className={styles.th}>担当タスク</th>
                        <th className={styles.th}>完了タスク</th>
                        <th className={styles.th}>生産性</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportDetails.member.map((member) => (
                        <tr key={member.id}>
                          <td className={styles.td}>{member.name}</td>
                          <td className={styles.td}>{member.assignedTasks}</td>
                          <td className={styles.td}>{member.completedTasks}</td>
                          <td className={styles.td}>
                            <span className={`${styles.badge} ${getProductivityBadgeClass(member.productivity)}`}>
                              {member.productivity}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>

            <TabPanel index={2}>
              <div className={styles.tabContent}>
                <div className={styles.statsGrid}>
                  {reportStats.period.map((stat, index) => renderStatCard(stat, index))}
                </div>

                <div className={styles.tableCard}>
                  <h2 className={styles.tableTitle}>期間別詳細（月次）</h2>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th className={styles.th}>月</th>
                        <th className={styles.th}>新規タスク</th>
                        <th className={styles.th}>完了タスク</th>
                        <th className={styles.th}>達成率</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportDetails.period.map((period) => (
                        <tr key={period.id}>
                          <td className={styles.td}>{period.month}</td>
                          <td className={styles.td}>{period.newTasks}</td>
                          <td className={styles.td}>{period.completedTasks}</td>
                          <td className={styles.td}>
                            <span className={`${styles.badge} ${getAchievementBadgeClass(period.achievementRate)}`}>
                              {period.achievementRate}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
