import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  FiHome,
  FiFolderPlus,
  FiCheckSquare,
  FiCalendar,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiUser,
} from 'react-icons/fi';
import styles from '../../styles/components/layout.module.css';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: 'ダッシュボード', href: '/', icon: FiHome },
  { label: 'プロジェクト', href: '/projects', icon: FiFolderPlus },
  { label: 'タスク', href: '/tasks', icon: FiCheckSquare },
  { label: 'カレンダー', href: '/calendar', icon: FiCalendar },
  { label: 'チーム', href: '/team', icon: FiUsers },
  { label: 'レポート', href: '/reports', icon: FiBarChart2 },
  { label: '設定', href: '/settings', icon: FiSettings },
  { label: 'プロフィール', href: '/profile', icon: FiUser },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebarNav}>
        <div className={styles.sidebarLogo}>
          <p className={styles.sidebarTitle}>TaskFlow</p>
          <p className={styles.sidebarSubtitle}>プロジェクト管理</p>
        </div>

        {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          const Icon = item.icon;

          return (
            <NextLink key={item.href} href={item.href} className={styles.navItem}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'relative' }}
              >
                <div
                  className={`${styles.navItemInner} ${isActive ? styles.navItemActive : ''}`}
                >
                  <Icon className={styles.navIcon} />
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="activeTab"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </motion.div>
            </NextLink>
          );
        })}
      </div>
    </nav>
  );
}
