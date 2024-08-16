import { sql } from '@payloadcms/db-postgres';
import type { DocToSync } from '@payloadcms/plugin-search/types';
import { draftMode } from 'next/headers';
import { Payload } from 'payload';

import { LastName, Search } from '@cms/types/generated-types';

import { Locale } from '@shared/i18n';

import { getLastNames, getSearch } from './getData';
import { getSQLSearchWhereQuery } from './getSql';

type searchLastNameProps = {
  localApi: Payload;
  locale: Locale;
  lastName: string;
  page?: number;
};

export const searchLastNames = async ({ localApi, locale, lastName, page = 1 }: searchLastNameProps) => {
  const { isEnabled: isDraftMode } = draftMode();

  const limit = 300;

  try {
    const resSearch = (
      await localApi.db.drizzle.execute(
        sql`select "id", "title" from (select "id", "title" from "search" where ${sql.raw(`${await getSQLSearchWhereQuery({ lastName })}`)} order by title ASC ) order by LEVENSHTEIN(title, '${sql.raw(lastName)}') ASC limit ${sql.raw(limit.toString())}`,
      )
    ).rows as DocToSync[];

    console.log(resSearch.length);
    if (!resSearch.length) return [];

    let idsSearch = resSearch.map((item) => item?.id) as Search['id'][];

    const resSearchRels = (await getSearch({ localApi, isDraftMode, locale, ids: idsSearch, limit })).sort(
      (a, b) => idsSearch.indexOf(a.id) - idsSearch.indexOf(b.id),
    );

    const ids = resSearchRels
      .map((item) => (!!item.doc ? item.doc.value : null))
      .filter((item) => !!item) as LastName['id'][];

    return (await getLastNames({ localApi, isDraftMode, locale, ids, page, limit })).sort(
      (a, b) => ids.indexOf(a.id) - ids.indexOf(b.id),
    );
  } catch (error) {
    console.log('error: ', error);
  }

  return [];
};
