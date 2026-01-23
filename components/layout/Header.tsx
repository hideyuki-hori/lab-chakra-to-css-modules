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
import { mockUsers } from '../../lib/mockData';

export default function Header() {
  const currentUser = mockUsers[0];
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'away':
        return 'yellow';
      case 'offline':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'オンライン';
      case 'away':
        return '離席中';
      case 'offline':
        return 'オフライン';
      default:
        return status;
    }
  };

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
            ようこそ、{currentUser.name}さん
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
                    {currentUser.name}
                  </Text>
                  <HStack spacing={1} justify="flex-end">
                    <Badge
                      colorScheme={getStatusColor(currentUser.status)}
                      fontSize="xs"
                      px={2}
                    >
                      {getStatusLabel(currentUser.status)}
                    </Badge>
                  </HStack>
                </Box>
                <Avatar
                  size="sm"
                  name={currentUser.name}
                  src={currentUser.avatar}
                />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />}>
                プロフィール
              </MenuItem>
              <MenuItem icon={<FiSettings />}>
                設定
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<FiLogOut />} color="red.500">
                ログアウト
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}
