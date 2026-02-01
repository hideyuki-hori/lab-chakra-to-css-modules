import { motion } from 'framer-motion';
import { StatusBadge, ProgressBar } from '../ui';
import { UserAvatar } from '../common';
import type { ProjectStatus } from '../ui/StatusBadge';
import styles from '../../styles/components/data/ProjectCard.module.css';

interface ProjectCardProps {
  name: string;
  description?: string;
  status: ProjectStatus;
  progress: number;
  startDate: Date;
  endDate: Date;
  owner: {
    name: string;
    avatar?: string;
  };
  onClick?: () => void;
  isAnimated?: boolean;
}

export default function ProjectCard({
  name,
  description,
  status,
  progress,
  startDate,
  endDate,
  owner,
  onClick,
  isAnimated = true,
}: ProjectCardProps) {
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

  const content = (
    <>
      <div className={styles.header}>
        <p className={styles.title}>{name}</p>
        <StatusBadge status={status} type="project" />
      </div>
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.content}>
        <ProgressBar value={progress} showLabel size="sm" />
        <div className={styles.footer}>
          <div className={styles.owner}>
            <UserAvatar size="sm" name={owner.name} src={owner.avatar} />
            <span className={styles.ownerName}>{owner.name}</span>
          </div>
          <span className={styles.dates}>
            {formatDate(startDate)} - {formatDate(endDate)}
          </span>
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
