import type { Field } from 'payload';

import { Collection, HeroType } from '@cms/types';

import { heroEditor } from '@cms/editor';

import { richText } from './richText';

export const hero = (): Field => ({
  name: 'hero',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: {
        en: 'Type',
        uk: 'Тип',
      },
      required: true,
      localized: true,
      defaultValue: HeroType.Small,
      options: [
        {
          label: {
            en: 'None',
            uk: 'Немає',
          },
          value: HeroType.None,
        },
        {
          label: {
            en: 'Large',
            uk: 'Великий',
          },
          value: HeroType.Large,
        },
        {
          label: {
            en: 'Medium',
            uk: 'Середній',
          },
          value: HeroType.Medium,
        },
        {
          label: {
            en: 'Small',
            uk: 'Малий',
          },
          value: HeroType.Small,
        },
      ],
    },
    richText({
      name: 'richText',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => ![HeroType.None].includes(type),
      },
      editor: heroEditor,
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: Collection.Media,
      required: true,
      localized: true,
      admin: {
        condition: (_, { type } = {}) => [HeroType.Large, HeroType.Medium].includes(type),
      },
    },
  ],
});
