import { GoogleSpreadsheet } from 'google-spreadsheet';
import { BasePayload } from 'payload';

import { checkExistRequiredFields } from './checks';
import { formatDocNumber, formatPage } from './formatting';
import { getExistArchive, getExistArchiveWithFund, getExistTown } from './getExistData';
import { insertDB } from './insertDB';
import { DocFormatType, DocType, ExistListType } from './types';

export const seedFromGoogleSheets = async (payload: BasePayload) => {
  const dataCells = ['A3:Q265', 'A3:Q328', 'A3:Q386', 'A3:Q24', 'A3:Q866', 'A3:Q147', 'A3:Q60', 'A3:R249'];

  let existTown: ExistListType = await getExistTown(payload);
  let existArchive: ExistListType = await getExistArchive(payload);
  let existArchiveWithFund: ExistListType = await getExistArchiveWithFund(payload);

  try {
    const doc = new GoogleSpreadsheet('1mm8NuJrO1jZzXxh-zgMEnRIUwbJp03M26qHkabYjavY', {
      apiKey: 'AIzaSyC1gxP_LwOv-7i1wkzDGzvGMMAilJNLOKI',
    });

    await doc.loadInfo(); // loads document properties and worksheets

    payload.logger.info(doc.title);

    for (let sheetsIdx = 0; sheetsIdx < dataCells.length; sheetsIdx++) {
      const sheet = doc.sheetsByIndex[sheetsIdx]; // range 1-8

      payload.logger.info(sheet.title);

      await sheet.loadCells(dataCells[sheetsIdx]); // loads a range of cells

      let rowCount: string | number = dataCells[sheetsIdx].split(':')[1];
      rowCount = Number(rowCount.slice(1, rowCount.length));

      for (let rowIdx = 2; rowIdx < rowCount; rowIdx++) {
        let docData: DocType = {
          lastName: (await sheet.getCell(rowIdx, 0)).value,
          originalLastName: (await sheet.getCell(rowIdx, 1)).value,
          year: (await sheet.getCell(rowIdx, 2)).value,
          town: (await sheet.getCell(rowIdx, 3)).value,
          address: (await sheet.getCell(rowIdx, 4)).value,
          populationGroup: (await sheet.getCell(rowIdx, sheetsIdx < 7 ? 5 : 5 + 1)).value,
          socialStatus: (await sheet.getCell(rowIdx, sheetsIdx < 7 ? 6 : 6 + 1)).value,
          archive: (await sheet.getCell(rowIdx, sheetsIdx < 7 ? 7 : 7 + 1)).value,
          fund: (await sheet.getCell(rowIdx, sheetsIdx < 7 ? 8 : 8 + 1)).value,
          description: (await sheet.getCell(rowIdx, sheetsIdx < 7 ? 9 : 9 + 1)).value,
          case: (await sheet.getCell(rowIdx, sheetsIdx < 7 ? 10 : 10 + 1)).value,
          docName: (await sheet.getCell(rowIdx, sheetsIdx < 7 ? 11 : 11 + 1)).value,
          page: (await sheet.getCell(rowIdx, sheetsIdx < 7 ? 12 : 12 + 1)).value,
          reverseSide: (await sheet.getCell(rowIdx, sheetsIdx < 7 ? 13 : 13 + 1)).value,
          documentNumber: (await sheet.getCell(rowIdx, sheetsIdx < 7 ? 14 : 14 + 1)).value,
          men: (await sheet.getCell(rowIdx, sheetsIdx < 7 ? 15 : 15 + 1)).value,
          women: (await sheet.getCell(rowIdx, sheetsIdx < 7 ? 16 : 16 + 1)).value,
        };
        if (sheetsIdx === 7 && !!docData.address && !!(await sheet.getCell(rowIdx, 5)).value) {
          docData.address = docData.address + ', ' + (await sheet.getCell(rowIdx, 5)).value;
        }

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

        const result = await insertDB(row, payload, existTown, existArchive, existArchiveWithFund);

        existTown = result.existTown;
        existArchive = result.existArchive;
        existArchiveWithFund = result.existArchiveWithFund;

        payload.logger.info(result.status === 'success' ? 'Success' : 'Error');
      }
    }
  } catch (error) {
    payload.logger.error(error);
  }
};
