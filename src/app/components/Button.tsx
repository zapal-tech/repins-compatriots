import { UrlObject } from 'url';
import React, { forwardRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' | 'link';
  size?: 'small' | 'default';
  style?: 'primary' | 'secondary' | 'blue with border' | 'primary light' | 'blue';
  href?: string | UrlObject;
  newTab?: boolean;
  noFollow?: boolean;
  disabled?: boolean;
  loading?: boolean;
  arrow?: boolean;
  fullWidth?: boolean;
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
  arrow,
  fullWidth,
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
        'cursor-pointer rounded-full font-sans text-lg font-normal xl:text-lg-desktop',
        fullWidth && 'w-full',
        style !== 'blue' && 'px-4',
        {
          ['h-12']: size === 'default',
        },
        {
          ['bg-mallard text-gray-50']: style === 'primary',
          ['border border-mallard bg-transparent text-mallard']: style === 'secondary',
          ['text-sky']: style === 'blue',
          ['border border-sky bg-transparent text-sky']: style === 'blue with border',
          ['bg-lemongrass text-mallard']: style === 'primary light',
        },
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-5">
        {children}

        {arrow && (
          <svg width="22" height="19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M.333 9.451c0-.309.12-.606.335-.825.214-.218.505-.341.808-.341h16.211l-6.336-6.16A1.18 1.18 0 0 1 11.345.5c.206-.219.487-.347.784-.357.297-.01.587.098.807.302l8.381 8.166a1.168 1.168 0 0 1 .35.84 1.187 1.187 0 0 1-.35.84l-8.381 8.167a1.143 1.143 0 0 1-.822.35 1.122 1.122 0 0 1-.819-.357 1.169 1.169 0 0 1-.318-.848 1.185 1.185 0 0 1 .374-.825l6.336-6.16H1.477c-.304 0-.595-.123-.809-.342a1.179 1.179 0 0 1-.335-.825Z"
              className={clsx({
                ['fill-gray-50']: style === 'primary',
                ['fill-mallard']: style === 'secondary' || style === 'primary light',
                ['fill-sky']: style === 'blue with border' || style === 'blue',
              })}
            />
          </svg>
        )}
      </div>
    </Tag>
  );
};
