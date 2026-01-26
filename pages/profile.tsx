import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout/Layout';
import styles from '../styles/pages/profile.module.css';

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  bio: string;
}

const Profile = () => {
  const { register, handleSubmit } = useForm<ProfileForm>({
    defaultValues: {
      name: '山田太郎',
      email: 'yamada@example.com',
      phone: '090-1234-5678',
      bio: 'プロジェクトマネージャーとして5年の経験があります。チームワークを大切にし、効率的なタスク管理を心がけています。',
    },
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const achievements = [
    { id: 1, label: 'プロジェクト完了', count: 25 },
    { id: 2, label: 'タスク達成', count: 150 },
    { id: 3, label: 'チーム貢献', count: 50 },
    { id: 4, label: '連続ログイン', count: 30 },
  ];

  const onSubmit = (data: ProfileForm) => {
    console.log('Profile updated:', data);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.vstack}>
          <h1 className={styles.pageTitle}>プロフィール</h1>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.alert}>
                  <span className={styles.alertIcon}>✓</span>
                  <span className={styles.alertTitle}>更新成功！</span>
                  <span className={styles.alertDescription}>
                    プロフィールが正常に更新されました。
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.mainContent}>
            <div className={styles.sidePanel}>
              <div className={styles.sidePanelContent}>
                <motion.div
                  className={styles.avatar}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="プロフィール画像"
                      className={styles.avatarImage}
                    />
                  ) : (
                    '山'
                  )}
                </motion.div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles.fileInput}
                  id="avatar-upload"
                />
                <label htmlFor="avatar-upload" className={styles.uploadButton}>
                  画像をアップロード
                </label>
                <div className={styles.statusSection}>
                  <span className={styles.statusTitle}>ステータス</span>
                  <div className={styles.badgeContainer}>
                    <span className={`${styles.badge} ${styles.badgeGreen}`}>
                      アクティブ
                    </span>
                    <span className={`${styles.badge} ${styles.badgeBlue}`}>
                      プレミアム
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formPanel}>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formControl}>
                  <label className={`${styles.label} ${styles.required}`}>
                    名前
                  </label>
                  <input {...register('name')} className={styles.input} />
                </div>

                <div className={styles.formControl}>
                  <label className={`${styles.label} ${styles.required}`}>
                    メールアドレス
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formControl}>
                  <label className={styles.label}>電話番号</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formControl}>
                  <label className={styles.label}>自己紹介</label>
                  <textarea
                    {...register('bio')}
                    rows={5}
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.buttonGroup}>
                  <button type="button" className={styles.buttonOutline}>
                    キャンセル
                  </button>
                  <motion.div
                    className={styles.submitButtonWrapper}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button type="submit" className={styles.buttonPrimary}>
                      保存
                    </button>
                  </motion.div>
                </div>
              </form>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>実績バッジ</h2>
            <div className={styles.achievementsGrid}>
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={styles.achievementCard}>
                    <div className={styles.achievementCount}>
                      {achievement.count}
                    </div>
                    <div className={styles.achievementLabel}>
                      {achievement.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>最近のアクティビティ</h2>
            <div className={styles.activityList}>
              <div className={styles.activityItem}>
                <span className={styles.activityText}>
                  「新規プロジェクト立ち上げ」タスクを完了
                </span>
                <span className={styles.activityTime}>2時間前</span>
              </div>
              <div className={styles.activityItem}>
                <span className={styles.activityText}>
                  チームメンバー3名を追加
                </span>
                <span className={styles.activityTime}>5時間前</span>
              </div>
              <div className={styles.activityItem}>
                <span className={styles.activityText}>
                  「デザインレビュー」にコメントを追加
                </span>
                <span className={styles.activityTime}>1日前</span>
              </div>
              <div className={styles.activityItem}>
                <span className={styles.activityText}>プロフィールを更新</span>
                <span className={styles.activityTime}>3日前</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
