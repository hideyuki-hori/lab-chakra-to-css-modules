import { forwardRef, HTMLAttributes, ReactNode, Children, cloneElement, isValidElement, Key } from 'react';
import styles from './AvatarGroup.module.css';
import { AvatarSize, AvatarProps } from './Avatar';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  max?: number;
  children?: ReactNode;
}

const excessSizeClassMap: Record<AvatarSize, string> = {
  '2xs': styles.excessSize2xs,
  xs: styles.excessSizeXs,
  sm: styles.excessSizeSm,
  md: styles.excessSizeMd,
  lg: styles.excessSizeLg,
  xl: styles.excessSizeXl,
  '2xl': styles.excessSize2xl,
};

const isAvatarSize = (value: unknown): value is AvatarSize => {
  return typeof value === 'string' && ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value);
};

const isValidKey = (value: unknown): value is Key => {
  return typeof value === 'string' || typeof value === 'number';
};

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ size = 'md', max, children, className, ...props }, ref) => {
    const childArray = Children.toArray(children).filter(isValidElement);
    const totalCount = childArray.length;
    const displayCount = max !== undefined && max < totalCount ? max : totalCount;
    const excessCount = totalCount - displayCount;

    const visibleChildren = childArray.slice(0, displayCount);

    const clonedChildren = visibleChildren.map((child, index) => {
      if (isValidElement<AvatarProps>(child)) {
        const childSize = isAvatarSize(child.props.size) ? child.props.size : size;
        const childKey = isValidKey(child.key) ? child.key : index;
        return cloneElement(child, {
          key: childKey,
          size: childSize,
        });
      }
      return child;
    });

    const isSmallSize = size === '2xs' || size === 'xs' || size === 'sm';

    const groupClassNames = [
      styles.avatarGroup,
      isSmallSize ? styles.avatarGroupSmall : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const excessLabelClassNames = [styles.excessLabel, excessSizeClassMap[size]]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={groupClassNames} {...props}>
        {excessCount > 0 && (
          <span className={excessLabelClassNames}>+{excessCount}</span>
        )}
        {clonedChildren.reverse()}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export default AvatarGroup;
