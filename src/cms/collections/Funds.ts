import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel } from '@cms/types';

export const Funds: CollectionConfig = {
  slug: Collection.Funds,
  labels: CollectionLabel.Funds,
  admin: {
    group: AdminPanelGroup.General,
  },
  fields: [],
};
