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
  useColorModeValue,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const MotionBox = motion(Box);

export default function Login() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

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
    <Box minH="100vh" bg={bgColor} display="flex" alignItems="center" justifyContent="center" p={4}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        w="full"
        maxW="md"
      >
        <Box bg={cardBg} p={8} borderRadius="xl" boxShadow="xl" border="1px" borderColor="gray.200">
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Heading size="lg" color="primary.600" mb={2}>
                TaskFlow
              </Heading>
              <Text color="gray.600">
                アカウントにログイン
              </Text>
            </Box>

            {error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <Button
              variant="outline"
              size="lg"
              w="full"
              leftIcon={<FcGoogle size={20} />}
              onClick={handleGoogleSignIn}
              isLoading={loading}
              style={{ borderWidth: '2px' }}
            >
              Googleでログイン
            </Button>
          </VStack>
        </Box>
      </MotionBox>
    </Box>
  );
}
