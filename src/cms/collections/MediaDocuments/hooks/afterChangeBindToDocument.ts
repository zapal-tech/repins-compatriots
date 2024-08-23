import { CollectionAfterChangeHook, commitTransaction } from 'payload';

import { Collection } from '@cms/types';
import { Document } from '@cms/types/generated-types';

export const afterChangeBindToDocument: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
  req: { payload },
}) => {
  if (operation !== 'create') return doc;

  let documentFind: Document | null = null;
  try {
    await commitTransaction(req);

    let documentTitleEnd: string =
      Number(
        doc.filename
          .split('_')[4]
          .split('.')[0]
          .replace(/[^\d.]/g, ''),
      ).toString() + (doc.filename.includes('зв') ? 'зв' : '');

    const documentTitle = doc.filename.split('.')[0].split('_').slice(0, -1).join('_') + '_' + documentTitleEnd;

    documentFind = (
      await payload.find({
        collection: Collection.Documents,
        where: { title: { equals: documentTitle } },
        limit: 1,
        depth: 0,
      })
    ).docs?.[0];
  } catch (e) {
    payload.logger.error(e);
  }

  if (!documentFind) return doc;

  try {
    await payload.update({
      collection: Collection.Documents,
      id: documentFind.id,
      overrideAccess: true,
      data: {
        media: doc.id,
      },
    });
  } catch (e) {
    payload.logger.error(e);
  }

  return doc;
};
