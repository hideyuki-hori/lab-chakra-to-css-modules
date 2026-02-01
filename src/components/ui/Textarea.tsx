import { forwardRef, TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'color'>, LayoutProps {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      isDisabled = false,
      isInvalid = false,
      isReadOnly = false,
      isRequired = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [styles.textarea, className].filter(Boolean).join(' ');

    const mergedStyle = mergeStyles(layoutStyle, style);

    return (
      <textarea
        ref={ref}
        className={classNames}
        style={mergedStyle}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        aria-invalid={isInvalid || undefined}
        {...rest}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
