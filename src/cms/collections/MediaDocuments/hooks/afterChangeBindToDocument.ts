import { CollectionAfterChangeHook } from 'payload';

import { Collection } from '@cms/types';

import { Locale } from '@shared/i18n';

export const afterChangeBindToDocument: CollectionAfterChangeHook = async ({ doc, operation, req: { payload } }) => {
  if (operation !== 'create') return doc;

  let documentTitleEnd: string =
    Number(
      doc.filename
        .split('_')[4]
        .split('.')[0]
        .replace(/[^\d.]/g, ''),
    ).toString() + (doc.filename.includes('зв') ? 'зв' : '');

  const documentTitle = doc.filename.split('.')[0].split('_').slice(0, -1).join('_') + '_' + documentTitleEnd;

  payload.logger.info(`documentTitle: ${documentTitle}`);

  const documentFind = (
    await payload.find({
      collection: Collection.Documents,
      where: { title: { equals: documentTitle } },
      limit: 1,
    })
  ).docs;

  if (documentFind.length) {
    try {
      await payload.update({
        collection: Collection.Documents,
        id: documentFind[0].id,
        data: {
          media: doc.id,
        },
        locale: Locale.Ukrainian,
      });
    } catch (e) {
      payload.logger.error(e);
    }
  }

  return doc;
};
