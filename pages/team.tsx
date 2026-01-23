import {
  Box,
  Button,
  Input,
  SimpleGrid,
  Avatar,
  Text,
  Badge,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout/Layout';
import { teamMembers } from '../lib/mockData';

const MotionBox = motion(Box);

interface NewMemberForm {
  name: string;
  email: string;
  role: string;
}

const Team = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<NewMemberForm>();
  const toast = useToast();

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = (data: NewMemberForm) => {
    toast({
      title: 'メンバー追加成功',
      description: `${data.name}さんを追加しました`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    reset();
    onClose();
  };

  const handleMemberAction = (action: string, memberName: string) => {
    toast({
      title: `${action}実行`,
      description: `${memberName}さんに対して${action}を実行しました`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case '管理者':
        return 'red';
      case 'メンバー':
        return 'blue';
      case 'ゲスト':
        return 'gray';
      default:
        return 'green';
    }
  };

  return (
    <Layout>
      <Box p={8}>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Text fontSize="3xl" fontWeight="bold">
              チームメンバー
            </Text>
            <Button colorScheme="blue" onClick={onOpen}>
              メンバー追加
            </Button>
          </HStack>

          <Input
            placeholder="メンバーを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="lg"
          />

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredMembers.map((member, index) => (
              <MotionBox
                key={member.id}
                borderWidth="1px"
                borderRadius="lg"
                p={6}
                bg="white"
                shadow="md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <VStack spacing={4}>
                  <Avatar size="xl" name={member.name} />
                  <VStack spacing={2} align="center">
                    <Text fontSize="xl" fontWeight="bold">
                      {member.name}
                    </Text>
                    <Badge colorScheme={getRoleBadgeColor(member.role)}>
                      {member.role}
                    </Badge>
                    <Text fontSize="sm" color="gray.600">
                      {member.email}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      担当タスク: {member.taskCount}件
                    </Text>
                  </VStack>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<span>⋮</span>}
                      variant="outline"
                      size="sm"
                    />
                    <MenuList>
                      <MenuItem
                        onClick={() =>
                          handleMemberAction('プロフィール表示', member.name)
                        }
                      >
                        プロフィール表示
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          handleMemberAction('メッセージ送信', member.name)
                        }
                      >
                        メッセージ送信
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          handleMemberAction('タスク割り当て', member.name)
                        }
                      >
                        タスク割り当て
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="slideInBottom"
          size="lg"
        >
          <ModalOverlay />
          <ModalContent
            as={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <ModalHeader>新しいメンバーを追加</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>名前</FormLabel>
                    <Input {...register('name')} placeholder="山田太郎" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>メールアドレス</FormLabel>
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder="yamada@example.com"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>役割</FormLabel>
                    <Input {...register('role')} placeholder="メンバー" />
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  キャンセル
                </Button>
                <Button colorScheme="blue" type="submit">
                  追加
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
};

export default Team;
