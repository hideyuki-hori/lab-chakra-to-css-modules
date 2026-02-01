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

  return (
    <div className={styles.menu} ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className={styles.menuList}>
          {children}
        </div>
      )}
    </div>
  );
};

interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
}

export const MenuItem = ({ children, onClick }: MenuItemProps) => (
  <button
    className={styles.menuItem}
    onClick={() => {
      onClick?.();
    }}
  >
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
