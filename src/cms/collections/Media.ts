import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

import { allAdminAccess, anyAdminAdminUIAccess, rootAccess, rootAndAdminAdminUIAccess } from '@cms/access';
import { defaultGraphicsMimeTypes } from '@cms/utils/mimeTypes';

import { allAdminAndUserAccess } from './Users/access';

export const Media: CollectionConfig = {
  slug: Collection.Media,
  labels: CollectionLabel.Media,
  admin: {
    group: AdminPanelGroup.Media,
  },
  access: {
    admin: anyAdminAdminUIAccess,
    create: allAdminAccess,
    delete: rootAccess,
    read: allAdminAndUserAccess,
    update: rootAndAdminAdminUIAccess,
  },
  upload: {
    formatOptions: { format: 'webp', options: { quality: 95 } },
    mimeTypes: [...defaultGraphicsMimeTypes, 'application/pdf'],
    imageSizes: [
      {
        name: 'size_800',
        width: 800,
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
      {
        name: 'size_1920',
        width: 1920,
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: {
        en: 'Alternative text',
        uk: 'Альтернативний текст',
      },
      required: true,
    },
  ],
};
