import { useState, useRef, ReactNode } from 'react';
import styles from '../../styles/components/tooltip.module.css';

interface TooltipProps {
  children: ReactNode;
  label: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({ children, label, placement = 'top' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const getPlacementClass = () => {
    switch (placement) {
      case 'bottom':
        return styles.placementBottom;
      case 'left':
        return styles.placementLeft;
      case 'right':
        return styles.placementRight;
      default:
        return styles.placementTop;
    }
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className={`${styles.tooltip} ${getPlacementClass()}`}>
          {label}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
