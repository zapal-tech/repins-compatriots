import { CollectionBeforeChangeHook } from 'payload';

import { Collection } from '@cms/types';

export const beforeChangeHook: CollectionBeforeChangeHook = async ({ data, req: { payload } }) => {
  let archive = '';
  let fund = '';

  if (typeof data.archive === 'number')
    archive = (
      await payload.find({
        collection: Collection.Archives,
        overrideAccess: true,
        where: {
          id: {
            equals: data.archive,
          },
        },
        limit: 1,
      })
    ).docs[0].shortName;
  else archive = data.archive.shortName;

  if (typeof data.fund === 'number')
    fund = (
      await payload.find({
        collection: Collection.Funds,
        overrideAccess: true,
        where: {
          id: {
            equals: data.fund,
          },
        },
        limit: 1,
      })
    ).docs[0].shortName;
  else fund = data.fund.shortName;

  data.title = `${archive}_${fund}_${!!data.description ? data.description : '-'}_${!!data.case ? data.case : '-'}_${!!data.page ? data.page : '-'}${!!data.reverseSide ? 'зв' : ''}`;

  return data;
};
