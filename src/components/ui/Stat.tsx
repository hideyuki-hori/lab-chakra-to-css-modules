import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './Stat.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';

export type StatArrowType = 'increase' | 'decrease';

export interface StatProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  children?: ReactNode;
}

export interface StatLabelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface StatNumberProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  children?: ReactNode;
}

export interface StatHelpTextProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface StatArrowProps extends HTMLAttributes<HTMLSpanElement> {
  type: StatArrowType;
}

const Stat = forwardRef<HTMLDivElement, StatProps>(
  ({ children, className, style, ...props }, ref) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [styles.stat, className].filter(Boolean).join(' ');

    const mergedStyle = mergeStyles(layoutStyle, style);

    return (
      <div ref={ref} className={classNames} style={mergedStyle} {...rest}>
        {children}
      </div>
    );
  }
);

Stat.displayName = 'Stat';

const StatLabel = forwardRef<HTMLDivElement, StatLabelProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.statLabel, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

StatLabel.displayName = 'StatLabel';

const StatNumber = forwardRef<HTMLDivElement, StatNumberProps>(
  ({ children, className, style, ...props }, ref) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [styles.statNumber, className].filter(Boolean).join(' ');

    const mergedStyle = mergeStyles(layoutStyle, style);

    return (
      <div ref={ref} className={classNames} style={mergedStyle} {...rest}>
        {children}
      </div>
    );
  }
);

StatNumber.displayName = 'StatNumber';

const StatHelpText = forwardRef<HTMLDivElement, StatHelpTextProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.statHelpText, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

StatHelpText.displayName = 'StatHelpText';

const IncreaseArrow = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 4l-8 8h6v8h4v-8h6z" />
  </svg>
);

const DecreaseArrow = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 20l8-8h-6v-8h-4v8h-6z" />
  </svg>
);

const StatArrow = forwardRef<HTMLSpanElement, StatArrowProps>(
  ({ type, className, ...props }, ref) => {
    const classNames = [
      styles.statArrow,
      type === 'increase' ? styles.increase : styles.decrease,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {type === 'increase' ? <IncreaseArrow /> : <DecreaseArrow />}
      </span>
    );
  }
);

StatArrow.displayName = 'StatArrow';

export { Stat, StatLabel, StatNumber, StatHelpText, StatArrow };
export default Stat;
