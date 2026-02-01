import { motion, AnimatePresence } from 'framer-motion';
import { useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { FiCheckCircle } from 'react-icons/fi';
import Layout from '../components/layout/Layout';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../components/ui/Tabs';
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

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>設定</h1>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.alert}>
                <FiCheckCircle className={styles.alertIcon} />
                <div>
                  <p className={styles.alertTitle}>保存成功！</p>
                  <p className={styles.alertDescription}>
                    設定が正常に保存されました。
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Tabs>
          <TabList>
            <Tab index={0}>一般</Tab>
            <Tab index={1}>通知</Tab>
            <Tab index={2}>セキュリティ</Tab>
            <Tab index={3}>表示</Tab>
          </TabList>

          <TabPanels>
            <TabPanel index={0}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.formCard}>
                    <div className={styles.formControl}>
                      <label className={styles.formLabel}>ユーザー名</label>
                      <input
                        {...register('username')}
                        defaultValue="山田太郎"
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.formControl}>
                      <label className={styles.formLabel}>メールアドレス</label>
                      <input
                        {...register('email')}
                        type="email"
                        defaultValue="yamada@example.com"
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.formControl}>
                      <label className={styles.formLabel}>言語</label>
                      <select {...register('language')} defaultValue="ja" className={styles.select}>
                        <option value="ja">日本語</option>
                        <option value="en">English</option>
                        <option value="zh">中文</option>
                      </select>
                    </div>

                    <div className={styles.formControl}>
                      <label className={styles.formLabel}>タイムゾーン</label>
                      <select
                        {...register('timezone')}
                        defaultValue="Asia/Tokyo"
                        className={styles.select}
                      >
                        <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                        <option value="America/New_York">America/New_York (GMT-5)</option>
                        <option value="Europe/London">Europe/London (GMT+0)</option>
                      </select>
                    </div>

                    <div className={styles.buttonRow}>
                      <button type="button" className={`${styles.button} ${styles.buttonOutline}`}>
                        キャンセル
                      </button>
                      <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>
                        保存
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </TabPanel>

            <TabPanel index={1}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.formCard}>
                  <div>
                    <h3 className={styles.sectionTitle}>通知方法</h3>
                    <div className={styles.notificationList}>
                      <div className={styles.formControlInline}>
                        <label className={styles.formLabel}>メール通知</label>
                        <label className={styles.switch}>
                          <input
                            type="checkbox"
                            checked={notifications.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleNotificationChange('email', e.target.checked)
                            }
                            className={styles.switchInput}
                          />
                          <span className={styles.switchSlider} />
                        </label>
                      </div>
                      <div className={styles.formControlInline}>
                        <label className={styles.formLabel}>プッシュ通知</label>
                        <label className={styles.switch}>
                          <input
                            type="checkbox"
                            checked={notifications.push}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleNotificationChange('push', e.target.checked)
                            }
                            className={styles.switchInput}
                          />
                          <span className={styles.switchSlider} />
                        </label>
                      </div>
                      <div className={styles.formControlInline}>
                        <label className={styles.formLabel}>SMS通知</label>
                        <label className={styles.switch}>
                          <input
                            type="checkbox"
                            checked={notifications.sms}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleNotificationChange('sms', e.target.checked)
                            }
                            className={styles.switchInput}
                          />
                          <span className={styles.switchSlider} />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className={styles.sectionTitle}>通知内容</h3>
                    <div className={styles.notificationList}>
                      <label className={styles.checkbox}>
                        <input
                          type="checkbox"
                          checked={notifications.taskUpdates}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleNotificationChange('taskUpdates', e.target.checked)
                          }
                          className={styles.checkboxInput}
                        />
                        タスクの更新
                      </label>
                      <label className={styles.checkbox}>
                        <input
                          type="checkbox"
                          checked={notifications.comments}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleNotificationChange('comments', e.target.checked)
                          }
                          className={styles.checkboxInput}
                        />
                        コメント
                      </label>
                      <label className={styles.checkbox}>
                        <input
                          type="checkbox"
                          checked={notifications.mentions}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleNotificationChange('mentions', e.target.checked)
                          }
                          className={styles.checkboxInput}
                        />
                        メンション
                      </label>
                    </div>
                  </div>

                  <div className={styles.buttonRow}>
                    <button type="button" className={`${styles.button} ${styles.buttonOutline}`}>
                      キャンセル
                    </button>
                    <button
                      type="button"
                      className={`${styles.button} ${styles.buttonPrimary}`}
                      onClick={handleSubmit(onSubmit)}
                    >
                      保存
                    </button>
                  </div>
                </div>
              </motion.div>
            </TabPanel>

            <TabPanel index={2}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.formCard}>
                  <div className={styles.formControl}>
                    <label className={styles.formLabel}>現在のパスワード</label>
                    <input
                      type="password"
                      placeholder="現在のパスワード"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formControl}>
                    <label className={styles.formLabel}>新しいパスワード</label>
                    <input
                      type="password"
                      placeholder="新しいパスワード"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formControl}>
                    <label className={styles.formLabel}>パスワード確認</label>
                    <input
                      type="password"
                      placeholder="パスワード確認"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.sectionDivider}>
                    <h3 className={styles.sectionTitle}>2段階認証</h3>
                    <div className={styles.formControlInline}>
                      <label className={styles.formLabel}>2段階認証を有効にする</label>
                      <label className={styles.switch}>
                        <input type="checkbox" className={styles.switchInput} />
                        <span className={styles.switchSlider} />
                      </label>
                    </div>
                  </div>

                  <div className={styles.buttonRow}>
                    <button type="button" className={`${styles.button} ${styles.buttonOutline}`}>
                      キャンセル
                    </button>
                    <button type="button" className={`${styles.button} ${styles.buttonPrimary}`}>
                      保存
                    </button>
                  </div>
                </div>
              </motion.div>
            </TabPanel>

            <TabPanel index={3}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.formCard}>
                  <div className={styles.formControl}>
                    <label className={styles.formLabel}>テーマ</label>
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
                        ライトモード
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
                        ダークモード
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
                        自動（システム設定に従う）
                      </label>
                    </div>
                  </div>

                  <div className={styles.formControl}>
                    <label className={styles.formLabel}>フォントサイズ</label>
                    <select defaultValue="medium" className={styles.select}>
                      <option value="small">小</option>
                      <option value="medium">中</option>
                      <option value="large">大</option>
                    </select>
                  </div>

                  <div className={styles.formControlInline}>
                    <label className={styles.formLabel}>コンパクト表示</label>
                    <label className={styles.switch}>
                      <input type="checkbox" className={styles.switchInput} />
                      <span className={styles.switchSlider} />
                    </label>
                  </div>

                  <div className={styles.formControlInline}>
                    <label className={styles.formLabel}>アニメーション効果</label>
                    <label className={styles.switch}>
                      <input type="checkbox" defaultChecked className={styles.switchInput} />
                      <span className={styles.switchSlider} />
                    </label>
                  </div>

                  <div className={styles.buttonRow}>
                    <button type="button" className={`${styles.button} ${styles.buttonOutline}`}>
                      キャンセル
                    </button>
                    <button
                      type="button"
                      className={`${styles.button} ${styles.buttonPrimary}`}
                      onClick={handleSubmit(onSubmit)}
                    >
                      保存
                    </button>
                  </div>
                </div>
              </motion.div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
