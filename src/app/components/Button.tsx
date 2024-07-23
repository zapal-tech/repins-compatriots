import { UrlObject } from 'url';
import React, { forwardRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' | 'link';
  size?: 'small' | 'default';
  style?: 'primary' | 'secondary';
  href?: string | UrlObject;
  newTab?: boolean;
  noFollow?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: (event: any) => void;
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>;
};

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  size = 'default',
  style = 'primary',
  newTab,
  noFollow,
  disabled,
  loading,
  children,
  className,
  onClick,
  href = '#',
  ref,
}) => {
  const isLink = type === 'link';
  const Tag = isLink ? Link : 'button';

  const rel: string[] = [];

  if (isLink && noFollow) rel.push('nofollow');
  if (isLink && newTab) rel.push('noopener', 'noreferrer');

  const props = isLink
    ? { href: disabled ? '' : href, rel: rel.join(' '), target: newTab ? '_blank' : undefined }
    : { type, disabled, onClick: disabled || loading ? undefined : onClick };

  return (
    <Tag
      // @ts-expect-error
      ref={ref}
      className={clsx(
        'cursor-pointer rounded-full px-4 font-sans text-lg font-normal xl:text-lg-desktop',
        {
          ['h-12']: size === 'default',
        },
        {
          ['bg-mallard text-gray-50']: style === 'primary',
          ['border border-mallard bg-transparent text-mallard']: style === 'secondary',
        },
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};
