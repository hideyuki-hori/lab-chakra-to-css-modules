'use client';

import { useState } from 'react';
import {
  Box as ChakraBox,
  Modal as ChakraModal,
  ModalOverlay as ChakraModalOverlay,
  ModalContent as ChakraModalContent,
  ModalHeader as ChakraModalHeader,
  ModalBody as ChakraModalBody,
  ModalFooter as ChakraModalFooter,
  ModalCloseButton as ChakraModalCloseButton,
  Button as ChakraButton,
  SimpleGrid as ChakraSimpleGrid,
  Text,
  Heading,
  VStack as ChakraVStack,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
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

const BasicModalDemo = () => {
  const chakraDisclosure = useDisclosure();
  const [isNewOpen, setIsNewOpen] = useState(false);

  return (
    <CompareSection
      title="Modal - Basic"
      chakraVersion={
        <>
          <ChakraButton onClick={chakraDisclosure.onOpen}>Open Modal</ChakraButton>
          <ChakraModal isOpen={chakraDisclosure.isOpen} onClose={chakraDisclosure.onClose}>
            <ChakraModalOverlay />
            <ChakraModalContent>
              <ChakraModalHeader>Modal Title</ChakraModalHeader>
              <ChakraModalCloseButton />
              <ChakraModalBody>
                <Text>This is the modal body content.</Text>
              </ChakraModalBody>
              <ChakraModalFooter>
                <ChakraButton variant="ghost" mr={3} onClick={chakraDisclosure.onClose}>
                  Cancel
                </ChakraButton>
                <ChakraButton colorScheme="blue">Save</ChakraButton>
              </ChakraModalFooter>
            </ChakraModalContent>
          </ChakraModal>
        </>
      }
      newVersion={
        <>
          <Button onClick={() => setIsNewOpen(true)}>Open Modal</Button>
          <Modal isOpen={isNewOpen} onClose={() => setIsNewOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <span>This is the modal body content.</span>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setIsNewOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      }
    />
  );
};

const SizeModalDemo = () => {
  const [chakraSize, setChakraSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const chakraDisclosure = useDisclosure();
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [newSize, setNewSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');

  const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

  return (
    <CompareSection
      title="Modal - Different Sizes"
      chakraVersion={
        <ChakraVStack spacing={2} align="start">
          {sizes.map((size) => (
            <ChakraButton
              key={size}
              size="sm"
              onClick={() => {
                setChakraSize(size);
                chakraDisclosure.onOpen();
              }}
            >
              Open {size.toUpperCase()}
            </ChakraButton>
          ))}
          <ChakraModal isOpen={chakraDisclosure.isOpen} onClose={chakraDisclosure.onClose} size={chakraSize}>
            <ChakraModalOverlay />
            <ChakraModalContent>
              <ChakraModalHeader>Size: {chakraSize}</ChakraModalHeader>
              <ChakraModalCloseButton />
              <ChakraModalBody>
                <Text>This modal has size=&quot;{chakraSize}&quot;</Text>
              </ChakraModalBody>
              <ChakraModalFooter>
                <ChakraButton onClick={chakraDisclosure.onClose}>Close</ChakraButton>
              </ChakraModalFooter>
            </ChakraModalContent>
          </ChakraModal>
        </ChakraVStack>
      }
      newVersion={
        <VStack spacing={2} align="start">
          {sizes.map((size) => (
            <Button
              key={size}
              size="sm"
              onClick={() => {
                setNewSize(size);
                setIsNewOpen(true);
              }}
            >
              Open {size.toUpperCase()}
            </Button>
          ))}
          <Modal isOpen={isNewOpen} onClose={() => setIsNewOpen(false)} size={newSize}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Size: {newSize}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <span>This modal has size=&quot;{newSize}&quot;</span>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setIsNewOpen(false)}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </VStack>
      }
    />
  );
};

const CenteredModalDemo = () => {
  const chakraDisclosure = useDisclosure();
  const [isNewOpen, setIsNewOpen] = useState(false);

  return (
    <CompareSection
      title="Modal - Centered"
      chakraVersion={
        <>
          <ChakraButton onClick={chakraDisclosure.onOpen}>Open Centered Modal</ChakraButton>
          <ChakraModal isOpen={chakraDisclosure.isOpen} onClose={chakraDisclosure.onClose} isCentered>
            <ChakraModalOverlay />
            <ChakraModalContent>
              <ChakraModalHeader>Centered Modal</ChakraModalHeader>
              <ChakraModalCloseButton />
              <ChakraModalBody>
                <Text>This modal is vertically centered.</Text>
              </ChakraModalBody>
              <ChakraModalFooter>
                <ChakraButton onClick={chakraDisclosure.onClose}>Close</ChakraButton>
              </ChakraModalFooter>
            </ChakraModalContent>
          </ChakraModal>
        </>
      }
      newVersion={
        <>
          <Button onClick={() => setIsNewOpen(true)}>Open Centered Modal</Button>
          <Modal isOpen={isNewOpen} onClose={() => setIsNewOpen(false)} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Centered Modal</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <span>This modal is vertically centered.</span>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setIsNewOpen(false)}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      }
    />
  );
};

const NoOverlayClickModalDemo = () => {
  const chakraDisclosure = useDisclosure();
  const [isNewOpen, setIsNewOpen] = useState(false);

  return (
    <CompareSection
      title="Modal - closeOnOverlayClick=false"
      chakraVersion={
        <>
          <ChakraButton onClick={chakraDisclosure.onOpen}>Open Modal (No Overlay Close)</ChakraButton>
          <ChakraModal
            isOpen={chakraDisclosure.isOpen}
            onClose={chakraDisclosure.onClose}
            closeOnOverlayClick={false}
          >
            <ChakraModalOverlay />
            <ChakraModalContent>
              <ChakraModalHeader>Cannot Close by Overlay</ChakraModalHeader>
              <ChakraModalCloseButton />
              <ChakraModalBody>
                <Text>Click outside will not close this modal.</Text>
              </ChakraModalBody>
              <ChakraModalFooter>
                <ChakraButton onClick={chakraDisclosure.onClose}>Close</ChakraButton>
              </ChakraModalFooter>
            </ChakraModalContent>
          </ChakraModal>
        </>
      }
      newVersion={
        <>
          <Button onClick={() => setIsNewOpen(true)}>Open Modal (No Overlay Close)</Button>
          <Modal
            isOpen={isNewOpen}
            onClose={() => setIsNewOpen(false)}
            closeOnOverlayClick={false}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Cannot Close by Overlay</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <span>Click outside will not close this modal.</span>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setIsNewOpen(false)}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      }
    />
  );
};

const FormModalDemo = () => {
  const chakraDisclosure = useDisclosure();
  const [isNewOpen, setIsNewOpen] = useState(false);

  return (
    <CompareSection
      title="Modal - Form Use Case"
      chakraVersion={
        <>
          <ChakraButton onClick={chakraDisclosure.onOpen}>Open Form Modal</ChakraButton>
          <ChakraModal isOpen={chakraDisclosure.isOpen} onClose={chakraDisclosure.onClose} size="lg">
            <ChakraModalOverlay />
            <ChakraModalContent>
              <ChakraModalHeader>Create New Task</ChakraModalHeader>
              <ChakraModalCloseButton />
              <ChakraModalBody>
                <ChakraVStack spacing={4} align="stretch">
                  <ChakraBox>
                    <Text fontWeight="medium" mb={1}>Task Name</Text>
                    <input
                      type="text"
                      placeholder="Enter task name"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                      }}
                    />
                  </ChakraBox>
                  <ChakraBox>
                    <Text fontWeight="medium" mb={1}>Description</Text>
                    <textarea
                      placeholder="Enter description"
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        resize: 'vertical',
                      }}
                    />
                  </ChakraBox>
                </ChakraVStack>
              </ChakraModalBody>
              <ChakraModalFooter>
                <ChakraButton variant="ghost" mr={3} onClick={chakraDisclosure.onClose}>
                  Cancel
                </ChakraButton>
                <ChakraButton colorScheme="blue">Create Task</ChakraButton>
              </ChakraModalFooter>
            </ChakraModalContent>
          </ChakraModal>
        </>
      }
      newVersion={
        <>
          <Button onClick={() => setIsNewOpen(true)}>Open Form Modal</Button>
          <Modal isOpen={isNewOpen} onClose={() => setIsNewOpen(false)} size="lg">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create New Task</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4} align="stretch">
                  <div>
                    <span style={{ fontWeight: 500, display: 'block', marginBottom: '4px' }}>Task Name</span>
                    <input
                      type="text"
                      placeholder="Enter task name"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                      }}
                    />
                  </div>
                  <div>
                    <span style={{ fontWeight: 500, display: 'block', marginBottom: '4px' }}>Description</span>
                    <textarea
                      placeholder="Enter description"
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        resize: 'vertical',
                      }}
                    />
                  </div>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setIsNewOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="blue">Create Task</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      }
    />
  );
};

