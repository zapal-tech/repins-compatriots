import { appName } from '@shared';
import type { Metadata } from 'next';

import type { Page } from '@cms/types/generated-types';

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

export const generateMeta = ({ doc }: { doc?: Partial<Page> | null }): Metadata => {
  const ogImage =
    doc?.meta?.image &&
    typeof doc?.meta?.image === 'object' &&
    doc?.meta?.image !== null &&
    'url' in doc.meta.image &&
    doc.meta.image.url;

  return {
    title: doc?.meta?.title || `${(doc as any)?.title ? `${(doc as any).title} | ` : ''}${appName}`,
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      title: doc?.meta?.title || appName,
      description: doc?.meta?.description || undefined,
      url:
        process.env.NEXT_PUBLIC_SITE_URL +
        ((doc as any)?.slug && Array.isArray((doc as any).slug) ? getPathFromSlugArr((doc as any).slug) : '/'),
      images: ogImage ? [{ url: ogImage }] : undefined,
    }),
  };
};
