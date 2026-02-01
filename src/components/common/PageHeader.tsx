import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from '../../styles/components/page-header.module.css';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  isAnimated?: boolean;
}

export default function PageHeader({
  title,
  description,
  actions,
  isAnimated = true,
}: PageHeaderProps) {
  const titleClasses = [styles.title, description ? styles.titleWithDesc : ''].filter(Boolean).join(' ');

  const content = (
    <div className={styles.content}>
      <div className={styles.textContainer}>
        <h1 className={titleClasses}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );

  if (isAnimated) {
    return (
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={styles.container}>{content}</div>;
}
