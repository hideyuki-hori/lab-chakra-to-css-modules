import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  InputProps,
} from '@chakra-ui/react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchInputProps extends Omit<InputProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
}

export default function SearchInput({
  value,
  onChange,
  onClear,
  showClearButton = true,
  placeholder = '検索...',
  ...props
}: SearchInputProps) {
  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <FiSearch color="gray" />
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        bg="white"
        {...props}
      />
      {showClearButton && value && (
        <InputRightElement>
          <IconButton
            aria-label="クリア"
            icon={<FiX />}
            size="sm"
            variant="ghost"
            onClick={handleClear}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
}
