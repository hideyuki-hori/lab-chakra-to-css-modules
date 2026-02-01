import {
  Box as ChakraBox,
  Menu as ChakraMenu,
  MenuButton as ChakraMenuButton,
  MenuList as ChakraMenuList,
  MenuItem as ChakraMenuItem,
  MenuDivider as ChakraMenuDivider,
  Button as ChakraButton,
  SimpleGrid as ChakraSimpleGrid,
  Text,
  Heading,
  VStack as ChakraVStack,
  HStack as ChakraHStack,
} from '@chakra-ui/react';
import { FiEdit, FiTrash, FiCopy, FiUser, FiSettings, FiLogOut, FiChevronDown } from 'react-icons/fi';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  VStack,
  HStack,
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
        <ChakraBox border="1px" borderColor="gray.200" p={4} borderRadius="md" minH="100px">
          {chakraVersion}
        </ChakraBox>
      </ChakraBox>
      <ChakraBox>
        <Text fontWeight="bold" mb={2} color="green.600">New (CSS Modules)</Text>
        <ChakraBox border="1px" borderColor="gray.200" p={4} borderRadius="md" minH="100px">
          {newVersion}
        </ChakraBox>
      </ChakraBox>
    </ChakraSimpleGrid>
  </ChakraBox>
);

