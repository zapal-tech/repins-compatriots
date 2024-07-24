import { title } from 'process';
import { Payload } from 'payload';

import { Locale } from '@shared/i18n';

import { searchLastNames } from './searchLastNames';

type lastNames = {
  lastName: string;
  originalLastName: string;
};

type groupDataByLastNameProps = {
  localApi: Payload;
  locale: Locale;
  lastNames: lastNames[];
};

export const groupDataByLastName = async ({ localApi, locale, lastNames }: groupDataByLastNameProps) => {
  let rawData = await Promise.all(
    lastNames.map(async (item) => {
      const data = await searchLastNames({
        localApi,
        locale,
        lastName: item.lastName,
        originalLastName: item.originalLastName,
      });

      return {
        title: item.lastName,
        data: [
          {
            title: item.originalLastName,
            data,
          },
        ],
      };
    }),
  );

  for (let i = 0; i < rawData.length; i++) {
    for (let j = 0; j < rawData.length; j++) {
      if (i === j) continue;
      if (rawData[i].title && rawData[j].title && rawData[i].title === rawData[j].title) {
        rawData[i].data = rawData[i].data.concat(rawData[j].data);
        rawData[j].title = '';
      }
    }
  }

  const result = rawData.filter((item) => item.title && item);
  return result;
};