const ConfirmModalDemo = () => {
  const chakraDisclosure = useDisclosure();
  const [isNewOpen, setIsNewOpen] = useState(false);

  return (
    <CompareSection
      title="Modal - Confirmation Dialog"
      chakraVersion={
        <>
          <ChakraButton colorScheme="red" onClick={chakraDisclosure.onOpen}>Delete Item</ChakraButton>
          <ChakraModal isOpen={chakraDisclosure.isOpen} onClose={chakraDisclosure.onClose} size="sm" isCentered>
            <ChakraModalOverlay />
            <ChakraModalContent>
              <ChakraModalHeader>Confirm Delete</ChakraModalHeader>
              <ChakraModalCloseButton />
              <ChakraModalBody>
                <Text>Are you sure you want to delete this item? This action cannot be undone.</Text>
              </ChakraModalBody>
              <ChakraModalFooter>
                <ChakraButton variant="ghost" mr={3} onClick={chakraDisclosure.onClose}>
                  Cancel
                </ChakraButton>
                <ChakraButton colorScheme="red" onClick={chakraDisclosure.onClose}>Delete</ChakraButton>
              </ChakraModalFooter>
            </ChakraModalContent>
          </ChakraModal>
        </>
      }
      newVersion={
        <>
          <Button colorScheme="red" onClick={() => setIsNewOpen(true)}>Delete Item</Button>
          <Modal isOpen={isNewOpen} onClose={() => setIsNewOpen(false)} size="sm" isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirm Delete</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <span>Are you sure you want to delete this item? This action cannot be undone.</span>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setIsNewOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={() => setIsNewOpen(false)}>Delete</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      }
    />
  );
};

const ModalComparePage = () => {
  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>Modal Components Comparison</Heading>

      <BasicModalDemo />
      <SizeModalDemo />
      <CenteredModalDemo />
      <NoOverlayClickModalDemo />
      <FormModalDemo />
      <ConfirmModalDemo />
    </ChakraBox>
  );
};

export default ModalComparePage;
