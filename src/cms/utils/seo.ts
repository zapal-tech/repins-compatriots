import { GenerateTitle } from '@payloadcms/plugin-seo/types';
import { appName } from '@shared';

import { Page } from '@cms/types/generated-types';

import { Locale } from '@shared/i18n';

const localeAppNames = (locale?: Locale) => (locale === Locale.Ukrainian ? 'Земляки Рєпіна' : appName);

export const generateTitle: GenerateTitle<Page> = ({ doc, locale }) => {
  const suffix = localeAppNames(locale as Locale | undefined);
  const separator = ' | ';
  let title = 'title' in doc ? doc.title : null;

  if (typeof title === 'string' && title) return `${title}${separator}${suffix}`;

  return suffix;
};
