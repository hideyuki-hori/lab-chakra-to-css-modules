import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box minH="100vh" bg="gray.50">
      <Sidebar />
      <Header />
      <Box
        ml="250px"
        mt="64px"
        p={6}
      >
        {children}
      </Box>
    </Box>
  );
}
