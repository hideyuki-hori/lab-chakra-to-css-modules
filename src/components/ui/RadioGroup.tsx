import { createContext, forwardRef, HTMLAttributes, ReactNode, useId } from 'react';
import styles from './RadioGroup.module.css';

export interface RadioGroupContextValue {
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  name?: string;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, onChange, children, name, className, ...props }, ref) => {
    const generatedId = useId();
    const groupName = name || `radio-group-${generatedId}`;

    const classNames = [styles.group, className].filter(Boolean).join(' ');

    return (
      <RadioGroupContext.Provider value={{ value, onChange, name: groupName }}>
        <div ref={ref} role="radiogroup" className={classNames} {...props}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
