import { forwardRef, HTMLAttributes, Children, isValidElement, cloneElement } from 'react';
import styles from './InputGroup.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement>, LayoutProps {}

interface ComponentWithDisplayName {
  displayName?: string;
}

const hasDisplayName = (type: unknown): type is ComponentWithDisplayName => {
  if (type === null || (typeof type !== 'function' && typeof type !== 'object')) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(type, 'displayName');
};

const getDisplayName = (type: unknown): string | undefined => {
  if (hasDisplayName(type)) {
    return type.displayName;
  }
  return undefined;
};

const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ children, className, style, ...props }, ref) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [styles.inputGroup, className].filter(Boolean).join(' ');

    const mergedStyle = mergeStyles(layoutStyle, style);

    let hasLeftElement = false;
    let hasRightElement = false;

    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        const displayName = getDisplayName(child.type);
        if (displayName === 'InputLeftElement') {
          hasLeftElement = true;
        }
        if (displayName === 'InputRightElement') {
          hasRightElement = true;
        }
      }
    });

    const enhancedChildren = Children.map(children, (child) => {
      if (isValidElement<{ hasLeftElement?: boolean; hasRightElement?: boolean }>(child)) {
        const displayName = getDisplayName(child.type);
        if (displayName === 'Input') {
          return cloneElement(child, {
            hasLeftElement,
            hasRightElement,
          });
        }
      }
      return child;
    });

    return (
      <div ref={ref} className={classNames} style={mergedStyle} {...rest}>
        {enhancedChildren}
      </div>
    );
  }
);

InputGroup.displayName = 'InputGroup';

export default InputGroup;
