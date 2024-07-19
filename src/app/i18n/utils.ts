import { i18n, Resource } from 'i18next';

import { defaultLocale, locales } from '@shared/i18n';

import { BaseI18nProps, Namespace } from './types';

export const getDefaultNS = (ns: Namespace | Namespace[]): Namespace => (Array.isArray(ns) ? ns[0] : ns);

export const getOptions = ({
  locale,
  ns,
  resources,
}: Omit<BaseI18nProps, 'ns'> & Pick<Required<BaseI18nProps>, 'ns'>) => ({
  lng: locale,
  supportedLngs: locales,
  fallbackLng: defaultLocale,
  ns,
  defaultNS: getDefaultNS(ns),
  fallbackNS: getDefaultNS(ns),
  resources,
});

export const addResource = (lngs: Resource, ns: Namespace | Namespace[], i18n: i18n) =>
  Object.entries(lngs).map(([lng, namespaces]) =>
    Object.entries(namespaces).map(([nsKey, nsValue]) =>
      (Array.isArray(ns) && ns.includes(nsKey as Namespace)) || nsKey === ns
        ? i18n.addResourceBundle(lng, nsKey, nsValue, true, true)
        : undefined,
    ),
  );
