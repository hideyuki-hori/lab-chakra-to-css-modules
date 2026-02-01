import React, { forwardRef } from 'react';
import styles from './Textarea.module.css';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: TextareaSize;
  isInvalid?: boolean;
  isDisabled?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      isInvalid = false,
      isDisabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.textarea,
      styles[size],
      isInvalid ? styles.invalid : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <textarea
        ref={ref}
        className={classNames}
        disabled={isDisabled}
        aria-invalid={isInvalid}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
