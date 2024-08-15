import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

import { allAdminAccess, anyAdminAdminUIAccess, rootAccess, rootAndAdminAdminUIAccess } from '@cms/access';
import { defaultPhotoMimeTypes } from '@cms/utils/mimeTypes';

import { allAdminAndUserAccess } from '../Users/access';

import { afterChangeBindToDocument } from './hooks/afterChangeBindToDocument';

export const MediaDocuments: CollectionConfig = {
  slug: Collection.MediaDocuments,
  labels: CollectionLabel.MediaDocuments,
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
  hooks: {
    afterChange: [afterChangeBindToDocument],
  },
  upload: {
    formatOptions: { format: 'webp', options: { quality: 80 } },
    mimeTypes: defaultPhotoMimeTypes,
    imageSizes: [
      {
        name: 'size_400',
        width: 400,
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
      {
        name: 'size_1280',
        width: 1280,
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
};
