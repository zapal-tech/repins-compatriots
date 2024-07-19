import { revalidateTag } from 'next/cache';
import { Payload } from 'payload';

import { Collection } from '@cms/types';

export const revalidate = async ({
  collection,
  slug,
  payload,
}: {
  collection: Collection;
  slug: string;
  payload: Payload;
}): Promise<boolean> => {
  try {
    if (typeof collection !== 'string' || typeof slug !== 'string') {
      payload.logger.error(`Invalid collection or slug: ${collection}, ${slug}`);

      return false;
    }

    revalidateTag(`${collection}_${slug}`);

    payload.logger.info(`Revalidated page '${slug}' in collection '${collection}'`);

    return true;
  } catch (error: unknown) {
    payload.logger.error(`Error hitting revalidate route for page '${slug}' in collection '${collection}': ${error}`);

    return false;
  }
};
