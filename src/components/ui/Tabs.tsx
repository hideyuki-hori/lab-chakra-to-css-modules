import React, { createContext, useContext, useState } from 'react';
import styles from './Tabs.module.css';

interface TabsContextValue {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  variant: TabsVariant;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs');
  }
  return context;
}

export type TabsVariant = 'line' | 'enclosed' | 'soft-rounded';

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  defaultIndex?: number;
  index?: number;
  onChange?: (index: number) => void;
  variant?: TabsVariant;
}

export function Tabs({
  children,
  className,
  defaultIndex = 0,
  index,
  onChange,
  variant = 'line',
  ...props
}: TabsProps) {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);

  const activeIndex = index !== undefined ? index : internalIndex;

  const setActiveIndex = (newIndex: number) => {
    if (index === undefined) {
      setInternalIndex(newIndex);
    }
    onChange?.(newIndex);
  };

  const classNames = [styles.tabs, className].filter(Boolean).join(' ');

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex, variant }}>
      <div className={classNames} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TabList({ children, className, ...props }: TabListProps) {
  const { variant } = useTabsContext();
  const classNames = [styles.tabList, styles[variant], className].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="tablist" {...props}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { index } as { index: number })
          : child
      )}
    </div>
  );
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  index?: number;
  isDisabled?: boolean;
}

export function Tab({ children, className, index = 0, isDisabled = false, ...props }: TabProps) {
  const { activeIndex, setActiveIndex, variant } = useTabsContext();
  const isActive = activeIndex === index;

  const classNames = [
    styles.tab,
    styles[variant],
    isActive ? styles.active : '',
    isDisabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="tab"
      className={classNames}
      aria-selected={isActive}
      disabled={isDisabled}
      onClick={() => !isDisabled && setActiveIndex(index)}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabPanelsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TabPanels({ children, className, ...props }: TabPanelsProps) {
  const { activeIndex } = useTabsContext();
  const classNames = [styles.tabPanels, className].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { index, isActive: activeIndex === index } as {
              index: number;
              isActive: boolean;
            })
          : child
      )}
    </div>
  );
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number;
  isActive?: boolean;
}

export function TabPanel({ children, className, isActive = false, ...props }: TabPanelProps) {
  const classNames = [styles.tabPanel, className].filter(Boolean).join(' ');

  if (!isActive) return null;

  return (
    <div className={classNames} role="tabpanel" {...props}>
      {children}
    </div>
  );
}

export default Tabs;
