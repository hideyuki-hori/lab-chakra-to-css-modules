import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui';
import { Alert, UserAvatar } from '../components/common';
import { FormInput, FormTextarea } from '../components/form';
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
        setPreviewImage(reader.result?.toString() || null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>プロフィール</h1>

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
                  title="更新成功!"
                  description="プロフィールが正常に更新されました。"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.mainContent}>
            <div className={styles.sidebar}>
              <div className={styles.sidebarContent}>
                <motion.div
                  className={styles.avatarWrapper}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <UserAvatar
                    size="2xl"
                    name="山田太郎"
                    src={previewImage || undefined}
                  />
                </motion.div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles.hiddenInput}
                  id="avatar-upload"
                />
                <label htmlFor="avatar-upload">
                  <Button variant="primary" size="sm" className={styles.uploadButton}>
                    画像をアップロード
                  </Button>
                </label>
                <div className={styles.statusSection}>
                  <span className={styles.statusLabel}>ステータス</span>
                  <div className={styles.statusBadges}>
                    <span className={`${styles.badge} ${styles.badgeGreen}`}>アクティブ</span>
                    <span className={`${styles.badge} ${styles.badgeBlue}`}>プレミアム</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formCard}>
                  <FormInput
                    label="名前"
                    isRequired
                    {...register('name')}
                  />
                  <FormInput
                    label="メールアドレス"
                    type="email"
                    isRequired
                    {...register('email')}
                  />
                  <FormInput
                    label="電話番号"
                    type="tel"
                    {...register('phone')}
                  />
                  <FormTextarea
                    label="自己紹介"
                    rows={5}
                    {...register('bio')}
                  />
                  <div className={styles.formActions}>
                    <Button variant="outline" type="button">キャンセル</Button>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="primary" type="submit">保存</Button>
                    </motion.div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className={styles.achievementsCard}>
            <h2 className={styles.achievementsTitle}>実績バッジ</h2>
            <div className={styles.achievementsList}>
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className={`${styles.achievementItem} ${index === 0 ? styles.achievementItemFirst : ''}`}
                >
                  <p className={styles.achievementCount}>{achievement.count}</p>
                  <p className={styles.achievementLabel}>{achievement.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>最近のアクティビティ</h2>
            <div className={styles.activityList}>
              <div className={styles.activityItem}>
                <span className={styles.activityText}>「新規プロジェクト立ち上げ」タスクを完了</span>
                <span className={styles.activityTime}>2時間前</span>
              </div>
              <div className={styles.activityItem}>
                <span className={styles.activityText}>チームメンバー3名を追加</span>
                <span className={styles.activityTime}>5時間前</span>
              </div>
              <div className={styles.activityItem}>
                <span className={styles.activityText}>「デザインレビュー」にコメントを追加</span>
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
