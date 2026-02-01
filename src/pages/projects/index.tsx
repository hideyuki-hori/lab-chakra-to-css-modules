import { useState } from 'react';
import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiUsers,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { mockProjects } from '../../lib/mockData';
import { Menu, MenuItem } from '../../components/ui/Menu';
import Tooltip from '../../components/ui/Tooltip';
import styles from '../../styles/pages/projects.module.css';

export default function ProjectsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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

  const getProgressFillClass = (progress: number) => {
    if (progress >= 75) return styles.progressFillGreen;
    if (progress >= 50) return styles.progressFillBlue;
    if (progress >= 25) return styles.progressFillOrange;
    return styles.progressFillRed;
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

  const filteredProjects = mockProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.owner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>プロジェクト一覧</h1>
          <p className={styles.subtitle}>すべてのプロジェクトを管理できます</p>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="プロジェクトを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className={styles.addButton}
            onClick={() => {
              console.log('新規プロジェクト作成');
            }}
          >
            <FiPlus />
            新規プロジェクト
          </button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.th}>プロジェクト名</th>
                <th className={styles.th}>オーナー</th>
                <th className={styles.th}>メンバー</th>
                <th className={styles.th}>ステータス</th>
                <th className={styles.th}>進捗</th>
                <th className={styles.th}>期限</th>
                <th className={`${styles.th} ${styles.thActions}`}>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <motion.tr
                  key={project.id}
                  className={styles.tr}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                  transition={{ duration: 0.2 }}
                  onClick={() => router.push(`/projects/${project.id}`)}
                >
                  <td className={styles.td}>
                    <div className={styles.projectInfo}>
                      <p className={styles.projectName}>{project.name}</p>
                      <p className={styles.projectDescription}>{project.description}</p>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.ownerCell}>
                      {project.owner.avatar ? (
                        <img
                          src={project.owner.avatar}
                          alt={project.owner.name}
                          className={`${styles.avatar} ${styles.avatarSm}`}
                        />
                      ) : (
                        <div
                          className={`${styles.avatarPlaceholder} ${styles.avatarPlaceholderSm}`}
                          style={{ background: getAvatarColor(project.owner.name) }}
                        >
                          {project.owner.name.charAt(0)}
                        </div>
                      )}
                      <p className={styles.ownerName}>{project.owner.name}</p>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <Tooltip label={project.members.map((m) => m.name).join(', ')}>
                      <div className={styles.membersCell}>
                        <div className={styles.avatarGroup}>
                          {project.members.slice(0, 3).map((member) => (
                            <div key={member.id} className={styles.avatarGroupItem}>
                              {member.avatar ? (
                                <img
                                  src={member.avatar}
                                  alt={member.name}
                                  className={`${styles.avatar} ${styles.avatarSm}`}
                                />
                              ) : (
                                <div
                                  className={`${styles.avatarPlaceholder} ${styles.avatarPlaceholderSm}`}
                                  style={{ background: getAvatarColor(member.name) }}
                                >
                                  {member.name.charAt(0)}
                                </div>
                              )}
                            </div>
                          ))}
                          {project.members.length > 3 && (
                            <div className={styles.avatarMore}>
                              +{project.members.length - 3}
                            </div>
                          )}
                        </div>
                        <span className={styles.memberCount}>
                          <FiUsers />
                          {project.members.length}
                        </span>
                      </div>
                    </Tooltip>
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.badge} ${getProjectStatusBadgeClass(project.status)}`}>
                      {getProjectStatusLabel(project.status)}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.progressCell}>
                      <p className={styles.progressValue}>{project.progress}%</p>
                      <div className={styles.progressBar}>
                        <div
                          className={`${styles.progressFill} ${getProgressFillClass(project.progress)}`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <p className={styles.dateText}>{formatDate(project.endDate)}</p>
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
                        onClick={() => router.push(`/projects/${project.id}`)}
                      >
                        詳細を表示
                      </MenuItem>
                      <MenuItem
                        icon={<FiEdit2 />}
                        onClick={() => {
                          console.log('編集:', project.id);
                        }}
                      >
                        編集
                      </MenuItem>
                      <MenuItem
                        icon={<FiTrash2 />}
                        color="#c53030"
                        onClick={() => {
                          console.log('削除:', project.id);
                        }}
                      >
                        削除
                      </MenuItem>
                    </Menu>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredProjects.length === 0 && (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>
                検索条件に一致するプロジェクトが見つかりませんでした
              </p>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>全 {filteredProjects.length} 件のプロジェクト</p>
          <div className={styles.footerBadges}>
            <span className={`${styles.badge} ${styles.badgeBlue}`}>
              進行中 {mockProjects.filter((p) => p.status === 'active').length}
            </span>
            <span className={`${styles.badge} ${styles.badgeGreen}`}>
              完了 {mockProjects.filter((p) => p.status === 'completed').length}
            </span>
            <span className={`${styles.badge} ${styles.badgeGray}`}>
              計画中 {mockProjects.filter((p) => p.status === 'planning').length}
            </span>
            <span className={`${styles.badge} ${styles.badgeOrange}`}>
              保留 {mockProjects.filter((p) => p.status === 'on-hold').length}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
