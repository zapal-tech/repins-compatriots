import { Field } from 'payload';

import { Collection } from '@cms/types';

import { anyAdminFieldAccess } from '@cms/access';
import { lastPublishedByBeforeChange, publishedAtBeforeChange, publishedByBeforeChange } from '@cms/hooks/published';

export const publishedAt = (): Field => ({
  admin: {
    date: {
      pickerAppearance: 'dayAndTime',
    },
    position: 'sidebar',
  },
  hooks: {
    beforeChange: [publishedAtBeforeChange],
  },
  label: {
    en: 'Published at',
    uk: 'Опубліковано',
  },
  name: 'publishedAt',
  type: 'date',
});

export const publishedBy = (): Field => ({
  admin: {
    position: 'sidebar',
    readOnly: true,
  },
  label: {
    en: 'Published By',
    uk: 'Вперше опубліковано користувачем',
  },
  hooks: {
    beforeChange: [publishedByBeforeChange],
  },
  name: 'publishedBy',
  relationTo: Collection.Users,
  type: 'relationship',
});

export const lastPublishedBy = (): Field => ({
  admin: {
    position: 'sidebar',
    readOnly: true,
  },
  label: {
    en: 'Last Published By',
    uk: 'Востаннє опубліковано користувачем',
  },
  access: {
    read: anyAdminFieldAccess,
  },
  hooks: {
    beforeChange: [lastPublishedByBeforeChange],
  },
  name: 'lastPublishedBy',
  relationTo: Collection.Users,
  type: 'relationship',
});
