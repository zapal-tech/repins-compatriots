import { BasePayload } from 'payload';

import { Collection } from '@cms/types';
import { Archive, Document, Fund, LastName, Town } from '@cms/types/generated-types';

import { DocFormatType, ExistListType } from './types';

export const insertDB = async (
  rowData: DocFormatType,
  payload: BasePayload,
  existTown: ExistListType,
  existArchive: ExistListType,
  existArchiveWithFund: ExistListType,
) => {
  let townId: Town['id'] | null = null;
  let archiveId: Archive['id'] | null = null;
  let fundId: Fund['id'] | null = null;
  let documentId: Document['id'] | null = null;

  let error = false;

  try {
    // Town
    if (!!existTown[rowData.town]) {
      townId = Number(existTown[rowData.town]) as unknown as Town['id'];
    } else {
      townId = (await payload.create({ collection: Collection.Towns, data: { name: rowData.town as string } })).id;
      existTown[rowData.town] = townId;
    }

    // Archive
    if (!!existArchive[rowData.archive]) {
      archiveId = Number(existArchive[rowData.archive]) as unknown as Archive['id'];
    } else {
      archiveId = (
        await payload.create({
          collection: Collection.Archives,
          data: { name: rowData.archive as string, shortName: rowData.archive as string },
        })
      ).id;
      existArchive[rowData.archive] = archiveId;
    }

    // Fund
    if (!!existArchiveWithFund[`${rowData.archive}:${rowData.fund}`]) {
      fundId = Number(existArchiveWithFund[`${rowData.archive}:${rowData.fund}`]) as Fund['id'];
    } else {
      fundId = (
        await payload.create({
          collection: Collection.Funds,
          data: { name: rowData.fund.toString(), shortName: rowData.fund.toString(), archive: archiveId },
        })
      ).id;
      existArchiveWithFund[`${rowData.archive}:${rowData.fund}`] = fundId;
    }

    // Document
    const docTitle = `${rowData.archive}_${rowData.fund}_${!!rowData.description ? rowData.description : '-'}_${rowData.case}_${rowData.page}${rowData.reverseSide ? 'зв' : ''}`;
    const docData: Omit<Document, 'id' | 'updatedAt' | 'createdAt'> = {
      archive: archiveId,
      fund: fundId,
      description: Number(rowData.description),
      case: rowData.case.toString().trim(),
      docName: rowData.docName?.toString().trim() as string,
      page: Number(rowData.page),
      reverseSide: !!rowData.reverseSide ? true : false,
      publicComment: rowData.publicComment,
      title: docTitle,
    };
    documentId = (
      await payload.create({
        collection: Collection.Documents,
        data: docData,
      })
    ).id;

    // LastName
    const lastNameData: Omit<LastName, 'id' | 'updatedAt' | 'createdAt'> = {
      lastName: rowData.lastName as string,
      originalLastName: rowData.originalLastName as string,
      document: documentId,
      year: Number(rowData.year),
      town: townId,
      address: rowData.address as string,
      populationGroup: rowData.populationGroup as string,
      socialStatus: rowData.socialStatus as string,
      documentNumber: rowData.documentNumber?.toString(),
    };
    await payload.create({
      collection: Collection.LastNames,
      data: lastNameData,
    });
  } catch (e) {
    payload.logger.error(e);
    error = true;
  }

  return { status: error ? 'error' : 'success', existTown, existArchive, existArchiveWithFund };
};
