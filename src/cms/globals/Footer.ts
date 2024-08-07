import type { GlobalConfig } from 'payload';

import { nestedNavigation } from '@cms/fields';

import { AdminPanelGroup, Global, GlobalLabel } from '@cms/types';

import { anyAdminAccess } from '@cms/access';
import { revalidateAll } from '@cms/utils/revalidate';

export const Footer: GlobalConfig = {
  slug: Global.Footer,
  label: GlobalLabel.Footer,
  access: {
    update: anyAdminAccess,
    readVersions: anyAdminAccess,
  },
  admin: {
    group: AdminPanelGroup.General,
  },
  hooks: {
    afterChange: [
      () => {
        revalidateAll();
      },
    ],
  },
  fields: [
    nestedNavigation({
      required: true,
      name: 'navigation',
      depth: 0,
    }),
  ],
};
