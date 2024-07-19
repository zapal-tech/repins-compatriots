import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

import { defaultGraphicsMimeTypes } from '@cms/utils/mimeTypes';

export const Media: CollectionConfig = {
  slug: Collection.Media,
  labels: CollectionLabel.Media,
  admin: {
    group: AdminPanelGroup.Media,
  },
  upload: {
    mimeTypes: [...defaultGraphicsMimeTypes, 'application/pdf'],
    imageSizes: [
      {
        name: 'size_768',
        width: 768,
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'size_1024',
        width: 1024,
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'size_1280',
        width: 1280,
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'size_1440',
        width: 1400,
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'size_1920',
        width: 1920,
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'size_2560',
        width: 2560,
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
};
