import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Box, Spinner, Center } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Center h="100vh" bg="gray.50">
        <Box textAlign="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.500"
            size="xl"
          />
          <Box mt={4} color="gray.600">
            読み込み中...
          </Box>
        </Box>
      </Center>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
