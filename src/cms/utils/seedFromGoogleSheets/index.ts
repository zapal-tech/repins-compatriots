import { GoogleSpreadsheet } from 'google-spreadsheet';
import { BasePayload } from 'payload';

import { checkExistRequiredFields } from './checks';
import { formatDocNumber, formatPage } from './formatting';
import { getExistArchive, getExistArchiveWithFund, getExistDocuments, getExistTown } from './getExistData';
import { insertDB } from './insertDB';
import { CreateDataType, DocFormatType, DocType, ExistListType } from './types';

export const seedFromGoogleSheets = async (payload: BasePayload) => {
  let existTown: ExistListType = await getExistTown(payload);
  let existArchive: ExistListType = await getExistArchive(payload);
  let existArchiveWithFund: ExistListType = await getExistArchiveWithFund(payload);
  let existDocument: ExistListType = await getExistDocuments(payload);
  let listCreateData: CreateDataType = { lastName: [], document: [] };

  try {
    const doc = new GoogleSpreadsheet('1mm8NuJrO1jZzXxh-zgMEnRIUwbJp03M26qHkabYjavY', {
      apiKey: 'AIzaSyC1gxP_LwOv-7i1wkzDGzvGMMAilJNLOKI',
    });

    await doc.loadInfo(); // loads document properties and worksheets

    // payload.logger.info(doc.title);

    for (let sheetsIdx = 0; sheetsIdx < doc.sheetCount; sheetsIdx++) {
      const sheet = doc.sheetsByIndex[sheetsIdx];

      // payload.logger.info(sheet.title);

      await sheet.loadCells(`A3:Q${sheet.rowCount}`); // loads a range of cells

      for (let rowIdx = 2; rowIdx < sheet.rowCount; rowIdx++) {
        let docData: DocType = {
          lastName: (await sheet.getCell(rowIdx, 0)).value,
          originalLastName: (await sheet.getCell(rowIdx, 1)).value,
          year: (await sheet.getCell(rowIdx, 2)).value,
          town: (await sheet.getCell(rowIdx, 3)).value,
          address: (await sheet.getCell(rowIdx, 4)).value,
          populationGroup: (await sheet.getCell(rowIdx, 5)).value,
          socialStatus: (await sheet.getCell(rowIdx, 6)).value,
          archive: (await sheet.getCell(rowIdx, 7)).value,
          fund: (await sheet.getCell(rowIdx, 8)).value,
          description: (await sheet.getCell(rowIdx, 9)).value,
          case: (await sheet.getCell(rowIdx, 10)).value,
          docName: (await sheet.getCell(rowIdx, 11)).value,
          page: (await sheet.getCell(rowIdx, 12)).value,
          reverseSide: (await sheet.getCell(rowIdx, 13)).value,
          documentNumber: (await sheet.getCell(rowIdx, 14)).value,
          men: (await sheet.getCell(rowIdx, 15)).value,
          women: (await sheet.getCell(rowIdx, 16)).value,
        };

        if (!checkExistRequiredFields(docData)) continue;
        const row = docData as DocFormatType;

        const page = formatPage(row.page);

        if (typeof page === 'object') {
          docData.page = page.page;
          docData.publicComment = page.publicComment;
        } else {
          docData.page = page;
        }

        row.documentNumber = formatDocNumber(row.documentNumber, row.men, row.women);

        const result = await insertDB(
          row,
          payload,
          existTown,
          existArchive,
          existArchiveWithFund,
          existDocument,
          listCreateData,
        );

        existTown = result.existTown;
        existArchive = result.existArchive;
        existArchiveWithFund = result.existArchiveWithFund;
        existDocument = result.existDocument;
        listCreateData = result.listCreateData;

        // payload.logger.info(result.status === 'success' ? 'Success' : 'Error');
      }
      // await payload.create({
      //   collection: Collection.LastNames,
      //   data: listCreateData.lastName,
      // });
      Promise.all(listCreateData.lastName);
    }
  } catch (error) {
    payload.logger.error(error);
  }
};
