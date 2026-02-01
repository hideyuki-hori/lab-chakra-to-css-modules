import { useState, useRef, useEffect, ReactElement } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { IconType } from 'react-icons';
import styles from '../../styles/components/action-menu.module.css';

interface ActionItem {
  label: string;
  icon?: IconType;
  onClick: () => void;
  color?: string;
  isDividerBefore?: boolean;
}

interface ActionMenuProps {
  items: ActionItem[];
  ariaLabel?: string;
  icon?: ReactElement;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClassMap = {
  sm: styles.triggerSm,
  md: styles.triggerMd,
  lg: styles.triggerLg,
};

export default function ActionMenu({
  items,
  ariaLabel = 'アクション',
  icon,
  size = 'sm',
}: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerClasses = [styles.trigger, sizeClassMap[size]].join(' ');

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        className={triggerClasses}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={ariaLabel}
      >
        {icon || <FiMoreVertical />}
      </button>
      {isOpen && (
        <div className={styles.menu}>
          {items.map((item, index) => (
            <div key={index}>
              {item.isDividerBefore && <div className={styles.divider} />}
              <button
                className={styles.menuItem}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                style={item.color ? { color: item.color } : undefined}
              >
                {item.icon && <item.icon className={styles.menuItemIcon} />}
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
