import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableProps,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { EmptyState } from '../ui';

const MotionTr = motion(Tr);

interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render: (item: T) => ReactNode;
}

interface DataTableProps<T> extends Omit<TableProps, 'children'> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  isAnimated?: boolean;
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  isAnimated = true,
  emptyMessage = '検索条件に一致するデータが見つかりませんでした',
  ...tableProps
}: DataTableProps<T>) {
  return (
    <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
      <Table variant="simple" {...tableProps}>
        <Thead bg="gray.50">
          <Tr>
            {columns.map((column) => (
              <Th key={column.key} width={column.width}>
                {column.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {isAnimated ? (
            <AnimatePresence mode="popLayout">
              {data.map((item) => (
                <MotionTr
                  key={keyExtractor(item)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                  cursor={onRowClick ? 'pointer' : 'default'}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <Td key={column.key}>{column.render(item)}</Td>
                  ))}
                </MotionTr>
              ))}
            </AnimatePresence>
          ) : (
            data.map((item) => (
              <Tr
                key={keyExtractor(item)}
                _hover={{ bg: 'gray.50' }}
                cursor={onRowClick ? 'pointer' : 'default'}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <Td key={column.key}>{column.render(item)}</Td>
                ))}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {data.length === 0 && <EmptyState title={emptyMessage} />}
    </Box>
  );
}
