import React from 'react';
import styles from './Table.module.css';

export type TableSize = 'sm' | 'md' | 'lg';
export type TableVariant = 'simple' | 'striped';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  size?: TableSize;
  variant?: TableVariant;
}

export function Table({
  size = 'md',
  variant = 'simple',
  className,
  children,
  ...props
}: TableProps) {
  const classNames = [styles.table, styles[size], styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.tableContainer}>
      <table className={classNames} {...props}>
        {children}
      </table>
    </div>
  );
}

export interface TheadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function Thead({ className, children, ...props }: TheadProps) {
  const classNames = [styles.thead, className].filter(Boolean).join(' ');
  return (
    <thead className={classNames} {...props}>
      {children}
    </thead>
  );
}

export interface TbodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function Tbody({ className, children, ...props }: TbodyProps) {
  const classNames = [styles.tbody, className].filter(Boolean).join(' ');
  return (
    <tbody className={classNames} {...props}>
      {children}
    </tbody>
  );
}

export interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export function Tr({ className, children, ...props }: TrProps) {
  const classNames = [styles.tr, className].filter(Boolean).join(' ');
  return (
    <tr className={classNames} {...props}>
      {children}
    </tr>
  );
}

export interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  isNumeric?: boolean;
}

export function Th({ isNumeric = false, className, children, ...props }: ThProps) {
  const classNames = [styles.th, isNumeric ? styles.numeric : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <th className={classNames} {...props}>
      {children}
    </th>
  );
}

export interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  isNumeric?: boolean;
}

export function Td({ isNumeric = false, className, children, ...props }: TdProps) {
  const classNames = [styles.td, isNumeric ? styles.numeric : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <td className={classNames} {...props}>
      {children}
    </td>
  );
}

export default Table;
