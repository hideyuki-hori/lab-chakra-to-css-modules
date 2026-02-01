import { motion } from 'framer-motion';
import { StatusBadge, PriorityBadge } from '../ui';
import { UserAvatar } from '../common';
import type { TaskStatus } from '../ui/StatusBadge';
import type { Priority } from '../ui/PriorityBadge';
import styles from '../../styles/components/data/TaskCard.module.css';

interface TaskCardProps {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: Date;
  projectName?: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  onClick?: () => void;
  isAnimated?: boolean;
}

export default function TaskCard({
  title,
  description,
  status,
  priority,
  dueDate,
  projectName,
  assignee,
  onClick,
  isAnimated = true,
}: TaskCardProps) {
  const isOverdue = new Date(dueDate) < new Date() && status !== 'completed';

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
    });
  };

  const cardClasses = [
    styles.card,
    onClick && styles.clickable,
  ]
    .filter(Boolean)
    .join(' ');

  const dueDateClasses = [
    styles.dueDate,
    isOverdue && styles.overdue,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        <PriorityBadge priority={priority} />
      </div>
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <StatusBadge status={status} type="task" />
          {projectName && <span className={styles.projectName}>{projectName}</span>}
        </div>
        <div className={styles.footerRight}>
          {assignee && (
            <div className={styles.assignee}>
              <UserAvatar size="sm" name={assignee.name} src={assignee.avatar} />
              <span className={styles.assigneeName}>{assignee.name}</span>
            </div>
          )}
          <span className={dueDateClasses}>{formatDate(dueDate)}</span>
        </div>
      </div>
    </>
  );

  if (isAnimated) {
    return (
      <motion.div
        className={cardClasses}
        onClick={onClick}
        whileHover={{ scale: 1.01 }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      {content}
    </div>
  );
}
