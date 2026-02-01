import {
  FormControl,
  FormErrorMessage,
  Checkbox,
  CheckboxProps,
  Box,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface FormCheckboxProps extends CheckboxProps {
  error?: string;
  isAnimated?: boolean;
}

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ error, isAnimated = true, children, ...props }, ref) => {
    const checkbox = (
      <Checkbox ref={ref} colorScheme="primary" {...props}>
        {children}
      </Checkbox>
    );

    if (isAnimated) {
      return (
        <FormControl isInvalid={!!error}>
          <MotionBox
            display="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {checkbox}
          </MotionBox>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      );
    }

    return (
      <FormControl isInvalid={!!error}>
        {checkbox}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;
