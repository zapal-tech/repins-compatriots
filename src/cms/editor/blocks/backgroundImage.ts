import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { Block, RichTextAdapterProvider, RichTextField } from 'payload';

import { richText } from '@cms/fields';

import { Collection } from '@cms/types';

import { baseEditorFeatures, baseHeadingFeature } from '@cms/editor';

import { columnsBlock } from './columns';

export const backgroundImageBlock: Block = {
  labels: {
    singular: {
      en: 'Background Image',
      uk: 'Фонове зображення',
    },
    plural: {
      en: 'Background Images',
      uk: 'Фонові зображення',
    },
  },
  slug: 'backgroundImage',
  fields: [
    {
      name: 'image',
      type: 'upload',
      label: {
        en: 'Image',
        uk: 'Зображення',
      },
      required: true,
      relationTo: Collection.Media,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'eclipseType',
          type: 'select',
          options: [
            { value: 'full', label: { en: 'Full', uk: 'Повне' } },
            { value: 'gradient', label: { en: 'Gradient to top', uk: 'Градієнт до верху' } },
            { value: 'none', label: { en: 'None', uk: 'Немає' } },
          ],
          label: {
            en: 'Eclipse type',
            uk: 'Тип затемнення',
          },
          defaultValue: 'none',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'eclipseOpacity',
          type: 'select',
          options: [
            { value: '100', label: '100%' },
            { value: '80', label: '80%' },
            { value: '70', label: '70%' },
            { value: '60', label: '60%' },
          ],
          label: {
            en: 'Eclipse opacity',
            uk: 'Прозорість затемнення',
          },
          defaultValue: '100',
          admin: {
            condition: (_, { type, eclipseType } = {}) => eclipseType === 'gradient',
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'minHeight',
          type: 'checkbox',
          label: {
            en: 'Minimum height',
            uk: 'Мінімальна висота',
          },
          defaultValue: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'fullScreen',
          type: 'checkbox',
          label: {
            en: 'Full screen',
            uk: 'На весь екран',
          },
          defaultValue: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          ...baseEditorFeatures,
          baseHeadingFeature,
          BlocksFeature({ blocks: [columnsBlock] }),
        ],
      }) as unknown as RichTextAdapterProvider<{}, any, any>,
      name: `richText`,
      label: {
        en: 'Text',
        uk: 'Текст',
      },
      required: true,
    },
    {
      name: 'textColor',
      type: 'select',
      options: [
        { value: 'black', label: { en: 'Black', uk: 'Чорний' } },
        { value: 'white', label: { en: 'White', uk: 'Білий' } },
      ],
      label: {
        en: 'Text Color',
        uk: 'Колір тексту',
      },
      defaultValue: 'black',
    },
    {
      name: 'richTextPosition',
      type: 'select',
      options: [
        { value: 'top', label: { en: 'Top', uk: 'Зверху' } },
        { value: 'down', label: { en: 'Down', uk: 'Знизу' } },
      ],
      defaultValue: 'top',
      label: {
        en: 'Text Position',
        uk: 'Позиція тексту',
      },
    },
  ],
};
