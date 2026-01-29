import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  RadioGroup,
  Radio,
  Stack,
  RadioGroupProps,
} from '@chakra-ui/react';

interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps extends Omit<RadioGroupProps, 'children'> {
  label?: string;
  error?: string;
  isRequired?: boolean;
  options: RadioOption[];
  direction?: 'row' | 'column';
}

export default function FormRadioGroup({
  label,
  error,
  isRequired = false,
  options,
  direction = 'row',
  ...props
}: FormRadioGroupProps) {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup {...props}>
        <Stack direction={direction} spacing={4}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value} colorScheme="primary">
              {option.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
