import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';

interface FormInputProps extends InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      helperText,
      isRequired = false,
      leftElement,
      rightElement,
      ...props
    },
    ref
  ) => {
    const hasLeftElement = !!leftElement;
    const hasRightElement = !!rightElement;

    return (
      <FormControl isInvalid={!!error} isRequired={isRequired}>
        {label && <FormLabel>{label}</FormLabel>}
        {hasLeftElement || hasRightElement ? (
          <InputGroup>
            {hasLeftElement && (
              <InputLeftElement pointerEvents="none">{leftElement}</InputLeftElement>
            )}
            <Input ref={ref} bg="white" {...props} />
            {hasRightElement && <InputRightElement>{rightElement}</InputRightElement>}
          </InputGroup>
        ) : (
          <Input ref={ref} bg="white" {...props} />
        )}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
