import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './InputLeftElement.module.css';

export interface InputLeftElementProps extends HTMLAttributes<HTMLDivElement> {
  pointerEvents?: 'none' | 'auto';
  children?: ReactNode;
}

const InputLeftElement = forwardRef<HTMLDivElement, InputLeftElementProps>(
  ({ pointerEvents = 'auto', children, className, ...props }, ref) => {
    const classNames = [
      styles.inputLeftElement,
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

InputLeftElement.displayName = 'InputLeftElement';

export default InputLeftElement;
