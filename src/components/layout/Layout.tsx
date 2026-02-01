import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from '../../styles/components/layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layoutContainer}>
      <Sidebar />
      <Header />
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
}
