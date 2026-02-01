'use client';

import {
  Box,
  Icon as ChakraIcon,
  Tooltip as ChakraTooltip,
  Spinner as ChakraSpinner,
  Progress as ChakraProgress,
  Image as ChakraImage,
  Link as ChakraLink,
  HStack,
  VStack,
  Text,
  Button,
} from '@chakra-ui/react';
import { InfoIcon, WarningIcon, CheckCircleIcon, StarIcon } from '@chakra-ui/icons';

import {
  Icon,
  Tooltip,
  Spinner,
  Progress,
  Image,
  Link,
  HStack as NewHStack,
  VStack as NewVStack,
  Text as NewText,
  Button as NewButton,
  Box as NewBox,
} from '@/components/ui';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const StarSvgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const InfoSvgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold">i</text>
  </svg>
);

export default function CompareMiscPage() {
  return (
    <Box p={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={8}>
        Misc Components Comparison
      </Text>

      <HStack spacing={16} alignItems="flex-start">
        <VStack spacing={8} alignItems="flex-start" flex={1}>
          <Text fontSize="xl" fontWeight="semibold" color="blue.600">
            Chakra UI
          </Text>

          <Box>
            <Text fontWeight="bold" mb={2}>Icon</Text>
            <HStack spacing={4}>
              <ChakraIcon as={InfoIcon} boxSize={4} />
              <ChakraIcon as={WarningIcon} boxSize={5} />
              <ChakraIcon as={CheckCircleIcon} boxSize={6} />
              <ChakraIcon as={StarIcon} boxSize={8} color="yellow.500" />
            </HStack>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>Tooltip</Text>
            <HStack spacing={4}>
              <ChakraTooltip label="Top tooltip" placement="top">
                <Button size="sm">Top</Button>
              </ChakraTooltip>
              <ChakraTooltip label="Bottom tooltip" placement="bottom">
                <Button size="sm">Bottom</Button>
              </ChakraTooltip>
              <ChakraTooltip label="Left tooltip" placement="left">
                <Button size="sm">Left</Button>
              </ChakraTooltip>
              <ChakraTooltip label="Right tooltip" placement="right">
                <Button size="sm">Right</Button>
              </ChakraTooltip>
            </HStack>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>Spinner</Text>
            <HStack spacing={4}>
              <ChakraSpinner size="xs" />
              <ChakraSpinner size="sm" />
              <ChakraSpinner size="md" />
              <ChakraSpinner size="lg" />
              <ChakraSpinner size="xl" color="blue.500" />
            </HStack>
          </Box>

          <Box w="full">
            <Text fontWeight="bold" mb={2}>Progress</Text>
            <VStack spacing={4} alignItems="stretch">
              <ChakraProgress value={20} size="xs" colorScheme="blue" />
              <ChakraProgress value={40} size="sm" colorScheme="green" />
              <ChakraProgress value={60} size="md" colorScheme="orange" />
              <ChakraProgress value={80} size="lg" colorScheme="red" hasStripe />
              <ChakraProgress value={100} size="md" colorScheme="purple" hasStripe isAnimated />
              <ChakraProgress size="md" isIndeterminate colorScheme="cyan" />
            </VStack>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>Image</Text>
            <HStack spacing={4}>
              <ChakraImage
                src="https://via.placeholder.com/100"
                alt="Placeholder"
                boxSize="100px"
                objectFit="cover"
                borderRadius="md"
              />
              <ChakraImage
                src="https://via.placeholder.com/100"
                alt="Rounded"
                boxSize="100px"
                objectFit="cover"
                borderRadius="full"
              />
            </HStack>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>Link</Text>
            <VStack spacing={2} alignItems="flex-start">
              <ChakraLink href="#">Internal Link</ChakraLink>
              <ChakraLink href="https://example.com" isExternal>
                External Link
              </ChakraLink>
              <ChakraLink href="#" color="purple.500">
                Colored Link
              </ChakraLink>
            </VStack>
          </Box>
        </VStack>

        <VStack spacing={8} alignItems="flex-start" flex={1}>
          <Text fontSize="xl" fontWeight="semibold" color="green.600">
            CSS Modules
          </Text>

          <NewBox>
            <NewText fontWeight="bold" mb={2}>Icon</NewText>
            <NewHStack spacing={4}>
              <Icon as={<InfoSvgIcon />} boxSize="sm" />
              <Icon as={<InfoSvgIcon />} boxSize="md" />
              <Icon as={<CheckIcon />} boxSize="lg" />
              <Icon as={<StarSvgIcon />} boxSize="xl" color="#D69E2E" />
            </NewHStack>
          </NewBox>

          <NewBox>
            <NewText fontWeight="bold" mb={2}>Tooltip</NewText>
            <NewHStack spacing={4}>
              <Tooltip label="Top tooltip" placement="top">
                <NewButton size="sm">Top</NewButton>
              </Tooltip>
              <Tooltip label="Bottom tooltip" placement="bottom">
                <NewButton size="sm">Bottom</NewButton>
              </Tooltip>
              <Tooltip label="Left tooltip" placement="left">
                <NewButton size="sm">Left</NewButton>
              </Tooltip>
              <Tooltip label="Right tooltip" placement="right">
                <NewButton size="sm">Right</NewButton>
              </Tooltip>
            </NewHStack>
          </NewBox>

          <NewBox>
            <NewText fontWeight="bold" mb={2}>Spinner</NewText>
            <NewHStack spacing={4}>
              <Spinner size="xs" />
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="xl" color="#3182CE" />
            </NewHStack>
          </NewBox>

          <NewBox w="full">
            <NewText fontWeight="bold" mb={2}>Progress</NewText>
            <NewVStack spacing={4} alignItems="stretch">
              <Progress value={20} size="xs" colorScheme="blue" />
              <Progress value={40} size="sm" colorScheme="green" />
              <Progress value={60} size="md" colorScheme="orange" />
              <Progress value={80} size="lg" colorScheme="red" hasStripe />
              <Progress value={100} size="md" colorScheme="purple" hasStripe isAnimated />
              <Progress size="md" isIndeterminate colorScheme="cyan" />
            </NewVStack>
          </NewBox>

          <NewBox>
            <NewText fontWeight="bold" mb={2}>Image</NewText>
            <NewHStack spacing={4}>
              <Image
                src="https://via.placeholder.com/100"
                alt="Placeholder"
                boxSize={100}
                fit="cover"
                borderRadius="md"
              />
              <Image
                src="https://via.placeholder.com/100"
                alt="Rounded"
                boxSize={100}
                fit="cover"
                borderRadius="full"
              />
            </NewHStack>
          </NewBox>

          <NewBox>
            <NewText fontWeight="bold" mb={2}>Link</NewText>
            <NewVStack spacing={2} alignItems="flex-start">
              <Link href="#">Internal Link</Link>
              <Link href="https://example.com" isExternal>
                External Link
              </Link>
              <Link href="#" color="#805AD5">
                Colored Link
              </Link>
            </NewVStack>
          </NewBox>
        </VStack>
      </HStack>
    </Box>
  );
}
