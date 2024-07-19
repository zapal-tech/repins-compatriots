import { LinkGroupField } from '@cms/types/fields/linkGroup';

import { deepMerge } from '@shared/utils';

import { link } from './link';

export const linkGroup: LinkGroupField = ({ appearances, linkOverrides = {}, ...overrides } = {}) =>
  deepMerge(
    {
      name: 'links',
      label: {
        en: 'Links',
        uk: 'Лінки (посилання)',
      },
      type: 'array',
      // admin: {
      //   components: {
      //     RowLabel: ({ data, index }: { data: any; index?: number }): string =>
      //       (data?.link?.label as string | undefined) || `Link ${String(index).padStart(2, '0')}`,
      //   },
      // },
      fields: [link({ appearances, ...linkOverrides })],
    },
    overrides,
  );
