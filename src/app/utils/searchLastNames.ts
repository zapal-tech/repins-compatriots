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
      limit: 50,
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

const addUnderLine = (lastNameWithoutVowel: string, lastName: string) => {
  const arrayLastName = lastNameWithoutVowel.split('_').filter((item) => item !== '');
  let arrayModify: string[] = [];

  arrayModify.push(arrayLastName.join('_'));

  const arrayWithoutConsonantLastNames: string[] = [];
  for (let index = 0; index < lastNameWithoutVowel.length; index++) {
    let letterWithUnderLine = '';
    let letterWithEmpty = '';

    for (let i = 0; i < lastNameWithoutVowel.length; i++) {
      if (lastNameWithoutVowel[i] && index === i) {
        letterWithUnderLine = letterWithUnderLine + '_';
        letterWithEmpty = letterWithEmpty + '';
      } else {
        letterWithUnderLine = letterWithUnderLine + lastNameWithoutVowel[i];
        letterWithEmpty = letterWithEmpty + lastNameWithoutVowel[i];
      }
    }
    arrayWithoutConsonantLastNames.push(letterWithUnderLine);
    arrayWithoutConsonantLastNames.push(letterWithEmpty);
    letterWithUnderLine = '';
    letterWithEmpty = '';
  }

  arrayModify = arrayModify.concat(arrayWithoutConsonantLastNames);

  return arrayModify;
};

export const getSQLSearchWhereQuery = async ({ lastName }: { lastName: string }) => {
  if (lastName.length < 3) return '';

  const vowelLetters = [
    'а',
    'е',
    'є',
    'и',
    'і',
    'ї',
    'о',
    'у',
    'ю',
    'я',
    'А',
    'Е',
    'Є',
    'И',
    'І',
    'Ї',
    'О',
    'У',
    'Ю',
    'Я',
  ];
  const req = new RegExp(vowelLetters.join('|'), 'gi');

  let arrayChar: string[] = [];

  const numberLoop = lastName.length - (lastName.length >= 7 ? 4 : lastName.length > 5 ? 2 : 0) - 1;

  const lastNameWithoutVowels = lastName.replace(req, '_');

  let elementLetters = {
    letters: '',
    numberConsonantLetters: 0,
  };
  for (let index = 0; index < numberLoop; index++) {
    elementLetters.letters = elementLetters.letters + lastNameWithoutVowels[index];

    if (lastNameWithoutVowels[index] !== '_') elementLetters.numberConsonantLetters += 1;

    if (
      elementLetters.numberConsonantLetters >= 3 ||
      (numberLoop === index + 1 && elementLetters.numberConsonantLetters > 2)
    ) {
      arrayChar.push(
        `title ILIKE '${elementLetters.letters.length !== index ? '%' : ''}${elementLetters.letters}%' OR original_last_name ILIKE '${'%'}${elementLetters.letters}%'`,
      );

      elementLetters.letters = '';
      elementLetters.numberConsonantLetters = 0;
    }
  }
  let currentLastName: string = '';
  if (lastNameWithoutVowels.slice(0, numberLoop).length > 2)
    currentLastName = lastNameWithoutVowels.slice(0, numberLoop);
  else currentLastName = lastNameWithoutVowels;

  if (currentLastName.length)
    arrayChar.push(`title ILIKE '%${currentLastName}%' OR original_last_name ILIKE '%${currentLastName}%'`);

  if (lastName.length > 5)
    addUnderLine(lastNameWithoutVowels, lastName).map((item) => {
      arrayChar.push(`title ILIKE '%${item}%' OR original_last_name ILIKE '%${item}%'`);
    });

  arrayChar.push(`title = '${lastName}' OR original_last_name = '${lastName}'`);

  const result = arrayChar.join(' OR ');

  return result;
};

export const searchLastNames = async ({ localApi, locale, lastName, page = 1 }: searchLastNameProps) => {
  const { isEnabled: isDraftMode } = draftMode();

  try {
    const orderBy = `LEVENSHTEIN(title, '${sql.raw(lastName)}'), LEVENSHTEIN(original_last_name, '${sql.raw(lastName)}') ASC`;
    const resSearch = (await localApi.db.drizzle
      .select()
      .from(localApi.db.tables.search)
      .where(
        // sql`SIMILARITY(title,'${sql.raw(lastName)}') > 0.1 or SIMILARITY(original_last_name,'${sql.raw(lastName)}') > 0.1`,
        sql.raw(`${await getSQLSearchWhereQuery({ lastName })}`),
      )
      .orderBy(sql`${orderBy}`)) as DocToSync[];

    if (!resSearch.length) return [];

    let idsSearch = resSearch.map((item) => item?.id) as Search['id'][];

    const resSearchRels = await getSearch({ localApi, isDraftMode, locale, ids: idsSearch });

    const ids = resSearchRels
      .map((item) => (!!item.doc ? item.doc.value : null))
      .filter((item) => !!item) as LastName['id'][];

    return await getLastNames({ localApi, isDraftMode, locale, ids, page });
  } catch (error) {}

  return [];
};
