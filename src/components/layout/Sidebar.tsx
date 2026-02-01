import { Box, VStack, HStack, Icon, Text, Link as ChakraLink } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  FiHome,
  FiFolderPlus,
  FiCheckSquare,
  FiCalendar,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiUser,
} from 'react-icons/fi';

const MotionBox = motion(Box);

interface NavItem {
  label: string;
  href: string;
  icon: any;
}

const navItems: NavItem[] = [
  { label: 'ダッシュボード', href: '/', icon: FiHome },
  { label: 'プロジェクト', href: '/projects', icon: FiFolderPlus },
  { label: 'タスク', href: '/tasks', icon: FiCheckSquare },
  { label: 'カレンダー', href: '/calendar', icon: FiCalendar },
  { label: 'チーム', href: '/team', icon: FiUsers },
  { label: 'レポート', href: '/reports', icon: FiBarChart2 },
  { label: '設定', href: '/settings', icon: FiSettings },
  { label: 'プロフィール', href: '/profile', icon: FiUser },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <Box
      as="nav"
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      w="250px"
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      p={4}
      zIndex={10}
    >
      <VStack align="stretch" spacing={1}>
        <Box mb={6} px={3}>
          <Text fontSize="2xl" fontWeight="bold" color="primary.600">
            TaskFlow
          </Text>
          <Text fontSize="sm" color="gray.500">
            プロジェクト管理
          </Text>
        </Box>

        {navItems.map((item) => {
          const isActive = router.pathname === item.href;

          return (
            <NextLink key={item.href} href={item.href} passHref legacyBehavior>
              <ChakraLink
                _hover={{ textDecoration: 'none' }}
                position="relative"
              >
                <MotionBox
                  position="relative"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <HStack
                    p={3}
                    borderRadius="md"
                    bg={isActive ? 'primary.50' : 'transparent'}
                    color={isActive ? 'primary.600' : 'gray.700'}
                    _hover={{
                      bg: isActive ? 'primary.50' : 'gray.50',
                    }}
                    fontWeight={isActive ? 'semibold' : 'medium'}
                    spacing={3}
                  >
                    <Icon as={item.icon} boxSize={5} />
                    <Text fontSize="sm">{item.label}</Text>
                  </HStack>
                  {isActive && (
                    <MotionBox
                      position="absolute"
                      left={0}
                      top={0}
                      bottom={0}
                      w="3px"
                      bg="primary.500"
                      borderRadius="full"
                      layoutId="activeTab"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </MotionBox>
              </ChakraLink>
            </NextLink>
          );
        })}
      </VStack>
    </Box>
  );
}
