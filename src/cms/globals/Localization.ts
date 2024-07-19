import { NextResponse } from 'next/server';
import type { GlobalConfig } from 'payload';

import { isSupportedLocale } from '@app/utils/i18n';

import { checkRole } from '@cms/collections/Users/checkRole';

import { AdminPanelGroup, Global, GlobalLabel, UserRole } from '@cms/types';

import { rootAccess } from '@cms/access';

export const Localization: GlobalConfig = {
  label: GlobalLabel.Localization,
  slug: Global.Localization,
  access: {
    update: rootAccess,
  },
  admin: {
    group: AdminPanelGroup.General,
    hidden: ({ user }) => !checkRole([UserRole.Root], user),
  },
  endpoints: [
    {
      method: 'get',
      path: '/:locale',
      handler: async ({ payload, routeParams }) => {
        const { locale } = routeParams || {};

        if (!locale || !isSupportedLocale(locale)) return NextResponse.json('Unsupported locale', { status: 400 });

        try {
          const { translation } = await payload.findGlobal({ slug: Global.Localization, locale });

          return NextResponse.json(translation);
        } catch (error) {
          payload.logger.error(error);
        }

        return NextResponse.json('Internal Server Error', { status: 500 });
      },
    },
  ],
  fields: [
    {
      type: 'json',
      name: 'translation',
      label: false,
      admin: {
        description: {
          en: 'Translations file in JSON format used for the website to translate technical and/or not frequently updated content (such as UI elements, labels, etc.)',
          uk: 'Файл перекладів сайту у форматі JSON, що використовується для перекладу технічного та/або нечасто оновлюваного контенту, (на кшталт елементів інтерфейсу, надписів, тощо)',
        },
      },
      required: true,
      localized: true,
    },
  ],
  versions: {
    drafts: {
      autosave: true,
    },
  },
};
