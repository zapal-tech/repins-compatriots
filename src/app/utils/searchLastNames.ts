import { sql } from '@payloadcms/db-postgres';
import type { DocToSync } from '@payloadcms/plugin-search/types';
import { draftMode } from 'next/headers';
import { Payload } from 'payload';

import { Collection } from '@cms/types';
import { LastName, Search } from '@cms/types/generated-types';

import { Locale } from '@shared/i18n';

type searchLastNameProps = {
  localApi: Payload;
  locale: Locale;
  lastName: string;
  page?: number;
};

const getLastNames = async ({
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
      limit: 12,
    })
  ).docs;

const getSearch = async ({
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
    })
  ).docs;

export const searchLastNames = async ({ localApi, locale, lastName, page = 1 }: searchLastNameProps) => {
  const { isEnabled: isDraftMode } = draftMode();

  try {
    const resSearch = (await localApi.db.drizzle
      .select()
      .from(localApi.db.tables.search)
      .where(
        sql`SIMILARITY(title,'${sql.raw(lastName)}') > 0.1 or SIMILARITY(original_last_name,'${sql.raw(lastName)}') > 0.1`,
      )) as DocToSync[];

    if (!resSearch.length) return [];

    let idsSearch = resSearch.map((item) => item?.id) as Search['id'][];

    const resSearchRels = await getSearch({ localApi, isDraftMode, locale, ids: idsSearch });

    const ids = resSearchRels.map((item) => item.doc.value) as LastName['id'][];

    return await getLastNames({ localApi, isDraftMode, locale, ids, page });
  } catch (error) {}

  return [];
};
