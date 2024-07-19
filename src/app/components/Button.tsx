import { UrlObject } from 'url';
import React, { forwardRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' | 'link';
  size?: 'small' | 'default' | 'large';
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
      className={clsx(className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
