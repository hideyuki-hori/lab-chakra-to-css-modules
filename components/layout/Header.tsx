import {
  Box,
  Flex,
  HStack,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiBell, FiSettings, FiLogOut, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'ユーザー';

  return (
    <Box
      position="fixed"
      top={0}
      left="250px"
      right={0}
      h="64px"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      px={6}
      zIndex={9}
    >
      <Flex h="full" align="center" justify="space-between">
        <Box>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
            ようこそ、{displayName}さん
          </Text>
          <Text fontSize="sm" color="gray.500">
            今日も良い一日を
          </Text>
        </Box>

        <HStack spacing={4}>
          <IconButton
            aria-label="通知"
            icon={<FiBell />}
            variant="ghost"
            position="relative"
            size="lg"
          >
            <Badge
              position="absolute"
              top="8px"
              right="8px"
              colorScheme="red"
              borderRadius="full"
              w="18px"
              h="18px"
              fontSize="xs"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              3
            </Badge>
          </IconButton>

          <Menu>
            <MenuButton>
              <HStack spacing={3} cursor="pointer">
                <Box textAlign="right">
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">
                    {displayName}
                  </Text>
                  <HStack spacing={1} justify="flex-end">
                    <Badge colorScheme="green" fontSize="xs" px={2}>
                      オンライン
                    </Badge>
                  </HStack>
                </Box>
                <Avatar
                  size="sm"
                  name={displayName}
                  src={user?.photoURL || undefined}
                />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />} onClick={() => router.push('/profile')}>
                プロフィール
              </MenuItem>
              <MenuItem icon={<FiSettings />} onClick={() => router.push('/settings')}>
                設定
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<FiLogOut />} color="red.500" onClick={handleLogout}>
                ログアウト
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}
