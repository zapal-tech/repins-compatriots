import { defaultLocale, locales } from '@shared/i18n';

const i18nConfig = {
  locales,
  defaultLocale,
  localeCookie: 'LOCALE',
  prefixDefault: undefined,
  localeDetector: false,
} as const;

export default i18nConfig;
