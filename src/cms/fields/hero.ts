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
            condition: (_, { type } = {}) => [HeroType.Large, HeroType.Medium].includes(type),
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
            condition: (_, { type, eclipseType } = {}) =>
              [HeroType.Large, HeroType.Medium].includes(type) && eclipseType === 'gradient',
            width: '50%',
          },
        },
      ],
    },
  ],
});
