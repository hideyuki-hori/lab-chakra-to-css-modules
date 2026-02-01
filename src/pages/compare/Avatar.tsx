import {
  Box as ChakraBox,
  Avatar as ChakraAvatar,
  AvatarGroup as ChakraAvatarGroup,
  AvatarBadge as ChakraAvatarBadge,
  SimpleGrid as ChakraSimpleGrid,
  Text,
  Heading,
  HStack as ChakraHStack,
  VStack as ChakraVStack,
} from '@chakra-ui/react';
import {
  Avatar,
  AvatarGroup,
  AvatarBadge,
  HStack,
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

const AvatarComparePage = () => {
  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>Avatar Components Comparison</Heading>

      <CompareSection
        title="Avatar - Basic with Image"
        chakraVersion={
          <ChakraHStack spacing={4}>
            <ChakraAvatar name="John Doe" src="https://i.pravatar.cc/150?u=john" />
            <ChakraAvatar name="Jane Smith" src="https://i.pravatar.cc/150?u=jane" />
            <ChakraAvatar name="Bob Wilson" src="https://i.pravatar.cc/150?u=bob" />
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <Avatar name="John Doe" src="https://i.pravatar.cc/150?u=john" />
            <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?u=jane" />
            <Avatar name="Bob Wilson" src="https://i.pravatar.cc/150?u=bob" />
          </HStack>
        }
      />

      <CompareSection
        title="Avatar - Initials Fallback"
        chakraVersion={
          <ChakraHStack spacing={4}>
            <ChakraAvatar name="John Doe" />
            <ChakraAvatar name="Jane Smith" />
            <ChakraAvatar name="Alice" />
            <ChakraAvatar name="Bob Wilson" />
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <Avatar name="John Doe" />
            <Avatar name="Jane Smith" />
            <Avatar name="Alice" />
            <Avatar name="Bob Wilson" />
          </HStack>
        }
      />

      <CompareSection
        title="Avatar - Default Fallback (No Name)"
        chakraVersion={
          <ChakraHStack spacing={4}>
            <ChakraAvatar />
            <ChakraAvatar size="lg" />
            <ChakraAvatar size="xl" />
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <Avatar />
            <Avatar size="lg" />
            <Avatar size="xl" />
          </HStack>
        }
      />

      <CompareSection
        title="Avatar - Sizes"
        chakraVersion={
          <ChakraHStack spacing={4} align="center">
            <ChakraAvatar size="xs" name="XS" />
            <ChakraAvatar size="sm" name="SM" />
            <ChakraAvatar size="md" name="MD" />
            <ChakraAvatar size="lg" name="LG" />
            <ChakraAvatar size="xl" name="XL" />
            <ChakraAvatar size="2xl" name="2X" />
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4} align="center">
            <Avatar size="xs" name="XS" />
            <Avatar size="sm" name="SM" />
            <Avatar size="md" name="MD" />
            <Avatar size="lg" name="LG" />
            <Avatar size="xl" name="XL" />
            <Avatar size="2xl" name="2X" />
          </HStack>
        }
      />

      <CompareSection
        title="AvatarGroup - Basic"
        chakraVersion={
          <ChakraAvatarGroup size="md" max={3}>
            <ChakraAvatar name="John Doe" src="https://i.pravatar.cc/150?u=john" />
            <ChakraAvatar name="Jane Smith" src="https://i.pravatar.cc/150?u=jane" />
            <ChakraAvatar name="Bob Wilson" src="https://i.pravatar.cc/150?u=bob" />
          </ChakraAvatarGroup>
        }
        newVersion={
          <AvatarGroup size="md" max={3}>
            <Avatar name="John Doe" src="https://i.pravatar.cc/150?u=john" />
            <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?u=jane" />
            <Avatar name="Bob Wilson" src="https://i.pravatar.cc/150?u=bob" />
          </AvatarGroup>
        }
      />

      <CompareSection
        title="AvatarGroup - With Excess"
        chakraVersion={
          <ChakraAvatarGroup size="md" max={3}>
            <ChakraAvatar name="John Doe" src="https://i.pravatar.cc/150?u=john" />
            <ChakraAvatar name="Jane Smith" src="https://i.pravatar.cc/150?u=jane" />
            <ChakraAvatar name="Bob Wilson" src="https://i.pravatar.cc/150?u=bob" />
            <ChakraAvatar name="Alice Brown" src="https://i.pravatar.cc/150?u=alice" />
            <ChakraAvatar name="Charlie Davis" src="https://i.pravatar.cc/150?u=charlie" />
          </ChakraAvatarGroup>
        }
        newVersion={
          <AvatarGroup size="md" max={3}>
            <Avatar name="John Doe" src="https://i.pravatar.cc/150?u=john" />
            <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?u=jane" />
            <Avatar name="Bob Wilson" src="https://i.pravatar.cc/150?u=bob" />
            <Avatar name="Alice Brown" src="https://i.pravatar.cc/150?u=alice" />
            <Avatar name="Charlie Davis" src="https://i.pravatar.cc/150?u=charlie" />
          </AvatarGroup>
        }
      />

      <CompareSection
        title="AvatarGroup - Small Size"
        chakraVersion={
          <ChakraAvatarGroup size="sm" max={3}>
            <ChakraAvatar name="John Doe" src="https://i.pravatar.cc/150?u=john" />
            <ChakraAvatar name="Jane Smith" src="https://i.pravatar.cc/150?u=jane" />
            <ChakraAvatar name="Bob Wilson" src="https://i.pravatar.cc/150?u=bob" />
            <ChakraAvatar name="Alice Brown" src="https://i.pravatar.cc/150?u=alice" />
          </ChakraAvatarGroup>
        }
        newVersion={
          <AvatarGroup size="sm" max={3}>
            <Avatar name="John Doe" src="https://i.pravatar.cc/150?u=john" />
            <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?u=jane" />
            <Avatar name="Bob Wilson" src="https://i.pravatar.cc/150?u=bob" />
            <Avatar name="Alice Brown" src="https://i.pravatar.cc/150?u=alice" />
          </AvatarGroup>
        }
      />

      <CompareSection
        title="AvatarBadge - Status Indicator"
        chakraVersion={
          <ChakraHStack spacing={4}>
            <ChakraAvatar name="John Doe" src="https://i.pravatar.cc/150?u=john">
              <ChakraAvatarBadge boxSize="1em" bg="green.500" border="2px solid white" />
            </ChakraAvatar>
            <ChakraAvatar name="Jane Smith" src="https://i.pravatar.cc/150?u=jane">
              <ChakraAvatarBadge boxSize="1em" bg="red.500" border="2px solid white" />
            </ChakraAvatar>
            <ChakraAvatar name="Bob Wilson" src="https://i.pravatar.cc/150?u=bob">
              <ChakraAvatarBadge boxSize="1em" bg="yellow.500" border="2px solid white" />
            </ChakraAvatar>
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <Avatar name="John Doe" src="https://i.pravatar.cc/150?u=john">
              <AvatarBadge boxSize="1em" bg="green.500" border="2px solid white" />
            </Avatar>
            <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?u=jane">
              <AvatarBadge boxSize="1em" bg="red.500" border="2px solid white" />
            </Avatar>
            <Avatar name="Bob Wilson" src="https://i.pravatar.cc/150?u=bob">
              <AvatarBadge boxSize="1em" bg="yellow.500" border="2px solid white" />
            </Avatar>
          </HStack>
        }
      />

      <CompareSection
        title="AvatarBadge - Different Sizes"
        chakraVersion={
          <ChakraHStack spacing={4} align="center">
            <ChakraAvatar size="sm" name="Small">
              <ChakraAvatarBadge boxSize="1em" bg="green.500" border="2px solid white" />
            </ChakraAvatar>
            <ChakraAvatar size="md" name="Medium">
              <ChakraAvatarBadge boxSize="1em" bg="green.500" border="2px solid white" />
            </ChakraAvatar>
            <ChakraAvatar size="lg" name="Large">
              <ChakraAvatarBadge boxSize="1em" bg="green.500" border="2px solid white" />
            </ChakraAvatar>
            <ChakraAvatar size="xl" name="XL">
              <ChakraAvatarBadge boxSize="1em" bg="green.500" border="2px solid white" />
            </ChakraAvatar>
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4} align="center">
            <Avatar size="sm" name="Small">
              <AvatarBadge boxSize="1em" bg="green.500" border="2px solid white" />
            </Avatar>
            <Avatar size="md" name="Medium">
              <AvatarBadge boxSize="1em" bg="green.500" border="2px solid white" />
            </Avatar>
            <Avatar size="lg" name="Large">
              <AvatarBadge boxSize="1em" bg="green.500" border="2px solid white" />
            </Avatar>
            <Avatar size="xl" name="XL">
              <AvatarBadge boxSize="1em" bg="green.500" border="2px solid white" />
            </Avatar>
          </HStack>
        }
      />

      <CompareSection
        title="Avatar - Initials with Various Names"
        chakraVersion={
          <ChakraVStack spacing={4} align="start">
            <ChakraHStack spacing={4}>
              <ChakraAvatar name="John Doe" />
              <Text>John Doe → JD</Text>
            </ChakraHStack>
            <ChakraHStack spacing={4}>
              <ChakraAvatar name="Alice" />
              <Text>Alice → A</Text>
            </ChakraHStack>
            <ChakraHStack spacing={4}>
              <ChakraAvatar name="Mary Jane Watson" />
              <Text>Mary Jane Watson → MW</Text>
            </ChakraHStack>
          </ChakraVStack>
        }
        newVersion={
          <VStack spacing={4} align="start">
            <HStack spacing={4}>
              <Avatar name="John Doe" />
              <span>John Doe → JD</span>
            </HStack>
            <HStack spacing={4}>
              <Avatar name="Alice" />
              <span>Alice → A</span>
            </HStack>
            <HStack spacing={4}>
              <Avatar name="Mary Jane Watson" />
              <span>Mary Jane Watson → MW</span>
            </HStack>
          </VStack>
        }
      />
    </ChakraBox>
  );
};

export default AvatarComparePage;
