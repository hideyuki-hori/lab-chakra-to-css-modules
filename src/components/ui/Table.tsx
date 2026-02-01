import { forwardRef, HTMLAttributes, TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes, ReactNode, createContext, useContext } from 'react';
import styles from './Table.module.css';

export type TableVariant = 'simple' | 'striped';
export type TableSize = 'sm' | 'md' | 'lg';

interface TableContextValue {
  variant: TableVariant;
  size: TableSize;
}

const TableContext = createContext<TableContextValue>({ variant: 'simple', size: 'md' });

const useTableContext = (): TableContextValue => {
  return useContext(TableContext);
};

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  variant?: TableVariant;
  size?: TableSize;
  children?: ReactNode;
}

export interface TheadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
}

export interface TbodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
}

export interface TrProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
}

export interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  isNumeric?: boolean;
}

export interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  isNumeric?: boolean;
}

const sizeClassMap: Record<TableSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ variant = 'simple', size = 'md', children, className, ...props }, ref) => {
    const classNames = [
      styles.table,
      variant === 'striped' && styles.striped,
      sizeClassMap[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const contextValue: TableContextValue = { variant, size };

    return (
      <TableContext.Provider value={contextValue}>
        <table ref={ref} className={classNames} {...props}>
          {children}
        </table>
      </TableContext.Provider>
    );
  }
);

Table.displayName = 'Table';

const Thead = forwardRef<HTMLTableSectionElement, TheadProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.thead, className].filter(Boolean).join(' ');

    return (
      <thead ref={ref} className={classNames} {...props}>
        {children}
      </thead>
    );
  }
);

Thead.displayName = 'Thead';

const Tbody = forwardRef<HTMLTableSectionElement, TbodyProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.tbody, className].filter(Boolean).join(' ');

    return (
      <tbody ref={ref} className={classNames} {...props}>
        {children}
      </tbody>
    );
  }
);

Tbody.displayName = 'Tbody';

const Tr = forwardRef<HTMLTableRowElement, TrProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.tr, className].filter(Boolean).join(' ');

    return (
      <tr ref={ref} className={classNames} {...props}>
        {children}
      </tr>
    );
  }
);

Tr.displayName = 'Tr';

const Th = forwardRef<HTMLTableCellElement, ThProps>(
  ({ children, className, isNumeric, ...props }, ref) => {
    const { size } = useTableContext();
    const classNames = [
      styles.th,
      sizeClassMap[size],
      isNumeric && styles.numeric,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <th ref={ref} className={classNames} {...props}>
        {children}
      </th>
    );
  }
);

Th.displayName = 'Th';

const Td = forwardRef<HTMLTableCellElement, TdProps>(
  ({ children, className, isNumeric, ...props }, ref) => {
    const { size } = useTableContext();
    const classNames = [
      styles.td,
      sizeClassMap[size],
      isNumeric && styles.numeric,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <td ref={ref} className={classNames} {...props}>
        {children}
      </td>
    );
  }
);

Td.displayName = 'Td';

export { Table, Thead, Tbody, Tr, Th, Td };
export default Table;
