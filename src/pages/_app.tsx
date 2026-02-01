import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import theme from '../theme';
import { AuthProvider } from '../contexts/AuthContext';
import AuthGuard from '../components/auth/AuthGuard';
import '../styles/globals.css';

const PUBLIC_PAGES = ['/login'];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPublicPage = PUBLIC_PAGES.includes(router.pathname);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Toaster position="top-right" />
        {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        )}
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
