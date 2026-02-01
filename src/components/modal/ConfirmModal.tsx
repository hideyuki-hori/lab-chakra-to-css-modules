import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  HStack,
  Icon,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FiAlertTriangle } from 'react-icons/fi';

const MotionModalContent = motion(ModalContent);

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColorScheme?: string;
  icon?: IconType;
  iconColor?: string;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = '確認',
  cancelLabel = 'キャンセル',
  confirmColorScheme = 'red',
  icon = FiAlertTriangle,
  iconColor = 'orange.500',
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
      <ModalOverlay />
      <MotionModalContent
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="start">
            <HStack spacing={3}>
              <Icon as={icon} boxSize={6} color={iconColor} />
              <Text>{message}</Text>
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={3}>
            <Button variant="ghost" onClick={onClose} isDisabled={isLoading}>
              {cancelLabel}
            </Button>
            <Button
              colorScheme={confirmColorScheme}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </HStack>
        </ModalFooter>
      </MotionModalContent>
    </Modal>
  );
}
