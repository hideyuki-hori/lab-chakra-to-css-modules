import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui';
import { MemberCard } from '../components/data';
import { FormModal } from '../components/modal';
import { FormInput } from '../components/form';
import { teamMembers } from '../lib/mockData';
import styles from '../styles/pages/team.module.css';

interface NewMemberForm {
  name: string;
  email: string;
  role: string;
}

const Team = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<NewMemberForm>();

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = (data: NewMemberForm) => {
    toast.success(`${data.name}さんを追加しました`);
    reset();
    setIsModalOpen(false);
  };

  const handleMemberAction = (action: string, memberName: string) => {
    toast.success(`${memberName}さんに対して${action}を実行しました`);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>チームメンバー</h1>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              メンバー追加
            </Button>
          </div>

          <input
            type="text"
            className={styles.searchInput}
            placeholder="メンバーを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className={styles.grid}>
            {filteredMembers.map((member, index) => (
              <MemberCard
                key={member.id}
                name={member.name}
                email={member.email}
                role={member.role}
                taskCount={member.taskCount}
                isAnimated
                animationDelay={index * 0.1}
                actions={[
                  {
                    label: 'プロフィール表示',
                    onClick: () => handleMemberAction('プロフィール表示', member.name),
                  },
                  {
                    label: 'メッセージ送信',
                    onClick: () => handleMemberAction('メッセージ送信', member.name),
                  },
                  {
                    label: 'タスク割り当て',
                    onClick: () => handleMemberAction('タスク割り当て', member.name),
                  },
                ]}
              />
            ))}
          </div>
        </div>

        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit(onSubmit)}
          title="新しいメンバーを追加"
          submitLabel="追加"
        >
          <div className={styles.modalContent}>
            <FormInput
              label="名前"
              isRequired
              placeholder="山田太郎"
              {...register('name', { required: true })}
            />
            <FormInput
              label="メールアドレス"
              type="email"
              isRequired
              placeholder="yamada@example.com"
              {...register('email', { required: true })}
            />
            <FormInput
              label="役割"
              isRequired
              placeholder="メンバー"
              {...register('role', { required: true })}
            />
          </div>
        </FormModal>
      </div>
    </Layout>
  );
};

export default Team;
