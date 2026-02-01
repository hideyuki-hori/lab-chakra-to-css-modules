'use client';

import { forwardRef, HTMLAttributes, ReactNode, useState, useRef, useEffect, cloneElement, isValidElement, ReactElement } from 'react';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  label: ReactNode;
  placement?: TooltipPlacement;
  hasArrow?: boolean;
  isDisabled?: boolean;
  openDelay?: number;
  closeDelay?: number;
  children: ReactElement;
}

const placementClassMap: Record<TooltipPlacement, string> = {
  top: styles.placementTop,
  bottom: styles.placementBottom,
  left: styles.placementLeft,
  right: styles.placementRight,
};

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      label,
      placement = 'top',
      hasArrow = true,
      isDisabled = false,
      openDelay = 0,
      closeDelay = 0,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const triggerRef = useRef<HTMLElement>(null);

    useEffect(() => {
      return () => {
        if (openTimeoutRef.current) {
          clearTimeout(openTimeoutRef.current);
        }
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
        }
      };
    }, []);

    const handleMouseEnter = () => {
      if (isDisabled) return;

      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }

      if (openDelay > 0) {
        openTimeoutRef.current = setTimeout(() => {
          setIsOpen(true);
        }, openDelay);
      } else {
        setIsOpen(true);
      }
    };

    const handleMouseLeave = () => {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
        openTimeoutRef.current = null;
      }

      if (closeDelay > 0) {
        closeTimeoutRef.current = setTimeout(() => {
          setIsOpen(false);
        }, closeDelay);
      } else {
        setIsOpen(false);
      }
    };

    const handleFocus = () => {
      if (isDisabled) return;
      setIsOpen(true);
    };

    const handleBlur = () => {
      setIsOpen(false);
    };

    if (!isValidElement(children)) {
      return null;
    }

    const wrapperClassNames = [
      styles.wrapper,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const tooltipClassNames = [
      styles.tooltip,
      placementClassMap[placement],
      hasArrow ? styles.hasArrow : '',
      isOpen ? styles.visible : '',
    ]
      .filter(Boolean)
      .join(' ');

    const childWithEvents = cloneElement(children, {
      ref: triggerRef,
      onMouseEnter: (e: React.MouseEvent) => {
        handleMouseEnter();
        if (children.props.onMouseEnter) {
          children.props.onMouseEnter(e);
        }
      },
      onMouseLeave: (e: React.MouseEvent) => {
        handleMouseLeave();
        if (children.props.onMouseLeave) {
          children.props.onMouseLeave(e);
        }
      },
      onFocus: (e: React.FocusEvent) => {
        handleFocus();
        if (children.props.onFocus) {
          children.props.onFocus(e);
        }
      },
      onBlur: (e: React.FocusEvent) => {
        handleBlur();
        if (children.props.onBlur) {
          children.props.onBlur(e);
        }
      },
    });

    return (
      <div ref={ref} className={wrapperClassNames} {...props}>
        {childWithEvents}
        <div className={tooltipClassNames} role="tooltip">
          {label}
        </div>
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
