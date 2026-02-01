import { ReactNode, HTMLAttributes } from 'react';
import styles from '../../styles/components/ui/Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isHoverable?: boolean;
}

export default function Card({
  children,
  isHoverable = false,
  className = '',
  ...props
}: CardProps) {
  const cardClasses = [
    styles.card,
    isHoverable && styles.hoverable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
}
