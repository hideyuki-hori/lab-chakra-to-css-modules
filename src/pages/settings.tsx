import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui';
import { Alert } from '../components/common';
import { FormInput, FormSelect } from '../components/form';
import styles from '../styles/pages/settings.module.css';

interface SettingsForm {
  username: string;
  email: string;
  language: string;
  timezone: string;
}

const Settings = () => {
  const { register, handleSubmit } = useForm<SettingsForm>();
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    taskUpdates: true,
    comments: true,
    mentions: true,
  });

  const onSubmit = (data: SettingsForm) => {
    console.log('Settings saved:', data);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { label: '一般', id: 0 },
    { label: '通知', id: 1 },
    { label: 'セキュリティ', id: 2 },
    { label: '表示', id: 3 },
  ];

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>設定</h1>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert
                  status="success"
                  title="保存成功!"
                  description="設定が正常に保存されました。"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.tabs}>
            <div className={styles.tabList}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formCard}>
                  <FormInput
                    label="ユーザー名"
                    defaultValue="山田太郎"
                    {...register('username')}
                  />
                  <FormInput
                    label="メールアドレス"
                    type="email"
                    defaultValue="yamada@example.com"
                    {...register('email')}
                  />
                  <FormSelect
                    label="言語"
                    defaultValue="ja"
                    options={[
                      { value: 'ja', label: '日本語' },
                      { value: 'en', label: 'English' },
                      { value: 'zh', label: '中文' },
                    ]}
                    {...register('language')}
                  />
                  <FormSelect
                    label="タイムゾーン"
                    defaultValue="Asia/Tokyo"
                    options={[
                      { value: 'Asia/Tokyo', label: 'Asia/Tokyo (GMT+9)' },
                      { value: 'America/New_York', label: 'America/New_York (GMT-5)' },
                      { value: 'Europe/London', label: 'Europe/London (GMT+0)' },
                    ]}
                    {...register('timezone')}
                  />
                  <div className={styles.formActions}>
                    <Button variant="outline" type="button">キャンセル</Button>
                    <Button variant="primary" type="submit">保存</Button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.formCard}>
                <div>
                  <h3 className={styles.sectionTitle}>通知方法</h3>
                  <div className={styles.notificationList}>
                    <div className={styles.switchRow}>
                      <span className={styles.switchLabel}>メール通知</span>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          className={styles.switchInput}
                          checked={notifications.email}
                          onChange={(e) => handleNotificationChange('email', e.target.checked)}
                        />
                        <span className={styles.switchSlider} />
                      </label>
                    </div>
                    <div className={styles.switchRow}>
                      <span className={styles.switchLabel}>プッシュ通知</span>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          className={styles.switchInput}
                          checked={notifications.push}
                          onChange={(e) => handleNotificationChange('push', e.target.checked)}
                        />
                        <span className={styles.switchSlider} />
                      </label>
                    </div>
                    <div className={styles.switchRow}>
                      <span className={styles.switchLabel}>SMS通知</span>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          className={styles.switchInput}
                          checked={notifications.sms}
                          onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                        />
                        <span className={styles.switchSlider} />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={styles.sectionTitle}>通知内容</h3>
                  <div className={styles.checkboxList}>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        checked={notifications.taskUpdates}
                        onChange={(e) => handleNotificationChange('taskUpdates', e.target.checked)}
                      />
                      <span className={styles.checkboxLabel}>タスクの更新</span>
                    </label>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        checked={notifications.comments}
                        onChange={(e) => handleNotificationChange('comments', e.target.checked)}
                      />
                      <span className={styles.checkboxLabel}>コメント</span>
                    </label>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        checked={notifications.mentions}
                        onChange={(e) => handleNotificationChange('mentions', e.target.checked)}
                      />
                      <span className={styles.checkboxLabel}>メンション</span>
                    </label>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <Button variant="outline" type="button">キャンセル</Button>
                  <Button variant="primary" onClick={handleSubmit(onSubmit)}>保存</Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.formCard}>
                <FormInput
                  label="現在のパスワード"
                  type="password"
                  placeholder="現在のパスワード"
                />
                <FormInput
                  label="新しいパスワード"
                  type="password"
                  placeholder="新しいパスワード"
                />
                <FormInput
                  label="パスワード確認"
                  type="password"
                  placeholder="パスワード確認"
                />

                <div className={styles.divider}>
                  <h3 className={styles.sectionTitle}>2段階認証</h3>
                  <div className={styles.switchRow}>
                    <span className={styles.switchLabel}>2段階認証を有効にする</span>
                    <label className={styles.switch}>
                      <input type="checkbox" className={styles.switchInput} />
                      <span className={styles.switchSlider} />
                    </label>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <Button variant="outline" type="button">キャンセル</Button>
                  <Button variant="primary">保存</Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.formCard}>
                <div>
                  <h3 className={styles.sectionTitle}>テーマ</h3>
                  <div className={styles.radioGroup}>
                    <label className={styles.radio}>
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={theme === 'light'}
                        onChange={() => setTheme('light')}
                        className={styles.radioInput}
                      />
                      <span className={styles.radioLabel}>ライトモード</span>
                    </label>
                    <label className={styles.radio}>
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={theme === 'dark'}
                        onChange={() => setTheme('dark')}
                        className={styles.radioInput}
                      />
                      <span className={styles.radioLabel}>ダークモード</span>
                    </label>
                    <label className={styles.radio}>
                      <input
                        type="radio"
                        name="theme"
                        value="auto"
                        checked={theme === 'auto'}
                        onChange={() => setTheme('auto')}
                        className={styles.radioInput}
                      />
                      <span className={styles.radioLabel}>自動（システム設定に従う）</span>
                    </label>
                  </div>
                </div>

                <FormSelect
                  label="フォントサイズ"
                  defaultValue="medium"
                  options={[
                    { value: 'small', label: '小' },
                    { value: 'medium', label: '中' },
                    { value: 'large', label: '大' },
                  ]}
                />

                <div className={styles.switchRow}>
                  <span className={styles.switchLabel}>コンパクト表示</span>
                  <label className={styles.switch}>
                    <input type="checkbox" className={styles.switchInput} />
                    <span className={styles.switchSlider} />
                  </label>
                </div>

                <div className={styles.switchRow}>
                  <span className={styles.switchLabel}>アニメーション効果</span>
                  <label className={styles.switch}>
                    <input type="checkbox" className={styles.switchInput} defaultChecked />
                    <span className={styles.switchSlider} />
                  </label>
                </div>

                <div className={styles.formActions}>
                  <Button variant="outline" type="button">キャンセル</Button>
                  <Button variant="primary" onClick={handleSubmit(onSubmit)}>保存</Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
