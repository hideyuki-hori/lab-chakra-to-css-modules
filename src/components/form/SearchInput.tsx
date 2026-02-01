import { InputHTMLAttributes } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import styles from '../../styles/components/form.module.css';

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
  className,
  ...props
}: SearchInputProps) {
  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  const inputClasses = [styles.input, styles.inputWithLeftElement, value && showClearButton ? styles.inputWithRightElement : '', className].filter(Boolean).join(' ');

  return (
    <div className={styles.inputGroup}>
      <span className={styles.leftElement}>
        <FiSearch />
      </span>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClasses}
        {...props}
      />
      {showClearButton && value && (
        <span className={styles.rightElement}>
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="クリア"
          >
            <FiX />
          </button>
        </span>
      )}
    </div>
  );
}
