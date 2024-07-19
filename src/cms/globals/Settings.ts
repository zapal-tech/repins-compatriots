import type { GlobalConfig } from 'payload';

import { AdminPanelGroup, Global, GlobalLabel } from '@cms/types';

import { anyAdminAccess } from '@cms/access';

import { cmsSenderEmail } from '@shared/email';

export const Settings: GlobalConfig = {
  label: GlobalLabel.Settings,
  slug: Global.Settings,
  typescript: { interface: 'Settings' },
  access: {
    update: anyAdminAccess,
    readVersions: anyAdminAccess,
  },
  admin: {
    group: AdminPanelGroup.General,
  },
  fields: [
    {
      type: 'email',
      label: {
        en: 'Email',
        uk: 'Адреса електронної пошти',
      },
      name: 'email',
      required: true,
      admin: {
        placeholder: cmsSenderEmail,
      },
    },
    {
      type: 'text',
      label: {
        en: 'Phone number',
        uk: 'Номер телефону',
      },
      name: 'phone',
      required: true,
      admin: {
        placeholder: '+380 00 000 0000',
      },
    },
  ],
};
