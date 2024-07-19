import { Namespace } from '@cms/i18n';

import { httpOrHttpsUrlRegEx } from './regex';

export const validateUrl = (value: string, options: any): string | true => {
  if (!value) return true;

  try {
    if (!httpOrHttpsUrlRegEx.test(value)) return options.req?.t?.('invalidUrl', { ns: Namespace.Validation });

    new URL(value);

    return true;
  } catch (error) {
    return options.req?.t?.('invalidUrl', { ns: Namespace.Validation });
  }
};
