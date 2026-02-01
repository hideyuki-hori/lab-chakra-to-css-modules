import { ReactNode, useState } from 'react';
import styles from '../../styles/components/tooltip.module.css';

type Placement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  children: ReactNode;
  content: string;
  placement?: Placement;
}

const placementClassMap: Record<Placement, string> = {
  top: styles.placementTop,
  bottom: styles.placementBottom,
  left: styles.placementLeft,
  right: styles.placementRight,
};

export default function Tooltip({ children, content, placement = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipClasses = [styles.tooltip, placementClassMap[placement]].join(' ');

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div className={tooltipClasses}>{content}</div>}
    </div>
  );
}
