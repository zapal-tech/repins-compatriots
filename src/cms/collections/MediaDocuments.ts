import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

import { allAdminAccess, anyAdminAdminUIAccess, rootAccess, rootAndAdminAdminUIAccess } from '@cms/access';

import { allAdminAndUserAccess } from './Users/access';

export const MediaDocuments: CollectionConfig = {
  slug: Collection.MediaDocuments,
  labels: CollectionLabel.MediaDocuments,
  admin: {
    group: AdminPanelGroup.Media,
    useAsTitle: 'media',
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
      type: 'upload',
      name: 'media',
      label: {
        en: 'Media',
        uk: 'Медіа',
      },
      relationTo: Collection.Media,
    },
  ],
};
