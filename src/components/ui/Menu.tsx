import { useState, useRef, useEffect, ReactNode } from 'react';
import styles from './Menu.module.css';

interface MenuProps {
  trigger: ReactNode;
  children: ReactNode;
}

export const Menu = ({ trigger, children }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.menu} ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className={styles.menuList} onClick={handleItemClick}>
          {children}
        </div>
      )}
    </div>
  );
};

interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  color?: string;
}

export const MenuItem = ({ children, onClick, icon, color }: MenuItemProps) => (
  <button
    className={styles.menuItem}
    onClick={() => {
      onClick?.();
    }}
    style={color ? { color } : undefined}
  >
    {icon && <span className={styles.menuItemIcon}>{icon}</span>}
    {children}
  </button>
);

interface MenuButtonProps {
  children: ReactNode;
  className?: string;
}

export const MenuButton = ({ children, className }: MenuButtonProps) => (
  <button className={`${styles.menuButton} ${className || ''}`}>
    {children}
  </button>
);

export const MenuDivider = () => <div className={styles.menuDivider} />;
