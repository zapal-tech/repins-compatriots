import type { CollectionConfig } from 'payload';

import { AdminPanelGroup, Collection, CollectionLabel, UserRole } from '@cms/types';

import { anyAdminAdminUIAccess, anyAdminFieldAccess, rootAccess, rootFieldAccess } from '@cms/access';

import { isNotDev } from '@shared/env';

import { anyAdminAndUserAccess } from './access';
import { ensureFirstUserIsRoot } from './hooks/ensureFirstUserIsRoot';
import { loginAfterCreate } from './hooks/loginAfterCreate';

export const Users: CollectionConfig = {
  slug: Collection.Users,
  labels: CollectionLabel.Users,
  auth: {
    lockTime: 60 * 60,
    maxLoginAttempts: 5,
    tokenExpiration: 60 * 60 * 24 * 7,
    cookies: {
      sameSite: 'Strict',
      secure: isNotDev,
      domain: process.env.NEXT_PUBLIC_CMS_COOKIES_DOMAIN,
    },
  },
  access: {
    admin: anyAdminAdminUIAccess,
    create: rootAccess,
    delete: rootAccess,
    read: anyAdminAndUserAccess,
    update: anyAdminAndUserAccess,
  },
  admin: {
    group: AdminPanelGroup.General,
    defaultColumns: ['firstName', 'lastName', 'email', 'roles'],
    useAsTitle: 'firstName',
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  timestamps: true,
  fields: [
    {
      type: 'row',
      fields: [
        {
          label: {
            en: 'First Name',
            uk: "Ім'я",
          },
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          label: {
            en: 'Last Name',
            uk: 'Прізвище',
          },
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'roles',
      label: {
        en: 'Roles',
        uk: 'Ролі',
      },
      type: 'select',
      hasMany: true,
      defaultValue: [UserRole.Admin],
      options: [
        {
          label: {
            en: 'Root admin',
            uk: 'Головний адміністратор',
          },
          value: UserRole.Root,
        },
        {
          label: {
            en: 'Admin',
            uk: 'Адміністратор',
          },
          value: UserRole.Admin,
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsRoot],
      },
      access: {
        read: anyAdminFieldAccess,
        create: rootFieldAccess,
        update: rootFieldAccess,
      },
    },
  ],
};
