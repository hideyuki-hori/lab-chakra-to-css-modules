import React from 'react';
import styles from './Divider.module.css';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: DividerOrientation;
}

export function Divider({
  orientation = 'horizontal',
  className,
  ...props
}: DividerProps) {
  const classNames = [styles.divider, styles[orientation], className]
    .filter(Boolean)
    .join(' ');

  return <hr className={classNames} {...props} />;
}

export default Divider;
