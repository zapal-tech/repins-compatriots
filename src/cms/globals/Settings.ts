import type { GlobalConfig } from 'payload';

import { url } from '@cms/fields';

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
    {
      type: 'text',
      label: {
        en: 'Viber URL',
        uk: 'Посилання на Viber',
      },
      name: 'viberUrl',
      required: true,
      admin: {
        placeholder: 'viber://add?number=3809700000000',
      },
    },
    url({
      label: {
        en: 'WhatAapp URL',
        uk: 'Посилання на WhatsApp',
      },
      name: 'whatsappUrl',
      required: true,
      admin: {
        placeholder: 'https://wa.me/your-phone-number',
      },
    }),
    url({
      label: {
        en: 'Instagram URL',
        uk: 'Посилання на Instagram',
      },
      name: 'instagramUrl',
      required: true,
      admin: {
        placeholder: 'https://www.instagram.com/your-account/',
      },
    }),
    url({
      label: {
        en: 'Facebook URL',
        uk: 'Посилання на Facebook',
      },
      name: 'facebookUrl',
      required: true,
      admin: {
        placeholder: 'https://www.facebook.com/your-account/',
      },
    }),
  ],
};
