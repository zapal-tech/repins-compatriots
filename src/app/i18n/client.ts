'use client';

import { createInstance, ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { defaultNamespaces } from '@app/i18n';

import { Global } from '@cms/types';

import { Namespace, UseI18n } from './types';
import { addResource, getDefaultNS, getOptions } from './utils';

export const useI18n: UseI18n = ({ locale, ns = Namespace.Common, resources /* , ...options */ }) => {
  const namespaces = [...new Set(Array.isArray(ns) ? [...ns, ...defaultNamespaces] : [ns, ...defaultNamespaces])];

  const i18n = createInstance();

  i18n.use(initReactI18next);

  i18n.init(getOptions({ locale, ns: namespaces, resources })).then(() => {
    if (!resources || !resources[locale]) {
      return fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/globals/${Global.Localization}/${locale}`)
        .then((response: any) => {
          if (response.ok) {
            response.json().then((res: unknown) => {
              if (typeof res === 'object' && !Array.isArray(res) && res !== null)
                addResource({ [locale]: res as ResourceLanguage }, namespaces, i18n);
            });
          } else {
            if (response.status === 400) throw new Error('400 Bad request. Unsupported locale');
            if (response.status === 500) throw new Error('500 Internal Server Error');

            throw new Error(response.status.toString());
          }
        })
        .catch((error) => console.error('Fetch localization error', error));
    }

    addResource(resources, namespaces, i18n);
  });

  return {
    i18n,
    ns: namespaces,
    resources: i18n.services.resourceStore.data,
    t: i18n?.getFixedT(locale, getDefaultNS(namespaces) /*, options?.keyPrefix */),
  };
};
