import {
  AlignFeature,
  BlocksFeature,
  BoldFeature,
  FeatureProviderServer,
  HeadingFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical';
import { RichTextAdapterProvider } from 'payload';

import { link } from '@cms/fields/link';

import { Collection } from '@cms/types';
import { LinkAppearance } from '@cms/types/fields/link';

import { backgroundImageBlock } from './blocks/backgroundImage';
import { columnsBlock } from './blocks/columns';
import { feedbackFormBlock } from './blocks/feedbackForm';
import { partnersBlock } from './blocks/partners';
import { youtubeBlock } from './blocks/youtube';

export const baseHeadingFeature = HeadingFeature({
  enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5'],
});

const linkFields = link({ appearances: ['default', 'primary', 'secondary'] }).fields.map((field) => {
  if (field.type === 'row') {
    field.fields.forEach((subField) => {
      if ((subField as any).name === 'text') {
        (subField as any).name = 'text';
        (subField as any).label = {
          en: 'Text to display',
          uk: 'Текст для відображення',
        };
      }

      return subField;
    });
  }

  return field;
});

export const baseEditorFeatures: FeatureProviderServer<any, any>[] = [
  ParagraphFeature(),
  AlignFeature(),
  BoldFeature(),
  ItalicFeature(),
  UnderlineFeature(),
  StrikethroughFeature(),
  InlineCodeFeature(),
  UnorderedListFeature(),
  OrderedListFeature(),
  SuperscriptFeature(),
  SubscriptFeature(),
  // @ts-ignore
  LinkFeature({
    enabledCollections: [Collection.Pages],
    fields: ({ defaultFields }) => [
      ...defaultFields,
      {
        name: 'appearance',
        label: {
          en: 'Appearance',
          uk: 'Вигляд',
        },
        type: 'select',
        defaultValue: 'default' as LinkAppearance,
        options: ['default', 'default with border', 'primary', 'primary light', 'secondary'],
        admin: {
          description: {
            en: 'Choose how the link should be rendered.',
            uk: 'Оберіть, як посилання має бути відображене.',
          },
        },
      },
      {
        name: 'arrow',
        type: 'checkbox',
        label: {
          en: 'Arrow',
          uk: 'Стрілка',
        },
      },
      {
        name: 'fullWidth',
        type: 'checkbox',
        label: {
          en: 'Full width',
          uk: 'На всю ширину',
        },
        defaultValue: false,
      },
    ],
  }),
  // @ts-ignore
  UploadFeature({
    collections: {
      [Collection.Media]: {
        fields: [
          {
            type: 'number',
            name: 'size',
            label: {
              en: 'Size (%)',
              uk: 'Розмір (%)',
            },
            max: 100,
            min: 25,
            defaultValue: 100,
          },
          {
            type: 'select',
            name: 'position',
            label: {
              en: 'Position',
              uk: 'Розташування',
            },
            defaultValue: 'center',
            options: [
              {
                label: {
                  en: 'Left',
                  uk: 'Зліва',
                },
                value: 'left',
              },
              {
                label: {
                  en: 'Center',
                  uk: 'По центру',
                },
                value: 'center',
              },
              {
                label: {
                  en: 'Right',
                  uk: 'Справа',
                },
                value: 'right',
              },
            ],
          },
        ],
      },
    },
  }),
  InlineToolbarFeature(),
];

export const editor = lexicalEditor({
  features: [
    ...baseEditorFeatures,
    baseHeadingFeature,
    BlocksFeature({ blocks: [columnsBlock, partnersBlock, feedbackFormBlock, youtubeBlock, backgroundImageBlock] }),
  ],
}) as unknown as RichTextAdapterProvider<{}, any, any>;

export const heroEditor = lexicalEditor({
  features: [...baseEditorFeatures, HeadingFeature()],
}) as unknown as RichTextAdapterProvider<{}, any, any>;
