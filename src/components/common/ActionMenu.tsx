import { useState, useRef, useEffect, ReactElement } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { IconType } from 'react-icons';
import styles from '../../styles/components/common/ActionMenu.module.css';

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
  variant?: 'ghost' | 'outline' | 'solid';
}

const sizeClasses = {
  sm: styles.triggerSm,
  md: styles.triggerMd,
  lg: styles.triggerLg,
};

const variantClasses = {
  ghost: styles.triggerGhost,
  outline: styles.triggerOutline,
  solid: styles.triggerSolid,
};

export default function ActionMenu({
  items,
  ariaLabel = 'アクション',
  icon,
  size = 'sm',
  variant = 'ghost',
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const triggerClasses = [
    styles.trigger,
    sizeClasses[size],
    variantClasses[variant],
  ].join(' ');

  const menuClasses = [styles.menu, isOpen && styles.menuOpen]
    .filter(Boolean)
    .join(' ');

  const handleItemClick = (item: ActionItem) => {
    item.onClick();
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        className={triggerClasses}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {icon || <FiMoreVertical />}
      </button>
      <div className={menuClasses} role="menu">
        {items.map((item, index) => (
          <div key={index}>
            {item.isDividerBefore && <div className={styles.divider} />}
            <button
              className={styles.menuItem}
              onClick={() => handleItemClick(item)}
              style={item.color ? { color: item.color } : undefined}
              role="menuitem"
            >
              {item.icon && <item.icon className={styles.menuItemIcon} />}
              {item.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
