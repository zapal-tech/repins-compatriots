import { defaultLocale, locales } from '@shared/i18n';

const i18nConfig = {
  locales,
  defaultLocale,
  localeCookie: 'LOCALE',
  prefixDefault: undefined,
} as const;

export default i18nConfig;
