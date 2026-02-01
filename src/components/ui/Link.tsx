import { forwardRef, AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './Link.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>, LayoutProps {
  isExternal?: boolean;
  children?: ReactNode;
  color?: string;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      isExternal = false,
      children,
      color,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { layoutProps, rest } = extractLayoutProps({ color, ...props });
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [
      styles.link,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const mergedStyle = mergeStyles(layoutStyle, style);

    const externalProps = isExternal
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

    return (
      <a
        ref={ref}
        className={classNames}
        style={mergedStyle}
        {...externalProps}
        {...rest}
      >
        {children}
        {isExternal && (
          <svg
            className={styles.externalIcon}
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="currentColor"
          >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';

export default Link;
