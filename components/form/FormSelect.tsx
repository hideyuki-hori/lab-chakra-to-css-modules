import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  SelectProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends Omit<SelectProps, 'children'> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      error,
      helperText,
      isRequired = false,
      options,
      placeholder = '選択してください',
      ...props
    },
    ref
  ) => {
    return (
      <FormControl isInvalid={!!error} isRequired={isRequired}>
        {label && <FormLabel>{label}</FormLabel>}
        <Select ref={ref} bg="white" placeholder={placeholder} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
