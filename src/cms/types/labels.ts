import { Collection, Global } from '@cms/types';

import { Locale } from '@shared/i18n';

type CollectionLabel = Record<'singular' | 'plural', Record<Locale, string> | string>;
type GlobalLabel = Record<Locale, string> | string;

export const CollectionLabel: Record<keyof typeof Collection | 'Redirects' | 'Search', CollectionLabel> = {
  Users: {
    plural: {
      en: 'Users',
      uk: 'Користувачі',
    },
    singular: {
      en: 'User',
      uk: 'Користувач',
    },
  },

  Pages: {
    plural: {
      en: 'Pages',
      uk: 'Сторінки',
    },
    singular: {
      en: 'Page',
      uk: 'Сторінка',
    },
  },

  Media: {
    singular: {
      en: 'Media',
      uk: 'Медіа',
    },
    plural: {
      en: 'Media Library',
      uk: 'Медіа бібліотека',
    },
  },

  OpenGraphImages: {
    singular: {
      en: 'Open Graph image',
      uk: 'Open Graph зображення',
    },
    plural: {
      en: 'Open Graph images',
      uk: 'Open Graph зображення',
    },
  },

  Redirects: {
    plural: {
      en: 'Redirects',
      uk: 'Редиректи',
    },
    singular: {
      en: 'Redirect',
      uk: 'Редирект',
    },
  },

  Search: {
    plural: {
      en: 'Search',
      uk: 'Пошук',
    },
    singular: {
      en: 'Search Result',
      uk: 'Результат пошуку',
    },
  },
  Documents: {
    plural: {
      en: 'Documents',
      uk: 'Документи',
    },
    singular: {
      en: 'Document',
      uk: 'Документ',
    },
  },
  Funds: {
    plural: {
      en: 'Funds',
      uk: 'Фонди',
    },
    singular: {
      en: 'Fund',
      uk: 'Фонд',
    },
  },
  Archives: {
    plural: {
      en: 'Archives',
      uk: 'Архіви',
    },
    singular: {
      en: 'Archive',
      uk: 'Архів',
    },
  },
  LastNames: {
    plural: {
      en: 'Last names',
      uk: 'Прізвища',
    },
    singular: {
      en: 'Last name',
      uk: 'Прізвище',
    },
  },
} as const;

export const GlobalLabel: Record<keyof typeof Global, GlobalLabel> = {
  Header: {
    en: 'Header',
    uk: 'Хедер',
  },

  Footer: {
    en: 'Footer',
    uk: 'Футер',
  },

  Settings: {
    en: 'Settings',
    uk: 'Налаштування',
  },

  Localization: {
    en: 'UI Localization',
    uk: 'Локалізація UI',
  },
};
