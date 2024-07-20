import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

export const Funds: CollectionConfig = {
  slug: Collection.Funds,
  labels: CollectionLabel.Funds,
  admin: {
    group: AdminPanelGroup.General,
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'archive',
      type: 'relationship',
      relationTo: Collection.Archives,
      required: true,
      label: {
        en: 'Archive',
        uk: 'Архів',
      },
    },
    {
      name: 'shortName',
      type: 'text',
      label: {
        en: 'Short Name',
        uk: 'Коротка назва',
      },
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      label: {
        en: 'Name',
        uk: 'Назва',
      },
      required: true,
    },
  ],
};
