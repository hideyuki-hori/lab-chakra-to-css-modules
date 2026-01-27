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
        <div className={styles.pageStack}>
          <h1 className={styles.pageTitle}>プロフィール</h1>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.alertSuccess}
              >
                <svg className={styles.alertIcon} width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className={styles.alertTitle}>更新成功！</span>
                <span className={styles.alertDescription}>
                  プロフィールが正常に更新されました。
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.mainContent}>
            <div className={styles.profileCard}>
              <div className={styles.profileCardContent}>
                {previewImage ? (
                  <motion.img
                    src={previewImage}
                    alt="山田太郎"
                    className={styles.avatarImage}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                ) : (
                  <motion.div
                    className={styles.avatar}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    山
                  </motion.div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles.hiddenInput}
                  id="avatar-upload"
                />
                <label htmlFor="avatar-upload" className={styles.uploadButton}>
                  画像をアップロード
                </label>
                <div className={styles.statusSection}>
                  <p className={styles.statusTitle}>ステータス</p>
                  <div className={styles.badgeRow}>
                    <span className={styles.badgeGreen}>アクティブ</span>
                    <span className={styles.badgeBlue}>プレミアム</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formCard}>
                  <div className={styles.formControl}>
                    <label className={styles.formLabel}>名前</label>
                    <input {...register('name')} className={styles.formInput} />
                  </div>

                  <div className={styles.formControl}>
                    <label className={styles.formLabel}>メールアドレス</label>
                    <input {...register('email')} type="email" className={styles.formInput} />
                  </div>

                  <div className={styles.formControl}>
                    <label className={styles.formLabelOptional}>電話番号</label>
                    <input {...register('phone')} type="tel" className={styles.formInput} />
                  </div>

                  <div className={styles.formControl}>
                    <label className={styles.formLabelOptional}>自己紹介</label>
                    <textarea {...register('bio')} rows={5} className={styles.formTextarea} />
                  </div>

                  <div className={styles.formActions}>
                    <button type="button" className={styles.cancelButton}>キャンセル</button>
                    <motion.div
                      className={styles.saveButtonWrapper}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button type="submit" className={styles.saveButton}>
                        保存
                      </button>
                    </motion.div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className={styles.achievementsCard}>
            <h2 className={styles.achievementsTitle}>実績バッジ</h2>
            <div className={styles.achievementsGrid}>
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className={styles.achievementItem}
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
                <p className={styles.activityText}>「新規プロジェクト立ち上げ」タスクを完了</p>
                <p className={styles.activityTime}>2時間前</p>
              </div>
              <div className={styles.activityItem}>
                <p className={styles.activityText}>チームメンバー3名を追加</p>
                <p className={styles.activityTime}>5時間前</p>
              </div>
              <div className={styles.activityItem}>
                <p className={styles.activityText}>「デザインレビュー」にコメントを追加</p>
                <p className={styles.activityTime}>1日前</p>
              </div>
              <div className={styles.activityItem}>
                <p className={styles.activityText}>プロフィールを更新</p>
                <p className={styles.activityTime}>3日前</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
