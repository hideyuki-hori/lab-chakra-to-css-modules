import { useState } from 'react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Alert from '../components/common/Alert';
import styles from '../styles/pages/login.module.css';

export default function Login() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);

    try {
      await signInWithGoogle();
      router.push('/');
    } catch {
      setError('Googleログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.cardWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1 className={styles.title}>TaskFlow</h1>
              <p className={styles.subtitle}>アカウントにログイン</p>
            </div>

            {error && (
              <Alert status="error" description={error} />
            )}

            <button
              className={styles.googleButton}
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <FcGoogle size={20} />
              {loading ? 'ログイン中...' : 'Googleでログイン'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
