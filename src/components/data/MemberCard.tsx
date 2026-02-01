import { motion } from 'framer-motion';
import { RoleBadge } from '../ui';
import { UserAvatar, ActionMenu } from '../common';
import styles from '../../styles/components/data-card.module.css';

interface MemberAction {
  label: string;
  onClick: () => void;
}

interface MemberCardProps {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  taskCount?: number;
  actions?: MemberAction[];
  isAnimated?: boolean;
  animationDelay?: number;
}

export default function MemberCard({
  name,
  email,
  role,
  avatar,
  taskCount,
  actions,
  isAnimated = true,
  animationDelay = 0,
}: MemberCardProps) {
  const content = (
    <div className={styles.memberContent}>
      <UserAvatar name={name} src={avatar} size="xl" />
      <div className={styles.memberInfo}>
        <span className={styles.memberName}>{name}</span>
        <RoleBadge role={role} />
        <span className={styles.memberEmail}>{email}</span>
        {taskCount !== undefined && (
          <span className={styles.taskCount}>担当タスク: {taskCount}件</span>
        )}
      </div>
      {actions && actions.length > 0 && (
        <ActionMenu
          items={actions.map((action) => ({
            label: action.label,
            onClick: action.onClick,
          }))}
          ariaLabel="オプション"
        />
      )}
    </div>
  );

  if (isAnimated) {
    return (
      <motion.div
        className={styles.memberCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: animationDelay }}
        whileHover={{ scale: 1.05 }}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={styles.memberCard}>{content}</div>;
}
