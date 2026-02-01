import { useState, ReactNode, createContext, useContext } from 'react';
import styles from './Tabs.module.css';

interface TabsContextValue {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

interface TabsProps {
  children: ReactNode;
  defaultIndex?: number;
  index?: number;
  onChange?: (index: number) => void;
}

export const Tabs = ({ children, defaultIndex = 0, index, onChange }: TabsProps) => {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const activeIndex = index !== undefined ? index : internalIndex;

  const setActiveIndex = (newIndex: number) => {
    if (index === undefined) {
      setInternalIndex(newIndex);
    }
    onChange?.(newIndex);
  };

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className={styles.tabs}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabListProps {
  children: ReactNode;
}

export const TabList = ({ children }: TabListProps) => {
  return <div className={styles.tabList}>{children}</div>;
};

interface TabProps {
  children: ReactNode;
  index?: number;
}

export const Tab = ({ children, index = 0 }: TabProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const isActive = context.activeIndex === index;

  return (
    <button
      className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
      onClick={() => context.setActiveIndex(index)}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </button>
  );
};

interface TabPanelsProps {
  children: ReactNode;
}

export const TabPanels = ({ children }: TabPanelsProps) => {
  return <div className={styles.tabPanels}>{children}</div>;
};

interface TabPanelProps {
  children: ReactNode;
  index?: number;
}

export const TabPanel = ({ children, index = 0 }: TabPanelProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  if (context.activeIndex !== index) return null;

  return (
    <div className={styles.tabPanel} role="tabpanel">
      {children}
    </div>
  );
};
