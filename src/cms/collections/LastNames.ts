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
      required: true,
    },
  ],
};
