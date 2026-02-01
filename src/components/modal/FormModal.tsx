import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const MotionModalContent = motion(ModalContent);

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  submitColorScheme?: string;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitLabel = '保存',
  cancelLabel = 'キャンセル',
  submitColorScheme = 'primary',
  isLoading = false,
  size = 'lg',
}: FormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" size={size}>
      <ModalOverlay />
      <MotionModalContent
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <ModalBody>
            <VStack spacing={4}>{children}</VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose} isDisabled={isLoading}>
              {cancelLabel}
            </Button>
            <Button colorScheme={submitColorScheme} type="submit" isLoading={isLoading}>
              {submitLabel}
            </Button>
          </ModalFooter>
        </form>
      </MotionModalContent>
    </Modal>
  );
}
