import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

export const Documents: CollectionConfig = {
  slug: Collection.Documents,
  labels: CollectionLabel.Documents,
  admin: {
    group: AdminPanelGroup.General,
  },
  fields: [
    {
      type: 'upload',
      name: 'media',
      label: {
        en: 'Media',
        uk: 'Медіа',
      },
      relationTo: Collection.Media,
      required: true,
    },
    {
      type: 'row',
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
          name: 'fund',
          type: 'relationship',
          relationTo: Collection.Funds,
          required: true,
          label: {
            en: 'Fund',
            uk: 'Фонд',
          },
          filterOptions: ({ data }) => {
            if (data['archive']) {
              return { archive: { in: [data['archive']] } };
            }
            return { archive: { in: [] } };
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: {
        en: 'Description',
        uk: 'Опис',
      },
    },
    {
      name: 'docName',
      type: 'text',
      label: {
        en: 'Document name',
        uk: 'Назва документу',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'case',
          type: 'text',
          required: true,
          label: {
            en: 'Case',
            uk: 'Справа',
          },
        },
        {
          name: 'page',
          type: 'number',
          label: {
            en: 'Page',
            uk: 'Сторінка',
          },
          required: true,
        },
      ],
    },
    {
      name: 'reserseSide',
      type: 'checkbox',
      required: true,
      label: {
        en: 'Reverse side',
        uk: 'Зворот',
      },
    },

    {
      name: 'publicComment',
      type: 'textarea',
      label: {
        en: 'Public comment',
        uk: 'Публічний коментар',
      },
    },
    {
      name: 'privateComment',
      type: 'textarea',
      label: {
        en: 'Private comment',
        uk: 'Приватний коментар',
      },
    },
  ],
};
