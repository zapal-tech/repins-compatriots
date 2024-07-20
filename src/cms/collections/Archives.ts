import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

export const Archives: CollectionConfig = {
  slug: Collection.Archives,
  labels: CollectionLabel.Archives,
  admin: {
    group: AdminPanelGroup.General,
  },
  fields: [],
};
