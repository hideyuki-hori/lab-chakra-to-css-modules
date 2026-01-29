import { HStack, Text, Select, Flex, FlexProps } from '@chakra-ui/react';
import { FiFilter } from 'react-icons/fi';
import { SearchInput } from '../form';
import { ReactNode } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  key: string;
  placeholder: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  width?: string;
}

interface FilterBarProps extends FlexProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  actions?: ReactNode;
}

export default function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = '検索...',
  filters = [],
  actions,
  ...props
}: FilterBarProps) {
  return (
    <Flex gap={4} flexWrap="wrap" align="center" {...props}>
      {onSearchChange && (
        <SearchInput
          value={searchValue || ''}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          maxW="400px"
          flex="1"
          minW="200px"
        />
      )}

      {filters.length > 0 && (
        <HStack spacing={3} flex="1" flexWrap="wrap">
          <HStack spacing={2}>
            <FiFilter />
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
              フィルター:
            </Text>
          </HStack>
          {filters.map((filter) => (
            <Select
              key={filter.key}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              bg="white"
              maxW={filter.width || '200px'}
              size="md"
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          ))}
        </HStack>
      )}

      {actions}
    </Flex>
  );
}
