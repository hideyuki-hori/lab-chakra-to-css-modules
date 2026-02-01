import {
  Box as ChakraBox,
  Alert as ChakraAlert,
  AlertIcon as ChakraAlertIcon,
  AlertTitle as ChakraAlertTitle,
  AlertDescription as ChakraAlertDescription,
  SimpleGrid as ChakraSimpleGrid,
  Text,
  Heading,
  VStack as ChakraVStack,
} from '@chakra-ui/react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
} from '../../components/ui';

const CompareSection = ({
  title,
  chakraVersion,
  newVersion,
}: {
  title: string;
  chakraVersion: React.ReactNode;
  newVersion: React.ReactNode;
}) => (
  <ChakraBox mb={8}>
    <Heading size="md" mb={4}>{title}</Heading>
    <ChakraSimpleGrid columns={2} spacing={4}>
      <ChakraBox>
        <Text fontWeight="bold" mb={2} color="blue.600">Chakra UI</Text>
        <ChakraBox border="1px" borderColor="gray.200" p={4} borderRadius="md">
          {chakraVersion}
        </ChakraBox>
      </ChakraBox>
      <ChakraBox>
        <Text fontWeight="bold" mb={2} color="green.600">New (CSS Modules)</Text>
        <ChakraBox border="1px" borderColor="gray.200" p={4} borderRadius="md">
          {newVersion}
        </ChakraBox>
      </ChakraBox>
    </ChakraSimpleGrid>
  </ChakraBox>
);

const statuses = ['info', 'warning', 'success', 'error'] as const;

const AlertComparePage = () => {
  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>Alert Components Comparison</Heading>

      <CompareSection
        title="Alert - All Status Types (Simple)"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            {statuses.map((status) => (
              <ChakraAlert key={status} status={status}>
                <ChakraAlertIcon />
                This is a {status} alert
              </ChakraAlert>
            ))}
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            {statuses.map((status) => (
              <Alert key={status} status={status}>
                <AlertIcon />
                This is a {status} alert
              </Alert>
            ))}
          </VStack>
        }
      />

      <CompareSection
        title="Alert - With borderRadius"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            {statuses.map((status) => (
              <ChakraAlert key={status} status={status} borderRadius="md">
                <ChakraAlertIcon />
                Alert with borderRadius="md"
              </ChakraAlert>
            ))}
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            {statuses.map((status) => (
              <Alert key={status} status={status} borderRadius="md">
                <AlertIcon />
                Alert with borderRadius="md"
              </Alert>
            ))}
          </VStack>
        }
      />

      <CompareSection
        title="Alert - With Title and Description"
        chakraVersion={
          <ChakraVStack spacing={4} align="stretch">
            <ChakraAlert status="success" borderRadius="md">
              <ChakraAlertIcon />
              <ChakraAlertTitle>更新成功！</ChakraAlertTitle>
              <ChakraAlertDescription>
                プロフィールが正常に更新されました。
              </ChakraAlertDescription>
            </ChakraAlert>
            <ChakraAlert status="error" borderRadius="md">
              <ChakraAlertIcon />
              <ChakraAlertTitle>エラーが発生しました</ChakraAlertTitle>
              <ChakraAlertDescription>
                入力内容を確認してください。
              </ChakraAlertDescription>
            </ChakraAlert>
            <ChakraAlert status="warning" borderRadius="md">
              <ChakraAlertIcon />
              <ChakraAlertTitle>注意</ChakraAlertTitle>
              <ChakraAlertDescription>
                この操作は取り消せません。
              </ChakraAlertDescription>
            </ChakraAlert>
            <ChakraAlert status="info" borderRadius="md">
              <ChakraAlertIcon />
              <ChakraAlertTitle>お知らせ</ChakraAlertTitle>
              <ChakraAlertDescription>
                新しいバージョンがリリースされました。
              </ChakraAlertDescription>
            </ChakraAlert>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="stretch">
            <Alert status="success" borderRadius="md">
              <AlertIcon />
              <AlertTitle>更新成功！</AlertTitle>
              <AlertDescription>
                プロフィールが正常に更新されました。
              </AlertDescription>
            </Alert>
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <AlertTitle>エラーが発生しました</AlertTitle>
              <AlertDescription>
                入力内容を確認してください。
              </AlertDescription>
            </Alert>
            <Alert status="warning" borderRadius="md">
              <AlertIcon />
              <AlertTitle>注意</AlertTitle>
              <AlertDescription>
                この操作は取り消せません。
              </AlertDescription>
            </Alert>
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <AlertTitle>お知らせ</AlertTitle>
              <AlertDescription>
                新しいバージョンがリリースされました。
              </AlertDescription>
            </Alert>
          </VStack>
        }
      />

      <CompareSection
        title="Alert - Error Message (Use Case)"
        chakraVersion={
          <ChakraAlert status="error" borderRadius="md">
            <ChakraAlertIcon />
            ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。
          </ChakraAlert>
        }
        newVersion={
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。
          </Alert>
        }
      />
    </ChakraBox>
  );
};

export default AlertComparePage;
