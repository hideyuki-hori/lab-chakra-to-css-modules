import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  VStack,
  Text,
  Heading,
  Alert,
  AlertIcon,
} from '@/src/components/ui';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const MotionDiv = motion.div;

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
    <Box
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-gray-50)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-4)',
      }}
    >
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '28rem' }}
      >
        <Box
          style={{
            backgroundColor: 'white',
            padding: 'var(--spacing-8)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--color-gray-200)',
          }}
        >
          <VStack spacing={6} align="stretch">
            <Box style={{ textAlign: 'center' }}>
              <Heading size="lg" style={{ color: 'var(--color-primary-600)', marginBottom: 'var(--spacing-2)' }}>
                TaskFlow
              </Heading>
              <Text style={{ color: 'var(--color-gray-600)' }}>
                アカウントにログイン
              </Text>
            </Box>

            {error && (
              <Alert status="error">
                <AlertIcon status="error" />
                {error}
              </Alert>
            )}

            <Button
              variant="outline"
              size="lg"
              onClick={handleGoogleSignIn}
              isLoading={loading}
              style={{ width: '100%', borderWidth: '2px' }}
            >
              <FcGoogle size={20} style={{ marginRight: 'var(--spacing-2)' }} />
              Googleでログイン
            </Button>
          </VStack>
        </Box>
      </MotionDiv>
    </Box>
  );
}
