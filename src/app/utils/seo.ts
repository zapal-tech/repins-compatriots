import { appName } from '@shared';
import type { Metadata } from 'next';

import type { Page } from '@cms/types/generated-types';

import { Locale } from '@shared/i18n';

import { getPathFromSlugArr } from './slug';

const defaultOpenGraph: Metadata['openGraph'] = {
  title: appName,
  description: appName,
  siteName: appName,
  images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.webp` }],
  type: 'website',
};

const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => ({
  ...defaultOpenGraph,
  ...og,
  images: og?.images ? og.images : defaultOpenGraph.images,
});

const localeAppNames = (locale?: Locale) => (locale === Locale.Ukrainian ? 'Земляки Рєпіна' : appName);

export const generateMeta = ({ doc, locale }: { doc?: Partial<Page> | null; locale?: Locale }): Metadata => {
  const ogImage =
    doc?.meta?.image &&
    typeof doc?.meta?.image === 'object' &&
    doc?.meta?.image !== null &&
    'url' in doc.meta.image &&
    doc.meta.image.url;

  return {
    title: doc?.meta?.title || `${(doc as any)?.title ? `${(doc as any).title} | ` : ''}${localeAppNames(locale)}`,
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      title: doc?.meta?.title || localeAppNames(locale),
      description: doc?.meta?.description || undefined,
      url:
        process.env.NEXT_PUBLIC_SITE_URL +
        ((doc as any)?.slug && Array.isArray((doc as any).slug) ? getPathFromSlugArr((doc as any).slug) : '/'),
      images: ogImage ? [{ url: ogImage }] : undefined,
    }),
  };
};
