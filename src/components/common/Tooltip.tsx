import { ReactNode, useState, useRef, useEffect } from 'react';
import styles from '../../styles/components/common/Tooltip.module.css';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  children: ReactNode;
  content: string;
  placement?: TooltipPlacement;
  isDisabled?: boolean;
}

const placementClasses: Record<TooltipPlacement, string> = {
  top: styles.top,
  bottom: styles.bottom,
  left: styles.left,
  right: styles.right,
};

export default function Tooltip({
  children,
  content,
  placement = 'top',
  isDisabled = false,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (isDisabled) return;
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

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipClasses = [
    styles.tooltip,
    placementClasses[placement],
    isVisible && styles.tooltipVisible,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <span className={styles.trigger}>{children}</span>
      <div className={tooltipClasses} role="tooltip">
        {content}
        <span className={styles.arrow} />
      </div>
    </div>
  );
}
