import { FiBell, FiSettings, FiLogOut, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, MenuItem, MenuDivider } from '../ui/Menu';
import styles from '../../styles/components/layout.module.css';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'ユーザー';

  const getAvatarColor = (name: string) => {
    const colors = [
      'linear-gradient(135deg, #38b2ac, #319795)',
      'linear-gradient(135deg, #ed64a6, #d53f8c)',
      'linear-gradient(135deg, #a0522d, #8b4513)',
      'linear-gradient(135deg, #9f7aea, #805ad5)',
      'linear-gradient(135deg, #ecc94b, #d69e2e)',
      'linear-gradient(135deg, #4299e1, #3182ce)',
      'linear-gradient(135deg, #48bb78, #38a169)',
      'linear-gradient(135deg, #fc8181, #f56565)',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerGreeting}>
          <p className={styles.headerTitle}>ようこそ、{displayName}さん</p>
          <p className={styles.headerSubtitle}>今日も良い一日を</p>
        </div>

        <div className={styles.headerActions}>
          <button className={styles.notificationButton} aria-label="通知">
            <FiBell />
            <span className={styles.notificationBadge}>3</span>
          </button>

          <Menu
            trigger={
              <div className={styles.userMenu}>
                <div className={styles.userInfo}>
                  <p className={styles.userName}>{displayName}</p>
                  <div className={styles.userStatus}>
                    <span className={styles.statusBadge}>オンライン</span>
                  </div>
                </div>
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={displayName}
                    className={styles.avatar}
                  />
                ) : (
                  <div
                    className={styles.avatarPlaceholder}
                    style={{ background: getAvatarColor(displayName) }}
                  >
                    {displayName.charAt(0)}
                  </div>
                )}
              </div>
            }
          >
            <MenuItem icon={<FiUser />} onClick={() => router.push('/profile')}>
              プロフィール
            </MenuItem>
            <MenuItem icon={<FiSettings />} onClick={() => router.push('/settings')}>
              設定
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<FiLogOut />} color="#c53030" onClick={handleLogout}>
              ログアウト
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
}
