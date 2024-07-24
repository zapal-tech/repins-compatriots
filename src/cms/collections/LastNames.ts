import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

export const LastNames: CollectionConfig = {
  slug: Collection.LastNames,
  labels: CollectionLabel.LastNames,
  admin: {
    group: AdminPanelGroup.General,
    useAsTitle: 'lastName',
  },
  fields: [
    {
      name: 'lastName',
      type: 'text',
      label: {
        en: 'Last name',
        uk: 'Прізвище',
      },
    },
    {
      name: 'originalLastName',
      type: 'text',
      label: {
        en: 'Original last name',
        uk: 'Оригінальне прізвище',
      },
    },
    {
      name: 'document',
      type: 'relationship',
      relationTo: Collection.Documents,
      hasMany: true,
      label: {
        en: 'Documents',
        uk: 'Документи',
      },
    },
    {
      name: 'year',
      type: 'number',
      label: {
        en: 'The year of information fixation',
        uk: 'Рік фіксації інформації',
      },
    },
    {
      name: 'town',
      type: 'text',
      label: {
        en: 'Settlement',
        uk: 'Населений пункт',
      },
    },
    {
      name: 'address',
      type: 'text',
      label: {
        en: 'Church attendance or address',
        uk: 'Прихід церкви або адреса',
      },
    },
    {
      name: 'populationGroup',
      type: 'text',
      label: {
        en: 'Population group according to the document',
        uk: 'Група населення за документом',
      },
    },
    {
      name: 'socialStatus',
      type: 'text',
      label: {
        en: 'Social status / origin',
        uk: 'Соціальний статус / походження',
      },
    },
  ],
};
