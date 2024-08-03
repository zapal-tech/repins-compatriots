import { DocType } from './types';

export const checkExistRequiredFields = (docData: DocType) => {
  const requiredFields = ['lastName', 'originalLastName', 'town', 'archive', 'fund', 'case', 'page'];

  let result = true;

  for (const [key, value] of Object.entries(docData)) {
    if (requiredFields.includes(key) && (typeof value === 'boolean' || !value || typeof value === 'object')) {
      result = false;
      break;
    }
  }

  return result;
};
