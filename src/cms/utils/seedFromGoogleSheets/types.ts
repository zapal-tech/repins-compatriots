import { GoogleSpreadsheetCellErrorValue } from 'google-spreadsheet';

export type DocFieldType = string | number | boolean | GoogleSpreadsheetCellErrorValue | null;

export type DocType = {
  lastName: DocFieldType;
  originalLastName: DocFieldType;
  year: DocFieldType;
  town: DocFieldType;
  address: DocFieldType;
  populationGroup: DocFieldType;
  socialStatus: DocFieldType;
  archive: DocFieldType;
  fund: DocFieldType;
  description: DocFieldType;
  case: DocFieldType;
  docName: DocFieldType;
  page: DocFieldType;
  reverseSide: DocFieldType;
  documentNumber: DocFieldType;
  men: DocFieldType;
  women: DocFieldType;
  publicComment?: string;
};

export type DocFieldFormatType = string | number;

export type DocFormatType = {
  lastName: DocFieldFormatType;
  originalLastName: DocFieldFormatType;
  year: DocFieldType;
  town: DocFieldFormatType;
  address: DocFieldType;
  populationGroup: DocFieldType;
  socialStatus: DocFieldType;
  archive: DocFieldFormatType;
  fund: DocFieldFormatType;
  description: DocFieldType;
  case: DocFieldFormatType;
  docName: DocFieldType;
  page: DocFieldFormatType;
  reverseSide: DocFieldType;
  documentNumber: DocFieldType;
  men: DocFieldType;
  women: DocFieldType;
  publicComment?: string;
};

export type ExistListType = Record<string, string | number>;
