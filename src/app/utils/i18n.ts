import { Locale, locales } from '@shared/i18n';

export const isSupportedLocale = (locale: any): locale is Locale => locales.includes(locale);
