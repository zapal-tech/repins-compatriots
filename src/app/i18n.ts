import type en from '@app/locales/en';
import type uk from '@app/locales/uk';

import { Locale } from '@shared/i18n';

import { isSupportedLocale } from './utils/i18n';

export const getDictionary = async (locale: Locale) => {
  if (!isSupportedLocale(locale)) locale = Locale.Ukrainian;

  return import(`./locales/${locale}`).then((module) => module.default) as Promise<typeof en | typeof uk>;
};
