import { Payload } from 'payload';

import { Collection } from '@cms/types';
import { LastName, Search } from '@cms/types/generated-types';

import { Locale } from '@shared/i18n';

export const getLastNames = async ({
  localApi,
  isDraftMode,
  locale,
  ids,
  page,
}: {
  localApi: Payload;
  isDraftMode?: boolean;
  ids: LastName['id'][];
  locale: Locale;
  page: number;
}) =>
  (
    await localApi.find({
      collection: Collection.LastNames,
      draft: isDraftMode,
      where: {
        id: { in: ids },
      },
      locale,
      depth: 4,
      page: Number(page),
      limit: 50,
    })
  ).docs;

export const getSearch = async ({
  localApi,
  isDraftMode,
  locale,
  ids,
}: {
  localApi: Payload;
  isDraftMode?: boolean;
  locale: Locale;
  ids: Search['id'][];
}) =>
  (
    await localApi.find({
      collection: 'search',
      draft: isDraftMode,
      where: {
        id: { in: ids },
      },
      locale,
      limit: 50,
    })
  ).docs;
