'use server';

import { createInstance, ResourceLanguage } from 'i18next';

import { getLocalApi } from '@app/utils/localApi';

import { defaultNamespaces } from '@app/i18n';

import { Global } from '@cms/types';

import { GetI18n, Namespace } from './types';
import { addResource, getDefaultNS, getOptions } from './utils';

export const getI18n: GetI18n = async ({
  locale,
  ns = Namespace.Common,
  i18n,
  resources,
  localApi: localApiFromProps /* , ...options */,
}) => {
  const namespaces = [...new Set(Array.isArray(ns) ? [...ns, ...defaultNamespaces] : [ns, ...defaultNamespaces])];
  i18n = i18n || createInstance();

  await i18n.init(getOptions({ locale, ns: namespaces, resources }));

  if (!resources || !resources[locale]) {
    const localApi = localApiFromProps || (await getLocalApi());

    try {
      const { translation } = await localApi.findGlobal({ slug: Global.Localization, locale });

      if (translation && typeof translation === 'object')
        addResource({ [locale]: translation as unknown as ResourceLanguage }, namespaces, i18n);
    } catch (error) {
      localApi.logger.error('Get localization error', error);
    }
  } else addResource(resources, namespaces, i18n);

  return {
    i18n,
    ns: namespaces,
    resources: i18n.services.resourceStore.data,
    t: i18n?.getFixedT(locale, getDefaultNS(namespaces) /*, options?.keyPrefix */),
  };
};
