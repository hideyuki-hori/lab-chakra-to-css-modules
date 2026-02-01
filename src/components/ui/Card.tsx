import { forwardRef, HTMLAttributes, ReactNode, CSSProperties } from 'react';
import styles from './Card.module.css';
import { buildStyles, LayoutProps, extractLayoutProps, mergeStyles } from './styleUtils';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  children?: ReactNode;
  isHoverable?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface CardBodyProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, LayoutProps {
  children?: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, style, isHoverable = false, ...props }, ref) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [styles.card, isHoverable && styles.hoverable, className]
      .filter(Boolean)
      .join(' ');

    const mergedStyle = mergeStyles(layoutStyle, style);

    return (
      <div ref={ref} className={classNames} style={mergedStyle} {...rest}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, style, ...props }, ref) => {
    const classNames = [styles.cardHeader, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} style={style} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, style, ...props }, ref) => {
    const { layoutProps, rest } = extractLayoutProps(props);
    const { style: layoutStyle } = buildStyles(layoutProps);

    const classNames = [styles.cardBody, className].filter(Boolean).join(' ');

    const mergedStyle = mergeStyles(layoutStyle, style);

    return (
      <div ref={ref} className={classNames} style={mergedStyle} {...rest}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export default Card;
export { CardHeader, CardBody };
