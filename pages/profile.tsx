import {
  Box,
  Button,
  Text,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Image,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout/Layout';

const MotionBox = motion(Box);
const MotionAvatar = motion(Avatar);

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  bio: string;
}

const Profile = () => {
  const { register, handleSubmit } = useForm<ProfileForm>({
    defaultValues: {
      name: '山田太郎',
      email: 'yamada@example.com',
      phone: '090-1234-5678',
      bio: 'プロジェクトマネージャーとして5年の経験があります。チームワークを大切にし、効率的なタスク管理を心がけています。',
    },
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const achievements = [
    { id: 1, label: 'プロジェクト完了', count: 25 },
    { id: 2, label: 'タスク達成', count: 150 },
    { id: 3, label: 'チーム貢献', count: 50 },
    { id: 4, label: '連続ログイン', count: 30 },
  ];

  const onSubmit = (data: ProfileForm) => {
    console.log('Profile updated:', data);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <Box p={8}>
        <VStack spacing={6} align="stretch">
          <Text fontSize="3xl" fontWeight="bold">
            プロフィール
          </Text>

          <AnimatePresence>
            {showSuccess && (
              <MotionBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert status="success" borderRadius="md">
                  <AlertIcon />
                  <AlertTitle>更新成功！</AlertTitle>
                  <AlertDescription>
                    プロフィールが正常に更新されました。
                  </AlertDescription>
                </Alert>
              </MotionBox>
            )}
          </AnimatePresence>

          <HStack spacing={8} align="start" flexWrap={{ base: 'wrap', lg: 'nowrap' }}>
            <Box
              bg="white"
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              minW={{ base: '100%', lg: '300px' }}
            >
              <VStack spacing={4}>
                <MotionAvatar
                  size="2xl"
                  name="山田太郎"
                  src={previewImage || undefined}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  cursor="pointer"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  display="none"
                  id="avatar-upload"
                />
                <Button
                  as="label"
                  htmlFor="avatar-upload"
                  colorScheme="blue"
                  size="sm"
                  cursor="pointer"
                >
                  画像をアップロード
                </Button>
                <VStack spacing={2} align="stretch" w="100%">
                  <Text fontWeight="bold" textAlign="center">
                    ステータス
                  </Text>
                  <HStack justify="center">
                    <Badge colorScheme="green">アクティブ</Badge>
                    <Badge colorScheme="blue">プレミアム</Badge>
                  </HStack>
                </VStack>
              </VStack>
            </Box>

            <Box flex="1" w="100%">
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack
                  spacing={6}
                  align="stretch"
                  bg="white"
                  p={6}
                  borderRadius="lg"
                  borderWidth="1px"
                >
                  <FormControl isRequired>
                    <FormLabel>名前</FormLabel>
                    <Input {...register('name')} />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>メールアドレス</FormLabel>
                    <Input {...register('email')} type="email" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>電話番号</FormLabel>
                    <Input {...register('phone')} type="tel" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>自己紹介</FormLabel>
                    <Textarea {...register('bio')} rows={5} />
                  </FormControl>

                  <HStack justify="flex-end" spacing={4}>
                    <Button variant="outline">キャンセル</Button>
                    <MotionBox
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button colorScheme="blue" type="submit">
                        保存
                      </Button>
                    </MotionBox>
                  </HStack>
                </VStack>
              </form>
            </Box>
          </HStack>

          <Box bg="white" p={6} borderRadius="lg" borderWidth="1px">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              実績バッジ
            </Text>
            <Wrap spacing={4}>
              {achievements.map((achievement, index) => (
                <WrapItem key={achievement.id}>
                  <MotionBox
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Box
                      borderWidth="1px"
                      borderRadius="lg"
                      p={4}
                      textAlign="center"
                      minW="150px"
                      bg="gray.50"
                      _hover={{ bg: 'blue.50', borderColor: 'blue.300' }}
                    >
                      <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                        {achievement.count}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {achievement.label}
                      </Text>
                    </Box>
                  </MotionBox>
                </WrapItem>
              ))}
            </Wrap>
          </Box>

          <Box bg="white" p={6} borderRadius="lg" borderWidth="1px">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              最近のアクティビティ
            </Text>
            <VStack spacing={3} align="stretch">
              <HStack justify="space-between" borderBottomWidth="1px" pb={2}>
                <Text>「新規プロジェクト立ち上げ」タスクを完了</Text>
                <Text fontSize="sm" color="gray.500">
                  2時間前
                </Text>
              </HStack>
              <HStack justify="space-between" borderBottomWidth="1px" pb={2}>
                <Text>チームメンバー3名を追加</Text>
                <Text fontSize="sm" color="gray.500">
                  5時間前
                </Text>
              </HStack>
              <HStack justify="space-between" borderBottomWidth="1px" pb={2}>
                <Text>「デザインレビュー」にコメントを追加</Text>
                <Text fontSize="sm" color="gray.500">
                  1日前
                </Text>
              </HStack>
              <HStack justify="space-between" pb={2}>
                <Text>プロフィールを更新</Text>
                <Text fontSize="sm" color="gray.500">
                  3日前
                </Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
};

export default Profile;
