import { defaultLocale, Locale } from '@shared/i18n';

export const getLocalizedPath = (path: string, locale?: Locale): string => {
  if (!locale || locale === defaultLocale) return path;

  return `/${locale}${path}`;
};
