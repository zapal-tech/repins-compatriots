import type { CollectionConfig } from 'payload';

import { hero, lastPublishedBy, publishedAt, publishedBy, richText, slug, title } from '@cms/fields';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

import { anyAdminAccess, anyAdminOrPublishedAccess } from '@cms/access';
import { generatePreviewURL } from '@cms/utils/preview';

import { getLastFromArray } from '@shared/utils';

import { revalidatePage } from './hooks/revalidatePage';

export const Pages: CollectionConfig = {
  slug: Collection.Pages,
  labels: CollectionLabel.Pages,
  access: {
    create: anyAdminAccess,
    delete: anyAdminAccess,
    read: anyAdminOrPublishedAccess,
    update: anyAdminAccess,
  },
  admin: {
    group: AdminPanelGroup.General,
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc) => generatePreviewURL(getLastFromArray(doc.breadcrumbs as { url: string }[]).url),
    useAsTitle: 'title',
  },
  fields: [
    title(),
    publishedBy(),
    lastPublishedBy(),
    publishedAt(),
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Hero',
            uk: 'Головний блок',
          },
          fields: [hero()],
        },
        {
          label: {
            en: 'Content',
            uk: 'Контент',
          },
          fields: [richText({ name: 'content', label: false, localized: true })],
        },
      ],
    },
    slug(),
  ],
  hooks: {
    afterChange: [revalidatePage],
  },
  versions: {
    maxPerDoc: 50,
    drafts: { autosave: true },
  },
};
