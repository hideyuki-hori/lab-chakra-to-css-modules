import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './InputRightElement.module.css';

export interface InputRightElementProps extends HTMLAttributes<HTMLDivElement> {
  pointerEvents?: 'none' | 'auto';
  children?: ReactNode;
}

const InputRightElement = forwardRef<HTMLDivElement, InputRightElementProps>(
  ({ pointerEvents = 'auto', children, className, ...props }, ref) => {
    const classNames = [
      styles.inputRightElement,
      pointerEvents === 'none' ? styles.pointerEventsNone : undefined,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

InputRightElement.displayName = 'InputRightElement';

export default InputRightElement;
