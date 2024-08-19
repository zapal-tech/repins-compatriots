import { GenerateTitle } from '@payloadcms/plugin-seo/types';
import { appName } from '@shared';

import { Locale } from '@shared/i18n';

const localeAppNames = (locale?: Locale) => (locale === Locale.Ukrainian ? 'Земляки Рєпіна' : appName);

export const generateTitle: GenerateTitle = ({ doc, locale }) => {
  const suffix = localeAppNames(locale as Locale | undefined);
  const separator = ' | ';
  const title = (doc as any)?.title?.value as string | undefined;

  if (typeof title === 'string' && title) return `${title}${separator}${suffix}`;

  return suffix;
};
