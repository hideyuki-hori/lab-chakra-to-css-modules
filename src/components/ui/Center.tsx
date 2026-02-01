import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';
import styles from './Center.module.css';

export interface CenterProps extends BoxProps {}

export const Center = forwardRef<HTMLDivElement, CenterProps>(({
  className,
  style,
  ...props
}, ref) => {
  const centerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  };

  const classNames = [styles.center, className].filter(Boolean).join(' ');

  return <Box ref={ref} className={classNames} style={centerStyle} {...props} />;
});

Center.displayName = 'Center';

export default Center;
