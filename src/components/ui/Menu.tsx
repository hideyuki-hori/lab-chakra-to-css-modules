import {
  forwardRef,
  HTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  ReactElement,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
  cloneElement,
  isValidElement,
  Children,
} from 'react';
import styles from './Menu.module.css';

interface MenuContextValue {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  menuListRef: React.RefObject<HTMLDivElement | null>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  menuItemsCount: number;
  setMenuItemsCount: (count: number) => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

const useMenuContext = (): MenuContextValue => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be used within a Menu provider');
  }
  return context;
};

export interface MenuProps {
  children?: ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  as?: React.ElementType;
}

export interface MenuListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  icon?: ReactElement;
  color?: string;
  isDisabled?: boolean;
  command?: string;
  'data-index'?: number;
  'data-active'?: boolean;
}

export interface MenuDividerProps extends HTMLAttributes<HTMLDivElement> {}

const Menu = ({ children, isOpen: controlledIsOpen, onOpen: controlledOnOpen, onClose: controlledOnClose }: MenuProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [menuItemsCount, setMenuItemsCount] = useState(0);
  const menuListRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const onOpen = useCallback(() => {
    if (isControlled) {
      controlledOnOpen?.();
    } else {
      setInternalIsOpen(true);
    }
    setActiveIndex(-1);
  }, [isControlled, controlledOnOpen]);

  const onClose = useCallback(() => {
    if (isControlled) {
      controlledOnClose?.();
    } else {
      setInternalIsOpen(false);
    }
    setActiveIndex(-1);
  }, [isControlled, controlledOnClose]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      if (
        menuListRef.current &&
        !menuListRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const contextValue: MenuContextValue = {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    menuListRef,
    buttonRef,
    activeIndex,
    setActiveIndex,
    menuItemsCount,
    setMenuItemsCount,
  };

  return (
    <MenuContext.Provider value={contextValue}>
      <div className={styles.menuContainer}>
        {children}
      </div>
    </MenuContext.Provider>
  );
};

Menu.displayName = 'Menu';

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ children, className, as: Component, onClick, onKeyDown, ...props }, ref) => {
    const { isOpen, onToggle, buttonRef, setActiveIndex, menuItemsCount } = useMenuContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onToggle();
      onClick?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (!isOpen) {
          onToggle();
        }
        setActiveIndex(0);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (!isOpen) {
          onToggle();
        }
        setActiveIndex(menuItemsCount - 1);
      }
      onKeyDown?.(event);
    };

    const mergedRef = useCallback(
      (node: HTMLButtonElement | null) => {
        (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref, buttonRef]
    );

    const classNames = [styles.menuButton, className].filter(Boolean).join(' ');

    if (Component) {
      if (isValidElement(children)) {
        return cloneElement(children, {
          ...props,
          ref: mergedRef,
          onClick: handleClick,
          onKeyDown: handleKeyDown,
          'aria-expanded': isOpen,
          'aria-haspopup': 'menu',
        } as React.HTMLAttributes<HTMLElement>);
      }
      return (
        <Component
          ref={mergedRef}
          className={classNames}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          {...props}
        >
          {children}
        </Component>
      );
    }

    return (
      <button
        ref={mergedRef}
        type="button"
        className={classNames}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        {...props}
      >
        {children}
      </button>
    );
  }
);

MenuButton.displayName = 'MenuButton';

const MenuList = forwardRef<HTMLDivElement, MenuListProps>(
  ({ children, className, ...props }, ref) => {
    const { isOpen, menuListRef, onClose, buttonRef, activeIndex, setActiveIndex, setMenuItemsCount } = useMenuContext();
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const menuItems = Children.toArray(children).filter(
      (child) => isValidElement(child) && child.type === MenuItem
    );

    useEffect(() => {
      setMenuItemsCount(menuItems.length);
    }, [menuItems.length, setMenuItemsCount]);

    useEffect(() => {
      if (isOpen && activeIndex >= 0 && itemRefs.current[activeIndex]) {
        itemRefs.current[activeIndex]?.focus();
      }
    }, [isOpen, activeIndex]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      const itemsCount = menuItems.length;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setActiveIndex(activeIndex < itemsCount - 1 ? activeIndex + 1 : 0);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setActiveIndex(activeIndex > 0 ? activeIndex - 1 : itemsCount - 1);
          break;
        case 'Home':
          event.preventDefault();
          setActiveIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setActiveIndex(itemsCount - 1);
          break;
        case 'Tab':
          event.preventDefault();
          onClose();
          buttonRef.current?.focus();
          break;
      }
    };

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        (menuListRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref, menuListRef]
    );

    if (!isOpen) {
      return null;
    }

    const classNames = [styles.menuList, className].filter(Boolean).join(' ');

    let itemIndex = 0;

    return (
      <div
        ref={mergedRef}
        className={classNames}
        role="menu"
        onKeyDown={handleKeyDown}
        {...props}
      >
        {Children.map(children, (child) => {
          if (isValidElement(child) && child.type === MenuItem) {
            const currentIndex = itemIndex;
            itemIndex++;
            return cloneElement(child, {
              ...child.props,
              ref: (el: HTMLDivElement | null) => {
                itemRefs.current[currentIndex] = el;
              },
              'data-index': currentIndex,
              'data-active': activeIndex === currentIndex,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

MenuList.displayName = 'MenuList';

const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, className, icon, color, isDisabled, command, onClick, style, ...props }, ref) => {
    const { onClose, setActiveIndex } = useMenuContext();

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      onClick?.(event);
      onClose();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!isDisabled) {
          onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
          onClose();
        }
      }
    };

    const handleMouseEnter = () => {
      const index = props['data-index'];
      if (typeof index === 'number') {
        setActiveIndex(index);
      }
    };

    const classNames = [
      styles.menuItem,
      isDisabled && styles.menuItemDisabled,
      props['data-active'] && styles.menuItemActive,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const itemStyle = color ? { ...style, color } : style;

    return (
      <div
        ref={ref}
        className={classNames}
        role="menuitem"
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        aria-disabled={isDisabled}
        style={itemStyle}
        {...props}
      >
        {icon && <span className={styles.menuItemIcon}>{icon}</span>}
        <span className={styles.menuItemContent}>{children}</span>
        {command && <span className={styles.menuItemCommand}>{command}</span>}
      </div>
    );
  }
);

MenuItem.displayName = 'MenuItem';

const MenuDivider = forwardRef<HTMLDivElement, MenuDividerProps>(
  ({ className, ...props }, ref) => {
    const classNames = [styles.menuDivider, className].filter(Boolean).join(' ');

    return <div ref={ref} className={classNames} role="separator" {...props} />;
  }
);

MenuDivider.displayName = 'MenuDivider';

export { Menu, MenuButton, MenuList, MenuItem, MenuDivider, useMenuContext };
export default Menu;
