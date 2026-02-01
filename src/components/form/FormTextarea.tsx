import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

interface FormTextareaProps extends TextareaProps {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, isRequired = false, ...props }, ref) => {
    return (
      <FormControl isInvalid={!!error} isRequired={isRequired}>
        {label && <FormLabel>{label}</FormLabel>}
        <Textarea ref={ref} bg="white" {...props} />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
