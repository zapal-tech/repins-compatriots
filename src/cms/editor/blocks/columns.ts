import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Block, RichTextAdapterProvider, RichTextField } from 'payload';

import { baseEditorFeatures, baseHeadingFeature } from '@cms/editor';

export const columnNamePrefix = 'columnContent';

export const columnsBlock: Block = {
  labels: {
    singular: {
      en: 'Column',
      uk: 'Колонка',
    },
    plural: {
      en: 'Columns',
      uk: 'Колонки',
    },
  },
  slug: 'columns',
  fields: [
    {
      defaultValue: '1 1',
      label: {
        en: 'Size',
        ua: 'Розмір',
      },
      name: 'size',
      options: [
        {
          value: '1 1',
          label: {
            en: '2 columns (50% / 50%)',
            uk: '2 колонки (50% / 50%)',
          },
        },
        {
          value: '3 1',
          label: {
            en: '2 columns (75% / 25%)',
            uk: '2 колонки (75% / 25%)',
          },
        },
        {
          value: '2 1',
          label: {
            en: '2 columns (66% / 33%)',
            uk: '2 колонки (66% / 33%)',
          },
        },
        {
          value: '1 2',
          label: {
            en: '2 columns (33% / 66%)',
            uk: '2 колонки (33% / 66%)',
          },
        },
        {
          value: '1 3',
          label: {
            en: '2 columns (25% / 75%)',
            uk: '2 колонки (25% / 75%)',
          },
        },
        {
          value: '1 1 1',
          label: {
            en: '3 columns (33% / 33% / 33%)',
            uk: '3 колонки (33% / 33% / 33%)',
          },
        },
        {
          value: '2 1 1',
          label: {
            en: '3 columns (50% / 25% / 25%)',
            uk: '3 колонки (50% / 25% / 25%)',
          },
        },
        {
          value: '1 2 1',
          label: {
            en: '3 columns (25% / 50% / 25%)',
            uk: '3 колонки (25% / 50% / 25%)',
          },
        },
        {
          value: '1 1 2',
          label: {
            en: '3 columns (25% / 25% / 50%)',
            uk: '3 колонки (25% / 25% / 50%)',
          },
        },
        {
          value: '1 1 1 1',
          label: {
            en: '4 columns (25% / 25% / 25% / 25%)',
            uk: '4 колонки (25% / 25% / 25% / 25%)',
          },
        },
      ],
      type: 'select',
    },
    ...[1, 2, 3, 4].map<RichTextField>((columnOrder) => ({
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, ...baseEditorFeatures, baseHeadingFeature],
      }) as unknown as RichTextAdapterProvider<{}, any, any>,
      name: `${columnNamePrefix}${columnOrder}`,
      label: {
        en: `Column ${columnOrder}`,
        uk: `Колонка ${columnOrder}`,
      },
      admin: {
        condition: (_: any, siblingData: Record<string, any>) =>
          columnOrder < 3 || columnOrder <= (siblingData?.size as string).split(' ').length,
      },
    })),
  ],
};
