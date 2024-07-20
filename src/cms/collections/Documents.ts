import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

export const Documents: CollectionConfig = {
  slug: Collection.Documents,
  labels: CollectionLabel.Documents,
  admin: {
    group: AdminPanelGroup.General,
  },
  fields: [],
};
