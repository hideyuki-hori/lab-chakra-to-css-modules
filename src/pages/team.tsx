import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../components/ui/Modal';
import { Menu, MenuItem } from '../components/ui/Menu';
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
    toast(`${memberName}さんに対して${action}を実行しました`, { icon: 'ℹ️' });
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case '管理者':
        return styles.badgeRed;
      case 'メンバー':
        return styles.badgeBlue;
      case 'ゲスト':
        return styles.badgeGray;
      default:
        return styles.badgeGreen;
    }
  };

  const getInitials = (name: string) => {
    return name.charAt(0);
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

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.stack}>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>チームメンバー</h1>
            <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
              メンバー追加
            </button>
          </div>

          <input
            type="text"
            placeholder="メンバーを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />

          <div className={styles.grid}>
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className={styles.memberCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={styles.memberCardInner}>
                  <div className={styles.avatar} style={{ background: getAvatarColor(member.name) }}>{getInitials(member.name)}</div>
                  <div className={styles.memberInfo}>
                    <p className={styles.memberName}>{member.name}</p>
                    <span className={getRoleBadgeClass(member.role)}>{member.role}</span>
                    <p className={styles.memberEmail}>{member.email}</p>
                    <p className={styles.memberTaskCount}>担当タスク: {member.taskCount}件</p>
                  </div>
                  <Menu
                    trigger={
                      <button className={styles.iconButton} aria-label="Options">
                        ⋮
                      </button>
                    }
                  >
                    <MenuItem onClick={() => handleMemberAction('プロフィール表示', member.name)}>
                      プロフィール表示
                    </MenuItem>
                    <MenuItem onClick={() => handleMemberAction('メッセージ送信', member.name)}>
                      メッセージ送信
                    </MenuItem>
                    <MenuItem onClick={() => handleMemberAction('タスク割り当て', member.name)}>
                      タスク割り当て
                    </MenuItem>
                  </Menu>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
          <ModalHeader onClose={() => setIsModalOpen(false)}>新しいメンバーを追加</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <div className={styles.formStack}>
                <div className={styles.formGroup}>
                  <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>名前</label>
                  <input {...register('name')} placeholder="山田太郎" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                    メールアドレス
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="yamada@example.com"
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>役割</label>
                  <input {...register('role')} placeholder="メンバー" className={styles.input} />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className={styles.buttonGhost} onClick={() => setIsModalOpen(false)}>
                キャンセル
              </button>
              <button type="submit" className={styles.buttonPrimary}>
                追加
              </button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default Team;
