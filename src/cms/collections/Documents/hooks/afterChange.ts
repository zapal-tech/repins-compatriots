import { CollectionAfterChangeHook } from 'payload';

import { Collection } from '@cms/types';

export const afterChangeHook: CollectionAfterChangeHook = async ({ doc, req, req: { data, user, payload } }) => {
  let archive = '';
  let fund = '';

  if (typeof doc.archive === 'number')
    archive = (
      await payload.find({
        collection: Collection.Archives,
        overrideAccess: true,
        where: {
          id: {
            equals: doc.archive,
          },
        },
        limit: 1,
      })
    ).docs[0].shortName;
  else archive = doc.archive.shortName;

  if (typeof doc.fund === 'number')
    fund = (
      await payload.find({
        collection: Collection.Funds,
        overrideAccess: true,
        where: {
          id: {
            equals: doc.fund,
          },
        },
        limit: 1,
      })
    ).docs[0].shortName;
  else fund = doc.fund.shortName;

  doc.title = `${archive}_${fund}_${!!doc.description ? doc.description : '-'}_${!!doc.case ? doc.case : '-'}_${!!doc.page ? doc.page : '-'}${!!doc.reverseSide ? 'зв' : ''}`;

  return doc;
};
