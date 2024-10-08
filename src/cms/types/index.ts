import { Locale } from '@shared/i18n';

export enum UserRole {
  Root = 'root',
  AdminDB = 'admin-database',
  Admin = 'admin',
}

// TS Enum values must be of string or number type
export const AdminPanelGroup: Record<'General' | 'Media' | 'Content', Record<Locale, string>> = {
  General: {
    en: 'General',
    uk: 'Загальне',
  },
  Media: {
    en: 'Media',
    uk: 'Медіа',
  },
  Content: {
    en: 'Content',
    uk: 'Контент',
  },
} as const;

export enum HeroType {
  None = 'none',
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
}

export enum Collection {
  Users = 'users',
  Pages = 'pages',
  Media = 'media',
  Documents = 'documents',
  Funds = 'funds',
  Archives = 'archives',
  LastNames = 'last-names',
  Towns = 'towns',
  MediaDocuments = 'media-documents',
  OpenGraphImages = 'open-graph-images',
}

export enum Global {
  Settings = 'settings',
  Header = 'header',
  Footer = 'footer',
  Localization = 'localization',
}

export * from './labels';
