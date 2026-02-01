import { motion } from 'framer-motion';
import { RoleBadge } from '../ui';
import { UserAvatar, ActionMenu } from '../common';
import styles from '../../styles/components/data/MemberCard.module.css';

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
    <div className={styles.content}>
      <UserAvatar size="xl" name={name} src={avatar} />
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <RoleBadge role={role} />
        <p className={styles.email}>{email}</p>
        {taskCount !== undefined && (
          <p className={styles.taskCount}>担当タスク: {taskCount}件</p>
        )}
      </div>
      {actions && actions.length > 0 && (
        <ActionMenu
          items={actions}
          ariaLabel="オプション"
          variant="outline"
          size="sm"
        />
      )}
    </div>
  );

  if (isAnimated) {
    return (
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: animationDelay }}
        whileHover={{ scale: 1.05 }}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={styles.card}>{content}</div>;
}
