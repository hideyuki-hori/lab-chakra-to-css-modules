import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Menu.module.css';

interface MenuContextValue {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be used within a Menu');
  }
  return context;
}

export interface MenuProps {
  children: React.ReactNode;
}

export function Menu({ children }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <MenuContext.Provider value={{ isOpen, onOpen, onClose, triggerRef }}>
      <div className={styles.menu}>{children}</div>
    </MenuContext.Provider>
  );
}

export interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function MenuButton({ children, className, onClick, ...props }: MenuButtonProps) {
  const { isOpen, onOpen, onClose, triggerRef } = useMenuContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
    onClick?.(e);
  };

  const classNames = [styles.menuButton, className].filter(Boolean).join(' ');

  return (
    <button
      ref={triggerRef}
      type="button"
      className={classNames}
      onClick={handleClick}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      {...props}
    >
      {children}
    </button>
  );
}

export interface MenuListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MenuList({ children, className, ...props }: MenuListProps) {
  const { isOpen, onClose, triggerRef } = useMenuContext();
  const listRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen, triggerRef]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const classNames = [styles.menuList, className].filter(Boolean).join(' ');

  const menuList = (
    <div
      ref={listRef}
      className={classNames}
      role="menu"
      style={{ top: position.top, left: position.left }}
      {...props}
    >
      {children}
    </div>
  );

  return createPortal(menuList, document.body);
}

export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export function MenuItem({ children, className, icon, onClick, ...props }: MenuItemProps) {
  const { onClose } = useMenuContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    onClose();
  };

  const classNames = [styles.menuItem, className].filter(Boolean).join(' ');

  return (
    <button type="button" className={classNames} role="menuitem" onClick={handleClick} {...props}>
      {icon && <span className={styles.menuItemIcon}>{icon}</span>}
      {children}
    </button>
  );
}

export interface MenuDividerProps extends React.HTMLAttributes<HTMLHRElement> {}

export function MenuDivider({ className, ...props }: MenuDividerProps) {
  const classNames = [styles.menuDivider, className].filter(Boolean).join(' ');
  return <hr className={classNames} {...props} />;
}

export default Menu;
