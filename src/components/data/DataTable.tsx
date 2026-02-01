import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { EmptyState } from '../ui';
import styles from '../../styles/components/data-table.module.css';

interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render: (item: T) => ReactNode;
}

interface DataTableProps<T> {
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
}: DataTableProps<T>) {
  const rowClasses = [styles.tr, onRowClick ? styles.trClickable : ''].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={styles.th}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isAnimated ? (
            <AnimatePresence mode="popLayout">
              {data.map((item) => (
                <motion.tr
                  key={keyExtractor(item)}
                  className={rowClasses}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <td key={column.key} className={styles.td}>
                      {column.render(item)}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          ) : (
            data.map((item) => (
              <tr
                key={keyExtractor(item)}
                className={rowClasses}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <td key={column.key} className={styles.td}>
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {data.length === 0 && <EmptyState title={emptyMessage} />}
    </div>
  );
}
