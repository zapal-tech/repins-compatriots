import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

import { allAdminAccess, anyAdminAdminUIAccess, rootAccess, rootAndAdminAdminUIAccess } from '@cms/access';

import { allAdminAndUserAccess } from '../Users/access';

import { beforeChangeHook } from './hooks/beforeChange';

export const Documents: CollectionConfig = {
  slug: Collection.Documents,
  labels: CollectionLabel.Documents,
  admin: {
    group: AdminPanelGroup.Content,
    useAsTitle: 'title',
  },
  access: {
    admin: anyAdminAdminUIAccess,
    create: allAdminAccess,
    delete: rootAccess,
    read: allAdminAndUserAccess,
    update: rootAndAdminAdminUIAccess,
  },
  hooks: {
    beforeChange: [beforeChangeHook],
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'upload',
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
          admin: {
            width: '50%',
          },
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
          admin: {
            width: '50%',
            condition: (data) => {
              if (data.archive) {
                return true;
              } else {
                return false;
              }
            },
          },
          filterOptions: ({ data }) => {
            return { archive: { in: [data['archive']] } };
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'number',
          admin: {
            width: '50%',
          },
          label: {
            en: 'Description',
            uk: 'Опис',
          },
        },
        {
          name: 'case',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
          label: {
            en: 'Case',
            uk: 'Справа',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'docName',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: {
            en: 'Document name',
            uk: 'Назва документу',
          },
        },
        {
          name: 'page',
          type: 'number',
          admin: {
            width: '50%',
          },
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
