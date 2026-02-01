import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '../Modal';
import { Button, Text } from '../';

const meta: Meta<typeof Modal> = {
  title: 'Overlay/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>
          Modal Title
          <ModalCloseButton onClick={() => setIsOpen(false)} />
        </ModalHeader>
        <ModalBody>
          <Text>This is the modal content. You can put any content here.</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};

function SizesDemo() {
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Button
          key={s}
          variant="outline"
          onClick={() => {
            setSize(s);
            setIsOpen(true);
          }}
        >
          {s.toUpperCase()}
        </Button>
      ))}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={size}>
        <ModalHeader>
          {size.toUpperCase()} Modal
          <ModalCloseButton onClick={() => setIsOpen(false)} />
        </ModalHeader>
        <ModalBody>
          <Text>This is a {size} sized modal.</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export const Sizes: Story = {
  render: () => <SizesDemo />,
};
