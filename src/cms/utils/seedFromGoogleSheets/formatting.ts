import { DocFieldFormatType, DocFieldType } from './types';

export const formatDocNumber = (docNumber: DocFieldType, men: DocFieldType, women: DocFieldType) => {
  if ((docNumber && typeof docNumber === 'number') || typeof docNumber === 'string')
    return `${docNumber}${men ? men : women ? women : ''}`;
  else return '';
};

export const formatPage = (page: DocFieldFormatType) => {
  if (typeof page === 'number') return page;
  const pageStr = page.toString();
  const result = {
    page: 0,
    publicComment: '',
  };

  if (pageStr.includes('-')) {
    const pageCurrent = pageStr.split('-')[1];

    result.page = Number(pageCurrent.replaceAll(' ', '').replaceAll('зв', ''));
    result.publicComment = pageStr.replaceAll('зв', '');
  } else {
    result.page = Number(pageStr.replaceAll(' ', '').replaceAll('зв', ''));
  }

  return result;
};
