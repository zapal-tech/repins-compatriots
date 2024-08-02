import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

import { allAdminAccess, anyAdminAdminUIAccess, rootAccess, rootAndAdminAdminUIAccess } from '@cms/access';

import { allAdminAndUserAccess } from './Users/access';

export const LastNames: CollectionConfig = {
  slug: Collection.LastNames,
  labels: CollectionLabel.LastNames,
  admin: {
    group: AdminPanelGroup.General,
    useAsTitle: 'lastName',
  },
  access: {
    admin: anyAdminAdminUIAccess,
    create: allAdminAccess,
    delete: rootAccess,
    read: allAdminAndUserAccess,
    update: rootAndAdminAdminUIAccess,
  },
  fields: [
    {
      name: 'lastName',
      type: 'text',
      label: {
        en: 'Last name',
        uk: 'Прізвище',
      },
      required: true,
    },
    {
      name: 'originalLastName',
      type: 'text',
      label: {
        en: 'Original last name',
        uk: 'Оригінальне прізвище',
      },
      required: true,
    },
    {
      name: 'document',
      type: 'relationship',
      relationTo: Collection.Documents,
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
      type: 'relationship',
      label: {
        en: 'Town',
        uk: 'Населений пункт',
      },
      relationTo: Collection.Towns,
      required: true,
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
    {
      type: 'text',
      name: 'documentNumber',
      label: {
        en: 'Document number',
        uk: 'Номер за документом',
      },
    },
  ],
};
