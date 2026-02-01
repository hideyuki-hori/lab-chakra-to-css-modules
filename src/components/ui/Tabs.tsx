import {
  forwardRef,
  HTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
  KeyboardEvent,
  useRef,
  useEffect,
} from 'react';
import styles from './Tabs.module.css';

export type TabsVariant = 'line' | 'enclosed';

interface TabsContextValue {
  index: number;
  setIndex: (index: number) => void;
  variant: TabsVariant;
  registerTab: (index: number, ref: HTMLButtonElement | null) => void;
  tabRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = (): TabsContextValue => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  index?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  variant?: TabsVariant;
  children?: ReactNode;
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children?: ReactNode;
  isDisabled?: boolean;
}

export interface TabPanelsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      index: controlledIndex,
      defaultIndex = 0,
      onChange,
      variant = 'line',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [internalIndex, setInternalIndex] = useState(defaultIndex);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const isControlled = controlledIndex !== undefined;
    const currentIndex = isControlled ? controlledIndex : internalIndex;

    const setIndex = useCallback(
      (newIndex: number) => {
        if (!isControlled) {
          setInternalIndex(newIndex);
        }
        onChange?.(newIndex);
      },
      [isControlled, onChange]
    );

    const registerTab = useCallback((index: number, ref: HTMLButtonElement | null) => {
      tabRefs.current[index] = ref;
    }, []);

    const classNames = [styles.tabs, className].filter(Boolean).join(' ');

    const contextValue: TabsContextValue = {
      index: currentIndex,
      setIndex,
      variant,
      registerTab,
      tabRefs,
    };

    return (
      <TabsContext.Provider value={contextValue}>
        <div ref={ref} className={classNames} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ children, className, ...props }, ref) => {
    const { variant, tabRefs, setIndex, index: currentIndex } = useTabsContext();

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const tabs = tabRefs.current.filter(Boolean);
        const currentTabIndex = tabs.findIndex((tab) => tab === document.activeElement);

        if (currentTabIndex === -1) return;

        let nextIndex = currentTabIndex;

        if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextIndex = (currentTabIndex + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          nextIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          nextIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          nextIndex = tabs.length - 1;
        }

        if (nextIndex !== currentTabIndex) {
          const nextTab = tabs[nextIndex];
          if (nextTab && !nextTab.disabled) {
            nextTab.focus();
            setIndex(nextIndex);
          }
        }
      },
      [tabRefs, setIndex]
    );

    const variantClass = variant === 'enclosed' ? styles.tabListEnclosed : styles.tabListLine;
    const classNames = [styles.tabList, variantClass, className].filter(Boolean).join(' ');

    let tabIndex = 0;
    const childrenWithIndex = Children.map(children, (child) => {
      if (isValidElement(child) && child.type === Tab) {
        const childElement = child as ReactElement<TabProps & { _index?: number }>;
        const element = cloneElement(childElement, { _index: tabIndex });
        tabIndex++;
        return element;
      }
      return child;
    });

    return (
      <div
        ref={ref}
        role="tablist"
        className={classNames}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {childrenWithIndex}
      </div>
    );
  }
);

TabList.displayName = 'TabList';

interface TabInternalProps extends TabProps {
  _index?: number;
}

const Tab = forwardRef<HTMLButtonElement, TabInternalProps>(
  ({ children, className, isDisabled = false, _index = 0, ...props }, ref) => {
    const { index, setIndex, variant, registerTab } = useTabsContext();
    const internalRef = useRef<HTMLButtonElement | null>(null);

    const isSelected = index === _index;

    useEffect(() => {
      registerTab(_index, internalRef.current);
    }, [_index, registerTab]);

    const handleClick = useCallback(() => {
      if (!isDisabled) {
        setIndex(_index);
      }
    }, [_index, isDisabled, setIndex]);

    const setRefs = useCallback(
      (element: HTMLButtonElement | null) => {
        internalRef.current = element;
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      },
      [ref]
    );

    const variantClass = variant === 'enclosed' ? styles.tabEnclosed : styles.tabLine;
    const classNames = [
      styles.tab,
      variantClass,
      isSelected && styles.tabSelected,
      isDisabled && styles.tabDisabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={setRefs}
        type="button"
        role="tab"
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        tabIndex={isSelected ? 0 : -1}
        className={classNames}
        onClick={handleClick}
        disabled={isDisabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(
  ({ children, className, ...props }, ref) => {
    const { index } = useTabsContext();

    const classNames = [styles.tabPanels, className].filter(Boolean).join(' ');

    const childrenArray = Children.toArray(children);
    const activeChild = childrenArray[index];

    return (
      <div ref={ref} className={classNames} {...props}>
        {activeChild}
      </div>
    );
  }
);

TabPanels.displayName = 'TabPanels';

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.tabPanel, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} role="tabpanel" className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';

export { Tabs, TabList, Tab, TabPanels, TabPanel };
export default Tabs;
