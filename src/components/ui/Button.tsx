import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Box,
  forwardRef,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ChakraButtonProps, 'variant' | 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isAnimated?: boolean;
}

const variantStyles: Record<ButtonVariant, ChakraButtonProps> = {
  primary: {
    colorScheme: 'primary',
  },
  secondary: {
    colorScheme: 'gray',
    variant: 'outline',
  },
  danger: {
    colorScheme: 'red',
  },
  ghost: {
    variant: 'ghost',
  },
  outline: {
    variant: 'outline',
    colorScheme: 'primary',
  },
};

const sizeStyles: Record<ButtonSize, ChakraButtonProps> = {
  sm: { size: 'sm', fontSize: 'sm', px: 3, py: 1 },
  md: { size: 'md', fontSize: 'md', px: 4, py: 2 },
  lg: { size: 'lg', fontSize: 'lg', px: 6, py: 3 },
};

const Button = forwardRef<ButtonProps, 'button'>(
  ({ variant = 'primary', size = 'md', isAnimated = true, children, ...props }, ref) => {
    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];

    const button = (
      <ChakraButton ref={ref} {...variantStyle} {...sizeStyle} {...props}>
        {children}
      </ChakraButton>
    );

    if (isAnimated) {
      return (
        <MotionBox
          display="inline-block"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {button}
        </MotionBox>
      );
    }

    return button;
  }
);

Button.displayName = 'Button';

export default Button;
