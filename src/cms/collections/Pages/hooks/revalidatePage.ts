import { revalidatePath } from 'next/cache';
import { CollectionAfterChangeHook } from 'payload';

import { Collection } from '@cms/types';

import { revalidate } from '@cms/utils/revalidate';

export const revalidatePage: CollectionAfterChangeHook = ({ doc, req: { payload, locale } }) => {
  if (doc._status === 'published') {
    revalidate({ slug: doc.slug, collection: Collection.Pages, payload });

    if (doc.slug === 'home') revalidatePath(`/${locale || ''}`, 'page');
  }

  return doc;
};
