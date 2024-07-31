import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

import { allAdminAccess, anyAdminAdminUIAccess, rootAccess, rootAndAdminAdminUIAccess } from '@cms/access';

import { allAdminAndUserAccess } from './Users/access';

export const Documents: CollectionConfig = {
  slug: Collection.Documents,
  labels: CollectionLabel.Documents,
  admin: {
    group: AdminPanelGroup.General,
    useAsTitle: 'docName',
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
      type: 'relationship',
      name: 'media',
      label: {
        en: 'Media',
        uk: 'Медіа',
      },
      relationTo: Collection.MediaDocuments,
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
          name: 'description',
          type: 'number',
          label: {
            en: 'Description',
            uk: 'Опис',
          },
        },
        {
          name: 'case',
          type: 'number',
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
            uk: 'Аркуш',
          },
          required: true,
        },
      ],
    },
    {
      name: 'reverseSide',
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
