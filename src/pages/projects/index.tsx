import { useState } from 'react';
import { FiPlus, FiUsers, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { Button, StatusBadge, ProgressBar } from '../../components/ui';
import { PageHeader, UserAvatar, ActionMenu, Tooltip } from '../../components/common';
import { SearchInput } from '../../components/form';
import { DataTable } from '../../components/data';
import { mockProjects } from '../../lib/mockData';
import styles from '../../styles/pages/projects/index.module.css';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  progress: number;
  startDate: Date;
  endDate: Date;
  owner: {
    id: string;
    name: string;
    avatar?: string;
  };
  members: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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

  const columns = [
    {
      key: 'name',
      header: 'プロジェクト名',
      render: (project: Project) => (
        <div className={styles.projectInfo}>
          <span className={styles.projectName}>{project.name}</span>
          <span className={styles.projectDescription}>{project.description}</span>
        </div>
      ),
    },
    {
      key: 'owner',
      header: 'オーナー',
      render: (project: Project) => (
        <div className={styles.ownerInfo}>
          <UserAvatar size="sm" name={project.owner.name} src={project.owner.avatar} />
          <span className={styles.ownerName}>{project.owner.name}</span>
        </div>
      ),
    },
    {
      key: 'members',
      header: 'メンバー',
      render: (project: Project) => (
        <Tooltip content={project.members.map((m) => m.name).join(', ')}>
          <div className={styles.memberInfo}>
            <div className={styles.avatarGroup}>
              {project.members.slice(0, 3).map((member, idx) => (
                <div key={member.id} className={styles.avatarGroupItem} style={{ zIndex: 3 - idx }}>
                  <UserAvatar size="sm" name={member.name} src={member.avatar} />
                </div>
              ))}
            </div>
            <span className={styles.memberCount}>
              <FiUsers />
              {project.members.length}
            </span>
          </div>
        </Tooltip>
      ),
    },
    {
      key: 'status',
      header: 'ステータス',
      render: (project: Project) => (
        <StatusBadge status={project.status} type="project" />
      ),
    },
    {
      key: 'progress',
      header: '進捗',
      render: (project: Project) => (
        <div className={styles.progressInfo}>
          <span className={styles.progressValue}>{project.progress}%</span>
          <ProgressBar value={project.progress} size="sm" isAnimated={false} />
        </div>
      ),
    },
    {
      key: 'endDate',
      header: '期限',
      render: (project: Project) => (
        <span className={styles.dateText}>{formatDate(project.endDate)}</span>
      ),
    },
    {
      key: 'actions',
      header: '操作',
      width: '50px',
      render: (project: Project) => (
        <div onClick={(e) => e.stopPropagation()}>
          <ActionMenu
            items={[
              {
                label: '詳細を表示',
                icon: FiEye,
                onClick: () => router.push(`/projects/${project.id}`),
              },
              {
                label: '編集',
                icon: FiEdit2,
                onClick: () => console.log('編集:', project.id),
              },
              {
                label: '削除',
                icon: FiTrash2,
                onClick: () => console.log('削除:', project.id),
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
          title="プロジェクト一覧"
          description="すべてのプロジェクトを管理できます"
        />

        <div className={styles.toolbar}>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="プロジェクトを検索..."
          />

          <Button
            leftIcon={<FiPlus />}
            variant="primary"
            onClick={() => console.log('新規プロジェクト作成')}
          >
            新規プロジェクト
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={filteredProjects}
          keyExtractor={(project) => project.id}
          onRowClick={(project) => router.push(`/projects/${project.id}`)}
          emptyMessage="検索条件に一致するプロジェクトが見つかりませんでした"
        />

        <div className={styles.footer}>
          <span>全 {filteredProjects.length} 件のプロジェクト</span>
          <div className={styles.statsRow}>
            <StatusBadge status="active" type="project" />
            <span>{mockProjects.filter((p) => p.status === 'active').length}</span>
            <StatusBadge status="completed" type="project" />
            <span>{mockProjects.filter((p) => p.status === 'completed').length}</span>
            <StatusBadge status="planning" type="project" />
            <span>{mockProjects.filter((p) => p.status === 'planning').length}</span>
            <StatusBadge status="on-hold" type="project" />
            <span>{mockProjects.filter((p) => p.status === 'on-hold').length}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