const MenuComparePage = () => {
  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>Menu Components Comparison</Heading>

      <CompareSection
        title="Basic Menu"
        chakraVersion={
          <ChakraMenu>
            <ChakraMenuButton as={ChakraButton} rightIcon={<FiChevronDown />}>
              Actions
            </ChakraMenuButton>
            <ChakraMenuList>
              <ChakraMenuItem>Edit</ChakraMenuItem>
              <ChakraMenuItem>Copy</ChakraMenuItem>
              <ChakraMenuItem>Delete</ChakraMenuItem>
            </ChakraMenuList>
          </ChakraMenu>
        }
        newVersion={
          <Menu>
            <MenuButton>
              <Button rightIcon={<FiChevronDown />}>
                Actions
              </Button>
            </MenuButton>
            <MenuList>
              <MenuItem>Edit</MenuItem>
              <MenuItem>Copy</MenuItem>
              <MenuItem>Delete</MenuItem>
            </MenuList>
          </Menu>
        }
      />

      <CompareSection
        title="Menu with Icons"
        chakraVersion={
          <ChakraMenu>
            <ChakraMenuButton as={ChakraButton} rightIcon={<FiChevronDown />}>
              Actions
            </ChakraMenuButton>
            <ChakraMenuList>
              <ChakraMenuItem icon={<FiEdit />}>Edit</ChakraMenuItem>
              <ChakraMenuItem icon={<FiCopy />}>Copy</ChakraMenuItem>
              <ChakraMenuItem icon={<FiTrash />}>Delete</ChakraMenuItem>
            </ChakraMenuList>
          </ChakraMenu>
        }
        newVersion={
          <Menu>
            <MenuButton>
              <Button rightIcon={<FiChevronDown />}>
                Actions
              </Button>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiEdit />}>Edit</MenuItem>
              <MenuItem icon={<FiCopy />}>Copy</MenuItem>
              <MenuItem icon={<FiTrash />}>Delete</MenuItem>
            </MenuList>
          </Menu>
        }
      />

      <CompareSection
        title="Menu with Divider"
        chakraVersion={
          <ChakraMenu>
            <ChakraMenuButton as={ChakraButton} rightIcon={<FiChevronDown />}>
              Profile
            </ChakraMenuButton>
            <ChakraMenuList>
              <ChakraMenuItem icon={<FiUser />}>My Profile</ChakraMenuItem>
              <ChakraMenuItem icon={<FiSettings />}>Settings</ChakraMenuItem>
              <ChakraMenuDivider />
              <ChakraMenuItem icon={<FiLogOut />} color="red.500">Logout</ChakraMenuItem>
            </ChakraMenuList>
          </ChakraMenu>
        }
        newVersion={
          <Menu>
            <MenuButton>
              <Button rightIcon={<FiChevronDown />}>
                Profile
              </Button>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />}>My Profile</MenuItem>
              <MenuItem icon={<FiSettings />}>Settings</MenuItem>
              <MenuDivider />
              <MenuItem icon={<FiLogOut />} color="#E53E3E">Logout</MenuItem>
            </MenuList>
          </Menu>
        }
      />

      <CompareSection
        title="Menu with Colored Items"
        chakraVersion={
          <ChakraMenu>
            <ChakraMenuButton as={ChakraButton} rightIcon={<FiChevronDown />}>
              Options
            </ChakraMenuButton>
            <ChakraMenuList>
              <ChakraMenuItem color="blue.500">Blue Item</ChakraMenuItem>
              <ChakraMenuItem color="green.500">Green Item</ChakraMenuItem>
              <ChakraMenuItem color="red.500">Red Item</ChakraMenuItem>
            </ChakraMenuList>
          </ChakraMenu>
        }
        newVersion={
          <Menu>
            <MenuButton>
              <Button rightIcon={<FiChevronDown />}>
                Options
              </Button>
            </MenuButton>
            <MenuList>
              <MenuItem color="#3182CE">Blue Item</MenuItem>
              <MenuItem color="#38A169">Green Item</MenuItem>
              <MenuItem color="#E53E3E">Red Item</MenuItem>
            </MenuList>
          </Menu>
        }
      />

      <CompareSection
        title="Multiple Menus (Side by Side)"
        chakraVersion={
          <ChakraHStack spacing={4}>
            <ChakraMenu>
              <ChakraMenuButton as={ChakraButton} size="sm" rightIcon={<FiChevronDown />}>
                File
              </ChakraMenuButton>
              <ChakraMenuList>
                <ChakraMenuItem>New</ChakraMenuItem>
                <ChakraMenuItem>Open</ChakraMenuItem>
                <ChakraMenuItem>Save</ChakraMenuItem>
              </ChakraMenuList>
            </ChakraMenu>
            <ChakraMenu>
              <ChakraMenuButton as={ChakraButton} size="sm" rightIcon={<FiChevronDown />}>
                Edit
              </ChakraMenuButton>
              <ChakraMenuList>
                <ChakraMenuItem>Undo</ChakraMenuItem>
                <ChakraMenuItem>Redo</ChakraMenuItem>
                <ChakraMenuItem>Cut</ChakraMenuItem>
              </ChakraMenuList>
            </ChakraMenu>
          </ChakraHStack>
        }
        newVersion={
          <HStack spacing={4}>
            <Menu>
              <MenuButton>
                <Button size="sm" rightIcon={<FiChevronDown />}>
                  File
                </Button>
              </MenuButton>
              <MenuList>
                <MenuItem>New</MenuItem>
                <MenuItem>Open</MenuItem>
                <MenuItem>Save</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton>
                <Button size="sm" rightIcon={<FiChevronDown />}>
                  Edit
                </Button>
              </MenuButton>
              <MenuList>
                <MenuItem>Undo</MenuItem>
                <MenuItem>Redo</MenuItem>
                <MenuItem>Cut</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        }
      />

      <CompareSection
        title="Menu with Multiple Dividers"
        chakraVersion={
          <ChakraMenu>
            <ChakraMenuButton as={ChakraButton} rightIcon={<FiChevronDown />}>
              Actions
            </ChakraMenuButton>
            <ChakraMenuList>
              <ChakraMenuItem>View</ChakraMenuItem>
              <ChakraMenuDivider />
              <ChakraMenuItem>Edit</ChakraMenuItem>
              <ChakraMenuItem>Duplicate</ChakraMenuItem>
              <ChakraMenuDivider />
              <ChakraMenuItem color="red.500">Delete</ChakraMenuItem>
            </ChakraMenuList>
          </ChakraMenu>
        }
        newVersion={
          <Menu>
            <MenuButton>
              <Button rightIcon={<FiChevronDown />}>
                Actions
              </Button>
            </MenuButton>
            <MenuList>
              <MenuItem>View</MenuItem>
              <MenuDivider />
              <MenuItem>Edit</MenuItem>
              <MenuItem>Duplicate</MenuItem>
              <MenuDivider />
              <MenuItem color="#E53E3E">Delete</MenuItem>
            </MenuList>
          </Menu>
        }
      />

      <ChakraBox mb={8} p={4} bg="yellow.50" borderRadius="md">
        <Text fontWeight="bold" color="yellow.700" mb={2}>Keyboard Navigation (CSS Modules version)</Text>
        <ChakraVStack align="start" spacing={1}>
          <Text fontSize="sm">- Arrow Up/Down: Move between menu items</Text>
          <Text fontSize="sm">- Enter/Space: Select current item</Text>
          <Text fontSize="sm">- Escape: Close menu</Text>
          <Text fontSize="sm">- Tab: Close menu and move focus</Text>
          <Text fontSize="sm">- Click outside: Close menu</Text>
        </ChakraVStack>
      </ChakraBox>
    </ChakraBox>
  );
};

export default MenuComparePage;
