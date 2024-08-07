import type { GlobalConfig } from 'payload';

import { nestedNavigation } from '@cms/fields';

import { AdminPanelGroup, Global, GlobalLabel } from '@cms/types';

import { anyAdminAccess } from '@cms/access';
import { revalidateAll } from '@cms/utils/revalidate';

export const Header: GlobalConfig = {
  slug: Global.Header,
  label: GlobalLabel.Header,
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
  fields: [nestedNavigation({ depth: 0, required: true })],
};
