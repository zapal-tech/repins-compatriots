import { appName } from '.';

import { Locale } from './i18n';

const localeAppNames = (locale?: Locale) => (locale === Locale.Ukrainian ? 'Земляки Рєпіна' : appName);

export const generatePageTitle = (title?: string, locale?: Locale) =>
  title ? `${title} | ${localeAppNames(locale)}` : localeAppNames(locale);
