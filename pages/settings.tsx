import {
  Box,
  Button,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Switch,
  Select,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout/Layout';

const MotionBox = motion(Box);

interface SettingsForm {
  username: string;
  email: string;
  language: string;
  timezone: string;
}

const Settings = () => {
  const { register, handleSubmit } = useForm<SettingsForm>();
  const [showSuccess, setShowSuccess] = useState(false);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    taskUpdates: true,
    comments: true,
    mentions: true,
  });

  const onSubmit = (data: SettingsForm) => {
    console.log('Settings saved:', data);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Layout>
      <Box p={8}>
        <VStack spacing={6} align="stretch">
          <Text fontSize="3xl" fontWeight="bold">
            設定
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
                  <AlertTitle>保存成功！</AlertTitle>
                  <AlertDescription>
                    設定が正常に保存されました。
                  </AlertDescription>
                </Alert>
              </MotionBox>
            )}
          </AnimatePresence>

          <Tabs colorScheme="blue" variant="enclosed">
            <TabList>
              <Tab>一般</Tab>
              <Tab>通知</Tab>
              <Tab>セキュリティ</Tab>
              <Tab>表示</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack
                      spacing={6}
                      align="stretch"
                      bg="white"
                      p={6}
                      borderRadius="lg"
                      borderWidth="1px"
                    >
                      <FormControl>
                        <FormLabel>ユーザー名</FormLabel>
                        <Input
                          {...register('username')}
                          defaultValue="山田太郎"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>メールアドレス</FormLabel>
                        <Input
                          {...register('email')}
                          type="email"
                          defaultValue="yamada@example.com"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>言語</FormLabel>
                        <Select {...register('language')} defaultValue="ja">
                          <option value="ja">日本語</option>
                          <option value="en">English</option>
                          <option value="zh">中文</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>タイムゾーン</FormLabel>
                        <Select
                          {...register('timezone')}
                          defaultValue="Asia/Tokyo"
                        >
                          <option value="Asia/Tokyo">
                            Asia/Tokyo (GMT+9)
                          </option>
                          <option value="America/New_York">
                            America/New_York (GMT-5)
                          </option>
                          <option value="Europe/London">
                            Europe/London (GMT+0)
                          </option>
                        </Select>
                      </FormControl>

                      <HStack justify="flex-end" spacing={4}>
                        <Button variant="outline">キャンセル</Button>
                        <Button colorScheme="blue" type="submit">
                          保存
                        </Button>
                      </HStack>
                    </VStack>
                  </form>
                </MotionBox>
              </TabPanel>

              <TabPanel>
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <VStack
                    spacing={6}
                    align="stretch"
                    bg="white"
                    p={6}
                    borderRadius="lg"
                    borderWidth="1px"
                  >
                    <Box>
                      <Text fontSize="lg" fontWeight="bold" mb={4}>
                        通知方法
                      </Text>
                      <VStack spacing={3} align="stretch">
                        <FormControl display="flex" alignItems="center">
                          <FormLabel mb="0" flex="1">
                            メール通知
                          </FormLabel>
                          <Switch
                            isChecked={notifications.email}
                            onChange={(e) =>
                              handleNotificationChange('email', e.target.checked)
                            }
                            colorScheme="blue"
                          />
                        </FormControl>
                        <FormControl display="flex" alignItems="center">
                          <FormLabel mb="0" flex="1">
                            プッシュ通知
                          </FormLabel>
                          <Switch
                            isChecked={notifications.push}
                            onChange={(e) =>
                              handleNotificationChange('push', e.target.checked)
                            }
                            colorScheme="blue"
                          />
                        </FormControl>
                        <FormControl display="flex" alignItems="center">
                          <FormLabel mb="0" flex="1">
                            SMS通知
                          </FormLabel>
                          <Switch
                            isChecked={notifications.sms}
                            onChange={(e) =>
                              handleNotificationChange('sms', e.target.checked)
                            }
                            colorScheme="blue"
                          />
                        </FormControl>
                      </VStack>
                    </Box>

                    <Box>
                      <Text fontSize="lg" fontWeight="bold" mb={4}>
                        通知内容
                      </Text>
                      <VStack spacing={3} align="stretch">
                        <Checkbox
                          isChecked={notifications.taskUpdates}
                          onChange={(e) =>
                            handleNotificationChange(
                              'taskUpdates',
                              e.target.checked
                            )
                          }
                        >
                          タスクの更新
                        </Checkbox>
                        <Checkbox
                          isChecked={notifications.comments}
                          onChange={(e) =>
                            handleNotificationChange(
                              'comments',
                              e.target.checked
                            )
                          }
                        >
                          コメント
                        </Checkbox>
                        <Checkbox
                          isChecked={notifications.mentions}
                          onChange={(e) =>
                            handleNotificationChange(
                              'mentions',
                              e.target.checked
                            )
                          }
                        >
                          メンション
                        </Checkbox>
                      </VStack>
                    </Box>

                    <HStack justify="flex-end" spacing={4}>
                      <Button variant="outline">キャンセル</Button>
                      <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
                        保存
                      </Button>
                    </HStack>
                  </VStack>
                </MotionBox>
              </TabPanel>

              <TabPanel>
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <VStack
                    spacing={6}
                    align="stretch"
                    bg="white"
                    p={6}
                    borderRadius="lg"
                    borderWidth="1px"
                  >
                    <FormControl>
                      <FormLabel>現在のパスワード</FormLabel>
                      <Input type="password" placeholder="現在のパスワード" />
                    </FormControl>

                    <FormControl>
                      <FormLabel>新しいパスワード</FormLabel>
                      <Input type="password" placeholder="新しいパスワード" />
                    </FormControl>

                    <FormControl>
                      <FormLabel>パスワード確認</FormLabel>
                      <Input type="password" placeholder="パスワード確認" />
                    </FormControl>

                    <Box borderTopWidth="1px" pt={4}>
                      <Text fontSize="lg" fontWeight="bold" mb={4}>
                        2段階認証
                      </Text>
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0" flex="1">
                          2段階認証を有効にする
                        </FormLabel>
                        <Switch colorScheme="blue" />
                      </FormControl>
                    </Box>

                    <HStack justify="flex-end" spacing={4}>
                      <Button variant="outline">キャンセル</Button>
                      <Button colorScheme="blue">保存</Button>
                    </HStack>
                  </VStack>
                </MotionBox>
              </TabPanel>

              <TabPanel>
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <VStack
                    spacing={6}
                    align="stretch"
                    bg="white"
                    p={6}
                    borderRadius="lg"
                    borderWidth="1px"
                  >
                    <FormControl>
                      <FormLabel>テーマ</FormLabel>
                      <RadioGroup value={theme} onChange={setTheme}>
                        <Stack direction="column" spacing={3}>
                          <Radio value="light">ライトモード</Radio>
                          <Radio value="dark">ダークモード</Radio>
                          <Radio value="auto">自動（システム設定に従う）</Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>

                    <FormControl>
                      <FormLabel>フォントサイズ</FormLabel>
                      <Select defaultValue="medium">
                        <option value="small">小</option>
                        <option value="medium">中</option>
                        <option value="large">大</option>
                      </Select>
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0" flex="1">
                        コンパクト表示
                      </FormLabel>
                      <Switch colorScheme="blue" />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0" flex="1">
                        アニメーション効果
                      </FormLabel>
                      <Switch colorScheme="blue" defaultChecked />
                    </FormControl>

                    <HStack justify="flex-end" spacing={4}>
                      <Button variant="outline">キャンセル</Button>
                      <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
                        保存
                      </Button>
                    </HStack>
                  </VStack>
                </MotionBox>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </Layout>
  );
};

export default Settings;
