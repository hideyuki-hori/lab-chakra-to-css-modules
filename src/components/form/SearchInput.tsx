import { InputHTMLAttributes } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import styles from '../../styles/components/form/SearchInput.module.css';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
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
  className = '',
  ...props
}: SearchInputProps) {
  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  const inputClasses = [
    styles.input,
    showClearButton && value && styles.inputWithClear,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.container}>
      <FiSearch className={styles.searchIcon} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClasses}
        {...props}
      />
      {showClearButton && value && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="クリア"
        >
          <FiX />
        </button>
      )}
    </div>
  );
}
