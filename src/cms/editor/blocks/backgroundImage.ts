import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { Block, RichTextAdapterProvider, RichTextField } from 'payload';

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
  ],
};
