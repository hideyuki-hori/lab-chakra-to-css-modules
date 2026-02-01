import { FiFilter } from 'react-icons/fi';
import { SearchInput } from '../form';
import { ReactNode, HTMLAttributes } from 'react';
import styles from '../../styles/components/common/FilterBar.module.css';

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

interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
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
  className = '',
  ...props
}: FilterBarProps) {
  const containerClasses = [styles.container, className].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      {onSearchChange && (
        <div className={styles.searchContainer}>
          <SearchInput
            value={searchValue || ''}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        </div>
      )}

      {filters.length > 0 && (
        <div className={styles.filters}>
          <div className={styles.filterLabel}>
            <FiFilter className={styles.filterIcon} />
            <span className={styles.filterText}>フィルター:</span>
          </div>
          {filters.map((filter) => (
            <select
              key={filter.key}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className={styles.select}
              style={filter.width ? { maxWidth: filter.width } : undefined}
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}

      {actions}
    </div>
  );
}
