import { Field, GroupField } from 'payload';

import { Collection } from '@cms/types';
import { LinkAppearance, LinkAppearanceOption, LinkField, LinkType } from '@cms/types/fields/link';

import { deepMerge } from '@shared/utils';

export const appearanceOptions: Record<LinkAppearance, LinkAppearanceOption> = {
  primary: {
    label: {
      en: 'Primary Button',
      uk: 'Основна кнопка',
    },
    value: 'primary',
  },
  secondary: {
    label: {
      en: 'Secondary Button',
      uk: 'Другорядна кнопка',
    },
    value: 'secondary',
  },
  default: {
    label: {
      en: 'Default link',
      uk: 'Звичайне посилання',
    },
    value: 'default',
  },
  blue: {
    label: {
      en: 'Blue link',
      uk: 'Синє посилання',
    },
    value: 'blue',
  },
  'blue with border': {
    label: {
      en: 'Blue link with border',
      uk: 'Синє посилання з рамкою',
    },
    value: 'blue with border',
  },
  'primary light': {
    label: {
      en: 'Primary light Button',
      uk: 'Основна освітлена кнопка',
    },
    value: 'primary light',
  },
};

export const link: LinkField = ({ appearances, disableLabel = false, ...overrides } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: { hideGutter: true },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'linkType',
            type: 'radio',
            options: [
              {
                label: {
                  en: 'Internal link',
                  uk: 'Внутрішнє посилання',
                },
                value: LinkType.Internal,
              },
              {
                label: {
                  en: 'Custom URL',
                  uk: 'Власне посилання',
                },
                value: LinkType.Custom,
              },
            ],
            defaultValue: LinkType.Internal,
            required: true,
            admin: {
              layout: 'horizontal',
              width: '40%',
            },
          },
          {
            name: 'newTab',
            label: {
              en: 'Open in new tab',
              uk: 'Відкрити в новій вкладці',
            },
            type: 'checkbox',
            defaultValue: false,
            required: true,
            admin: {
              width: '30%',
              style: {
                alignSelf: 'flex-end',
              },
            },
          },
          {
            name: 'noFollow',
            label: {
              en: 'Do not follow link',
              uk: 'Не індексувати посилання',
            },
            defaultValue: false,
            required: true,
            type: 'checkbox',
            admin: {
              width: '30%',
              style: {
                alignSelf: 'flex-end',
              },
            },
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: 'doc',
      label: {
        en: 'Document to link to',
        uk: 'Внутрішній документ (сторінка) для посилання',
      },
      type: 'relationship',
      relationTo: [Collection.Pages],
      required: true,
      maxDepth: 1,
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === LinkType.Internal,
        width: '40%',
      },
    },
    {
      name: 'url',
      label: {
        en: 'Custom URL',
        uk: 'Власне посилання',
      },
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === LinkType.Custom,
        width: '40%',
      },
    },
  ];

  if (!disableLabel) {
    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'text',
          label: {
            en: 'Label',
            uk: 'Надпис',
          },
          type: 'text',
          required: true,
          admin: {
            width: '60%',
          },
        },
      ],
    });
  } else linkResult.fields = [...linkResult.fields, ...linkTypes];

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.primary, appearanceOptions.secondary];

    if (appearances) appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance]);

    linkResult.fields.push({
      name: 'appearance',
      label: {
        en: 'Appearance',
        uk: 'Вигляд',
      },
      type: 'select',
      defaultValue: 'default' as LinkAppearance,
      options: appearanceOptionsToUse,
      admin: {
        description: {
          en: 'Choose how the link should be rendered.',
          uk: 'Оберіть, як посилання має бути відображене.',
        },
      },
    });
  }

  return deepMerge(linkResult, overrides);
};
