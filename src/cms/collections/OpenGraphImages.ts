import { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

import { allAdminAccess, anyAdminAdminUIAccess, rootAccess, rootAndAdminAdminUIAccess } from '@cms/access';

import { allAdminAndUserAccess } from './Users/access';

export const OpenGraphImages: CollectionConfig = {
  slug: Collection.OpenGraphImages,
  labels: CollectionLabel.OpenGraphImages,
  admin: {
    group: AdminPanelGroup.Media,
    description: {
      en: '1200x630 preview image for the link',
      uk: '1200x630 зображення попереднього перегляду посилання',
    },
  },
  access: {
    admin: anyAdminAdminUIAccess,
    create: allAdminAccess,
    delete: rootAccess,
    read: allAdminAndUserAccess,
    update: rootAndAdminAdminUIAccess,
  },
  upload: {
    resizeOptions: { width: 1200 },
    formatOptions: { format: 'webp', options: { quality: 80 } },
    mimeTypes: ['image/webp', 'image/jpeg', 'image/png', 'image/svg+xml'],
  },
  fields: [],
};
