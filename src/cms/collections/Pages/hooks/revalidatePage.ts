import { CollectionAfterChangeHook } from 'payload';

import { Collection } from '@cms/types';

import { revalidate } from '@cms/utils/revalidate';

export const revalidatePage: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  if (doc._status === 'published') revalidate({ slug: doc.slug, collection: Collection.Pages, payload });

  return doc;
};
