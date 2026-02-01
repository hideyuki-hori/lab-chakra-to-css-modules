import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
} from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactElement } from 'react';

interface ActionItem {
  label: string;
  icon?: IconType;
  onClick: () => void;
  color?: string;
  isDividerBefore?: boolean;
}

interface ActionMenuProps {
  items: ActionItem[];
  ariaLabel?: string;
  icon?: ReactElement;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'solid';
}

export default function ActionMenu({
  items,
  ariaLabel = 'アクション',
  icon,
  size = 'sm',
  variant = 'ghost',
}: ActionMenuProps) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={icon || <FiMoreVertical />}
        variant={variant}
        size={size}
        aria-label={ariaLabel}
      />
      <MenuList>
        {items.map((item, index) => (
          <span key={index}>
            {item.isDividerBefore && <MenuDivider />}
            <MenuItem
              icon={item.icon ? <item.icon /> : undefined}
              onClick={item.onClick}
              color={item.color}
            >
              {item.label}
            </MenuItem>
          </span>
        ))}
      </MenuList>
    </Menu>
  );
}
