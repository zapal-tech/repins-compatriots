import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

import { allAdminAccess, anyAdminAdminUIAccess, rootAccess, rootAndAdminAdminUIAccess } from '@cms/access';

import { allAdminAndUserAccess } from './Users/access';

export const Archives: CollectionConfig = {
  slug: Collection.Archives,
  labels: CollectionLabel.Archives,
  admin: {
    group: AdminPanelGroup.Content,
    useAsTitle: 'name',
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
