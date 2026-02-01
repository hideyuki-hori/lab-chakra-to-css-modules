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
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@/src/components/ui';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout/Layout';
import { teamMembers } from '../lib/mockData';
import styles from '../styles/pages/team.module.css';

interface NewMemberForm {
  name: string;
  email: string;
  role: string;
}

const Team = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<NewMemberForm>();

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = (data: NewMemberForm) => {
    alert(`${data.name}さんを追加しました`);
    reset();
    onClose();
  };

  const handleMemberAction = (action: string, memberName: string) => {
    alert(`${memberName}さんに対して${action}を実行しました`);
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
          <HStack justify="space-between" className={styles.pageHeader}>
            <Text fontSize="3xl" fontWeight="bold" className={styles.pageTitle}>
              チームメンバー
            </Text>
            <Button colorScheme="blue" onClick={onOpen} className={styles.addButton}>
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
              <motion.div
                key={member.id}
                className={styles.memberCard}
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
                    <Text fontSize="sm" color="var(--color-gray-600)">
                      {member.email}
                    </Text>
                    <Text fontSize="sm" color="var(--color-gray-500)">
                      担当タスク: {member.taskCount}件
                    </Text>
                  </VStack>
                  <Menu>
                    <MenuButton
                      className={styles.menuButton}
                      aria-label="Options"
                    >
                      ⋮
                    </MenuButton>
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
              </motion.div>
            ))}
          </SimpleGrid>
        </VStack>

        <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
              <Button variant="ghost" style={{ marginRight: 'var(--spacing-3)' }} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme="blue" type="submit">
                追加
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </Box>
    </Layout>
  );
};

export default Team;
