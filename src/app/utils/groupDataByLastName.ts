'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { LastName } from '@cms/types/generated-types';

import { jwtDecode, jwtEncode } from './jwt';

type GroupDataByLastNameProps = {
  lastNames: LastName[];
};

type FileName = {
  title: string;
  onClick?: () => void;
  id?: string | number;
};

export type GroupData = {
  title: string;
  data: {
    title: string;
    onClick?: () => void;
    id?: string | number;
  }[][];
};

export const redirectToDocument = (data: string | number) => {
  const token = jwtEncode({ data });
  return redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/check-doc?token=${encodeURIComponent(token)}`);
};

export const groupDataByLastName = async ({ lastNames }: GroupDataByLastNameProps): Promise<GroupData[]> => {
  let rawData = await Promise.all(
    lastNames.map(async (item) => {
      let fileName: FileName = {
        title: '-',
      };

      const town = typeof item.town === 'object' ? item.town?.name : null;

      if (
        item.document &&
        typeof item.document === 'object' &&
        typeof item.document.archive === 'object' &&
        typeof item.document.fund === 'object'
      ) {
        fileName.title = `${item.document.archive.shortName}_${item.document.fund.shortName}_${!!item.document.description ? item.document.description : '-'}_${item.document.case}_${item.document.page}${item.document.reverseSide ? 'зв' : ''}`;
        fileName.id = item.id;
      }

      return {
        title: item.lastName || '-',
        data: [
          [
            {
              title: item.lastName || '-',
            },
            {
              title: item.originalLastName || '-',
            },
            {
              title: item.year?.toString() || '-',
            },
            {
              title: town || '-',
            },
            {
              title: item.address || '-',
            },
            {
              title: item.populationGroup || '-',
            },
            {
              title: item.socialStatus || '-',
            },
            fileName,
          ],
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

  const result = rawData.filter((item) => item.title && item) as GroupData[];
  return result;
};
