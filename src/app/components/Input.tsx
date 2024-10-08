import clsx from 'clsx';

import { Text } from './Text';

export type InputProps = {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  name: string;
  id?: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'hidden';
  className?: string;
  required?: boolean;
};

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  defaultValue,
  name,
  id,
  type,
  className,
  required,
}) => (
  <div className={clsx('mb-4 w-full', className)}>
    {label && (
      <Text tag="label" htmlFor={name || id} size="sm" className="mb-1.5">
        {label}
      </Text>
    )}

    <input
      type={type}
      id={id}
      name={name}
      defaultValue={defaultValue}
      className="w-full border border-gray-600 bg-transparent p-3 text-base focus:border-gray-800 focus:ring-gray-800
        xl:text-base-desktop"
      placeholder={placeholder}
      required={required}
    />
  </div>
);
