import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

export const Archives: CollectionConfig = {
  slug: Collection.Archives,
  labels: CollectionLabel.Archives,
  admin: {
    group: AdminPanelGroup.General,
    useAsTitle: 'name',
  },
  fields: [
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
        uk: 'назва',
      },
      required: true,
    },
  ],
};
