'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CMSLinkProps } from './CMSLink';

type HeaderLinkProps = {
  text?: string | null;
  children: React.ReactNode;
  href: string;
  rel: string;
  target?: string;
} & CMSLinkProps;

export const HeaderLink: React.FC<HeaderLinkProps> = ({
  children,
  className,
  text,
  hrefLang,
  target,
  onClick,
  ref,
  href,
  rel,
}) => {
  const pathname = usePathname();

  return (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      className={clsx(className, pathname.includes(href) && 'text-lemongrass')}
      href={href}
      hrefLang={hrefLang}
      onClick={onClick}
      rel={rel}
      target={target}
    >
      {text && text}
      {children && children}
    </Link>
  );
};
