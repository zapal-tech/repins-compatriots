import clsx from 'clsx';
import Link from 'next/link';

import { Collection } from '@cms/types';
import { LinkData, LinkType } from '@cms/types/fields/link';

import { getLastFromArray } from '@shared/utils';

import { Button } from './Button';

type CMSLinkProps = LinkData & {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.EventHandler<any>;
  hrefLang?: string;
  ref?: React.Ref<HTMLAnchorElement | HTMLButtonElement>;
};

export const CMSLink: React.FC<CMSLinkProps> = ({
  appearance = 'default',
  children,
  className,
  text,
  hrefLang,
  newTab,
  noFollow,
  onClick,
  doc,
  linkType = LinkType.Custom,
  url,
  ref,
  arrow,
}) => {
  let href = url;

  if (linkType === LinkType.Internal && typeof doc?.value === 'object' && doc?.value?.slug) {
    const { breadcrumbs, slug } = (doc.value as any) || { breadcrumbs: [], slug: '' };

    const collectionPrefix: Record<string, string> = {
      // [Collection.Posts]: 'blog',
    };

    const prefix = doc?.relationTo === Collection.Pages ? '' : `/${collectionPrefix[doc?.relationTo]}`;
    const suffix = Array.isArray(breadcrumbs) && breadcrumbs.length > 1 ? getLastFromArray(breadcrumbs).url : slug;

    href = `${prefix}/${suffix}`;
  }

  if (!href) return null;

  if (appearance === 'default') {
    const rel: string[] = [];

    if (noFollow) rel.push('nofollow');
    if (newTab) rel.push('noopener', 'noreferrer');

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={clsx(className, 'text-sky')}
        href={href}
        hrefLang={hrefLang}
        onClick={onClick}
        rel={rel.join(' ')}
        target={newTab ? '_blank' : undefined}
      >
        {text && text}
        {children && children}
      </Link>
    );
  }

  return (
    <Button
      type="link"
      ref={ref as React.Ref<HTMLButtonElement>}
      style={appearance}
      className={clsx('inline-block h-max w-full px-8 py-4 md:w-max', className)}
      href={href}
      newTab={newTab}
      noFollow={noFollow}
      onClick={onClick}
      arrow={arrow}
    >
      {text && text}
      {children && children}
    </Button>
  );
};
